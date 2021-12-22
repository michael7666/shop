import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../redux/user/userReduce";


const Container = styled.div``;
const Button = styled.button``;

const Logout = () => {
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
            <Button onClick={handleClick}>
                Logout
            </Button>
        </Container>
    )
}

export default Logout
