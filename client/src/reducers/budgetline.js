import { POST_BUDGET_LINE, GET_BUDGET_LINE, BUDGET_LINE_ERROR, CLEAR_BUDGET } from "../actions/types";

const initialState = {
    budgetLine: null,
    budgeLines: [],
    repos: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_BUDGET_LINE:
            return {
                ...state,
                budgetLine: payload,
                loading: false
            }
        case POST_BUDGET_LINE:
            return {
                ...state,
                budgetLine: payload,
                loading: false
            }
        case BUDGET_LINE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_BUDGET:
            return {
                ...state,
                budgetLine: null
            }
        default:
            return state;
    }
}

