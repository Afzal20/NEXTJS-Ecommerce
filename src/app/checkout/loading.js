import React from 'react'

export default function CheckoutLoading() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse mb-8">
                    <div className="h-8 bg-gray-200 rounded w-48"></div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Checkout Form Skeleton */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="animate-pulse space-y-6">
                            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
                            
                            {/* Form fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-12 bg-gray-200 rounded"></div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                            </div>
                            <div className="h-12 bg-gray-200 rounded"></div>
                            <div className="h-12 bg-gray-200 rounded"></div>
                            <div className="h-12 bg-gray-200 rounded"></div>
                            
                            <div className="h-6 bg-gray-200 rounded w-32 mt-8 mb-4"></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-12 bg-gray-200 rounded"></div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                            </div>
                            <div className="h-12 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                    
                    {/* Order Summary Skeleton */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="animate-pulse">
                            <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
                            
                            {/* Order items */}
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="flex items-center space-x-4 py-4 border-b">
                                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                                </div>
                            ))}
                            
                            {/* Order totals */}
                            <div className="mt-6 space-y-3">
                                <div className="flex justify-between">
                                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                                </div>
                                <div className="flex justify-between border-t pt-3">
                                    <div className="h-5 bg-gray-200 rounded w-12"></div>
                                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                                </div>
                            </div>
                            
                            <div className="h-12 bg-gray-200 rounded w-full mt-6"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
