import { MODULE } from '../actions/types';
import {
    HEADER_PAGINATION_LIMIT,
    HEADER_PAGINATION_PAGE,
    HEADER_PAGINATION_TOTAL_COUNT,
} from '../../constants/api';

const initialState = {
    page: 1,
    count: 0,
    limit: 0,
    modules: [],
    module: null,
    adding: false,
    getting: false,
    updating: false,
    deleting: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case MODULE.ADD:
            return add(state, action.payload);
        case MODULE.GET:
            return get(state, action.payload);
        case MODULE.GET_BY_ID:
            return getById(state, action.payload);
        case MODULE.UPDATE_BY_ID:
            return updateById(state, action.payload);
        case MODULE.DELETE_BY_ID:
            return deleteById(state, action.payload);
        case MODULE.CLEAR:
            return initialState;
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
        const { headers, data } = payload.response;
        return {
            ...state,
            getting: false,
            limit: headers[HEADER_PAGINATION_LIMIT],
            page: headers[HEADER_PAGINATION_PAGE],
            count: headers[HEADER_PAGINATION_TOTAL_COUNT],
            modules: data,
        };
    }
    return { ...state, getting: true, error: null };
}

function getById(state, payload) {
    if (payload) {
        if (payload.error) {
            return { ...state, getting: false, error: payload.error };
        }
        return { ...state, getting: false, module: payload.response.data };
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
