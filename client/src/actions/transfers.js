import axios from "axios";
import { setAlert } from "./alert";

import { GET_TRANSFER, GET_TRANSFERS, TRANSFERS_ERROR, POST_TRANSFERS, DELETE_TRANSFERS } from "./types";

export const getTransfers = (id) => async dispatch => {
    if (id) {
        try {
            const res = await axios.get("/api/transfers/" + id);
            dispatch(
                {
                    type: GET_TRANSFERS,
                    payload: res.data
                });
        } catch (err) {
            dispatch({
                type: TRANSFERS_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });

        }
    } else {
        try {
            const res = await axios.get("/api/transfers");
            //console.log("axios");
            // console.log(res.data);
            dispatch(
                {
                    type: GET_TRANSFERSS,
                    payload: res.data
                });
        } catch (err) {
            dispatch({
                type: TRANSFERS_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
}

export const postTransfers = (data) => async dispatch => {
    try {
        const res = await axios.post("/api/transfers", data);

        dispatch({
            type: POST_TRANSFERS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
    }
}

export const deleteTransfers = (id) => async dispatch => {
    try {
        console.log(id);
        const res = await axios.delete("/api/transfers/" + id);
        console.log(res.data)
        dispatch({
            type: DELETE_TRANSFERS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
    }
}