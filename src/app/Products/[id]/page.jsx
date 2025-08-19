"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaStar } from 'react-icons/fa';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { GoArrowRight } from 'react-icons/go';
import ProductsCard from '@/components/ProductsCard';
import { assets } from "@/assets/assets";
import Image from 'next/image';
import ProductDetailSkeleton from '@/components/ProductDetailSkeleton';
import { getProductById } from '@/lib/api';
import useCartStore from '@/hooks/useCartStore';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/Toast';


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
    const params = useParams();
    const { isAuthenticated } = useAuth();
    const { addToCart, addToLocalCart, isLoading: cartLoading } = useCartStore();
    const { toast } = useToast();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeProduct, setActiveProduct] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        if (params.id) {
            fetchProduct();
        }
    }, [params.id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const data = await getProductById(params.id);
            setProduct(data);
        } catch (err) {
            setError('Failed to load product');
            console.error('Error fetching product:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!product) return;

        try {
            if (isAuthenticated) {
                await addToCart(product, quantity);
                toast.success('Product added to cart!');
            } else {
                addToLocalCart(product, quantity);
                toast.success('Product added to cart!');
            }
        } catch (error) {
            toast.error('Failed to add product to cart');
            console.error('Add to cart error:', error);
        }
    };

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

    if (loading) {
        return <ProductDetailSkeleton />;
    }

    if (error || !product) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                <p className="text-gray-600">{error || 'Product not found'}</p>
            </div>
        );
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
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-500"><FaStar /></span>
                            ))}
                            <span className='text-lg font-archivo text-foreground font-semibold ml-2'>
                                ({product.reviews?.length || 0} reviews)
                            </span>
                        </div>
                        <h1 className='text-4xl text-foreground font-archivo font-bold capitalize leading-tight'>
                            {product.title || product.name}
                        </h1>
                        <p className='text-4xl text-primary font-archivo font-bold'>
                            ${parseFloat(product.price || 0).toFixed(2)}
                        </p>
                        <p className='text-lg text-muted-foreground font-archivo font-normal leading-relaxed'>
                            {product.description || product.product_description || 'No description available.'}
                        </p>

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

                            <button 
                                type='button' 
                                onClick={handleAddToCart}
                                disabled={cartLoading}
                                className='w-full sm:w-auto px-8 h-14 rounded-full bg-primary hover:bg-primary/90 text-lg text-primary-foreground font-archivo font-semibold capitalize cursor-pointer flex justify-center items-center gap-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {cartLoading ? 'Adding...' : 'add to cart'} <GoArrowRight size={'1.2rem'} />
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
                                {products.map((product, index) => (
                                    <ProductsCard 
                                        key={index} 
                                        product={{
                                            id: index + 100, // dummy id for now
                                            thumbnail: product.image,
                                            category: "Electronics",
                                            title: `Related Product ${index + 1}`,
                                            price: (Math.random() * 100 + 50).toFixed(2)
                                        }}
                                    />
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