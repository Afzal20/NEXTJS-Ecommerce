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
        const response = await apiClient.get('/shop/products/');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
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


export const getTopSellingProducts = async () => {
    try {
        const response = await apiClient.get(`/shop/top-selling-products/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching top selling products:', error);
        throw error;
    }
};


export const getTopCategories = async () => {
    try {
        const response = await apiClient.get('/shop/top-categories/');
        return response.data;
    } catch (error) {
        console.error('Error fetching top categories:', error);
        throw error;
    }
}


export const getCategory = async (categoryId) => {
    try {
        const response = await apiClient.get(`/shop/categories/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        throw error;
    }
}

export const postGetInTouch = async (name, email, message) => {
    /**DRF API Docs
        {
        "email": "user@example.com",
        "subject": "string",
        "details": "string",
        "status": "Pending"
        }

        URL: /shop/contact/

        Response body: 
        {
        "message": "Message sent successfully!"
        }
     */
    try {
        const response = await apiClient.post('/shop/contact/', {
            email: email,
            subject: `Message from ${name}`,
            details: message,
            status: "Pending"
        });
        return response.data;
    } catch (error) {
        console.error('Error posting get in touch:', error);
        throw error;
    }
};


export const getSlider = async () => {
    try {
        const response = await apiClient.get('/shop/sliders/');
        return response.data;
    } catch (error) {
        console.error('Error fetching slider:', error);
        throw error;
    }
};

export const getHeroSections = async () => {
    try {
        const response = await apiClient.get('/shop/hero-sections/');
        return response.data;
    } catch (error) {
        console.error('Error fetching hero sections:', error);
        throw error;
    }
};


export const verifyAccessToken = async (accessToken) => {
    try {
        const response = await apiClient.get('/accounts/token/verify-access/', { headers: { Authorization: `Bearer ${accessToken}` } });
        return response.data;
    } catch (error) {
        console.error('Error verifying access token:', error);
        throw error;
    }
};

export const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await apiClient.post('/accounts/token/refresh/', { 
            refresh: refreshToken 
        });
        return response.data;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
};

export const getUserProfile = async (accessToken) => {
    try {
        const response = await apiClient.get('/accounts/user/profile/', { 
            headers: { Authorization: `Bearer ${accessToken}` } 
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const updateUserProfile = async (accessToken, profileData) => {
    try {
        const response = await apiClient.patch('/accounts/user/profile/', profileData, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

export const updateUserProfileWithImage = async (accessToken, formData) => {
    try {
        const response = await apiClient.patch('/accounts/user/profile/', formData, {
            headers: { 
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user profile with image:', error);
        throw error;
    }
};

// Helper function to make authenticated API calls with automatic token refresh
export const makeAuthenticatedRequest = async (requestFunc, getValidAccessToken) => {
    try {
        const accessToken = await getValidAccessToken()
        return await requestFunc(accessToken)
    } catch (error) {
        console.error('Authenticated request failed:', error)
        throw error
    }
}

// Categories API
export const getCategoriesApi = {
    // Get all categories
    getAll: async () => {
        try {
            const response = await apiClient.get('/shop/categories/');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    // Get featured categories
    getFeatured: async () => {
        try {
            const response = await apiClient.get('/shop/categories/featured/');
            return response.data;
        } catch (error) {
            console.error('Error fetching featured categories:', error);
            throw error;
        }
    },

    // Get products by category
    getProductsByCategory: async (categorySlug) => {
        try {
            const response = await apiClient.get(`/shop/categories/${categorySlug}/products/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching category products:', error);
            throw error;
        }
    }
};

// Orders API
export const ordersApi = {
    // Get user orders
    getUserOrders: async () => {
        try {
            const response = await apiClient.get('/shop/orders/');
            return response.data;
        } catch (error) {
            console.error('Error fetching user orders:', error);
            throw error;
        }
    },

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

    // Get order by ID
    getOrderById: async (orderId) => {
        try {
            const response = await apiClient.get(`/shop/orders/${orderId}/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching order:', error);
            throw error;
        }
    }
};

// Products API Enhancement
export const productsApi = {
    // Get all products with pagination
    getAll: async (page = 1, pageSize = 12) => {
        try {
            const response = await apiClient.get(`/shop/products/?page=${page}&page_size=${pageSize}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    // Search products
    search: async (query, page = 1) => {
        try {
            const response = await apiClient.get(`/shop/products/?search=${encodeURIComponent(query)}&page=${page}`);
            return response.data;
        } catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    },

    // Get product reviews
    getReviews: async (productId) => {
        try {
            const response = await apiClient.get(`/shop/products/${productId}/reviews/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product reviews:', error);
            throw error;
        }
    },

    // Add product review
    addReview: async (productId, reviewData) => {
        try {
            const response = await apiClient.post(`/shop/products/${productId}/reviews/`, reviewData);
            return response.data;
        } catch (error) {
            console.error('Error adding product review:', error);
            throw error;
        }
    }
};

// Districts API (for shipping addresses)
export const getDistricts = async () => {
    try {
        const response = await apiClient.get('/shop/districts/');
        return response.data;
    } catch (error) {
        console.error('Error fetching districts:', error);
        throw error;
    }
};