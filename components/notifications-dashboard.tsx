"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Bell,
  Calendar,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Star,
  Settings,
  Filter,
  MoreHorizontal,
} from "lucide-react"

type NotificationCategory = "all" | "sessions" | "payments" | "reviews" | "system"

interface NotificationsDashboardProps {
  onBack: () => void
}

export function NotificationsDashboard({ onBack }: NotificationsDashboardProps) {
  const [activeCategory, setActiveCategory] = useState<NotificationCategory>("all")
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "session",
      title: "Session starting soon",
      message: "Your session with John D. starts in 30 minutes",
      time: "30 min ago",
      read: false,
      priority: "high",
      avatar: "JD",
      action: "View Details",
    },
    {
      id: 2,
      type: "payment",
      title: "Payment received",
      message: "Emma L. paid $65 for Yoga Session",
      time: "2 hours ago",
      read: false,
      priority: "medium",
      avatar: "EL",
      action: "View Transaction",
    },
    {
      id: 3,
      type: "review",
      title: "New 5-star review",
      message: "Sarah K. left a review: 'Amazing HIIT session!'",
      time: "4 hours ago",
      read: true,
      priority: "medium",
      avatar: "SK",
      action: "View Review",
    },
    {
      id: 4,
      type: "session",
      title: "Session request",
      message: "Mike R. requested a session for tomorrow 9:00 AM",
      time: "6 hours ago",
      read: false,
      priority: "high",
      avatar: "MR",
      action: "Respond",
    },
    {
      id: 5,
      type: "system",
      title: "Monthly report ready",
      message: "Your November performance report is available",
      time: "1 day ago",
      read: true,
      priority: "low",
      avatar: null,
      action: "Download",
    },
    {
      id: 6,
      type: "payment",
      title: "Payment overdue",
      message: "Lisa M. has an overdue payment of $70",
      time: "2 days ago",
      read: false,
      priority: "high",
      avatar: "LM",
      action: "Send Reminder",
    },
    {
      id: 7,
      type: "session",
      title: "Session completed",
      message: "Completed Pilates session with Anna P.",
      time: "3 days ago",
      read: true,
      priority: "low",
      avatar: "AP",
      action: "Add Notes",
    },
    {
      id: 8,
      type: "system",
      title: "New feature available",
      message: "Try our new session analytics dashboard",
      time: "1 week ago",
      read: true,
      priority: "low",
      avatar: null,
      action: "Learn More",
    },
  ])

  const categories = [
    { id: "all", label: "All", icon: Bell },
    { id: "sessions", label: "Sessions", icon: Calendar },
    { id: "payments", label: "Payments", icon: DollarSign },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "system", label: "System", icon: Settings },
  ]

  const filteredNotifications = notifications.filter(
    (notification) => activeCategory === "all" || notification.type === activeCategory,
  )

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = priority === "high" ? "text-red-600" : priority === "medium" ? "text-orange-600" : "text-gray-600"

    switch (type) {
      case "session":
        return <Calendar className={`h-5 w-5 ${iconClass}`} />
      case "payment":
        return <DollarSign className={`h-5 w-5 ${iconClass}`} />
      case "review":
        return <Star className={`h-5 w-5 ${iconClass}`} />
      case "system":
        return <Settings className={`h-5 w-5 ${iconClass}`} />
      default:
        return <Bell className={`h-5 w-5 ${iconClass}`} />
    }
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
              <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-1">
                {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {notifications.filter((n) => n.type === "session" && !n.read).length}
              </p>
              <p className="text-xs text-gray-600">Sessions</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {notifications.filter((n) => n.type === "payment" && !n.read).length}
              </p>
              <p className="text-xs text-gray-600">Payments</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {notifications.filter((n) => n.type === "review" && !n.read).length}
              </p>
              <p className="text-xs text-gray-600">Reviews</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {notifications.filter((n) => n.priority === "high" && !n.read).length}
              </p>
              <p className="text-xs text-gray-600">Urgent</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = activeCategory === category.id
              const count = notifications.filter(
                (n) => (category.id === "all" || n.type === category.id) && !n.read,
              ).length

              return (
                <Button
                  key={category.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id as NotificationCategory)}
                  className={`flex items-center space-x-2 whitespace-nowrap ${!isActive ? "bg-transparent" : ""}`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                  {count > 0 && (
                    <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs">
                      {count}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">
            {activeCategory === "all" ? "All Notifications" : categories.find((c) => c.id === activeCategory)?.label}
            <span className="ml-2 text-sm font-normal text-gray-600">({filteredNotifications.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                !notification.read ? "border-blue-200 bg-blue-50 hover:bg-blue-100" : "border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {notification.avatar ? (
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700">{notification.avatar}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {getNotificationIcon(notification.type, notification.priority)}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                          {notification.title}
                        </p>
                        {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center space-x-3 mt-2">
                        <p className="text-xs text-gray-500">{notification.time}</p>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            notification.priority === "high"
                              ? "border-red-200 text-red-700"
                              : notification.priority === "medium"
                                ? "border-orange-200 text-orange-700"
                                : "border-gray-200 text-gray-600"
                          }`}
                        >
                          {notification.priority}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-3">
                    <Button size="sm" variant="outline" className="bg-white">
                      {notification.action}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No notifications in this category</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Session Reminders</p>
              <p className="text-sm text-gray-600">Get notified before sessions start</p>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Payment Notifications</p>
              <p className="text-sm text-gray-600">Receive payment confirmations</p>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Review Alerts</p>
              <p className="text-sm text-gray-600">Get notified of new client reviews</p>
            </div>
            <div className="w-12 h-6 bg-gray-300 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Marketing Updates</p>
              <p className="text-sm text-gray-600">Business tips and feature updates</p>
            </div>
            <div className="w-12 h-6 bg-gray-300 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
