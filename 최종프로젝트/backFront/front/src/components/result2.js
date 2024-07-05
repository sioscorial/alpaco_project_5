import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/Search.svg';
import { ReactComponent as InputIcon } from '../assets/icons/inputdata.svg';

const Container = styled.div`
 width: 100%;
 height: 100%;
 min-width: 375px;
 max-width: 744px;
 min-height: 578px;
 max-height: 1133px;
 background: white;
 flex-direction: column;
 justify-content: flex-start;
 align-items: center;
 gap: 8px;
 display: flex;
`;

const Header = styled.div`
 width: 100%;
 height: 58px;
 position: relative;
 background: white;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 padding: 0 20px;
 display: flex;
`;

const IconWrapper = styled.div`
 padding: 10px;
 border-radius: 100px;
 justify-content: center;
 align-items: center;
 display: flex;
`;

const IconContainer = styled.div`
 width: 24px;
 height: 24px;
 justify-content: center;
 align-items: center;
 display: flex;
`;

const Title = styled.div`
 text-align: center;
 color: black;
 font-size: 32px;
 font-family: 'Inter';
 font-weight: 800;
 line-height: 41.60px;
 word-wrap: break-word;
`;

const Content = styled.div`
 width: 100%;
 flex-direction: column;
 justify-content: flex-start;
 align-items: center;
 display: flex;
`;

const ImageWrapper = styled.div`
 height: 375px;
 padding-top: 12px;
 padding-bottom: 12px;
 background: white;
 justify-content: center;
 align-items: center;
 display: flex;
`;

const ImageContainer = styled.div`
 width: 240px;
 height: 100%;
 border-radius: 12px;
 overflow: hidden;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 display: flex;
`;

const Image = styled.img`
 width: 240px;
 height: 354px;
`;

const KeywordWrapper = styled.div`
 width: 100%;
 padding-top: 16px;
 padding-bottom: 18px;
 justify-content: center;
 align-items: center;
 display: flex;
`;

const KeywordGroup = styled.div`
 width: 100%;
 justify-content: center;
 align-items: center;
 gap: 12px;
 display: flex;
 flex-wrap: wrap;
`;

const Keyword = styled.div`
 padding-left: 20px;
 padding-right: 20px;
 padding-top: 10px;
 padding-bottom: 10px;
 background: ${props => props.active ? 'black' : '#FAFAFB'};
 border-radius: 20px;
 border: 1px ${props => props.active ? 'black' : '#E6E6E6'} solid;
 justify-content: center;
 align-items: center;
 gap: 10px;
 display: flex;
`;

const KeywordText = styled.div`
 text-align: center;
 color: ${props => props.active ? '#FAFAFB' : '#A0A0A0'};
 font-size: 12px;
 font-family: 'Inter';
 font-weight: 600;
 line-height: 18px;
 letter-spacing: 0.30px;
 word-wrap: break-word;
`;

const ResultWrapper = styled.div`
 width: 100%;
 padding-bottom: 14px;
 justify-content: space-between;
 align-items: center;
 display: flex;
`;

const ResultText = styled.div`
 color: black;
 font-size: 12px;
 font-family: 'Inter';
 font-weight: 600;
 line-height: 18px;
 letter-spacing: 0.30px;
 word-wrap: break-word;
`;

const SimilarityWrapper = styled.div`
 justify-content: flex-end;
 align-items: center;
 gap: 2px;
 display: flex;
`;

const SimilarityText = styled.div`
 text-align: right;
 color: #A0A0A0;
 font-size: 12px;
 font-family: 'Inter';
 font-weight: 500;
 line-height: 18px;
 letter-spacing: 0.30px;
 word-wrap: break-word;
`;

const SimilarityIcon = styled.div`
 width: 18px;
 height: 17px;
 padding-left: 2.06px;
 padding-right: 2.06px;
 padding-top: 1.95px;
 padding-bottom: 1.95px;
 justify-content: center;
 align-items: center;
 display: flex;
`;

const SimilarityIconBox = styled.div`
 width: ${props => props.width}px;
 height: ${props => props.height}px;
 left: ${props => props.left}px;
 top: ${props => props.top}px;
 position: absolute;
 border: 1.50px #A0A0A0 solid;
`;

const BrandListWrapper = styled.div`
 width: 100%;
 flex-direction: column;
 justify-content: flex-start;
 align-items: center;
 display: flex;
`;

const BrandItem = styled.div`
 width: 100%;
 padding: 16px;
 background: white;
 box-shadow: ${props => props.expanded ? '0px 4px 60px rgba(4, 6, 15, 0.05)' : 'none'};
 border-radius: 20px;
 border: ${props => props.expanded ? '1.50px #575757 solid' : 'none'};
 flex-direction: column;
 justify-content: flex-start;
 align-items: ${props => props.expanded ? 'center' : 'flex-start'};
 gap: 16px;
 display: flex;
`;

