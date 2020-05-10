import { PHASE } from './types';

import {
    addPhase as add,
    getPhases as get,
    getPhaseById as getById,
    updatePhaseById as updateById,
    deletePhaseById as deleteById,
} from '../../api/phase';

export const addPhase = (body) => async (dispatch) => {
    dispatch({ type: PHASE.ADD });
    try {
        const response = await add(body);
        dispatch({ type: PHASE.ADD, payload: { response } });
    } catch (error) {
        dispatch({ type: PHASE.ADD, payload: { error } });
    }
}

export const getPhases = (query = {}) => async (dispatch) => {
    dispatch({ type: PHASE.GET });
    try {
        const response = await get(query);
        dispatch({ type: PHASE.GET, payload: { response } });
    } catch (error) {
        dispatch({ type: PHASE.GET, payload: { error } });
    }
}

export const getPhaseById = (id) => async (dispatch) => {
    dispatch({ type: PHASE.GET_BY_ID });
    try {
        const response = await getById(id);
        dispatch({ type: PHASE.GET_BY_ID, payload: { response } });
    } catch (error) {
        dispatch({ type: PHASE.GET_BY_ID, payload: { error } });
    }
}

export const updatePhaseById = (id, data) => async (dispatch) => {
    dispatch({ type: PHASE.UPDATE_BY_ID });
    try {
        const response = await updateById(id, data);
        dispatch({ type: PHASE.UPDATE_BY_ID, payload: { response } });
    } catch (error) {
        dispatch({ type: PHASE.UPDATE_BY_ID, payload: { error } });
    }
}

export const deletePhaseById = (id, cb) => async (dispatch) => {
    dispatch({ type: PHASE.DELETE_BY_ID });
    try {
        const response = await deleteById(id);
        dispatch({ type: PHASE.DELETE_BY_ID, payload: { response } });
        if(cb) {
            cb();
        }
    } catch (error) {
        dispatch({ type: PHASE.DELETE_BY_ID, payload: { error } });
    }
}
