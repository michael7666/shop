import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { register } from "../../redux/appiCalls/appiCalls";
import { mobile } from "../../responsive";


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

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

const TitlePage = styled.p`

&.errmsg{
    background-color: lightpink;
    color: firebrick;
    font-weight: bold;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
}
&.offscreen{
    position: absolute;
    left: -9999px;
}

&.instructions{
    font-size: 0.75rem;
    border-radius: 0.5rem;
    background: #000;
    color: #fff;
    padding: 0.25rem;
    position: relative;
    bottom: -10px;
}
&.instructions > svg{
    margin-right: 0.25rem;
}
`;
const Input = styled.input`
 flex: 1;
min-width: 70%;
margin: 10px 5px 0px 0px;
padding: 9px;
align-items:center;

`;

const Lable = styled.label`
margin-bottom:  10px;
margin-top: 7px;
`;

const Agreement = styled.span`
font-size: 20px;
margin: 20px 0px;
`;

const MassageSpan = styled.span`
&.hide{
    display: none;
}
&.valid{
    color: limegreen;
    margin-left: 0.25rem;
}
&.invalid{
    color: red;
    margin-left: 0.25rem;
}
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

    const userRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    const [nameFocus, setNameFocus] = useState(false)
   
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [confirmPassword, setconfirmPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


   

 const navigate = useNavigate();
const dispatch = useDispatch();



useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(()=>{
      setValidEmail(EMAIL_REGEX.test(email));
    },[email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === confirmPassword);
    }, [password, confirmPassword])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, confirmPassword, Name, email])


 

    const handleSubmit = async (e) =>{
        
        e.preventDefault();
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        try{
            if(email || password || username || Name){
           await  register(dispatch,{Name, email, username, password,confirmPassword});
            navigate("/login");
            return;
            }

        setSuccess(true);
        setEmail('');
        setUsername('');
        setconfirmPassword('');
        setPassword('');

        }catch(err){
         if(!err?.res){
           setErrMsg("No server response");
         }else if(!err?.res.status === 409){
           setErrMsg("Username and email address taken");
         }else{
             setErrMsg("Registration fail")
         }
          errRef.current.focus();
        }
        /* register(dispatch,{Name, email, username, password,confirmPassword});
        navigate("/login"); */

        /* setSuccess(true);
        setEmail('');
        setUsername('');
        setconfirmPassword('');
        setPassword(''); */
    }

    

    
    return (
        <>
        {success ? (
            <Container>
               <Link to="/login">Sign Up</Link>
               
            </Container>
        ): (

            <Container>
            <Wrapper>
            <TitlePage ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</TitlePage>
                <Title>CREATE AN ACCOUNT</Title>
                <Form onSubmit={handleSubmit}>           
                
                <Lable htmlFor="name">
                    Name:
                 <MassageSpan  className={validName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                  </MassageSpan>

                  <MassageSpan className={validName || !Name ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                  </MassageSpan>
                </Lable>
                <Input 
                
                type="text"
                            id="name"  
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                
                />
                <TitlePage id="uidnote" className={nameFocus && Name && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                 Must begin with a letter.<br />
                 Letters, numbers, underscores, hyphens allowed.
                 </TitlePage>

                <Lable htmlFor="email">
                 Email:
                 <MassageSpan  className={validEmail ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                  </MassageSpan>

                  <MassageSpan className={validEmail || !email ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                  </MassageSpan>
                </Lable>
                <Input 
                id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="eidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                
                />
                <TitlePage id="eidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                4 to 24 characters.<br />
                 Must begin with a letter.<br />
                 Letters, numbers, underscores, hyphens allowed.
                </TitlePage>
                <Lable htmlFor="username">
                UserName:
                 <MassageSpan  className={validName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                  </MassageSpan>

                  <MassageSpan className={validName || !username ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                  </MassageSpan>
                </Lable>
                <Input 
                type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                
                />
                <TitlePage id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                 Must begin with a letter.<br />
                 Letters, numbers, underscores, hyphens allowed.
                 </TitlePage>

                <Lable htmlFor="password">
                Password:
                </Lable>
                <Input  
                type="password" 
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                />
               <TitlePage id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
               <FontAwesomeIcon icon={faInfoCircle} />

               </TitlePage>
                <Lable htmlFor="confirmPassword">
                  Confirm_Password:
                  <FontAwesomeIcon icon={faCheck} className={validMatch && confirmPassword ? "valid" : "hide"} />
                 <FontAwesomeIcon icon={faTimes} className={validMatch || !confirmPassword ? "hide" : "invalid"} />
                </Lable>
                <Input 
                 type="password"
                 id="confirm_Password"
                            onChange={(e) => setconfirmPassword(e.target.value)}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                 
                 />

                 <TitlePage id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                 <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
                 </TitlePage>
                    <Agreement>I Agree with terms and condition <b>PRIVACY POLICY</b></Agreement>
                    <Button>CREATE</Button>
                </Form>
            </Wrapper>
           
        </Container>

        )}
       

        </>
    )
}

export default Register
