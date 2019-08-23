import axios from "axios";
import { setAlert } from "./alert";

import { GET_BUDGET_LINE, BUDGET_LINE_ERROR } from "./types";

export const getBudgetLine = () => async dispatch => {
    try {
        const res = await axios.get("/api/budgetline");

        dispatch({
            type: GET_BUDGET_LINE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: BUDGET_LINE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}