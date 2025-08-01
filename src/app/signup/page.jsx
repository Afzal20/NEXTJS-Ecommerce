"use client";

import React, { useId } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import PasswordCheck from "@/components/CustomComponent/PasswordCheck"

export default function SignUpPage() {
    const id = useId();
    
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-card text-card-foreground border border-border shadow-lg rounded-lg p-6 space-y-6">
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
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold">
                                Create Your Account
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                We just need a few details to get you started.
                            </p>
                        </div>
                    </div>

                    <form className="space-y-5">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor={`${id}-signup-email`}>Email</Label>
                                <Input 
                                    id={`${id}-signup-email`} 
                                    placeholder="hi@yourcompany.com" 
                                    type="email" 
                                    required 
                                />
                            </div>
                            <div className="space-y-2">
                                <PasswordCheck />
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            Sign up
                        </Button>
                    </form>

                    <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
                        <span className="text-muted-foreground text-xs">Or</span>
                    </div>

                    <Button variant="outline" className="w-full">
                        Continue with Google
                    </Button>

                    <div className="text-center space-y-2">
                        <p className="text-muted-foreground text-xs">
                            By signing up you agree to our{" "}
                            <a className="text-primary hover:text-primary/80 underline hover:no-underline" href="#">
                                Terms
                            </a>
                            .
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <a href="/signin" className="text-primary hover:text-primary/80 underline hover:no-underline">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
