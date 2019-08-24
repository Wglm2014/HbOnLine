import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, CLEAR_BUDGET } from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setauthtoken";
//load user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get("/api/auth");
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//register user
export const register = ({ name, email, password }) => async dispatch => {

    const body = { name, email, password };

    try {
        const res = await axios.post("/api/users", body);
        console.log(res.data);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        console.log(err);
        //dispatch(setAlert(err, "danger"));
        dispatch({
            type: REGISTER_FAIL
        });
    }
}
//login user
export const login = ({ email, password }) => async dispatch => {
    const body = { email, password };

    try {
        const res = await axios.post("/api/auth", body);
        console.log(res.data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        console.log(err);
        //dispatch(setAlert(err, "danger"));
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

//logout / clear profile
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT,
    });
    dispatch({
        type: CLEAR_BUDGET,
    });
}