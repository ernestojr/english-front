import QueryString from 'query-string';
import API from './axios';

export const addPractice = (data) => {
    return API.post('/practices', data);
}

export const getPractices = (query) => {
    return API.get(`/practices?${QueryString.stringify(query)}`);
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
