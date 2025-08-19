import React from 'react'
import { Skeleton } from './ui/skeleton'

const ProductCardSkeleton = () => {
    return (
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                <div className="block relative overflow-hidden">
                    <Skeleton className="w-full aspect-[4/3]" />
                </div>
                <div className="p-4 space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-16" />
                </div>
            </div>
        </div>
    )
}

export default ProductCardSkeleton
