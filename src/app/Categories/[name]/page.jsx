import React, { Suspense } from 'react'
import ProductsCard from '@/components/ProductsCard'
import ProductGridSkeleton from '@/components/ProductGridSkeleton'

const CategoryContent = () => {
    const productArray = Array.from({ length: 20 }, (_, index) => index + 1);
    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl font-bold text-center mt-10'>Product Name</h1>
            <section className="text-muted-foreground ml-[50px] mr-[50px]">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {productArray.map((product) => (
                            <ProductsCard key={product} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

const page = () => {
    return (
        <Suspense fallback={<ProductGridSkeleton count={20} />}>
            <CategoryContent />
        </Suspense>
    )
}

export default page
