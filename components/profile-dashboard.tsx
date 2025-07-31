"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Bell,
  CreditCard,
  Shield,
  HelpCircle,
  Star,
  Calendar,
  DollarSign,
  Users,
  BarChart3,
  Camera,
  Edit,
  Phone,
  Mail,
  ChevronRight,
  LogOut,
  Download,
  Share,
  Clock,
  Target,
  Award,
  Briefcase,
  MessageCircle,
  Plus,
  MoreHorizontal,
} from "lucide-react"

type ProfileView =
  | "main"
  | "edit-profile"
  | "business-settings"
  | "notification-settings"
  | "payment-settings"
  | "privacy-settings"
  | "help-support"
  | "services-management"

interface ProfileDashboardProps {
  onBack: () => void
}

export function ProfileDashboard({ onBack }: ProfileDashboardProps) {
  const [currentView, setCurrentView] = useState<ProfileView>("main")
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    title: "Certified Personal Trainer",
    bio: "Passionate fitness trainer with 5+ years of experience helping clients achieve their health and wellness goals.",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    email: "sarah@trainermatch.com",
    website: "www.sarahfitness.com",
    certifications: ["NASM-CPT", "Yoga Alliance RYT-200", "HIIT Specialist"],
    specialties: ["Weight Loss", "Strength Training", "Yoga", "HIIT"],
    experience: "5+ years",
    languages: ["English", "Spanish"],
    socialMedia: {
      instagram: "@sarahfitness",
      facebook: "Sarah Johnson Fitness",
      twitter: "@sarahtrainer",
    },
  })

  if (currentView === "edit-profile") {
    return (
      <EditProfile profileData={profileData} setProfileData={setProfileData} onBack={() => setCurrentView("main")} />
    )
  }

  if (currentView === "business-settings") {
    return <BusinessSettings onBack={() => setCurrentView("main")} />
  }

  if (currentView === "notification-settings") {
    return <NotificationSettings onBack={() => setCurrentView("main")} />
  }

  if (currentView === "payment-settings") {
    return <PaymentSettings onBack={() => setCurrentView("main")} />
  }

  if (currentView === "privacy-settings") {
    return <PrivacySettings onBack={() => setCurrentView("main")} />
  }

  if (currentView === "help-support") {
    return <HelpSupport onBack={() => setCurrentView("main")} />
  }

  if (currentView === "services-management") {
    return <ServicesManagement onBack={() => setCurrentView("main")} />
  }

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-1">Manage your account</p>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl">SJ</AvatarFallback>
              </Avatar>
              <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{profileData.name}</h2>
              <p className="text-gray-600">{profileData.title}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <Star className="h-3 w-3 mr-1" />
                  4.9 Rating
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Verified
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full mt-4 bg-transparent"
            onClick={() => setCurrentView("edit-profile")}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <Users className="h-5 w-5 text-blue-600 mx-auto" />
              <p className="text-lg font-semibold text-gray-900">24</p>
              <p className="text-xs text-gray-600">Clients</p>
            </div>
            <div className="space-y-1">
              <Calendar className="h-5 w-5 text-green-600 mx-auto" />
              <p className="text-lg font-semibold text-gray-900">156</p>
              <p className="text-xs text-gray-600">Sessions</p>
            </div>
            <div className="space-y-1">
              <Star className="h-5 w-5 text-yellow-600 mx-auto" />
              <p className="text-lg font-semibold text-gray-900">4.9</p>
              <p className="text-xs text-gray-600">Rating</p>
            </div>
            <div className="space-y-1">
              <Award className="h-5 w-5 text-purple-600 mx-auto" />
              <p className="text-lg font-semibold text-gray-900">3</p>
              <p className="text-xs text-gray-600">Certs</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <button
            className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            onClick={() => setCurrentView("business-settings")}
          >
            <div className="flex items-center space-x-3">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Business Settings</p>
                <p className="text-sm text-gray-600">Services, pricing, availability</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>

          <button
            className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            onClick={() => setCurrentView("notification-settings")}
          >
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-orange-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Notifications</p>
                <p className="text-sm text-gray-600">Alerts and reminders</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>

          <button
            className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            onClick={() => setCurrentView("payment-settings")}
          >
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Payment & Billing</p>
                <p className="text-sm text-gray-600">Payment methods, invoices</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>

          <button
            className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            onClick={() => setCurrentView("privacy-settings")}
          >
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-purple-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Privacy & Security</p>
                <p className="text-sm text-gray-600">Data protection, security</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </CardContent>
      </Card>

      {/* Services Management */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Services & Business</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <button
            className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            onClick={() => setCurrentView("services-management")}
          >
            <div className="flex items-center space-x-3">
              <Target className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Manage Services</p>
                <p className="text-sm text-gray-600">Add, edit, and price your services</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>

          <button className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Analytics</p>
                <p className="text-sm text-gray-600">Performance insights</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>

          <button className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Share className="h-5 w-5 text-purple-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Share Profile</p>
                <p className="text-sm text-gray-600">Social media, referrals</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </CardContent>
      </Card>

      {/* Support & Help */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Support & Help</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <button
            className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            onClick={() => setCurrentView("help-support")}
          >
            <div className="flex items-center space-x-3">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Help Center</p>
                <p className="text-sm text-gray-600">FAQs, tutorials, support</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>

          <button className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Download className="h-5 w-5 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Export Data</p>
                <p className="text-sm text-gray-600">Download your information</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Button variant="outline" className="w-full bg-transparent text-red-600 border-red-200 hover:bg-red-50">
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  )
}

