from roboflow import Roboflow
from ultralytics import YOLO
from torch import nn
import pandas as pd
import os
import cv2
import sys
import argparse

# # 전신 확인
# parser = argparse.ArgumentParser()
# parser.add_argument('img_path')
# parser.add_argument('--data_path', default='/home/alpaco/Project/recomend_test/0502_vector.csv')

# args = parser.parse_args()

# best_weight_path = "/home/alpaco/Project/jay/yolov8/human_body_detection/runs/detect/train8/weights/best.pt"
# model = YOLO(best_weight_path)

# results = model.predict(args.img_path)
# predicted = list(map(int, results[0].boxes.cls.tolist()))

# if sorted(predicted) != ([0, 1, 2, 3, 4] or [0, 1, 2, 4] or [0, 2, 3, 4]):
#     print('반환')
#     sys.exit()

from torchvision.transforms import ToTensor, Resize
from lavis.models import load_model_and_preprocess
import torchvision.transforms as transforms
import torchvision.models as models
import matplotlib.pyplot as plt
import torch.autograd
from PIL import Image
import numpy as np
import torch.optim
from skimage import io
import random
import pickle
import torch
import spacy
from spacy.matcher import Matcher
from RMBG.briarmbg import BriaRMBG
from RMBG.utilities import preprocess_image, postprocess_image
from sklearn.decomposition import PCA
from sklearn.metrics.pairwise import cosine_similarity
from lavis.models import load_model_and_preprocess
import numpy as np
from deface.centerface import CenterFace
from Deface import deface

torch.manual_seed(429)
random.seed(429)

# RMBG 모델 선언
net = BriaRMBG.from_pretrained("briaai/RMBG-1.4").to(torch.device("cuda:1"))

# tokenizer, vector 압축할 pca 선언
pca = PCA(n_components=11)
nlp = spacy.load('en_core_web_sm')
matcher = Matcher(nlp.vocab)

# 데이터 전처리때 사용할 transform 선언
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# deface에서 사용할 centerface 선언
centerface = CenterFace(in_shape=None, backend='auto', override_execution_provider=None)

# 스타일 분류모델 선언
shuffle_model = models.shufflenet_v2_x2_0(pretrained=True)
num_ftrs = shuffle_model.fc.in_features
shuffle_model.fc = nn.Sequential(
    nn.Linear(num_ftrs, 2048),
    nn.BatchNorm1d(2048),
    nn.Dropout(p=0.3),
    nn.LeakyReLU(inplace=True),
    nn.Linear(2048, 1024),
    nn.BatchNorm1d(1024),
    nn.Dropout(p=0.3),
    nn.LeakyReLU(inplace=True),
    nn.Linear(1024, 7)
)

shuffle_model.load_state_dict(torch.load('/home/alpaco/Project/Model/04_14/0414_shuffle_best_model2.pt'))

# eval모드로 변경
for i in shuffle_model.parameters() :
    i.requires_grad = False
shuffle_model = shuffle_model.to(torch.device("cuda:1"))
shuffle_model.eval()

# vqa에 사용할 모델들 선언
model_vqa, vis_processors_vqa, txt_processors_vqa = load_model_and_preprocess(
    name="blip_vqa", model_type="vqav2", is_eval=True, device=torch.device("cuda:1"))

# vector 압축할 때 사용할 pca모델 선언
with open('/home/alpaco/Project/recomend_test/pca_model.pkl', 'rb') as f:
    pca = pickle.load(f)




def resize(image, img_size): # 전처리에 사용할 resize 함수 선언
    image = np.array(image)
    h, w = image.shape[:2]  # 이미지의 높이와 너비 가져오기
    
    if w > h:
        ratio = img_size / w
        new_h = int(h * ratio)
        new_w = img_size
    else:
        ratio = img_size / h
        new_h = img_size
        new_w = int(w * ratio)
    
    img = cv2.resize(image, (new_w, new_h), interpolation=cv2.INTER_LINEAR)
    
    # 그림 주변에 검은색으로 칠하기
    dw = (img_size - new_w) // 2
    dh = (img_size - new_h) // 2
    
    img_re = np.zeros((img_size, img_size, image.shape[2]), dtype=image.dtype)
    img_re[dh:dh+new_h, dw:dw+new_w] = img
    
    return img_re


def rm_bg(image_path) : # path를 받으면 Image형식의 이미지를 출력한다
    orig_im = io.imread(image_path)
    orig_im_size = orig_im.shape[0:2]
    image = preprocess_image(orig_im, [1024, 1024]).to(torch.device("cuda:1"))

    # Perform inference
    result = net(image)

    # Post-process the result
    result_image = postprocess_image(result[0][0], orig_im_size)
    result = net(image)
    result_image = postprocess_image(result[0][0], orig_im_size)

    pil_im = Image.fromarray(result_image)
    no_bg_image = Image.new("RGBA", pil_im.size, (0, 0, 0, 0))
    orig_image = Image.open(image_path)
    no_bg_image.paste(orig_image, mask=pil_im)

    return no_bg_image


