

import { useState } from "react";
import styled from "styled-components";
// import "./formInput.css";





const Container = styled.div`
 
`;


const Input = styled.input`
 flex: 1;
min-width: 70%;
margin: 10px 5px 0px 0px;
padding: 9px;
align-items:center;

&:invalid ~ span{
    display: block;
}

`;

const Error = styled.span`
display: flex;
flex-direction: column;
font-size: 16px;
padding: 2px;
color: red;
display: none;
margin: 5px;

`;









const FormInput = (props) =>{
    const [focused, setFocused] = useState(false);

   const {onChange, errorMassage, id, ...inputProps} = props;


   const handleFocused = (e) =>{
       setFocused(true);
   }


      return(
        <Container>
         <Input {...inputProps} onChange={onChange} onBlur={handleFocused}  focused={focused.toString()}/>
          <Error>{errorMassage}</Error>
           {/* <input {...inputProps} onChange={onChange} onBlur={handleFocused}  focused={focused.toString()}/>
          <span>{errorMassage}</span> */}
    </Container>
    //    <div>
    //         <input {...inputProps} onChange={onChange} onBlur={handleFocused}  focused={focused.toString()}/>
    //       <span>{errorMassage}</span>
    //    </div>
      )
}


export default FormInput