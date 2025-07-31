"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  MessageCircle,
  CheckCircle2,
  Plus,
  Zap,
  Target,
  Award,
} from "lucide-react"
import { AddSessionFlow } from "./add-session-flow"

export function TrainerDashboard() {
  const [weekExpanded, setWeekExpanded] = useState(false)
  const [calendarExpanded, setCalendarExpanded] = useState(false)
  const [currentView, setCurrentView] = useState<{ type: string; sessionId?: number; step?: string }>({
    type: "dashboard",
  })

  const todaySessions = [
    {
      id: 1,
      time: "10:00 AM",
      client: "Emma L.",
      service: "Yoga",
      price: 65,
      status: "completed",
      avatar: "EL",
    },
    {
      id: 2,
      time: "2:00 PM",
      client: "John D.",
      service: "Strength Training",
      price: 75,
      status: "starting-soon",
      avatar: "JD",
    },
    {
      id: 3,
      time: "6:00 PM",
      client: "Sarah K.",
      service: "HIIT Session",
      price: 80,
      status: "upcoming",
      avatar: "SK",
    },
  ]

  const pendingRequests = [
    { client: "Mike R.", time: "Tomorrow 9:00 AM", service: "HIIT" },
    { client: "Lisa M.", time: "Friday 5:00 PM", service: "Yoga" },
  ]

  if (currentView.type === "add-session") {
    return (
      <AddSessionFlow
        initialStep={currentView.step || "client-selection"}
        onBack={() => setCurrentView({ type: "dashboard" })}
        onComplete={(sessionData) => {
          setCurrentView({ type: "dashboard" })
        }}
      />
    )
  }

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8 animate-in slide-in-from-top duration-500">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Good morning, Sarah! ☀️</h1>
              <p className="text-blue-100 mt-1">You have 3 sessions today</p>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <Award className="h-8 w-8 text-yellow-300 mx-auto" />
                <p className="text-xs mt-1">4.9 ⭐</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 animate-in slide-in-from-bottom duration-500 delay-100">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="pt-4 pb-4 text-center">
            <div className="flex items-center justify-center space-x-1">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-xl font-bold text-green-700">$140</span>
            </div>
            <p className="text-xs text-green-600 mt-1">Today</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="pt-4 pb-4 text-center">
            <div className="flex items-center justify-center space-x-1">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="text-xl font-bold text-blue-700">3</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">Sessions</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="pt-4 pb-4 text-center">
            <div className="flex items-center justify-center space-x-1">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="text-xl font-bold text-purple-700">83%</span>
            </div>
            <p className="text-xs text-purple-600 mt-1">Goal</p>
          </CardContent>
        </Card>
      </div>

      {/* Week Calendar */}
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom duration-500 delay-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              This Week
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView({ type: "add-session", step: "client-selection" })}
              className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Session
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4 overflow-x-auto">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, index) => (
              <div key={day} className="flex flex-col items-center space-y-2 flex-shrink-0 px-1">
                <span className="text-xs text-gray-600 font-medium">{day}</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 hover:scale-110 ${
                    index === 2
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {13 + index}
                </div>
                <div className="flex space-x-0.5">
                  {index === 2 && (
                    <>
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    </>
                  )}
                  {index === 1 && <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>}
                  {index === 3 && (
                    <>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Sessions */}
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom duration-500 delay-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Zap className="h-5 w-5 mr-2 text-orange-600" />
            Today's Sessions
            <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-700">
              3
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todaySessions.map((session, index) => (
            <div
              key={session.id}
              className="p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-gray-50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group animate-in slide-in-from-left duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12 transition-transform duration-200 group-hover:scale-110">
                  <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 font-semibold">
                    {session.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-900">{session.time}</span>
                    <span className="text-sm text-gray-600">{session.client}</span>
                    <span className="text-sm font-semibold text-green-600">${session.price}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1 flex-wrap">
                    <span className="text-sm text-gray-600">{session.service}</span>
                    {session.status === "completed" && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    {session.status === "starting-soon" && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        Starting in 30 mins
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-3">
                {session.status === "completed" ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs hover:bg-green-50 hover:text-green-700 transition-all duration-200 hover:scale-105"
                    >
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      View Summary
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 hover:scale-105"
                    >
                      Notes
                    </Button>
                  </>
                ) : session.status === "starting-soon" ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 hover:from-orange-600 hover:to-red-600 transition-all duration-200 hover:scale-105 shadow-lg"
                    >
                      Start Session
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="px-3 hover:bg-blue-50 transition-all duration-200 hover:scale-105"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 hover:scale-105"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 hover:scale-105"
                    >
                      Pre-Chat
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pending Requests */}
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom duration-500 delay-400">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Clock className="h-5 w-5 mr-2 text-purple-600" />
            Pending Requests
            <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-700">
              2
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingRequests.map((request, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-purple-50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-right duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-900 block">{request.client}</span>
                  <p className="text-sm text-gray-600 mt-1">{request.time}</p>
                  <p className="text-xs text-purple-600 mt-1 font-medium">{request.service}</p>
                </div>
              </div>
              <div className="flex space-x-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all duration-200 hover:scale-105"
                >
                  Decline
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Accept
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Financial Overview */}
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom duration-500 delay-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-green-600" />
            Financial Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <p className="text-sm text-green-700 font-medium">Today</p>
              <p className="text-xl font-bold text-green-800">$140</p>
              <p className="text-xs text-green-600">2/3 completed</p>
            </div>
            <div className="space-y-1 p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <p className="text-sm text-blue-700 font-medium">This Week</p>
              <p className="text-xl font-bold text-blue-800">$485</p>
              <p className="text-xs text-blue-600">6 sessions</p>
            </div>
          </div>
          <div className="space-y-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="flex justify-between text-sm">
              <span className="text-purple-700 font-medium">Monthly Goal</span>
              <span className="font-semibold text-purple-800">$1,650 / $2,000</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: "83%" }}
              ></div>
            </div>
            <p className="text-xs text-purple-600 flex items-center font-medium">
              <TrendingUp className="h-3 w-3 mr-1" />
              83% of goal reached - You're doing great! 🎉
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
