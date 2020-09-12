import { MODULE } from './types';

import {
    addModule as add,
    getModules as get,
    getModuleById as getById,
    updateModuleById as updateById,
    deleteModuleById as deleteById,
} from '../../api';

export const cleanStoreModule = () => async (dispatch) => {
    dispatch({ type: MODULE.CLEAR });
}

export const addModule = (body) => async (dispatch) => {
    dispatch({ type: MODULE.ADD });
    try {
        const response = await add(body);
        dispatch({ type: MODULE.ADD, payload: { response } });
    } catch (error) {
        dispatch({ type: MODULE.ADD, payload: { error } });
    }
}

export const getModules = (query = {}) => async (dispatch) => {
    dispatch({ type: MODULE.GET });
    try {
        const response = await get(query);
        dispatch({ type: MODULE.GET, payload: { response } });
    } catch (error) {
        dispatch({ type: MODULE.GET, payload: { error } });
    }
}

export const getModuleById = (id) => async (dispatch) => {
    dispatch({ type: MODULE.GET_BY_ID });
    try {
        const response = await getById(id);
        dispatch({ type: MODULE.GET_BY_ID, payload: { response } });
    } catch (error) {
        dispatch({ type: MODULE.GET_BY_ID, payload: { error } });
    }
}

export const updateModuleById = (id, data) => async (dispatch) => {
    dispatch({ type: MODULE.UPDATE_BY_ID });
    try {
        const response = await updateById(id, data);
        dispatch({ type: MODULE.UPDATE_BY_ID, payload: { response } });
    } catch (error) {
        dispatch({ type: MODULE.UPDATE_BY_ID, payload: { error } });
    }
}

export const deleteModuleById = (id, cb) => async (dispatch) => {
    dispatch({ type: MODULE.DELETE_BY_ID });
    try {
        const response = await deleteById(id);
        dispatch({ type: MODULE.DELETE_BY_ID, payload: { response } });
        if(cb) {
            cb();
        }
    } catch (error) {
        dispatch({ type: MODULE.DELETE_BY_ID, payload: { error } });
    }
}
