import { useState } from "react"
import { useDispatch} from "react-redux";
import { login } from "../../redux/apiCall";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    // const {isFetching, error} = useSelector(state=>state.user);

    const handleLogin = (e) => {
        e.preventDefault();
         login(dispatch,{username, password});
    }
    return (
        <div  style={{
            height: "100vh",
            display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          flexDirection: "column",
      
         
          }}>
            <input  style={{marginBottom: 20, padding: 10}} type="username" placeholder="username" onChange={(e) =>setUsername(e.target.value)}/>
            <input style={{marginBottom: 20, padding: 10}} type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleLogin} style={{margin: 2, width:"10%", cursor: "pointer", color:"white",  backgroundColor: "teal"}}>Login</button>
        </div>
    )
}


export default Login
