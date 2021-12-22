import  "./featuredInfo.css"
import {ArrowDownward, ArrowUpward} from "@material-ui/icons"
import {useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";


export default function FeaturedInfo() {
    const [income, setIncome] = useState([]);
    const [prec, setPrec] = useState(0);

    useEffect(()=>{
      const getIncome = async () =>{
          try {
              const res = await userRequest.get("orders/income");
              setIncome(res.data);
              setPrec((res.data[1].total *100) / res.data[0].total -100)
          } catch (error) {
              console.log(error)
          }
      };
      getIncome();
    },[]);

    console.log(income);
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featureTitle">Revanue</span>
                <div className="featureMoneyContainer">
                    <span className="featuredMoney">NGN{income[1]?.total}</span>
                    <span className="featuredMoneyRate">
                    %{Math.floor(prec)}
                    {prec < 0 ? (
                       <ArrowDownward className="featuredIcon negative"/>
                    ): <ArrowUpward className="featuredIcon"/>}
                     
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featureTitle">Sales</span>
                <div className="featureMoneyContainer">
                    <span className="featuredMoney">$4,194</span>
                    <span className="featuredMoneyRate">
                    -1.4 <ArrowDownward  className="featuredIcon negative"/>
                    </span>
                </div>

                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featureTitle">Cost</span>
                <div className="featureMoneyContainer">
                    <span className="featuredMoney">$5,194</span>
                    <span className="featuredMoneyRate">
                    +11.4 <ArrowUpward className="featuredIcon"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    )
}
