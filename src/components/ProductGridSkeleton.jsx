import React from 'react'
import ProductCardSkeleton from './ProductCardSkeleton'

const ProductGridSkeleton = ({ count = 8 }) => {
    return (
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
                {Array.from({ length: count }, (_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        </div>
    )
}

export default ProductGridSkeleton