def rm_face(result_image) : # rmbg에서 받은 것을 그대로 받는다. Image 형식으로 출력
    frame = np.array(result_image)
    dets, _ = centerface(frame, threshold=0.2)

    deface.anonymize_frame(
        dets, frame, mask_scale=1.3,
        replacewith='solid', ellipse=True, draw_scores=False,
        replaceimg=None, mosaicsize=20
    )

    return Image.fromarray(frame).convert('RGB')


def classifier(image) : # Image.open을 한 image data를 받는다
    image = resize(image, 256)
    image = transform(image)
    image = image.unsqueeze(0).to(torch.device("cuda:1"))
    pred = shuffle_model(image)
    return torch.sigmoid(pred)[0]


def vqa(image) : # PIL.Image.Image 형태로 입력을 받는다
    image = vis_processors_vqa["eval"](image).unsqueeze(0).to(torch.device("cuda:1"))
    question_batch = [
        txt_processors_vqa["eval"]("Details of the top, upper fashion item?"),
        txt_processors_vqa["eval"]("What color of the top, upper fashion item?"),        
        txt_processors_vqa["eval"]("What fabric of the top, upper fashion item?"),     
        txt_processors_vqa["eval"]("What pattern of the top, upper fashion item?"),

        txt_processors_vqa["eval"]("Details of the bottoms, lower fashion item?"),
        txt_processors_vqa["eval"]("What color of the bottoms, lower fashion item?"),        
        txt_processors_vqa["eval"]("What fabric of the bottoms, lower fashion item?"),
        txt_processors_vqa["eval"]("What pattern of the bottoms, upper fashion item?"),

        txt_processors_vqa["eval"]("What fashion brands that represents the style"),
        txt_processors_vqa["eval"]("What season is this fashion best suited for?")
    ]
    image_batch_vqa = image.repeat(len(question_batch), 1, 1, 1)
    result = model_vqa.predict_answers(samples={"image": image_batch_vqa, "text_input": question_batch}, inference_method="generate")

    return result


def vectorizer(wordlist, weights) : # word list를 vectorize한 후 (10, 96) vector를 (1, 250)으로 압축
    vectors = []
    for word, weight in zip(wordlist, weights) :
        vector = np.array(nlp(word).vector)
        vector = vector.reshape(-1, 96)
        vector = pca.transform(vector)
        vector = vector.reshape(1, -1) * weight
        vectors.append(vector)
    return np.array(vectors).reshape(1,-1)

def main():

    parser = argparse.ArgumentParser()
    parser.add_argument('img_path')
    parser.add_argument('--data_path', default='/home/alpaco/Project/recomend_test/0502_vector.csv')

    args = parser.parse_args()

    # 데이터 베이스를 df형태로 선언
    database = pd.read_csv(args.data_path)
    database_vector = database[['sports', 'casual', 'americancasual', 'girlish', 'dandy', 'chic', 'street'] + [str(i) for i in range(250)]].values
    # test_vector = []

    image = rm_bg(args.img_path)
    image = rm_face(image)
    image = Image.open(args.img_path)
    if image.mode == 'RGBA':
        image = image.convert('RGB')
    word_list = vqa(image)
    pred = classifier(image).cpu().numpy()

    style = ['sports', 'casual', 'americancasual', 'girlish', 'dandy', 'chic', 'street'][np.argmax(pred)]

    if style == 'casual':
        style_weight = np.array([0.2, 0.2, 0.2, 0.5, 0.2, 0.2, 0.2])
        vqa_weight = [1, 3, 1, 1, 1, 3, 1.5, 1, 0.5, 0.5]
    else:
        style_weight = np.array([3, 3, 3, 3.5, 3, 3, 3])
        vqa_weight = [1, 2.5 , 1, 1, 1, 2.5 , 1.5, 1, 0.5, 0.5]

    weighted_vector = classifier(image).cpu().numpy() * style_weight
    vectorized = vectorizer(word_list, vqa_weight)
    
    vector = np.concatenate([weighted_vector.reshape(1, -1), vectorized], axis=1)
    # test_vector.append(vector[0])

    # pd.DataFrame(test_vector).to_csv('test_vector.csv', index=False)

    # 유사도 계산
    similarity = cosine_similarity(vector, database_vector)
    
    # 문자열 형식으로 파일 만들기
    sim = pd.concat([database['brand'], pd.DataFrame(similarity).T], axis=1)
    sim = sim.sort_values(by=0, ascending=False)[:500]
    sim = sim.groupby('brand')[0].mean()
    sim = sim.sort_values(ascending=False).iloc[:10]

    # 문자열로 변환
    sim_str = ', '.join([f"{brand}:{score:.4f}" for brand, score in sim.items()])
    result_str = f"style:{style}, similarities:{sim_str}"
    
    print(result_str)

if __name__ == '__main__':
    main()