import React from 'react'
import ProductGridSkeleton from '@/components/ProductGridSkeleton'

export default function ProductsLoading() {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
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
