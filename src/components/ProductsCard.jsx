import React from 'react'

const ProductsCard = () => {
    return (
        <>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/428x268" />
                </a>
                <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                    <h2 className="text-white title-font text-lg font-medium">The 400 Blows</h2>
                    <p className="mt-1">$18.40</p>
                </div>
            </div>
        </>
    )
}

export default ProductsCard