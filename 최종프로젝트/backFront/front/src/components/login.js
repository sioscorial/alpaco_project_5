import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext'

// 스타일드 컴포넌트 정의
const maxWidth = 744;
const minWidth = 375;
const maxHeight = 1133;
const minHeight = 578;

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${maxWidth}px;
  min-width: ${minWidth}px;
  max-height: ${maxHeight}px;
  min-height: ${minHeight}px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10% 15%;
  @media (max-width: 768px) {
    padding: 8% 12%;
  }
  @media (max-width: 480px) {
    padding: 6% 10%;
  }
`;

const ContentArea = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 64px;
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const MainTitle = styled.div`
  text-align: center;
  color: black;
  font-size: 4.5vw;
  font-family: 'Inter';
  font-weight: 800;
  line-height: 1.5;
  word-wrap: break-word;
`;

const Subtitle = styled.div`
  width: 70%;
  text-align: center;
  color: black;
  font-size: 1.2vw;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 1.5;
  word-wrap: break-word;
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const HomeLink = styled.div`
  text-align: center;
  color: #a0a0a0;
  font-size: 1.2vw;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 1.5;
  word-wrap: break-word;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 8px 10px;
  margin: 5px 0;
  box-sizing: border-box;
  width: 200px;
`;

// 로그인 컴포넌트 정의
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const { setUserId, setAccessToken } = useUser();

  useEffect(() => {
    
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);

    console.log('Kakao SDK script added to the body.');

    script.onload = () => {
      console.log('Kakao SDK script loaded successfully.');
      window.Kakao.init('8d125425def80d83903c91ce78702de1');
      console.log('Kakao SDK initialized.');

      if (window.Kakao.isInitialized()) {
        console.log('Kakao SDK is initialized: ', window.Kakao.isInitialized());
        window.Kakao.Auth.createLoginButton({
          container: '#kakao-login-btn',
          success: (authObj) => {
            console.log('Login successful: ', authObj);
            navigate('/');
          },
          fail: (err) => {
            console.error('Login failed: ', err);
          },
        });
      } else {
        console.error('Kakao SDK initialization failed.');
      }
    };

    script.onerror = () => {
      console.error('Kakao SDK script failed to load.');
    };
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://112.175.29.231:30001/users/login', {
        name: username,
        password: password,
      });
      if (response.data && response.data.message === "SIGNIN_SUCCESS") {
        const { accessToken, userId } = response.data;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken); // 토큰을 로컬 스토리지에 저장
          setAccessToken(accessToken);  // UserContext에 accessToken 업데이트
          if (userId) {
            setUserId(userId); // UserContext에서 setUserId 함수를 사용하여 userId 상태 업데이트
            localStorage.setItem('userId', userId); // 사용자 ID를 로컬 스토리지에 저장
          }
          navigate('/');
        } else {
          throw new Error('No access token in the server response');
        }
      } else {
        throw new Error('Unexpected response from the server');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <LoginContainer>
      <ContentArea>
        <TitleArea>
          <MainTitle>BRAiND</MainTitle>
          <Subtitle>
            다양한 패션 브랜드의 스타일 패턴을 <br />
            학습한 AI를 통해<br />
            내 개성을 닮은 나만의 브랜드를 발견하세요.
          </Subtitle>
        </TitleArea>
        <ActionArea>
        <form onSubmit={handleLogin}>
          <Input type="text" placeholder="name" value={username} onChange={e => setUsername(e.target.value)} />
          <Input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">로그인</button>
        </form>
        {loginError && <p>{loginError}</p>}
          <div id="kakao-login-btn"></div>
          <HomeLink onClick={goToHome}>홈으로 가기</HomeLink>
        </ActionArea>
      </ContentArea>
    </LoginContainer>
  );
}

export default Login;