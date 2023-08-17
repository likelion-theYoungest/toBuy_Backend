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

const BottomBar = styled.footer`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 60px;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;

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

const Cate = styled.div`
  position: relative;
  width: 200px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  margin-left: 5%;
  text-align: left;
`;

const Gra = styled.div`
  position: relative;
  background: linear-gradient(to right, #e02d11, #05bba2);
  width: 100%;
  height: 2px;
  border: none; /* 선 없애기 */
  margin-top: 20px;
  margin-bottom: 5%;
`;

const ProductArea = styled.div`
  position: relative;
  width: 100%;
  height: 545px;
  border-radius: 6px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-content: space-evenly;
`;

const Product = styled.div`
  position: relative;
  height: 250px;
  width: 180px;
`;

const Image = styled.div`
  position: relative;
  margin: auto;
  margin-top: -8px;
  width: 160px;
  height: 160px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
`;

const Name = styled.div`
  position: relative;
  margin: auto;
  margin-top: 8px;
  width: 160px;
  height: 30px;
  text-align: left;
  font-size: 16px;
`;

const Price = styled.div`
  position: relative;
  margin: auto;
  margin-top: 14px;
  width: 160px;
  height: 30px;
  text-align: left;
  color: red;
  font-size: 16px;
`;

const Food = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
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

  const [products, setProducts] = useState([]);
  const BACKEND_URL =
    "https://youngest.pythonanywhere.com" || "http://127.0.0.1:8000";

  useEffect(function () {
    axios
      .get(`${BACKEND_URL}/products/cate3/`)
      .then(function (result) {
        setProducts(result.data);
        console.log("성공");
      })
      .catch(function (error) {
        console.error("에러 발생 : ", error);
      });
  }, []);

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
        <Cate>식품</Cate>
        <Gra></Gra>
        <ProductArea>
          {products.map((product) => (
            <Product
              key={product.productId}
              onClick={() =>
                navigate(`/products/${product.category}/${product.productId}/`)
              }
            >
              <Image>
                <img
                  src={`${BACKEND_URL}${product.image}`}
                  alt={product.name}
                  width="160px"
                />
              </Image>
              <Name>{product.name}</Name>
              <Price>{product.price}원</Price>
            </Product>
          ))}
        </ProductArea>
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
export default Food;
