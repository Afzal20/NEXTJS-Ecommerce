import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://127.0.0.1:8000';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Orders and Checkout API
export const checkoutApi = {
    // Create new order
    createOrder: async (orderData) => {
        try {
            const response = await apiClient.post('/shop/orders/', orderData);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    // Get districts for shipping
    getDistricts: async () => {
        try {
            const response = await apiClient.get('/shop/districts/');
            return response.data;
        } catch (error) {
            console.error('Error fetching districts:', error);
            throw error;
        }
    },

    // Process payment (if you have payment endpoints)
    processPayment: async (paymentData) => {
        try {
            const response = await apiClient.post('/shop/payments/', paymentData);
            return response.data;
        } catch (error) {
            console.error('Error processing payment:', error);
            throw error;
        }
    },

    // Get user's billing addresses
    getBillingAddresses: async () => {
        try {
            const response = await apiClient.get('/shop/billing-addresses/');
            return response.data;
        } catch (error) {
            console.error('Error fetching billing addresses:', error);
            throw error;
        }
    },

    // Create billing address
    createBillingAddress: async (addressData) => {
        try {
            const response = await apiClient.post('/shop/billing-addresses/', addressData);
            return response.data;
        } catch (error) {
            console.error('Error creating billing address:', error);
            throw error;
        }
    }
};
