import { ArrowLeft, ArrowRight } from "@material-ui/icons"
import { useState } from "react";
import styled from "styled-components";
import {SlideItems} from "../../data";
import {mobile} from "../../responsive";

const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
position: relative;
overflow: hidden;
${mobile({display: "none"})}
`
const Arrow = styled.div`
width: 50px;
height: 50px;
background-color: #fffefe;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
top: 0;
bottom: 0;
margin: auto;
left: ${props=> props.direction === "left" && "10px" };
right: ${props=> props.direction === "right" && "10px" };
cursor: pointer;
opacity: 0.5;
z-index: 2;
`;

const Wrapper = styled.div`
height: 100%;
display: flex;
transition: all 1.5s ease;
transform: translateX(${(props) => props.sliderIndex * -100}vw);
`

const SlideContainer = styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
background-color: #${props=>props.bg};
`
const ImgContainer = styled.div`
height: 100%;
flex:1;
`
const Image = styled.img`
height: 90%;
`

const InfoContainer = styled.div`
flex: 1;
padding: 50px;
`

const Title = styled.h1`
font-size: 70px;
`
const Desc = styled.p`
margin: 50px 0px;
font-size: 20px;
font-weight: 500;
letter-spacing: 3px;
`
const Button = styled.button`
padding: 10px;
font-size: 20px;
background-color: transparent;
cursor: pointer;
`

const Slider = () => {
    const [sliderIndex, setSliderIndex] = useState(0);

    const handleClick =(direction)=>{
       if(direction === "left"){
           setSliderIndex(sliderIndex > 0 ? sliderIndex - 1 : 2);
       }else {
        setSliderIndex(sliderIndex < 2 ? sliderIndex + 1 : 0);
       }
    }
    return (
        <Container>
            <Arrow direction="left" onClick={()=>handleClick("left")}>
               <ArrowLeft/>
            </Arrow>
            <Wrapper sliderIndex={sliderIndex}>
                {SlideItems.map((item) =>(
                 <SlideContainer bg={item.bg} key={item.id}>
                   <ImgContainer>
                  <Image src={item.img}/>
                  </ImgContainer>
                <InfoContainer>
                <Title>{item.title}</Title>
                 <Desc>{item.desc} </Desc>
                <Button>SHOW NOW</Button>
              </InfoContainer>
             </SlideContainer>
                ))}
            
            
            
            </Wrapper>
            <Arrow direction="right" onClick={()=>handleClick("right")}>
               <ArrowRight/>
            </Arrow>
        </Container>
    )
}

export default Slider
