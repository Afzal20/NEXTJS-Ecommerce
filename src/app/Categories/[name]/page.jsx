import React from 'react'
import ProductsCard from '@/components/ProductsCard'

const CategoryContent = () => {
    const productArray = Array.from({ length: 20 }, (_, index) => index + 1);
    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl font-bold text-center mt-10'>Product Name</h1>
            <section className="text-muted-foreground ml-[50px] mr-[50px]">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {productArray.map((product, index) => (
                            <ProductsCard 
                                key={product} 
                                product={{
                                    id: index + 200, // dummy id for category products
                                    thumbnail: "https://dummyimage.com/428x268",
                                    category: "Category Product",
                                    title: `Category Product ${index + 1}`,
                                    price: ((index * 17 + 33) % 150 + 25).toFixed(2) // deterministic price based on index
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

const page = () => {
    return <CategoryContent />
}

export default page