const BrandInfoWrapper = styled.div`
 width: 100%;
 height: 40px;
 position: relative;
`;

const BrandRank = styled.div`
 left: ${props => props.expanded ? '8px' : '6px'};
 top: 9px;
 position: absolute;
 text-align: center;
 color: ${props => props.expanded ? 'black' : '#A0A0A0'};
 font-size: 18px;
 font-family: 'Inter';
 font-weight: 700;
 line-height: 21.60px;
 word-wrap: break-word;
`;

const BrandArrowIcon = styled.div`
 width: 24px;
 height: 24px;
 right: 0;
 top: 8px;
 position: absolute;
`;

const BrandArrowIconBox = styled.div`
 width: 14px;
 height: 7px;
 left: 5px;
 top: 8.50px;
 position: absolute;
 border: 1.50px black solid;
`;

const BrandLogo = styled.div`
 width: 40px;
 height: 40px;
 padding-top: 13px;
 padding-bottom: ${props => props.expanded ? '12.20px' : '12.24px'};
 padding-left: 5px;
 padding-right: 5px;
 left: 29px;
 top: 0;
 position: absolute;
 background: white;
 border-radius: 100px;
 overflow: hidden;
 border: 0.50px #E6E6E6 solid;
 justify-content: center;
 align-items: center;
 display: flex;
`;

const BrandLogoImage = styled.img`
 width: 30px;
 height: ${props => props.expanded ? '14.80px' : '14.76px'};
`;

const BrandNameWrapper = styled.div`
 left: 77px;
 top: 1px;
 position: absolute;
 justify-content: flex-start;
 align-items: flex-start;
 gap: 4px;
 display: flex;
`;

const BrandName = styled.div`
 color: black;
 font-size: 14px;
 font-family: 'Inter';
 font-weight: 600;
 line-height: 21px;
 letter-spacing: 0.30px;
 word-wrap: break-word;
`;

const BrandSimilarityWrapper = styled.div`
 left: 77px;
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

const BrandSimilarity = styled.div`
 color: #575757;
 font-size: 10px;
 font-family: 'Inter';
 font-weight: 400;
 line-height: 15px;
 letter-spacing: 0.30px;
 word-wrap: break-word;
`;

const BrandImageWrapper = styled.div`
 width: 100%;
 justify-content: center;
 align-items: flex-start;
 gap: 2px;
 display: flex;
`;

const BrandImage = styled.img`
 width: 102px;
 height: 102px;
`;

const BrandDetailButton = styled.div`
 width: 100%;
 height: 56px;
 justify-content: center;
 align-items: center;
 display: flex;
`;

const BrandDetailButtonWrapper = styled.div`
 width: 100%;
 padding: 8px;
 background: #F2F2F2;
 border-radius: 16px;
 justify-content: center;
 align-items: center;
 gap: 10px;
 display: flex;
`;

const BrandDetailButtonText = styled.div`
 text-align: center;
 color: black;
 font-size: 14px;
 font-family: 'Inter';
 font-weight: 600;
 line-height: 21px;
 letter-spacing: 0.30px;
 word-wrap: break-word;
`;

const BrandDivider = styled.div`
 width: 100%;
 height: 0;
 border: 1px #E6E6E6 solid;
