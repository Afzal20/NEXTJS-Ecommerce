"use client"

import { useId } from "react"
import { SearchIcon } from "lucide-react"
import { useInstantNavigation } from "@/hooks/usePageTransition"

import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import PasswordCheck from "@/components/PasswordCheck"
import ChangeThemeButton from "@/components/ChangeThemeButton"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import SignIn from "./SignIn"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/Products", label: "Products" },
  { href: "/Categories", label: "Categories" },
]

export default function Navbar() {
  const id = useId()
  const { navigateTo } = useInstantNavigation()

  return (
    <header className="md:px-6">
      <div className="flex h-16 items-center justify-center gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8 md:hidden" variant="ghost" size="icon">
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]" />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault()
                          navigateTo(link.href)
                        }}
                        className="py-1.5 cursor-pointer"
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}                
                  <NavigationMenuItem className="w-full" role="presentation" aria-hidden="true">
                    <div
                      role="separator"
                      aria-orientation="horizontal"
                      className="bg-border -mx-1 my-1 h-px"></div>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="w-full">
                    <ChangeThemeButton />
                  </NavigationMenuItem>
                  <NavigationMenuItem className="w-full">
                    {/* Signin Button */}
                    <SignIn />
                  </NavigationMenuItem>
                  <NavigationMenuItem className="w-full">
                    <NavigationMenuLink 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault()
                        navigateTo('/cart')
                      }}
                      className="py-1.5 cursor-pointer"
                    >
                    <Button asChild size="sm" className="mt-0.5 w-full text-left text-sm">
                      <span className="flex items-baseline gap-2">
                        Cart
                        <span className="text-primary-foreground/60 text-xs">
                          2
                        </span>
                      </span>
                    </Button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex flex-1 items-center gap-6 max-md:justify-between">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault()
                navigateTo('/')
              }}
              className="text-primary hover:text-primary/90 cursor-pointer"
            >
              <Logo />
            </a>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        navigateTo(link.href)
                      }}
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium cursor-pointer">
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            {/* Search form */}
            <div className="relative">
              <Input
                id={id}
                className="peer h-8 ps-8 pe-2"
                placeholder="Search..."
                type="search" />
              <div
                className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                <SearchIcon size={16} />
              </div>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2 max-md:hidden">
          {/* Theme toggle */}
          <ChangeThemeButton />
          {/* Sign in */}
          <SignIn />
          <Button asChild size="sm" className="text-sm">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault()
                navigateTo('/cart')
              }}
              className="cursor-pointer"
            >
              <span className="flex items-baseline gap-2">
                Cart
                <span className="text-primary-foreground/60 text-xs">2</span>
              </span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}


