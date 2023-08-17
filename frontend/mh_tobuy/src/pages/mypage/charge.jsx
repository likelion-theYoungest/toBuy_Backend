import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  //   background-color: #f5f0e4;

  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
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

const Header = styled.div`
  height: 82px;
  position: relative;
`;
const HeaderContent = styled.div`
  position: absolute;
  bottom: 16px;
  left: 22px;
  color: #000;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const Gra = styled.div`
  position: relative;
  background: linear-gradient(to right, #e02d11, #05bba2);
  width: 100%;
  height: 2px;
  border: none; /* 선 없애기 */
`;
const List = styled.div`
  margin-top: 36px;
  height: auto;
`;
const ContentBox = styled.div`
  height: 84px;
  margin-top: 28px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
`;
const Ad = styled.div``;
const Circle = styled.div`
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  width: 72px;
  height: 72px;
  margin-left: 8px;
  position: relative;
`;
const CardImg = styled.div`
  margin-top: 13px;
`;
const AmountWrapper = styled.div`
  color: #60716f;
  text-align: center;
  font-size: 10.4px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  left: 13px;
  top: 46.43px;
`;
const Plus = styled.span``;
const Amount = styled.span``;
const Won = styled.span``;

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
export const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ExitBtn = styled(ModalBtn)`
  background-color: #05bba2;
  border-radius: 6px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  text-decoration: none;
  height: 40px;
  display: flex;
  width: 102px;
  padding: 9px 0px;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  bottom: 22px;
`;

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
  role: "dialog",
}))`
  // Modal창 CSS를 구현합니다.
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 322px;
  height: 166px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  > div.desc {
    margin: 50px;
    margin: 50px;
    color: #000;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const Charge = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [modalAmount, setModalAmount] = useState(0); // 모달 내부에서 사용할 amount 값을 저장

  const navigateToBack = () => {
    window.history.back();
  };
  const navigateToVideo = () => {
    navigate("/PlayVideo");
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
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  const [card, setCard] = useState({
    balance: "",
  });
  const BACKEND_URL =
    "https://youngest.pythonanywhere.com" || "http://127.0.0.1:8000";
  const charging = () => {
    // 카드 잔액을 충전하기 위한 API 호출
    axios
      .post(
        `${BACKEND_URL}/cards/recharge/`,
        {
          message: "Balance added successfully",
        }, // 충전할 금액을 요청 바디에 담아 보냅니다
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        console.log("충전 성공", response.data);
        setIsOpen(false); // 충전 후 모달을 닫습니다
      })
      .catch((error) => {
        console.error("충전 실패:", error);
        console.log("충전 실패 시 데이터:", {
          balance: balance,
          message: "Balance added successfully",
          recharge_amount: 30000,
        });
      });
  };
  const [balance, setBalance] = useState(0);
  const getBalance = async () => {
    console.log("함수실행됨");
    try {
      const response = await axios.get(`${BACKEND_URL}/cards/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.data.length > 0) {
        // 응답 데이터가 존재하는 경우에만
        const receivedBalance = response.data[0].balance; // 응답 데이터에서 잔액 정보를 가져옴
        setBalance(receivedBalance); // 상태 업데이트
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

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
            />
          </Logo>
          <Video onClick={navigateToVideo}>
            <img
              src={`${process.env.PUBLIC_URL}/images/carousel-video.png`}
              width="30px"
              alt="video"
            />
          </Video>
        </Topbar>

        <Body>
          <Header>
            <HeaderContent>카드 잔액 충전하기</HeaderContent>
          </Header>
          <Gra></Gra>
          <List>
            <ContentBox>
              <Ad>
                <img
                  src={`${process.env.PUBLIC_URL}/images/ad.png`}
                  width="272px"
                  height="84px"
                />
              </Ad>

              <Circle
                onClick={() => {
                  openModalHandler();
                  getBalance();
                }}
              >
                <CardImg>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/charge.png`}
                    width="35.657px"
                    height="35.657px"
                  />
                </CardImg>
                <AmountWrapper>
                  <Plus>+</Plus>
                  <Amount>30000</Amount>
                  <Won>원</Won>
                </AmountWrapper>
              </Circle>
              {isOpen ? (
                <ModalBackdrop
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <ModalView onClick={(e) => e.stopPropagation()}>
                    <div className="desc">
                      카드잔액 {balance}원이
                      <br />
                      충전 되었습니다!
                    </div>
                    {/* <ExitBtn onClick={() => setIsOpen(false)}>확인</ExitBtn> */}
                    <ExitBtn
                      onClick={() => {
                        setIsOpen(false);
                        charging();
                      }}
                    >
                      확인
                    </ExitBtn>
                  </ModalView>
                </ModalBackdrop>
              ) : null}
            </ContentBox>

            <ContentBox>
              <Ad>
                <img
                  src={`${process.env.PUBLIC_URL}/images/ad2.png`}
                  width="272px"
                  height="84px"
                />
              </Ad>
              <Circle onClick={() => openModalHandler(30000)}>
                <CardImg>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/charge.png`}
                    width="35.657px"
                    height="35.657px"
                  />
                </CardImg>
                <AmountWrapper>
                  <Plus>+</Plus>
                  <Amount>30000</Amount>
                  <Won>원</Won>
                </AmountWrapper>
              </Circle>
            </ContentBox>

            <ContentBox>
              <Ad>
                <img
                  src={`${process.env.PUBLIC_URL}/images/ad3.png`}
                  width="272px"
                  height="84px"
                />
              </Ad>
              <Circle onClick={() => openModalHandler(30000)}>
                <CardImg>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/charge.png`}
                    width="35.657px"
                    height="35.657px"
                  />
                </CardImg>
                <AmountWrapper>
                  <Plus>+</Plus>
                  <Amount>30000</Amount>
                  <Won>원</Won>
                </AmountWrapper>
              </Circle>
            </ContentBox>

            <ContentBox>
              <Ad>
                <img
                  src={`${process.env.PUBLIC_URL}/images/ad4.png`}
                  width="272px"
                  height="84px"
                />
              </Ad>
              <Circle onClick={() => openModalHandler(30000)}>
                <CardImg>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/charge.png`}
                    width="35.657px"
                    height="35.657px"
                  />
                </CardImg>
                <AmountWrapper>
                  <Plus>+</Plus>
                  <Amount>30000</Amount>
                  <Won>원</Won>
                </AmountWrapper>
              </Circle>
            </ContentBox>

            <ContentBox>
              <Ad>
                <img
                  src={`${process.env.PUBLIC_URL}/images/ad5.png`}
                  width="272px"
                  height="84px"
                />
              </Ad>
              <Circle onClick={() => openModalHandler(30000)}>
                <CardImg>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/charge.png`}
                    width="35.657px"
                    height="35.657px"
                  />
                </CardImg>
                <AmountWrapper>
                  <Plus>+</Plus>
                  <Amount>30000</Amount>
                  <Won>원</Won>
                </AmountWrapper>
              </Circle>
            </ContentBox>
          </List>
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

export default Charge;
