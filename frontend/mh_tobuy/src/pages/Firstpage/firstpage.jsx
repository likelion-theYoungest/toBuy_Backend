import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
const Body = styled.div`
  display: flex;

  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  margin: 0 auto;
  margin-top: 10px;
`;
const Infoimg = styled.div`
  display: flex;
  width: 48px;
  height: 48px;
  padding: 4px;
  margin-left: 320px;
  margin-top: 10px;
  cursor: pointer;
`;

const Logoimg = styled.div`
  width: 369px;
  height: 212.029px;
  flex-shrink: 0;
  margin: auto;
  margin-top: 80px;
  margin-bottom: -50px;
`;
const BoxContainer = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center; /* 수평 가운데 정렬 */
  justify-content: center; /* 수직 가운데 정렬 */
`;
const Box1 = styled.div`
  display: inline-flex;
  padding: 20px 80px 18px 80px;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  border-radius: 6px;
  background: #e02d11;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.24);
  cursor: pointer;
`;

const Jointext = styled.div`
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Box2 = styled.div`
  display: inline-flex;
  padding: 20px 90px 18px 90px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  border-radius: 6px;
  background: #05bba2;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const Logintext = styled.div`
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Box3 = styled.div`
  display: inline-flex;
  padding: 18px 28px 18px 40px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 60px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 0px 9px 1px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const Prevideologotext = styled.div`
  text-align: center;
  font-size: 25px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin-left: -10%;
  background: linear-gradient(180deg, #e02d11 0%, #05bba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Prevideotext = styled.div`
  margin-left: 10%;
  color: #60716f;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
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
  margin-left: 80%;
  margin-top: 2%;

  font-size: 40px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
`;

const CmLogo = styled.div`
  display: flex;
  margin: auto;
  width: 278.452px;
  height: 160px;
  flex-shrink: 0;
  margin-top: -10%;
`;

const Cmtextbox = styled.div`
  margin-top: 50px;
  margin-left: -25px;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  line-height: 30px;
  width: 120%;
`;

const CmTobuytext = styled.div`
  background: linear-gradient(180deg, #e02d11 0%, #05bba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 25px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;

const Cmtext = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  line-height: 30px;
`;
const BtmBox = styled.div`
  display: flex;
`;
const Btmtext1 = styled.div`
  color: #000;
  margin: auto;
  margin-top: 50px;
  margin-left: -10%;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  width: 120%;
  height: 14px;
  flex-shrink: 0;
`;
const Btmtext2 = styled.div`
  color: #000;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  display: flex;
  width: 170px;
  margin-left: 10px;
  margin-top: 28px;
`;

const DdwulikelionLogo = styled.div`
  width: 47px;
  height: 47px;
  flex-shrink: 0;
  margin-top: 20px;
  margin-left: 10%;
  display: flex;
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
const MentBox = styled.div`
  height: 60px;
`;
const Firstpage = () => {
  const navigate = useNavigate();
  const navigateTologin = () => {
    navigate("/Login");
  };

  const navigateTojoin = () => {
    navigate("/Signup");
  };

  const navigateToprevideopage = () => {
    navigate("/Prevideopage");
  };

  //스크롤 방지

  const [isOpen, setIsOpen] = useState(false);
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
        <Body>
          <BoxContainer>
            <Infoimg>
              <img
                src={`${process.env.PUBLIC_URL}/images/info.png`}
                alt="info"
                onClick={openModalHandler}
              />
            </Infoimg>
            {isOpen ? (
              <ModalBackdrop onClick={openModalHandler}>
                <ModalView onClick={(e) => e.stopPropagation()}>
                  <ExitBtn onClick={openModalHandler}>x</ExitBtn>
                  <div className="desc">
                    <CmLogo>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/로고3.png`}
                        alt="logo"
                      />
                    </CmLogo>
                    <Cmtextbox>
                      <CmTobuytext>To buy 투 바이</CmTobuytext>
                      <Cmtext>
                        체험형 이커머스 교육 서비스 입니다.
                        <br />
                        이머커스의 회원가입, 로그인, 결제 연습과
                        <br />
                        시연 영상을 통해 이커머스 사용의
                        <br />
                        어려움을 줄일 수 있습니다.
                        <br />
                        나이로 인해 이커머스에서 생기는
                        <br />
                        디지털 격차를 해소하기 위한 목적의 서비스로
                        <br />
                        고령층의 편리한 이커머스 사용을 위해
                        <br />
                        제작하였습니다.
                      </Cmtext>
                    </Cmtextbox>
                    <Btmtext1>
                      본 서비스는 동덕여자대학교 학생 6명이 함께 만든
                      서비스입니다.
                    </Btmtext1>
                    <BtmBox>
                      <DdwulikelionLogo>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/Ddwulikelionlogo.png`}
                          alt="ddwulogo"
                        />
                      </DdwulikelionLogo>
                      <Btmtext2>
                        동덕여자대학교 멋쟁이사자처럼 11기
                        <br />
                        막내팀_The Youngest team
                      </Btmtext2>
                    </BtmBox>
                  </div>
                </ModalView>
              </ModalBackdrop>
            ) : null}
            <Logoimg>
              <img
                src={`${process.env.PUBLIC_URL}/images/로고3.png`}
                alt="logo"
                width="300px"
              />
            </Logoimg>

            <Box1 onClick={navigateTojoin}>
              <Jointext>회원가입</Jointext>
            </Box1>
            <Box2 onClick={navigateTologin}>
              <Logintext>로그인</Logintext>
            </Box2>
            <Box3 onClick={navigateToprevideopage}>
              <Prevideologotext>To buy </Prevideologotext>
              <Prevideotext>시연 영상</Prevideotext>
            </Box3>
          </BoxContainer>
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
export default Firstpage;
