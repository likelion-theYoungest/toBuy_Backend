import { BrowserRouter, Route, Routes } from "react-router-dom";
import Firstpage from "./pages/Firstpage/firstpage";
import Prevideopage from "./pages/Firstpage/prevideopage";
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/Signup";
import PlayVideo from "./pages/Firstpage/playVideo";
import Signupcard from "./pages/Signup/Signupcard";
import Signup2 from "./pages/Signup/Signup2";
import Category from "./pages/categorys/category";
import MypageMain from "./pages/mypage/mypageMain";
import VerifyLogin from "./pages/mypage/verifyLogin";
import PasswordChange from "./pages/mypage/passwordChange";
import Charge from "./pages/mypage/charge";
import ProductDetail from "./pages/pay/productDetail";
import Payment from "./pages/pay/payment";
import Complete from "./pages/pay/Complete";
import Findid from "./pages/Login/findid";
import Fashion from "./pages/categorys/Fashion";
import Beauty from "./pages/categorys/Beauty";
import Food from "./pages/categorys/Food";
import Daily from "./pages/categorys/Daily";
import HomeDeco from "./pages/categorys/HomeDeco";
import Health from "./pages/categorys/Health";
import Main from "./pages/Home&Search/Main";
import FailSearch from "./pages/Home&Search/FailSearch";
import SuccessSearch from "./pages/Home&Search/SuccessSearch";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Firstpage />} />
          <Route path="/Prevideopage" element={<Prevideopage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signupcard" element={<Signupcard />} />
          <Route path="/Signup2" element={<Signup2 />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/Findid" element={<Findid />} />
          <Route path="/Fashion" element={<Fashion />} />
          <Route path="/Beauty" element={<Beauty />} />
          <Route path="/Food" element={<Food />} />
          <Route path="/Daily" element={<Daily />} />
          <Route path="/HomeDeco" element={<HomeDeco />} />
          <Route path="/Health" element={<Health />} />
          <Route path="/MypageMain" element={<MypageMain />} />
          <Route path="/VerifyLogin" element={<VerifyLogin />} />
          <Route path="/PasswordChange" element={<PasswordChange />} />
          <Route path="/Charge" element={<Charge />} />
          <Route path="/PlayVideo" element={<PlayVideo />} />
          {/*/ <Route path="/ProductDetail" element={<ProductDetail />} /> */}
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/FailSearch" element={<FailSearch />} />
          {/* <Route path="/SuccessSearch" element={<SuccessSearch />} /> */}
          <Route path="/products" element={<SuccessSearch />} />;
          <Route path="/Complete" element={<Complete />} />
          {/* <Route path="/Detail" element={<Detail />} /> */}
          <Route
            path="/products/:category/:productId/"
            element={<ProductDetail />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
