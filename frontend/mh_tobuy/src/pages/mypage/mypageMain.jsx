import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  //   background-color: #f5f0e4;
  -ms-overflow-style: none;
  overflow: hidden;

  /* 미디어 쿼리 적용 */
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

const Profile = styled.div``;
const ProfileContent = styled.div`
  height: 142px;
  position: relative;
  box-shadow: 0px 4px 15px -2px rgba(0, 0, 0, 0.25);
`;
const ProFileImg = styled.img`
  float: left;
  margin-top: 26px;
  margin-left: 30px;
`;
const ProFileName = styled.span`
  text-align: center;
  font-size: 20px;
  position: absolute;
  top: 64px;
  left: 37%;
`;
const Logout = styled.div`
  color: #60716f;
  text-align: center;
  font-size: 10px;
  font-weight: 500;
  text-decoration-line: underline;
  position: absolute;
  top: 43px;
  right: 20px;
  cursor: pointer;
`;

const MemberInfo = styled.div`
  height: 203px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const MemHeader = styled.div`
  height: 70px;
  position: relative;
`;
const MemHeaderContent = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  top: 37px;
  left: 29px;
`;
const Edit = styled.div`
  position: absolute;
  top: 47px;
  right: 15px;
  color: #05bba2;
  font-size: 10px;
  font-weight: 300;
  text-decoration-line: underline;
  cursor: pointer;
`;
const Gra = styled.div`
  position: relative;
  background: linear-gradient(to right, #e02d11, #05bba2);
  width: 100%;
  height: 2px;
  border: none; /* 선 없애기 */
`;
const MemContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  width: 220px;
  margin-top: 18px;
  margin-left: 29px;
`;
const Name = styled.div`
  color: #60716f;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 91px;
  text-align: left;
  padding-bottom: 18px;
`;
const Uname = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 125px;
  text-align: left;
  display: inline;
`;

const Username = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 125px;
  text-align: left;
  display: inline;
  top: 64px;
  left: 37%;
`;
const Id = styled.div`
  color: #60716f;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 91px;
  text-align: left;
  padding-bottom: 18px;
`;
const Uid = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 125px;
  text-align: left;
`;
const Phone = styled.div`
  color: #60716f;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 91px;
  text-align: left;
`;
const Uphone = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 125px;
  text-align: left;
`;

const Card = styled.div`
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const CardHeader = styled.div`
  height: 70px;
  position: relative;
  margin-bottom: 1px;
`;

const CardHeaderContent = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  top: 37px;
  left: 29px;
`;

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 87px;
  margin-left: 33px;
  margin-left: 33px;
  margin-top: 14px;
  padding-bottom: 14px;
`;

const CardImg = styled.div``;

const CardinfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  margin-left: 16px;
`;
const NumWrapper = styled.div`
  text-align: left;
  width: 220px;
  margin-right: auto;

  color: #000;
  font-size: 10px;
  font-style: normal;
  line-height: normal;
`;
const PwWrapper = styled.div`
  text-align: left;
  width: 220px;
  margin-right: auto;
`;
const CVCWrapper = styled.div`
  text-align: left;
  width: 70px;
  margin-right: auto;
  display: inline-block;
`;
const DateWrapper = styled.div`
  text-align: left;
  width: 110px;

  margin-top: -20px;
  display: inline-block;
`;
const CardBalanceWrapper = styled.div`
  text-align: left;
  margin-right: auto;

  display: inline-block;
`;
const Num = styled.span`
  font-weight: 500;
  width: 49px;
  text-align: left;
  display: inline-block;
`;
const Unum = styled.span`
  font-weight: 300;
`;
const Pw = styled.span`
  color: #000;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 49px;
  text-align: left;
  display: inline-block;
`;
const Upw = styled.span`
  color: #000;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
const CVC = styled.span`
  color: #000;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 49px;
  text-align: left;
  display: inline-block;
`;
const Ucvc = styled.span`
  color: #000;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
const Date = styled.span`
  color: #000;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 78px;
  text-align: left;
  display: inline-block;
`;
const Udate = styled.span`
  color: #000;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  top: -15%;
`;
const Balance = styled.span`
  color: #60716f;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const UbalanceWrapper = styled.div`
  display: flex;
  color: #000;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 8px;
  display: inline;
`;
const Ubalance = styled.span``;

const Charge = styled.div`
  color: #e22d11;
  text-align: center;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-decoration-line: underline;
  width: 85px;
  text-align: left;
  padding-top: 5px;
  cursor: pointer;
