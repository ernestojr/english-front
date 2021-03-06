import QueryString from 'query-string';
import API from './axios';
import { PAGINATION_LIMIT } from '../constants/api';

export const addPhase = (data) => {
    return API.post('/phases', data);
}

export const getPhases = (query) => {
    return API.get(`/phases?${QueryString.stringify({limit: PAGINATION_LIMIT, ...query})}`);
}

export const getPhaseById = (id) => {
    return API.get(`/phases/${id}`);
}

export const updatePhaseById = (id, data) => {
    return API.put(`/phases/${id}`, data);
}

export const deletePhaseById = (id) => {
    return API.delete(`/phases/${id}`);
}
