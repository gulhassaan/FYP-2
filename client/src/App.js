import React, { useState, createContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./componenets/pages/Home";
import About from "./componenets/pages/About";
import { Login } from "./componenets/pages/Login";
import Signup from "./componenets/pages/Signup";

import Hardware from "./componenets/pages/Hardware";
import ForgotPassword from "./componenets/pages/ForgotPassword";
import Updated from "./componenets/pages/Updated";
import Footer from "./componenets/pages/Footer";
import Reset from "./componenets/pages/Reset";
import { MyAds } from "./componenets/pages/MyAds";
import AdminLogin from "./componenets/AdminPages/Admin-Login";
import Pac_Updated from "./componenets/AdminPages/Pac_Updated";
import Addpackage from "./componenets/AdminPages/Addpackage";
import Navbar from "./componenets/pages/NavbarNotSell";
import Editpackage from "./componenets/AdminPages/Editpackage";
import Managead from "./componenets/AdminPages/Managead";
import PrivateRouting from "./componenets/pages/PrivateRouting";
import UpdateAd from "./componenets/pages/UpdateAd";
import SignUpSuccessfully from "./componenets/pages/SignUpSuccessful";
import landingpage, { LandingPage } from './componenets/pages/LandingPage';
import AboutUs from "./componenets/pages/AboutUs"; 
import AdDetail from "./componenets/pages/AdDetail"
import AppC from "./componenets/chatsys/AppC"
import Manage_UserAds from "./componenets/AdminPages/Manage_UserAds";
import ManageUsers from "./componenets/AdminPages/ManageUsers";
import ManageEcomerce from "./componenets/AdminPages/ManageEcomerce";
import AddProduct from "./componenets/AdminPages/AddProduct";
import UpdateProduct from "./componenets/AdminPages/UpdateProduct";
import StoreHome from "./componenets/EcomercePages/StoreHome";
import ProductDetail from "./componenets/EcomercePages/ProductDetail";
import NewNavbar from "./componenets/pages/NewNavbar";
import Cart from "./componenets/EcomercePages/Cart";
import CheckOut from "./componenets/EcomercePages/Checkout";
//Context APIs
const EmailContext = createContext();
const byerContext = createContext();
const ImagesContext = createContext();
const AdContext = createContext();
const AdFContext = createContext();
const ProContext = createContext();
const AdDContext = createContext()
function App() {
  //global states
  const [Images, setImages] = useState([]);
  const [Email, setEMAIL] = useState("");
  const [AdID, setAdID] = useState("");
  const [AdFID, setAdFID] = useState("");
  const [ProID, setProID] = useState("");
  const [byer,setbyer] = useState("");
  const [AdD, setAdD]=useState('');
  return (
    <EmailContext.Provider value={{ Email, setEMAIL }}>
      <AdContext.Provider value={{ AdID, setAdID }}>
        <AdFContext.Provider value={{ AdFID, setAdFID }}>
          <ImagesContext.Provider value={{ Images, setImages }}>
          <AdDContext.Provider value={{AdD,setAdD}}>
   <ProContext.Provider value={{ProID,setProID}}>
   <byerContext.Provider value={{byer,setbyer}}>
            <div className="page-containerr">
              <div className="content-wrap">
                {/**/}
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<LandingPage />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/hardware" element={<Hardware />}></Route>
                    <Route path="/signupsuccess" element={<SignUpSuccessfully/>}></Route>
                    <Route path="/landingpage" element={<LandingPage/>}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/addetail" element={<AdDetail />}></Route>
                    <Route path="/addproduct" element={<AddProduct />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/cart" element={<Cart />}></Route>
                    <Route path="/checkout" element={<CheckOut />}></Route>
                    <Route path="/updateproduct" element={<UpdateProduct />}></Route>
<Route path="/service" element={<AboutUs />}></Route>
                    <Route path="/updatead" element={<UpdateAd />}></Route>
                    <Route path="/managestore" element={<ManageEcomerce />}></Route>
                    <Route
                      path="/forgotpassword"
                      element={<ForgotPassword />}
                    ></Route>
                    <Route path="/updated" element={<Updated />}></Route>
                    <Route path="/newNavbar" element={<NewNavbar />}></Route>
                    <Route path="/productdetail" element={<ProductDetail />}></Route>
                    <Route path="/MyAds" element={<MyAds />}></Route>
                    <Route path="/reset" element={<Reset />}></Route>
                    <Route path="/storehome" element={<StoreHome />}></Route>
                    <Route path="/AdminLogin" element={<AdminLogin />}></Route>

                    <Route path="/AppC" element={<AppC />}></Route>

                    <Route
                      path="/Pac_updated"
                      element={<Pac_Updated />}
                    ></Route>

                    <Route path="/addpackage" element={<Addpackage />}></Route>
                    <Route path="/manageusersads" element={<Manage_UserAds />}></Route>
                    <Route path="/manageusers" element={<ManageUsers />}></Route>
                    <Route
                      path="/editpackage"
                      element={<Editpackage />}
                    ></Route>

                    <Route path="/managead" element={<Managead />}></Route>
                  </Routes>
                </BrowserRouter>

                <Footer />
              </div>
            </div>
            </byerContext.Provider>
            </ProContext.Provider>
            </AdDContext.Provider>
   
          </ImagesContext.Provider>
        </AdFContext.Provider>
      </AdContext.Provider>
    </EmailContext.Provider>
  );
}

export default App;
export{byerContext};
export { EmailContext };
export { AdContext };
export { ImagesContext };
export { AdFContext };
export { ProContext };
export {AdDContext};



