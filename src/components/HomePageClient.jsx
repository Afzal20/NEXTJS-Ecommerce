"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProductsCard from "@/components/ProductsCard";
import InstantPageWrapper from "@/components/InstantPageWrapper";
import HeroSectionSkeleton from "@/components/HeroSectionSkeleton";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import Alert from "@/components/Alert";
import HeaderSlider from "@/components/HeaderSlider";
import { getTopSellingProducts, getTopCategories, postGetInTouch } from "@/lib/api";
import HeroSection from "./HeroSection";

export default function HomePageClient({ 
  initialProducts = [], 
  initialCategories = [], 
  initialError = null 
}) {
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [productArray, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false); // Start with false since we have initial data
  const [error, setError] = useState(initialError);
  const [categoriesData, setCategoriesData] = useState(initialCategories);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactStatus, setContactStatus] = useState(null); // 'success', 'error', or null

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

  // Only fetch data if we don't have initial data
  useEffect(() => {
    if (initialProducts.length === 0 && !initialError) {
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
    }
  }, [initialProducts, initialError])

  // Only fetch categories if we don't have initial data
  useEffect(() => {
    if (initialCategories.length === 0 && !initialError) {
      const fetchTopCategories = async () => {
        try {
          setIsLoading(true)
          setError(null)
          const categoriesData = await getTopCategories()
          console.log('Top Categories Data:', categoriesData) // Debug log
          setCategoriesData(categoriesData)
        } catch (err) {
          setError('Failed to load categories')
          console.error('Error fetching categories:', err)
        } finally {
          setIsLoading(false)
        }
      }

      fetchTopCategories()
    }
  }, [initialCategories, initialError])

  // Contact form handlers
  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      setContactStatus('error');
      return;
    }

    setContactLoading(true);
    setContactStatus(null);

    try {
      await postGetInTouch(contactForm.name, contactForm.email, contactForm.message);
      setContactStatus('success');
      // Reset form
      setContactForm({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setContactStatus('error');
    } finally {
      setContactLoading(false);
    }
  };

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
      <HeaderSlider />
      
      <div className="ml-[50px] mr-[50px]">
        {/* Login Success Alert */}
        {showLoginAlert && (
          <div className="mb-6 mt-6">
            <Alert message="Welcome back! You have successfully logged in." type="success" />
          </div>
        )}

        {/* Categories */}
        <div className='flex flex-col items-center bg-background text-foreground rounded-lg mt-[20px] p-20'>
          <h1 className='text-3xl font-bold text-center'>Top Products Categories</h1>
          <p className='text-lg text-center mt-4 text-muted-foreground'>Explore our diverse range of product categories.</p>
          <div className='flex flex-col items-center w-full h-auto'>
            <div className='mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
              {/* Example category cards */}
              {/* Render top Categories */}
              {isLoading ? (
                // Show loading skeletons while data is being fetched
                Array.from({ length: 5 }, (_, index) => (
                  <div key={`category-skeleton-${index}`} className="w-full h-24 bg-muted rounded-lg animate-pulse"></div>
                ))
              ) : error ? (
                // Show error message if there's an error
                <div className="w-full text-center py-8">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : categoriesData.length > 0 ? (
                categoriesData.map((category, index) => {
                  // Debug log to see category structure
                  console.log('Category data:', category);
                  
                  // Get category image with fallback
                  const getCategoryImage = () => {
                    if (category.category_image && category.category_image.trim() !== '') {
                      return category.category_image;
                    }
                    // Use a simple data URL as fallback to avoid external domain issues
                    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNSA0MEg2NVY2MEgzNVY0MFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHBhdGggZD0iTTQwIDMwSDYwVjM1SDQwVjMwWiIgZmlsbD0iIzlDQTRBRiIvPgo8L3N2Zz4K";
                  };

                  const hasValidImage = category.category_image && category.category_image.trim() !== '';

                  return (
                    <div key={category.id || `category-${index}`} className='flex flex-col items-center'>
                      {hasValidImage ? (
                        <Image
                          src={getCategoryImage()}
                          alt={category.category_name || `Category ${index + 1}`}
                          width={100}
                          height={100}
                          className='rounded-lg mb-2'
                          onError={(e) => {
                            // Hide the image on error and show placeholder
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4H20V20H4V4Z" stroke="#9CA3AF" strokeWidth="2" fill="none"/>
                            <path d="M9 9H15V15H9V9Z" fill="#9CA3AF"/>
                          </svg>
                        </div>
                      )}
                      <span className='text-muted-foreground'>{category.category_name || `Category ${index + 1}`}</span>
                    </div>
                  );
                })
              ) : (
                // Show message when no categories are available
                <div className="w-full text-center py-8">
                  <p className="text-muted-foreground">No categories available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Hero Section */}
        <HeroSection/> 

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
          
          {/* Contact Status Messages */}
          {contactStatus === 'success' && (
            <div className='mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg'>
              Thank you for your message! We&apos;ll get back to you soon.
            </div>
          )}
          {contactStatus === 'error' && (
            <div className='mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
              Please fill in all fields and try again.
            </div>
          )}

          <form onSubmit={handleContactSubmit} className='mt-6 w-full max-w-md gap-y-20'>
            <div className='mb-4 gap-y-20'>
              <label className='block text-foreground text-sm font-bold mb-2' htmlFor='name'>
                Name
              </label>
              <input
                className='shadow appearance-none border border-border rounded w-full py-2 px-3 mb-5 text-foreground bg-input leading-tight focus:outline-none focus:ring-2 focus:ring-ring'
                id='name'
                name='name'
                type='text'
                placeholder='Your Name'
                value={contactForm.name}
                onChange={handleContactInputChange}
                required
              />
              <label className='block text-foreground text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>
              <input
                className='shadow appearance-none border border-border rounded w-full py-2 px-3 mb-5 text-foreground bg-input leading-tight focus:outline-none focus:ring-2 focus:ring-ring'
                id='email'
                name='email'
                type='email'
                placeholder='Your Email'
                value={contactForm.email}
                onChange={handleContactInputChange}
                required
              />
              <label className='block text-foreground text-sm font-bold mb-2' htmlFor='message'>
                Message
              </label>
              <textarea
                className='shadow appearance-none border border-border rounded w-full py-2 px-3 mb-5 text-foreground bg-input leading-tight focus:outline-none focus:ring-2 focus:ring-ring'
                id='message'
                name='message'
                rows='4'
                placeholder='Your Message'
                value={contactForm.message}
                onChange={handleContactInputChange}
                required
              ></textarea>
              <button
                className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                  contactLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                }`}
                type='submit'
                disabled={contactLoading}
              >
                {contactLoading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </InstantPageWrapper>
  );
}
