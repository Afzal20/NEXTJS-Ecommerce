import React from 'react'
import { Skeleton } from './ui/skeleton'

const HeaderSliderSkeleton = () => {
    return (
        <div className="overflow-hidden relative background" style={{ height: "350px" }}>
            {/* Main slide skeleton */}
            <div className="absolute top-0 left-0 w-full h-full">
                <Skeleton className="w-full h-full rounded-sm" />
            </div>

            {/* Navigation dots skeleton */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {Array.from({ length: 3 }, (_, index) => (
                    <Skeleton key={index} className="w-3 h-3 rounded-full" />
                ))}
            </div>
        </div>
    )
}

export default HeaderSliderSkeleton
