"use client"

import React, { useState, useEffect } from 'react'
import { usePageTransition } from '@/hooks/usePageTransition'

const InstantPageWrapper = ({ 
    children, 
    loadingSkeleton, 
    loadingDelay = 0,
    className = "" 
}) => {
    const { isLoading } = usePageTransition()
    const [showSkeleton, setShowSkeleton] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    // Ensure we're on the client side to avoid hydration mismatch
    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isMounted) return // Don't show skeleton during SSR
        
        if (isLoading) {
            // Show skeleton after a small delay to avoid flash
            const timer = setTimeout(() => {
                setShowSkeleton(true)
            }, loadingDelay)

            return () => clearTimeout(timer)
        } else {
            setShowSkeleton(false)
        }
    }, [isLoading, loadingDelay, isMounted])

    // Always show children during SSR and initial client render
    if (!isMounted) {
        return (
            <div className={className}>
                {children}
            </div>
        )
    }

    return (
        <div className={className}>
            {showSkeleton ? loadingSkeleton : children}
        </div>
    )
}

export default InstantPageWrapper
