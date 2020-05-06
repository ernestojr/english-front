import { PRACTICE } from '../actions/types';

const initialState = {
    practices: [],
    practice: null,
    adding: false,
    getting: false,
    updating: false,
    deleting: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PRACTICE.ADD:
            return add(state, action.payload);
        case PRACTICE.GET:
            return get(state, action.payload);
        case PRACTICE.GET_BY_ID:
            return getById(state, action.payload);
        case PRACTICE.UPDATE_BY_ID:
            return updateById(state, action.payload);
        case PRACTICE.DELETE_BY_ID:
            return deleteById(state, action.payload);
        default:
            return state;
    }
};

function add(state, payload) {
    if (payload) {
        if (payload.error) {
            return { ...state, adding: false, error: payload.error };
        }
        return { ...state, adding: false };
    }
    return { ...state, adding: true, error: null };
}

function get(state, payload) {
    if (payload) {
        if (payload.error) {
            return { ...state, getting: false, error: payload.error };
        }
        console.log('payload.response.data', payload.response.data);
        return { ...state, getting: false, practices: payload.response.data };
    }
    return { ...state, getting: true, error: null };
}

function getById(state, payload) {
    if (payload) {
        if (payload.error) {
            return { ...state, getting: false, error: payload.error };
        }
        return { ...state, getting: false, practice: payload.response.data };
    }
    return { ...state, getting: true, error: null };
}

function updateById(state, payload) {
    if (payload) {
        if (payload.error) {
            return { ...state, updating: false, error: payload.error };
        }
        return { ...state, updating: false };
    }
    return { ...state, updating: true, error: null };
}

function deleteById(state, payload) {
    if (payload) {
        if (payload.error) {
            return { ...state, deleting: false, error: payload.error };
        }
        return { ...state, deleting: false };
    }
    return { ...state, deleting: true, error: null };
}
