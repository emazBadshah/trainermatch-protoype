"use client"

import { useState } from "react"
import { TrainerDashboard } from "@/components/trainer-dashboard"
import { FinancialDashboard } from "@/components/financial-dashboard"
import { NotificationsDashboard } from "@/components/notifications-dashboard"
import { ChatDashboard } from "@/components/chat-dashboard"
import { ProfileDashboard } from "@/components/profile-dashboard"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function TrainerMatchApp() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gray-50 pb-20 safe-area-pb">
      {activeTab === "dashboard" && <TrainerDashboard />}
      {activeTab === "notifications" && <NotificationsDashboard />}
      {activeTab === "chat" && <ChatDashboard />}
      {activeTab === "financial" && <FinancialDashboard />}
      {activeTab === "profile" && <ProfileDashboard />}

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
