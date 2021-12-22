import "./userlist.css"
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from "@material-ui/icons";
import { Link } from "react-router-dom";
import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUsers } from "../../redux/apiCall";

export default function UserList() {
   
    const dispatch = useDispatch();

    const users = useSelector(state=>state.user.users);
 

    useEffect(()=>{
        getUsers(dispatch)
    },[dispatch])



    const handleDelete = (id) =>{
        deleteUsers(id, dispatch);
    }
    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        { field: 'user', headerName: 'Username', width: 200, renderCell: (params) => {
            return(
                <div className="userListUser">
                    <img className="userListImg" src={params.row.avater} alt="" />
                    {params.row.userName}
                </div>
            )
        } },
        { field: 'email', headerName: 'Email', width: 200 },
        {
          field: 'status',
          headerName: 'Status',
          width: 190,
        },
        {
          field: 'transaction',
          headerName: 'Transaction',
          width: 190,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 190,
            renderCell: (params) =>{
                return(
                    <>
                    <Link to={"/user/" + params.row._id}>
                        <button className="userListEdit">Edit</button>
                    </Link>
                    <DeleteOutline className="userListDelete" onClick={()=>handleDelete(params.row._id)}/>
                    </>
                 
                )
            }
          },
      ];
      
    return (
        <div className="userList">
          <DataGrid
        rows={users}
        getRowId={row=> row._id}
        columns={columns}
        disableSelectionOnClick
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
        </div>
    )
}
