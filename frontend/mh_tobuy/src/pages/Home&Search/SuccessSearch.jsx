import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const SearchBox = styled.div`
  width: 100%;
  height: 50px;
  padding-top: 40px;
  padding-bottom: 32px;
  position: relative;
  margin: auto;
`;
const RecentSearches = styled.div`
  position: absolute;
  width: 100%;
  background-color: white;
  border-radius: 4px;
  // margin-top: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const RecentSearchItem = styled.div`
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  position: relative;
  &:hover {
    background-color: #f5f5f5;
  }

  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Clock = styled.span`
  position: relative;
  width: 24px;
  margin-left: 20px;
  margin-right: 10px;
`;
const RedSearch = styled.div`
  position: absolute;
  top: 65px; /* 세로 가운데 정렬 */
  left: 10%; /* 원하는 가로 위치 조절 */
  transform: translateY(-50%); /* 세로 가운데 정렬을 위한 조정 */
  cursor: pointer;
`;

const InputSearch = styled.input`
  width: 60%; /* 인풋을 100% 너비로 설정 */
  height: 42px; /* 인풋을 100% 높이로 설정 */
  margin-left: 20%;
  border: none; /* 기본 테두리 제거 */
  //   padding-left: 40px; /* 왼쪽 여백 추가 (이미지 너비만큼) */
  font-size: 16px;
  background-color: transparent; /* 배경색 투명으로 설정 */
  position: absolute;
  margin-top: 40px;
  top: 0;
  left: 0;
  opacity: 0.8; /* 인풋을 조금 투/명하게 설정 */
  //   color: white; /* 글자색 설정 */
  caret-color: white; /* 커서 색상 설정 */
`;

const Gra = styled.div`
  position: relative;
  background: linear-gradient(to right, #e02d11, #05bba2);
  width: 100%;
  height: 2px;
  border: none; /* 선 없애기 */
  // z-index: 1;
  margin-bottom: 10px;
`;

const Result = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  margin-left: 5%;
  text-align: left;
`;

const ProductArea = styled.div`
  position: relative;
  width: 100%;
  // max-height: calc(100vh - 250px);
  border-radius: 6px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-content: space-evenly;
  z-index: 0;
  margin-top: 14px;
  padding-top: 10px;
  overflow-y: auto;
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
const NoResultsMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const NoResultsImage = styled.img`
  width: 72px;
`;
const SuccessSearch = () => {
  const navigate = useNavigate();
  const navigateToBack = () => {
    navigate(-1); // 이전 페이지로 이동
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
  const [recentSearches, setRecentSearches] = useState([]);
  const [inputFocused, setInputFocused] = useState(false); // 초기값 설정
  // const [inputValue, setInputValue] = useState("");

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    // 검색어 입력창이 포커스를 잃었을 때, 최근 검색어 목록이 사라지지 않도록 처리
    setTimeout(() => {
      setInputFocused(false);
    }, 200);
  };

  const handleRecentSearchClick = (encodedSearch) => {
    setSearch(decodeURIComponent(encodedSearch));
    navigate(`/products?search=${encodedSearch}`);
  };
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");
  const [products, setProducts] = useState([]);
  const BACKEND_URL =
    "https://youngest.pythonanywhere.com" || "http://127.0.0.1:8000";
  useEffect(() => {
    if (searchQuery) {
      axios
        .get(
          `${BACKEND_URL}/products?search=${searchQuery}`, // 수정된 부분

          {
            headers: {
              Authorization: `Token ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then(function (result) {
          setProducts(result.data);
          console.log("성공");
        })
        .catch(function (error) {
          console.error("에러 발생 : ", error);
        });
    }
  }, [searchQuery]);

  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    // 검색어와 함께 검색 결과 페이지로 이동
    const encodedSearch = encodeURIComponent(search);
    setRecentSearches((prevSearches) => {
      // 중복되는 검색어는 추가하지 않도록 검사
      if (!prevSearches.includes(encodedSearch)) {
        return [encodedSearch, ...prevSearches.slice(0, 4)]; // 최근 5개만 유지
      }
      return prevSearches;
    });

    // Axios를 사용하여 GET 요청 보내기
    axios
      .get(
        `${BACKEND_URL}/products?search=${encodedSearch}`, // 수정된 부분

        {
          headers: {
            Authorization: `Token ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        navigate(`/products?search=${encodedSearch}`);
      })
      .catch((error) => {
        console.error({
          message: "로그인을 해주세요.",
        });
      });
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
        <SearchBox inputfocused={inputFocused ? "true" : "false"}>
          <img
            src={`${process.env.PUBLIC_URL}/images/검색창.png`}
            width="90%"
            height="50px"
          />
          <RedSearch>
            <img
              src={`${process.env.PUBLIC_URL}/images/redsearch.png`}
              width="28px"
              onClick={handleSearchSubmit}
            />
          </RedSearch>
          <InputSearch
            placeholder="검색어를 입력하세요."
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            value={search}
            onChange={handleSearchChange}
          />
          {inputFocused && recentSearches.length > 0 && (
            <RecentSearches>
              {recentSearches.map((encodedSearch, index) => (
                <RecentSearchItem
                  key={index}
                  onClick={() => handleRecentSearchClick(encodedSearch)}
                >
                  <Clock>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/time.png`}
                      width="24px"
                    />
                  </Clock>
                  {decodeURIComponent(encodedSearch)}
                </RecentSearchItem>
              ))}
            </RecentSearches>
          )}
        </SearchBox>
        <Result>"[ {searchQuery} ]" 의 검색 결과 입니다.</Result>
        <Gra></Gra>
        <ProductArea>
          {products.length === 0 ? (
            <NoResultsMessage>
              <NoResultsImage
                src={`${process.env.PUBLIC_URL}/images/black.png`}
                width="72px"
              />
              검색 결과와 일치하는 품목이 없습니다.
            </NoResultsMessage>
          ) : (
            products.map((product) => (
              <Product
                key={product.productId}
                onClick={() =>
                  navigate(
                    `/products/${product.category}/${product.productId}/`
                  )
                }
              >
                <Image>
                  <img src={product.image} alt={product.name} width="160px" />
                </Image>
                <Name>{product.name}</Name>
                <Price>{product.price}원</Price>
              </Product>
            ))
          )}
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

export default SuccessSearch;
