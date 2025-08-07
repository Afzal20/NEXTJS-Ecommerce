import React from 'react'

const SignupPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 animate-pulse">
      <div className="w-full max-w-md">
        <div className="bg-card text-card-foreground border border-border shadow-lg rounded-lg p-6 space-y-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted"></div>
            <div className="text-center space-y-2">
              <div className="h-6 bg-muted rounded w-32 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-48 mx-auto"></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-16"></div>
              <div className="h-10 bg-muted rounded w-full"></div>
            </div>
            
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-16"></div>
              <div className="h-10 bg-muted rounded w-full"></div>
            </div>
            
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-10 bg-muted rounded w-full"></div>
            </div>
            
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-28"></div>
              <div className="h-10 bg-muted rounded w-full"></div>
            </div>
            
            <div className="h-10 bg-muted rounded w-full"></div>
          </div>
          
          <div className="text-center">
            <div className="h-4 bg-muted rounded w-48 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPageSkeleton
