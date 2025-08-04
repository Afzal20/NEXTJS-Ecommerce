import React from 'react'
import ProductsCard from '@/components/ProductsCard'

const page = () => {
   const productArray = Array.from({ length: 20 }, (_, index) => index + 1);

    return (
        <section className="text-muted-foreground ml-[50px] mr-[50px]">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {productArray.map((product) => (
                        <ProductsCard key={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default page