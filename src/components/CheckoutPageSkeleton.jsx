import React from 'react'

const CheckoutPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 animate-pulse">
      <div className="max-w-4xl mx-auto">
        <div className="h-8 bg-muted rounded w-48 mb-8"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Form Skeleton */}
          <div className="space-y-6">
            <div className="h-6 bg-muted rounded w-32"></div>
            <div className="space-y-4">
              <div className="h-10 bg-muted rounded w-full"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 bg-muted rounded w-full"></div>
                <div className="h-10 bg-muted rounded w-full"></div>
              </div>
              <div className="h-10 bg-muted rounded w-full"></div>
              <div className="h-10 bg-muted rounded w-full"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-10 bg-muted rounded w-full"></div>
                <div className="h-10 bg-muted rounded w-full"></div>
                <div className="h-10 bg-muted rounded w-full"></div>
              </div>
            </div>
          </div>
          
          {/* Order Summary Skeleton */}
          <div className="space-y-6">
            <div className="h-6 bg-muted rounded w-32"></div>
            <div className="bg-card border border-border rounded-lg p-4 space-y-4">
              {Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-muted rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                  <div className="h-4 bg-muted rounded w-16"></div>
                </div>
              ))}
              <hr className="border-border" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 bg-muted rounded w-16"></div>
                  <div className="h-4 bg-muted rounded w-16"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-muted rounded w-20"></div>
                  <div className="h-4 bg-muted rounded w-16"></div>
                </div>
                <div className="flex justify-between font-semibold">
                  <div className="h-5 bg-muted rounded w-16"></div>
                  <div className="h-5 bg-muted rounded w-20"></div>
                </div>
              </div>
              <div className="h-12 bg-muted rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPageSkeleton
