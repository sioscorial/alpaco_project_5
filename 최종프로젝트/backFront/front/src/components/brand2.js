import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { ReactComponent as MenuIcon } from '../assets/icons/menuW.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/SearchW.svg';
import { ReactComponent as InputIcon } from '../assets/icons/inputdataW.svg';
import { ReactComponent as WishItemIcon } from '../assets/icons/wishitem.svg';
import { ReactComponent as WishItemWIcon } from '../assets/icons/wishitemW.svg';
import { ReactComponent as MusinsaIcon } from '../assets/icons/musinsa.svg';
import { ReactComponent as NaverIcon } from '../assets/icons/naverlink.svg';
import { ReactComponent as BrandheartRIcon } from '../assets/icons/brandheartR.svg';
import { ReactComponent as BrandheartWIcon } from '../assets/icons/brandheartW.svg';
import { ReactComponent as BrandhomeIcon } from '../assets/icons/brandhome.svg';
import { useUser } from './UserContext';


const HeaderContainer = styled.div`
  width: 700px;
  height: 58px;
  position: relative;
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;
const Logo = styled.div`
  text-align: center;
  color: white;
  font-size: 32px;
  font-family: 'Inter';
  font-weight: 800;
  line-height: 41.6px;
  word-wrap: break-word;
  cursor: pointer;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: black;
  font-size: 3vw;
  pointer-events: auto;
  `;
  
  const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: white;
  display: flex;
  flex-direction: column; // 세로 방향으로 배치
  justify-content: flex-start; // 위쪽에서 시작
  align-items: center;

  @media (min-width: 744px) {
    width: 100%;
    height: 100%;
  }
`;

const Wrapper = styled.div`
  width: 100%; // 너비를 100%로 설정
  max-width: 744px; // 최대 너비를 744px로 제한
  height: auto;
  background: black;
  padding-bottom: 20px;
  margin: 0 auto; // 가운데 정렬
`;

const WrapperW = styled.div`
  width: 100%; // 너비를 100%로 설정
  max-width: 744px; // 최대 너비를 744px로 제한
  height: auto;
  background: white;
  padding-bottom: 20px;
  margin: 0 auto; // 가운데 정렬
`;
const ProfileWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  margin: 10px;
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  padding: 5px;
  background: white;
  border-radius: 2000px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
`;

const ProfileName = styled.div`
  color: white;
  font-size: 20px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
`;

const ProfileBrand = styled.div`
  color: white;
  font-size: 16px;
  font-family: 'Inter';
  font-weight: 500;
  line-height: 22.4px;
  letter-spacing: 0.2px;
  word-wrap: break-word;
`;

const ProfileYear = styled.div`
  color: white;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
  margin: 10px;
  width: 720px;
`;

const Button = styled.div`
  height: 56px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 50%;
`;

const ButtonInner = styled.div`
  flex: 1;
  height: 56px;
  padding: 8px;
  background: #404040;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px; // 아이콘과 텍스트 사이의 간격을 조절
`;

const ButtonIcon = styled.div`
  width: 25px; // 기존 20px에서 16px로 줄임
  height: 25px; // 높이도 16px로 변경
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const ImageGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
  margin: 20px;
`;

const FittingRoomWrapper = styled.div`
  width: 100%;
  padding-bottom: 8px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const FittingRoomHeader = styled.div`
  align-self: stretch;
  height: 51px;
  padding: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const FittingRoomTitle = styled.div`
  color: black;
  font-size: 16px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 19.2px;
  word-wrap: break-word;
`;

const FittingRoomContent = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 7px;
`;

const FittingRoomImage = styled.div`
  width: 240px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FittingRoomUpload = styled.div`
  height: 351px;
  padding: 56px;
  background: #FAFAFB;
  border-radius: 12px;
  overflow: hidden;
  border: 2px #E6E6E6 dotted;
  display: flex;
  flexDirection: column;
  justifyContent: center;
  alignItems: center;
`;

const FittingRoomUploadContent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center; // 수정: flex-start에서 center로 변경
  align-items: center;
  gap: 8px;
`;
const FittingRoomUploadIcon = styled.div`
  width: 64px;
  height: 64px;
  position: relative;
`;

const FittingRoomUploadText = styled.div`
  width: 128px;
  textAlign: center;
  color: #BFBFBF;
  fontSize: 10px;
  fontFamily: 'Inter';
  fontWeight: 600;
  lineHeight: 15px;
  letterSpacing: 0.3px;
  word-wrap: break-word;
`;
const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  padding: 8px; // 여기를 수정했습니다.
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
  gap: 530px;
`;

const ItemTitle = styled.div`
  color: black;
  font-size: 16px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 19.2px;
  word-wrap: break-word;
