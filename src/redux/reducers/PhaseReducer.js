import { PHASE } from '../actions/types';

const initialState = {
    phases: [],
    phase: null,
    adding: false,
    getting: false,
    updating: false,
    deleting: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PHASE.ADD:
            return add(state, action.payload);
        case PHASE.GET:
            return get(state, action.payload);
        case PHASE.GET_BY_ID:
            return getById(state, action.payload);
        case PHASE.UPDATE_BY_ID:
            return updateById(state, action.payload);
        case PHASE.DELETE_BY_ID:
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
        return { ...state, getting: false, phases: payload.response.data };
    }
    return { ...state, getting: true, error: null };
}

function getById(state, payload) {
    if (payload) {
        if (payload.error) {
            return { ...state, getting: false, error: payload.error };
        }
        return { ...state, getting: false, phase: payload.response.data };
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
