import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';

import Alert from '@/components/Alert'

import Cookies from 'js-cookie';

import { useLogin } from '@/lib/api'

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            return;
        } 
        try {
            const response = await useLogin(email, password);
            
            Cookies.set('accessToken', response.access_token)
            Cookies.set('refreshToken', response.refresh_token);
            
            // Store login success flag for home page alert
            localStorage.setItem('loginSuccess', 'true');
            
            // Reload the page to show the success alert on home page
            window.location.reload();

        } catch (e) {
            console.error("Login failed:", e);
            setAlertMessage("Login failed. Please check your credentials and try again.");
            setShowAlert(true);
            
            // Hide alert after 3 seconds
            setTimeout(() => setShowAlert(false), 3000);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Sign in</Button>
            </DialogTrigger>
            <DialogContent className="bg-card text-card-foreground border border-border shadow-lg backdrop-blur-sm">
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
                        aria-hidden="true">
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
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">Welcome back</DialogTitle>
                        <DialogDescription className="sm:text-center">
                            Enter your credentials to login to your account.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5" onSubmit={handelSubmit}>
                    <div className="space-y-4">
                        <div className="*:not-first:mt-2">
                            <Label htmlFor="signin-email">Email</Label>
                            <Input
                                id="signin-email"
                                placeholder="hi@yourcompany.com"
                                type="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="*:not-first:mt-2">
                            <Label htmlFor="signin-password">Password</Label>
                            <Input
                                id="signin-password"
                                placeholder="Enter your password"
                                type="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between gap-2">
                        <a className="text-sm underline hover:no-underline" href="#">
                            Forgot password?
                        </a>
                    </div>
                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                    <p className="text-sm">
                        Don't have any account?{" "}
                        <a href="/signup" className="text-primary hover:text-primary/80 underline hover:no-underline">
                            Sign up
                        </a>
                    </p>
                </form>

                {showAlert && <Alert message={alertMessage} type="error" />}

                <div
                    className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
                    <span className="text-muted-foreground text-xs">Or</span>
                </div>

                <Button variant="outline">Login with Google</Button>
            </DialogContent>
        </Dialog>
    )
}

export default SignIn