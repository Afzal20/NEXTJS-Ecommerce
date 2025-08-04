import React from 'react'

const page = () => {

  return (
    <div className='flex flex-col items-center w-full h-auto bg-background text-foreground'>
      <h1 className='text-3xl font-bold text-center mt-10'>Categories</h1>
      <p className='text-lg text-center mt-4 text-muted-foreground'>Explore our wide range of categories to find the products you love.</p>
      <div className='mt-10 grid grid-cols-2 ml-[50px] mr-[50px] mb-20 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {/* Example category cards */}  
        {Array.from({ length: 20 }, (_, index) => (
          <div key={index} className='bg-card text-card-foreground p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-border'>
            <h2 className='text-xl font-semibold'>Category {index + 1}</h2>
            <p className='text-muted-foreground mt-2'>Description of category {index + 1}.</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page