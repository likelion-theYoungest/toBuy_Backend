import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useState, useEffect } from "react";

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
  height: 23px;
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
  height: 650px;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex-shrink: 0;
`;

const Toptext = styled.div`
  margin: 0 auto;
  margin-top: 5%;
  color: #000;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;

const Topsecondtext = styled.div`
  margin: 0 auto;
  color: #000;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Cardimg = styled.div`
  margin: auto;
  margin-top: 5px;
  flex-shrink: 0;
`;

const CardinfoBox = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 10px;
  width: 306px;
  height: 130px;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 12px 30px;
  flex-shrink: 0;
  flex-wrap: wrap;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
`;

const Cardnumtxt = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const Cardnum = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const Pwnumtxt = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const Pwnum = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const Cvctxt = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const Cvcnum = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const Usedatetxt = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const Usedate = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const RemainaccountBox = styled.div`
  display: inline-flex;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 40px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
`;

const Remainaccounttxt = styled.div`
  color: #60716f;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Remainaccount = styled.div`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
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
const MentBox = styled.div`
  height: 60px;
`;

const BACKEND_URL =
  "https://youngest.pythonanywhere.com" || "http://127.0.0.1:8000";
const Signupcard = () => {
  const navigate = useNavigate();
  const navigateToFirstpage = () => {
    navigate("/");
  };
  const navigateToSignup2 = () => {
    navigate("/Main", { state: { card } });
  };

  const [card, setCard] = useState({
    num: "",
    pw: "",
    cvc: "",
    validDate: "",
    balance: "",
  });

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
          <Toptext>발급된 카드 입니다.</Toptext>
          <Topsecondtext>
            마이페이지에서 자신의 카드정보를
            <br />
            확인 가능합니다.
            <br />
            회원가입시 카드에 500,000원을 제공합니다.{" "}
          </Topsecondtext>
          <Cardimg>
            <img
              src={`${process.env.PUBLIC_URL}/images/card.png`}
              alt="card"
              width="260px"
            />
          </Cardimg>
          <CardinfoBox>
            <Cardnumtxt>카드번호</Cardnumtxt>
            <Cardnum>{card.num}</Cardnum>
            <br />
            <Pwnumtxt>비밀번호</Pwnumtxt>
            <Pwnum>{card.pw}</Pwnum>
            <Cvctxt>CVC</Cvctxt>
            <Cvcnum>{card.cvc}</Cvcnum>
            <br />
            <Usedatetxt>유효기간 년/월</Usedatetxt>
            <Usedate>{card.validDate}</Usedate>
          </CardinfoBox>
          <RemainaccountBox>
            <Remainaccounttxt>카드 잔액</Remainaccounttxt>
            <Remainaccount>{card.balance}</Remainaccount>
          </RemainaccountBox>
          <ButtonContainer>
            <MintBox onClick={navigateToSignup2}>
              <MintText>확인</MintText>
            </MintBox>
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
export default Signupcard;
