import { WORD } from './types';

import {
    addWord as add,
    getWords as get,
    getWordById as getById,
    updateWordById as updateById,
    deleteWordById as deleteById,
    practice,
} from '../../api';

export const cleanStoreWord = () => async (dispatch) => {
    dispatch({ type: WORD.CLEAR });
}

export const addWord = (body) => async (dispatch) => {
    dispatch({ type: WORD.ADD });
    try {
        const response = await add(body);
        dispatch({ type: WORD.ADD, payload: { response } });
    } catch (error) {
        dispatch({ type: WORD.ADD, payload: { error } });
    }
}

export const getWords = (query = {}) => async (dispatch) => {
    dispatch({ type: WORD.GET });
    try {
        const response = await get(query);
        dispatch({ type: WORD.GET, payload: { response } });
    } catch (error) {
        dispatch({ type: WORD.GET, payload: { error } });
    }
}

export const getWordById = (id) => async (dispatch) => {
    dispatch({ type: WORD.GET_BY_ID });
    try {
        const response = await getById(id);
        dispatch({ type: WORD.GET_BY_ID, payload: { response } });
    } catch (error) {
        dispatch({ type: WORD.GET_BY_ID, payload: { error } });
    }
}

export const updateWordById = (id, data) => async (dispatch) => {
    dispatch({ type: WORD.UPDATE_BY_ID });
    try {
        const response = await updateById(id, data);
        dispatch({ type: WORD.UPDATE_BY_ID, payload: { response } });
    } catch (error) {
        dispatch({ type: WORD.UPDATE_BY_ID, payload: { error } });
    }
}

export const deleteWordById = (id, cb) => async (dispatch) => {
    dispatch({ type: WORD.DELETE_BY_ID });
    try {
        const response = await deleteById(id);
        dispatch({ type: WORD.DELETE_BY_ID, payload: { response } });
        if(cb) {
            cb();
        }
    } catch (error) {
        dispatch({ type: WORD.DELETE_BY_ID, payload: { error } });
    }
}

export const wordPractice = (count = 1, cb) => async (dispatch) => {
    dispatch({ type: WORD.PRACTICE });
    try {
        const response = await practice(count);
        dispatch({ type: WORD.PRACTICE, payload: { response } });
        if(cb) {
            cb(response.data);
        }
    } catch (error) {
        dispatch({ type: WORD.PRACTICE, payload: { error } });
    }
}
