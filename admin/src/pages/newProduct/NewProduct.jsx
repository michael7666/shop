import { useState } from "react"
import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import { addproducts } from "../../redux/apiCall";


export default function NewProduct() {
  const [input, setInput] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

const handleChange = (e) =>{
 setInput(prev=>{
   return {...prev, [e.target.name]: e.target.value}
 })
}

const handleCates = (e) =>{
 setCat(e.target.value.split(","));
}

const handleClick = (e) =>{
   e.preventDefault();
   const fileName = new Date().getTime() + file.name;
   const storage = getStorage(app);
   const StorageRef = ref(storage, fileName);
   const uploadTask = uploadBytesResumable(StorageRef, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;
        default: 
     }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const product = {...input, img:downloadURL, categories:cat};
      addproducts(product, dispatch)
    });
  }
);
}


    return (
        <div className="newProduct">
           <h1 className="newProductTitle">New Product</h1>
           <form className="newProductForm" >
             <div className="newProductItem">
               <label className="newProductImg">Image</label>
               <input type="file" id="file" onChange={(e)=>setFile(e.target.files[0])}/>
             </div>
             <div className="newProductItem">
               <label>Title</label>
               <input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange}/>
             </div>
            <div className="newProductItem">
               <label>Description</label>
               <input name="desc" type="text" placeholder="description" onChange={handleChange}/>
             </div>
             <div className="newProductItem">
               <label>Price</label>
               <input name="price" type="number" placeholder="100" onChange={handleChange}/>
             </div> 
             <div className="newProductItem">
               <label>Categories</label>
               <input type="text" placeholder="shirt,jeans " onChange={handleCates}/>
             </div>
             <div className="newProductItem">
               <label>Stock</label>
               <select name="inStock"  onChange={handleChange}>
                       <option value="true">yes</option>
                       <option value="false">no</option>
                  </select>
             </div>
             <button onClick={handleClick} className="newProductButton">Create</button>
           </form>
        </div>
    )
}
