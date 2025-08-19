import React from 'react'
import ProductsCard from '@/components/ProductsCard'

const SearchContent = () => {
    const productArray = Array.from({ length: 10 }, (_, index) => index + 1);
    
    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl font-bold text-center mt-10'>Search Results</h1>
            <p className='text-lg text-center mt-4'>Explore the products matching your search criteria.</p>
            <section className="text-gray-400">
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
    return <SearchContent />
}

export default page