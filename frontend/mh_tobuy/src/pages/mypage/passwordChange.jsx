import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const Header = styled.div`
  height: 94px;
  position: relative;
`;
const HeaderContent = styled.div`
  position: absolute;
  bottom: 4px;
  left: 26px;
  color: #000;
  font-size: 14px;
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
const FormContent = styled.div`
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  flex-wrap: wrap;
  margin-left: 42px;
  width: 295px;
  margin-top: 47px;
`;
const Pwlabel = styled.div`
  width: 75px;
  color: #60716f;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 20px;
  text-align: left;
`;
const Pw = styled.div`
  margin-top: 20px;
  margin-left: 9px;
`;
// const Newpwlabel = styled.div``;
// const Newpw = styled.div``;
// const Againpwlabel = styled.div``;
// const Againpw = styled.div``;
const Submit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 64px;
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
const PasswordChange = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const inputStyle = {
    width: "100%",
    borderRadius: "6px",
    border: "1px solid #60716F",
    height: "30px",
    width: "204px",
    height: "30px",
  };
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
  const navigateToMypage = () => {
    navigate("/MypageMain");
  };
  const navigateToVideo = () => {
    navigate("/PlayVideo");
  };

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

  const [password, setPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [new_password_check, setnewPasswordcheck] = useState("");
  const [error, setError] = useState("");

  const [divs, setDivs] = useState([]);
  const [failDivAdded, setFailDivAdded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      password: password,
      new_password: new_password,
      new_password_check: new_password_check,
    };
    const BACKEND_URL =
      "https://youngest.pythonanywhere.com" || "http://127.0.0.1:8000";
    axios
      .post(`${BACKEND_URL}/api/change-password/`, requestData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`, // 토큰을 헤더에 추가
        },
      })
      .then((response) => {
        console.log("비밀번호 업데이트");
        navigate("/MypageMain");
      })
      .catch((error) => {
        console.error("실패:", error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.non_field_errors
        ) {
          setError(error.response.data.non_field_errors[0]);
        } else {
          setError("An error occurred.");
        }

        if (!failDivAdded) {
          const newFailDiv = (
            <div key={divs.length} className="failDiv" style={failStyle}>
              다시 한 번 확인해주세요.
            </div>
          );
          setDivs([...divs, newFailDiv]);
          setFailDivAdded(true);
        }
      });
  };
  const failStyle = {
    color: "red",
    textAlign: "left",
    margin: "0 auto",
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
            <HeaderContent>비밀번호 수정</HeaderContent>
          </Header>
          <Gra></Gra>
          <form>
            <FormContent>
              <Pwlabel>비밀번호</Pwlabel>
              <Pw>
                <input
                  type="password"
                  style={inputStyle}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Pw>
              <Pwlabel>새 비밀번호</Pwlabel>
              <Pw>
                <input
                  type="password"
                  style={inputStyle}
                  id="new_password"
                  value={new_password}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Pw>
              <Pwlabel>새 비밀번호 재입력</Pwlabel>
              <Pw>
                <input
                  type="password"
                  style={inputStyle}
                  id="new_password_check"
                  value={new_password_check}
                  onChange={(e) => setnewPasswordcheck(e.target.value)}
                />
              </Pw>
            </FormContent>
            <Submit>
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                style={submitStyle}
              >
                저장하기
              </button>
            </Submit>
          </form>
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
                    src={`${process.env.PUBLIC_URL}/images/pwchangecoachmark.png`}
                    alt="pwchangecoachmark"
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

export default PasswordChange;
