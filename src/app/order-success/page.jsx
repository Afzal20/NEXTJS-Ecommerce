"use client"

import React, { useEffect, useState } from 'react'
import { useInstantNavigation } from '@/hooks/usePageTransition'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const OrderSuccessPage = () => {
  const { navigateTo } = useInstantNavigation()
  const [orderDate, setOrderDate] = useState('')
  
  // Initialize date on client side to avoid hydration mismatch
  useEffect(() => {
    setOrderDate(new Date().toLocaleDateString())
  }, [])
  
  // Dummy order data - in real app this would come from URL params or API
  const orderData = {
    id: 'ORD-2024-001',
    date: orderDate,
    status: 'confirmed',
    total: 28997,
    items: [
      { name: "Premium Wireless Headphones", quantity: 1, price: 2999 },
      { name: "Smart Watch Series X", quantity: 2, price: 15999 },
      { name: "Bluetooth Speaker", quantity: 1, price: 4999 }
    ],
    shipping: {
      method: 'Standard Delivery',
      cost: 0,
      estimated: '3-5 business days'
    },
    payment: {
      method: 'Cash on Delivery',
      status: 'Pending'
    }
  }

  useEffect(() => {
    // Clear cart from localStorage/context here
    console.log('Order confirmed, clearing cart...')
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>

        {/* Order Details */}
        <Card className="text-left mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order Details</span>
              <Badge variant="secondary">#{orderData.id}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Order Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium">Order Date</p>
                <p className="text-sm text-muted-foreground">{orderData.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Order Status</p>
                <Badge className="mt-1 capitalize">{orderData.status}</Badge>
              </div>
            </div>

            <Separator />

            {/* Items */}
            <div>
              <h4 className="font-medium mb-3">Ordered Items</h4>
              <div className="space-y-2">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">৳{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Shipping & Payment */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Shipping</h4>
                <p className="text-sm text-muted-foreground">{orderData.shipping.method}</p>
                <p className="text-sm text-muted-foreground">{orderData.shipping.estimated}</p>
                <p className="text-sm font-medium">
                  {orderData.shipping.cost === 0 ? 'Free' : `৳${orderData.shipping.cost}`}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Payment</h4>
                <p className="text-sm text-muted-foreground">{orderData.payment.method}</p>
                <Badge variant="outline" className="mt-1">{orderData.payment.status}</Badge>
              </div>
            </div>

            <Separator />

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Amount</span>
              <span>৳{orderData.total.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigateTo('/orders')} variant="outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Order History
          </Button>
          <Button onClick={() => navigateTo('/')}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Continue Shopping
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">What's Next?</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• You'll receive an order confirmation email within 5 minutes</li>
            <li>• We'll notify you when your order is shipped</li>
            <li>• Track your order anytime from your account</li>
            <li>• Contact support if you have any questions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessPage
