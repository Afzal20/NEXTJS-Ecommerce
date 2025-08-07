import React from 'react'

const CategoriesPageSkeleton = () => {
  return (
    <div className='flex flex-col items-center w-full h-auto bg-background text-foreground animate-pulse'>
      <div className='h-8 bg-muted rounded w-48 mt-10'></div>
      <div className='h-6 bg-muted rounded w-96 mt-4'></div>
      <div className='mt-10 grid grid-cols-2 ml-[50px] mr-[50px] mb-20 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {Array.from({ length: 20 }, (_, index) => (
          <div key={index} className='bg-card border border-border p-4 rounded-lg shadow-md'>
            <div className='h-6 bg-muted rounded mb-2'></div>
            <div className='h-4 bg-muted rounded w-3/4'></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesPageSkeleton
