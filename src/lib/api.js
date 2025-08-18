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