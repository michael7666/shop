import { publicRequest, userRequest } from "../requestMethod";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
import {  loginFailed, loginStart, loginSuccess } from "./userRedux";
import {deleteUserFailed, deleteUserStart, deleteUserSuccess,
    getUserFailed, getUserStart, getUserSuccess,} from "./usersRedux";


export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
     const res = await publicRequest.post("/auth/login", user);
     dispatch(loginSuccess(res.data));
        
    } catch (error) {
        dispatch(loginFailed());
    }
}
//get users
export const getUsers = async (dispatch, user, id) => {
    dispatch(getUserStart());

    try {
     const res = await userRequest.get(`/users`);
     dispatch(getUserSuccess(res.data));
        
    } catch (error) {
        dispatch(getUserFailed());
    }
}

//delete user
export const deleteUsers = async (id, dispatch) => {
    dispatch(deleteUserStart());

    try {
     const res = await userRequest.delete(`/users/${id}`);
     dispatch(deleteUserSuccess(res.data));
        
    } catch (error) {
        dispatch(deleteUserFailed());
    }
}


export const getproducts = async (dispatch) => {
    dispatch(getProductStart());

    try {
     const res = await publicRequest.get("/products");
     dispatch(getProductSuccess(res.data));
        
    } catch (error) {
        dispatch(getProductFailure());
    }
}

export const deleteproducts = async (id, dispatch) => {
    dispatch(deleteProductStart());

    try {
     const res = await userRequest.delete(`/products/${id}`);
     dispatch(deleteProductSuccess(res.data));
        
    } catch (error) {
        dispatch(deleteProductFailure());
    }
}

export const updateproducts = async (id, product, dispatch) => {
    dispatch(updateProductStart());

    try {
     const res = await userRequest.put(`/products/${id}`, product);
     dispatch(updateProductSuccess(res.data));
        
    } catch (error) {
        dispatch(updateProductFailure());
    }
}

export const addproducts = async ( product, dispatch) => {
    dispatch(addProductStart());

    try {
     const res = await userRequest.post("/products",product);
     dispatch(addProductSuccess(res.data));
        
    } catch (error) {
        dispatch(addProductFailure());
    }
}