"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useInstantNavigation } from '@/hooks/usePageTransition'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import CheckoutPageSkeleton from '@/components/CheckoutPageSkeleton'

const CheckoutContent = () => {
  const { userProfile, isAuthenticated, isLoading } = useAuth()
  const { navigateTo } = useInstantNavigation()
  
  // Order state
  const [cartItems, setCartItems] = useState([])
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  })
  
  // Form states
  const [shippingForm, setShippingForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    upozila: '',
    postal_code: ''
  })
  
  const [billingForm, setBillingForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    upozila: '',
    postal_code: ''
  })
  
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [useSameAddress, setUseSameAddress] = useState(true)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderNotes, setOrderNotes] = useState('')

  // Dummy cart data for demonstration
  useEffect(() => {
    // Simulate cart data from localStorage or context
    const dummyCart = [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 2999,
        quantity: 1,
        image: "/api/placeholder/80/80",
        variant: "Black"
      },
      {
        id: 2,
        name: "Smart Watch Series X",
        price: 15999,
        quantity: 2,
        image: "/api/placeholder/80/80",
        variant: "Silver"
      },
      {
        id: 3,
        name: "Bluetooth Speaker",
        price: 4999,
        quantity: 1,
        image: "/api/placeholder/80/80",
        variant: "Blue"
      }
    ]
    setCartItems(dummyCart)
  }, [])

  // Pre-fill forms with user profile data
  useEffect(() => {
    if (userProfile) {
      const userFormData = {
        first_name: userProfile.first_name || '',
        last_name: userProfile.last_name || '',
        email: userProfile.email || '',
        phone: userProfile.phone_number || '',
        address: userProfile.address || '',
        city: userProfile.city || '',
        district: userProfile.district || '',
        upozila: userProfile.upozila || '',
        postal_code: ''
      }
      setShippingForm(userFormData)
      setBillingForm(userFormData)
    }
  }, [userProfile])

  // Calculate order summary
  const calculatedSummary = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = subtotal > 5000 ? 0 : 100 // Free shipping over 5000 BDT
    const tax = Math.round(subtotal * 0.05) // 5% tax
    const total = subtotal + shipping + tax
    
    return { subtotal, shipping, tax, total }
  }, [cartItems])

  useEffect(() => {
    setOrderSummary(calculatedSummary)
  }, [calculatedSummary])

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Don't immediately redirect, let user see the page first
      // navigateTo('/signin?redirect=/checkout')
    }
  }, [isAuthenticated, isLoading])

  // Handle form changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target
    setShippingForm(prev => ({ ...prev, [name]: value }))
    
    if (useSameAddress) {
      setBillingForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleBillingChange = (e) => {
    const { name, value } = e.target
    setBillingForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSameAddressChange = (checked) => {
    setUseSameAddress(checked)
    if (checked) {
      setBillingForm(shippingForm)
    }
  }

  // Validate form
  const isFormValid = () => {
    const requiredShippingFields = ['first_name', 'last_name', 'email', 'phone', 'address', 'city']
    const shippingValid = requiredShippingFields.every(field => shippingForm[field].trim())
    
    const billingValid = useSameAddress || requiredShippingFields.every(field => billingForm[field].trim())
    
    return shippingValid && billingValid && agreeToTerms && cartItems.length > 0
  }

  // Handle order placement
  const handlePlaceOrder = async () => {
    if (!isFormValid()) return
    
    setIsProcessing(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const orderData = {
        items: cartItems,
        shipping_address: shippingForm,
        billing_address: useSameAddress ? shippingForm : billingForm,
        payment_method: paymentMethod,
        order_notes: orderNotes,
        summary: orderSummary
      }
      
      console.log('Order placed:', orderData)
      
      // Redirect to success page
      navigateTo('/order-success')
      
    } catch (error) {
      console.error('Order placement failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return <CheckoutPageSkeleton />
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Sign In Required</h1>
          <p className="text-muted-foreground mb-6">
            Please sign in to your account to proceed with checkout.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigateTo('/signin?redirect=/checkout')} size="lg">
              Sign In to Continue
            </Button>
            <Button variant="outline" onClick={() => navigateTo('/signup')} size="lg">
              Create Account
            </Button>
          </div>
          <div className="mt-8">
            <p className="text-sm text-muted-foreground mb-4">Or continue as guest</p>
            <Button variant="ghost" onClick={() => navigateTo('/cart')}>
              ← Back to Cart
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Checkout</h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs mr-2">1</div>
              Cart
            </span>
            <div className="h-px bg-border flex-1 max-w-12"></div>
            <span className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs mr-2">2</div>
              Checkout
            </span>
            <div className="h-px bg-border flex-1 max-w-12"></div>
            <span className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs mr-2">3</div>
              Confirmation
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="shipping_first_name">First Name *</Label>
                    <Input
                      id="shipping_first_name"
                      name="first_name"
                      value={shippingForm.first_name}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipping_last_name">Last Name *</Label>
                    <Input
                      id="shipping_last_name"
                      name="last_name"
                      value={shippingForm.last_name}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipping_email">Email *</Label>
                    <Input
                      id="shipping_email"
                      name="email"
                      type="email"
                      value={shippingForm.email}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipping_phone">Phone *</Label>
                    <Input
                      id="shipping_phone"
                      name="phone"
                      value={shippingForm.phone}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="shipping_address">Address *</Label>
                  <Textarea
                    id="shipping_address"
                    name="address"
                    value={shippingForm.address}
                    onChange={handleShippingChange}
                    placeholder="House number, street name, area"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="shipping_city">City *</Label>
                    <Input
                      id="shipping_city"
                      name="city"
                      value={shippingForm.city}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipping_district">District</Label>
                    <Input
                      id="shipping_district"
                      name="district"
                      value={shippingForm.district}
                      onChange={handleShippingChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipping_upozila">Upozila</Label>
                    <Input
                      id="shipping_upozila"
                      name="upozila"
                      value={shippingForm.upozila}
                      onChange={handleShippingChange}
                    />
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <Label htmlFor="shipping_postal_code">Postal Code</Label>
                  <Input
                    id="shipping_postal_code"
                    name="postal_code"
                    value={shippingForm.postal_code}
                    onChange={handleShippingChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Billing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Billing Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="same_address"
                    checked={useSameAddress}
                    onCheckedChange={handleSameAddressChange}
                  />
                  <Label htmlFor="same_address">Same as shipping address</Label>
                </div>
                
                {!useSameAddress && (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="billing_first_name">First Name *</Label>
                        <Input
                          id="billing_first_name"
                          name="first_name"
                          value={billingForm.first_name}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billing_last_name">Last Name *</Label>
                        <Input
                          id="billing_last_name"
                          name="last_name"
                          value={billingForm.last_name}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billing_email">Email *</Label>
                        <Input
                          id="billing_email"
                          name="email"
                          type="email"
                          value={billingForm.email}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billing_phone">Phone *</Label>
                        <Input
                          id="billing_phone"
                          name="phone"
                          value={billingForm.phone}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="billing_address">Address *</Label>
                      <Textarea
                        id="billing_address"
                        name="address"
                        value={billingForm.address}
                        onChange={handleBillingChange}
                        placeholder="House number, street name, area"
                        rows={3}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <Label htmlFor="billing_city">City *</Label>
                        <Input
                          id="billing_city"
                          name="city"
                          value={billingForm.city}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billing_district">District</Label>
                        <Input
                          id="billing_district"
                          name="district"
                          value={billingForm.district}
                          onChange={handleBillingChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="billing_upozila">Upozila</Label>
                        <Input
                          id="billing_upozila"
                          name="upozila"
                          value={billingForm.upozila}
                          onChange={handleBillingChange}
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="cod"
                      name="payment_method"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-primary"
                    />
                    <Label htmlFor="cod" className="flex items-center cursor-pointer">
                      <span className="text-2xl mr-2">💵</span>
                      Cash on Delivery
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="bkash"
                      name="payment_method"
                      value="bkash"
                      checked={paymentMethod === 'bkash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-primary"
                    />
                    <Label htmlFor="bkash" className="flex items-center cursor-pointer">
                      <span className="text-2xl mr-2">📱</span>
                      bKash Mobile Payment
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="nagad"
                      name="payment_method"
                      value="nagad"
                      checked={paymentMethod === 'nagad'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-primary"
                    />
                    <Label htmlFor="nagad" className="flex items-center cursor-pointer">
                      <span className="text-2xl mr-2">💳</span>
                      Nagad Digital Payment
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="card"
                      name="payment_method"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-primary"
                    />
                    <Label htmlFor="card" className="flex items-center cursor-pointer">
                      <span className="text-2xl mr-2">💳</span>
                      Credit/Debit Card
                    </Label>
                  </div>
                </div>
                
                {paymentMethod !== 'cod' && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      You will be redirected to the payment gateway to complete your payment securely.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Order Notes (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Special instructions for your order..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 pb-3 border-b border-border last:border-b-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.variant}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs">Qty: {item.quantity}</span>
                          <span className="font-medium">৳{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>৳{orderSummary.subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={orderSummary.shipping === 0 ? 'text-green-600' : ''}>
                      {orderSummary.shipping === 0 ? 'Free' : `৳${orderSummary.shipping}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>৳{orderSummary.tax.toLocaleString()}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>৳{orderSummary.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Terms and Place Order */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={setAgreeToTerms}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                      I agree to the{' '}
                      <button className="text-primary hover:underline">Terms & Conditions</button>
                      {' '}and{' '}
                      <button className="text-primary hover:underline">Privacy Policy</button>
                    </Label>
                  </div>
                  
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePlaceOrder}
                    disabled={!isFormValid() || isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      `Place Order • ৳${orderSummary.total.toLocaleString()}`
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <button
                      onClick={() => navigateTo('/cart')}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      ← Back to Cart
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

const CheckoutPage = () => {
  return <CheckoutContent />
}

export default CheckoutPage