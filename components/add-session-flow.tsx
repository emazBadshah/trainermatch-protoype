"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Clock,
  MapPin,
  DollarSign,
  Calendar,
  Search,
  Plus,
  CheckCircle2,
  Dumbbell,
  Target,
  MessageCircle,
  Save,
} from "lucide-react"

type AddSessionStep = "client-selection" | "service-selection" | "datetime-selection" | "details" | "confirmation"

interface AddSessionFlowProps {
  initialStep: AddSessionStep
  onBack: () => void
  onComplete: (sessionData: any) => void
}

export function AddSessionFlow({ initialStep, onBack, onComplete }: AddSessionFlowProps) {
  const [currentStep, setCurrentStep] = useState<AddSessionStep>(initialStep)
  const [sessionData, setSessionData] = useState({
    client: null as any,
    service: null as any,
    date: "",
    time: "",
    duration: 60,
    location: "",
    price: 0,
    notes: "",
    equipment: [] as string[],
  })

  const updateSessionData = (updates: Partial<typeof sessionData>) => {
    setSessionData((prev) => ({ ...prev, ...updates }))
  }

  if (currentStep === "client-selection") {
    return (
      <ClientSelection
        onNext={(client) => {
          updateSessionData({ client })
          setCurrentStep("service-selection")
        }}
        onBack={onBack}
      />
    )
  }

  if (currentStep === "service-selection") {
    return (
      <ServiceSelection
        client={sessionData.client}
        onNext={(service) => {
          updateSessionData({ service, price: service.price, duration: service.duration })
          setCurrentStep("datetime-selection")
        }}
        onBack={() => setCurrentStep("client-selection")}
      />
    )
  }

  if (currentStep === "datetime-selection") {
    return (
      <DateTimeSelection
        sessionData={sessionData}
        onNext={(dateTime) => {
          updateSessionData(dateTime)
          setCurrentStep("details")
        }}
        onBack={() => setCurrentStep("service-selection")}
      />
    )
  }

  if (currentStep === "details") {
    return (
      <SessionDetails
        sessionData={sessionData}
        onNext={(details) => {
          updateSessionData(details)
          setCurrentStep("confirmation")
        }}
        onBack={() => setCurrentStep("datetime-selection")}
        onUpdateData={updateSessionData}
      />
    )
  }

  if (currentStep === "confirmation") {
    return (
      <SessionConfirmation
        sessionData={sessionData}
        onConfirm={() => onComplete(sessionData)}
        onBack={() => setCurrentStep("details")}
      />
    )
  }

  return null
}

function ClientSelection({ onNext, onBack }: any) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClient, setSelectedClient] = useState<any>(null)

  const clients = [
    {
      id: 1,
      name: "Emma L.",
      avatar: "EL",
      lastSession: "2 days ago",
      totalSessions: 12,
      preferredServices: ["Yoga", "Pilates"],
      status: "active",
    },
    {
      id: 2,
      name: "John D.",
      avatar: "JD",
      lastSession: "1 week ago",
      totalSessions: 8,
      preferredServices: ["Strength Training", "HIIT"],
      status: "active",
    },
    {
      id: 3,
      name: "Sarah K.",
      avatar: "SK",
      lastSession: "3 days ago",
      totalSessions: 15,
      preferredServices: ["HIIT", "Cardio"],
      status: "active",
    },
    {
      id: 4,
      name: "Mike R.",
      avatar: "MR",
      lastSession: "1 month ago",
      totalSessions: 5,
      preferredServices: ["Strength Training"],
      status: "inactive",
    },
    {
      id: 5,
      name: "Lisa M.",
      avatar: "LM",
      lastSession: "5 days ago",
      totalSessions: 20,
      preferredServices: ["Yoga", "Meditation"],
      status: "active",
    },
  ]

  const filteredClients = clients.filter((client) => client.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Add New Session</h1>
            <p className="text-gray-600 mt-1">Select a client</p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
          1
        </div>
        <div className="flex-1 h-1 bg-gray-200 rounded">
          <div className="h-1 bg-blue-600 rounded" style={{ width: "20%" }}></div>
        </div>
        <span className="text-sm text-gray-600">Step 1 of 5</span>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </CardContent>
      </Card>

      {/* Client List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Your Clients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedClient?.id === client.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedClient(client)}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-700">{client.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">{client.name}</h3>
                    <Badge
                      variant="secondary"
                      className={
                        client.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }
                    >
                      {client.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Last session: {client.lastSession}</p>
                  <p className="text-xs text-gray-500">{client.totalSessions} total sessions</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {client.preferredServices.slice(0, 2).map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
                {selectedClient?.id === client.id && <CheckCircle2 className="h-5 w-5 text-blue-600" />}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add New Client */}
      <Button variant="outline" className="w-full bg-transparent">
        <Plus className="h-4 w-4 mr-2" />
        Add New Client
      </Button>

      {/* Continue Button */}
      <Button className="w-full" disabled={!selectedClient} onClick={() => selectedClient && onNext(selectedClient)}>
        Continue to Services
      </Button>
    </div>
  )
}

