"use client"

import React, { Suspense } from 'react'
import Image from 'next/image'
import CategoriesPageSkeleton from '@/components/CategoriesPageSkeleton'
import { getCategory } from '@/lib/api'

const CategoriesContent = () => {
  const [categories, setCategories] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [Error, setError] = React.useState()

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const categoriesData = await getCategory()
        console.log('Categories Data:', categoriesData) // Debug log
        setCategories(categoriesData)
      } catch (err) {
        setError('Failed to load categories')
        console.error('Error fetching categories:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className='flex flex-col items-center w-full h-auto bg-background text-foreground'>
      <h1 className='text-3xl font-bold text-center mt-10'>Categories</h1>
      <p className='text-lg text-center mt-4 text-muted-foreground'>Explore our wide range of categories to find the products you love.</p>
      
      {isLoading && (
        <div className='mt-10 text-center'>
          <p>Loading categories...</p>
        </div>
      )}
      
      {Error && (
        <div className='mt-10 text-center text-red-500'>
          <p>{Error}</p>
        </div>
      )}
      
      {!isLoading && !Error && (
        <div className='mt-10 grid grid-cols-2 ml-[50px] mr-[50px] mb-20 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
          {categories.map((category) => (
            <div key={category.id} className='bg-card text-card-foreground p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-border'>
              {/* Category Image */}
              <div className='w-full h-32 mb-4 relative overflow-hidden rounded-md'>
                {category.image ? (
                  <Image
                    src={`http://localhost:8000${category.image}`}
                    alt={category.name}
                    fill
                    className='object-cover'
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  />
                ) : (
                  <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                    <span className='text-gray-500 text-sm'>No Image</span>
                  </div>
                )}
              </div>
              
              <h2 className='text-xl font-semibold'>{category.name}</h2>
              <p className='text-muted-foreground mt-2'>{category.description}</p>
              {category.product_count !== undefined && (
                <p className='text-sm text-muted-foreground mt-1'>
                  {category.product_count} products
                </p>
              )}
            </div>
          ))}
          {categories.length === 0 && (
            <div className='col-span-full text-center text-muted-foreground'>
              <p>No categories found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const page = () => {
  return (
    <Suspense fallback={<CategoriesPageSkeleton />}>
      <CategoriesContent />
    </Suspense>
  )
}

export default page