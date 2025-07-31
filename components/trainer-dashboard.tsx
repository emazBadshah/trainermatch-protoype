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
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Plus,
} from "lucide-react"

export function TrainerDashboard() {
  const [weekExpanded, setWeekExpanded] = useState(false)
  const [calendarExpanded, setCalendarExpanded] = useState(false)

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

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8">
        <h1 className="text-2xl font-semibold text-gray-900">Good morning, Sarah!</h1>
        <p className="text-gray-600 mt-1">You have 3 sessions today</p>
      </div>

      {/* Week/Month Calendar */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">{calendarExpanded ? "November 2024" : "This Week"}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (calendarExpanded) {
                  setCalendarExpanded(false)
                } else {
                  setWeekExpanded(!weekExpanded)
                }
              }}
            >
              {calendarExpanded ? (
                <span className="text-sm">Collapse</span>
              ) : weekExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!calendarExpanded ? (
            // Existing week view
            <>
              <div className="flex justify-between items-center mb-4 overflow-x-auto">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, index) => (
                  <div key={day} className="flex flex-col items-center space-y-2 flex-shrink-0 px-1">
                    <span className="text-xs text-gray-600">{day}</span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                        index === 2 ? "bg-blue-600 text-white" : "text-gray-700"
                      }`}
                    >
                      {13 + index}
                    </div>
                    <div className="flex space-x-0.5">
                      {index === 2 && (
                        <>
                          <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                          <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                          <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                        </>
                      )}
                      {index === 1 && <div className="w-1 h-1 bg-gray-400 rounded-full"></div>}
                      {index === 3 && (
                        <>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent text-xs"
                  onClick={() => setCalendarExpanded(true)}
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  Expand
                </Button>
                <Button size="sm" className="flex-1 text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Session
                </Button>
              </div>
            </>
          ) : (
            // Expanded month view
            <ExpandedCalendarView onCollapse={() => setCalendarExpanded(false)} />
          )}
        </CardContent>
      </Card>

      {/* Today's Sessions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            Today's Sessions
            <Badge variant="secondary" className="ml-2">
              3
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todaySessions.map((session) => (
            <div key={session.id} className="p-3 rounded-lg border border-gray-100 bg-white space-y-3">
              {/* Session Header */}
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">{session.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="text-sm font-medium text-gray-900">{session.time}</span>
                    <span className="text-sm text-gray-600">{session.client}</span>
                    <span className="text-sm font-medium text-gray-900">${session.price}</span>
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

              {/* Action Buttons */}
              <div className="flex space-x-2 w-full">
                {session.status === "completed" ? (
                  <>
                    <Button variant="ghost" size="sm" className="flex-1 text-xs">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Chat
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 text-xs">
                      Notes
                    </Button>
                  </>
                ) : session.status === "starting-soon" ? (
                  <>
                    <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                      Mark Complete
                    </Button>
                    <Button variant="ghost" size="sm" className="px-3">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="flex-1 text-xs">
                      Pre-Session Chat
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 text-xs">
                      Details
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pending Requests */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            Pending Requests
            <Badge variant="secondary" className="ml-2">
              2
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingRequests.map((request, index) => (
            <div key={index} className="p-3 rounded-lg border border-gray-100 bg-white space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900 block">{request.client}</span>
                  <p className="text-sm text-gray-600 mt-1">{request.time}</p>
                  <p className="text-xs text-gray-500 mt-1">{request.service}</p>
                </div>
              </div>
              <div className="flex space-x-2 w-full">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Decline
                </Button>
                <Button size="sm" className="flex-1">
                  Accept
                </Button>
              </div>
            </div>
          ))}
          <Button variant="ghost" className="w-full text-sm">
            View All Requests
          </Button>
        </CardContent>
      </Card>

      {/* Financial Overview */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Financial Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Today</p>
              <p className="text-xl font-semibold text-gray-900">$140</p>
              <p className="text-xs text-gray-500">2/3 completed</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-xl font-semibold text-gray-900">$485</p>
              <p className="text-xs text-gray-500">6 sessions</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Monthly Goal</span>
              <span className="font-medium">$1,650 / $2,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "83%" }}></div>
            </div>
            <p className="text-xs text-gray-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              83% of goal reached
            </p>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            <DollarSign className="h-4 w-4 mr-2" />
            View Financial Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Replace the existing ExpandedCalendarView component with this full implementation
function ExpandedCalendarView({ onCollapse }: { onCollapse: () => void }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 10)) // November 2024
  const [selectedDate, setSelectedDate] = useState<number | null>(15) // Today is 15th

  // Sample session data for the month
  const sessionData: Record<
    number,
    Array<{
      time: string
      client: string
      service: string
      price: number
      status: "completed" | "upcoming" | "starting-soon"
      avatar: string
    }>
  > = {
    12: [{ time: "10:00 AM", client: "Emma L.", service: "Yoga", price: 65, status: "completed", avatar: "EL" }],
    14: [
      { time: "2:00 PM", client: "Mike R.", service: "HIIT", price: 80, status: "completed", avatar: "MR" },
      { time: "6:00 PM", client: "Sarah K.", service: "Core", price: 75, status: "completed", avatar: "SK" },
    ],
    15: [
      { time: "10:00 AM", client: "Emma L.", service: "Yoga", price: 65, status: "completed", avatar: "EL" },
      { time: "2:00 PM", client: "John D.", service: "Strength", price: 75, status: "starting-soon", avatar: "JD" },
      { time: "6:00 PM", client: "Sarah K.", service: "HIIT", price: 80, status: "upcoming", avatar: "SK" },
    ],
    16: [
      { time: "9:00 AM", client: "Lisa M.", service: "Pilates", price: 70, status: "upcoming", avatar: "LM" },
      { time: "4:00 PM", client: "Mike R.", service: "Strength", price: 80, status: "upcoming", avatar: "MR" },
    ],
    18: [{ time: "11:00 AM", client: "Emma L.", service: "Yoga", price: 65, status: "upcoming", avatar: "EL" }],
    20: [
      { time: "3:00 PM", client: "Sarah K.", service: "HIIT", price: 80, status: "upcoming", avatar: "SK" },
      { time: "7:00 PM", client: "John D.", service: "Strength", price: 75, status: "upcoming", avatar: "JD" },
    ],
    22: [{ time: "10:00 AM", client: "Lisa M.", service: "Yoga", price: 65, status: "upcoming", avatar: "LM" }],
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek: startingDayOfWeek === 0 ? 7 : startingDayOfWeek }
  }

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth)
  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
    setSelectedDate(null)
  }

  const getDayEarnings = (day: number) => {
    const sessions = sessionData[day] || []
    return sessions.reduce((total, session) => {
      return session.status === "completed" ? total + session.price : total
    }, 0)
  }

  return (
    <div className="space-y-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-semibold text-gray-900">{monthName}</h3>
        <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-2">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: startingDayOfWeek - 1 }).map((_, index) => (
            <div key={`empty-${index}`} className="h-12"></div>
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1
            const isToday = day === 15 // Current day
            const isSelected = selectedDate === day
            const sessions = sessionData[day] || []
            const earnings = getDayEarnings(day)

            return (
              <div
                key={day}
                className={`h-12 border rounded-lg cursor-pointer transition-colors relative ${
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : isToday
                      ? "border-blue-300 bg-blue-25"
                      : sessions.length > 0
                        ? "border-gray-200 bg-gray-50 hover:bg-gray-100"
                        : "border-gray-100 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedDate(day)}
              >
                <div className="p-1 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${isToday ? "text-blue-600" : "text-gray-900"}`}>{day}</span>
                    {sessions.length > 0 && <span className="text-[10px] text-gray-600">{sessions.length}</span>}
                  </div>

                  {/* Session indicators */}
                  <div className="flex justify-center space-x-0.5">
                    {sessions.slice(0, 3).map((session, idx) => (
                      <div
                        key={idx}
                        className={`w-1 h-1 rounded-full ${
                          session.status === "completed"
                            ? "bg-green-500"
                            : session.status === "starting-soon"
                              ? "bg-orange-500"
                              : "bg-blue-500"
                        }`}
                      />
                    ))}
                    {sessions.length > 3 && <div className="w-1 h-1 rounded-full bg-gray-400" />}
                  </div>

                  {/* Earnings for completed sessions */}
                  {earnings > 0 && <div className="text-[9px] text-green-600 font-medium text-center">${earnings}</div>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Selected Day Details */}
      {selectedDate && sessionData[selectedDate] && (
        <div className="bg-gray-50 rounded-lg p-3 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">
              {monthName.split(" ")[0]} {selectedDate}, {currentMonth.getFullYear()}
            </h4>
            <Badge variant="secondary">
              {sessionData[selectedDate].length} session{sessionData[selectedDate].length > 1 ? "s" : ""}
            </Badge>
          </div>

          <div className="space-y-2">
            {sessionData[selectedDate].map((session, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-2 rounded border">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">{session.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{session.time}</span>
                    <span className="text-sm text-gray-600">{session.client}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{session.service}</span>
                    <span className="text-xs font-medium text-gray-900">${session.price}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {session.status === "completed" && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                      Done
                    </Badge>
                  )}
                  {session.status === "starting-soon" && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Soon
                    </Badge>
                  )}
                  {session.status === "upcoming" && (
                    <Badge variant="outline" className="text-xs">
                      Upcoming
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Month Summary */}
      <div className="bg-blue-50 rounded-lg p-3 space-y-2">
        <h4 className="font-medium text-blue-900">Month Summary</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <p className="text-blue-600 font-semibold">
              {
                Object.values(sessionData)
                  .flat()
                  .filter((s) => s.status === "completed").length
              }
            </p>
            <p className="text-blue-700 text-xs">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-blue-600 font-semibold">
              {
                Object.values(sessionData)
                  .flat()
                  .filter((s) => s.status === "upcoming" || s.status === "starting-soon").length
              }
            </p>
            <p className="text-blue-700 text-xs">Upcoming</p>
          </div>
          <div className="text-center">
            <p className="text-green-600 font-semibold">
              $
              {Object.values(sessionData)
                .flat()
                .filter((s) => s.status === "completed")
                .reduce((sum, s) => sum + s.price, 0)}
            </p>
            <p className="text-blue-700 text-xs">Earned</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button variant="outline" className="flex-1 bg-white" onClick={onCollapse}>
          Collapse View
        </Button>
        <Button className="flex-1">
          <Plus className="h-4 w-4 mr-2" />
          Add Session
        </Button>
      </div>
    </div>
  )
}
