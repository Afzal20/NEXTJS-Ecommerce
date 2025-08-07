import React from 'react'

const SearchPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 animate-pulse">
      <div className="max-w-6xl mx-auto">
        {/* Search Header */}
        <div className="mb-8">
          <div className="h-8 bg-muted rounded w-48 mb-4"></div>
          <div className="flex gap-4 mb-6">
            <div className="h-10 bg-muted rounded flex-1"></div>
            <div className="h-10 bg-muted rounded w-24"></div>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="h-8 bg-muted rounded w-20"></div>
            ))}
          </div>
        </div>
        
        {/* Filters Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="space-y-6">
            <div className="h-6 bg-muted rounded w-20"></div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-24"></div>
                <div className="space-y-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-16"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-6 bg-muted rounded w-full"></div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 12 }, (_, index) => (
                <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="w-full h-48 bg-muted"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-5 bg-muted rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPageSkeleton
