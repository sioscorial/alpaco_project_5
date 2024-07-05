import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 57px;
  padding-bottom: 57px;
  background: rgba(0, 0, 0, 0.70);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: inline-flex;
`;

const Wrapper = styled.div`
  align-self: stretch;
  padding-top: 20px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  border: 1px #BFBFBF solid;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  display: inline-flex;
`;

const Header = styled.div`
  padding-top: 9px;
  padding-bottom: 9px;
  padding-left: 49px;
  background: white;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 27px;
  display: inline-flex;
`;

const Title = styled.div`
  text-align: center;
  color: black;
  font-size: 18px;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 21.60px;
  word-wrap: break-word;
`;

const CloseIcon = styled.div`
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  display: inline-flex;
`;

const CloseIconWrapper = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
`;

const CloseIconLine1 = styled.div`
  width: 11.67px;
  height: 11.67px;
  left: 4.17px;
  top: 4.17px;
  position: absolute;
`;

const CloseIconLine2 = styled.div`
  width: 16.50px;
  height: 0;
  left: 0;
  top: 0;
  position: absolute;
  transform: rotate(45deg);
  transform-origin: 0 0;
  border: 1.50px #292D32 solid;
`;

const CloseIconLine3 = styled.div`
  width: 0;
  height: 16.50px;
  left: 11.67px;
  top: 0;
  position: absolute;
  transform: rotate(45deg);
  transform-origin: 0 0;
  border: 1.50px #292D32 solid;
`;

const CloseIconOverlay = styled.div`
  width: 20px;
  height: 20px;
  left: 0;
  top: 0;
  position: absolute;
  opacity: 0;
`;

const Description = styled.div`
  height: 18px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  display: flex;
`;

const DescriptionText = styled.div`
  align-self: stretch;
  color: black;
  font-size: 12px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

const BrandInfoWrapper = styled.div`
  width: 327px;
  height: 40px;
  position: relative;
`;

const BrandLogo = styled.div`
  width: 40px;
  height: 40px;
  padding-top: 13px;
  padding-bottom: 12.20px;
  padding-left: 5px;
  padding-right: 5px;
  left: 20px;
  top: 0;
  position: absolute;
  background: white;
  border-radius: 100px;
  border: 0.50px #E6E6E6 solid;
  justify-content: center;
  align-items: center;
  display: inline-flex;
`;

const BrandLogoImage = styled.img`
  width: 30px;
  height: 14.80px;
`;

const BrandName = styled.div`
  left: 68px;
  top: 1.50px;
  position: absolute;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  display: inline-flex;
`;

const BrandNameText = styled.div`
  color: black;
  font-size: 14px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

const BrandProductCount = styled.div`
  left: 68px;
  top: 25px;
  position: absolute;
  color: #575757;
  font-size: 10px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

const ProductSection = styled.div`
  height: 290px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  display: flex;
`;

const ProductCategory = styled.div`
  align-self: stretch;
  color: black;
  font-size: 16px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

const ProductList = styled.div`
  width: 287px;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  display: inline-flex;
`;

const ProductItem = styled.div`
  width: 93px;
  height: 123px;
  background: white;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
  display: inline-flex;
`;

const ProductImage = styled.div`
  width: 93px;
  height: 106px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: inline-flex;
`;

const ProductImageSrc = styled.img`
  width: 93px;
  height: ${props => props.selected ? '118px' : '112px'};
`;

const ProductImagePlaceholder = styled.div`
  width: 93px;
  height: 112px;
  background: #C4C4C4;
`;

const ProductName = styled.div`
  width: 93px;
  text-align: center;
  color: black;
  font-size: 10px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

const SelectedProductImage = styled.div`
  height: 106px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 4px #9366DC solid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: inline-flex;
`;

const RemainingCount = styled.div`
  height: 103px;
  padding-top: 8px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background: white;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  display: flex;
`;

const RemainingCountText = styled.div`
  color: black;
  font-size: 10px;
  font-family: 'Inter';
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

const GenerateButton = styled.div`
  align-self: stretch;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
`;

const GenerateButtonWrapper = styled.div`
  flex: 1;
  height: 56px;
  padding: 8px;
  background: black;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: flex;
`;

const GenerateButtonIcon = styled.div`
  width: 24px;
  height: 24px;
  padding: 2.75px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const GenerateButtonIconWrapper = styled.div`
  width: 18.50px;
  height: 18.50px;
  position: relative;
