import QueryString from 'query-string';
import API from './axios';
import { PAGINATION_LIMIT } from '../constants/api';

export const addModule = (data) => {
    return API.post('/modules', data);
}

export const getModules = (query) => {
    return API.get(`/modules?${QueryString.stringify({limit: PAGINATION_LIMIT, ...query})}`);
}

export const getModuleById = (id) => {
    return API.get(`/modules/${id}`);
}

export const updateModuleById = (id, data) => {
    return API.put(`/modules/${id}`, data);
}

export const deleteModuleById = (id) => {
    return API.delete(`/modules/${id}`);
}
