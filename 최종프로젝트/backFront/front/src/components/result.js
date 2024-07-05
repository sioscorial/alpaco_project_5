import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios를 사용하여 API 호출

import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/Search.svg';
import { ReactComponent as InputIcon } from '../assets/icons/inputdata.svg';
import { ReactComponent as UpIcon } from '../assets/icons/uparrow.svg';
import { ReactComponent as DownIcon } from '../assets/icons/downarrow.svg';

const Container = styled.div`
  width: 100%;
  max-width: 744px;
  height: 100%;
  max-height: 1133px;
  min-width: 375px;
  min-height: 578px;
  margin: auto; /* 화면 중앙 정렬 */
  background: white;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  display: flex;
`;

const Header = styled.div`
  width: 100%;
  height: 58px;
  position: relative;
  background: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  display: flex;
`;


const IconWrapper = styled.div`
  padding: 10px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer; /* 아이콘 클릭 가능하도록 포인터 커서 적용 */
`;


const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Title = styled.div`
  text-align: center;
  color: black;
  font-size: 32px;
  font-family: 'Inter';
  font-weight: 800;
  line-height: 41.60px;
  word-wrap: break-word;
  cursor: pointer;
`;
const Content = styled.div`
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  display: flex;
`;

const ImageWrapper = styled.div`
  height: 375px;
  padding-top: 12px;
  padding-bottom: 12px;
  background: white;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ImageContainer = styled.div`
  width: 240px;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Image = styled.img`
  width: 240px;
  height: 354px;
`;

const KeywordWrapper = styled.div`
  width: 100%;
  padding-top: 16px;
  padding-bottom: 18px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const KeywordGroup = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 12px;
  display: flex;
  flex-wrap: wrap;
`;

const Keyword = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: ${props => props.active ? 'black' : '#FAFAFB'};
  border-radius: 20px;
  border: 1px ${props => props.active ? 'black' : '#E6E6E6'} solid;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: flex;
`;

const KeywordText = styled.div`
  text-align: center;
  color: ${props => props.active ? '#FAFAFB' : '#A0A0A0'};
  font-size: 12px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

const ResultWrapper = styled.div`
  width: 100%;
  padding-bottom: 14px;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const ResultText = styled.div`
  color: black;
  font-size: 12px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

const SimilarityWrapper = styled.div`
  justify-content: flex-end;
  align-items: center;
  gap: 2px;
  display: flex;
`;

const SimilarityText = styled.div`
  text-align: right;
  color: #A0A0A0;
  font-size: 12px;
  font-family: 'Inter';
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

const SimilarityIcon = styled.div`
  width: 18px;
  height: 17px;
  padding-left: 2.06px;
  padding-right: 2.06px;
  padding-top: 1.95px;
  padding-bottom: 1.95px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const SimilarityIconBox = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  position: absolute;
  border: 1.50px #A0A0A0 solid;
`;

const BrandListWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  display: flex;
`;

const BrandItem = styled.div`
  width: 100%;
  padding: 16px;
  background: white;
  box-shadow: ${props => props.expanded ? '0px 4px 60px rgba(4, 6, 15, 0.05)' : 'none'};
  border-radius: 20px;
  border: ${props => props.expanded ? '1.50px #575757 solid' : 'none'};
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${props => props.expanded ? 'center' : 'flex-start'};
  gap: 16px;
  display: flex;
  cursor: pointer;
`;

const BrandInfoWrapper = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
`;

const BrandRank = styled.div`
  left: ${props => props.expanded ? '8px' : '6px'};
  top: 9px;
  position: absolute;
  text-align: center;
  color: ${props => props.expanded ? 'black' : '#A0A0A0'};
  font-size: 18px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 21.60px;
  word-wrap: break-word;
`;

const BrandArrowIcon = styled.div`
  width: 24px;
  height: 24px;
  right: 0;
  top: 8px;
  position: absolute;
`;

const BrandArrowIconBox = styled.div`
  width: 14px;
  height: 7px;
  left: 5px;
  top: 8.50px;
  position: absolute;
  border: 1.50px black solid;
`;

const BrandLogo = styled.div`
  width: 30px;
  height: 20px;
  padding-top: 13px;
  padding-bottom: ${props => props.expanded ? '12.20px' : '12.24px'};
  padding-left: 5px;
  padding-right: 5px;
  left: 29px;
  top: 0;
  position: absolute;
  background: white;
  border-radius: 100px;
  overflow: hidden;
  border: 0.50px #E6E6E6 solid;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const BrandLogoImage = styled.img`
  width: 30px;
  height: ${props => props.expanded ? '14.80px' : '14.76px'};
`;

const BrandNameWrapper = styled.div`
  left: 77px;
  top: 1px;
  position: absolute;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  display: flex;
`;

const BrandName = styled.div`
  color: black;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

const BrandSimilarityWrapper = styled.div`
  left: 77px;
  top: 25px;
  position: absolute;
  color: #575757;
  font-size: 10px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

const BrandSimilarity = styled.div`
  color: black;
  font-size: 10px;
  font-family: 'Inter';
  font-weight: bold;
  line-height: 15px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
  
