import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  //   background-color: #f5f0e4;
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

const Cate = styled.div`
  position: relative;
  width: 200px;
  margin-top: 12%;
  font-size: 20px;
  margin-left: 5%;
  text-align: left;
`;

const Gra = styled.div`
  position: relative;
  background: linear-gradient(to right, #e02d11, #05bba2);
  width: 100%;
  height: 2px;
  border: none; /* 선 없애기 */
  margin-top: 7%;
  margin-bottom: 7%;
`;

const CateKind = styled.div`
  position: relative;
  //   width: 390px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center; /* 상하 가운데 정렬 */
  font-size: 16px;
  padding-left: 5%;
  text-align: left;
  border-bottom: 1px solid #839896;
`;

const Go = styled.div`
  cursor: pointer;
  width: 30px;
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

  /* 미디어 쿼리 적용 */
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

const Category = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };

  const goFashion = () => {
    navigate("/Fashion");
  };
  const goBeauty = () => {
    navigate("/Beauty");
  };
  const goFood = () => {
    navigate("/Food");
  };
  const goDaily = () => {
    navigate("/Daily");
  };
  const goHomeDeco = () => {
    navigate("/HomeDeco");
  };
  const goHealth = () => {
    navigate("/Health");
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
  const navigateToVideo = () => {
    navigate("/PlayVideo");
  };

  return (
    <Container>
      <BodyWrapper>
        <Topbar>
          <Back onClick={goBack}>
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
        <Cate>카테고리</Cate>
        <Gra></Gra>
        <CateKind onClick={goFashion}>
          패션의류 / 잡화
          <Go>
            <img
              src={`${process.env.PUBLIC_URL}/images/right.png`}
              width="30px"
            />
          </Go>
        </CateKind>
        <CateKind onClick={goBeauty}>
          뷰티
          <Go>
            <img
              src={`${process.env.PUBLIC_URL}/images/right.png`}
              width="30px"
            />
          </Go>
        </CateKind>
        <CateKind onClick={goFood}>
          식품
          <Go>
            <img
              src={`${process.env.PUBLIC_URL}/images/right.png`}
              width="30px"
            />
          </Go>
        </CateKind>
        <CateKind onClick={goDaily}>
          생필품
          <Go>
            <img
              src={`${process.env.PUBLIC_URL}/images/right.png`}
              width="30px"
            />
          </Go>
        </CateKind>
        <CateKind onClick={goHomeDeco}>
          홈 데코
          <Go>
            <img
              src={`${process.env.PUBLIC_URL}/images/right.png`}
              width="30px"
            />
          </Go>
        </CateKind>
        <CateKind onClick={goHealth}>
          건강
          <Go>
            <img
              src={`${process.env.PUBLIC_URL}/images/right.png`}
              width="30px"
            />
          </Go>
        </CateKind>
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
export default Category;
