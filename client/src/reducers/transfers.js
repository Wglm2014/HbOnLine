import { POST_TRANSFERS, GET_TRANSFER, GET_TRANSFERS, TRANSFERS_ERROR, CLEAR_TRANSFERS, DELETE_TRANSFERS } from "../actions/types";

const initialState = {
    Transfer: null,
    Transfers: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case POST_TRANSFERS:
        case GET_TRANSFER:
            return {
                ...state,
                Transfer: payload,
                loading: false
            }
        case GET_TRANSFERS:
            //console.log(state);
            //console.log(state.movements);
            return {
                ...state,
                Transfers: payload,
                loading: false
            }
        case TRANSFERS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_TRANSFERS:
            return {
                ...state,
                Transfer: null,
                Transfers: [],
                loading: true,
                error: {}
            }
        case DELETE_TRANSFERS:
            return {
                ...state,
                Transfers: payload,
                loading: false
            }
        default:
            return state;
    }
}