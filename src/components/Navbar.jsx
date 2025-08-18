"use client"

import React, { useId } from "react"
import { SearchIcon } from "lucide-react"
import { useInstantNavigation } from "@/hooks/usePageTransition"

import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import PasswordCheck from "@/components/PasswordCheck"
import ChangeThemeButton from "@/components/ChangeThemeButton"
import Cookies from 'js-cookie'
import { verifyAccessToken, getUserProfile, refreshAccessToken } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"

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
  const { userProfile, isAuthenticated, isLoading, logout } = useAuth()

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
                    {/* User Profile or Sign In for Mobile */}
                    {isLoading ? (
                      <div className="animate-pulse bg-gray-200 h-12 w-full rounded"></div>
                    ) : isAuthenticated && userProfile ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          {userProfile.profile_image ? (
                            <img 
                              src={userProfile.profile_image} 
                              alt="Profile" 
                              className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium border-2 border-primary/20">
                              {userProfile.email ? userProfile.email.substring(0, 2).toUpperCase() : 'U'}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {userProfile.first_name && userProfile.last_name 
                                ? `${userProfile.first_name} ${userProfile.last_name}`
                                : userProfile.first_name || userProfile.email || 'User'
                              }
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {userProfile.email || 'No email'}
                            </p>
                          </div>
                        </div>
                        <NavigationMenuLink 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault()
                            navigateTo('/profile')
                          }}
                          className="py-2 cursor-pointer block w-full text-left"
                        >
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            View Profile
                          </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault()
                            navigateTo('/orders')
                          }}
                          className="py-2 cursor-pointer block w-full text-left"
                        >
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            My Orders
                          </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault()
                            logout()
                            navigateTo('/')
                          }}
                          className="py-2 cursor-pointer block w-full text-left text-red-600"
                        >
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                          </div>
                        </NavigationMenuLink>
                      </div>
                    ) : (
                      <SignIn />
                    )}
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
          
          {/* User Profile or Sign In */}
          {isLoading ? (
            <div className="animate-pulse bg-gray-200 h-8 w-8 rounded-full"></div>
          ) : isAuthenticated && userProfile ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 h-8 px-2">
                  {userProfile.profile_image ? (
                    <img 
                      src={userProfile.profile_image} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover border-2 border-primary/20"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium border-2 border-primary/20">
                      {userProfile.email ? userProfile.email.substring(0, 2).toUpperCase() : 'U'}
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64 p-3">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {userProfile.profile_image ? (
                      <img 
                        src={userProfile.profile_image} 
                        alt="Profile" 
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-medium border-2 border-primary/20">
                        {userProfile.email ? userProfile.email.substring(0, 2).toUpperCase() : 'U'}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {userProfile.first_name && userProfile.last_name 
                          ? `${userProfile.first_name} ${userProfile.last_name}`
                          : userProfile.first_name || userProfile.email || 'User'
                        }
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {userProfile.email || 'No email'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-2 space-y-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-sm h-8"
                      onClick={() => navigateTo('/profile')}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      View Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-sm h-8"
                      onClick={() => navigateTo('/orders')}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      My Orders
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-sm h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        logout()
                        navigateTo('/')
                      }}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <SignIn />
          )}
          
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