`;

const PayHistory = styled.div`
  height: auto;
`;
const PayHeader = styled.div`
  height: 70px;
  position: relative;
  margin-bottom: 1px;
`;
const PayHeaderContent = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  top: 37px;
  left: 29px;
`;
const PayContent = styled.div`
  height: auto;
`;
const WhiteBox = styled.div`
  height: 78px;
  border-radius: 6px;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.25);
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 10px;
`;
const PayWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  padding-top: 2px;
`;
const PayImg = styled.div``;
const PayinfoWrapper = styled.div`
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
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 80px;
  margin-right: auto;
  display: flex;
  align-items: center;
`;
const QuantityWrapper = styled.div`
  color: #60716f;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  align-items: center;
`;
const Whole = styled.span``;
const Quantity = styled.span``;
const Count = styled.span``;
const Price = styled.span`
  margin: 0 auto;
`;
const Won = styled.span``;
const Detail = styled.div`
  width: 123px;
  text-align: right;
  color: #e22d11;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-decoration-line: underline;
  position: absolute;
  top: 10px;
  right: 9px;
`;
const PriceWrapper = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
  margin-left: auto;
  margin: auto;
  display: flex;
  align-items: center;
`;

const TypeWrapper = styled.div`
  color: #000;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-left: auto;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
const WhatType = styled.span``;
const Type = styled.span``;
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

  width: 100%;
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

const MypageMain = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "", // 이름 정보를 저장할 상태 변수
    email: "", // 이메일 정보를 저장할 상태 변수
    phone: "", // 연락처 정보를 저장할 상태 변수

    purchases: [], // 추가: 결제 내역 정보를 저장할 상태 변수
  });
  const [card, setCard] = useState({
    num: "",
    pw: "",
    cvc: "",
    validDate: "",
    balance: "",
  });
  const navigate = useNavigate();
  const navigateToVerify = () => {
    navigate("/VerifyLogin");
  };

  const navigateToCharge = () => {
    navigate("/Charge");
  };

  const navigateToBack = () => {
    window.history.back();
  };
  const navigateToFirstpage = () => {
    navigate("/");
  };
  const navigateToVideo = () => {
    navigate("/PlayVideo");
  };
  //스크롤 방지
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
  });

  const openModalHandler = () => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen(!isOpen);
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
  const navigateToMain = () => {
    navigate("/Main");
  };

  const navigateToPayHistory = (purchase) => {
    const queryParams = new URLSearchParams();
    queryParams.append("productName", purchase.name);
    queryParams.append("quantity", purchase.count);
    queryParams.append("unitPrice", purchase.price);
    queryParams.append("totalPrice", purchase.total);
    queryParams.append("imagePath", purchase.image);

    // URL 쿼리 파라미터로 데이터를 전달하면서 페이지 이동
    navigate(`/PayHistory?${queryParams.toString()}`);
  };

  const BACKEND_URL =
    "https://youngest.pythonanywhere.com" || "http://127.0.0.1:8000";
  const onClicklogout = () => {
    axios
      .post(`${BACKEND_URL}/api/logout/`)
      .then((response) => {
        console.log("로그아웃 성공:", response.data);
        // access_token을 로컬 스토리지에서 삭제하는 예제
        localStorage.removeItem("access_token");

        navigate("/");
      })
      .catch((error) => {
        console.error("로그아웃 실패:", error);
      });
  };
  useEffect(() => {
    // 페이지가 로드될 때, 사용자 정보를 가져와서 상태 변수에 저장
    axios
      .get(`${BACKEND_URL}/mypage/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      }) // 사용자 정보를 불러오는 API 엔드포인트
      .then((response) => {
        const { name, email, phone } = response.data.profile; // API 응답에서 name, email, phone 정보 추출
        const { num, pw, cvc, validDate, balance } = response.data.card; // API 응답에서 num, pw, cvc, validDate, balance(카드 잔액)정보 추출
        const purchases = response.data.purchases; // 결제 내역 정보
        setUserData({
          name,
          email,
          phone,

          purchases,
        });
      })
      .catch((error) => {
        console.error("사용자 정보 불러오기 실패:", error);
      });
  }, []);
  useEffect(function () {
    axios
      .get(`${BACKEND_URL}/cards/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`, // 토큰을 헤더에 추가
        },
      })
      .then(function (result) {
        setCard(result.data[0]); // 상태 업데이트
        console.log("카드 상세정보 입니다", result);
      })
      .catch(function (error) {
        console.error("에러 발생 : ", error);
      });
  }, []);
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
              onClick={navigateToMain}
            />
          </Logo>
          <Video>
            <img
              src={`${process.env.PUBLIC_URL}/images/carousel-video.png`}
              width="30px"
              alt="video"
              onClick={navigateToVideo}
            />
          </Video>
        </Topbar>

        <Body>
          <Profile>
            <ProfileContent>
              <ProFileImg
                src={`${process.env.PUBLIC_URL}/images/profile.png`}
                width="100px"
                height="100px"
              ></ProFileImg>
              <ProFileName>
                <Username>{userData.name}</Username> 님
              </ProFileName>
              <Logout onClick={onClicklogout}>로그아웃</Logout>
            </ProfileContent>
          </Profile>

          <MemberInfo>
            <MemHeader>
              <MemHeaderContent>회원정보</MemHeaderContent>
              <Edit onClick={navigateToVerify}>비밀번호 수정</Edit>
            </MemHeader>
            <Gra></Gra>
            <MemContent>
              <Name>고객명</Name>
              <Uname>{userData.name}</Uname> {/* 이름 정보 표시 */}
              <Id>아이디</Id>
              <Uid>{userData.email}</Uid> {/* 이메일 정보 표시 */}
              <Phone>연락처</Phone>
              <Uphone>{userData.phone}</Uphone> {/* 연락처 정보 표시 */}
            </MemContent>
          </MemberInfo>

          <Card>
            <CardHeader>
              <CardHeaderContent>
                <Uname>{userData.name}</Uname>님의 카드
              </CardHeaderContent>
            </CardHeader>
            <Gra></Gra>
            <CardWrapper>
              <CardImg>
                <img
                  src={`${process.env.PUBLIC_URL}/images/card.png`}
                  width="110px"
                  height="65px"
                />
              </CardImg>
              <CardinfoWrapper>
                <NumWrapper>
                  <Num>카드번호</Num>
                  <Unum>{card.num}</Unum>
                </NumWrapper>
                <PwWrapper>
                  <Pw>비밀번호</Pw>
                  <Upw>{card.pw}</Upw>
                </PwWrapper>
                <CVCWrapper>
                  <CVC>CVC</CVC>
                  <Ucvc>{card.cvc}</Ucvc>
                </CVCWrapper>
                <DateWrapper>
                  <Date>유효기간</Date>
                  <br />
                  <Udate>08/24</Udate>
                </DateWrapper>
                <CardBalanceWrapper>
                  <Balance>카드 잔액</Balance>
                  <UbalanceWrapper>
                    {card && card.balance !== undefined ? (
                      <Ubalance>{card.balance.toLocaleString()}</Ubalance>
                    ) : (
                      <Ubalance>0</Ubalance>
                    )}
                    <Won>원</Won>
                  </UbalanceWrapper>
                </CardBalanceWrapper>
                <Charge onClick={navigateToCharge}>충전하기</Charge>
              </CardinfoWrapper>
            </CardWrapper>
          </Card>

          <PayHistory>
            <PayHeader>
              <PayHeaderContent>결제 내역</PayHeaderContent>
            </PayHeader>
            <Gra></Gra>
            <PayContent>
              {userData.purchases.map((purchase, index) => (
                <WhiteBox key={index}>
                  <PayWrapper onClick={() => navigateToPayHistory(purchase)}>
                    <PayImg>
                      <img
                        src={`${BACKEND_URL}${purchase.image}`}
                        width="70px"
                        height="70px"
                        alt="product"
                      />
                    </PayImg>
                    <PayinfoWrapper>
                      <ProductName>{purchase.name}</ProductName>
                      <QuantityWrapper>
                        <Whole></Whole>
                        <Quantity>{purchase.count}</Quantity>
                        <Count> 개</Count>
                      </QuantityWrapper>
                      <PriceWrapper>
                        <Price>{purchase.total.toLocaleString()}</Price>
                        <Won> 원</Won>
                      </PriceWrapper>
                    </PayinfoWrapper>
                  </PayWrapper>
                </WhiteBox>
              ))}
            </PayContent>
          </PayHistory>
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
                    src={`${process.env.PUBLIC_URL}/images/mypagemaincoachmark.png`}
                    alt="mypagemaincoachmark"
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

export default MypageMain;
