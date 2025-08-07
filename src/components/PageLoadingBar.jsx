"use client"

import React from 'react'
import { usePageTransition } from '@/hooks/usePageTransition'

const PageLoadingBar = () => {
    const { isLoading, loadingProgress } = usePageTransition()

    if (!isLoading) return null

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <div className="h-1 bg-blue-200">
                <div 
                    className="h-full bg-blue-600 transition-all duration-300 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                />
            </div>
        </div>
    )
}

export default PageLoadingBar
