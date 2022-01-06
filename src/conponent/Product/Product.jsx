import { useState,useEffect } from "react";
import styled from "styled-components"

// import {Products} from "../../data";
import ProductItem from "../ProductItem/ProductItem";
import axios from "axios";

const Container = styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`;

const Product = ({cat, filters, sort}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setfilteredProducts] = useState([]);

    useEffect(()=>{
       const getProducts = async() =>{
           try {
               const res = await axios.get( cat  `http://localhost:8800/api/products?=category${cat}`);
               setProducts(res.data);
           } catch (error) {
               console.log(error);
           }
       }
       getProducts();
    },[cat])

    useEffect(()=>{
        const getProduct = async() => {
            try {
                const res = await axios.get( cat && `http://localhost:8800/api/products`);
               setProducts(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getProduct();
    },[cat])

    useEffect(()=>{
        cat && setfilteredProducts(
            products?.filter(item=> Object.entries(filters).every(([key, value])=> item[key].includes(value)))
        )

    },[products, cat, filters])

    useEffect(()=>{
       if(sort === "newest"){
           setfilteredProducts(prev=>
            [...prev].sort((a,b)=> a.createdAt - b.createdAt)
            )
       }else if(sort === "asc"){
        setfilteredProducts(prev=>
         [...prev].sort((a,b)=> a.price - b.price)
         )
      }else{
        setfilteredProducts(prev=>
            [...prev].sort((a,b)=> b.price - a.price)
            )
      }
    },[sort])


    return (
        <Container>
          
            {cat ? filteredProducts?.map((item) =>(
                <ProductItem item={item} key={item._id}/>
            )):  products?.slice(0,8).map((item) =>(
                <ProductItem item={item} key={item._id}/>
            ))}
            {/* {
               cat && filteredProducts?.map((item)=>(
                <ProductItem item={item} key={item._id}/>
               ))
               
             } */}
            {/* :{ (
            //     products?.slice(0,8)?.map((item)=>(
            //         <ProductItem item={item} key={item._id}/>
            // ))
            // )

            // }  */}
               
            {/* if (!cat) {
                filteredProducts?.map((item)=>(
                    <ProductItem item={item} key={item._id}/>
                   ))
            }else {
                products?.slice(0,8)?.map((item)=>(
                       <ProductItem item={item} key={item._id}/>
                    ))
            } */}
           
            
        </Container>
    )
}

export default Product
