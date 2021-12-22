import Home from "./page/home/Home";
import ProductList from "./page/Products/ProductList";

import Cart from "./page/cart/Cart";

import Login from "./page/login/Login";

import Register from "./page/register/Register";
import Success from "./page/success/Success";

import ProductS from "./page/productsingle/ProductS";
import {BrowserRouter as Router, Routes,  Route, Navigate} from "react-router-dom";
import dotenv from "dotenv";
import { useSelector } from "react-redux";
// import Logout from "./page/logout/Logout";
// import CheckOut from "./page/checkout/CheckOut";

dotenv.config();

const App = () => {
  const user = useSelector(state=>state.user.currentUser);
  
  return(
     
    <Router>
      <Routes>
         <Route  path="/" element={<Home/>}/>
         <Route path="/products/:category" element={<ProductList/> }/>
         <Route path="/product/:id" element={<ProductS/>}/> 
         <Route path="/cart" element={<Cart/>}/>
         <Route path="/success" element={<Success/>}/>
         {/* <Route path="/checkout" element={<CheckOut/>}/> */}
          <Route path="/login"  element={user ? <Navigate to="/"/> : <Login/>} />
         <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>}/>
         {/* <Route path="/logout" element={<Logout/>}/> */}
         </Routes>
  </Router>
  
  ) 
};

export default App;