`;

const GenerateButtonIconBorder = styled.div`
  width: 18.50px;
  height: 18.50px;
  left: 0;
  top: 0;
  position: absolute;
  border: 1.50px white solid;
`;

const GenerateButtonIconDot = styled.div`
  width: 5px;
  height: 5px;
  left: 13.50px;
  top: 0;
  position: absolute;
  background: white;
`;

const GenerateButtonText = styled.div`
  text-align: center;
  color: white;
  font-size: 16px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.30px;
  word-wrap: break-word;
`;

const VirtualFittingRoom = () => {
  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>브랜드 가상 피팅룸(Beta)</Title>
          <CloseIcon>
            <CloseIconWrapper>
              <CloseIconLine1>
                <CloseIconLine2 />
                <CloseIconLine3 />
              </CloseIconLine1>
              <CloseIconOverlay />
            </CloseIconWrapper>
          </CloseIcon>
        </Header>
        <Description>
          <DescriptionText>설명설명설명설명설명설명설명설명설명설명설명설명설</DescriptionText>
        </Description>
        <BrandInfoWrapper>
          <BrandLogo>
            <BrandLogoImage src="https://via.placeholder.com/30x15" />
          </BrandLogo>
          <BrandName>
            <BrandNameText>엘무드</BrandNameText>
          </BrandName>
          <BrandProductCount>123개 가상 피팅 제품</BrandProductCount>
        </BrandInfoWrapper>
        <ProductSection>
          <ProductCategory>상의</ProductCategory>
          <ProductList>
            <ProductItem>
              <ProductImage>
                <ProductImageSrc src="https://via.placeholder.com/93x112" />
              </ProductImage>
              <ProductName>제품명제품명제품...</ProductName>
            </ProductItem>
            <ProductItem>
              <ProductImage>
                <ProductImagePlaceholder />
              </ProductImage>
              <ProductName>제품명제품명제품...</ProductName>
            </ProductItem>
            <ProductItem>
              <SelectedProductImage>
                <ProductImageSrc selected src="https://via.placeholder.com/93x118" />
              </SelectedProductImage>
              <ProductName>제품명제품명제품...</ProductName>
            </ProductItem>
            <ProductItem>
              <ProductImage>
                <ProductImagePlaceholder />
              </ProductImage>
              <ProductName>제품명제품명제품...</ProductName>
            </ProductItem>
            <ProductItem>
              <ProductImage>
                <ProductImagePlaceholder />
              </ProductImage>
              <ProductName>제품명제품명제품...</ProductName>
            </ProductItem>
          </ProductList>
        </ProductSection>
        <ProductSection>
          <ProductCategory>하의</ProductCategory>
          <ProductList>
            <ProductItem>
              <ProductImage>
                <ProductImagePlaceholder />
              </ProductImage>
              <ProductName>제품명제품명제품...</ProductName>
            </ProductItem>
            <ProductItem>
              <ProductImage>
                <ProductImagePlaceholder />
              </ProductImage>
              <ProductName>제품명제품명제품...</ProductName>
            </ProductItem>
            <ProductItem>
              <ProductImage>
                <ProductImagePlaceholder />
              </ProductImage>
              <ProductName>제품명제품명제품...</ProductName>
            </ProductItem>
            <ProductItem>
              <ProductImage>
                <ProductImagePlaceholder />
              </ProductImage>
              <ProductName>제품명제품명제품...</ProductName>
            </ProductItem>
            <ProductItem>
              <ProductImage>
                <ProductImagePlaceholder />
              </ProductImage>
              <ProductName>제품명제품명제품...</ProductName>
            </ProductItem>
            <ProductItem>
              <ProductImage>
                <ProductImagePlaceholder />
              </ProductImage>
              <ProductName>제품명제품명제품...</ProductName>
            </ProductItem>
          </ProductList>
        </ProductSection>
        <RemainingCount>
          <RemainingCountText>오늘 남은 횟수: 3</RemainingCountText>
          <GenerateButton>
            <GenerateButtonWrapper>
              <GenerateButtonIcon>
                <GenerateButtonIconWrapper>
                  <GenerateButtonIconBorder />
                  <GenerateButtonIconDot />
                </GenerateButtonIconWrapper>
              </GenerateButtonIcon>
              <GenerateButtonText>가상 피팅 이미지 생성</GenerateButtonText>
            </GenerateButtonWrapper>
          </GenerateButton>
        </RemainingCount>
      </Wrapper>
    </Container>
  );
};

export default VirtualFittingRoom;