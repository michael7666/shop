import "./product.css"
import {Link, useLocation} from "react-router-dom";
import Chart from "../../component/chart/Chart";
import {productData} from "../../dummyData";
import {Publish} from "@material-ui/icons"
import { useSelector } from "react-redux";

export default function Product() {
  const location = useLocation();

  const productId = location.pathname.split("")[2];

  const products = useSelector(state => state.product.products.find(product =>product._id === productId));
    return (
        <div className="product">
            <div className="productTitleContainer">
              <h2 className="productTitle">Product</h2>
              <Link to="/newProduct">
               <button className="productAddButton">Create</button>
               </Link>
            </div>
            <div className="productTop">
              <div className="productTopLeft">
               <Chart data={productData} dataKey="Sales" title="Sales Proformance"/>
              </div>
              <div className="productTopRight">
                <div className="productInfoTop">
                    <img src={products?.img}
                     alt="" className="productInfoImg" />
                     <span className="productInfoName">{products?.title}</span>
                </div>
                 <div className="productInfoBotton">
                    <div className="productInfoItems">
                      <span className="productInfoKey" >id:</span>
                      <span className="productInfoValue" >{products?._id}</span>
                    </div>
                    <div className="productInfoItems">
                      <span className="productInfoKey" >Sales:</span>
                      <span className="productInfoValue" >5123</span>
                    </div>
                    <div className="productInfoItems">
                      <span className="productInfoKey" >In Stock:</span>
                      <span className="productInfoValue" >{products?.inStock}</span>
                    </div>
                 </div>
              </div>
            </div>
             <div className="productBottom">
                <form className="productForm">
                 <div className="productFormLeft">
                   <label>Product Name</label>
                   <input type="text" placeholder={products?.title}/>
                   <label>Product Discription</label>
                   <input type="text" placeholder={products?.desc}/>
                   <label>Product Price</label>
                   <input type="text" placeholder={products?.price}/>
                    <label>In Stock</label>
                    <select name="InStock" id="InStock">
                       <option value="true">yes</option>
                       <option value="false">no</option>
                    </select>
                    
                 </div>
                <div className="productFormRight">
                  <div className="productUpload">
                     <img src={products?.img} 
                     alt="" className="productUploadImg"/>
                     <label for="file">
                      <Publish/>
                     </label> 
                     <input type="file" id="file" style={{display: "none"}}/>
                  </div>
                  <button className="productBotton">Update</button>
                </div>
                </form>
             </div>
        </div>
    )
}
