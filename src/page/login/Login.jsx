import {useState} from "react";
import {  useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../../redux/appiCalls/appiCalls";
import { mobile } from "../../responsive";
import {Link, useNavigate} from "react-router-dom";

const Container = styled.div`
 width: 100vw;
 height: 100vh;
 background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), 
 url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpbz6iSjWmkBiY-Dzq7vWazUn16lI4qiS2Dg&usqp=CAU") center;
 display: flex;
 align-items: center;
 justify-content: center;
`;

const Wrapper = styled.div`
padding: 20px;
width: 25%;
background-color: blueviolet;
${mobile({width: "75%"})}
`;

const Title = styled.h1`
font-size: 24px;
font-weight: 600;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
`;

const Input = styled.input`
flex:1;
min-width: 40%;
margin: 20px 10px 0px 0px;
padding: 10px;
`;



const Button = styled.button`
width: 40%;
padding: 15px 20px;
border: none;
background-color: teal;
cursor: pointer;
color: white;
margin: 10px;
font-weight: 600;

&:hover{
    background-color: burlywood;
}
&:disabled{
    color: green;
    cursor: not-allowed;
}
`;

const LinkIN = styled.a`
margin: 5px 0px;
font-size: 17px;
text-decoration: underline;
cursor: pointer;
`;

// const Error = styled.span`
// background-color: red;
// color: white;
// padding: 5px;
// margin: 7px;
// `;

// const Success = styled.span`
// background-color: green;
// color: white;
// `

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const dispatch = useDispatch();
    const {isFetching} = useSelector(state=>state.user);

    const navigate = useNavigate();

    // const handlelogin = (e) => {
    //     e.preventDefault();
    //     login(dispatch, {username, password});
    //     navigate("/")
    // }
  

    const handleSubmit =(e) =>{
        e.preventDefault();
       
            login(dispatch, {username, password});
          navigate("/");
     
    }

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form onSubmit={handleSubmit}>

                    <Input placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
                    <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)} />

                    <Button  disabled={isFetching}>LOGIN</Button>
                   
                    <LinkIN>DOT NOT YOU REMEMEBER YOUR PASSWORD</LinkIN>
                    <Link to="/register" style={{textDecoration: "none", color: "black"}}>CREATE AN ACCOUNT</Link>
                    
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login
