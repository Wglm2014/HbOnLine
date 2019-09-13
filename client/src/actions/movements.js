import axios from "axios";
import { setAlert } from "./alert";

import { GET_MOVEMENTS, MOVEMENTS_ERROR, POST_MOVEMENTS, DELETE_MOVEMENTS } from "./types";

export const getMovements = (id) => async dispatch => {
    if (id) {
        try {
            const res = await axios.get("/api/movements/" + id);
            dispatch(
                {
                    type: GET_MOVEMENTS,
                    payload: res.data
                });
        } catch (err) {
            dispatch({
                type: MOVEMENTS_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });

        }
    } else {
        try {
            const res = await axios.get("/api/movements");
            //console.log("axios");
            // console.log(res.data);
            dispatch(
                {
                    type: GET_MOVEMENTS,
                    payload: res.data
                });
        } catch (err) {
            dispatch({
                type: MOVEMENTS_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
}

export const postMovements = (data) => async dispatch => {
    try {
        const res = await axios.post("/api/movements", data);

        dispatch({
            type: POST_MOVEMENTS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
    }
}

export const deleteMovements = (id) => async dispatch => {
    try {
        //alert("before delete");
        //alert(id);
        const res = await axios.delete("/api/movements/" + id);
        //alert("after delete");
        //console.log(res.data);

        dispatch({
            type: DELETE_MOVEMENTS,
            payload: res.data[1]
        });
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
    }
}