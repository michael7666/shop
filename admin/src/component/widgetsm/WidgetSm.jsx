import "./widgetsm.css"
import {Visibility} from "@material-ui/icons";
import {useState, useEffect} from "react";
import {userRequest} from "../../requestMethod";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const getUser = async () =>{
   try {
    const res = await userRequest.get("/users/?new=true");
    setUsers(res.data);

   } catch (error) {
     console.log(error);
   }
    
    }
    getUser();
  },[])
    return (
        <div className="widgetsm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
              {users.map(user =>(

         <li className="widgetSmListItems" key={user._id}>
                 <img src={user.img || "https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png"} 
                alt="" className="widgetSmImg" />
              <div className="widgetSmUser">
             <span className="widgetSmUsername">{user.username}</span>
           </div>
          <button className="widgetSmButton">
          <Visibility className="widgetSmIcon"/>
            Display
             </button>
        </li>
       ))}
             
            </ul>
            
            
            
           
        </div>
    )
}
