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
