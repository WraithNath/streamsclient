import {SIGN_IN, SIGN_OUT} from "../actions/actionTypes";

const initState = {
    isSignedIn: null,
    userId: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                isSignedIn: true,
                userId: action.payload
            };

        case SIGN_OUT:
            return {
                ...state,
                isSignedIn: false,
                userId: null
            };

        default:
            return state;
    }
}