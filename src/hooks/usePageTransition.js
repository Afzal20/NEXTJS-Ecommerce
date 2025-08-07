"use client"

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export const usePageTransition = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        let progressInterval

        const startLoading = () => {
            setIsLoading(true)
            setLoadingProgress(0)
            
            // Simulate loading progress
            progressInterval = setInterval(() => {
                setLoadingProgress(prev => {
                    if (prev >= 90) return prev
                    return prev + Math.random() * 30
                })
            }, 100)
        }

        const stopLoading = () => {
            setLoadingProgress(100)
            setTimeout(() => {
                setIsLoading(false)
                setLoadingProgress(0)
            }, 200)
            
            if (progressInterval) {
                clearInterval(progressInterval)
            }
        }

        // Start loading when pathname changes
        startLoading()
        
        // Simulate data loading delay
        const timer = setTimeout(() => {
            stopLoading()
        }, 1000 + Math.random() * 1000) // Random delay 1-2 seconds

        return () => {
            clearTimeout(timer)
            if (progressInterval) {
                clearInterval(progressInterval)
            }
        }
    }, [pathname])

    return { isLoading, loadingProgress }
}

export const useInstantNavigation = () => {
    const router = useRouter()

    const navigateTo = (path) => {
        // Immediate navigation - page changes instantly
        router.push(path)
    }

    return { navigateTo }
}
