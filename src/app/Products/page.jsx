'use client'
import React, { Suspense } from 'react'
import ProductsCard from '@/components/ProductsCard'
import ProductGridSkeleton from '@/components/ProductGridSkeleton'
import { StreamingList } from '@/components/StreamingComponents'
import ProductCardSkeleton from '@/components/ProductCardSkeleton'
import InstantPageWrapper from '@/components/InstantPageWrapper'
import { getProducts } from '@/lib/api'

// Products component with streaming data
const ProductsList = () => {
    const [products, setProducts] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                setError(null)
                const productsData = await getProducts()
                setProducts(productsData)
            } catch (err) {
                setError('Failed to load products')
                console.error('Error fetching products:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500 mb-4">{error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        )
    }

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