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
                        {productArray.map((product, index) => (
                            <ProductsCard 
                                key={product} 
                                product={{
                                    id: index + 300, // dummy id for search results
                                    thumbnail: "https://dummyimage.com/428x268",
                                    category: "Search Result",
                                    title: `Search Result ${index + 1}`,
                                    price: (Math.random() * 200 + 10).toFixed(2)
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
    return <SearchContent />
}

export default page