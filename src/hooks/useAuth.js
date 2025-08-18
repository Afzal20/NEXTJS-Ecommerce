import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { verifyAccessToken, getUserProfile, refreshAccessToken } from '@/lib/api'

export const useAuth = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuth = async () => {
    const accessToken = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')
    
    if (!accessToken && !refreshToken) {
      setIsLoading(false)
      setIsAuthenticated(false)
      setUserProfile(null)
      return
    }

    let currentAccessToken = accessToken

    try {
      // Try to verify current access token
      if (currentAccessToken) {
        try {
          await verifyAccessToken(currentAccessToken)
        } catch (verifyError) {
          console.log('Access token expired, attempting refresh...')
          
          // Access token is invalid, try to refresh it
          if (refreshToken) {
            try {
              const refreshResponse = await refreshAccessToken(refreshToken)
              currentAccessToken = refreshResponse.access_token
              
              // Save the new tokens
              Cookies.set('accessToken', currentAccessToken, { expires: 1 }) // 1 day
              if (refreshResponse.refresh_token) {
                Cookies.set('refreshToken', refreshResponse.refresh_token, { expires: 7 }) // 7 days
              }
              
              console.log('Token refreshed successfully')
            } catch (refreshError) {
              console.error('Failed to refresh token:', refreshError)
              throw refreshError
            }
          } else {
            throw verifyError
          }
        }
      } else if (refreshToken) {
        // No access token but have refresh token, try to get new access token
        try {
          const refreshResponse = await refreshAccessToken(refreshToken)
          currentAccessToken = refreshResponse.access_token
          
          // Save the new tokens
          Cookies.set('accessToken', currentAccessToken, { expires: 1 }) // 1 day
          if (refreshResponse.refresh_token) {
            Cookies.set('refreshToken', refreshResponse.refresh_token, { expires: 7 }) // 7 days
          }
          
          console.log('New access token obtained from refresh token')
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError)
          throw refreshError
        }
      }
      
      // Fetch user profile with valid access token
      const profileData = await getUserProfile(currentAccessToken)
      
      setUserProfile(profileData)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Authentication error:', error)
      // Clear all tokens on final failure
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      setUserProfile(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    setUserProfile(null)
    setIsAuthenticated(false)
  }

  const updateProfile = (newProfileData) => {
    setUserProfile(newProfileData)
  }

  // Function to get current valid access token (with automatic refresh if needed)
  const getValidAccessToken = async () => {
    const accessToken = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')
    
    if (!accessToken && !refreshToken) {
      throw new Error('No tokens available')
    }

    let currentAccessToken = accessToken

    try {
      // Try to verify current access token
      if (currentAccessToken) {
        try {
          await verifyAccessToken(currentAccessToken)
          return currentAccessToken
        } catch (verifyError) {
          console.log('Access token expired, attempting refresh...')
          
          // Access token is invalid, try to refresh it
          if (refreshToken) {
            const refreshResponse = await refreshAccessToken(refreshToken)
            currentAccessToken = refreshResponse.access_token
            
            // Save the new tokens
            Cookies.set('accessToken', currentAccessToken, { expires: 1 }) // 1 day
            if (refreshResponse.refresh_token) {
              Cookies.set('refreshToken', refreshResponse.refresh_token, { expires: 7 }) // 7 days
            }
            
            return currentAccessToken
          } else {
            throw verifyError
          }
        }
      } else if (refreshToken) {
        // No access token but have refresh token
        const refreshResponse = await refreshAccessToken(refreshToken)
        currentAccessToken = refreshResponse.access_token
        
        // Save the new tokens
        Cookies.set('accessToken', currentAccessToken, { expires: 1 }) // 1 day
        if (refreshResponse.refresh_token) {
          Cookies.set('refreshToken', refreshResponse.refresh_token, { expires: 7 }) // 7 days
        }
        
        return currentAccessToken
      }
    } catch (error) {
      // Clear all tokens on failure
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      setUserProfile(null)
      setIsAuthenticated(false)
      throw error
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return {
    userProfile,
    isAuthenticated,
    isLoading,
    logout,
    updateProfile,
    refreshAuth: checkAuth,
    getValidAccessToken
  }
}
