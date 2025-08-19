"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useInstantNavigation } from '@/hooks/usePageTransition'
import { useAuth } from '@/hooks/useAuth'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Alert from '@/components/Alert'
import Cookies from 'js-cookie'
import { useLogin } from '@/lib/api'

const SignInPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    
    const searchParams = useSearchParams()
    const { navigateTo } = useInstantNavigation()
    const { isAuthenticated, isLoading: authLoading } = useAuth()
    
    const redirectUrl = searchParams.get('redirect') || '/'

    // Redirect if already authenticated
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            navigateTo(redirectUrl)
        }
    }, [isAuthenticated, authLoading, redirectUrl, navigateTo])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email === "" || password === "") {
            setAlertMessage("Please fill in all fields")
            setShowAlert(true)
            setTimeout(() => setShowAlert(false), 3000)
            return
        }
        
        setIsLoading(true)
        
        try {
            const response = await useLogin(email, password)
            
            Cookies.set('accessToken', response.access_token)
            Cookies.set('refreshToken', response.refresh_token)
            
            // Store login success flag
            localStorage.setItem('loginSuccess', 'true')
            
            // Redirect to the intended page
            navigateTo(redirectUrl)

        } catch (e) {
            console.error("Login failed:", e)
            setAlertMessage("Login failed. Please check your credentials and try again.")
            setShowAlert(true)
            
            // Hide alert after 3 seconds
            setTimeout(() => setShowAlert(false), 3000)
        } finally {
            setIsLoading(false)
        }
    }

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
                    <div className="h-96 bg-gray-200 rounded w-96"></div>
                </div>
            </div>
        )
    }

    if (isAuthenticated) {
        return null // Will redirect via useEffect
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border">
                            <svg
                                className="stroke-foreground"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 32 32"
                                aria-hidden="true">
                                <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
                            </svg>
                        </div>
                    </div>
                    <CardTitle>Welcome back</CardTitle>
                    <p className="text-muted-foreground">
                        Enter your credentials to login to your account.
                    </p>
                    {redirectUrl !== '/' && (
                        <p className="text-sm text-primary">
                            Sign in to continue to {redirectUrl === '/checkout' ? 'checkout' : redirectUrl.replace('/', '')}
                        </p>
                    )}
                </CardHeader>
                <CardContent>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="signin-email">Email</Label>
                                <Input
                                    id="signin-email"
                                    placeholder="hi@yourcompany.com"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <Label htmlFor="signin-password">Password</Label>
                                <Input
                                    id="signin-password"
                                    placeholder="Enter your password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        
                        <div className="flex justify-between gap-2">
                            <a className="text-sm underline hover:no-underline" href="#">
                                Forgot password?
                            </a>
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </div>
                            ) : (
                                'Sign in'
                            )}
                        </Button>
                        
                        <p className="text-sm text-center">
                            Don't have any account?{" "}
                            <a href="/signup" className="text-primary hover:text-primary/80 underline hover:no-underline">
                                Sign up
                            </a>
                        </p>
                    </form>

                    {showAlert && <Alert message={alertMessage} type="error" />}

                    <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1 my-4">
                        <span className="text-muted-foreground text-xs">Or</span>
                    </div>

                    <Button variant="outline" className="w-full" disabled={isLoading}>
                        Login with Google
                    </Button>
                    
                    <div className="mt-4 text-center">
                        <Button 
                            variant="ghost" 
                            onClick={() => navigateTo('/')}
                            disabled={isLoading}
                        >
                            ← Back to Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignInPage
