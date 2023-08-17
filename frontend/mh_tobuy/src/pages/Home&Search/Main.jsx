import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
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
`;

const AdvArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 300px;
  margin-top: 15px;
`;

const Adv1 = styled.div`
  width: 360px;
  margin: auto;
`;

const Cate = styled.div`
  position: relative;
  width: 200px;
  margin-top: 40px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  margin-left: 5%;
  text-align: left;
`;

const ProductArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  // background: red;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-content: space-evenly;
  // margin-top: 10px;
`;

const Product = styled.div`
  position: relative;
  height: 250px;
  width: 180px;
  // background: blue;
`;

const Image = styled.div`
  position: relative;
  margin: auto;
  margin-top: 20px;
  width: 160px;
  height: 160px;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
`;

const Name = styled.div`
  position: relative;
  // background: orange;
  margin: auto;
  margin-top: 8px;
  width: 160px;
  height: 30px;
  text-align: left;
  font-size: 16px;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
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

const Info = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  margin-top: 30px;
`;

const Info2 = styled.div`
  position: relative;
  width: 200px;
  margin: auto;
  height: 20px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Detail = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  text-decoration-line: underline;

  color: #05bba2;
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

const Main = () => {
  const navigate = useNavigate();
  const navigateToBack = () => {
    window.history.back();
  };

  const BACKEND_URL =
    "https://youngest.pythonanywhere.com" || "http://127.0.0.1:8000";
  const [recentSearches, setRecentSearches] = useState([]);
  const [inputFocused, setInputFocused] = useState(false); // 초기값 설정
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    // 검색어 입력창이 포커스를 잃었을 때, 최근 검색어 목록이 사라지지 않도록 처리
    setTimeout(() => {
      setInputFocused(false);
    }, 200);
  };

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

  const url1 =
    "https://harvest-machine-d20.notion.site/77980ca8efd3435e9915e88b830a5ca4";
  const url2 =
    "https://harvest-machine-d20.notion.site/d76bf5b332524288a9db8d1857c6bc19";

  const location = useLocation();

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
  useEffect(function () {
    axios
      .get(`${BACKEND_URL}/products/main/`)
      .then(function (result) {
        setProducts(result.data);
        console.log(result);
        console.log("성공");
      })
      .catch(function (error) {
        console.error("에러 발생 : ", error);
      });
  }, []);

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const getCategoryDisplayName = (category) => {
    switch (category) {
      case "cate1":
        return "패션의류 / 잡화";
      case "cate2":
        return "뷰티";
      case "cate3":
        return "식품";
      case "cate4":
        return "생필품";
      case "cate5":
        return "홈 데코";
      case "cate6":
        return "건강";
      // 추가적인 카테고리에 대한 처리를 여기에 추가할 수 있습니다.
      default:
        return category;
    }
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
                <RecentSearchItem key={index}>
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
        <Gra></Gra>
        <AdvArea>
          <Adv1>
            <img
              src={`${process.env.PUBLIC_URL}/images/adv1.png`}
              width="360px"
            />
          </Adv1>
        </AdvArea>
        {Object.entries(groupedProducts).map(
          ([category, productsInCategory]) => (
            <React.Fragment key={category}>
              <Cate>{getCategoryDisplayName(category)}</Cate>
              <Gra></Gra>
              <ProductArea>
                {productsInCategory.length > 0 ? (
                  productsInCategory.slice(0, 2).map((product) => (
                    <Product
                      key={product.productId}
                      onClick={() =>
                        navigate(
                          `/products/${product.category}/${product.productId}/`
                        )
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
                  ))
                ) : (
                  <p>로딩 중...</p>
                )}
              </ProductArea>
            </React.Fragment>
          )
        )}

        <Info>
          <img
            src={`${process.env.PUBLIC_URL}/images/bottomInfo.png`}
            width="360px"
            height="47px"
          />
          <Info2>
            <Detail
              onClick={() => {
                window.open(url2);
              }}
            >
              개인정보 처리방침
            </Detail>
            <Detail
              onClick={() => {
                window.open(url1);
              }}
            >
              서비스 이용약관
            </Detail>
          </Info2>
        </Info>
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
                  src={`${process.env.PUBLIC_URL}/images/maincoachmark.png`}
                  alt="maincoachmark"
                  width="300"
                  height="700"
                />
              </CmLogo>
            </ModalView>
          </ModalBackdrop>
        ) : null}
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

export default Main;
