
import Topbar from "./component/topbar/Topbar";
import Sidebar from "./component/sidebar/Sidebar";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import  Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import "./App.css";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"

function App() {
  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin;
  return (
    <Router>
      <Switch>
      <Route path="/login">
        {admin ?<Redirect to="/"/> : <Login/>}
        
      </Route>
     { admin && (
       <>
     <Topbar/>
      <div className="container">
        <Sidebar/>
        
          <Route exact path="/">
          <Home/>
          </Route>
          <Route path="/users">
          <UserList/>
          </Route>
          <Route path="/user/:userId">
          <User/>
          </Route>
          <Route path="/newUser">
          <NewUser/>
          </Route>
          <Route path="/products">
          <ProductList/>
          </Route>
          <Route path="/product/:productId">
          <Product/>
          </Route>
          <Route path="/newProduct">
          <NewProduct/>
          </Route>
      </div></>)}
      </Switch>
    </Router>
  );
}

export default App;
