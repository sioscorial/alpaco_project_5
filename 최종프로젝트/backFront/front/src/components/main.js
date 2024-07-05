import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../assets/icons/SearchW.svg';
import { ReactComponent as MenuIcon } from '../assets/icons/menuW.svg';
import { ReactComponent as LeftArrowIcon } from '../assets/icons/leftArrow.svg';
import { ReactComponent as RightArrowIcon } from '../assets/icons/rightArrow.svg';
import { ReactComponent as InputIcon } from '../assets/icons/inputdataW.svg';
import Menu from './menu.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { A11y } from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function MyComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://112.175.29.231:30001/back');
        setBackgroundImages(response.data.randomImg);
      } catch (error) {
        console.error('Error fetching random images:', error);
      }
    };

    fetchData();
  }, []);




  const handleBrandIconClick = () => navigate('/');
  const handleMenuClick = () => navigate('/menu');
  const handleBrandClick = () => navigate('/');
  const handleSearchClick = () => navigate('/search');
  const handleLeftArrowClick = () => setBackgroundIndex(prevIndex => (prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1));
  const handleRightArrowClick = () => setBackgroundIndex(prevIndex => (prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1));
  const handleInputClick = () => navigate('/input')

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
      <div style={{
        position: 'relative',
        maxWidth: '440px', // 최대 너비
        width: '100%', // 부모의 너비를 따름
        maxHeight: '1133px', // 최대 높이
        height: '100vh', // 화면 높이의 100%
        backgroundImage: `url(${backgroundImages[backgroundIndex]?.img_path})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 2, cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={handleMenuClick}>
          <MenuIcon style={{ width: 24, height: 24 }} />
        </div>
        <div style={{ position: 'absolute', top: 28, left: '50%', transform: 'translate(-50%, -50%)', cursor: 'pointer', zIndex: 2 }} onClick={handleBrandClick}>
          <div style={{ textAlign: 'center', color: 'white', fontSize: 32, fontFamily: 'Inter', fontWeight: 800, lineHeight: '41.6px', wordWrap: 'break-word' }}>BRAiND</div>
        </div>
        <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 2, cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={handleSearchClick}>
          <SearchIcon style={{ width: 24, height: 24 }} />
        </div>
        <div style={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', zIndex: 2, cursor: 'pointer' }} onClick={handleLeftArrowClick}>
          <LeftArrowIcon style={{ width: 24, height: 24 }} />
        </div>
        <div style={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', zIndex: 2, cursor: 'pointer' }} onClick={handleRightArrowClick}>
          <RightArrowIcon style={{ width: 24, height: 24 }} />
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
        <div style={{ width: '100%', textAlign: 'center', color: 'white', fontSize: 25, fontFamily: 'Inter', fontWeight: 700, lineHeight: '41.6px', wordWrap: 'break-word' }}>
            나를 닮은 브랜드를<br />찾아주는 AI
          </div>
          <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={58}
              slidesPerView={8}
              direction="horizontal"
              navigation={false}
              pagination={false}
              style={{ width: '100%' }}
            >
              {backgroundImages[backgroundIndex]?.brand_logos.split(', ').map((brandLogoUrl, i) => (
                <SwiperSlide key={i}>
                  <div
                    onClick={() => handleBrandIconClick(backgroundImages[backgroundIndex].brand_ids.split(', ')[i])}
                    style={{
                      width: 35,
                      height: 35,
                      padding: 10,
                      background: 'white',
                      borderRadius: '60%',
                      overflow: 'hidden',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      style={{ maxWidth: '130%', maxHeight: '100%' }}
                      src={brandLogoUrl}
                      alt={`Brand${i}`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16, width: '100%', maxWidth: 343 }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <span style={{ color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: 400, lineHeight: '21px', wordWrap: 'break-word' }}>패션 브랜드들의 스타일을 학습한 </span>
              <span style={{ color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: 700, lineHeight: '21px', wordWrap: 'break-word' }}>BRAiND</span>
              <span style={{ color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: 400, lineHeight: '21px', wordWrap: 'break-word' }}>에 내 스타일 사진을 올리고 나를 닮은 브랜드를 발견하세요.</span>
            </div>
          </div>

          <div
  style={{
    padding: '16px',
    background: 'black',
    borderRadius: '20px',
    maxWidth: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    marginBottom: 16,
  }}
  onClick={handleInputClick}
>
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <InputIcon style={{ width: 24, height:18, cursor: 'pointer' }} onClick={handleInputClick} />
    <div style={{ textAlign: 'center', color: 'white', fontSize: '16px', fontFamily: 'Inter', fontWeight: '600', lineHeight: '24px' }}>
      내 스타일로 브랜드 추천받기
    </div>
  </div>
</div>


          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            {backgroundImages.map((_, index) => (
              <div
                key={index}
                style={{
                  width: index === backgroundIndex ? 30 : 16,
                  height: 8,
                  background: index === backgroundIndex ? 'black' : '#E6E6E6',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
                onClick={() => setBackgroundIndex(index)}
              />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16, width: '100%' }}>
          </div>
        </div>
        {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
      </div>
    </div>
  );
};

export default MyComponent;