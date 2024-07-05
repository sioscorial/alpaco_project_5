import styled from 'styled-components';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/Search.svg';
import { ReactComponent as InputIcon } from '../assets/icons/inputdata.svg';
import { ReactComponent as TrashIcon } from '../assets/icons/trash.svg';
import { ReactComponent as PersonIcon } from '../assets/icons/person.svg';
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
  pointer-events: auto; /* 클릭 가능하도록 설정 */
`;
const TrashIconWrapper = styled.div`
  cursor: pointer;
  pointer-events: auto;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: white;
  margin: 0 auto; /* 가운데 정렬을 위한 스타일 추가 */
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
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; // 카드들을 중앙 정렬
  gap: 24px;
  padding: 100px 20px 100px; /* 아래 여백 추가 */
`;

const Card = styled.div`
  flex: 1 1 300px; // Each card starts at 300px
  max-width: 350px; // Max card width
  padding: 24px;
  background: white;
  border-radius: 16px;
  border: 1px solid #E6E6E6;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;


const CardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.div`
  background: #F2F2F2;
  border-radius: 16px;
  padding: 4px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DateText = styled.div`
  color: #A0A0A0;
  font-size: 12px;
  font-family: 'Inter';
  font-weight: '500';
  line-height: 18px;
  word-wrap: break-word;
`;



const CardImage = styled.div`
  width: 100%;
  max-width: 250px;
  height: 250px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const CardInfo = styled.div`
  width: 100%;
  padding: 16px;
  background: white;
  border-radius: 16px;
  border: 1px solid #BFBFBF;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;
`;

const TouchIconWrapper = styled.div`
  cursor: pointer;
  pointer-events: auto;
  display: flex;
  align-items: center;
`;

const RecommendButton = styled.div`
  text-align: justify;
  color: black;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
  cursor: pointer;
`;

function MyStyle() {
  const navigate = useNavigate();
  const [containerHeight, setContainerHeight] = useState('100vh');
  const [containerWidth, setContainerWidth] = useState('100vw');
  const { userId, accessToken } = useUser();
  const [styleData, setStyleData] = useState([]);
  
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
      const fetchStyleData = async () => {
        if (!userId || !accessToken) return;
    
        try {
          const response = await axios.get('http://112.175.29.231:30001/users/style', {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { user_id: userId },
          });
          const fullData = response.data.data;
          // 데이터가 4개 미만인 경우 빈 데이터 추가
          while (fullData.length < 4) {
            fullData.push({ id: `empty-${fullData.length}`, empty: true });
          }
          setStyleData(fullData);
        } catch (error) {
          console.error('스타일 데이터를 불러오는 데 실패했습니다:', error);
        }
      };
      fetchStyleData();
    }, [userId, accessToken]);


    const deleteStyleImg = async (itemId) => {
      try {
        const response = await axios.delete('http://112.175.29.231:30001/style/delete', {
          headers: { Authorization: `Bearer ${accessToken}` },
          data: { id: itemId },
        });
        console.log(response.data);
    
        const updatedStyleData = styleData.filter((item) => item.id !== itemId);
        
        // 삭제 후 빈 카드 데이터 추가
        updatedStyleData.push({ id: `empty-${Date.now()}`, empty: true });
        
        setStyleData(updatedStyleData);
      } catch (error) {
        console.error('스타일 이미지 삭제 실패:', error);
      }
    };
    

    const handleTrashClick = (itemId) => {
      deleteStyleImg(itemId);
    };
  

  const handleLogoClick = () => navigate('/');
  const handleMenuClick = () => navigate('/menu');
  const handleSearchClick = () => navigate('/search')
  const handleInputClick = () => navigate('/input')
  const handleMystyleClick = () => navigate('/mystyle');
  const handleMyBrandClick = () => navigate('/mybrand');
  const handleWishlistClick = () => navigate('/wishlist');
  const handleRecommendClick = (itemId) => {
    navigate(`/result/${itemId}`);
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
            <Title color="black" onClick={handleMystyleClick} style={{ fontWeight: 'bold' }}>My Style</Title>
            <BottomBorder active />
          </Section>
          <Section>
            <Title color="#A0A0A0" onClick={handleMyBrandClick}>My Brand</Title>
            <BottomBorder />
          </Section>
          <Section>
            <Title color="#A0A0A0" onClick={handleWishlistClick}>Wishlist</Title>
            <BottomBorder />
          </Section>
        </HeaderContent>
      </HeaderBar>
      <MainContent>
        {styleData.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>
                <Title color="black" fontSize="12px" fontWeight="700">{item.content_type}</Title>
              </CardTitle>
              <DateText>{new Date(item.created_at).toLocaleDateString()}</DateText>
              <TrashIconWrapper onClick={() => handleTrashClick(item.id)}>
              <Icon as={TrashIcon} />
            </TrashIconWrapper>
            </CardHeader>
            <CardImage>
        {item.empty ? (
          <Icon as={PersonIcon} />
        ) : (
          <img src={item.img_url} alt="스타일 이미지" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
        )}
      </CardImage>
      <CardInfo>
  <TouchIconWrapper onClick={() => handleRecommendClick(item.id)}>
    <Icon as={InputIcon} />
  </TouchIconWrapper>
  <RecommendButton onClick={() => handleRecommendClick(item.id)}>
    스타일로 브랜드 추천받기
  </RecommendButton>
</CardInfo>
          </Card>
        ))}
      </MainContent>
    </Container>
  );
};

export default MyStyle;
