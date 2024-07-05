import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PersonIcon } from '../assets/icons/person.svg';
import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/Search.svg';
import { ReactComponent as InputIcon } from '../assets/icons/inputdata.svg';
import axios from 'axios';

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 578px;
  max-width: 744px;
  max-height: 1133px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  margin: 0 auto;
`;

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
`;


const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const Message = styled.div`
  text-align: center;
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-family: 'Inter';
  font-weight: ${props => props.fontWeight};
  line-height: ${props => props.lineHeight};
  word-wrap: break-word;
`;

const Home = styled.div`
  text-align: center;
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-family: 'Inter';
  font-weight: ${props => props.fontWeight};
  line-height: ${props => props.lineHeight};
  word-wrap: break-word;
  cursor: pointer;
`;


const UploadSection = styled.label`
  padding: 50.25px;
  background: #FAFAFB;
  border-radius: 12px;
  overflow: hidden;
  border: 3px #E6E6E6 dotted;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

function Input() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState('100vh');
  const [containerWidth, setContainerWidth] = useState('100vw');

  useEffect(() => {
    const handleResize = () => {
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
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleFileUploadClick = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login');
      return;
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await axios.post('http://112.175.29.231:30001/style', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      console.log('File upload response:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  const handleLogoClick = () => navigate('/');
  const handleMenuClick = () => navigate('/menu');
  const handleHomeClick = () => navigate('/');
  const handleSearchClick = () => navigate('/search');
  const handleInputClick = () => navigate('/input');

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
      <ContentContainer>
        <Message fontSize="20px" fontWeight="700" lineHeight="24px" color="black">
          스타일에 적합한 브랜드 추천을 위해 <br />전신 코디 사진을 업로드 하세요
        </Message>
        <UploadSection onClick={handleFileUploadClick}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
          <PersonIcon />
          <Message fontSize="10px" fontWeight="600" lineHeight="15px" color="#BFBFBF">
            1인 전신 코디 사진<br />업로드하기
          </Message>
        </UploadSection>
        <Message fontSize="14px" fontWeight="400" lineHeight="21px" color="black">
          현재 브래인드는 베타 버전으로 정확한 스타일 분석을 위해 <br />
          '<strong>1인 전신 코디 사진</strong>'만 브랜드 추천을 제공하고 있어요.<br />
          (업로드된 사진은 스타일 외부에 보여지지 않아요)
        </Message>
        <Home fontSize="14px" fontWeight="600" lineHeight="21px" color="#A0A0A0" onClick={handleHomeClick}>
          홈으로 이동
        </Home>
      </ContentContainer>
    </Container>
  );
};

export default Input;
