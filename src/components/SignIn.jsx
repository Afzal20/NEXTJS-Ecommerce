import React, { useId } from 'react'
import { SignUp } from './SignUp'
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


const SignIn = () => {
    const id = useId();

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

                <form className="space-y-5">
                    <div className="space-y-4">
                        <div className="*:not-first:mt-2">
                            <Label htmlFor={`${id}-signin-email`}>Email</Label>
                            <Input id={`${id}-signin-email`} placeholder="hi@yourcompany.com" type="email" required />
                        </div>
                        <div className="*:not-first:mt-2">
                            <Label htmlFor={`${id}-signin-password`}>Password</Label>
                            <Input
                                id={`${id}-signin-password`}
                                placeholder="Enter your password"
                                type="password"
                                required />
                        </div>
                    </div>
                    <div className="flex justify-between gap-2">
                        <a className="text-sm underline hover:no-underline" href="#">
                            Forgot password?
                        </a>
                    </div>
                    <Button type="button" className="w-full">
                        Sign in
                    </Button>
                    <p className="text-sm">
                        Don't have any account?{" "} <SignUp />
                    </p>
                </form>

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