import {SIGN_IN, SIGN_OUT} from "./actionTypes";
import {STREAM_CREATE, STREAM_DELETE, STREAM_FETCH, STREAM_EDIT, STREAMS_FETCH} from "../actions/actionTypes";

import streams from "../apis/streams";
import history from "../history";

export const signIn = userId => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = (formValues) => async (dispatch, getState) => {
    const response = await streams.post('/streams',
        {
            ...formValues,
            userId: getState().auth.userId
        });

    dispatch({
        type: STREAM_CREATE,
        payload: response.data
    });

    history.push('/');
};

export const fetchStreams = () => async dispatch  => {
    const response = await streams.get('/streams');

    dispatch({
       type: STREAMS_FETCH,
       payload: response.data
    });
};

export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/stream/${id}`);

    dispatch({
        type: STREAM_FETCH,
        payload: response.data
    })
};

export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/delete/${id}`);

    dispatch({
        type: STREAM_DELETE,
        payload: id
    })
};

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.put(`/streams/${id}`, formValues);

    dispatch({
        type: STREAM_EDIT,
        payload: response.data
    })
};