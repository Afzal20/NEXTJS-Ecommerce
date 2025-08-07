import React from 'react'
import { Skeleton } from './ui/skeleton'

const ProductDetailSkeleton = () => {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <Skeleton className="h-4 w-20 mb-4" />
                        <Skeleton className="h-8 w-80 mb-4" />
                        <div className="flex mb-4 space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="w-4 h-4" />
                            ))}
                            <Skeleton className="ml-2 h-4 w-16" />
                        </div>
                        <Skeleton className="h-20 w-full mb-6" />
                        <div className="flex border-t border-gray-200 py-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="ml-auto h-4 w-20" />
                        </div>
                        <div className="flex border-t border-gray-200 py-2">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="ml-auto h-4 w-16" />
                        </div>
                        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="ml-auto h-4 w-24" />
                        </div>
                        <div className="flex">
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="flex ml-auto h-10 w-32 rounded" />
                            <Skeleton className="rounded-full w-10 h-10 ml-4" />
                        </div>
                    </div>
                    <Skeleton className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" />
                </div>
            </div>
        </section>
    )
}

export default ProductDetailSkeleton