// Edit Profile Component
function EditProfile({ profileData, setProfileData, onBack }: any) {
  const [formData, setFormData] = useState(profileData)

  const handleSave = () => {
    setProfileData(formData)
    onBack()
  }

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Edit Profile</h1>
              <p className="text-gray-600 mt-1">Update your information</p>
            </div>
          </div>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>

      {/* Basic Information */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Professional Details */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Professional Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <select
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1-2 years">1-2 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years">5+ years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialties</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.specialties.map((specialty: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
              <Edit className="h-4 w-4 mr-1" />
              Edit Specialties
            </Button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.certifications.map((cert: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                  {cert}
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
              <Edit className="h-4 w-4 mr-1" />
              Manage Certifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Business Settings Component
function BusinessSettings({ onBack }: { onBack: () => void }) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Business Settings</h1>
            <p className="text-gray-600 mt-1">Configure your business</p>
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Business Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
            <div key={day} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{day}</span>
              <div className="flex items-center space-x-2">
                <input type="time" defaultValue="09:00" className="px-2 py-1 border border-gray-300 rounded text-xs" />
                <span className="text-gray-500">-</span>
                <input type="time" defaultValue="18:00" className="px-2 py-1 border border-gray-300 rounded text-xs" />
                <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Booking Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Booking Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Auto-accept bookings</p>
              <p className="text-sm text-gray-600">Automatically confirm session requests</p>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Advance booking</p>
              <p className="text-sm text-gray-600">How far in advance clients can book</p>
            </div>
            <select className="px-3 py-1 border border-gray-300 rounded text-sm">
              <option>1 week</option>
              <option>2 weeks</option>
              <option>1 month</option>
              <option>3 months</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Cancellation policy</p>
              <p className="text-sm text-gray-600">Minimum notice for cancellations</p>
            </div>
            <select className="px-3 py-1 border border-gray-300 rounded text-sm">
              <option>24 hours</option>
              <option>48 hours</option>
              <option>72 hours</option>
              <option>1 week</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Location Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Service Locations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "Studio A", address: "123 Fitness St, San Francisco", active: true },
            { name: "Outdoor Park", address: "Golden Gate Park", active: true },
            { name: "Client's Home", address: "Various locations", active: true },
            { name: "Virtual Sessions", address: "Online", active: false },
          ].map((location, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{location.name}</p>
                <p className="text-sm text-gray-600">{location.address}</p>
              </div>
              <div className={`w-12 h-6 rounded-full relative ${location.active ? "bg-blue-600" : "bg-gray-300"}`}>
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 ${location.active ? "right-0.5" : "left-0.5"}`}
                ></div>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full bg-transparent">
            Add New Location
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Notification Settings Component
function NotificationSettings({ onBack }: { onBack: () => void }) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">Manage your alerts</p>
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Push Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Session Reminders</p>
              <p className="text-sm text-gray-600">30 minutes before sessions</p>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">New Bookings</p>
              <p className="text-sm text-gray-600">When clients book sessions</p>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Payment Received</p>
              <p className="text-sm text-gray-600">Payment confirmations</p>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Cancellations</p>
              <p className="text-sm text-gray-600">When sessions are cancelled</p>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Email Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Weekly Summary</p>
              <p className="text-sm text-gray-600">Weekly performance report</p>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Monthly Report</p>
              <p className="text-sm text-gray-600">Detailed monthly analytics</p>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Marketing Tips</p>
              <p className="text-sm text-gray-600">Business growth suggestions</p>
            </div>
            <div className="w-12 h-6 bg-gray-300 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Quiet Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Enable Quiet Hours</p>
              <p className="text-sm text-gray-600">Pause notifications during set hours</p>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">From</span>
            <input type="time" defaultValue="22:00" className="px-3 py-1 border border-gray-300 rounded text-sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">To</span>
            <input type="time" defaultValue="08:00" className="px-3 py-1 border border-gray-300 rounded text-sm" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Payment Settings Component
function PaymentSettings({ onBack }: { onBack: () => void }) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Payment & Billing</h1>
            <p className="text-gray-600 mt-1">Manage payment methods</p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Accepted Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { method: "Credit/Debit Cards", description: "Visa, Mastercard, American Express", enabled: true },
            { method: "PayPal", description: "PayPal payments", enabled: true },
            { method: "Bank Transfer", description: "Direct bank transfers", enabled: false },
            { method: "Cash", description: "Cash payments", enabled: true },
            { method: "Venmo", description: "Venmo payments", enabled: false },
          ].map((payment, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{payment.method}</p>
                <p className="text-sm text-gray-600">{payment.description}</p>
              </div>
              <div className={`w-12 h-6 rounded-full relative ${payment.enabled ? "bg-blue-600" : "bg-gray-300"}`}>
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 ${payment.enabled ? "right-0.5" : "left-0.5"}`}
                ></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payout Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Payout Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account</label>
            <div className="p-3 border border-gray-200 rounded-lg">
              <p className="font-medium text-gray-900">Wells Fargo ****1234</p>
              <p className="text-sm text-gray-600">Primary account</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Automatic Payouts</p>
              <p className="text-sm text-gray-600">Weekly automatic transfers</p>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">Payout Day</span>
            <select className="px-3 py-1 border border-gray-300 rounded text-sm">
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Pricing & Fees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Late Cancellation Fee</p>
              <p className="text-sm text-gray-600">Fee for cancellations within 24 hours</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">$</span>
              <input
                type="number"
                defaultValue="25"
                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">No-Show Fee</p>
              <p className="text-sm text-gray-600">Fee for missed sessions</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">$</span>
              <input
                type="number"
                defaultValue="50"
                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Package Discount</p>
              <p className="text-sm text-gray-600">Discount for session packages</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                defaultValue="10"
                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <span className="text-sm">%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Privacy Settings Component
function PrivacySettings({ onBack }: { onBack: () => void }) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Privacy & Security</h1>
            <p className="text-gray-600 mt-1">Protect your account</p>
          </div>
        </div>
      </div>

      {/* Profile Visibility */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Profile Visibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Public Profile</p>
              <p className="text-sm text-gray-600">Show profile in search results</p>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Show Contact Info</p>
              <p className="text-sm text-gray-600">Display phone and email publicly</p>
            </div>
            <div className="w-12 h-6 bg-gray-300 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Show Reviews</p>
              <p className="text-sm text-gray-600">Display client reviews</p>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Data & Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <button className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Download className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Download My Data</p>
                <p className="text-sm text-gray-600">Export all your information</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
          <button className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Privacy Policy</p>
                <p className="text-sm text-gray-600">Review our privacy practices</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
          <button className="flex items-center justify-between w-full p-3 rounded-lg border border-red-200 hover:bg-red-50 transition-colors">
            <div className="flex items-center space-x-3">
              <LogOut className="h-5 w-5 text-red-600" />
              <div className="text-left">
                <p className="font-medium text-red-900">Delete Account</p>
                <p className="text-sm text-red-600">Permanently delete your account</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-red-400" />
          </button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add extra security to your account</p>
            </div>
            <div className="w-12 h-6 bg-gray-300 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
            </div>
          </div>
          <button className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="text-left">
              <p className="font-medium text-gray-900">Change Password</p>
              <p className="text-sm text-gray-600">Update your password</p>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
          <div>
            <p className="font-medium text-gray-900 mb-2">Active Sessions</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <p className="text-sm font-medium">iPhone 14 Pro</p>
                  <p className="text-xs text-gray-600">Current session • San Francisco, CA</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <p className="text-sm font-medium">MacBook Pro</p>
                  <p className="text-xs text-gray-600">2 days ago • San Francisco, CA</p>
                </div>
                <Button variant="ghost" size="sm" className="text-red-600">
                  Revoke
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Help Support Component
function HelpSupport({ onBack }: { onBack: () => void }) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Help & Support</h1>
            <p className="text-gray-600 mt-1">Get help when you need it</p>
          </div>
        </div>
      </div>

      {/* Quick Help */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Quick Help</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <button className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Getting Started Guide</p>
                <p className="text-sm text-gray-600">Learn the basics</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
          <button className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Managing Sessions</p>
                <p className="text-sm text-gray-600">Booking, scheduling, cancellations</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
          <button className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Payments & Billing</p>
                <p className="text-sm text-gray-600">Payment methods, payouts, fees</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start">
            <MessageCircle className="h-4 w-4 mr-2" />
            Live Chat Support
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Mail className="h-4 w-4 mr-2" />
            Email Support
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Phone className="h-4 w-4 mr-2" />
            Call Support
          </Button>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            "How do I set my availability?",
            "What payment methods are accepted?",
            "How do I handle cancellations?",
            "Can I offer virtual sessions?",
            "How do I get more clients?",
          ].map((question, index) => (
            <button
              key={index}
              className="flex items-center justify-between w-full p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors text-left"
            >
              <p className="text-sm text-gray-900">{question}</p>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          ))}
        </CardContent>
      </Card>

      {/* App Info */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6 text-center">
          <p className="text-sm text-gray-600">TrainerMatch v2.1.0</p>
          <p className="text-xs text-gray-500 mt-1">© 2024 TrainerMatch. All rights reserved.</p>
        </CardContent>
      </Card>
    </div>
  )
}

// Services Management Component
function ServicesManagement({ onBack }: { onBack: () => void }) {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Personal Training",
      duration: 60,
      price: 75,
      description: "One-on-one strength and conditioning",
      active: true,
      category: "Strength",
    },
    {
      id: 2,
      name: "Yoga Session",
      duration: 75,
      price: 65,
      description: "Flexibility and mindfulness practice",
      active: true,
      category: "Flexibility",
    },
    {
      id: 3,
      name: "HIIT Training",
      duration: 45,
      price: 80,
      description: "High-intensity interval training",
      active: true,
      category: "Cardio",
    },
    {
      id: 4,
      name: "Nutrition Consultation",
      duration: 30,
      price: 50,
      description: "Dietary planning and guidance",
      active: false,
      category: "Consultation",
    },
  ])

  const toggleService = (id: number) => {
    setServices((prev) =>
      prev.map((service) => (service.id === id ? { ...service, active: !service.active } : service)),
    )
  }

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Manage Services</h1>
              <p className="text-gray-600 mt-1">Configure your offerings</p>
            </div>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      {/* Services List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Your Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {services.map((service) => (
            <div key={service.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {service.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>${service.price}</span>
                    </div>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full relative ${service.active ? "bg-blue-600" : "bg-gray-300"}`}>
                  <button
                    onClick={() => toggleService(service.id)}
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${service.active ? "right-0.5" : "left-0.5"}`}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Service Categories */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Service Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {["Strength", "Cardio", "Flexibility", "Consultation", "Group", "Virtual"].map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Plus className="h-4 w-4 mr-1" />
            Add Category
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export Service List
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Share className="h-4 w-4 mr-2" />
            Share Services
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <BarChart3 className="h-4 w-4 mr-2" />
            Service Analytics
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
