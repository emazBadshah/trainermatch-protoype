"use client"

import { Home, Bell, MessageCircle, DollarSign, User } from "lucide-react"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "chat", label: "Chat", icon: MessageCircle },
    { id: "finance", label: "Finance", icon: DollarSign },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 px-4 py-2 max-w-md mx-auto shadow-lg">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                isActive
                  ? "text-blue-600 bg-blue-50 shadow-md transform scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon className={`h-5 w-5 transition-all duration-200`} />
              <span className={`text-xs font-medium transition-all duration-200 ${isActive ? "font-semibold" : ""}`}>
                {tab.label}
              </span>
              {isActive && <div className="w-1 h-1 bg-blue-600 rounded-full"></div>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
