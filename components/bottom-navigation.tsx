"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Bell, MessageCircle, DollarSign, User } from "lucide-react"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "notifications", label: "Notifications", icon: Bell, badge: 5 },
    { id: "chat", label: "Chat", icon: MessageCircle, badge: 2 },
    { id: "financial", label: "Financial", icon: DollarSign },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-2 relative min-w-0 flex-1 ${
                isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="relative">
                <Icon className="h-4 w-4" />
                {tab.badge && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-3 w-3 p-0 text-[10px] flex items-center justify-center"
                  >
                    {tab.badge > 9 ? "9+" : tab.badge}
                  </Badge>
                )}
              </div>
              <span className="text-[10px] font-medium truncate w-full text-center">{tab.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