`;

const App = () => {
   return (
     <Container>
       <Header>
         <IconWrapper>
           <IconContainer>
             <MenuIcon />
           </IconContainer>
         </IconWrapper>
         <Title>BRAiND</Title>
         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
           <IconWrapper>
             <IconContainer>
               <InputIcon />
             </IconContainer>
           </IconWrapper>
           <IconWrapper>
             <IconContainer>
               <SearchIcon />
             </IconContainer>
           </IconWrapper>
         </div>
       </Header>
       <Content>
         <ImageWrapper>
           <ImageContainer>
             <Image src="https://via.placeholder.com/240x354" />
           </ImageContainer>
         </ImageWrapper>
         <KeywordWrapper>
           <KeywordGroup>
             <Keyword active>
               <KeywordText active>All</KeywordText>
             </Keyword>
             <Keyword>
               <KeywordText>keyword</KeywordText>
             </Keyword>
             <Keyword>
               <KeywordText>keyword</KeywordText>
             </Keyword>
             <Keyword>
               <KeywordText>keyword</KeywordText>
             </Keyword>
             <Keyword>
               <KeywordText>keyword</KeywordText>
             </Keyword>
             <Keyword>
               <KeywordText>keyword</KeywordText>
             </Keyword>
           </KeywordGroup>
         </KeywordWrapper>
         <ResultWrapper>
           <ResultText>브랜드 결과 234개</ResultText>
           <SimilarityWrapper>
             <SimilarityText>스타일 유사도</SimilarityText>
             <SimilarityIcon>
               <SimilarityIconBox width={0.75} height={2.83} left={6.56} top={6.55} />
               <SimilarityIconBox width={0.75} height={0.71} left={6.56} top={3.51} />
               <SimilarityIconBox width={13.88} height={13.10} left={0} top={0} />
             </SimilarityIcon>
           </SimilarityWrapper>
         </ResultWrapper>
         <BrandListWrapper>
           <BrandItem expanded>
             <BrandInfoWrapper expanded>
               <BrandRank expanded>1</BrandRank>
               <BrandArrowIcon>
                 <BrandArrowIconBox />
               </BrandArrowIcon>
               <BrandLogo>
                 <BrandLogoImage expanded src="https://via.placeholder.com/30x15" />
               </BrandLogo>
               <BrandNameWrapper>
                 <BrandName>엘무드</BrandName>
                 <div style={{ width: 22, height: 22, padding: 4, background: '#F2F2F2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', gap: 4, display: 'flex' }}>
                   <div style={{ width: 12, height: 12, position: 'relative' }}>
                     <div style={{ width: 9.25, height: 8.38, left: 1.37, top: 1.81, position: 'absolute', border: '0.87px black solid' }}></div>
                   </div>
                 </div>
               </BrandNameWrapper>
               <BrandSimilarityWrapper>
                 <BrandSimilarity>스타일 유사도 85.2352</BrandSimilarity>
               </BrandSimilarityWrapper>
             </BrandInfoWrapper>
             <BrandImageWrapper>
               <BrandImage src="https://via.placeholder.com/102x102" />
               <BrandImage src="https://via.placeholder.com/102x102" />
               <BrandImage src="https://via.placeholder.com/102x102" />
               <BrandImage src="https://via.placeholder.com/102x102" />
               <BrandImage src="https://via.placeholder.com/102x102" />
               <BrandImage src="https://via.placeholder.com/102x102" />
             </BrandImageWrapper>
             <BrandDetailButton>
               <BrandDetailButtonWrapper>
                 <BrandDetailButtonText>브랜드 자세히 보기</BrandDetailButtonText>
               </BrandDetailButtonWrapper>
             </BrandDetailButton>
           </BrandItem>
           <BrandItem>
             <BrandInfoWrapper>
               <BrandRank>2</BrandRank>
               <BrandArrowIcon>
                 <BrandArrowIconBox/>
             </BrandArrowIcon>
             <BrandLogo>
               <BrandLogoImage src="https://via.placeholder.com/30x15" />
             </BrandLogo>
             <BrandNameWrapper>
               <BrandName>굿라이프웍스</BrandName>
             </BrandNameWrapper>
             <BrandSimilarityWrapper>
               <BrandSimilarity>스타일 유사도 82.7516</BrandSimilarity>
             </BrandSimilarityWrapper>
           </BrandInfoWrapper>
           <BrandDivider />
         </BrandItem>
         <BrandItem>
           <BrandInfoWrapper>
             <BrandRank>3</BrandRank>
             <BrandArrowIcon>
               <BrandArrowIconBox />
             </BrandArrowIcon>
             <BrandLogo>
               <div style={{ width: 30, height: 14.76, left: 5, top: 13, position: 'absolute', background: '#C4C4C4' }} />
             </BrandLogo>
             <BrandNameWrapper>
               <BrandName>브랜드명</BrandName>
             </BrandNameWrapper>
             <BrandSimilarityWrapper>
               <BrandSimilarity>스타일 유사도 82.7516</BrandSimilarity>
             </BrandSimilarityWrapper>
           </BrandInfoWrapper>
           <BrandDivider />
         </BrandItem>
         <BrandItem>
           <BrandInfoWrapper>
             <BrandRank>4</BrandRank>
             <BrandArrowIcon>
               <BrandArrowIconBox />
             </BrandArrowIcon>
             <BrandLogo>
               <div style={{ width: 30, height: 14.76, left: 5, top: 13, position: 'absolute', background: '#C4C4C4' }} />
             </BrandLogo>
             <BrandNameWrapper>
               <BrandName>브랜드명</BrandName>
             </BrandNameWrapper>
             <BrandSimilarityWrapper>
               <BrandSimilarity>스타일 유사도 82.7516</BrandSimilarity>
             </BrandSimilarityWrapper>
           </BrandInfoWrapper>
           <BrandDivider />
         </BrandItem>
         <BrandItem>
           <BrandInfoWrapper>
             <BrandRank>5</BrandRank>
             <BrandArrowIcon>
               <BrandArrowIconBox />
             </BrandArrowIcon>
             <BrandLogo>
               <div style={{ width: 30, height: 14.76, left: 5, top: 13, position: 'absolute', background: '#C4C4C4' }} />
             </BrandLogo>
             <BrandNameWrapper>
               <BrandName>브랜드명</BrandName>
             </BrandNameWrapper>
             <BrandSimilarityWrapper>
               <BrandSimilarity>스타일 유사도 82.7516</BrandSimilarity>
             </BrandSimilarityWrapper>
           </BrandInfoWrapper>
           <BrandDivider />
         </BrandItem>
         <BrandItem>
           <BrandInfoWrapper>
             <BrandRank>6</BrandRank>
             <BrandArrowIcon>
               <BrandArrowIconBox />
             </BrandArrowIcon>
             <BrandLogo>
               <div style={{ width: 30, height: 14.76, left: 5, top: 13, position: 'absolute', background: '#C4C4C4' }} />
             </BrandLogo>
             <BrandNameWrapper>
               <BrandName>브랜드명</BrandName>
             </BrandNameWrapper>
             <BrandSimilarityWrapper>
               <BrandSimilarity>스타일 유사도 82.7516</BrandSimilarity>
             </BrandSimilarityWrapper>
           </BrandInfoWrapper>
           <BrandDivider />
         </BrandItem>
         <BrandItem>
           <BrandInfoWrapper>
             <BrandRank>7</BrandRank>
             <BrandArrowIcon>
               <BrandArrowIconBox />
             </BrandArrowIcon>
             <BrandLogo>
               <div style={{ width: 30, height: 14.76, left: 5, top: 13, position: 'absolute', background: '#C4C4C4' }} />
             </BrandLogo>
             <BrandNameWrapper>
               <BrandName>브랜드명</BrandName>
             </BrandNameWrapper>
             <BrandSimilarityWrapper>
               <BrandSimilarity>스타일 유사도 82.7516</BrandSimilarity>
             </BrandSimilarityWrapper>
           </BrandInfoWrapper>
           <BrandDivider />
         </BrandItem>
         <BrandItem>
           <BrandInfoWrapper>
             <BrandRank>8</BrandRank>
             <BrandArrowIcon>
               <BrandArrowIconBox />
             </BrandArrowIcon>
             <BrandLogo>
               <div style={{ width: 30, height: 14.76, left: 5, top: 13, position: 'absolute', background: '#C4C4C4' }} />
             </BrandLogo>
             <BrandNameWrapper>
               <BrandName>브랜드명</BrandName>
             </BrandNameWrapper>
             <BrandSimilarityWrapper>
               <BrandSimilarity>스타일 유사도 82.7516</BrandSimilarity>
             </BrandSimilarityWrapper>
           </BrandInfoWrapper>
           <BrandDivider />
         </BrandItem>
         <BrandItem>
           <BrandInfoWrapper>
             <BrandRank>9</BrandRank>
             <BrandArrowIcon>
               <BrandArrowIconBox />
             </BrandArrowIcon>
             <BrandLogo>
               <div style={{ width: 30, height: 14.76, left: 5, top: 13, position: 'absolute', background: '#C4C4C4' }} />
             </BrandLogo>
             <BrandNameWrapper>
               <BrandName>브랜드명</BrandName>
             </BrandNameWrapper>
             <BrandSimilarityWrapper>
               <BrandSimilarity>스타일 유사도 82.7516</BrandSimilarity>
             </BrandSimilarityWrapper>
           </BrandInfoWrapper>
           <BrandDivider />
         </BrandItem>
         <BrandItem>
           <BrandInfoWrapper>
             <BrandRank>10</BrandRank>
             <BrandArrowIcon>
               <BrandArrowIconBox />
             </BrandArrowIcon>
             <BrandLogo>
               <div style={{ width: 30, height: 14.76, left: 5, top: 13, position: 'absolute', background: '#C4C4C4' }} />
             </BrandLogo>
             <BrandNameWrapper>
               <BrandName>브랜드명</BrandName>
             </BrandNameWrapper>
             <BrandSimilarityWrapper>
               <BrandSimilarity>스타일 유사도 82.7516</BrandSimilarity>
             </BrandSimilarityWrapper>
           </BrandInfoWrapper>
           <BrandDivider />
         </BrandItem>
       </BrandListWrapper>
     </Content>
   </Container>
 );
};

export default App;