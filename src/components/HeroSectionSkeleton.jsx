import React from 'react'
import { Skeleton } from './ui/skeleton'

const HeroSectionSkeleton = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <Skeleton className="h-8 w-80 mb-4" />
                    <Skeleton className="h-6 w-96 mb-2" />
                    <Skeleton className="h-4 w-72 mb-8" />
                    <div className="flex justify-center">
                        <Skeleton className="h-10 w-32 rounded" />
                        <Skeleton className="ml-4 h-10 w-32 rounded" />
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <Skeleton className="object-cover object-center rounded w-full h-80" />
                </div>
            </div>
        </section>
    )
}

export default HeroSectionSkeleton
