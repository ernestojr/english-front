import QueryString from 'query-string';
import API from './axios';
import { PAGINATION_LIMIT } from '../constants/api';

export const addPractice = (data) => {
    return API.post('/practices', data);
}

export const getPractices = (query) => {
    return API.get(`/practices?${QueryString.stringify({limit: PAGINATION_LIMIT, ...query})}`);
}

export const getPracticeById = (id) => {
    return API.get(`/practices/${id}`);
}

export const updatePracticeById = (id, data) => {
    return API.put(`/practices/${id}`, data);
}

export const deletePracticeById = (id) => {
    return API.delete(`/practices/${id}`);
}
