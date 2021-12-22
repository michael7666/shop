
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { register } from "../../redux/appiCalls/appiCalls";
import { mobile } from "../../responsive";

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
width: 40%;
background-color: blueviolet;
${mobile({width: "75%"})}
`;

const Title = styled.h1`
font-size: 24px;
font-weight: 600;
`;

const Form = styled.form`
display: flex;
flex-direction: column
`;

const Input = styled.input`
 flex: 1;
min-width: 70%;
margin: 10px 5px 0px 0px;
padding: 9px;
align-items:center;

`;


const Agreement = styled.span`
font-size: 20px;
margin: 20px 0px;
`;

const Button = styled.button`
width: 40%;
padding: 10px 15px;
border: none;
background-color: teal;
cursor: pointer;
color: white;
margin: 4px;
font-weight: 600;

&:hover{
    background-color: burlywood;
}
`;

const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


   

 const navigate = useNavigate();
const dispatch = useDispatch();


    // const handleClick = (e) => {
    //     e.preventDefault();
    //     register(dispatch, {name,lastName,userName, email,password,confirmPassword});
    //     navigate("/login");
    // }
 

    const handleSubmit = (e) =>{
        
        e.preventDefault();
        register(dispatch,{firstName, lastName, username, email, password, confirmPassword} );
        navigate("/login");
    }

    

    
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form onSubmit={handleSubmit}>
                <Input placeholder="FirstName" onChange={(e)=>setFirstName(e.target.value)} />
                <Input placeholder="LastName" onChange={(e)=>setLastName(e.target.value)} />
                <Input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                <Input placeholder="username" onChange={(e)=>setUserName(e.target.value)} />
                <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)} />
                <Input placeholder="password" type="password" onChange={(e)=>setConfirmPassword(e.target.value)} />
                    <Agreement>I Agree with terms and condition <b>PRIVACY POLICY</b></Agreement>
                    <Button>CREATE</Button>
                </Form>
            </Wrapper>
           
        </Container>
    )
}

export default Register
