"use client"

import { useState } from "react"
import { TrainerDashboard } from "@/components/trainer-dashboard"
import { FinancialDashboard } from "@/components/financial-dashboard"
import { NotificationsDashboard } from "@/components/notifications-dashboard"
import { ChatDashboard } from "@/components/chat-dashboard"
import { ProfileDashboard } from "@/components/profile-dashboard"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <TrainerDashboard />
      case "alerts":
        return <NotificationsDashboard onBack={() => setActiveTab("home")} />
      case "chat":
        return <ChatDashboard onBack={() => setActiveTab("home")} />
      case "finance":
        return <FinancialDashboard onBack={() => setActiveTab("home")} />
      case "profile":
        return <ProfileDashboard onBack={() => setActiveTab("home")} />
      default:
        return <TrainerDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="pb-20">
        <div className="transition-all duration-300 ease-in-out">{renderContent()}</div>
      </div>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
