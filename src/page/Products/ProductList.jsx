import styled from "styled-components";
import Narbar from "../../conponent/Narbar/Narbar";
import Announment from "../../conponent/Announment/Announment";
import NewsLetter from "../../conponent/NewsLetter/NewsLetter";
import Footer from "../../conponent/Footer/Footer";
import Product from "../../conponent/Product/Product";
import { mobile } from "../../responsive";
import { useLocation } from "react-router";
import { useState } from "react";



const Container = styled.div``;

const Title = styled.h1`
margin: 20px;
`;

const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
`;

const Filter = styled.div`
margin: 20px;
${mobile({width: "0px 20px", display: "flex", flexDirection: "column"})}
`;

const FilterText = styled.span`
font-size: 20px;
font-weight: 600;
margin-right: 20px;
${mobile({marginRight: "0px"})}
`;

const Select = styled.select`
margin-right: 20px;
padding: 10px;
${mobile({margin: "10px 0px"})}
`;
const Option = styled.option``;

const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2]
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");

    const handleFilters = (e) =>{
       const value = e.target.value;
       setFilters({
           ...filters,
         [e.target.name] : value,
       })
    }
    // console.log(filter);
    return (
        <Container>
            <Narbar/>
            <Announment/>
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter><FilterText>Filter Product :</FilterText>
                 <Select name="color" onChange={handleFilters}>
                     <Option disabled >
                         Color
                     </Option>
                     <Option>white</Option>
                     <Option>blue</Option>
                     <Option>yellow</Option>
                     <Option>red</Option>
                     <Option>black</Option>
                     <Option>green</Option>
                 </Select>
                 <Select name="size" onChange={handleFilters}> 
                     <Option disabled>
                         Size
                     </Option>
                     <Option>XS</Option>
                     <Option>S</Option>
                     <Option>M</Option>
                     <Option>L</Option>
                     <Option>XL</Option>
                 </Select>
                </Filter>
                <Filter><FilterText>Sort Product :</FilterText>
                <Select onChange={e=>setSort(e.target.value)}>
                     <Option value="newest">
                         Newest
                     </Option>
                     <Option value="asc">Price (asc)</Option>
                     <Option value="desc">Price (desc)</Option>
                   
                 </Select>
                
                </Filter>
            </FilterContainer>
            <Product cat={cat} filters={filters} sort={sort}/>
            <NewsLetter/>
            <Footer/>
        </Container>
    )
}

export default ProductList
