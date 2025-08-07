import React, { Suspense } from 'react'
import CheckoutPageSkeleton from '@/components/CheckoutPageSkeleton'

const CheckoutContent = () => {
  return (
    <div>Checkout Page</div>
  )
}

const page = () => {
  return (
    <Suspense fallback={<CheckoutPageSkeleton />}>
      <CheckoutContent />
    </Suspense>
  )
}

export default page