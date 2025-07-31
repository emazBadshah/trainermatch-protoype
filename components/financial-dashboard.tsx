"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Download,
  CheckCircle2,
  ArrowLeft,
  Search,
  MoreHorizontal,
  FileText,
  AlertCircle,
  TrendingDown,
  Send,
  MessageCircle,
} from "lucide-react"

type FinancialView =
  | "overview"
  | "client-details"
  | "tax-export"
  | "growth-opportunities"
  | "transaction-history"
  | "business-analytics"
  | "client-followups"
  | "pending-requests"

export function FinancialDashboard() {
  const [currentView, setCurrentView] = useState<FinancialView>("overview")
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const clientData = [
    {
      id: 1,
      name: "Sarah K.",
      ltv: 900,
      sessions: 12,
      avatar: "SK",
      lastSession: "2 days ago",
      avgSessionValue: 75,
      retention: "High",
      totalPaid: 900,
      unpaidSessions: 0,
      preferredServices: ["Core Training", "HIIT"],
      joinDate: "Jan 2024",
      status: "Active",
    },
    {
      id: 2,
      name: "Mike R.",
      ltv: 480,
      sessions: 6,
      avatar: "MR",
      lastSession: "1 week ago",
      avgSessionValue: 80,
      retention: "Medium",
      totalPaid: 480,
      unpaidSessions: 1,
      preferredServices: ["HIIT", "Strength"],
      joinDate: "Mar 2024",
      status: "At Risk",
    },
    {
      id: 3,
      name: "Emma L.",
      ltv: 780,
      sessions: 12,
      avatar: "EL",
      lastSession: "Today",
      avgSessionValue: 65,
      retention: "High",
      totalPaid: 780,
      unpaidSessions: 0,
      preferredServices: ["Yoga", "Pilates"],
      joinDate: "Feb 2024",
      status: "Active",
    },
  ]

  const recentTransactions = [
    { id: 1, client: "Emma L.", service: "Yoga", amount: 65, status: "completed", time: "Today", date: "Nov 15, 2024" },
    {
      id: 2,
      client: "John D.",
      service: "Strength",
      amount: 75,
      status: "completed",
      time: "Today",
      date: "Nov 15, 2024",
    },
    {
      id: 3,
      client: "Sarah K.",
      service: "Core",
      amount: 75,
      status: "completed",
      time: "Yesterday",
      date: "Nov 14, 2024",
    },
    {
      id: 4,
      client: "Mike R.",
      service: "HIIT",
      amount: 80,
      status: "pending",
      time: "Yesterday",
      date: "Nov 14, 2024",
    },
    {
      id: 5,
      client: "Lisa M.",
      service: "Yoga",
      amount: 65,
      status: "completed",
      time: "2 days ago",
      date: "Nov 13, 2024",
    },
  ]

  const growthOpportunities = [
    {
      id: 1,
      type: "follow-up",
      title: "2 clients need follow-up",
      description: "Mike R. and Lisa M. haven't booked in 2+ weeks",
      action: "Send Follow-up Messages",
      priority: "medium",
      clients: ["Mike R.", "Lisa M."],
      lastBooking: "2 weeks ago",
    },
    {
      id: 2,
      type: "pending-response",
      title: "3 pending booking requests",
      description: "New booking requests waiting for your response",
      action: "Review Requests",
      priority: "high",
      clients: ["Alex T.", "Maria S.", "David K."],
      waitingTime: "2 hours avg",
    },
  ]

  if (currentView === "client-details" && selectedClient) {
    return <ClientDetailsView client={selectedClient} onBack={() => setCurrentView("overview")} />
  }

  if (currentView === "tax-export") {
    return <TaxExportView onBack={() => setCurrentView("overview")} />
  }

  if (currentView === "growth-opportunities") {
    return <GrowthOpportunitiesView opportunities={growthOpportunities} onBack={() => setCurrentView("overview")} />
  }

  if (currentView === "transaction-history") {
    return <TransactionHistoryView transactions={recentTransactions} onBack={() => setCurrentView("overview")} />
  }

  if (currentView === "business-analytics") {
    return <BusinessAnalyticsView onBack={() => setCurrentView("overview")} />
  }

  if (currentView === "client-followups") {
    return <ClientFollowupsView onBack={() => setCurrentView("overview")} />
  }

  if (currentView === "pending-requests") {
    return <PendingRequestsView onBack={() => setCurrentView("overview")} />
  }

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-semibold text-gray-900">Financial Dashboard</h1>
        </div>
      </div>

      {/* Earnings Overview */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Earnings Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">$485</p>
              <p className="text-xs text-gray-500">6 sessions</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">$1,650</p>
              <p className="text-xs text-gray-500">22 sessions</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Monthly Goal Progress</span>
              <span className="font-medium">83% of $2,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                style={{ width: "83%" }}
              ></div>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => setCurrentView("business-analytics")}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            View Detailed Analytics
          </Button>
        </CardContent>
      </Card>

      {/* Business Performance */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Business Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Avg Session Value</p>
                  <p className="font-semibold text-gray-900">$74.55</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Client Retention</p>
                  <p className="font-semibold text-gray-900">92%</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Peak Earning Day</p>
                  <p className="font-semibold text-gray-900">Thursday</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Growth vs Last Month</p>
                  <p className="font-semibold text-green-600">+23%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Management */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Tax Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Q4 2024 Recorded</p>
              <p className="text-xl font-semibold text-gray-900">$12,450</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Tax-ready
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Transactions</p>
              <p className="font-medium">167</p>
            </div>
            <div>
              <p className="text-gray-600">Professional Services</p>
              <p className="font-medium">100%</p>
            </div>
          </div>
          <Button variant="outline" className="w-full bg-transparent" onClick={() => setCurrentView("tax-export")}>
            <Download className="h-4 w-4 mr-2" />
            Export Tax Reports
          </Button>
        </CardContent>
      </Card>

      {/* Client Financial Overview */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Top Clients by Value</CardTitle>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {clientData.map((client, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 bg-white cursor-pointer hover:bg-gray-50"
              onClick={() => {
                setSelectedClient(client)
                setCurrentView("client-details")
              }}
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">{client.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-gray-900">{client.name}</p>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      client.status === "Active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {client.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{client.sessions} sessions</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${client.ltv}</p>
                <p className="text-xs text-gray-500">LTV</p>
              </div>
            </div>
          ))}
          <Button variant="ghost" className="w-full">
            View All Clients
          </Button>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setCurrentView("transaction-history")}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Today</p>
            {recentTransactions.slice(0, 2).map((transaction, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transaction.client}</p>
                    <p className="text-xs text-gray-600">{transaction.service}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">${transaction.amount}</span>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Yesterday</p>
            {recentTransactions.slice(2, 4).map((transaction, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transaction.client}</p>
                    <p className="text-xs text-gray-600">{transaction.service}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">${transaction.amount}</span>
                  {transaction.status === "pending" ? (
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Opportunities */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Growth Opportunities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-100">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-orange-900">2 clients need follow-up</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-orange-600"
                onClick={() => setCurrentView("client-followups")}
              >
                Follow Up
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-900">3 pending booking requests</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600"
                onClick={() => setCurrentView("pending-requests")}
              >
                Review
              </Button>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => setCurrentView("growth-opportunities")}
          >
            View All Follow-ups & Requests
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Client Details View Component
function ClientDetailsView({ client, onBack }: { client: any; onBack: () => void }) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Client Details</h1>
        </div>
      </div>

      {/* Client Header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-blue-100 text-blue-700 text-lg">{client.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{client.name}</h2>
              <p className="text-sm text-gray-600">Member since {client.joinDate}</p>
              <Badge
                variant="secondary"
                className={`mt-2 ${
                  client.status === "Active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                }`}
              >
                {client.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Financial Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Total Paid</p>
              <p className="text-2xl font-bold text-gray-900">${client.totalPaid}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Avg Session</p>
              <p className="text-2xl font-bold text-gray-900">${client.avgSessionValue}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Total Sessions</p>
              <p className="text-lg font-semibold text-gray-900">{client.sessions}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Unpaid Sessions</p>
              <p className="text-lg font-semibold text-red-600">{client.unpaidSessions}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Insights */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Client Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Retention Level</span>
              <Badge
                variant="secondary"
                className={`${
                  client.retention === "High" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                }`}
              >
                {client.retention}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Session</span>
              <span className="text-sm font-medium">{client.lastSession}</span>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-gray-600">Preferred Services</span>
              <div className="flex flex-wrap gap-1">
                {client.preferredServices.map((service: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full bg-transparent">
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <FileText className="h-4 w-4 mr-2" />
            View Session History
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Tax Export View Component
function TaxExportView({ onBack }: { onBack: () => void }) {
  const [selectedPeriod, setSelectedPeriod] = useState("Q4-2024")
  const [exportFormat, setExportFormat] = useState("PDF")

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Tax Export</h1>
        </div>
      </div>

      {/* Export Options */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Export Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Time Period</label>
            <div className="grid grid-cols-2 gap-2">
              {["Q4-2024", "Q3-2024", "Q2-2024", "Q1-2024"].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className="bg-transparent"
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Format</label>
            <div className="flex space-x-2">
              {["PDF", "CSV", "Excel"].map((format) => (
                <Button
                  key={format}
                  variant={exportFormat === format ? "default" : "outline"}
                  size="sm"
                  onClick={() => setExportFormat(format)}
                  className="bg-transparent"
                >
                  {format}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Export Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Period</span>
              <span className="font-medium">{selectedPeriod}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Revenue</span>
              <span className="font-medium">$12,450</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Transactions</span>
              <span className="font-medium">167</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax Category</span>
              <span className="font-medium">Professional Services</span>
            </div>
          </div>
          <Button className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Export {exportFormat} Report
          </Button>
        </CardContent>
      </Card>

      {/* Tax Documents */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Available Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "1099-K Form 2024", status: "Ready", date: "Dec 2024" },
            { name: "Business Expense Summary", status: "Ready", date: "Q4 2024" },
            { name: "Client Payment Summary", status: "Ready", date: "Q4 2024" },
          ].map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-white"
            >
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <p className="text-xs text-gray-600">{doc.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {doc.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// Growth Opportunities View Component
function GrowthOpportunitiesView({ opportunities, onBack }: { opportunities: any[]; onBack: () => void }) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Follow-ups & Requests</h1>
        </div>
      </div>

      {opportunities.map((opportunity, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">{opportunity.title}</CardTitle>
              <Badge
                variant="secondary"
                className={`${
                  opportunity.priority === "high" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                }`}
              >
                {opportunity.priority} priority
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">{opportunity.description}</p>

            {/* Client List */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Clients:</p>
              <div className="space-y-1">
                {opportunity.clients.map((client: string, clientIndex: number) => (
                  <div key={clientIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-900">{client}</span>
                    {opportunity.type === "follow-up" ? (
                      <span className="text-xs text-gray-500">Last: {opportunity.lastBooking}</span>
                    ) : (
                      <span className="text-xs text-red-600">Waiting {opportunity.waitingTime}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              {opportunity.type === "follow-up" ? (
                <>
                  <Button size="sm" className="flex-1">
                    Send Follow-up
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    View History
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" className="flex-1">
                    Review Requests
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Accept All
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full bg-transparent">
            <Send className="h-4 w-4 mr-2" />
            Send Bulk Follow-up Messages
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            View All Pending Requests
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Transaction History View Component
function TransactionHistoryView({ transactions, onBack }: { transactions: any[]; onBack: () => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.service.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || transaction.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Transaction History</h1>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-2">
            {["all", "completed", "pending"].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="bg-transparent capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredTransactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-white"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{transaction.client}</p>
                  <span className="text-sm font-semibold text-gray-900">${transaction.amount}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-600">{transaction.service}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{transaction.date}</span>
                    {transaction.status === "pending" ? (
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// Business Analytics View Component
function BusinessAnalyticsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Business Analytics</h1>
        </div>
      </div>

      {/* Revenue Trends */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Revenue Trends</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">$1,650</p>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +23% vs last month
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Last Month</p>
              <p className="text-2xl font-bold text-gray-900">$1,340</p>
              <p className="text-xs text-red-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -5% vs previous
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Analytics */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Session Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Most Popular Service</span>
              <span className="text-sm font-medium">HIIT Training</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Peak Hours</span>
              <span className="text-sm font-medium">6:00 PM - 8:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Session Duration</span>
              <span className="text-sm font-medium">60 minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cancellation Rate</span>
              <span className="text-sm font-medium text-green-600">8%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Insights */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Client Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">New Clients This Month</span>
              <span className="text-sm font-medium">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Client Retention Rate</span>
              <span className="text-sm font-medium text-green-600">92%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Client LTV</span>
              <span className="text-sm font-medium">$720</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Repeat Booking Rate</span>
              <span className="text-sm font-medium text-green-600">85%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Client Follow-ups View Component
function ClientFollowupsView({ onBack }: { onBack: () => void }) {
  const [selectedClients, setSelectedClients] = useState<string[]>([])
  const [messageTemplate, setMessageTemplate] = useState("check-in")
  const [customMessage, setCustomMessage] = useState("")

  const followupClients = [
    {
      id: 1,
      name: "Mike R.",
      avatar: "MR",
      lastSession: "2 weeks ago",
      lastService: "HIIT Session",
      totalSessions: 6,
      avgSessionValue: 80,
      preferredTime: "Evenings",
      status: "At Risk",
      reason: "No booking in 2 weeks",
    },
    {
      id: 2,
      name: "Lisa M.",
      avatar: "LM",
      lastSession: "3 weeks ago",
      lastService: "Yoga",
      totalSessions: 8,
      avgSessionValue: 65,
      preferredTime: "Mornings",
      status: "At Risk",
      reason: "No booking in 3 weeks",
    },
  ]

  const messageTemplates = {
    "check-in":
      "Hi {name}! I noticed it's been a while since our last session. How are you doing? Would you like to schedule another {service} session?",
    "special-offer":
      "Hi {name}! I'm offering a 10% discount on your next {service} session. Would you like to book this week?",
    "new-program":
      "Hi {name}! I've developed a new training program that I think you'd love. Would you like to hear about it?",
    custom: customMessage,
  }

  const toggleClientSelection = (clientName: string) => {
    setSelectedClients((prev) =>
      prev.includes(clientName) ? prev.filter((name) => name !== clientName) : [...prev, clientName],
    )
  }

  const selectAllClients = () => {
    setSelectedClients(followupClients.map((client) => client.name))
  }

  const clearSelection = () => {
    setSelectedClients([])
  }

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Client Follow-ups</h1>
        </div>
      </div>

      {/* Summary */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Clients needing follow-up</p>
              <p className="text-2xl font-bold text-gray-900">{followupClients.length}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Potential revenue</p>
              <p className="text-lg font-semibold text-green-600">
                ${followupClients.reduce((sum, client) => sum + client.avgSessionValue, 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Selection */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Select Clients</CardTitle>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={selectAllClients}>
                Select All
              </Button>
              <Button variant="ghost" size="sm" onClick={clearSelection}>
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {followupClients.map((client) => (
            <div
              key={client.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedClients.includes(client.name)
                  ? "border-blue-200 bg-blue-50"
                  : "border-gray-100 bg-white hover:bg-gray-50"
              }`}
              onClick={() => toggleClientSelection(client.name)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedClients.includes(client.name)}
                    onChange={() => toggleClientSelection(client.name)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">{client.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{client.name}</p>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                      {client.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Last: {client.lastSession} • {client.lastService}
                  </p>
                  <p className="text-xs text-gray-500">
                    {client.totalSessions} sessions • ${client.avgSessionValue} avg
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Message Template */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Message Template</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Choose Template</label>
            <div className="space-y-2">
              {Object.entries({
                "check-in": "Friendly Check-in",
                "special-offer": "Special Offer",
                "new-program": "New Program",
                custom: "Custom Message",
              }).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={key}
                    name="template"
                    value={key}
                    checked={messageTemplate === key}
                    onChange={(e) => setMessageTemplate(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label htmlFor={key} className="text-sm text-gray-700">
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {messageTemplate === "custom" && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Custom Message</label>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Write your custom message..."
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                rows={4}
              />
            </div>
          )}

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Preview:</p>
            <p className="text-sm text-gray-900">
              {messageTemplates[messageTemplate as keyof typeof messageTemplates]
                .replace("{name}", selectedClients[0] || "Client")
                .replace("{service}", "your preferred")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6 space-y-3">
          <Button className="w-full" disabled={selectedClients.length === 0}>
            <Send className="h-4 w-4 mr-2" />
            Send Messages ({selectedClients.length})
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Later
            </Button>
            <Button variant="outline" className="bg-transparent">
              <FileText className="h-4 w-4 mr-2" />
              Save Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Pending Requests View Component
function PendingRequestsView({ onBack }: { onBack: () => void }) {
  const [selectedRequests, setSelectedRequests] = useState<number[]>([])
  const [filterPriority, setFilterPriority] = useState("all")

  const pendingRequests = [
    {
      id: 1,
      client: "Alex T.",
      avatar: "AT",
      service: "Personal Training",
      requestedDate: "Tomorrow",
      requestedTime: "10:00 AM",
      duration: "60 min",
      price: 85,
      message: "Looking for strength training focused on upper body",
      waitingTime: "2 hours",
      priority: "high",
      clientInfo: {
        totalSessions: 0,
        isNewClient: true,
        preferredServices: ["Strength Training"],
      },
    },
    {
      id: 2,
      client: "Maria S.",
      avatar: "MS",
      service: "Yoga Session",
      requestedDate: "Friday",
      requestedTime: "6:00 PM",
      duration: "90 min",
      price: 75,
      message: "Need help with flexibility and stress relief",
      waitingTime: "4 hours",
      priority: "medium",
      clientInfo: {
        totalSessions: 3,
        isNewClient: false,
        preferredServices: ["Yoga", "Pilates"],
      },
    },
    {
      id: 3,
      client: "David K.",
      avatar: "DK",
      service: "HIIT Training",
      requestedDate: "Saturday",
      requestedTime: "9:00 AM",
      duration: "45 min",
      price: 80,
      message: "Want to improve cardio fitness",
      waitingTime: "6 hours",
      priority: "low",
      clientInfo: {
        totalSessions: 1,
        isNewClient: false,
        preferredServices: ["HIIT", "Cardio"],
      },
    },
  ]

  const filteredRequests = pendingRequests.filter(
    (request) => filterPriority === "all" || request.priority === filterPriority,
  )

  const toggleRequestSelection = (requestId: number) => {
    setSelectedRequests((prev) =>
      prev.includes(requestId) ? prev.filter((id) => id !== requestId) : [...prev, requestId],
    )
  }

  const selectAllRequests = () => {
    setSelectedRequests(filteredRequests.map((request) => request.id))
  }

  const clearSelection = () => {
    setSelectedRequests([])
  }

  const acceptSelected = () => {
    // Handle bulk accept logic
    console.log("Accepting requests:", selectedRequests)
  }

  const declineSelected = () => {
    // Handle bulk decline logic
    console.log("Declining requests:", selectedRequests)
  }

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Pending Requests</h1>
        </div>
      </div>

      {/* Summary */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending requests</p>
              <p className="text-2xl font-bold text-gray-900">{pendingRequests.length}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Potential revenue</p>
              <p className="text-lg font-semibold text-green-600">
                ${pendingRequests.reduce((sum, request) => sum + request.price, 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter and Selection */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {["all", "high", "medium", "low"].map((priority) => (
                <Button
                  key={priority}
                  variant={filterPriority === priority ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterPriority(priority)}
                  className="bg-transparent capitalize"
                >
                  {priority} {priority !== "all" && "priority"}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={selectAllRequests}>
                Select All
              </Button>
              <Button variant="ghost" size="sm" onClick={clearSelection}>
                Clear
              </Button>
            </div>
            <span className="text-sm text-gray-600">{selectedRequests.length} selected</span>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-3">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Request Header */}
                <div className="flex items-start space-x-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedRequests.includes(request.id)}
                      onChange={() => toggleRequestSelection(request.id)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">{request.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900">{request.client}</p>
                      {request.clientInfo.isNewClient && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                          New Client
                        </Badge>
                      )}
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          request.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : request.priority === "medium"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {request.priority} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{request.service}</p>
                    <p className="text-xs text-gray-500">{request.clientInfo.totalSessions} previous sessions</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${request.price}</p>
                    <p className="text-xs text-gray-500">{request.duration}</p>
                  </div>
                </div>

                {/* Request Details */}
                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Requested Date:</span>
                    <span className="font-medium">{request.requestedDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Requested Time:</span>
                    <span className="font-medium">{request.requestedTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Waiting Time:</span>
                    <span className="font-medium text-orange-600">{request.waitingTime}</span>
                  </div>
                </div>

                {/* Client Message */}
                {request.message && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-600 mb-1">Client Message:</p>
                    <p className="text-sm text-blue-900">"{request.message}"</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    Accept
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Decline
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedRequests.length > 0 && (
        <Card className="border-0 shadow-sm bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-blue-900">
                {selectedRequests.length} request{selectedRequests.length > 1 ? "s" : ""} selected
              </p>
              <p className="text-sm font-semibold text-green-600">
                $
                {pendingRequests
                  .filter((req) => selectedRequests.includes(req.id))
                  .reduce((sum, req) => sum + req.price, 0)}{" "}
                potential
              </p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" className="flex-1" onClick={acceptSelected}>
                Accept Selected
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-white" onClick={declineSelected}>
                Decline Selected
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full bg-transparent">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Accept All High Priority
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar Availability
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <Send className="h-4 w-4 mr-2" />
            Send Bulk Response
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