function ServiceSelection({ client, onNext, onBack }: any) {
  const [selectedService, setSelectedService] = useState<any>(null)

  const services = [
    {
      id: 1,
      name: "Personal Training",
      duration: 60,
      price: 75,
      description: "One-on-one strength and conditioning",
      category: "Strength",
      equipment: ["Dumbbells", "Barbell", "Bench"],
    },
    {
      id: 2,
      name: "Yoga Session",
      duration: 75,
      price: 65,
      description: "Flexibility and mindfulness practice",
      category: "Flexibility",
      equipment: ["Yoga mat", "Blocks", "Straps"],
    },
    {
      id: 3,
      name: "HIIT Training",
      duration: 45,
      price: 80,
      description: "High-intensity interval training",
      category: "Cardio",
      equipment: ["Bodyweight", "Resistance bands"],
    },
    {
      id: 4,
      name: "Pilates",
      duration: 60,
      price: 70,
      description: "Core strength and stability",
      category: "Core",
      equipment: ["Mat", "Pilates ball", "Resistance bands"],
    },
    {
      id: 5,
      name: "Nutrition Consultation",
      duration: 30,
      price: 50,
      description: "Dietary planning and guidance",
      category: "Consultation",
      equipment: [],
    },
  ]

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Select Service</h1>
            <p className="text-gray-600 mt-1">For {client.name}</p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
          2
        </div>
        <div className="flex-1 h-1 bg-gray-200 rounded">
          <div className="h-1 bg-blue-600 rounded" style={{ width: "40%" }}></div>
        </div>
        <span className="text-sm text-gray-600">Step 2 of 5</span>
      </div>

      {/* Client Info */}
      <Card className="border-0 shadow-sm bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-100 text-blue-700">{client.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-blue-900">{client.name}</p>
              <p className="text-sm text-blue-700">Preferred: {client.preferredServices.join(", ")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Available Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedService?.id === service.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedService(service)}
            >
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
                    {service.equipment.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Dumbbell className="h-4 w-4" />
                        <span>{service.equipment.length} items</span>
                      </div>
                    )}
                  </div>
                </div>
                {selectedService?.id === service.id && <CheckCircle2 className="h-5 w-5 text-blue-600" />}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Continue Button */}
      <Button className="w-full" disabled={!selectedService} onClick={() => selectedService && onNext(selectedService)}>
        Continue to Date & Time
      </Button>
    </div>
  )
}

