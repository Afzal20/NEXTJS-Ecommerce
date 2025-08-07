"use client"

import React, { Suspense } from 'react'
import ProductsCard from '@/components/ProductsCard'
import ProductGridSkeleton from '@/components/ProductGridSkeleton'
import { StreamingList } from '@/components/StreamingComponents'
import ProductCardSkeleton from '@/components/ProductCardSkeleton'
import InstantPageWrapper from '@/components/InstantPageWrapper'
import { usePageTransition } from '@/hooks/usePageTransition'

// Simulate async data fetching
const fetchProducts = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    return Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        image: `https://dummyimage.com/428x268?text=Product+${index + 1}`,
        category: `Category ${(index % 5) + 1}`,
        title: `Product ${index + 1}`,
        price: `$${(Math.random() * 100 + 10).toFixed(2)}`
    }))
}

// Products component with streaming data
const ProductsList = () => {
    const [products, setProducts] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        fetchProducts().then((data) => {
            setProducts(data)
            setIsLoading(false)
        })
    }, [])

    return (
        <StreamingList
            items={products}
            isLoading={isLoading}
            skeletonCount={20}
            ItemSkeleton={ProductCardSkeleton}
            className="flex flex-wrap -m-4"
            renderItem={(product, index) => (
                <ProductsCard 
                    key={product.id} 
                    product={product}
                    onClick={() => console.log('Product clicked:', product)}
                />
            )}
        />
    )
}

const page = () => {
    return (
        <InstantPageWrapper 
            loadingSkeleton={<ProductGridSkeleton count={20} />}
            loadingDelay={300}
        >
            <section className="text-muted-foreground ml-[50px] mr-[50px]">
                <div className="container px-5 py-24 mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-foreground mb-2">All Products</h1>
                        <p className="text-muted-foreground">Discover our amazing collection of products</p>
                    </div>
                    
                    <ProductsList />
                </div>
            </section>
        </InstantPageWrapper>
    )
}

export default page