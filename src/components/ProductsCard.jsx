"use client"

import React from 'react'
import { useLoading } from '@/hooks/useLoading'
import LoadingSpinner from './LoadingSpinner'

const ProductsCard = ({ 
    product = {
        thumbnail: "https://dummyimage.com/428x268",
        category: "CATEGORY",
        title: "The 400 Blows",
        price: "18.40"
    },
    isLoading = false,
    onClick,
    className = ""
}) => {
    const { isLoading: imageLoading, setIsLoading } = useLoading(true)

    const handleImageLoad = () => {
        setIsLoading(false)
    }

    const handleImageError = () => {
        setIsLoading(false)
    }

    // Format price to display with currency symbol
    const formatPrice = (price) => {
        if (!price) return '$0.00'
        const numPrice = typeof price === 'string' ? parseFloat(price) : price
        return `$${numPrice.toFixed(2)}`
    }

    // Get the product image (prioritize thumbnail, fallback to first image in array, then default)
    const getProductImage = () => {
        if (product.thumbnail) return product.thumbnail
        if (product.images && product.images.length > 0) return product.images[0].image_url
        return "https://dummyimage.com/428x268"
    }

    if (isLoading) {
        return (
            <div className={`lg:w-1/4 md:w-1/2 p-4 w-full ${className}`}>
                <div className="animate-pulse">
                    <div className="bg-gray-200 h-48 rounded"></div>
                    <div className="mt-4 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                        <div className="h-5 bg-gray-200 rounded w-32"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`lg:w-1/4 md:w-1/2 p-4 w-full ${className}`}>
            <a 
                className="block relative h-48 rounded overflow-hidden cursor-pointer hover:opacity-75 transition-opacity" 
                onClick={onClick}
            >
                {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <LoadingSpinner size="medium" />
                    </div>
                )}
                <img 
                    alt={product.title || "ecommerce product"} 
                    className={`object-cover object-center w-full h-full block transition-opacity ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                    src={getProductImage()} 
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            </a>
            <div className="mt-4">
                <h3 className="text-muted-foreground text-xs tracking-widest title-font mb-1 uppercase">
                    {product.category}
                </h3>
                <h2 className="text-foreground title-font text-lg font-medium hover:text-primary transition-colors cursor-pointer">
                    {product.title}
                </h2>
                <p className="mt-1 text-primary font-semibold">
                    {formatPrice(product.price)}
                </p>
                {product.discount_percentage > 0 && (
                    <p className="text-sm text-green-600">
                        {product.discount_percentage}% off
                    </p>
                )}
                {product.rating && (
                    <div className="flex items-center mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-muted-foreground ml-1">
                            {product.rating}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductsCard