import axios from "axios";
//import { setAlert } from "./alert";

import { GET_BUDGET_LINE, BUDGET_LINE_ERROR, POST_BUDGET_LINE } from "./types";

export const getBudgetLine = () => async dispatch => {
    try {
        const res = await axios.get("/api/budgetline");
        dispatch({
            type: GET_BUDGET_LINE,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: BUDGET_LINE_ERROR,
            payload: { msg: err }
        });
    }
}

export const postBudgetLine = (formData, history) => async dispatch => {
    try {
        const res = await axios.post("/api/budgetline", formData);
        dispatch({
            type: POST_BUDGET_LINE,
            payload: res.data
        });

    } catch (err) {
        console.log(err);
        dispatch({
            type: BUDGET_LINE_ERROR,
            payload: { msg: err }
        });
    }
}