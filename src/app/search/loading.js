import React from 'react'
import ProductGridSkeleton from '@/components/ProductGridSkeleton'

export default function SearchLoading() {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Search header skeleton */}
                <div className="animate-pulse mb-8">
                    <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                </div>
                
                {/* Search filters skeleton */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded w-28 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded w-36 animate-pulse"></div>
                </div>
                
                <ProductGridSkeleton count={8} />
            </div>
        </div>
    )
}
