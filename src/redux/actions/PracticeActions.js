import { PRACTICE } from './types';

import {
    addPractice as add,
    getPractices as get,
    getPracticeById as getById,
    updatePracticeById as updateById,
    deletePracticeById as deleteById,
} from '../../api/practice';

export const addPractice = (body) => async (dispatch) => {
    dispatch({ type: PRACTICE.ADD });
    try {
        const response = await add(body);
        dispatch({ type: PRACTICE.ADD, payload: { response } });
    } catch (error) {
        dispatch({ type: PRACTICE.ADD, payload: { error } });
    }
}

export const getPractices = (query = {}) => async (dispatch) => {
    dispatch({ type: PRACTICE.GET });
    try {
        const response = await get(query);
        dispatch({ type: PRACTICE.GET, payload: { response } });
    } catch (error) {
        dispatch({ type: PRACTICE.GET, payload: { error } });
    }
}

export const getPracticeById = (id) => async (dispatch) => {
    dispatch({ type: PRACTICE.GET_BY_ID });
    try {
        const response = await getById(id);
        dispatch({ type: PRACTICE.GET_BY_ID, payload: { response } });
    } catch (error) {
        dispatch({ type: PRACTICE.GET_BY_ID, payload: { error } });
    }
}

export const updatePracticeById = (id, data) => async (dispatch) => {
    dispatch({ type: PRACTICE.UPDATE_BY_ID });
    try {
        const response = await updateById(id, data);
        dispatch({ type: PRACTICE.UPDATE_BY_ID, payload: { response } });
    } catch (error) {
        dispatch({ type: PRACTICE.UPDATE_BY_ID, payload: { error } });
    }
}

export const deletePracticeById = (id) => async (dispatch) => {
    dispatch({ type: PRACTICE.DELETE_BY_ID });
    try {
        const response = await deleteById(id);
        dispatch({ type: PRACTICE.DELETE_BY_ID, payload: { response } });
    } catch (error) {
        dispatch({ type: PRACTICE.DELETE_BY_ID, payload: { error } });
    }
}
