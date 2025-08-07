"use client"

import { useState, useEffect } from 'react'

export const useLoading = (initialState = false) => {
    const [isLoading, setIsLoading] = useState(initialState)
    
    const startLoading = () => setIsLoading(true)
    const stopLoading = () => setIsLoading(false)
    
    return {
        isLoading,
        startLoading,
        stopLoading,
        setIsLoading
    }
}

export const useAsyncOperation = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    
    const execute = async (asyncFunction) => {
        try {
            setIsLoading(true)
            setError(null)
            const result = await asyncFunction()
            setData(result)
            return result
        } catch (err) {
            setError(err)
            throw err
        } finally {
            setIsLoading(false)
        }
    }
    
    return {
        isLoading,
        error,
        data,
        execute
    }
}

export const useStreamingData = (fetchFunction, dependencies = []) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        let isMounted = true
        
        const fetchData = async () => {
            try {
                setIsLoading(true)
                setError(null)
                const result = await fetchFunction()
                
                if (isMounted) {
                    setData(result)
                }
            } catch (err) {
                if (isMounted) {
                    setError(err)
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }
        
        fetchData()
        
        return () => {
            isMounted = false
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies, fetchFunction])
    
    return { data, isLoading, error }
}
