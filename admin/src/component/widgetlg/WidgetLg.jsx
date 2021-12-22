import "./widgetlg.css"
import {useState, useEffect} from "react";
import {userRequest} from "../../requestMethod";
import {format} from "timeago.js";

export default function WidgetLg() {
    const [orders, setOders] = useState([]);

    useEffect(()=>{
      const getOders = async () =>{
     try {
      const res = await userRequest.get("orders");
      setOders(res.data);
  
     } catch (error) {
       console.log(error);
     }
      
      }
    getOders();
    },[])

    const Button = ({type}) =>{
        return <button className={"widgetLgButton " + type}>{type}</button>
    }
    return (
        <div className="widgetlg">
            <h3 className="widgetLgTitle">Last Transaction</h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                <th className="widgetLgTh">Customer</th>
                <th className="widgetLgTh">Date</th>
                <th className="widgetLgTh">Amount</th>
                <th className="widgetLgTh">Status</th>
                </tr>
                {orders.map(oder =>(

                
                <tr className="widgetLgTr" key={oder._id}>
                    <td className="widgetLgUser">
                        <span className="widgetLgName">{oder.userId}</span>
                    </td>
                    <td className="widgetLgDate">{format(oder.createdAt)}</td>
                    <td className="widgetLgAmount">NGN{oder.amount}</td>
                    <td className="widgetLgStatus"><Button type={oder.status}/></td>

                </tr>
                
                ))}
                
            </table>
        </div>
    )
}
