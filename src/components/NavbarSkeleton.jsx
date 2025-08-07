import React from 'react'
import { Skeleton } from './ui/skeleton'

const NavbarSkeleton = () => {
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="ml-3 h-6 w-32" />
                </div>
                <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
                    <Skeleton className="mr-5 h-4 w-16" />
                    <Skeleton className="mr-5 h-4 w-20" />
                    <Skeleton className="mr-5 h-4 w-18" />
                    <Skeleton className="mr-5 h-4 w-14" />
                </nav>
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-20 rounded" />
                </div>
            </div>
        </header>
    )
}

export default NavbarSkeleton
