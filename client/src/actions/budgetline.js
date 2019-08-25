import axios from "axios";
//import { setAlert } from "./alert";

import { GET_BUDGET_LINE, BUDGET_LINE_ERROR, POST_BUDGET_LINE, CLEAR_BUDGET } from "./types";

export const getBudgetLine = () => async dispatch => {
    try {
        const res = await axios.get("/api/budgetline");
        console.log(res);
        dispatch({
            type: GET_BUDGET_LINE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: BUDGET_LINE_ERROR,
            payload: { msg: err }
        });
    }
}

export const postBudgetLine = (formData, history) => async dispatch => {
    try {
        const res = await axios.post("/api/budgetline", formData);
        console.log(res);
        dispatch({
            type: POST_BUDGET_LINE,
            payload: res.data
        });
        dispatch({
            type: CLEAR_BUDGET,
        });
    } catch (err) {
        dispatch({
            type: BUDGET_LINE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}