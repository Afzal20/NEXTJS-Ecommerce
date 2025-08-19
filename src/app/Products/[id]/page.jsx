"use client";

import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { GoArrowRight } from 'react-icons/go';
import ProductsCard from '@/components/ProductsCard';
import { assets } from "@/assets/assets";
import Image from 'next/image';
import ProductDetailSkeleton from '@/components/ProductDetailSkeleton';


const products = [
    {
        image: assets.apple_earphone_image,
    },
    {
        image: assets.asus_laptop_image,
    },
    {
        image: assets.bose_headphone_image,
    },
    {
        image: assets.cannon_camera_image,
    },
]

const ProductDetailsCard = () => {

    const [activeProduct, setActiveProduct] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    // handle decrease 
    const decrease = () => {
        if (quantity > 1) {

            setQuantity(quantity - 1);
        }
    }
    // handle increase 
    const increase = () => {
        setQuantity(quantity + 1);
    }

    const RelatedProducts = Array.from({ length: 10 }, (_, index) => index + 1);

    return (
        <div className='w-full py-20 bg-background text-foreground'>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* product image wrapper  */}
                    <div className='flex items-start gap-6 max-w-[600px] w-full'>
                        <div className="flex flex-col gap-4">
                            {
                                products?.map((product, index) => (
                                    <div onClick={() => setActiveProduct(index)} key={index} className={`max-w-[120px] max-h-[120px] w-full h-full p-3 flex items-center justify-center border-2 rounded-xl cursor-pointer transition-all duration-200 ${index === activeProduct ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'}`}>
                                        <Image
                                            src={product.image}
                                            width={100}
                                            height={100}
                                            alt={`product_${index + 1}`}
                                            className='w-full h-full object-contain rounded-lg'
                                        />
                                    </div>
                                ))
                            }
                        </div>
                        <div className='flex-1 min-h-[500px] bg-muted/30 flex items-center justify-center rounded-2xl p-8'>
                            <Image
                                src={products[activeProduct].image}
                                width={500}
                                height={400}
                                alt="product image"
                                className='max-w-full max-h-full object-contain'
                            />
                        </div>
                    </div>

                    {/* product info wrapper  */}
                    <div className='flex flex-col gap-6 w-full'>

                        <div className="flex items-center gap-2">
                            <span className="text-yellow-500"><FaStar /></span>
                            <span className="text-yellow-500"><FaStar /></span>
                            <span className="text-yellow-500"><FaStar /></span>
                            <span className="text-yellow-500"><FaStar /></span>
                            <span className="text-yellow-500"><FaStar /></span>
                            <span className='text-lg font-archivo text-foreground font-semibold ml-2'>(4.9/5)</span>
                        </div>
                        <h1 className='text-4xl text-foreground font-archivo font-bold capitalize leading-tight'>classic vanilla ice cream</h1>
                        <p className='text-4xl text-primary font-archivo font-bold'>$5.99</p>
                        <p className='text-lg text-muted-foreground font-archivo font-normal leading-relaxed'>Neque porro reisquam est aui Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt, repellendus! Lorem ipsum dolor sit amet.</p>

                        <div className="flex flex-col gap-5">
                            <h4 className='text-xl text-foreground font-archivo font-bold'>color:</h4>
                            <div className="flex gap-3">
                                <span className='w-[32px] h-[32px] rounded-full border-[4px] border-border bg-red-600'></span>
                                <span className='w-[32px] h-[32px] rounded-full border-[4px] border-border bg-yellow-200'></span>
                                <span className='w-[32px] h-[32px] rounded-full border-[4px] border-border bg-green-300'></span>
                                <span className='w-[32px] h-[32px] rounded-full border-[4px] border-border bg-yellow-800'></span>
                            </div>
                        </div>
                        {/* sizes */}
                        <div className="flex flex-col gap-5 pb-8 border-b-2 border-border">
                            <h4 className='text-xl text-foreground font-archivo font-bold'>size:</h4>
                            <div className="flex gap-3">
                                <button className='w-[43px] h-[43px] rounded-full bg-none border-2 border-border flex items-center justify-center text-lg text-foreground font-archivo font-normal capitalize hover:border-primary'>L</button>
                                <button className='w-[43px] h-[43px] rounded-full bg-none border-2 border-border flex items-center justify-center text-lg text-foreground font-archivo font-normal capitalize hover:border-primary'>M</button>
                                <button className='w-[43px] h-[43px] rounded-full bg-none border-2 border-border flex items-center justify-center text-lg text-foreground font-archivo font-normal capitalize hover:border-primary'>S</button>
                            </div>
                        </div>


                        {/* add to cart wrapper  */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="flex items-center justify-between w-40 h-14 border border-border rounded-full px-4">

                                {/* decrease quantity  */}
                                <button onClick={decrease} className='flex items-center justify-center w-8 h-8 text-foreground hover:text-primary transition-colors'><FaMinus size={'1rem'} /></button>

                                <span className='text-xl text-foreground font-semibold'>{quantity}</span>

                                {/* increase quantity  */}
                                <button onClick={increase} className='flex items-center justify-center w-8 h-8 text-foreground hover:text-primary transition-colors'><FaPlus size={'1rem'} /></button>
                            </div>

                            <button type='submit' className='w-full sm:w-auto px-8 h-14 rounded-full bg-primary hover:bg-primary/90 text-lg text-primary-foreground font-archivo font-semibold capitalize cursor-pointer flex justify-center items-center gap-3 transition-all duration-200'>
                                add to cart <GoArrowRight size={'1.2rem'} />
                            </button>
                        </div>


                        <div className="flex items-center gap-8 mt-4">
                            <button className='text-lg text-muted-foreground font-archivo font-medium capitalize flex items-center justify-center gap-3 cursor-pointer hover:text-primary transition-colors'><FaRegHeart size={'1.2rem'} /> add to wishlist</button>
                            <button className='text-lg text-muted-foreground font-archivo font-medium capitalize cursor-pointer hover:text-primary transition-colors'>compare</button>
                        </div>


                    </div>
                </div>
                {/* tab container  */}

                <div className='mt-20'>
                    <div className="tabs tabs-border space-y-6">
                        {/* Tab Buttons */}
                        <div className="flex border-b border-border">
                            <button
                                className={`tab text-xl font-bold font-archivo capitalize px-4 py-2 ${activeTab === 'description'
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-muted-foreground'
                                    }`}
                                onClick={() => setActiveTab('description')}
                            >
                                Description
                            </button>

                            <button
                                className={`tab text-xl font-bold font-archivo capitalize px-4 py-2 ${activeTab === 'information'
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-muted-foreground'
                                    }`}
                                onClick={() => setActiveTab('information')}
                            >
                                Additional Information
                            </button>

                            <button
                                className={`tab text-xl font-bold font-archivo capitalize px-4 py-2 ${activeTab === 'reviews'
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-muted-foreground'
                                    }`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Reviews
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="py-8">
                            {activeTab === 'description' && (
                                <div className="space-y-6">
                                    <p className='text-base text-muted-foreground font-archivo font-normal normal-case leading-relaxed'>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto enim inventore, quisquam quos expedita saepe!
                                        Ducimus porro voluptates voluptas omnis laboriosam inventore nulla suscipit aliquid quidem voluptatum, veniam
                                        voluptatem hic aut quisquam eos expedita ab quis, delectus cumque rerum debitis? Lorem ipsum dolor sit, amet
                                        consectetur adipisicing elit. Quisquam repudiandae harum perspiciatis, ad eveniet placeat obcaecati ipsa
                                        voluptatum magnam a nam inventore eos quasi ex labore mollitia non optio consectetur.
                                    </p>
                                    <p className='text-base text-muted-foreground font-archivo font-normal normal-case leading-relaxed'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi repellat modi neque nisi sint corporis placeat
                                        quis natus dolores, amet repellendus dicta possimus adipisci expedita? Fugiat minus suscipit sed ut! Lorem ipsum
                                        dolor sit amet consectetur, adipisicing elit. Dicta quod voluptas minus ad ut eius doloribus dolorum eos, mollitia
                                        dignissimos repellendus necessitatibus esse fuga aperiam vitae sunt libero.
                                    </p>
                                </div>
                            )}

                            {activeTab === 'information' && (
                                <div className="space-y-6">
                                    <p className='text-base text-muted-foreground font-archivo font-normal normal-case leading-relaxed'>
                                        Additional product information goes here. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                        Iusto enim inventore, veniam voluptatem hic aut quisquam eos expedita ab quis, delectus cumque rerum debitis?
                                    </p>
                                    <p className='text-base text-muted-foreground font-archivo font-normal normal-case leading-relaxed'>
                                        More technical details about the product. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Eligendi repellat modi neque nisi sint corporis placeat quis natus dolores, amet repellendus dicta
                                        possimus adipisci expedita? Fugiat minus suscipit sed ut!
                                    </p>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="space-y-6">
                                    <p className='text-base text-muted-foreground font-archivo font-normal normal-case leading-relaxed'>
                                        Customer reviews will be displayed here. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                        Iusto enim inventore, quisquam quos expedita saepe! Ducimus porro voluptates voluptas omnis laboriosam
                                        inventore nulla suscipit aliquid quidem voluptatum.
                                    </p>
                                    <p className='text-base text-muted-foreground font-archivo font-normal normal-case leading-relaxed'>
                                        Review statistics and user feedback. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Eligendi repellat modi neque nisi sint corporis placeat quis natus dolores.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='pt-20'>

                    <div className="flex items-center justify-center gap-6 flex-col mb-12">
                        <h3 className='text-4xl text-foreground font-berkshire-heading font-normal capitalize'>Related <span className='text-primary'>Products</span></h3>
                        <p className='text-lg text-muted-foreground font-archivo font-normal'>Choose from some of related products</p>
                    </div>

                    {/* related products wrapper  */}
                    <section className="text-muted-foreground ml-[50px] mr-[50px]">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="flex flex-wrap -m-4">
                                {RelatedProducts.map((product) => (
                                    <ProductsCard key={product} />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

const ProductDetailsPage = () => {
    return <ProductDetailsCard />
};

export default ProductDetailsPage;