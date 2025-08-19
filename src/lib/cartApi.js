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

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Cart API Error:', error);
        return Promise.reject(error);
    }
);

// Cart API Functions
export const cartApi = {
    // Get all cart items
    getCartItems: async () => {
        try {
            const response = await apiClient.get('/shop/cart/');
            return response.data;
        } catch (error) {
            console.error('Error fetching cart items:', error);
            throw error;
        }
    },

    // Add item to cart
    addToCart: async (cartData) => {
        try {
            const response = await apiClient.post('/shop/cart/add/', cartData);
            return response.data;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    },

    // Remove item from cart
    removeFromCart: async (itemId) => {
        try {
            const response = await apiClient.delete(`/shop/cart/remove/${itemId}/`);
            return response.data;
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        }
    },

    // Update cart item quantity
    updateCartQuantity: async (itemId, quantity) => {
        try {
            const response = await apiClient.patch(`/shop/cart/update/${itemId}/`, {
                quantity: quantity
            });
            return response.data;
        } catch (error) {
            console.error('Error updating cart quantity:', error);
            throw error;
        }
    },

    // Get cart summary (total, count, etc.)
    getCartSummary: async () => {
        try {
            const cartItems = await cartApi.getCartItems();
            const subtotal = cartItems.reduce((total, item) => {
                return total + (parseFloat(item.price) * item.quantity);
            }, 0);
            
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            const shippingFee = 99; // Static shipping fee
            const tax = Math.round(subtotal * 0.08); // 8% tax
            const total = subtotal + shippingFee + tax;

            return {
                items: cartItems,
                subtotal,
                shippingFee,
                tax,
                total,
                totalItems
            };
        } catch (error) {
            console.error('Error getting cart summary:', error);
            throw error;
        }
    }
};
