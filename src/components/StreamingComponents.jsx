"use client"

import React, { Suspense } from 'react'
import LoadingSpinner from './LoadingSpinner'

// Higher-order component for creating streaming components
export const withStreaming = (Component, LoadingSkeleton) => {
    return function StreamingComponent(props) {
        return (
            <Suspense fallback={<LoadingSkeleton {...props} />}>
                <Component {...props} />
            </Suspense>
        )
    }
}

// Generic streaming data fetcher component
export const StreamingData = ({ 
    promise, 
    children, 
    fallback = <LoadingSpinner size="large" className="py-20" />,
    errorFallback = <div className="text-red-500 text-center py-20">Failed to load data</div>
}) => {
    const [data, setData] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        let isMounted = true

        promise
            .then((result) => {
                if (isMounted) {
                    setData(result)
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err)
                    setIsLoading(false)
                }
            })

        return () => {
            isMounted = false
        }
    }, [promise])

    if (isLoading) return fallback
    if (error) return errorFallback
    
    return children(data)
}

// Streaming list component for products, categories, etc.
export const StreamingList = ({ 
    items = [], 
    renderItem, 
    ItemSkeleton, 
    skeletonCount = 6,
    className = "",
    isLoading = false 
}) => {
    if (isLoading) {
        return (
            <div className={className}>
                {Array.from({ length: skeletonCount }, (_, index) => (
                    <ItemSkeleton key={`skeleton-${index}`} />
                ))}
            </div>
        )
    }

    return (
        <div className={className}>
            {items.map((item, index) => renderItem(item, index))}
        </div>
    )
}
