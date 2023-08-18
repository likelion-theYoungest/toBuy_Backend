import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  background-color: #fffff;
  -ms-overflow-style: none;

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
  flex: 1; /* 남은 공간을 채우도록 설정 */
  overflow: hidden; /* 스크롤이 있는 경우 내용을 스크롤합니다. */
`;

const Topbar = styled.div`
  display: flex;
  height: 60px;
  padding: 10px;
  align-items: center;
  gap: 108px;
  flex-shrink: 0;
  background-color: #fffff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  justify-content: space-evenly;
`;

const Back = styled.div`
  width: 30px;
  height: 24px;
  cursor: pointer;
`;

const Logo = styled.div`
  cursor: pointer;
`;

const Close = styled.div`
  margin-right: 2%;
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
`;

const Body = styled.div`
  margin: auto;
  display: flex;
  height: 550px;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex-shrink: 0;
  padding-bottom: 0;
`;

const Welcomeimg = styled.div`
  margin: auto;
  margin-top: 3%;
  margin-bottom: 10%;
  width: 284px;
  height: 291.122px;
  flex-shrink: 0;
`;

const MentBox = styled.div`
  margin: 0 auto;
  margin-top: -10%;
  margin-bottom: -5%;
  line-height: 0.5;
  height: 120px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Menttxt = styled.div`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const MentLogotxt = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const StyledText = styled.span`
  background: linear-gradient(180deg, #e02d11 0%, #05bba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledTextBlack = styled.span`
  color: #000;
`;

const MintBox = styled.div`
  display: flex;
  margin: auto;

  cursor: pointer;
  width: 145px;
  height: 53px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #05bba2;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const MintText = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 0 auto;
`;

const Ment = styled.div`
  margin-top: 0;
  width: 270px;
  margin: 0 auto;
  display: flex;
  color: #000;
  text-align: center;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
const MentTB = styled.div`
  margin: 0 auto;
  text-align: center;
  display: flex;
  background: linear-gradient(180deg, #e02d11 0%, #05bba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Mentmint = styled.div`
  cursor: pointer;

  margin: 0 auto;
  text-align: center;
  cursor: pointer;
  display: flex;
  color: #05bba2;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-decoration-line: underline;
`;
const MentBox2 = styled.div`
  height: 60px;
  margin-top: 30%;
`;
const BACKEND_URL =
  "https://youngest.pythonanywhere.com" || "http://127.0.0.1:8000";
const RedBox = styled.div``;
const RedText = styled.div``;

const Signup2 = () => {
  const navigate = useNavigate();
  const navigateToFirstpage = () => {
    navigate("/");
  };
  const navigateToLogin = () => {
    navigate("/Signupcard");
  };
  const navigateToMain = () => {
    navigate("/Main");
  };

  const [name, setName] = useState("");
  const [divs, setDivs] = useState([]); // divs 상태 추가
  const [failDivAdded, setFailDivAdded] = useState(false);
  const [showRedButton, setShowRedButton] = useState(false);

  const handleSubmit = async (e) => {
    console.log("handleSubmit called");

    try {
      const response = await axios.get(`${BACKEND_URL}/mypage/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      });

      // 여기서 받아온 데이터 중에서 name 값을 가져옴
      const receivedName = response.data.profile.name; // 실제 데이터 구조에 따라 수정

      // 받아온 name 값을 상태로 업데이트
      setName(receivedName);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const card = () => {
    // 로그인 여부 확인
    const accessToken = localStorage.getItem("access_token");
    console.log(accessToken);

    // 로그인된 경우 카드 발급 요청 보내기
    axios
      .post(`${BACKEND_URL}/cards/`, null, {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`, // 토큰을 헤더에 추가
        },
      })
      .then((response) => {
        console.log("카드 발급", response.data);
        navigate("/Signupcard"); // 카드 발급 성공 시 페이지 이동
      })
      .catch((error) => {
        console.error("카드 발급 실패:", error);
        // 카드 발급 실패 처리 로직

        if (!failDivAdded) {
          const newFailDiv = (
            <div key={divs.length} className="failDiv" style={failStyle}>
              이미 발급된 카드가 있습니다.<br></br>
              위의 버튼을 한 번 더 클릭해주세요.
            </div>
          );
          setDivs([...divs, newFailDiv]);
          setFailDivAdded(true);
          setShowRedButton(true);
        }
      });
  };
  useEffect(() => {
    handleSubmit();
  }, []);

  const url1 =
    "https://harvest-machine-d20.notion.site/77980ca8efd3435e9915e88b830a5ca4";
  const url2 =
    "https://harvest-machine-d20.notion.site/d76bf5b332524288a9db8d1857c6bc19";
  const failStyle = {
    color: "red",
    textAlign: "center",
    margin: "0 auto",
    marginBottom: "40px",
  };
  const redboxstyle = {
    display: "flex",
    margin: "auto",
    cursor: "pointer",
    width: "145px",
    height: "53px",
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    flexShrink: "0",
    borderRadius: "6px",
    background: "red",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  };
  const redtextstyle = {
    color: "#fff",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "normal",
  };
  return (
    <Container>
      <BodyWrapper>
        <Topbar>
          <Back>
            <img
              src={`${process.env.PUBLIC_URL}/images/backbutton.png`}
              alt="back"
              onClick={() => navigate(-1)}
            />
          </Back>
          <Logo>
            <img
              src={`${process.env.PUBLIC_URL}/images/로고3.png`}
              alt="logo"
              width="90px"
            />
          </Logo>
          <Close>
            <img
              src={`${process.env.PUBLIC_URL}/images/close.png`}
              alt="close"
              onClick={navigateToFirstpage}
            />
          </Close>
        </Topbar>
        <Body>
          <Welcomeimg>
            <img
              src={`${process.env.PUBLIC_URL}/images/welcomeimg.png`}
              alt="welcome"
            />
          </Welcomeimg>
          <MentBox>
            <Menttxt>어서오세요 {name}님!</Menttxt>
            <br />
            <MentLogotxt>
              <StyledText>To buy</StyledText>
              <StyledTextBlack>로</StyledTextBlack>
            </MentLogotxt>

            <br />
            <Menttxt>오늘도 상품주문 연습 해볼까요?</Menttxt>
          </MentBox>
          <ButtonContainer>
            {!showRedButton && (
              <MintBox onClick={(navigateToLogin, card)}>
                <MintText>카드 발급 하러가기</MintText>
              </MintBox>
            )}
            {showRedButton && ( // showRedButton이 true일 때만 RedBox 표시
              <RedBox onClick={navigateToMain} style={redboxstyle}>
                <RedText style={redtextstyle}>메인으로 가기</RedText>
              </RedBox>
            )}
          </ButtonContainer>
        </Body>
        {divs}
        <MentBox2>
          <Ment>
            계속 진행시 <MentTB>투 바이</MentTB>의
            <Mentmint
              onClick={() => {
                window.open(url1);
              }}
            >
              서비스 이용약관
            </Mentmint>
            에 동의하고
          </Ment>

          <Ment>
            <Mentmint
              onClick={() => {
                window.open(url2);
              }}
            >
              개인정보 처리방침
            </Mentmint>
            을 읽었음을 인정하는 것으로 간주됩니다.
          </Ment>
        </MentBox2>
      </BodyWrapper>
    </Container>
  );
};
export default Signup2;
