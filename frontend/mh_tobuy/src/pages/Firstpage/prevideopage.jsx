import React from "react";
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

const Topbar = styled.div`
  display: flex;
  height: 60px;
  padding: 10px;
  align-items: center;

  flex-shrink: 0;
  background-color: #fffff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Back = styled.div`
  width: 30px;
  height: 24px;
  cursor: pointer;
`;

const Toplogo = styled.div`
  margin: 0 auto;
`;
const Body = styled.div`
  display: flex;
  height: 752px;
  padding: 30px 14px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex-shrink: 0;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const WhiteBox = styled.div`
  display: flex;
  margin: 0 auto;
  width: 346px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 0px 11px 3px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const Video = styled.div`
  width: 150px;
  height: 90px;
  flex-shrink: 0;
  fill: #bcbcbc;
  margin-top: 5%;
  margin-left: 5%;
`;

const Videologo = styled.div`
  margin-top: 8%;
  margin-left: 2%;
  width: 44px;
  height: 25.283px;
  flex-shrink: 0;
`;

const VideoText = styled.div`
  margin-top: 17%;
  margin-left: -11%;
  color: #000;
  font-size: 13px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;
const Prevideopage = () => {
  const navigate = useNavigate();
  const navigateToFirstpage = () => {
    navigate("/");
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
          <Toplogo>
            <img
              src={`${process.env.PUBLIC_URL}/images/toplogo.png`}
              alt="toplogo"
            />
          </Toplogo>
        </Topbar>
        <Body>
          <WhiteBox>
            <Video>
              <img
                src={`${process.env.PUBLIC_URL}/images/videoimg.png`}
                alt="videoimg"
              />
            </Video>
            <Videologo>
              <img
                src={`${process.env.PUBLIC_URL}/images/videologo.png`}
                alt="videologo"
              />
            </Videologo>
            <VideoText>회원가입 로그인 시연 영상</VideoText>
          </WhiteBox>
          <WhiteBox>
            <Video>
              <img
                src={`${process.env.PUBLIC_URL}/images/videoimg.png`}
                alt="videoimg"
              />
            </Video>
            <Videologo>
              <img
                src={`${process.env.PUBLIC_URL}/images/videologo.png`}
                alt="videologo"
              />
            </Videologo>
            <VideoText>회원가입 로그인 시연 영상</VideoText>
          </WhiteBox>
          <WhiteBox>
            <Video>
              <img
                src={`${process.env.PUBLIC_URL}/images/videoimg.png`}
                alt="videoimg"
              />
            </Video>
            <Videologo>
              <img
                src={`${process.env.PUBLIC_URL}/images/videologo.png`}
                alt="videologo"
              />
            </Videologo>
            <VideoText>회원가입 로그인 시연 영상</VideoText>
          </WhiteBox>
          <WhiteBox>
            <Video>
              <img
                src={`${process.env.PUBLIC_URL}/images/videoimg.png`}
                alt="videoimg"
              />
            </Video>
            <Videologo>
              <img
                src={`${process.env.PUBLIC_URL}/images/videologo.png`}
                alt="videologo"
              />
            </Videologo>
            <VideoText>회원가입 로그인 시연 영상</VideoText>
          </WhiteBox>
          <WhiteBox>
            <Video>
              <img
                src={`${process.env.PUBLIC_URL}/images/videoimg.png`}
                alt="videoimg"
              />
            </Video>
            <Videologo>
              <img
                src={`${process.env.PUBLIC_URL}/images/videologo.png`}
                alt="videologo"
              />
            </Videologo>
            <VideoText>회원가입 로그인 시연 영상</VideoText>
          </WhiteBox>
          <WhiteBox>
            <Video>
              <img
                src={`${process.env.PUBLIC_URL}/images/videoimg.png`}
                alt="videoimg"
              />
            </Video>
            <Videologo>
              <img
                src={`${process.env.PUBLIC_URL}/images/videologo.png`}
                alt="videologo"
              />
            </Videologo>
            <VideoText>회원가입 로그인 시연 영상</VideoText>
          </WhiteBox>
          <WhiteBox>
            <Video>
              <img
                src={`${process.env.PUBLIC_URL}/images/videoimg.png`}
                alt="videoimg"
              />
            </Video>
            <Videologo>
              <img
                src={`${process.env.PUBLIC_URL}/images/videologo.png`}
                alt="videologo"
              />
            </Videologo>
            <VideoText>회원가입 로그인 시연 영상</VideoText>
          </WhiteBox>
        </Body>
      </BodyWrapper>
    </Container>
  );
};
export default Prevideopage;
