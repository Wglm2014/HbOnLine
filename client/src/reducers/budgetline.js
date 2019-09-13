import { POST_BUDGET_LINE, GET_BUDGET_LINE, GET_BUDGET_LINES, BUDGET_LINE_ERROR, CLEAR_BUDGET_LINE, DELETE_BUDGET_LINE, SET_ID_BUDGET } from "../actions/types";

const initialState = {
    idBudgetLine: null,
    BudgetLine: null,
    budgetLines: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_ID_BUDGET:
            return {
                ...state,
                idBudgetLine: payload,
                loading: false
            }
        case POST_BUDGET_LINE:
        case GET_BUDGET_LINE:
            return {
                ...state,
                budgetLine: payload,
                loading: false
            }
        case GET_BUDGET_LINES:
            console.log(state);
            console.log(state.budgetLines);
            return {
                ...state,
                budgetLines: payload,
                loading: false
            }
        case BUDGET_LINE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_BUDGET_LINE:
            return {
                ...state,
                budgetLine: null,
                budgetLines: [],
                loading: true,
                error: {}
            }
        case DELETE_BUDGET_LINE:
            return {
                ...state,
                budgetLine: payload,
                loading: false
            }
        default:
            return state;
    }
}