`;

const ItemSortWrapper = styled.div`
  align-self: stretch;
  display: inline-flex;
  background: white;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
`;

const ItemSortLatest = styled.div`
  color: black;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
`;

const ItemSortPopular = styled.div`
  color: #A0A0A0;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
`;
const CategoryWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 9px;
  padding-bottom: 9px;
  padding-left: 16px;
  padding-right: 137px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  background: white;
`;

const CategoryList = styled.div`
  align-self: stretch;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: white;;
`;

const CategoryButton = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: ${props => props.active ? 'black' : '#FAFAFB'};
  border-radius: 20px;
  border: 1px ${props => props.active ? 'black' : '#E6E6E6'} solid;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const CategoryText = styled.div`
  text-align: center;
  color: ${props => props.active ? '#FAFAFB' : '#A0A0A0'};
  font-size: 12px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
`;

const PaginationWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 13px;
`;

const PageNumber = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const PageNumberBackground = styled.div`
  width: 45px;
  height: 45px;
  left: 0;
  top: 0;
  position: absolute;
  background: ${({ active }) => (active ? 'black' : '#F2F2F2')};
  box-shadow: ${({ active }) => (active ? '0px 8px 16px rgba(0, 0, 0, 0.40)' : 'none')};
  border-radius: ${({ active }) => (active ? '30px' : '22.50px')};
`;

const PageNumberText = styled.div`
  left: ${({ number }) => (number >= 10 ? '14px' : '18px')};
  top: 11px;
  position: absolute;
  text-align: center;
  color: ${({ active }) => (active ? 'white' : '#404040')};
  font-size: 16px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
`;
const NextButton = styled.div`
  width: 45px;
  height: 45px;
  background: #F2F2F2;
  border-radius: 22.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const NextButtonText = styled.div`
  color: #404040;
  font-size: 24px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.3px;
`;


const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px; // 여기를 수정했습니다.
  padding: 16px; // 여기를 수정했습니다.
`;

const Card = styled.div`
  width: 100%;  // 카드의 너비를 100%로 설정하여 가로로 한 개씩 표시
  padding: 16px;
  background: white;
  border-radius: 16px;
  border: 1px solid #E6E6E6;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 24px;  // 카드 간의 마진을 조정
`;
const ProductInfo = styled.div`
  height: 200px;
  padding: 16px 0 8px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  display: flex;
`;
const ProductImage = styled.div`
  align-self: stretch;
  height: 200px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0px;
  display: flex;
`;
const ImageContainer = styled.div`
  width: 1000px;
  height: 200px;
  position: relative;
`;
const Image = styled.div`
  width: 110px;
  height: 110px;
  left: 0;
  top: 0;
  position: absolute;
  background: #BFBFBF;
  border-radius: 16px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  display: inline-flex;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding-left: 130px; // 제품 이미지 왼쪽에 여백을 줍니다.
`;

const ProductName = styled.div`
  flex-grow: 1; // 제품 이름이 남은 공간을 모두 차지하도록 설정
  color: black;
  font-size: 16px;
  font-family: 'Poppins';
  font-weight: 400;
  word-wrap: break-word;
`;

const WishIconContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  padding-left: 550px;
  cursor: pointer;
`;

const ProductGender = styled.div`
  align-self: stretch;
  color: #858585;
  font-size: 12px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
`;

const ProductPrice = styled.div`
  align-self: stretch;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 154px;
  display: inline-flex;
  color: black;
  font-size: 16px;
  font-family: 'Poppins';
  font-weight: 700;
  word-wrap: break-word;
`;

const ShoppingLinks = styled.div`
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  display: inline-flex;
`;

const ShoppingLink = styled.div`
  padding: px;
  background: white;
  border-radius: 16px;
  border: 1px solid #BFBFBF;
  justify-content: flex-start;
  align-items: center;
  gap: 1px;
  display: flex;
`;

const LinkInfo = styled.div`
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;

  img {
    width: 24px;
    height: 24px;
  }

  div {
    text-align: justify;
    color: black;
    font-size: 14px;
    font-family: 'Inter';
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0.3px;
    word-wrap: break-word;
  }
`;

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  let startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
  let endPage = Math.min(startPage + 9, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <PageNumber key={i} onClick={() => onPageChange(i)}>
        <PageNumberBackground active={currentPage === i} />
        <PageNumberText active={currentPage === i} number={i}>
          {i}
        </PageNumberText>
      </PageNumber>
    );
  }

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PaginationWrapper>
      {pageNumbers}
      {endPage < totalPages && (
        <NextButton onClick={handleNextClick}>
          <NextButtonText>&gt;</NextButtonText>
        </NextButton>
      )}
    </PaginationWrapper>
  );
};

