
import styled from "styled-components";
import {Search, ShoppingCartOutlined} from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import {mobile} from "../../responsive";
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/user/userReduce";


const Container = styled.div`
height: 60px;
${mobile({height: "50px"})}
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({padding: "10px 0px"})}
`
const Left = styled.div`
  flex:1;
  display: flex;
  align-items: center;
`
const Language = styled.span`
cursor: pointer;
${mobile({display: "none"})}
`;

const SearchContainer = styled.div`
border: 0.5px solid lightgray;
display: flex;
align-items: center;
margin-left:25px;
padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({width: "50px"})}
`;

const Center = styled.div`
 flex:1;
 text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({fontSize: "24px", margin: "2px"})}
`;

const Right = styled.div`
 flex:1;
 display: flex;
 align-items: center;
 justify-content: flex-end;
 ${mobile({flex: 2, justifyContent: "center"})}
`;

const MenuItem = styled.div`
 font-size: 14px;
cursor: pointer;
margin-left: 25px;
${mobile({fontSize: "12px", marginLeft: "10px"})}
`;
const Button = styled.button`
border: none;
padding: 8px;
margin: 10px;
cursor: pointer;
background-color: teal;
color: white

`;

const Narbar = () => {
  const quantity =  useSelector(state=>state.cart.quantity);
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user);
  console.log("user", user);
  const navigate = useNavigate();

  const handleClick = (e) =>{
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
 }
  
    return (
        <Container>
            <Wrapper>
               <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input placeholder="Search"/>
                    <Search style={{color: "gray", fontSize: "16px"}}/>
                </SearchContainer>
               </Left> 
            <Center>
                <Logo>Shopping</Logo>
            </Center>
            <Right>

                <Link to="/register" style={{textDecoration: "none"}}>
                <MenuItem>REGISTER</MenuItem>
                </Link>
                
                <Link to="/login" style={{textDecoration: "none"}}>
                <MenuItem>SIGN IN</MenuItem>
                </Link>
                <Button onClick={handleClick}>LOGOUT</Button>
                <Link to="/cart">
                <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                 <ShoppingCartOutlined />
                </Badge>
                </MenuItem>
                </Link>
            </Right>
            </Wrapper>
        </Container>
    )
}

export default Narbar

