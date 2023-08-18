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
  overflow: auto; /* 스크롤이 있는 경우 내용을 스크롤합니다. */
`;

const Topbar = styled.div`
  margin: 0 auto;
  display: flex;
  height: 60px;
  padding: 10px;
  align-items: center;

  flex-shrink: 0;
  background-color: #fffff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Back = styled.div`
  cursor: pointer;
`;

const Toptitle = styled.div`
  margin: 0 auto;

  color: #081c19;
  font-size: 18px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;

const Close = styled.div`
  cursor: pointer;
`;

const Body = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: flex-start;

  flex-shrink: 0;
  margin: 0 auto;
  margin-top: 10px;
`;

const HeadBox = styled.div`
  display: flex;

  width: 345px;
  height: 80px;
  padding: 10px;
  align-items: center;

  flex-shrink: 0;
  background-color: #fff;

  margin: 0 auto;
`;

const Infomsg = styled.div`
  color: #000;
  font-size: 21px;
  font-style: normal;
  font-weight: 550;
  line-height: normal;
  text-align: left;
`;

const Infoimg = styled.div`
  display: flex;
  width: 30px;
  height: 48px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-left: 15%;
  margin-top: -10%;
  cursor: pointer;
`;

const InputBox = styled.div`
  display: flex;

  margin: 0 auto;
  width: 335px;
  height: 45px;
  padding: 5px;
  align-items: center;

  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid #60716f;
  background: #fff;
`;

const Input = styled.input`
  margin: 0 auto;
  position: relative;
  align-items: center;
  width: 800px;
  height: 32px;
  background: #ffffff;
  border-radius: 6px;
  border: none;
  margin: auto;

  font-size: 17px;
  &::placeholder {
    color: #60716f;
    padding-left: 10px;
  }
  &:focus {
    border: none;
    outline: none;
  }
`;
const PasswordMismatchMessage = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fffff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  height: 20px;
`;
const GrayBox = styled.div`
  display: flex;
  width: 145px;
  height: 43px;
  padding: 10px;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;

  border-radius: 6px;
  background: linear-gradient(0deg, #625856 0%, #625856 100%), #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const Graytext = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const RedBox = styled.div`
  display: flex;
  width: 145px;
  height: 43px;
  padding: 10px;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;
  border-radius: 6px;
  background: #e22d11;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;
const Redtext = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  height: 100px;
  margin: auto;
`;
const MentBox = styled.div`
  height: 60px;
  margin-top: 30px;
