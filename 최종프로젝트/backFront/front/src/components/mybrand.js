import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/Search.svg';
import { ReactComponent as InputIcon } from '../assets/icons/inputdata.svg';
import { ReactComponent as HeartIcon } from '../assets/icons/heartred.svg';
import { ReactComponent as HeartWIcon } from '../assets/icons/heartW.svg';
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
  width: 87%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
  padding: 100px 20px;
`;

const Card = styled.div`
  flex: 1 1 calc(33.333% - 20px); // Three cards per row, considering 20px gap
  max-width: calc(33.333% - 20px); // Adjust maximum width accordingly
  padding: 16px;
  background: grey;
  border-radius: 16px;
  border: 1px solid #E6E6E6;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 0px;

  @media (min-width: 769px) {
    flex: 1 1 calc(25% - 20px); // Ensure consistency in larger screens
    max-width: calc(25% - 20px);
  }
`;
const CardContainer = styled.div`
  width: 161px;
  height: 200px;
  position: relative;
  background: white;
  box-shadow: 0px 4px 30px rgba(27, 25, 86, 0.1);
  border-radius: 16px;
`;
const BrandNameKR = styled.div`
  position: absolute;
  top: 138px; // 한글 이름의 위치
  left: 15px;
  text-align: center;
  color: black;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;
const BrandNameEN = styled.div`
  position: absolute;
  top: 158px; // 영어 이름이 한글 이름보다 아래에 위치하도록 설정
  left: 15px;
  text-align: center;
  color: black;
  font-size: 12px; // 영어 이름은 조금 더 작게 설정
  font-family: 'Inter';
  font-weight: 700; // 영어 이름은 조금 더 가볍게 설정
  line-height: 18px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;
const CardImage = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  top: 32px;
  left: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain; // Changed from 'cover' to 'contain' to prevent cropping
  }
`;


const HeartIconContainer = styled.div`
  width: 40px;  // 하트 아이콘 크기를 더 크게 조정
  height: 40px; // 하트 아이콘 높이를 더 크게 조정
  position: absolute;
  top: 180px; // 위치 조정
  left: 51px; // 위치 조정
  padding: 10px; // 안쪽 여백 증가
  border-radius: 30px; // 둥근 모서리를 더욱 강조
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    width: 100%;  // SVG 아이콘의 크기를 컨테이너에 맞춤
    height: 100%; // SVG 아이콘의 높이를 컨테이너에 맞춤
  
  }
`;




function MyBrand() {
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
    const fetchBrandLikes = async () => {
      if (!userId || !accessToken) return;
  
      try {
        const response = await axios.get('http://112.175.29.231:30001/likes/brandAll', {
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
    fetchBrandLikes();
  }, [userId, accessToken]);

  const handleLogoClick = () => navigate('/');
  const handleMenuClick = () => navigate('/menu');
  const handleSearchClick = () => navigate('/search')
  const handleInputClick = () => navigate('/input')
  const handleMystyleClick = () => navigate('/mystyle');
  const handleMyBrandClick = () => navigate('/mybrand');
  const handleWishlistClick = () => navigate('/wishlist');
  
  const handleHeartClick = async (item) => {
    try {
      await axios.post(
        'http://112.175.29.231:30001/likes/brand',
        { brandId: item.id },
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
            <Title color="black" onClick={handleMyBrandClick} style={{ fontWeight: 'bold' }}>My Brand</Title>
            <BottomBorder active/>
          </Section>
          <Section>
            <Title color="#A0A0A0" onClick={handleWishlistClick} >Wishlist</Title>
            <BottomBorder />
          </Section>
        </HeaderContent>
      </HeaderBar>
      <MainContent>
        {styleData.map((item) => (
          <Card key={item.id}>
            <CardContainer>
              <CardImage>
                <img src={item.brand_logo_url} alt={`로고`} />
              </CardImage>
              <BrandNameKR>{item.brand_name_kr}</BrandNameKR>
              <BrandNameEN>{item.brand_name_eng}</BrandNameEN>
              <HeartIconContainer onClick={() => handleHeartClick(item)}>
                {liked[item.id] ? <HeartIcon /> : <HeartWIcon />}
              </HeartIconContainer>
            </CardContainer>
          </Card>
        ))}
      </MainContent>
    </Container>
  );
};


export default MyBrand;

