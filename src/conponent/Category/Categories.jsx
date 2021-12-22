import styled from "styled-components";
import {Categoriess} from "../../data";
import { mobile } from "../../responsive";
import CategoryItem from "../CategoryItem/CategoryItem";


const Container = styled.div`
display: flex;
padding: 20px;
justify-content: space-between;
${mobile({padding: "0px", flexDirection: "column"})}
`;

const Categories = () => {
    return (
        <Container>
            {Categoriess.map(item =>(
                <CategoryItem item={item} key={item.id}/>
            ))}
        </Container>
    )
}

export default Categories
