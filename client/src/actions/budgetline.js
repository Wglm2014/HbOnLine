import axios from "axios";
import { setAlert } from "./alert";

import { GET_BUDGET_LINE, GET_BUDGET_LINES, BUDGET_LINE_ERROR, POST_BUDGET_LINE, DELETE_BUDGET_LINE, SET_ID_BUDGET, PUT_BUDGET_LINE } from "./types";



export const setIdBudget = (id) => async dispatch => {
    try {
        //console.log("got here");
        dispatch({
            type: SET_ID_BUDGET,
            payload: id
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
        console.log("error here")
    }
}


export const getBudgetLine = (id) => async dispatch => {
    if (id) {
        try {
            const res = await axios.get("/api/budgetline/" + id);
            console.log(res.data);
            dispatch(
                {
                    type: GET_BUDGET_LINE,
                    payload: res.data[0]
                });
        } catch (err) {
            alert(err.TypeErro);
            dispatch({
                type: BUDGET_LINE_ERROR,
                payload: { msg: err.response.data, status: err.response.status }
            });

        }
    } else {
        try {
            const res = await axios.get("/api/budgetline");
            //console.log("axios");
            // console.log(res.data);
            dispatch(
                {
                    type: GET_BUDGET_LINES,
                    payload: res.data
                });
        } catch (err) {
            dispatch({
                type: BUDGET_LINE_ERROR,
                payload: { msg: err.response.data, status: err.response.status }
            });
        }
    }
}

export const postBudgetLine = (data) => async dispatch => {
    try {
        const res = await axios.post("/api/budgetline", data);
        //console.log(res);
        dispatch({
            type: POST_BUDGET_LINE,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
    }
}

export const deleteBudgetLine = (id) => async dispatch => {
    try {
        //console.log(id);
        const res = await axios.delete("/api/budgetlineputdel/" + id);
        //console.log(res.data)
        dispatch({
            type: DELETE_BUDGET_LINE,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
    }
}

export const updateBudgetLine = (data) => async dispatch => {
    try {
        const res = await axios.put("/api/budgetlineputdel/", data);
        dispatch({
            type: PUT_BUDGET_LINE,
            payload: res.data
        });

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
    }
}