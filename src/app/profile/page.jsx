"use client"

import React, { useState, useMemo } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { updateUserProfile, updateUserProfileWithImage } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useInstantNavigation } from '@/hooks/usePageTransition'

const ProfilePage = () => {
  const { userProfile, isAuthenticated, isLoading, updateProfile, getValidAccessToken } = useAuth()
  const { navigateTo } = useInstantNavigation()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isProfileLoaded, setIsProfileLoaded] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    district: '',
    upozila: '',
    city: '',
    address: ''
  })

  // Memoize profile display values to prevent unnecessary re-renders
  const profileDisplayData = useMemo(() => {
    if (!userProfile) return null
    
    return {
      displayName: `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim() || 'User',
      profileImage: userProfile.profile_image,
      email: userProfile.email,
      initials: userProfile.email ? userProfile.email.substring(0, 2).toUpperCase() : 'U',
      userId: userProfile.user,
      createdAt: userProfile.created_at ? new Date(userProfile.created_at).toLocaleDateString() : 'N/A',
      updatedAt: userProfile.updated_at ? new Date(userProfile.updated_at).toLocaleDateString() : 'N/A'
    }
  }, [userProfile])

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Don't immediately redirect, show sign-in prompt instead
    }
  }, [isAuthenticated, isLoading])

  React.useEffect(() => {
    if (userProfile && !isEditing && !isProfileLoaded) {
      setFormData({
        first_name: userProfile.first_name || '',
        last_name: userProfile.last_name || '',
        phone_number: userProfile.phone_number || '',
        district: userProfile.district || '',
        upozila: userProfile.upozila || '',
        city: userProfile.city || '',
        address: userProfile.address || ''
      })
      setIsProfileLoaded(true)
    }
  }, [userProfile, isEditing, isProfileLoaded])

  const handleInputChange = React.useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const handleFileChange = React.useCallback((e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleSave = React.useCallback(async () => {
    try {
      setIsSaving(true)
      setMessage({ type: '', text: '' })
      
      const accessToken = await getValidAccessToken()
      
      let updatedProfile
      
      if (selectedFile) {
        // Upload with image
        const formDataWithFile = new FormData()
        Object.keys(formData).forEach(key => {
          if (formData[key]) {
            formDataWithFile.append(key, formData[key])
          }
        })
        formDataWithFile.append('profile_image', selectedFile)
        
        updatedProfile = await updateUserProfileWithImage(accessToken, formDataWithFile)
      } else {
        // Update without image
        updatedProfile = await updateUserProfile(accessToken, formData)
      }
      
      updateProfile(updatedProfile)
      setIsEditing(false)
      setSelectedFile(null)
      setPreviewImage(null)
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' })
      }, 5000)
      
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }, [formData, selectedFile, getValidAccessToken, updateProfile])

  const handleCancel = React.useCallback(() => {
    setIsEditing(false)
    setSelectedFile(null)
    setPreviewImage(null)
    setMessage({ type: '', text: '' })
    // Reset form data
    if (userProfile) {
      setFormData({
        first_name: userProfile.first_name || '',
        last_name: userProfile.last_name || '',
        phone_number: userProfile.phone_number || '',
        district: userProfile.district || '',
        upozila: userProfile.upozila || '',
        city: userProfile.city || '',
        address: userProfile.address || ''
      })
    }
  }, [userProfile])

  if (isLoading || !isProfileLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="bg-gray-200 rounded-lg h-96"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Sign In Required</h1>
          <p className="text-muted-foreground mb-6">
            Please sign in to your account to view your profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigateTo('/signin?redirect=/profile')} size="lg">
              Sign In
            </Button>
            <Button variant="outline" onClick={() => navigateTo('/signup')} size="lg">
              Create Account
            </Button>
          </div>
          <div className="mt-8">
            <Button variant="ghost" onClick={() => navigateTo('/')}>
              ← Back to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Profile</h1>
          {isEditing && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </div>

        {/* Message */}
        {message.text && (
          <div className={`p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Image & Basic Info */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  {previewImage || profileDisplayData?.profileImage ? (
                    <img 
                      src={previewImage || profileDisplayData.profileImage} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold border-4 border-primary/20">
                      {profileDisplayData?.initials || 'U'}
                    </div>
                  )}
                </div>
                
                {isEditing && (
                  <div className="w-full">
                    <Label htmlFor="profile-image" className="cursor-pointer">
                      <div className="flex items-center justify-center w-full p-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Upload Photo
                      </div>
                    </Label>
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">User ID</span>
                  <Badge variant="secondary">#{profileDisplayData?.userId}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Email</span>
                  <span className="text-sm text-muted-foreground">{profileDisplayData?.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Member Since</span>
                  <span className="text-sm text-muted-foreground">{profileDisplayData?.createdAt}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Updated</span>
                  <span className="text-sm text-muted-foreground">{profileDisplayData?.updatedAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Personal Information</CardTitle>
                {!isEditing && (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name Section */}
              <div className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                      {!isEditing && (
                        <span className="text-sm text-muted-foreground">
                          {profileDisplayData?.email}
                        </span>
                      )}
                    </div>
                    {isEditing ? (
                      <div className="grid gap-3 md:grid-cols-2">
                        <Input
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          placeholder="First name"
                          className="h-10"
                        />
                        <Input
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          placeholder="Last name"
                          className="h-10"
                        />
                      </div>
                    ) : (
                      <div className="text-base font-medium">
                        {profileDisplayData?.displayName || 'Not provided'}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Email account</Label>
                    <div className="text-base">
                      {profileDisplayData?.email || 'Not provided'}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Contact Information</h4>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Mobile number</Label>
                    {isEditing ? (
                      <Input
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        placeholder="Add number"
                        className="h-10"
                      />
                    ) : (
                      <div className="text-base">
                        {userProfile?.phone_number || (
                          <span className="text-muted-foreground">Add number</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                    {isEditing ? (
                      <div className="grid gap-3 md:grid-cols-2">
                        <Input
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          className="h-10"
                        />
                        <Input
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          placeholder="District"
                          className="h-10"
                        />
                      </div>
                    ) : (
                      <div className="text-base">
                        {userProfile?.city && userProfile?.district 
                          ? `${userProfile.city}, ${userProfile.district}` 
                          : userProfile?.city || userProfile?.district || (
                            <span className="text-muted-foreground">Add location</span>
                          )
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Address Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Address Details</h4>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Upozila</Label>
                    {isEditing ? (
                      <Input
                        name="upozila"
                        value={formData.upozila}
                        onChange={handleInputChange}
                        placeholder="Enter upozila"
                        className="h-10"
                      />
                    ) : (
                      <div className="text-base">
                        {userProfile?.upozila || (
                          <span className="text-muted-foreground">Not provided</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-sm font-medium text-muted-foreground">Full Address</Label>
                    {isEditing ? (
                      <Textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your full address"
                        rows={3}
                        className="resize-none"
                      />
                    ) : (
                      <div className="text-base min-h-[60px] p-3 rounded-md border bg-muted/30">
                        {userProfile?.address || (
                          <span className="text-muted-foreground">Not provided</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons for Editing */}
              {isEditing && (
                <>
                  <Separator />
                  <div className="flex justify-end gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSave} 
                      disabled={isSaving}
                      className="px-6"
                    >
                      {isSaving ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </div>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2"
                onClick={() => navigateTo('/orders')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                View Orders
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2"
                onClick={() => navigateTo('/change-password')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Change Password
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2"
                onClick={() => navigateTo('/wishlist')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Wishlist
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage