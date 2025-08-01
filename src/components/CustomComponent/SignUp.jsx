import React from 'react'
import { Button } from "@/components/ui/button"

export const SignUp = () => {
    return (
        <Button variant="link" className="h-auto p-0 underline hover:no-underline" asChild>
            <a href="/signup">
                Sign up
            </a>
        </Button>
    )
}