import React, { useState, useEffect } from "react";
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

const Body = styled.div`
  height: 752px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex-shrink: 0;
`;

const Gra = styled.div`
  position: relative;
  background: linear-gradient(to right, #e02d11, #05bba2);
  width: 100%;
  height: 2px;
  border: none; /* 선 없애기 */
`;
const FormContent = styled.div`
  height: auto;
  margin: 43px 32px;
  margin-bottom: 0;
`;
const ImgWrapper = styled.div`
  width: 100%;
`;
const PayImg = styled.div`
  width: 220px;
  margin: auto;
  position: relative;
  // margin-bottom: 10px;
  margin-top: 30px;
`;
const PlusImg = styled.div`
  position: absolute;
  right: -16px;
  bottom: -13px;
`;
const ProductName = styled.div`
  color: #000;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  height: 80px;
  padding-top: 12px;
  box-sizing: border-box;
`;
const ProductWrapper = styled.div`
  height: 56px;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const QuantityWrapper = styled.div`
  display: inline;
`;
const Whole = styled.span``;
const Quantity = styled.span``;
const Count = styled.span``;
const PriceWrapper = styled.div`
  display: inline;
`;
const Price = styled.span``;
const Won = styled.span``;

const TypeHeader = styled.div`
  height: 50px;
  position: relative;
  text-align: left;
  margin-bottom: 3px;
`;
const TypeHeaderContent = styled.div`
  bottom: 4px;
  left: 10px;
  position: absolute;
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 0 10px;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
const Type = styled.div`
  display: inline;
`;
const CardImg = styled.div`
  display: inline;
`;
const WhenHeader = styled.div`
  height: 50px;
  position: relative;
  text-align: left;
  margin-bottom: 3px;
`;
const WhenHeaderContent = styled.div`
  bottom: 4px;
  left: 10px;
  position: absolute;
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const When = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-align: left;
  padding: 13px 10px 0;
`;

const Submit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;
const CoachMark = styled.div`
  position: fixed;
  bottom: 80px;
  text-align: right;
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }
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

const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);

  width: 390px;
  margin: 0 auto;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const ExitBtn = styled.div`
  display: flex;
  margin: 0 auto;

  font-size: 35px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
`;

const CmLogo = styled.div`
  display: flex;
  margin: auto;
  margin-top: -0%;
  flex-shrink: 0;
`;

const ModalView = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 90%;
  height: 90%;
  background-color: #ffffff;
  overflow-y: auto; /* 스크롤을 추가 */

  div.desc {
    margin: 50px;
    font-size: 20px;
    color: var(--coz-purple-600);
  }
`;

const PayHistory = () => {
  const [isOpen, setIsOpen] = useState(false);

  const submitStyle = {
    width: "222px",
    height: "53px",
    padding: "10px",
    borderRadius: "6px",
    background: "#05BBA2",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    border: "none",
    color: "white",
  };
  const navigate = useNavigate();
  const navigateToBack = () => {
    window.history.back();
  };
  const navigateToMypage = () => {
    navigate("/MypageMain");
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
  const productId = queryParams.get("productId");

  // 총 가격 계산
  const totalPrice = unitPrice * quantity;

  const BACKEND_URL =
    "https://youngest.pythonanywhere.com" || "http://127.0.0.1:8000";

  useEffect(() => {
    if (isOpen) {
      // 모달 창이 열려 있는 경우에는 스크롤 방지
      document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    } else {
      // 모달 창이 닫혀 있는 경우에는 스크롤 가능하도록 설정
      document.body.style.cssText = "";
    }

    return () => {
      if (isOpen) {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    };
  }, [isOpen]);

  const openModalHandler = () => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen(!isOpen);
  };

  const Title = styled.div`
    margin-top: 70px;
    margin-bottom: 20px;
    font-size: 24px;
    font-style: normal;
    font-weight: bold;
    line-height: normal;
  `;
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

        <Body>
          {/* <Title>결제 내역 상세보기</Title> <Gra></Gra> */}
          <FormContent>
            <Title>결제 내역 상세보기</Title> <Gra></Gra>
            <ImgWrapper>
              <PayImg>
                <img
                  src={`${BACKEND_URL}${imagePath}`}
                  alt={productName}
                  width="220px"
                ></img>
              </PayImg>
            </ImgWrapper>
            <ProductName>{productName}</ProductName>
            <Gra></Gra>
            <ProductWrapper>
              <QuantityWrapper>
                <Whole>총 </Whole>
                <Quantity>{quantity}</Quantity>
                <Count> 개</Count>
              </QuantityWrapper>
              <PriceWrapper>
                <Price>{totalPrice}</Price>
                <Won> 원</Won>
              </PriceWrapper>
            </ProductWrapper>
            {/* <TypeHeader>
              <TypeHeaderContent>결제 유형</TypeHeaderContent>
            </TypeHeader>
            <Gra></Gra>
            <CardWrapper>
              <Type>일반 카드 결제</Type>
              <CardImg>
                <img
                  src={`${process.env.PUBLIC_URL}/images/card.png`}
                  width="110px"
                  height="65px"
                />
              </CardImg>
            </CardWrapper>
            <WhenHeader>
              <WhenHeaderContent>결제 일시</WhenHeaderContent>
            </WhenHeader>
            <Gra></Gra>
            <When>2023.08.18 00:00 pm</When> */}
          </FormContent>
          <Submit onClick={navigateToMypage}>
            <button formAction="" style={submitStyle}>
              확인
            </button>
          </Submit>
          <CoachMark>
            <img
              src={`${process.env.PUBLIC_URL}/images/coachmark.png`}
              width="48px"
              onClick={openModalHandler}
            />
          </CoachMark>
          {isOpen ? (
            <ModalBackdrop onClick={openModalHandler}>
              <ModalView onClick={(e) => e.stopPropagation()}>
                <ExitBtn onClick={openModalHandler}>x</ExitBtn>
                <CmLogo>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/payhistorycoachmark.png`}
                    alt="payhistorycoachmark"
                    width="300"
                    height="700"
                  />
                </CmLogo>
              </ModalView>
            </ModalBackdrop>
          ) : null}
        </Body>
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

export default PayHistory;
