import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../assets/icons/Search.svg';
import { ReactComponent as BackIconSvg } from '../assets/icons/backbtn.svg';
import { ReactComponent as XIconSvg } from '../assets/icons/xicon.svg';
import { ReactComponent as HeartRed } from '../assets/icons/brandheartR.svg';
import { ReactComponent as HeartWhite } from '../assets/icons/brandheartW.svg';
import { ReactComponent as Homepage } from '../assets/icons/brandhome.svg';
import axios from 'axios';
import { useUser } from './UserContext';


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

const BrandListContent = styled.div`
  position: absolute;
  top: 50px;
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
  gap: 8px;
  height: 60px;
`;

const BrandItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
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
  background: #c4c4c4;
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
`;

const BrandItemSeparator = styled.div`
  align-self: stretch;
  height: 0;
  border: 1px #e6e6e6 solid;
`;
const BrandItemHomepage = styled.div`
  cursor: pointer;
`;

const BrandItemFavorite = styled.div`
  cursor: pointer;
`;
function Search() {
  const navigate = useNavigate();
  const [containerHeight, setContainerHeight] = useState('100vh');
  const [containerWidth, setContainerWidth] = useState('100vw');
  const [brands, setBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [liked, setLiked] = useState({});
  const accessToken = useUser();

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
      setIsSearching(false);
      const response = await axios.get(`http://112.175.29.231:30001/brand/search`, {
        params: { startName, endName }
      });
      const brandsData = response.data.result || [];
      setBrands(brandsData);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setBrands([]);
    }
  };

  const handleBrandClick = (brandId) => {
    navigate(`/brand/${brandId}`);
  };

  const handleHomepageClick = (brandHomepage) => {
    window.open(brandHomepage, '_blank');
  };

  const handleFavoriteClick = async (brandId) => {
    try {
      await axios.post(
        'http://112.175.29.231:30001/likes/brand',
        { brandId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setLiked((prevLiked) => ({ ...prevLiked, [brandId]: !prevLiked[brandId] }));
    } catch (error) {
      console.error('좋아요 상태를 업데이트하는 데 실패했습니다:', error);
    }
  };

  const isFavorite = (brandId) => liked[brandId] || false;

  useEffect(() => {
    handleConsonantClick('가', '나');
  }, []);

  const fetchBrands = async (query) => {
    try {
      setIsSearching(true);
      const response = await axios.get(`http://112.175.29.231:30001/search`, {
        params: { query }
      });
      const brandsData = response.data.result || [];
      setBrands(brandsData);
    } catch (error) {
      console.error('Error searching brands:', error);
      setBrands([]);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim().length === 0) {
      setIsSearching(false);
      handleConsonantClick('가', '나');
    } else {
      fetchBrands(query);
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
        <form onSubmit={handleSearchSubmit}>
          <SearchInput
            type="text"
            placeholder="브랜드 이름 검색"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
        <XIconSvg onClick={() => navigate('/search')}></XIconSvg>
      </SearchBar>

      <BrandListContent>
        <BrandTitle>브랜드 리스트</BrandTitle>
        <BrandItems>
          <BrandItemLogoContainer>
            {brands.map((brand) => (
              <BrandItemContainer key={brand.id} onClick={() => handleBrandClick(brand.id)}>
                <BrandItemRow>
  <BrandItemFavorite>
    {isFavorite(brand.id) ? <HeartRed /> : <HeartWhite />}
  </BrandItemFavorite>
  <BrandItemHomepage>
    <Homepage />
  </BrandItemHomepage>
  <BrandItemInfo onClick={() => handleBrandClick(brand.id)}>
    <BrandItemLogo hasLogo={brand.brand_logo_url}>
      {brand.brand_logo_url ? (
        <BrandItemLogoImage src={brand.brand_logo_url} alt={brand.brand_name_kr} />
      ) : (
        <BrandItemLogoPlaceholder />
      )}
    </BrandItemLogo>
    <BrandItemName>{brand.brand_name_kr}</BrandItemName>
  </BrandItemInfo>
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