`;

const BrandImageWrapper = styled.div`
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
  display: flex;
`;

const BrandImage = styled.img`
  width: 102px;
  height: 102px;
`;

const BrandDetailButton = styled.div`
  width: 100%;
  height: 56px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const BrandDetailButtonWrapper = styled.div`
  width: 100%;
  padding: 8px;
  background: #F2F2F2;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: flex;
`;

const BrandDetailButtonText = styled.div`
  text-align: center;
  color: black;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
  cursor: pointer;
`;

const BrandDivider = styled.div`
  width: 100%;
  height: 0;
  border: 1px #E6E6E6 solid;
`;


const Result = () => {
  const { itemId } = useParams(); // URL 경로에서 itemId를 가져옵니다.
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [expandedBrandId, setExpandedBrandId] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://112.175.29.231:30001/result/${itemId}`);
        setData(response.data.data); // 서버에서 받은 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };
    fetchData();
  }, [itemId]);
  
  const handleBrandDetailClick = (brandId) => {
    const imageUrl = data[0].style_img_url; // 이미지 URL 가져오기
    navigate(`/brand/${brandId}?imageUrl=${encodeURIComponent(imageUrl)}`); // 이미지 URL을 쿼리 매개변수로 전달
  };

  const handleBrandArrowClick = (brandId) => {
    setExpandedBrandId(expandedBrandId === brandId ? null : brandId);
  };

  return (
    <Container>
      <Header>
        <IconWrapper onClick={() => navigate('/menu')}>
          <IconContainer>
            <MenuIcon />
          </IconContainer>
        </IconWrapper>
        <Title onClick={() => navigate('/main')}>BRAiND</Title>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <IconWrapper onClick={() => navigate('/input')}>
            <IconContainer>
              <InputIcon />
            </IconContainer>
          </IconWrapper>
          <IconWrapper onClick={() => navigate('/search')}>
            <IconContainer>
              <SearchIcon />
            </IconContainer>
          </IconWrapper>
        </div>
      </Header>
      <Content>
        {data.length > 0 && (
          <ImageWrapper>
            <ImageContainer>
              <Image src={data[0].style_img_url} />
            </ImageContainer>
          </ImageWrapper>
        )}
        <KeywordWrapper>
          <KeywordGroup>
            {/* 추가 키워드 */}
          </KeywordGroup>
        </KeywordWrapper>
        <ResultWrapper>
          <ResultText>브랜드 결과 {data.length}개</ResultText>
          <SimilarityWrapper>
            <SimilarityText>스타일 유사도</SimilarityText>
            <SimilarityIcon>
              <SimilarityIconBox width={0.75} height={2.83} left={6.56} top={6.55} />
              <SimilarityIconBox width={0.75} height={0.71} left={6.56} top={3.51} />
              <SimilarityIconBox width={13.88} height={13.10} left={0} top={0} />
            </SimilarityIcon>
          </SimilarityWrapper>
        </ResultWrapper>
        <BrandListWrapper>
  {data.map((brand, index) => (
    <BrandItem
    key={brand.brand_id}
    expanded={expandedBrandId === brand.brand_id}
    onClick={() => handleBrandArrowClick(brand.brand_id)}
  >
    <BrandInfoWrapper expanded={expandedBrandId === brand.brand_id}>
      <BrandRank expanded={expandedBrandId === brand.brand_id}>{index + 1}</BrandRank>
      <BrandArrowIcon onClick={(e) => {
          e.stopPropagation(); // 이벤트 버블링 방지하지 않음
          handleBrandArrowClick(brand.brand_id);
        }}>
          {expandedBrandId === brand.brand_id ? <UpIcon /> : <DownIcon />}
        </BrandArrowIcon>
      <BrandLogo>
        <BrandLogoImage expanded={expandedBrandId === brand.brand_id} src={brand.brand_logo_url} />
      </BrandLogo>
      <BrandNameWrapper>
        <BrandName>{brand.brand_name_kr}</BrandName>
        {/* ... */}
      </BrandNameWrapper>
      <BrandSimilarityWrapper>
        <BrandSimilarity>스타일 유사도 {brand.similarity}</BrandSimilarity>
      </BrandSimilarityWrapper>
    </BrandInfoWrapper>
    {expandedBrandId === brand.brand_id && (
      <>
        <BrandImageWrapper>
          {/* 브랜드 이미지 */}
        </BrandImageWrapper>
        <BrandDetailButton onClick={() => handleBrandDetailClick(brand.brand_id)}>
          <BrandDetailButtonWrapper>
            <BrandDetailButtonText>
              브랜드 자세히 보기
            </BrandDetailButtonText>
          </BrandDetailButtonWrapper>
        </BrandDetailButton>
      </>
    )}
    {index !== data.length - 1 && <BrandDivider />}
  </BrandItem>
  ))}
</BrandListWrapper>
      </Content>
    </Container>
  );
};

export default Result;