import React, { Suspense } from 'react'
import LoadingSpinner from './LoadingSpinner'

const StreamingWrapper = ({ 
    children, 
    fallback = <LoadingSpinner size="large" className="py-20" />,
    className = ""
}) => {
    return (
        <div className={className}>
            <Suspense fallback={fallback}>
                {children}
            </Suspense>
        </div>
    )
}

export default StreamingWrapper
