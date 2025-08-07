import React from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner />
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

export default Loading
