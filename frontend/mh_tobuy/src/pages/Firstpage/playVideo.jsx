import React from "react";
import { useNavigate } from "react-router-dom";
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
const List = styled.div`
  height: auto;
  padding-top: 10px;
`;
const WhiteBox = styled.div`
  height: 120px;
  border-radius: 6px;
  box-shadow: 0px 0px 11px 3px rgba(0, 0, 0, 0.25);
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  position: relative;
  height: 90px;
  margin-left: 10px;
`;
const DemoVideo = styled.div``;
const DemoVideo2 = styled.div`
  margin-left: -70px;
`;

const DemoLogo = styled.div`
  position: absolute;
  top: 14px;
  left: 8px;
`;
const Title = styled.div`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 43px;

  text-align: left;
  width: 154px;
`;

const BottomBar = styled.footer`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 60px;
  position: fixed;
  bottom: 0;
  width: 100%;
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }
  background: white;
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

const PlayVideo = () => {
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
          <Video></Video>
        </Topbar>

        <Body>
          <List>
            <WhiteBox>
              <DemoVideo>
                <img
                  src={`${process.env.PUBLIC_URL}/images/videoSample.png`}
                  width="150px"
                  height="90px"
                />
              </DemoVideo>
              <Wrapper>
                <DemoLogo>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/로고3.png`}
                    width="44px"
                    height="25.283px"
                  />
                </DemoLogo>
                <Title>회원가입-로그인 시연 영상</Title>
              </Wrapper>
            </WhiteBox>

            <WhiteBox>
              <DemoVideo>
                <img
                  src={`${process.env.PUBLIC_URL}/images/videoSample.png`}
                  width="150px"
                  height="90px"
                />
              </DemoVideo>
              <Wrapper>
                <DemoLogo>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/로고3.png`}
                    width="44px"
                    height="25.283px"
                  />
                </DemoLogo>
                <Title>아이디 찾기 시연 영상</Title>
              </Wrapper>
            </WhiteBox>

            <WhiteBox>
              <DemoVideo>
                <img
                  src={`${process.env.PUBLIC_URL}/images/videoSample.png`}
                  width="150px"
                  height="90px"
                />
              </DemoVideo>
              <Wrapper>
                <DemoLogo>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/로고3.png`}
                    width="44px"
                    height="25.283px"
                  />
                </DemoLogo>
                <Title>
                  홈 화면-상품선택-결제<br></br>시연 영상{" "}
                </Title>
              </Wrapper>
            </WhiteBox>

            <WhiteBox>
              <DemoVideo>
                <img
                  src={`${process.env.PUBLIC_URL}/images/videoSample.png`}
                  width="150px"
                  height="90px"
                />
              </DemoVideo>
              <Wrapper>
                <DemoLogo>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/로고3.png`}
                    width="44px"
                    height="25.283px"
                  />
                </DemoLogo>
                <Title>간편 카드결제 시연 영상 </Title>
              </Wrapper>
            </WhiteBox>

            <WhiteBox>
              <DemoVideo>
                <img
                  src={`${process.env.PUBLIC_URL}/images/videoSample.png`}
                  width="150px"
                  height="90px"
                />
              </DemoVideo>
              <Wrapper>
                <DemoLogo>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/로고3.png`}
                    width="44px"
                    height="25.283px"
                  />
                </DemoLogo>
                <Title>일반 카드결제 시연 영상 </Title>
              </Wrapper>
            </WhiteBox>
            <WhiteBox>
              <DemoVideo>
                <img
                  src={`${process.env.PUBLIC_URL}/images/videoSample.png`}
                  width="150px"
                  height="90px"
                />
              </DemoVideo>
              <Wrapper>
                <DemoLogo>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/로고3.png`}
                    width="44px"
                    height="25.283px"
                  />
                </DemoLogo>
                <Title>가상카드 충전 시연 영상 </Title>
              </Wrapper>
            </WhiteBox>

            <WhiteBox>
              <DemoVideo>
                <img
                  src={`${process.env.PUBLIC_URL}/images/videoSample.png`}
                  width="150px"
                  height="90px"
                />
              </DemoVideo>
              <Wrapper>
                <DemoLogo>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/로고3.png`}
                    width="44px"
                    height="25.283px"
                  />
                </DemoLogo>
                <Title>
                  마이페이지-결제내역<br></br>시연영상{" "}
                </Title>
              </Wrapper>
            </WhiteBox>
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

export default PlayVideo;
