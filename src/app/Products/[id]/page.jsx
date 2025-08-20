"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaStar } from 'react-icons/fa';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { GoArrowRight } from 'react-icons/go';
import ProductsCard from '@/components/ProductsCard';
import Image from 'next/image';
import ProductDetailSkeleton from '@/components/ProductDetailSkeleton';
import { getProductById, getProducts } from '@/lib/api';
import useCartStore from '@/hooks/useCartStore';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/Toast';


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
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [relatedLoading, setRelatedLoading] = useState(false);

    useEffect(() => {
        if (params.id) {
            fetchProduct();
        }
    }, [params.id]);

    useEffect(() => {
        if (product) {
            fetchRelatedProducts();
        }
    }, [product]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const data = await getProductById(params.id);
            setProduct(data);
            // Remove or comment out console.log in production
            // console.log(data);
        } catch (err) {
            setError('Failed to load product');
            console.error('Error fetching product:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedProducts = async () => {
        try {
            setRelatedLoading(true);
            const allProducts = await getProducts();
            
            if (allProducts && allProducts.length > 0) {
                // Filter related products based on tags and category
                const filtered = allProducts.filter(item => {
                    // Exclude the current product
                    if (item.id === product.id) return false;
                    
                    // Check if categories match
                    const categoryMatch = item.category === product.category;
                    
                    // Check if any tags match
                    const tagMatch = product.tags && item.tags && 
                        product.tags.some(tag => item.tags.includes(tag));
                    
                    return categoryMatch || tagMatch;
                });

                // Sort by relevance (category match first, then tag matches)
                const sorted = filtered.sort((a, b) => {
                    const aCategoryMatch = a.category === product.category ? 1 : 0;
                    const bCategoryMatch = b.category === product.category ? 1 : 0;
                    
                    if (aCategoryMatch !== bCategoryMatch) {
                        return bCategoryMatch - aCategoryMatch;
                    }
                    
                    // Count tag matches for secondary sorting
                    const aTagMatches = product.tags && a.tags ? 
                        product.tags.filter(tag => a.tags.includes(tag)).length : 0;
                    const bTagMatches = product.tags && b.tags ? 
                        product.tags.filter(tag => b.tags.includes(tag)).length : 0;
                    
                    return bTagMatches - aTagMatches;
                });

                // Limit to 12 related products for better variety
                setRelatedProducts(sorted.slice(0, 12));
                console.log('Found related products:', sorted.length, 'showing:', sorted.slice(0, 12).length);
            } else {
                // If no related products found, get random products as fallback
                const randomProducts = allProducts
                    .filter(item => item.id !== product.id) // Exclude current product
                    .sort(() => 0.5 - Math.random()) // Shuffle array
                    .slice(0, 12); // Take 12 random products
                
                setRelatedProducts(randomProducts);
                console.log('No related products found, showing random products:', randomProducts.length);
            }
        } catch (err) {
            console.error('Error fetching related products:', err);
            setRelatedProducts([]);
        } finally {
            setRelatedLoading(false);
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
                                product?.images?.length > 0 ? (
                                    product.images.map((img, index) => (
                                        <div onClick={() => setActiveProduct(index)} key={index} className={`max-w-[120px] max-h-[120px] w-full h-full p-3 flex items-center justify-center border-2 rounded-xl cursor-pointer transition-all duration-200 ${index === activeProduct ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'}`}>
                                            <Image
                                                src={img.image || img}
                                                width={100}
                                                height={100}
                                                alt={`${product.title} image ${index + 1}`}
                                                className='w-full h-full object-contain rounded-lg'
                                            />
                                        </div>
                                    ))
                                ) : product?.thumbnail ? (
                                    <div className={`max-w-[120px] max-h-[120px] w-full h-full p-3 flex items-center justify-center border-2 rounded-xl cursor-pointer transition-all duration-200 border-primary shadow-md`}>
                                        <Image
                                            src={product.thumbnail}
                                            width={100}
                                            height={100}
                                            alt={product.title}
                                            className='w-full h-full object-contain rounded-lg'
                                        />
                                    </div>
                                ) : (
                                    products?.map((prod, index) => (
                                        <div onClick={() => setActiveProduct(index)} key={index} className={`max-w-[120px] max-h-[120px] w-full h-full p-3 flex items-center justify-center border-2 rounded-xl cursor-pointer transition-all duration-200 ${index === activeProduct ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'}`}>
                                            <Image
                                                src={prod.image}
                                                width={100}
                                                height={100}
                                                alt={`product_${index + 1}`}
                                                className='w-full h-full object-contain rounded-lg'
                                            />
                                        </div>
                                    ))
                                )
                            }
                        </div>
                        <div className='flex-1 min-h-[500px] bg-muted/30 flex items-center justify-center rounded-2xl p-8'>
                            <Image
                                src={
                                    product?.images?.length > 0
                                        ? (product.images[activeProduct]?.image || product.images[activeProduct] || product.thumbnail)
                                        : product?.thumbnail || products[activeProduct]?.image
                                }
                                width={500}
                                height={400}
                                alt={product?.title || "product image"}
                                className='max-w-full max-h-full object-contain'
                            />
                        </div>
                    </div>

                    {/* product info wrapper  */}
                    <div className='flex flex-col gap-6 w-full'>

                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={`${i < Math.floor(parseFloat(product.rating || 0)) ? 'text-yellow-500' : 'text-gray-300'}`}>
                                    <FaStar />
                                </span>
                            ))}
                            <span className='text-lg font-archivo text-foreground font-semibold ml-2'>
                                {product.rating ? parseFloat(product.rating).toFixed(1) : '0.0'} ({product.reviews?.length || 0} reviews)
                            </span>
                        </div>
                        <h1 className='text-4xl text-foreground font-archivo font-bold capitalize leading-tight'>
                            {product.title || product.name}
                        </h1>
                        <div className="flex items-center gap-4">
                            <p className='text-4xl text-primary font-archivo font-bold'>
                                ${parseFloat(product.price || 0).toFixed(2)}
                            </p>
                            {product.discount_percentage && parseFloat(product.discount_percentage) > 0 && (
                                <span className='text-lg text-red-500 font-archivo font-semibold'>
                                    {parseFloat(product.discount_percentage).toFixed(0)}% OFF
                                </span>
                            )}
                        </div>
                        <p className='text-lg text-muted-foreground font-archivo font-normal leading-relaxed'>
                            {product.description || product.product_description || 'No description available.'}
                        </p>

                        {/* Product Information */}
                        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg">
                            <div className="flex flex-col">
                                <span className="text-sm text-muted-foreground">SKU</span>
                                <span className="text-base font-semibold">{product.sku || 'N/A'}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-muted-foreground">Brand</span>
                                <span className="text-base font-semibold">{product.brand || 'N/A'}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-muted-foreground">Stock</span>
                                <span className={`text-base font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.availability_status || (product.stock > 0 ? 'In Stock' : 'Out of Stock')} ({product.stock || 0})
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-muted-foreground">Weight</span>
                                <span className="text-base font-semibold">{product.weight ? `${product.weight}g` : 'N/A'}</span>
                            </div>
                        </div>

                        {/* Tags */}
                        {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-col gap-3">
                                <h4 className='text-xl text-foreground font-archivo font-bold'>Tags:</h4>
                                <div className="flex gap-2 flex-wrap">
                                    {product.tags.map((tag, index) => (
                                        <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Colors - Only show if product has colors */}
                        {(product.colors && product.colors.length > 0) || (product.color && product.color.length > 0) ? (
                            <div className="flex flex-col gap-5">
                                <h4 className='text-xl text-foreground font-archivo font-bold'>color:</h4>
                                <div className="flex gap-3">
                                    {(product.colors || product.color || []).map((color, index) => (
                                        <span 
                                            key={index} 
                                            className='w-[32px] h-[32px] rounded-full border-[4px] border-border cursor-pointer hover:border-primary transition-colors'
                                            style={{ backgroundColor: color.value || color.hex || color }}
                                            title={color.name || color}
                                        ></span>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                        {/* Sizes - Only show if product has sizes */}
                        {(product.sizes && product.sizes.length > 0) || (product.size && product.size.length > 0) ? (
                            <div className="flex flex-col gap-5 pb-8 border-b-2 border-border">
                               <h4 className='text-xl text-foreground font-archivo font-bold'>size:</h4>
                                <div className="flex gap-3">
                                    {(product.sizes || product.size || []).map((size, index) => (
                                        <button 
                                            key={index}
                                            className='w-[43px] h-[43px] rounded-full bg-none border-2 border-border flex items-center justify-center text-lg text-foreground font-archivo font-normal capitalize hover:border-primary transition-colors'
                                        >
                                            {size.name || size.value || size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : null}


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
                                    <div className="bg-card border border-border rounded-lg p-6">
                                        <p className='text-base text-card-foreground font-archivo font-normal leading-relaxed'>
                                            {product.description || 'No description available.'}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {product.shipping_information && (
                                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                        </svg>
                                                    </div>
                                                    <h4 className="font-semibold text-primary text-sm">Shipping Information</h4>
                                                </div>
                                                <p className="text-muted-foreground text-sm leading-relaxed">{product.shipping_information}</p>
                                            </div>
                                        )}

                                        {product.return_policy && (
                                            <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                        </svg>
                                                    </div>
                                                    <h4 className="font-semibold text-secondary-foreground text-sm">Return Policy</h4>
                                                </div>
                                                <p className="text-muted-foreground text-sm leading-relaxed">{product.return_policy}</p>
                                            </div>
                                        )}

                                        {product.warranty_information && (
                                            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 className="font-semibold text-accent-foreground text-sm">Warranty Information</h4>
                                                </div>
                                                <p className="text-muted-foreground text-sm leading-relaxed">{product.warranty_information}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'information' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-lg font-semibold text-primary">Product Details</h4>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between py-2 border-b border-border/50">
                                                    <span className="text-muted-foreground font-medium">SKU:</span>
                                                    <span className="font-semibold text-card-foreground">{product.sku || 'N/A'}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-border/50">
                                                    <span className="text-muted-foreground font-medium">Brand:</span>
                                                    <span className="font-semibold text-card-foreground">{product.brand || 'N/A'}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-border/50">
                                                    <span className="text-muted-foreground font-medium">Barcode:</span>
                                                    <span className="font-semibold text-card-foreground">{product.barcode || 'N/A'}</span>
                                                </div>
                                                <div className="flex justify-between py-2">
                                                    <span className="text-muted-foreground font-medium">Min Order Qty:</span>
                                                    <span className="font-semibold text-card-foreground">{product.minimum_order_quantity || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-lg font-semibold text-secondary-foreground">Dimensions & Weight</h4>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between py-2 border-b border-border/50">
                                                    <span className="text-muted-foreground font-medium">Weight:</span>
                                                    <span className="font-semibold text-card-foreground">{product.weight ? `${product.weight}g` : 'N/A'}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-border/50">
                                                    <span className="text-muted-foreground font-medium">Width:</span>
                                                    <span className="font-semibold text-card-foreground">{product.width ? `${product.width}cm` : 'N/A'}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-border/50">
                                                    <span className="text-muted-foreground font-medium">Height:</span>
                                                    <span className="font-semibold text-card-foreground">{product.height ? `${product.height}cm` : 'N/A'}</span>
                                                </div>
                                                <div className="flex justify-between py-2">
                                                    <span className="text-muted-foreground font-medium">Depth:</span>
                                                    <span className="font-semibold text-card-foreground">{product.depth ? `${product.depth}cm` : 'N/A'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="space-y-6">
                                    <div className="bg-card border border-border rounded-lg p-6">
                                        <div className="flex items-center gap-6 mb-6">
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-primary mb-2">{product.rating ? parseFloat(product.rating).toFixed(1) : '0.0'}</div>
                                                <div className="flex items-center justify-center gap-1 mb-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={`text-lg ${i < Math.floor(parseFloat(product.rating || 0)) ? 'text-yellow-500' : 'text-border'}`}>
                                                            <FaStar />
                                                        </span>
                                                    ))}
                                                </div>
                                                <span className="text-sm text-muted-foreground">({product.reviews?.length || 0} reviews)</span>
                                            </div>

                                            <div className="flex-1 space-y-2">
                                                {[5, 4, 3, 2, 1].map((rating) => {
                                                    const count = product.reviews?.filter(review => Math.floor(parseFloat(review.rating || 0)) === rating).length || 0;
                                                    const percentage = product.reviews?.length > 0 ? (count / product.reviews.length) * 100 : 0;
                                                    return (
                                                        <div key={rating} className="flex items-center gap-2 text-sm">
                                                            <span className="w-3 text-muted-foreground">{rating}</span>
                                                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-primary transition-all duration-300"
                                                                    style={{ width: `${percentage}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="w-8 text-muted-foreground text-right">{count}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {product.reviews && product.reviews.length > 0 ? (
                                        <div className="space-y-4">
                                            {product.reviews.map((review, index) => (
                                                <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                                <span className="text-primary font-semibold text-sm">
                                                                    {(review.reviewerName || 'A').charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <h5 className="font-semibold text-card-foreground">{review.reviewerName || 'Anonymous'}</h5>
                                                                <div className="flex items-center gap-2">
                                                                    <div className="flex items-center gap-1">
                                                                        {[...Array(5)].map((_, i) => (
                                                                            <span key={i} className={`text-sm ${i < Math.floor(parseFloat(review.rating || 0)) ? 'text-yellow-500' : 'text-border'}`}>
                                                                                <FaStar />
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                    {review.date && (
                                                                        <span className="text-xs text-muted-foreground">
                                                                            {new Date(review.date).toLocaleDateString()}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="text-muted-foreground leading-relaxed">{review.comment || review.review || 'No comment provided.'}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-card border border-border rounded-lg p-12 text-center">
                                            <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                            </div>
                                            <h4 className="text-lg font-semibold text-card-foreground mb-2">No Reviews Yet</h4>
                                            <p className="text-muted-foreground">Be the first to review this product!</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='pt-20'>

                    <div className="flex items-center justify-center gap-6 flex-col mb-12">
                        <h3 className='text-4xl text-foreground font-berkshire-heading font-normal capitalize'>Related <span className='text-primary'>Products</span></h3>
                        <p className='text-lg text-muted-foreground font-archivo font-normal'>
                            Products you might also like based on category, tags, and recommendations
                        </p>
                    </div>

                    {/* related products wrapper  */}
                    <section className="text-muted-foreground ml-[50px] mr-[50px]">
                        <div className="container px-5 py-24 mx-auto">
                            {relatedLoading ? (
                                <div className="flex justify-center items-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                </div>
                            ) : (
                                <div className="flex flex-wrap -m-4">
                                    {relatedProducts.map((relatedProduct, index) => (
                                        <ProductsCard
                                            key={relatedProduct.id || index}
                                            product={{
                                                id: relatedProduct.id,
                                                thumbnail: relatedProduct.thumbnail || relatedProduct.image,
                                                category: relatedProduct.category,
                                                title: relatedProduct.title || relatedProduct.name,
                                                price: relatedProduct.price,
                                                rating: relatedProduct.rating,
                                                discount_percentage: relatedProduct.discount_percentage
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
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