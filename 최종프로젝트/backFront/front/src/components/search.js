import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../assets/icons/Search.svg';
import { ReactComponent as RightBrandIcon } from '../assets/icons/rightbrand.svg';
import { ReactComponent as BackIconSvg } from '../assets/icons/backbtn.svg';
import axios from 'axios';

const consonants = [
  { label: 'ㄱ', startName: '가', endName: '나' },
  { label: 'ㄴ', startName: '나', endName: '다' },
  { label: 'ㄷ', startName: '다', endName: '라' },
  { label: 'ㄹ', startName: '라', endName: '마' },
  { label: 'ㅁ', startName: '마', endName: '바' },
  { label: 'ㅂ', startName: '바', endName: '사' },
  { label: 'ㅅ', startName: '사', endName: '아' },
  { label: 'ㅇ', startName: '아', endName: '자' },
  { label: 'ㅈ', startName: '자', endName: '차' },
  { label: 'ㅊ', startName: '차', endName: '카' },
  { label: 'ㅋ', startName: '카', endName: '타' },
  { label: 'ㅌ', startName: '타', endName: '파' },
  { label: 'ㅍ', startName: '파', endName: '하' },
  { label: 'ㅎ', startName: '하', endName: '히' },
];


const Container = styled.div`
  position: relative;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
  padding-top: 58px;
  overflow: hidden; // Prevents whole page scroll
`;

const SearchBar = styled.div`
  padding: 7px 24px;
  left: 0;
  top: 0;
  position: absolute;
  background: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  width: 100%;
  z-index: 10;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background: #f2f2f2;
  flex-grow: 1;
  margin-left: auto;
  width: 100%; // Ensures input field occupies all available space
`;


const BrandList = styled.div`
  width: 100%;
  padding: 8px 40px;
  top: 66px;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const BrandItem = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
`;

const BrandItemCircle = styled.div`
  width: 40px;
  height: 40px;
  left: 0;
  top: 0;
  position: absolute;
  background: ${(props) => (props.active ? 'black' : '#F2F2F2')};
  box-shadow: ${(props) =>
    props.active ? '0px 8px 16px rgba(0, 0, 0, 0.40)' : 'none'};
  border-radius: ${(props) => (props.active ? '25px' : '20px')};
  cursor: pointer;
`;

const BrandItemText = styled.div`
  left: ${(props) => (props.active ? '12px' : '13px')};
  top: 9px;
  position: absolute;
  text-align: center;
  color: ${(props) => (props.active ? 'white' : '#404040')};
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.2px;
  word-wrap: break-word;
`;

const BrandListContent = styled.div`
  position: absolute;
  top: 120px;
  width: 100%;
  height: calc(100vh - 250px); // 서치바, BrandList, 안전 여백 고려
  overflow: hidden; // 스크롤 숨김
`;

const BrandTitle = styled.div`
  position: sticky;
  top: 10px;
  z-index: 1;
  background-color: white;
  padding-bottom: 10px;
  color: black;
  font-size: 16px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 19.2px;
  word-wrap: break-word;
  margin-left: 30px;
`;

const BrandItems = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 10px; // 하단 여백
`;


const BrandItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  cursor: pointer;
`;

const BrandItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; // 브랜드 아이템 내부 간격 줄임
  height: 60px; // 브랜드 아이템 높이 줄임
`;

const BrandItemInfo = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const BrandItemLogo = styled.div`
  width: 70px;
  height: 70px;
  position: relative;
  background: white;
  border-radius: 50%;
  overflow: hidden;
  border: 1px #e6e6e6 solid;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;
const BrandItemLogoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  padding: 0 40px;
  overflow-x: hidden;
`;
const BrandItemLogoImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const BrandItemLogoPlaceholder = styled.div`
  width: 30px;
  height: 14.76px;
  left: 5px;
  top: 13px;
  position: absolute;
  background: #C4C4C4;
`;

const BrandItemName = styled.div`
  color: black;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0.3px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1; // 브랜드 이름이 남은 공간을 차지
  cursor: pointer;
`;



const BrandItemSeparator = styled.div`
  align-self: stretch;
  height: 0;
  border: 1px #E6E6E6 solid;
`;

const RightBrandIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;



function Search() {
  const navigate = useNavigate();
  const [containerHeight, setContainerHeight] = useState('100vh');
  const [containerWidth, setContainerWidth] = useState('100vw');
  const [brands, setBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    function updateSize() {
      setContainerWidth(Math.min(window.innerWidth, 744) + 'px');
      setContainerHeight(Math.min(window.innerHeight, 1133) + 'px');
    }
    
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleConsonantClick = async (startName, endName) => {
    try {
      const response = await axios.get(`http://112.175.29.231:30001/brand/search`, {
        params: { startName, endName }
      });
      setBrands(response.data);
      
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleBrandClick = (brandId) => {
    navigate(`/brand/${brandId}`);
  };
  
  useEffect(() => {
    // 페이지가 처음 로드될 때 가-나 자음에 해당하는 브랜드 리스트를 불러옴
    handleConsonantClick('가', '나');
  }, []);




  const fetchBrands = async (query) => {
    try {
      const response = await axios.get(`http://112.175.29.231:30001/search`, {
        params: { query }
      });
      setBrands(response.data);
    
    } catch (error) {
      console.error('Error searching brands:', error);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      fetchBrands(query);
    } else {
      setBrands([]);
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    fetchBrands(searchQuery);
  };

  

  return (
    <Container style={{ width: containerWidth, height: containerHeight }}>
       <SearchBar>
  <BackIconSvg onClick={() => navigate('/')} />
  <SearchIcon />
  <form onClick={() => navigate('/searchbrand')}>
    <SearchInput
      type="text"
      placeholder="브랜드 이름 검색"
      value={searchQuery}
      onClick={() => navigate('/searchbrand')}
    />
  </form>
</SearchBar>
<BrandList>
  {consonants.map(({ label, startName, endName }) => (
    <BrandItem key={label}>
      <BrandItemCircle onClick={() => handleConsonantClick(startName, endName)}>
        <BrandItemText>{label}</BrandItemText>
      </BrandItemCircle>
    </BrandItem>
  ))}
</BrandList>
<BrandListContent>
  <BrandTitle>브랜드 리스트</BrandTitle>
  <BrandItems>
    <BrandItemLogoContainer>
      {brands.map((brand) => (
        <BrandItemContainer key={brand.id} onClick={() => handleBrandClick(brand.id)}>
          <BrandItemRow>
            <BrandItemInfo>
              <BrandItemLogo hasLogo={brand.brand_logo_url}>
                {brand.brand_logo_url ? (
                  <BrandItemLogoImage src={brand.brand_logo_url} alt={brand.brand_name_kr} />
                ) : (
                  <BrandItemLogoPlaceholder />
                )}
              </BrandItemLogo>
            </BrandItemInfo>
            <BrandItemName>{brand.brand_name_kr}</BrandItemName>
            <RightBrandIconContainer>
    <RightBrandIcon />
  </RightBrandIconContainer>
          </BrandItemRow>
          <BrandItemSeparator />
        </BrandItemContainer>
      ))}
    </BrandItemLogoContainer>
  </BrandItems>
</BrandListContent>
    </Container>
  );
}

export default Search;