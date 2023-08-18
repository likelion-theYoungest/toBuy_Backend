import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  //   background-color: #f5f0e4;
  -ms-overflow-style: none;
  overflow: hidden;

  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BodyWrapper = styled.div`
  flex: 1;
  overflow: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 60px;
`;

const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 10px;
  align-items: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Back = styled.div`
  width: 30px;
  cursor: pointer;
`;

const Logo = styled.div`
  cursor: pointer;
`;

const Video = styled.div`
  cursor: pointer;
  width: 30px;
`;
const BottomBar = styled.footer`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 60px;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }
`;

const Menu = styled.div`
  width: 30px;
  cursor: pointer;
`;

const Search = styled.div`
  width: 30px;
  cursor: pointer;
`;

const Home = styled.div`
  width: 30px;
  cursor: pointer;
`;

const My = styled.div`
  width: 30px;
  cursor: pointer;
`;

const Logo1 = styled.div`
  cursor: pointer;
  width: 300px;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 50px;
`;

const ProductWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  padding-top: 2px;
  height: 78px;
  border-radius: 6px;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.25);
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 22px;
`;
const ProductImg = styled.div`
  margin-top: 2px;
`;
const ProductInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  margin-left: 9px;
  width: 70%;
  margin-bottom: 9px;
`;
const ProductName = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 280px;
  text-align: left;
  // margin-right: auto;
`;
const PriceWrapper = styled.div`
color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: left;
    margin-left: auto;
    margin-top: 3px;
}`;
const Price = styled.span``;
const Won = styled.span``;
const QuantityWrapper = styled.div`
  color: #60716f;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 3px;
`;
const Whole = styled.span``;
const Quantity = styled.span``;
const Count = styled.span``;

const Ment = styled.div`
  width: 300px;
  height: 58px;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: center;

  color: #000000;

  margin: auto;
  margin-top: 40px;
`;

const Check = styled.div`
  position: relatvie;
  margin: auto;
  margin-top: 40px;
`;

const Complete = () => {
  const navigate = useNavigate();
  const navigateToBack = () => {
    window.history.back();
  };

  const goMenu = () => {
    navigate("/Category");
  };
  const goSearch = () => {
    navigate("/Main");
  };
  const goMain = () => {
    navigate("/Main");
  };
  const goMyPage = () => {
    navigate("/MypageMain");
  };
  const goPlayvideo = () => {
    navigate("/PlayVideo");
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productName = queryParams.get("productName");
  const unitPrice = queryParams.get("unitPrice");
  const quantity = queryParams.get("quantity");
  const imagePath = queryParams.get("imagePath");
  // 총 가격 계산
  const totalPrice = unitPrice * quantity;
  const BACKEND_URL =
    "https://youngest.pythonanywhere.com" || "http://127.0.0.1:8000";

  return (
    <Container>
      <BodyWrapper>
        <Topbar>
          <Back onClick={navigateToBack}>
            <img
              src={`${process.env.PUBLIC_URL}/images/left.png`}
              alt="back"
              width="12px"
            />
          </Back>
          <Logo>
            <img
              src={`${process.env.PUBLIC_URL}/images/로고3.png`}
              alt="logo"
              width="90px"
              onClick={goMain}
            />
          </Logo>
          <Video onClick={goPlayvideo}>
            <img
              src={`${process.env.PUBLIC_URL}/images/carousel-video.png`}
              width="30px"
              alt="video"
            />
          </Video>
        </Topbar>
        <Logo1>
          <img
            src={`${process.env.PUBLIC_URL}/images/로고3.png`}
            width="300px"
          />
        </Logo1>

        <ProductWrapper>
          <ProductImg>
            <img
              src={`${BACKEND_URL}${imagePath}`}
              alt={productName}
              width="70px"
            ></img>
          </ProductImg>
          <ProductInfoWrapper>
            <ProductName>{productName}</ProductName>
            <QuantityWrapper>
              <Whole>총 </Whole>
              <Quantity>{quantity}</Quantity>
              <Count> 개</Count>
            </QuantityWrapper>
            <PriceWrapper>
              <Price>{totalPrice}</Price>
              <Won> 원</Won>
            </PriceWrapper>
          </ProductInfoWrapper>
        </ProductWrapper>
        <Ment>
          해당 상품의 결제과 완료되었습니다!
          <br />
          마이페이지-결제내역에서
          <br />
          확인 가능합니다.
        </Ment>
        <Check>
          <img
            onClick={goMain}
            src={`${process.env.PUBLIC_URL}/images/Frame 33.png`}
            width="300px"
          />
        </Check>
        <BottomBar>
          <Menu onClick={goMenu}>
            <img
              src={`${process.env.PUBLIC_URL}/images/menu.png`}
              width="26px"
            />
          </Menu>
          <Search onClick={goSearch}>
            <img
              src={`${process.env.PUBLIC_URL}/images/search.png`}
              width="26px"
            />
          </Search>
          <Home onClick={goMain}>
            <img
              src={`${process.env.PUBLIC_URL}/images/home.png`}
              width="26px"
            />
          </Home>
          <My onClick={goMyPage}>
            <img src={`${process.env.PUBLIC_URL}/images/me.png`} width="26px" />
          </My>
        </BottomBar>
      </BodyWrapper>
    </Container>
  );
};

export default Complete;
