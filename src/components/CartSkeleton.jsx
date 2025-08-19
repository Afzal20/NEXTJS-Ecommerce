import React from 'react'
import { Skeleton } from './ui/skeleton'

const CartSkeleton = () => {
    return (
        <section className="py-14 md:py-24 bg-background text-foreground relative overflow-hidden z-10">
            <div className="container px-4 mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-32" />
                </div>
                
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Cart Items */}
                    <div className="bg-card rounded-xl w-full lg:w-2/3">
                        {[...Array(3)].map((_, index) => (
                            <div key={index}>
                                {index > 0 && <hr className="my-4 border-border" />}
                                <div className="flex flex-col md:flex-row items-start p-2 md:p-6 mb-4">
                                    {/* Product Image */}
                                    <div className="w-full lg:max-w-[150px] rounded-xl mr-4 md:mr-6 mb-4 lg:mb-0">
                                        <Skeleton className="w-full h-24 rounded-xl" />
                                    </div>
                                    
                                    <div className="flex flex-1 justify-between">
                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <Skeleton className="h-5 w-48 mb-4" />
                                            <div>
                                                <Skeleton className="h-6 w-20 mb-4" />
                                                {/* Quantity Field */}
                                                <Skeleton className="h-10 w-36 rounded-full" />
                                            </div>
                                        </div>
                                        {/* Delete Button */}
                                        <div className="ml-4">
                                            <Skeleton className="w-10 h-10 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Order Summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-card rounded-xl flex flex-col gap-6 p-4 md:p-6 sticky top-4">
                            <div>
                                <Skeleton className="h-5 w-32 mb-6" />
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-4 w-16" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                    <hr className="border-border" />
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <hr className="border-border" />
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-4 w-12" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <hr className="border-border" />
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-5 w-12" />
                                        <Skeleton className="h-5 w-20" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Skeleton className="w-full h-12 rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CartSkeleton
