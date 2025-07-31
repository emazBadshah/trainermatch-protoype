"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  Calendar,
  DollarSign,
  MessageCircle,
  Clock,
  CheckCircle2,
  Settings,
  Filter,
  MoreHorizontal,
  AlertCircle,
  X,
} from "lucide-react"

type NotificationCategory = "all" | "bookings" | "payments" | "messages" | "system"

export function NotificationsDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory>("all")
  const [showSettings, setShowSettings] = useState(false)

  const notifications = [
    {
      id: 1,
      type: "booking",
      title: "New booking request",
      message: "Alex T. wants to book a Personal Training session for tomorrow at 10:00 AM",
      time: "2 minutes ago",
      unread: true,
      priority: "high",
      avatar: "AT",
      action: "booking-request",
      data: { client: "Alex T.", service: "Personal Training", time: "Tomorrow 10:00 AM" },
    },
    {
      id: 2,
      type: "payment",
      title: "Payment received",
      message: "Emma L. paid $65 for Yoga session completed today",
      time: "1 hour ago",
      unread: true,
      priority: "medium",
      avatar: "EL",
      action: "payment-received",
      data: { amount: 65, client: "Emma L." },
    },
    {
      id: 3,
      type: "message",
      title: "New message",
      message: "Sarah K.: 'Thanks for the great session today! See you Thursday.'",
      time: "2 hours ago",
      unread: true,
      priority: "low",
      avatar: "SK",
      action: "new-message",
      data: { client: "Sarah K." },
    },
    {
      id: 4,
      type: "booking",
      title: "Session reminder",
      message: "Upcoming session with John D. in 30 minutes - Strength Training",
      time: "30 minutes ago",
      unread: false,
      priority: "high",
      avatar: "JD",
      action: "session-reminder",
      data: { client: "John D.", service: "Strength Training" },
    },
    {
      id: 5,
      type: "system",
      title: "Weekly report ready",
      message: "Your weekly performance report is now available",
      time: "3 hours ago",
      unread: false,
      priority: "low",
      avatar: null,
      action: "report-ready",
      data: {},
    },
    {
      id: 6,
      type: "booking",
      title: "Session cancelled",
      message: "Mike R. cancelled tomorrow's HIIT session. Reason: Schedule conflict",
      time: "4 hours ago",
      unread: false,
      priority: "medium",
      avatar: "MR",
      action: "session-cancelled",
      data: { client: "Mike R.", service: "HIIT" },
    },
    {
      id: 7,
      type: "payment",
      title: "Payment overdue",
      message: "Lisa M. has an overdue payment of $65 from last week's session",
      time: "1 day ago",
      unread: false,
      priority: "high",
      avatar: "LM",
      action: "payment-overdue",
      data: { amount: 65, client: "Lisa M." },
    },
    {
      id: 8,
      type: "system",
      title: "New feature available",
      message: "Try our new automated follow-up messages for better client retention",
      time: "2 days ago",
      unread: false,
      priority: "low",
      avatar: null,
      action: "feature-announcement",
      data: {},
    },
  ]

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedCategory === "all") return true
    if (selectedCategory === "bookings") return notification.type === "booking"
    if (selectedCategory === "payments") return notification.type === "payment"
    if (selectedCategory === "messages") return notification.type === "message"
    if (selectedCategory === "system") return notification.type === "system"
    return true
  })

  const unreadCount = notifications.filter((n) => n.unread).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return Calendar
      case "payment":
        return DollarSign
      case "message":
        return MessageCircle
      case "system":
        return Bell
      default:
        return Bell
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-orange-600"
      case "low":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  if (showSettings) {
    return <NotificationSettings onBack={() => setShowSettings(false)} />
  }

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { id: "all", label: "All", count: notifications.length },
              { id: "bookings", label: "Bookings", count: notifications.filter((n) => n.type === "booking").length },
              { id: "payments", label: "Payments", count: notifications.filter((n) => n.type === "payment").length },
              { id: "messages", label: "Messages", count: notifications.filter((n) => n.type === "message").length },
              { id: "system", label: "System", count: notifications.filter((n) => n.type === "system").length },
            ].map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id as NotificationCategory)}
                className="bg-transparent flex-shrink-0"
              >
                {category.label}
                {category.count > 0 && (
                  <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                    {category.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => {
          const Icon = getNotificationIcon(notification.type)
          return (
            <Card key={notification.id} className={`border-0 shadow-sm ${notification.unread ? "bg-blue-50" : ""}`}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  {notification.avatar ? (
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                        {notification.avatar}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-gray-600" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          {notification.unread && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                          <AlertCircle className={`h-3 w-3 ${getPriorityColor(notification.priority)}`} />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-3">
                      {notification.action === "booking-request" && (
                        <>
                          <Button size="sm" className="flex-1">
                            Accept
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Decline
                          </Button>
                        </>
                      )}
                      {notification.action === "payment-received" && (
                        <Button variant="outline" size="sm" className="bg-transparent">
                          View Details
                        </Button>
                      )}
                      {notification.action === "new-message" && (
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                      )}
                      {notification.action === "session-reminder" && (
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Clock className="h-4 w-4 mr-2" />
                          View Session
                        </Button>
                      )}
                      {notification.action === "payment-overdue" && (
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Send Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Load More */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <Button variant="outline" className="w-full bg-transparent">
            Load More Notifications
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function NotificationSettings({ onBack }: { onBack: () => void }) {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    bookingRequests: true,
    paymentUpdates: true,
    messageAlerts: true,
    sessionReminders: true,
    marketingEmails: false,
    weeklyReports: true,
    soundEnabled: true,
    vibrationEnabled: true,
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00",
  })

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <X className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Notification Settings</h1>
        </div>
      </div>

      {/* General Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Push Notifications</p>
              <p className="text-xs text-gray-600">Receive notifications on your device</p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Email Notifications</p>
              <p className="text-xs text-gray-600">Receive notifications via email</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
              <p className="text-xs text-gray-600">Receive notifications via text message</p>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Types */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Notification Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Booking Requests</p>
              <p className="text-xs text-gray-600">New session booking requests</p>
            </div>
            <Switch
              checked={settings.bookingRequests}
              onCheckedChange={(checked) => setSettings({ ...settings, bookingRequests: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Payment Updates</p>
              <p className="text-xs text-gray-600">Payment confirmations and reminders</p>
            </div>
            <Switch
              checked={settings.paymentUpdates}
              onCheckedChange={(checked) => setSettings({ ...settings, paymentUpdates: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Message Alerts</p>
              <p className="text-xs text-gray-600">New messages from clients</p>
            </div>
            <Switch
              checked={settings.messageAlerts}
              onCheckedChange={(checked) => setSettings({ ...settings, messageAlerts: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Session Reminders</p>
              <p className="text-xs text-gray-600">Upcoming session notifications</p>
            </div>
            <Switch
              checked={settings.sessionReminders}
              onCheckedChange={(checked) => setSettings({ ...settings, sessionReminders: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sound & Vibration */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Sound & Vibration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Sound</p>
              <p className="text-xs text-gray-600">Play sound for notifications</p>
            </div>
            <Switch
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => setSettings({ ...settings, soundEnabled: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Vibration</p>
              <p className="text-xs text-gray-600">Vibrate for notifications</p>
            </div>
            <Switch
              checked={settings.vibrationEnabled}
              onCheckedChange={(checked) => setSettings({ ...settings, vibrationEnabled: checked })}
            />
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
              <p className="text-sm font-medium text-gray-900">Enable Quiet Hours</p>
              <p className="text-xs text-gray-600">Silence notifications during set hours</p>
            </div>
            <Switch
              checked={settings.quietHours}
              onCheckedChange={(checked) => setSettings({ ...settings, quietHours: checked })}
            />
          </div>
          {settings.quietHours && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  value={settings.quietStart}
                  onChange={(e) => setSettings({ ...settings, quietStart: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="time"
                  value={settings.quietEnd}
                  onChange={(e) => setSettings({ ...settings, quietEnd: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
