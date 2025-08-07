import React from 'react'
import ProductGridSkeleton from '@/components/ProductGridSkeleton'

export default function CategoriesLoading() {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse mb-8">
                    <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-96"></div>
                </div>
                
                {/* Category Filter Skeleton */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="h-8 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                    ))}
                </div>
                
                <ProductGridSkeleton count={9} />
            </div>
        </div>
    )
}
