import { POST_MOVEMENTS, GET_MOVEMENT, GET_MOVEMENTS, MOVEMENTS_ERROR, CLEAR_MOVEMENTS, DELETE_MOVEMENTS } from "../actions/types";

const initialState = {
    Movement: null,
    Movements: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case POST_MOVEMENTS:
        case GET_MOVEMENT:
            return {
                ...state,
                Movement: payload,
                loading: false
            }
        case GET_MOVEMENTS:
            //console.log(state);
            //console.log(state.Movements);
            return {
                ...state,
                Movements: payload,
                loading: false
            }
        case MOVEMENTS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_MOVEMENTS:
            return {
                ...state,
                Movement: null,
                Movements: [],
                loading: true,
                error: {}
            }
        case DELETE_MOVEMENTS:
            console.log("payload");
            console.log(payload);
            return {
                ...state,
                Movements: payload,
                loading: false
            }
        default:
            return state;
    }
}

