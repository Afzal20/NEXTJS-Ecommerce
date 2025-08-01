import React, { useId } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import PasswordCheck from "./PasswordCheck"


export const SignUp = () => {
    const id = useId();
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="h-auto p-0 underline hover:no-underline">
                    Sign up
                </Button>
            </DialogTrigger>
            <DialogContent className="!bg-white dark:!bg-gray-900 border shadow-lg backdrop-blur-sm">
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="flex size-11 shrink-0 items-center justify-center rounded-full border"
                        aria-hidden="true">
                        <svg
                            className="stroke-zinc-800 dark:stroke-zinc-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 32 32"
                            aria-hidden="true">
                            <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
                        </svg>
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">
                            Ecom Sign up
                        </DialogTitle>
                        <DialogDescription className="sm:text-center">
                            We just need a few details to get you started.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5">
                    <div className="space-y-4">
                        <div className="*:not-first:mt-2">
                            <Label htmlFor={`${id}-signup-email`}>Email</Label>
                            <Input id={`${id}-signup-email`} placeholder="hi@yourcompany.com" type="email" required />
                        </div>
                        <div className="*:not-first:mt-2">
                            <PasswordCheck />
                        </div>
                    </div>
                    <Button type="button" className="w-full">
                        Sign up
                    </Button>
                </form>

                <div
                    className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
                    <span className="text-muted-foreground text-xs">Or</span>
                </div>

                <Button variant="outline">Continue with Google</Button>

                <p className="text-muted-foreground text-center text-xs">
                    By signing up you agree to our{" "}
                    <a className="underline hover:no-underline" href="#">
                        Terms
                    </a>
                    .
                </p>
            </DialogContent>
        </Dialog>
    )
}