`;
const Ment = styled.div`
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
const newFailDiv = styled.div`
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
const Signup = () => {
  const navigate = useNavigate();
  const navigateToFirstpage = () => {
    navigate("/");
  };
  const navigateToSignupcard = () => {
    navigate("/Signupcard");
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_check, setPassword_check] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [divs, setDivs] = useState([]);
  const [failDivAdded, setFailDivAdded] = useState(false);
  const [errorText, setErrorText] = useState("");

  const onClick = () => {
    // 사용자 입력 데이터를 서버로 전송하는 로직을 추가합니다.
    const userData = {
      email: email,
      password: password,
      password_check: password_check,
      phone: phone,
      name: name,
    };

    const BACKEND_URL =
      "https://youngest.pythonanywhere.com" || "http://127.0.0.1:8000";
    axios
      .post(`${BACKEND_URL}/api/signup/`, userData)
      .then((response) => {
        console.log("회원가입 성공:", response.data);
        navigate("/Login");
      })
      .catch((error) => {
        console.log("회원가입 실패:");
        errorHandler(error);
      });
  };
  const errorHandler = (error) => {
    if (error.response) {
      if (error.response.data) {
        console.log("에러 응답:", error.response.data);
        let errorMessage = "";
        if (
          error.response.data.email == "This field may not be blank." ||
          error.response.data.name == "This field may not be blank." ||
          error.response.data.password == "This field may not be blank." ||
          error.response.data.passwordCheck == "This field may not be blank." ||
          error.response.data.phone == "This field may not be blank."
        ) {
          setErrorText("입력을 확인하세요.");
        } else if (
          error.response.data.email == "user with this email already exists." ||
          error.response.data.phone == "user with this phone already exists."
        ) {
          setErrorText("이미 가입된 회원입니다.");
        }
      }
    } else {
      console.error("네트워크 에러:", error.message);
      // 네트워크 관련 에러 메시지를 콘솔에 출력합니다.
    }
  };
  const failStyle = {
    color: "red",
    textAlign: "left",
    margin: "0 auto",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      // 비밀번호 일치, 회원가입 로직 실행
      console.log("회원가입 성공");
      navigateToSignupcard();
    } else {
      // 비밀번호 불일치
      console.log("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);

    if (password !== newConfirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
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
  }, [isOpen]);

  const openModalHandler = () => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen(!isOpen);
  };

  const url1 =
    "https://harvest-machine-d20.notion.site/77980ca8efd3435e9915e88b830a5ca4";
  const url2 =
    "https://harvest-machine-d20.notion.site/d76bf5b332524288a9db8d1857c6bc19";

  return (
    <Container>
      <BodyWrapper>
        <Topbar>
          <Back>
            <img
              src={`${process.env.PUBLIC_URL}/images/backbutton.png`}
              alt="back"
              onClick={navigateToFirstpage}
            />
          </Back>
          <Toptitle>회원가입</Toptitle>
          <Close>
            <img
              src={`${process.env.PUBLIC_URL}/images/close.png`}
              alt="close"
              onClick={navigateToFirstpage}
            />
          </Close>
        </Topbar>
        <Body>
          <HeadBox>
            <Infomsg>
              어서오세요 <br />
              <span style={{ color: "#05bba2" }}>회원정보</span>를 입력해주세요!
            </Infomsg>
            <Infoimg>
              <img
                src={`${process.env.PUBLIC_URL}/images/coachmark.png`}
                alt="coachmark"
                width="48px"
                onClick={openModalHandler}
              />
            </Infoimg>
            {isOpen ? (
              <ModalBackdrop onClick={openModalHandler}>
                <ModalView onClick={(e) => e.stopPropagation()}>
                  <ExitBtn onClick={openModalHandler}>x</ExitBtn>
                  <CmLogo>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/coachmark1.png`}
                      alt="coachmark1"
                      width="300"
                      height="700"
                    />
                  </CmLogo>
                </ModalView>
              </ModalBackdrop>
            ) : null}
          </HeadBox>
          <InputBox>
            <Input
              type="text"
              placeholder="아이디 (이메일)"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputBox>
          <InputBox>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
          </InputBox>

          <InputBox>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={password_check}
              onChange={(e) => {
                handleConfirmPasswordChange(e);
                setPassword_check(e.target.value);
              }}
              placeholder="비밀번호 재입력"
            />
          </InputBox>

          {!passwordMatch && (
            <PasswordMismatchMessage>
              비밀번호가 일치하지 않습니다.
            </PasswordMismatchMessage>
          )}
          <InputBox>
            <Input
              type="text"
              placeholder="이름"
              onChange={(e) => setName(e.target.value)}
            />
          </InputBox>
          <InputBox>
            <Input
              type="phone"
              placeholder="전화번호"
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputBox>
          <div className="failDiv" style={failStyle}>
            {errorText}
          </div>
          <ButtonContainer>
            <GrayBox onClick={navigateToFirstpage}>
              <Graytext>처음으로</Graytext>
            </GrayBox>
            <RedBox onClick={onClick}>
              <Redtext>확인</Redtext>
            </RedBox>
          </ButtonContainer>
        </Body>
        <MentBox>
          <Ment>
            계속 진행시 <MentTB>투 바이</MentTB>의{" "}
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
        </MentBox>
      </BodyWrapper>
    </Container>
  );
};
export default Signup;
