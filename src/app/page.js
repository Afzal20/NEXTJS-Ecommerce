"use client"

import React, { Suspense, useEffect, useState } from "react";
import HeaderSlider from "@/components/HeaderSlider";
import Image from "next/image";
import ProductsCard from "@/components/ProductsCard";
import InstantPageWrapper from "@/components/InstantPageWrapper";
import HeroSectionSkeleton from "@/components/HeroSectionSkeleton";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import Alert from "@/components/Alert";
import { getTopSellingProducts } from "@/lib/api";


export default function Home() {
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [productArray, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user just logged in
    const loginSuccess = localStorage.getItem('loginSuccess');
    if (loginSuccess === 'true') {
      setShowLoginAlert(true);
      // Remove the flag so it doesn't show again
      localStorage.removeItem('loginSuccess');
      
      // Hide alert after 5 seconds
      setTimeout(() => setShowLoginAlert(false), 5000);
    }
  }, []);

  React.useEffect(() => {
          const fetchTopSellingProducts = async () => {
              try {
                  setIsLoading(true)
                  setError(null)
                  const productsData = await getTopSellingProducts()
                  console.log('Top Selling Products Data:', productsData) // Debug log
                  setProducts(productsData)
              } catch (err) {
                  setError('Failed to load products')
                  console.error('Error fetching products:', err)
              } finally {
                  setIsLoading(false)
              }
          }
  
          fetchTopSellingProducts()
      }, [])
  
  
  const HomePageSkeleton = () => (
    <div className="ml-[50px] mr-[50px]">
      <HeroSectionSkeleton />
      <ProductGridSkeleton count={10} />
    </div>
  );

  return (
    <InstantPageWrapper 
      loadingSkeleton={<HomePageSkeleton />}
      loadingDelay={200}
    >
      <div className="ml-[50px] mr-[50px]">
        {/* Login Success Alert */}
        {showLoginAlert && (
          <div className="mb-6">
            <Alert message="Welcome back! You have successfully logged in." type="success" />
          </div>
        )}
        
        <HeaderSlider />
      {/* Categories */}
      <div className='flex flex-col items-center bg-background text-foreground rounded-lg mt-[20px] p-20'>
        <h1 className='text-3xl font-bold text-center'>Top Products Categories</h1>
        <p className='text-lg text-center mt-4 text-muted-foreground'>Explore our diverse range of product categories.</p>
        <div className='flex flex-col items-center w-full h-auto'>
          <div className='mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
            {/* Example category cards */}
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} className='bg-card text-card-foreground p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-border'>
                <h2 className='text-xl font-semibold'>Category {index + 1}</h2>
                <p className='text-muted-foreground mt-2'>Description of category {index + 1}.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <div className='flex flex-col items-center w-[99%] bg-gradient-to-b mt-16 from-background to-muted p-10 rounded-lg shadow-lg'>
        <h1 className='text-5xl font-bold mt-10 text-foreground'>Welcome to Our Store</h1>
        <p className='text-lg mt-4 text-muted-foreground'>Discover the best products at unbeatable prices.</p>
      </div>

      {/* Top Selling Products */}
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-bold text-center mt-10 text-foreground'>Top Selling Products</h1>
        <p className='text-lg text-center mt-4 text-muted-foreground'>Discover our best-selling products that customers love!</p>
        <section className="text-muted-foreground">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {isLoading ? (
                // Show loading skeletons while data is being fetched
                Array.from({ length: 8 }, (_, index) => (
                  <ProductsCard key={`skeleton-${index}`} isLoading={true} />
                ))
              ) : error ? (
                // Show error message if there's an error
                <div className="w-full text-center py-8">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : productArray.length > 0 ? (
                // Show actual products when data is loaded
                productArray.map((topSellingProduct, index) => (
                  <ProductsCard 
                    key={topSellingProduct.id || `product-${index}`} 
                    product={{
                      id: topSellingProduct.id,
                      thumbnail: topSellingProduct.product_thumbnail,
                      category: topSellingProduct.product_category,
                      title: topSellingProduct.product_title,
                      price: topSellingProduct.product_price,
                      discounted_price: topSellingProduct.discounted_price,
                      rating: topSellingProduct.product_rating,
                      stock: topSellingProduct.product_stock,
                      brand: topSellingProduct.product_brand,
                      is_available: topSellingProduct.is_available
                    }}
                    isLoading={false}
                  />
                ))
              ) : (
                // Show message when no products are available
                <div className="w-full text-center py-8">
                  <p className="text-muted-foreground">No top selling products available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Contact Section */}
      <div className='flex flex-col items-center w-[99%] mb-[50px] bg-gradient-to-b from-card to-muted p-10 rounded-lg shadow-lg text-card-foreground border border-border'>
        <h1 className='text-5xl font-bold mt-10'>Get in Touch</h1>
        <p className='text-lg mt-4 text-muted-foreground'>We&apos;d love to hear from you! Reach out with any questions.</p>
        <form className='mt-6 w-full max-w-md gap-y-20'>
          <div className='mb-4 gap-y-20'>
            <label className='block text-foreground text-sm font-bold mb-2' htmlFor='name'>
              Name
            </label>
            <input
              className='shadow appearance-none border border-border rounded w-full py-2 px-3 mb-5 text-foreground bg-input leading-tight focus:outline-none focus:ring-2 focus:ring-ring'
              id='name'
              type='text'
              placeholder='Your Name'
            />
            <input
              className='shadow appearance-none border border-border rounded w-full py-2 px-3 mb-5 text-foreground bg-input leading-tight focus:outline-none focus:ring-2 focus:ring-ring'
              id='email'
              type='email'
              placeholder='Your Email'
            />
            <textarea
              className='shadow appearance-none border border-border rounded w-full py-2 px-3 mb-5 text-foreground bg-input leading-tight focus:outline-none focus:ring-2 focus:ring-ring'
              id='message'
              rows='4'
              placeholder='Your Message'
            ></textarea>
            <button
              className='bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-ring transition-colors'
              type='submit'
            >
              Send Message
            </button>
          </div>
        </form> 
      </div>
      </div>
    </InstantPageWrapper>
  );
}
