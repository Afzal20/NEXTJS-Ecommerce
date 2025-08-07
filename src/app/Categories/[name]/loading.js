import React from 'react'
import ProductGridSkeleton from '@/components/ProductGridSkeleton'

export default function CategoryLoading() {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center space-x-2 mb-6">
                    <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
                
                {/* Category header skeleton */}
                <div className="animate-pulse mb-8">
                    <div className="h-10 bg-gray-200 rounded w-48 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-80 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-64"></div>
                </div>
                
                {/* Sort and filter skeleton */}
                <div className="flex items-center justify-between mb-6">
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="flex space-x-4">
                        <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
                        <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </div>
                </div>
                
                <ProductGridSkeleton count={12} />
            </div>
        </div>
    )
}
