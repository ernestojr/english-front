import QueryString from 'query-string';
import API from './axios';
import { PAGINATION_LIMIT } from '../constants/api';

export const addWord = (data) => {
    return API.post('/words', data);
}

export const getWords = (query) => {
    return API.get(`/words?${QueryString.stringify({limit: PAGINATION_LIMIT, ...query})}`);
}

export const getWordById = (id) => {
    return API.get(`/words/${id}`);
}

export const updateWordById = (id, data) => {
    return API.put(`/words/${id}`, data);
}

export const deleteWordById = (id) => {
    return API.delete(`/words/${id}`);
}