function DateTimeSelection({ sessionData, onNext, onBack }: any) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const today = new Date()
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    return date
  })

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ]

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const isTimeSlotAvailable = (time: string) => {
    // Mock availability check - in real app, check against existing bookings
    const unavailableTimes = ["10:00", "14:00", "18:00"]
    return !unavailableTimes.includes(time)
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
            <h1 className="text-2xl font-semibold text-gray-900">Date & Time</h1>
            <p className="text-gray-600 mt-1">
              {sessionData.service.name} with {sessionData.client.name}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
          3
        </div>
        <div className="flex-1 h-1 bg-gray-200 rounded">
          <div className="h-1 bg-blue-600 rounded" style={{ width: "60%" }}></div>
        </div>
        <span className="text-sm text-gray-600">Step 3 of 5</span>
      </div>

      {/* Session Summary */}
      <Card className="border-0 shadow-sm bg-gray-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="font-medium text-gray-900">{sessionData.service.name}</p>
              <p className="text-gray-600">
                {sessionData.service.duration} minutes • ${sessionData.service.price}
              </p>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">{sessionData.client.avatar}</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>

      {/* Date Selection */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {dates.map((date, index) => {
              const dateStr = date.toISOString().split("T")[0]
              const isSelected = selectedDate === dateStr
              const isToday = index === 0

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-sm font-medium text-gray-900">
                    {formatDate(date)}
                    {isToday && <span className="text-blue-600 ml-1">(Today)</span>}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Time Selection */}
      {selectedDate && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Select Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => {
                const isSelected = selectedTime === time
                const isAvailable = isTimeSlotAvailable(time)

                return (
                  <button
                    key={time}
                    onClick={() => isAvailable && setSelectedTime(time)}
                    disabled={!isAvailable}
                    className={`p-2 rounded-lg border text-sm transition-colors ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 text-blue-900"
                        : isAvailable
                          ? "border-gray-200 hover:border-gray-300 text-gray-900"
                          : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {time}
                    {!isAvailable && <div className="text-xs">Booked</div>}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      <Button
        className="w-full"
        disabled={!selectedDate || !selectedTime}
        onClick={() => selectedDate && selectedTime && onNext({ date: selectedDate, time: selectedTime })}
      >
        Continue to Details
      </Button>
    </div>
  )
}

function SessionDetails({ sessionData, onNext, onBack, onUpdateData }: any) {
  const [location, setLocation] = useState("Studio A")
  const [notes, setNotes] = useState("")
  const [equipment, setEquipment] = useState<string[]>(sessionData.service.equipment || [])

  const locations = [
    "Studio A",
    "Studio B",
    "Gym - Weight Room",
    "Gym - Cardio Area",
    "Outdoor Park",
    "Client's Home",
    "Virtual Session",
  ]

  const availableEquipment = [
    "Dumbbells",
    "Barbell",
    "Bench",
    "Yoga mat",
    "Blocks",
    "Straps",
    "Resistance bands",
    "Kettlebells",
    "Medicine ball",
    "Foam roller",
  ]

  const toggleEquipment = (item: string) => {
    setEquipment((prev) => (prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]))
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
            <h1 className="text-2xl font-semibold text-gray-900">Session Details</h1>
            <p className="text-gray-600 mt-1">Final setup</p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
          4
        </div>
        <div className="flex-1 h-1 bg-gray-200 rounded">
          <div className="h-1 bg-blue-600 rounded" style={{ width: "80%" }}></div>
        </div>
        <span className="text-sm text-gray-600">Step 4 of 5</span>
      </div>

      {/* Session Summary */}
      <Card className="border-0 shadow-sm bg-blue-50">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">Client:</span>
              <span className="font-medium text-blue-900">{sessionData.client.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">Service:</span>
              <span className="font-medium text-blue-900">{sessionData.service.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">Date & Time:</span>
              <span className="font-medium text-blue-900">
                {new Date(sessionData.date).toLocaleDateString()} at {sessionData.time}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">Duration:</span>
              <span className="font-medium text-blue-900">{sessionData.duration} minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">Price:</span>
              <span className="font-medium text-blue-900">${sessionData.price}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setLocation(loc)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  location === loc ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-sm font-medium text-gray-900">{loc}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Equipment */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Dumbbell className="h-5 w-5 mr-2 text-blue-600" />
            Equipment Needed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {availableEquipment.map((item) => (
              <button
                key={item}
                onClick={() => toggleEquipment(item)}
                className={`p-2 rounded-lg border text-sm transition-colors ${
                  equipment.includes(item)
                    ? "border-blue-500 bg-blue-50 text-blue-900"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Session Notes */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-600" />
            Session Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any specific goals, modifications, or notes for this session..."
            className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Continue Button */}
      <Button className="w-full" onClick={() => onNext({ location, notes, equipment })}>
        Review & Confirm
      </Button>
    </div>
  )
}

function SessionConfirmation({ sessionData, onConfirm, onBack }: any) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Confirm Session</h1>
            <p className="text-gray-600 mt-1">Review all details</p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
          5
        </div>
        <div className="flex-1 h-1 bg-blue-600 rounded"></div>
        <span className="text-sm text-gray-600">Step 5 of 5</span>
      </div>

      {/* Session Summary */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Session Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Client & Service */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-blue-100 text-blue-700">{sessionData.client.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-gray-900">{sessionData.client.name}</h3>
              <p className="text-sm text-gray-600">{sessionData.service.name}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <div>
                <p className="font-medium">{new Date(sessionData.date).toLocaleDateString()}</p>
                <p className="text-gray-600">Date</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-green-600" />
              <div>
                <p className="font-medium">{sessionData.time}</p>
                <p className="text-gray-600">{sessionData.duration} minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-purple-600" />
              <div>
                <p className="font-medium">{sessionData.location}</p>
                <p className="text-gray-600">Location</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-orange-600" />
              <div>
                <p className="font-medium">${sessionData.price}</p>
                <p className="text-gray-600">Session fee</p>
              </div>
            </div>
          </div>

          {/* Equipment */}
          {sessionData.equipment && sessionData.equipment.length > 0 && (
            <div>
              <p className="font-medium text-gray-900 mb-2">Equipment Needed:</p>
              <div className="flex flex-wrap gap-1">
                {sessionData.equipment.map((item: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {sessionData.notes && (
            <div>
              <p className="font-medium text-gray-900 mb-2">Session Notes:</p>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{sessionData.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <Button className="w-full" onClick={onConfirm}>
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Create Session
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="bg-transparent">
            <MessageCircle className="h-4 w-4 mr-2" />
            Message Client
          </Button>
          <Button variant="outline" className="bg-transparent">
            <Save className="h-4 w-4 mr-2" />
            Save as Template
          </Button>
        </div>
      </div>
    </div>
  )
}
