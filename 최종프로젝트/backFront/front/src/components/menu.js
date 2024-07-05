import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as RightarrowIcon } from '../assets/icons/arrow.svg';
import { ReactComponent as RankingIcon } from '../assets/icons/ranking.svg';
import { ReactComponent as MyBrandIcon } from '../assets/icons/mybrand.svg';
import { ReactComponent as WishIcon } from '../assets/icons/wish.svg';
import { ReactComponent as MyStyleIcon } from '../assets/icons/mystyle.svg';
import { useUser } from './UserContext'; 

const StyledMyStyleIcon = styled(MyStyleIcon)`
  width: 24px;
  height: 24px;
  margin-right: 8px; 
`;

const StyledWishIcon = styled(WishIcon)`
  width: 24px;
  height: 24px;
  margin-right: 8px; 
`;

const StyledMyBrandIcon = styled(MyBrandIcon)`
  width: 24px;
  height: 24px;
  margin-right: 8px; 
`;

const StyledRankingIcon = styled(RankingIcon)`
  width: 24px;
  height: 24px;
  margin-right: 8px; // 아이콘과 레이블 사이의 간격
`;

const ArrowIcon = styled(RightarrowIcon)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: auto; // 자동 마진을 통해 왼쪽 요소들과 분리
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
`;

const Container = styled.div`
  width: 100%;
  max-width: 744px; // 최대 너비 설정
  height: ${props => props.height};
  padding-bottom: 221px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 32px;
  margin: 0 auto; // 좌우 마진 자동으로 설정하여 중앙 정렬
`;

const Header = styled.div`
  width: 100%; // 전체 너비 사용
  height: 58px;
  display: flex;
  justify-content: center; // 중앙 정렬
  align-items: center; // 세로 중앙 정렬
`;

const Menu = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
`;

const MenuLabel = styled.div`
  color: #191A1D;
  font-size: 19px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 22.8px;
  word-wrap: break-word;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; // 아이템들을 양 끝에 배치
  width: 100%;
`;

const ItemLabel = styled.div`
  color: black;
  font-size: 21px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 29.4px;
  letter-spacing: 0.36px;
  word-wrap: break-word;
  cursor: pointer;
`;

const Info = styled.div`
  color: black;
  font-size: 19px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 22.8px;
  word-wrap: break-word;
  
`;

const InfoItem = styled.div`
  color: black;
  font-size: 15px;
  font-family: 'Inter';
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.36px;
  word-wrap: break-word;
  cursor: pointer;
`;

const Close = styled.div`
  color: black;
  font-size: 16px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.4px;
  word-wrap: break-word;
  text-align: center;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 584px;
  height: 0;
  border: 1.2px solid #E6E6E6;
`;

// Since we don't have the actual icons as SVGs or images, I've used placeholders
const IconPlaceholder = styled.div`
  border-radius: 1200px;
  border: 1.2px solid #E6E6E6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-grow: 1; // 남는 공간을 모두 차지하도록 설정
`;

function MyComponent() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [containerWidth, setContainerWidth] = useState('100vw'); 
  const [containerHeight, setContainerHeight] = useState('100vh');
  const { setAccessToken, setUserId } = useUser();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 
  function handleResize() {
    const maxWidth = 744;
    const minWidth = 375;
    const maxHeight = 1133;
    const minHeight = 578;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const newWidth = Math.min(Math.max(windowWidth, minWidth), maxWidth);
    const newHeight = Math.min(Math.max(windowHeight, minHeight), maxHeight);

    setContainerWidth(`${newWidth}px`);
    setContainerHeight(`${newHeight}px`);
  }

  function handleLogout() {
    // 로컬 스토리지에서 토큰과 사용자 ID 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    
    // UserContext에서 상태 업데이트
    setAccessToken(null);
    setUserId(null);
    
    // 로그인 상태를 false로 설정 (이 부분은 필요하다면, UserContext 내에서 관리하는 것이 좋습니다.)
    setIsLoggedIn(false);
    
    // 홈 페이지로 리다이렉션
    navigate('/');
  }
  // 핸들러 함수 정의
  const handleLogoClick = () => navigate('/');
  const handleRankingClick = () => navigate('/ranking');
  const handleMyStyleClick = () => navigate('/mystyle');
  const handleMyBrandClick = () => navigate('/mybrand');
  const handleWishItemClick = () => navigate('/wishlist');


  return (
    <Container style={{ width: containerWidth, height: containerHeight }}>
      <Header>
        {/* Placeholder for menu icon */}
        <IconPlaceholder />
        <Logo onClick={handleLogoClick}>BRAiND</Logo>
        {/* Placeholder for search icon */}
        <IconPlaceholder />
      </Header>
      <Menu>
        <MenuGroup>
          <MenuLabel>MENU</MenuLabel>
          {/* 각 메뉴 항목을 별도의 행으로 분리 */}
          <MenuItem>
            <ItemContent>
            <StyledRankingIcon />
            <ItemLabel onClick={(handleRankingClick)}>Ranking</ItemLabel>
            </ItemContent>
            <ArrowIcon onClick={() => navigate('/ranking')} />
            {/* Placeholder for arrow icon */}
            <IconPlaceholder />
          </MenuItem>
          <Divider />
          <MenuItem>
            <ItemContent>
            <StyledMyStyleIcon />
            <ItemLabel onClick={(handleMyStyleClick)}>My Style</ItemLabel>
            </ItemContent>
            <ArrowIcon onClick={() => navigate('/mystyle')} />
            <IconPlaceholder />
          </MenuItem>
          <Divider />
          <MenuItem>
            <ItemContent>
            <StyledMyBrandIcon />
            <ItemLabel onClick={(handleMyBrandClick)}>My Brand</ItemLabel>
            </ItemContent>
            <ArrowIcon onClick={() => navigate('/mybrand')} />
            <IconPlaceholder />
          </MenuItem>
          <Divider />
          <MenuItem>
            <ItemContent>
            <StyledWishIcon />
            <ItemLabel onClick={(handleWishItemClick)}>Wish Item</ItemLabel>
            </ItemContent>
            <ArrowIcon onClick={() => navigate('/wishitem')} />
            <IconPlaceholder />
          </MenuItem>
          <Divider />
          {/* 다른 메뉴 항목들을 여기에 추가 */}
        </MenuGroup>
        <MenuGroup>
          <Info>INFO</Info>
          <InfoItem>프로젝트소개</InfoItem>
          <InfoItem>Contact Us</InfoItem>
          <InfoItem>이용 약관</InfoItem>
          <InfoItem>개인정보 처리방침</InfoItem>
          <InfoItem onClick={isLoggedIn ? handleLogout : () => navigate('/login')}>
            {isLoggedIn ? '로그아웃' : '로그인'}
          </InfoItem>
          <Divider />
          {/* 다른 인포 항목들을 여기에 추가 */}
        </MenuGroup>
        {/* Placeholder for logout/email/unsubscribe */}
        <IconPlaceholder />
        <Close onClick={handleLogoClick}>Close</Close>
      </Menu>
    </Container>
  );
};




export default MyComponent;
