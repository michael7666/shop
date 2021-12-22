import {PaystackButton} from "react-paystack";
//  import {  useState} from "react";
 import styled from "styled-components";
 import { useNavigate } from 'react-router-dom';
  import {useSelector} from "react-redux";
  import { userRequest } from "../../requestMethod";


const Keys = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

const CheckOuts = styled.div`
  background-color: teal;
  color: white;
  cursor: pointer;

`;


//  const Form = styled.form`
//  display: flex;
// flex-direction: column;
//  `;

// const AmountText = styled.span`
// `;


// const CheckoutForm = styled.div`



// `;


// const Lable = styled.label`
// padding: 5px;
// margin-bottom: 3px;
// color: black;
// `;
// const Input = styled.input`
// min-width: 40%;
// margin: 20px 10px 0px 0px;
// padding: 10px;
// `;


// const Image = styled.img``;


//  const Button = styled.button`
// // width: 40%;
// // padding: 10px;
// // border: none;
// // background-color: teal;
// // cursor: pointer;
// // color: white;
// // margin: 15px;
// // font-weight: 600;
// // `;

const config = {
  reference: (new Date()).getTime().toString(),
  name: "ebuka",
  email: "ebuka@gmail.com",
  amount: 20000,
  publicKey: Keys,
};


const CheckOut = () => {
  const navigate = useNavigate();
  const cart = useSelector(state=>state.cart);


  const handlePaystackSuccessAction = async (reference) => {
    try {
            const res = await userRequest.post("/paystacks/payments",{
              amount: cart.total *100,
            })
            console.log(res.data);
            navigate("/success", res.data);
          } catch (error) {
            console.log(error);
          }
    console.log(reference);
  };
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const componentProps = {
      ...config,
      text: ' Pay',
      onSuccess: (reference) => handlePaystackSuccessAction(reference),
      onClose: handlePaystackCloseAction,
  };

  


    return (
        
            <CheckOuts>
                
                  <PaystackButton {...componentProps}/>
             </CheckOuts> 
        
    )
}

export default CheckOut
