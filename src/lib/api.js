import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);



export const useLogin = async (email, password) => {
    try{
        const response = await apiClient.post('/accounts/user/login/', {email, password}, 
            {withCredentials: true})
        return response.data; 
    }
    catch(e){
        return e;
    }
}

export const useRegister = async (email, password) => {
    try{
        const response = await apiClient.post('/accounts/user/register/', {email, password}, 
            {withCredentials: true})
        return response.data; 
    }
    catch(e){
        return e;
    }
}

export const useLogout = () => {
    // Remove Access token and refresh token from Cookies
}


export const getProducts = async () => {
    try {
        console.log('Fetching products from:', `${API_URL}/shop/products/`);
        const response = await apiClient.get('/shop/products/');
        console.log('Products response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        throw error;
    }
};

export const getProductById = async (productId) => {
    try {
        const response = await apiClient.get(`/shop/products/${productId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};
