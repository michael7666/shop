import "./productList.css";
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteproducts, getproducts } from "../../redux/apiCall";

export default function ProductList() {
   
    const dispatch = useDispatch();
    const products = useSelector(state =>state.product.products)


    useEffect(()=>{
        getproducts(dispatch)
    },[dispatch]);

    const handleDelete = (id) =>{
        deleteproducts(id, dispatch);
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'product', headerName: 'Product', width: 200, renderCell: (params) => {
            return(
                <div className="productListUser">
                    <img className="productListImg" src={params.row.img} alt="" />
                    {params.row.title}
                </div>
            )
        } },
        { field: 'inStock', headerName: 'Stock', width: 200 },
       
        {
          field: 'price',
          headerName: 'Price',
          width: 190,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 190,
            renderCell: (params) =>{
                return(
                    <>
                    <Link to={"/product/" + params.row._id}>
                        <button className="productListEdit">Edit</button>
                    </Link>
                    <DeleteOutline className="productListDelete" onClick={()=>handleDelete(params.row._id)}/>
                    </>
                 
                )
            }
          },
      ];
    return (
        <div className="productList">
          <DataGrid
        rows={products}
        columns={columns}
        getRowId={row=> row._id}
        disableSelectionOnClick
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
        </div>
    )
}
