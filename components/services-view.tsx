"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Plus,
  Edit,
  Clock,
  DollarSign,
  Users,
  Star,
  Target,
  Dumbbell,
  Heart,
  Zap,
  Brain,
  MoreHorizontal,
  Eye,
  Copy,
  Share,
  Archive,
  Trash2,
  TrendingUp,
  Calendar,
  Filter,
  Search,
} from "lucide-react"

type ServiceView = "list" | "create" | "edit" | "analytics"

interface ServicesViewProps {
  onBack: () => void
}

export function ServicesView({ onBack }: ServicesViewProps) {
  const [currentView, setCurrentView] = useState<ServiceView>("list")
  const [selectedService, setSelectedService] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const services = [
    {
      id: 1,
      name: "Personal Training",
      category: "Strength",
      duration: 60,
      price: 75,
      description: "One-on-one strength and conditioning training tailored to your fitness goals",
      icon: Dumbbell,
      color: "blue",
      active: true,
      bookings: 45,
      revenue: 3375,
      rating: 4.9,
      clients: 12,
      equipment: ["Dumbbells", "Barbell", "Bench", "Resistance bands"],
      location: ["Studio A", "Client's Home"],
      tags: ["Beginner Friendly", "Weight Loss", "Muscle Building"],
    },
    {
      id: 2,
      name: "Yoga Session",
      category: "Flexibility",
      duration: 75,
      price: 65,
      description: "Relaxing yoga practice focusing on flexibility, balance, and mindfulness",
      icon: Heart,
      color: "green",
      active: true,
      bookings: 38,
      revenue: 2470,
      rating: 4.8,
      clients: 15,
      equipment: ["Yoga mat", "Blocks", "Straps", "Bolster"],
      location: ["Studio B", "Outdoor Park", "Virtual"],
      tags: ["Stress Relief", "Flexibility", "Mindfulness"],
    },
    {
      id: 3,
      name: "HIIT Training",
      category: "Cardio",
      duration: 45,
      price: 80,
      description: "High-intensity interval training for maximum calorie burn and fitness gains",
      icon: Zap,
      color: "orange",
      active: true,
      bookings: 32,
      revenue: 2560,
      rating: 4.7,
      clients: 10,
      equipment: ["Bodyweight", "Resistance bands", "Medicine ball"],
      location: ["Studio A", "Outdoor Park"],
      tags: ["Weight Loss", "Cardio", "High Intensity"],
    },
    {
      id: 4,
      name: "Pilates",
      category: "Core",
      duration: 60,
      price: 70,
      description: "Core-focused Pilates exercises for strength, stability, and posture improvement",
      icon: Target,
      color: "purple",
      active: true,
      bookings: 28,
      revenue: 1960,
      rating: 4.9,
      clients: 8,
      equipment: ["Mat", "Pilates ball", "Resistance bands", "Magic circle"],
      location: ["Studio B", "Client's Home"],
      tags: ["Core Strength", "Posture", "Low Impact"],
    },
    {
      id: 5,
      name: "Nutrition Consultation",
      category: "Consultation",
      duration: 30,
      price: 50,
      description: "Personalized nutrition guidance and meal planning consultation",
      icon: Brain,
      color: "teal",
      active: false,
      bookings: 15,
      revenue: 750,
      rating: 5.0,
      clients: 6,
      equipment: [],
      location: ["Virtual", "Studio A"],
      tags: ["Nutrition", "Meal Planning", "Health"],
    },
  ]

  const categories = [
    { id: "all", label: "All Services", count: services.length },
    { id: "Strength", label: "Strength", count: services.filter((s) => s.category === "Strength").length },
    { id: "Cardio", label: "Cardio", count: services.filter((s) => s.category === "Cardio").length },
    { id: "Flexibility", label: "Flexibility", count: services.filter((s) => s.category === "Flexibility").length },
    { id: "Core", label: "Core", count: services.filter((s) => s.category === "Core").length },
    { id: "Consultation", label: "Consultation", count: services.filter((s) => s.category === "Consultation").length },
  ]

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || service.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const totalRevenue = services.reduce((sum, service) => sum + service.revenue, 0)
  const totalBookings = services.reduce((sum, service) => sum + service.bookings, 0)
  const activeServices = services.filter((s) => s.active).length

  if (currentView === "create") {
    return <CreateService onBack={() => setCurrentView("list")} />
  }

  if (currentView === "edit" && selectedService) {
    return <EditService service={selectedService} onBack={() => setCurrentView("list")} />
  }

  if (currentView === "analytics") {
    return <ServiceAnalytics services={services} onBack={() => setCurrentView("list")} />
  }

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
              <p className="text-gray-600 mt-1">Manage your offerings</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentView("analytics")}>
              <TrendingUp className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={() => setCurrentView("create")}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <Target className="h-5 w-5 text-blue-600 mx-auto" />
              <p className="text-lg font-semibold text-gray-900">{activeServices}</p>
              <p className="text-xs text-gray-600">Active Services</p>
            </div>
            <div className="space-y-1">
              <Calendar className="h-5 w-5 text-green-600 mx-auto" />
              <p className="text-lg font-semibold text-gray-900">{totalBookings}</p>
              <p className="text-xs text-gray-600">Total Bookings</p>
            </div>
            <div className="space-y-1">
              <DollarSign className="h-5 w-5 text-purple-600 mx-auto" />
              <p className="text-lg font-semibold text-gray-900">${totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-gray-600">Revenue</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filterCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategory(category.id)}
                className={`whitespace-nowrap ${filterCategory !== category.id ? "bg-transparent" : ""}`}
              >
                {category.label}
                <Badge variant="secondary" className="ml-2 bg-gray-100 text-gray-600 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Services List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Your Services ({filteredServices.length})</CardTitle>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredServices.map((service) => {
            const IconComponent = service.icon
            return (
              <div key={service.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-lg bg-${service.color}-100`}>
                      <IconComponent className={`h-5 w-5 text-${service.color}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{service.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {service.category}
                        </Badge>
                        {!service.active && (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                            Inactive
                          </Badge>
                        )}
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
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{service.clients}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4" />
                          <span>{service.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{service.bookings}</p>
                    <p className="text-xs text-gray-600">Bookings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-green-600">${service.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Revenue</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-blue-600">{service.rating}</p>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {service.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {service.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{service.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => {
                      setSelectedService(service)
                      setCurrentView("edit")
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Copy className="h-4 w-4 mr-1" />
                    Duplicate
                  </Button>
                </div>
              </div>
            )
          })}

          {filteredServices.length === 0 && (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No services found</p>
              <Button className="mt-4" onClick={() => setCurrentView("create")}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Service
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="justify-start bg-transparent">
              <Share className="h-4 w-4 mr-2" />
              Share Services
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Archive className="h-4 w-4 mr-2" />
              Archived
            </Button>
          </div>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Create Service Component
function CreateService({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Strength",
    duration: 60,
    price: 75,
    description: "",
    equipment: [] as string[],
    location: [] as string[],
    tags: [] as string[],
  })

  const categories = ["Strength", "Cardio", "Flexibility", "Core", "Consultation", "Group", "Virtual"]
  const equipmentOptions = [
    "Dumbbells",
    "Barbell",
    "Bench",
    "Resistance bands",
    "Yoga mat",
    "Blocks",
    "Straps",
    "Medicine ball",
    "Kettlebells",
    "Foam roller",
    "Bodyweight",
  ]
  const locationOptions = ["Studio A", "Studio B", "Client's Home", "Outdoor Park", "Virtual"]

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log("Creating service:", formData)
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
              <h1 className="text-2xl font-semibold text-gray-900">Create Service</h1>
              <p className="text-gray-600 mt-1">Add a new service offering</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Personal Training"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your service..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Duration */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Pricing & Duration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: Number.parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equipment */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Equipment Needed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {equipmentOptions.map((equipment) => (
              <button
                key={equipment}
                onClick={() => {
                  const newEquipment = formData.equipment.includes(equipment)
                    ? formData.equipment.filter((e) => e !== equipment)
                    : [...formData.equipment, equipment]
                  setFormData({ ...formData, equipment: newEquipment })
                }}
                className={`p-2 rounded-lg border text-sm transition-colors ${
                  formData.equipment.includes(equipment)
                    ? "border-blue-500 bg-blue-50 text-blue-900"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                {equipment}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Locations */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Service Locations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {locationOptions.map((location) => (
              <button
                key={location}
                onClick={() => {
                  const newLocation = formData.location.includes(location)
                    ? formData.location.filter((l) => l !== location)
                    : [...formData.location, location]
                  setFormData({ ...formData, location: newLocation })
                }}
                className={`w-full p-3 rounded-lg border text-left transition-colors ${
                  formData.location.includes(location)
                    ? "border-blue-500 bg-blue-50 text-blue-900"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Edit Service Component
function EditService({ service, onBack }: { service: any; onBack: () => void }) {
  const [formData, setFormData] = useState({
    name: service.name,
    category: service.category,
    duration: service.duration,
    price: service.price,
    description: service.description,
    equipment: service.equipment,
    location: service.location,
    tags: service.tags,
    active: service.active,
  })

  const handleSave = () => {
    // In a real app, this would update the service
    console.log("Updating service:", formData)
    onBack()
  }

  const handleDelete = () => {
    // In a real app, this would delete the service
    console.log("Deleting service:", service.id)
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
              <h1 className="text-2xl font-semibold text-gray-900">Edit Service</h1>
              <p className="text-gray-600 mt-1">{service.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent text-red-600 border-red-200"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>

      {/* Service Status */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Service Status</p>
              <p className="text-sm text-gray-600">{formData.active ? "Active and bookable" : "Inactive and hidden"}</p>
            </div>
            <div className={`w-12 h-6 rounded-full relative ${formData.active ? "bg-blue-600" : "bg-gray-300"}`}>
              <button
                onClick={() => setFormData({ ...formData, active: !formData.active })}
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${formData.active ? "right-0.5" : "left-0.5"}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-900">{service.bookings}</p>
              <p className="text-sm text-blue-700">Total Bookings</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-900">${service.revenue.toLocaleString()}</p>
              <p className="text-sm text-green-700">Revenue</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-900">{service.clients}</p>
              <p className="text-sm text-purple-700">Active Clients</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-900">{service.rating}</p>
              <p className="text-sm text-yellow-700">Avg Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Form - Similar to Create Service but with existing data */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Service Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: Number.parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-0 shadow-sm border-red-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium text-red-900">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full bg-transparent text-red-600 border-red-200 hover:bg-red-50">
            <Archive className="h-4 w-4 mr-2" />
            Archive Service
          </Button>
          <Button
            variant="outline"
            className="w-full bg-transparent text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Service
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Service Analytics Component
function ServiceAnalytics({ services, onBack }: { services: any[]; onBack: () => void }) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Service Analytics</h1>
            <p className="text-gray-600 mt-1">Performance insights</p>
          </div>
        </div>
      </div>

      {/* Overall Performance */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Overall Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-900">{services.reduce((sum, s) => sum + s.bookings, 0)}</p>
              <p className="text-sm text-blue-700">Total Bookings</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-900">
                ${services.reduce((sum, s) => sum + s.revenue, 0).toLocaleString()}
              </p>
              <p className="text-sm text-green-700">Total Revenue</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Average Rating</span>
              <span className="font-medium">
                {(services.reduce((sum, s) => sum + s.rating, 0) / services.length).toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Active Services</span>
              <span className="font-medium">{services.filter((s) => s.active).length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Services */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Top Performing Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {services
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 3)
            .map((service, index) => (
              <div key={service.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.bookings} bookings</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${service.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{service.rating} ⭐</p>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Service Breakdown */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Service Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {services.map((service) => (
            <div key={service.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{service.name}</span>
                <span className="text-sm text-gray-600">${service.revenue.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${(service.revenue / Math.max(...services.map((s) => s.revenue))) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
