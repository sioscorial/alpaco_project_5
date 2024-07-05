import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/Search.svg';
import { ReactComponent as InputIcon } from '../assets/icons/inputdata.svg';
import { ReactComponent as WishItemIcon } from '../assets/icons/wishitem.svg';
import { ReactComponent as WishItemWIcon } from '../assets/icons/wishitemW.svg';
import { ReactComponent as MusinsaIcon } from '../assets/icons/musinsa.svg';
import { ReactComponent as NaverIcon } from '../assets/icons/naverlink.svg';
import { useUser } from './UserContext';
import axios from 'axios';

const HeaderContainer = styled.div`
  width: 100%;
  height: 58px;
  position: relative;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Logo = styled.div`
  text-align: center;
  color: black;
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
  margin: 0 auto;
`;

const HeaderBar = styled.div`
  width: 744px;
  height: 58px;
  position: absolute;
  top: 58px;
`;
const BorderLine = styled.div`
  width: 744px;
  height: 0;
  position: absolute;
  top: 70px;
  border-top: 2px solid #F2F2F2;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Section = styled.div`
  width: 248px;
  height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 17px;
`;

const Title = styled.div`
  text-align: center;
  color: ${props => props.color};
  font-size: 18px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 25.20px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
  cursor: pointer; /* 커서를 포인터로 변경하여 클릭 가능하도록 함 */
`;

const BottomBorder = styled.div`
  width: 248px;
  height: 0;
  position: absolute;
  top: 70px;
  border-top: 4px solid ${props => props.active ? '#191A1D' : 'transparent'};
`;

const MainContent = styled.div`
  width: 100%;  // MainContent의 너비를 100%로 설정
  display: flex;
  flex-direction: column;  // 카드를 세로로 나열
  justify-content: flex-start;
  gap: 24px;
  padding: 100px 20px;
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

const BrandInfo = styled.div`
  width: 343px;
  height: 40px;
  position: relative;
`;

const BrandLogo = styled.div`
  width: 45px;
  height: 45px;
  padding: 0px 10.24px 1px;
  left: 0;
  top: 0;
  position: absolute;
  background: white;
  border-radius: 100px;
  overflow: hidden;
  border: 0.5px solid #E6E6E6;
  justify-content: center;
  align-items: center;
  display: inline-flex;

  img {
    width: 100%;
    height: 100%;
  }
`;

const BrandNameKR = styled.div`
  left: 80px;
  top: 5px;
  position: absolute;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  display: inline-flex;
  color: black;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
`;
const BrandNameEN = styled.div`
  position: absolute;
  top: 25px; // 영어 이름이 한글 이름보다 아래에 위치하도록 설정
  left: 80px;
  text-align: center;
  color: black;
  font-size: 12px; // 영어 이름은 조금 더 작게 설정
  font-family: 'Inter';
  font-weight: 700; // 영어 이름은 조금 더 가볍게 설정
  line-height: 18px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
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
  cursor: pointer
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







function Wishlist() {
  const navigate = useNavigate();
  const [containerHeight, setContainerHeight] = useState('100vh');
  const [containerWidth, setContainerWidth] = useState('100vw');
  const { userId, accessToken } = useUser();
  const [styleData, setStyleData] = useState([]);
  const [liked, setLiked] = useState({});
  
  useEffect(() => {
    function updateSize() {
      setContainerWidth(Math.min(window.innerWidth, 744) + 'px');
      setContainerHeight(Math.min(window.innerHeight, 1133) + 'px');
    }
  
    window.addEventListener('resize', updateSize);
    updateSize();
  
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const fetchItemLikes = async () => {
      if (!userId || !accessToken) return;
  
      try {
        const response = await axios.get('http://112.175.29.231:30001/likes/itemAll', {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { user_id: userId },
        });
  
        const fullData = response.data.data;
        setStyleData(fullData);
  
        // 좋아요 상태 초기화
        const initialLiked = {};
        fullData.forEach((item) => {
          initialLiked[item.id] = true;
        });
        setLiked(initialLiked);
      } catch (error) {
        console.error('브랜드 데이터를 불러오는 데 실패했습니다:', error);
      }
    };
    fetchItemLikes();
  }, [userId, accessToken]);

  const handleLogoClick = () => navigate('/');
  const handleMenuClick = () => navigate('/menu');
  const handleSearchClick = () => navigate('/search')
  const handleInputClick = () => navigate('/input')
  const handleMystyleClick = () => navigate('/mystyle');
  const handleMyBrandClick = () => navigate('/mybrand');
  const handleWishlistClick = () => navigate('/wishlist');
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

  return (
    <Container style={{ width: containerWidth, height: containerHeight }}>
      <HeaderContainer>
        <Icon as={MenuIcon} onClick={handleMenuClick} />
        <Logo onClick={handleLogoClick}>BRAiND</Logo>
        <div style={{ display: 'flex' }}>
          <Icon as={InputIcon} onClick={handleInputClick} style={{ marginRight: '10px' }} />
          <Icon as={SearchIcon} onClick={handleSearchClick} />
        </div>
      </HeaderContainer>
      <HeaderBar>
        <BorderLine />
        <HeaderContent>
          <Section>
            <Title color="#A0A0A0" onClick={handleMystyleClick}>My Style</Title>
            <BottomBorder />
          </Section>
          <Section>
            <Title color="#A0A0A0" onClick={handleMyBrandClick} >My Brand</Title>
            <BottomBorder />
          </Section>
          <Section>
            <Title color="black" onClick={handleWishlistClick} style={{ fontWeight: 'bold' }} >Wishlist</Title>
            <BottomBorder active/>
          </Section>
        </HeaderContent>
      </HeaderBar>
      <MainContent>
  {styleData.map((item) => (
    <Card key={item.id}>
      <BrandInfo>
        <BrandLogo>
          <img src={item.brand_logo_url} alt="로고" />
        </BrandLogo>
        <BrandNameKR>{item.brand_name_kr}</BrandNameKR>
        <BrandNameEN>{item.brand_name_eng}</BrandNameEN>
      </BrandInfo>
      <ProductInfo>
        <ProductImage>
          <ImageContainer>
            <Image>
              <img src={item.img_url} alt="상품 이미지" />
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
    </Container>
  );
};


export default Wishlist;

