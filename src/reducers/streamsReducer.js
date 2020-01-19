import {STREAM_CREATE, STREAM_DELETE, STREAM_FETCH, STREAM_EDIT, STREAMS_FETCH} from "../actions/actionTypes";
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case STREAM_CREATE:
        case STREAM_EDIT:
        case STREAM_FETCH:
            return {...state, [action.payload.id]: action.payload};

        case STREAM_DELETE:
            return _.omit(state, action.payload);

        case STREAMS_FETCH:
            return {...state, ..._.mapKeys(action.payload, 'id')};

        default:
            return state;
    }
}