function App() {
  const navigate = useNavigate();
  const [brandInfo, setBrandInfo] = useState(null);
  const [items, setItems] = useState([]); // 아이템 배열 상태 추가
  const [selectedCategory, setSelectedCategory] = useState('전체'); // 선택된 카테고리 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const { brandId } = useParams();
  const { accessToken } = useUser();
  const [liked, setLiked] = useState({});
  const [currentItems, setCurrentItems] = useState([]);
  const [brandLiked, setBrandLiked] = useState(false);

  useEffect(() => {
    const fetchBrandLikeStatus = async () => {
      try {
        const response = await axios.get(`http://112.175.29.231:30001/likes/brand/${brandId}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setBrandLiked(response.data.isLiked);
      } catch (error) {
        console.error('Failed to fetch brand like status:', error);
      }
    };
  
    fetchBrandLikeStatus();
  }, [brandId, accessToken]);

  const handleBrandHeartClick = async () => {
    try {
      await axios.post(
        'http://112.175.29.231:30001/likes/brand',
        { brandId: brandInfo.id },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setBrandLiked((prevLiked) => !prevLiked);
    } catch (error) {
      console.error('브랜드 좋아요 상태를 업데이트하는 데 실패했습니다:', error);
    }
  };

  const handleBrandSiteClick = () => {
    if (brandInfo?.site_url) {
      window.open(brandInfo.site_url, '_blank');
    }
  };

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const response = await axios.get(`http://112.175.29.231:30001/brand/items/${brandId}`);
        const data = response.data.data;
        setBrandInfo(data);
        setItems(data.items);
        setCurrentItems(data.items.slice(0, 10)); // 처음 10개 아이템만 보여줌
      } catch (error) {
        console.error('Failed to fetch brand data:', error);
      }
    };
  
    fetchBrandData();
  }, [brandId]);

  const totalPages = Math.ceil(items.length / 10);
  
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleWishClick = async (item) => {
    try {
      await axios.post(
        'http://112.175.29.231:30001/likes/item',
        { itemId: item.id },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setLiked((prevLiked) => ({
        ...prevLiked,
        [item.id]: !prevLiked[item.id],
      }));
    } catch (error) {
      console.error('좋아요 상태를 업데이트하는 데 실패했습니다:', error);
    }
  };

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * 10;
    const endIndex = startIndex + 10;
    setCurrentItems(items.slice(startIndex, endIndex));
  }, [items]);

  const Brand = () => {
    const location = useLocation();
    const imageUrl = location.state.imageUrl;
  
    // 이미지를 사용하세요
  };
  
  const handleLogoClick = () => navigate('/');
  const handleMenuClick = () => navigate('/menu');
  const handleSearchClick = () => navigate('/search');
  const handleInputClick = () => navigate('/input');

  return (
    <Container>
      <Wrapper>
        <HeaderContainer>
          <Icon as={MenuIcon} onClick={handleMenuClick} />
          <Logo onClick={handleLogoClick}>BRAiND</Logo>
          <div style={{ display: 'flex', marginLeft: 'auto' }}>
            <Icon as={InputIcon} onClick={handleInputClick} style={{ marginRight: '10px' }} />
            <Icon as={SearchIcon} onClick={handleSearchClick} />
          </div>
        </HeaderContainer>
        <ProfileWrapper>
          <ProfileImage>
            {brandInfo && (
              <img style={{ width: 90, height: 90 }} src={brandInfo.logo_url} alt="Profile" />
            )}
          </ProfileImage>
          <ProfileInfo>
            <ProfileName>{brandInfo?.name_kr}</ProfileName>
            <ProfileBrand>{brandInfo?.name_eng}</ProfileBrand>
            <ProfileYear>{brandInfo?.since}</ProfileYear>
          </ProfileInfo>
        </ProfileWrapper>
        <ButtonWrapper>
  <Button onClick={handleBrandHeartClick}>
    <ButtonInner style={{ display: 'flex', alignItems: 'center' }}>
      <ButtonIcon>
        {brandLiked ? <BrandheartRIcon /> : <BrandheartWIcon />}
      </ButtonIcon>
      <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px' }}>찜한 브랜드</span>
    </ButtonInner>
  </Button>
  <Button onClick={handleBrandSiteClick}>
    <ButtonInner style={{ display: 'flex', alignItems: 'center' }}>
      <ButtonIcon>
        <BrandhomeIcon />
      </ButtonIcon>
      <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px' }}>브랜드 사이트</span>
    </ButtonInner>
  </Button>
</ButtonWrapper>
        <ImageGrid>
          <img style={{width: 113, height: 113}} src="https://via.placeholder.com/113x113" alt="" />
          <img style={{width: 113, height: 113}} src="https://via.placeholder.com/113x113" alt="" />
          <img style={{width: 113, height: 113}} src="https://via.placeholder.com/113x113" alt="" />
          <img style={{width: 113, height: 113}} src="https://via.placeholder.com/113x113" alt="" />
          <img style={{width: 113, height: 113}} src="https://via.placeholder.com/113x113" alt="" />
          <img style={{width: 113, height: 113}} src="https://via.placeholder.com/113x113" alt="" />
        </ImageGrid>
      </Wrapper>
      <WrapperW>
        <FittingRoomWrapper>
          <FittingRoomHeader>
            <FittingRoomTitle>가상 피팅룸</FittingRoomTitle>
          </FittingRoomHeader>
          <FittingRoomContent>
            <FittingRoomImage>
              
              <img style={{width: 240, height: 354}} src="https://via.placeholder.com/240x354" alt="Fitting Room" />
            </FittingRoomImage>
            <FittingRoomUpload>
              <FittingRoomUploadContent>
                <FittingRoomUploadIcon>
                  <div style={{width: 61.51, height: 46.68, left: 1.25, top: 14.61, position: 'absolute', background: '#BFBFBF'}}></div>
                  <div style={{width: 16, height: 16, left: 0, top: 24, position: 'absolute'}}>
                    <div style={{width: 14.25, height: 14.25, left: 0.87, top: 0.87, position: 'absolute', background: '#BFBFBF'}}></div>
                  </div>
                  <div style={{width: 16, height: 16, left: 8, top: 0, position: 'absolute'}}>
                    <div style={{width: 14.25, height: 14.25, left: 0.87, top: 0.87, position: 'absolute', background: '#BFBFBF'}}></div>
                  </div>
                  <div style={{width: 20, height: 20, left: 44, top: 8, position: 'absolute'}}>
                    <div style={{width: 18.75, height: 18.75, left: 0.62, top: 0.62, position: 'absolute', background: '#BFBFBF'}}></div>
                  </div>
                </FittingRoomUploadIcon>
                <FittingRoomUploadText>
                  브랜드의 아이템을<br/>내 사진에 피팅해 보세요
                </FittingRoomUploadText>
              </FittingRoomUploadContent>
            </FittingRoomUpload>
          </FittingRoomContent>
        </FittingRoomWrapper>
        
        <ItemWrapper>
          <ItemTitle>아이템</ItemTitle>
          <ItemSortWrapper>
            <ItemSortLatest>최신순</ItemSortLatest>
            <ItemSortPopular>인기순</ItemSortPopular>
          </ItemSortWrapper>
        </ItemWrapper>
        <CategoryWrapper>
          <CategoryList>
            <CategoryButton active={selectedCategory === '전체'} onClick={() => setSelectedCategory('전체')}>
              <CategoryText active={selectedCategory === '전체'}>전체</CategoryText>
            </CategoryButton>
            <CategoryButton active={selectedCategory === '카테고리1'} onClick={() => setSelectedCategory('카테고리1')}>
              <CategoryText active={selectedCategory === '카테고리1'}>카테고리1</CategoryText>
            </CategoryButton>
          </CategoryList>
        </CategoryWrapper>
        <MainContent>
          {currentItems.map((item) => (
            <Card key={item.id}>
              <ProductInfo>
                <ProductImage>
                  <ImageContainer>
                    <Image>
                      <img src={item.img_url} alt="" />
                    </Image>
                    <ProductDetails>
                      <WishIconContainer onClick={() => handleWishClick(item)}>
                        {liked[item.id] ? <WishItemIcon /> : <WishItemWIcon />}
                      </WishIconContainer>
                      <ProductName>{item.name}</ProductName>
                      <ProductGender>{item.gender}</ProductGender>
                      <ProductPrice>{formatPrice(item.price)}원</ProductPrice>
                    </ProductDetails>
                  </ImageContainer>
                  <ShoppingLinks>
                    <ShoppingLink as="a" href={item.musinsa_link} target="_blank">
                      <LinkInfo>
                        <MusinsaIcon />
                      </LinkInfo>
                    </ShoppingLink>
                    <ShoppingLink as="a" href={item.naver_link} target="_blank">
                      <LinkInfo>
                        <NaverIcon />
                      </LinkInfo>
                    </ShoppingLink>
                  </ShoppingLinks>
                </ProductImage>
              </ProductInfo>
            </Card>
          ))}
        </MainContent>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </WrapperW>
    </Container>
  );
}

export default App;