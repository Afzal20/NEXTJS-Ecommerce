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

    useEffect(() => {
        if (isLoading) {
            // Show skeleton after a small delay to avoid flash
            const timer = setTimeout(() => {
                setShowSkeleton(true)
            }, loadingDelay)

            return () => clearTimeout(timer)
        } else {
            setShowSkeleton(false)
        }
    }, [isLoading, loadingDelay])

    return (
        <div className={className}>
            {showSkeleton ? loadingSkeleton : children}
        </div>
    )
}

export default InstantPageWrapper
