import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';


export const useLogin = async (email, password) => {
    try{
        const response = await axios.post(`${API_URL}/accounts/user/login/`, {email, password}, 
            {withCredentials: true})
        return response.data; 
    }
    catch(e){
        return e;
    }
}

export const useRegister = async (email, password) => {
    try{
        const response = await axios.post(`${API_URL}/accounts/user/register/`, {email, password}, 
            {withCredentials: true})
        return response.data; 
    }
    catch(e){
        return e;
    }
}

export const useLogout = () => {}
