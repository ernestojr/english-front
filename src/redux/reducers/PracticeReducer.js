import { PRACTICE } from '../actions/types';
import {
    HEADER_PAGINATION_LIMIT,
    HEADER_PAGINATION_PAGE,
    HEADER_PAGINATION_TOTAL_COUNT,
} from '../../constants/api';

const initialState = {
    page: 1,
    count: 0,
    limit: 0,
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
        case PRACTICE.CLEAR:
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
            practices: data,
        };
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
