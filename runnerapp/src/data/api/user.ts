import axios, { AxiosResponse } from 'axios';

// Define the base URL for your API
const BASE_URL = process.env.API_URL
// Define your API endpoints
const API_ENDPOINTS = {
    getUsers: '/users',
    getUser: '/users/{id}',
    createUser: '/users',
    updateUser: '/users/{id}',
    deleteUser: '/users/{id}',
};



// Define your API functions
export const getUsers = async (): Promise<AxiosResponse> => {
    
    try {
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.getUsers}`);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getUser = async (id: string): Promise<AxiosResponse> => {
    try {
        const response = await axios.get(`${BASE_URL}${API_ENDPOINTS.getUser.replace('{id}', id)}`);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const createUser = async (userData: any): Promise<AxiosResponse> => {
    try {
        const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.createUser}`, userData);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const updateUser = async (id: string, userData: any): Promise<AxiosResponse> => {
    try {
        const response = await axios.put(`${BASE_URL}${API_ENDPOINTS.updateUser.replace('{id}', id)}`, userData);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const deleteUser = async (id: string): Promise<AxiosResponse> => {
    try {
        const response = await axios.delete(`${BASE_URL}${API_ENDPOINTS.deleteUser.replace('{id}', id)}`);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};