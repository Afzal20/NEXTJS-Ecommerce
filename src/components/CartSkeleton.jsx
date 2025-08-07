import React from 'react'
import { Skeleton } from './ui/skeleton'

const CartSkeleton = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-8 w-48 mb-8" />
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="lg:w-2/3">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex items-center border-b border-gray-200 py-6">
                            <Skeleton className="w-24 h-24 rounded" />
                            <div className="ml-4 flex-1">
                                <Skeleton className="h-5 w-48 mb-2" />
                                <Skeleton className="h-4 w-32 mb-2" />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Skeleton className="w-8 h-8 rounded" />
                                        <Skeleton className="w-12 h-6" />
                                        <Skeleton className="w-8 h-8 rounded" />
                                    </div>
                                    <Skeleton className="h-5 w-16" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-gray-50 rounded-lg p-6">
                        <Skeleton className="h-6 w-32 mb-4" />
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-12" />
                            </div>
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-12" />
                            </div>
                            <div className="border-t pt-3">
                                <div className="flex justify-between">
                                    <Skeleton className="h-5 w-12" />
                                    <Skeleton className="h-5 w-16" />
                                </div>
                            </div>
                        </div>
                        <Skeleton className="w-full h-12 mt-6 rounded" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartSkeleton
