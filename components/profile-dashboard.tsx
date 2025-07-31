"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Settings,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  Edit,
  Camera,
  MapPin,
  Calendar,
  Star,
  Award,
  Users,
  DollarSign,
  Clock,
  ChevronRight,
  Save,
  X,
  Plus,
  Trash2,
} from "lucide-react"

type ProfileView =
  | "main"
  | "edit"
  | "settings"
  | "certifications"
  | "availability"
  | "rates"
  | "notifications"
  | "privacy"
  | "billing"
  | "help"

export function ProfileDashboard() {
  const [currentView, setCurrentView] = useState<ProfileView>("main")
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Certified personal trainer with 8+ years of experience specializing in strength training, HIIT, and yoga. Passionate about helping clients achieve their fitness goals through personalized training programs.",
    specialties: ["Strength Training", "HIIT", "Yoga", "Pilates", "Nutrition Coaching"],
    experience: "8 years",
    rating: 4.9,
    totalClients: 45,
    completedSessions: 1250,
    monthlyEarnings: 4500,
  })

  const [certifications, setCertifications] = useState([
    { id: 1, name: "NASM Certified Personal Trainer", issuer: "NASM", date: "2020-03-15", expires: "2024-03-15" },
    { id: 2, name: "Yoga Alliance RYT-200", issuer: "Yoga Alliance", date: "2019-08-20", expires: "2025-08-20" },
    {
      id: 3,
      name: "Precision Nutrition Level 1",
      issuer: "Precision Nutrition",
      date: "2021-01-10",
      expires: "2025-01-10",
    },
  ])

  const [availability, setAvailability] = useState({
    monday: { enabled: true, start: "06:00", end: "20:00" },
    tuesday: { enabled: true, start: "06:00", end: "20:00" },
    wednesday: { enabled: true, start: "06:00", end: "20:00" },
    thursday: { enabled: true, start: "06:00", end: "20:00" },
    friday: { enabled: true, start: "06:00", end: "20:00" },
    saturday: { enabled: true, start: "08:00", end: "16:00" },
    sunday: { enabled: false, start: "08:00", end: "16:00" },
  })

  const [rates, setRates] = useState({
    personalTraining: 85,
    groupTraining: 45,
    yoga: 65,
    hiit: 75,
    nutritionConsulting: 95,
    packageDiscount: 10,
  })

  if (currentView === "edit") {
    return (
      <EditProfile profileData={profileData} setProfileData={setProfileData} onBack={() => setCurrentView("main")} />
    )
  }

  if (currentView === "certifications") {
    return (
      <CertificationsView
        certifications={certifications}
        setCertifications={setCertifications}
        onBack={() => setCurrentView("main")}
      />
    )
  }

  if (currentView === "availability") {
    return (
      <AvailabilityView
        availability={availability}
        setAvailability={setAvailability}
        onBack={() => setCurrentView("main")}
      />
    )
  }

  if (currentView === "rates") {
    return <RatesView rates={rates} setRates={setRates} onBack={() => setCurrentView("main")} />
  }

  if (currentView === "settings") {
    return <SettingsView onBack={() => setCurrentView("main")} />
  }

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8">
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Manage your trainer profile and settings</p>
      </div>

      {/* Profile Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl">SJ</AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0"
                onClick={() => setCurrentView("edit")}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{profileData.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{profileData.rating}</span>
                <span className="text-sm text-gray-600">({profileData.totalClients} clients)</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{profileData.location}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={() => setCurrentView("edit")}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Performance Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">{profileData.totalClients}</span>
              </div>
              <p className="text-sm text-gray-600">Active Clients</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Award className="h-4 w-4 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">{profileData.completedSessions}</span>
              </div>
              <p className="text-sm text-gray-600">Sessions Completed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <DollarSign className="h-4 w-4 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900">${profileData.monthlyEarnings}</span>
              </div>
              <p className="text-sm text-gray-600">Monthly Earnings</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-2xl font-bold text-gray-900">{profileData.experience}</span>
              </div>
              <p className="text-sm text-gray-600">Experience</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specialties */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Specialties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profileData.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700">
                {specialty}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="space-y-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setCurrentView("certifications")}
            >
              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Certifications</p>
                  <p className="text-sm text-gray-600">{certifications.length} active certifications</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setCurrentView("availability")}
            >
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Availability</p>
                  <p className="text-sm text-gray-600">Set your working hours</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setCurrentView("rates")}>
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Rates & Pricing</p>
                  <p className="text-sm text-gray-600">Manage your service rates</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setCurrentView("settings")}
            >
              <div className="flex items-center space-x-3">
                <Settings className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Settings</p>
                  <p className="text-sm text-gray-600">App preferences and privacy</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center space-x-3">
                <HelpCircle className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Help & Support</p>
                  <p className="text-sm text-gray-600">Get help and contact support</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center space-x-3">
                <LogOut className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-600">Sign Out</p>
                  <p className="text-sm text-gray-600">Sign out of your account</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

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
              <X className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900">Edit Profile</h1>
          </div>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Location</label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Professional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg text-sm"
              rows={4}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Years of Experience</label>
            <Input
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Specialties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {formData.specialties.map((specialty: string, index: number) => (
              <div key={index} className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                <span className="text-sm">{specialty}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-blue-200"
                  onClick={() => {
                    const newSpecialties = formData.specialties.filter((_: any, i: number) => i !== index)
                    setFormData({ ...formData, specialties: newSpecialties })
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Specialty
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function CertificationsView({ certifications, setCertifications, onBack }: any) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <X className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Certifications</h1>
        </div>
      </div>

      <Button className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Certification
      </Button>

      <div className="space-y-3">
        {certifications.map((cert: any) => (
          <Card key={cert.id} className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{cert.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Issued by {cert.issuer}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>Issued: {new Date(cert.date).toLocaleDateString()}</span>
                    <span>Expires: {new Date(cert.expires).toLocaleDateString()}</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`mt-2 ${
                      new Date(cert.expires) > new Date() ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {new Date(cert.expires) > new Date() ? "Active" : "Expired"}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AvailabilityView({ availability, setAvailability, onBack }: any) {
  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ]

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <X className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Availability</h1>
        </div>
      </div>

      <div className="space-y-3">
        {days.map((day) => (
          <Card key={day.key} className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{day.label}</span>
                  <Switch
                    checked={availability[day.key].enabled}
                    onCheckedChange={(checked) =>
                      setAvailability({
                        ...availability,
                        [day.key]: { ...availability[day.key], enabled: checked },
                      })
                    }
                  />
                </div>
                {availability[day.key].enabled && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-600">Start Time</label>
                      <input
                        type="time"
                        value={availability[day.key].start}
                        onChange={(e) =>
                          setAvailability({
                            ...availability,
                            [day.key]: { ...availability[day.key], start: e.target.value },
                          })
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">End Time</label>
                      <input
                        type="time"
                        value={availability[day.key].end}
                        onChange={(e) =>
                          setAvailability({
                            ...availability,
                            [day.key]: { ...availability[day.key], end: e.target.value },
                          })
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function RatesView({ rates, setRates, onBack }: any) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <X className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Rates & Pricing</h1>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Service Rates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(rates).map(([service, rate]) => {
            if (service === "packageDiscount") return null
            return (
              <div key={service} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 capitalize">{service.replace(/([A-Z])/g, " $1").trim()}</p>
                  <p className="text-sm text-gray-600">Per session</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">$</span>
                  <Input
                    type="number"
                    value={rate}
                    onChange={(e) => setRates({ ...rates, [service]: Number.parseInt(e.target.value) || 0 })}
                    className="w-20 text-center"
                  />
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Package Discounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Package Discount</p>
              <p className="text-sm text-gray-600">Discount for 5+ session packages</p>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={rates.packageDiscount}
                onChange={(e) => setRates({ ...rates, packageDiscount: Number.parseInt(e.target.value) || 0 })}
                className="w-16 text-center"
              />
              <span className="text-sm text-gray-600">%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full">
        <Save className="h-4 w-4 mr-2" />
        Save Changes
      </Button>
    </div>
  )
}

function SettingsView({ onBack }: any) {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    autoAcceptBookings: false,
    requirePaymentUpfront: true,
    allowCancellations: true,
    cancellationWindow: 24,
    dataSync: true,
    locationServices: true,
    analytics: true,
  })

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <X className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        </div>
      </div>

      {/* App Preferences */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">App Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Dark Mode</p>
              <p className="text-xs text-gray-600">Use dark theme</p>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Push Notifications</p>
              <p className="text-xs text-gray-600">Receive app notifications</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Business Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Business Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Auto-Accept Bookings</p>
              <p className="text-xs text-gray-600">Automatically accept new booking requests</p>
            </div>
            <Switch
              checked={settings.autoAcceptBookings}
              onCheckedChange={(checked) => setSettings({ ...settings, autoAcceptBookings: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Require Payment Upfront</p>
              <p className="text-xs text-gray-600">Require payment before session</p>
            </div>
            <Switch
              checked={settings.requirePaymentUpfront}
              onCheckedChange={(checked) => setSettings({ ...settings, requirePaymentUpfront: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Allow Cancellations</p>
              <p className="text-xs text-gray-600">Allow clients to cancel sessions</p>
            </div>
            <Switch
              checked={settings.allowCancellations}
              onCheckedChange={(checked) => setSettings({ ...settings, allowCancellations: checked })}
            />
          </div>
          {settings.allowCancellations && (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Cancellation Window</p>
                <p className="text-xs text-gray-600">Hours before session</p>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={settings.cancellationWindow}
                  onChange={(e) =>
                    setSettings({ ...settings, cancellationWindow: Number.parseInt(e.target.value) || 24 })
                  }
                  className="w-16 text-center"
                />
                <span className="text-sm text-gray-600">hrs</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy & Data */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Privacy & Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Data Sync</p>
              <p className="text-xs text-gray-600">Sync data across devices</p>
            </div>
            <Switch
              checked={settings.dataSync}
              onCheckedChange={(checked) => setSettings({ ...settings, dataSync: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Location Services</p>
              <p className="text-xs text-gray-600">Use location for nearby clients</p>
            </div>
            <Switch
              checked={settings.locationServices}
              onCheckedChange={(checked) => setSettings({ ...settings, locationServices: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Analytics</p>
              <p className="text-xs text-gray-600">Share usage data to improve app</p>
            </div>
            <Switch
              checked={settings.analytics}
              onCheckedChange={(checked) => setSettings({ ...settings, analytics: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full bg-transparent">
            <Shield className="h-4 w-4 mr-2" />
            Privacy Policy
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing & Payments
          </Button>
          <Button variant="outline" className="w-full bg-transparent text-red-600 border-red-200 hover:bg-red-50">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
