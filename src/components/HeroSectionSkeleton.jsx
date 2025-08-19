import React from 'react'
import { Skeleton } from './ui/skeleton'

const HeroSectionSkeleton = () => {
    return (
        <div className="overflow-hidden relative w-full">
            {/* Main slide skeleton */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-muted py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full">
                {/* Content section */}
                <div className="md:pl-8 mt-10 md:mt-0">
                    <Skeleton className="h-4 w-48 mb-2" />
                    <Skeleton className="h-12 w-96 mb-6" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-10 w-28 rounded-full" />
                        <Skeleton className="h-10 w-32 rounded" />
                    </div>
                </div>
                {/* Image section */}
                <div className="flex items-center flex-1 justify-center">
                    <Skeleton className="md:w-72 w-48 h-40 rounded" />
                </div>
            </div>

            {/* Carousel dots skeleton */}
            <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: 3 }, (_, index) => (
                    <Skeleton key={index} className="h-2 w-2 rounded-full" />
                ))}
            </div>
        </div>
    )
}

export default HeroSectionSkeleton
