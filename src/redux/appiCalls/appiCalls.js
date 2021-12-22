import { publicRequest } from "../../requestMethod";
import { loginFailed, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "../user/userReduce"


export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
     const res = await publicRequest.post("/auth/login", user);
     dispatch(loginSuccess(res.data));
        
    } catch (error) {
        dispatch(loginFailed());
    }
}

export const register = async (dispatch, user) => {
    dispatch(registerStart());

    try {
     const res = await publicRequest.post("/auth/register", user);
     dispatch(registerSuccess(res.data));
        
    } catch (error) {
        dispatch(registerFailure());
    }
}