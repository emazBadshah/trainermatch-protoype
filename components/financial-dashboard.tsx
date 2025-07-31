"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Download,
  Eye,
  Users,
  Target,
  CreditCard,
  FileText,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Filter,
  Search,
  MessageCircle,
  Save,
} from "lucide-react"

type FinancialView =
  | "overview"
  | "client-details"
  | "tax-export"
  | "growth-opportunities"
  | "transaction-history"
  | "business-analytics"
  | "follow-up-details"
  | "pending-bookings-details"

interface FinancialDashboardProps {
  onBack: () => void
}

export function FinancialDashboard({ onBack }: FinancialDashboardProps) {
  const [currentView, setCurrentView] = useState<FinancialView>("overview")
  const [selectedClient, setSelectedClient] = useState<any>(null)

  if (currentView === "client-details") {
    return <ClientDetails client={selectedClient} onBack={() => setCurrentView("overview")} />
  }

  if (currentView === "tax-export") {
    return <TaxExport onBack={() => setCurrentView("overview")} />
  }

  if (currentView === "growth-opportunities") {
    return <GrowthOpportunities onBack={() => setCurrentView("overview")} setCurrentView={setCurrentView} />
  }

  if (currentView === "follow-up-details") {
    return <FollowUpDetails onBack={() => setCurrentView("growth-opportunities")} />
  }

  if (currentView === "pending-bookings-details") {
    return <PendingBookingsDetails onBack={() => setCurrentView("growth-opportunities")} />
  }

  if (currentView === "transaction-history") {
    return <TransactionHistory onBack={() => setCurrentView("overview")} />
  }

  if (currentView === "business-analytics") {
    return <BusinessAnalytics onBack={() => setCurrentView("overview")} />
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
            <h1 className="text-2xl font-semibold text-gray-900">Financial Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your business performance</p>
          </div>
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
              <p className="text-sm text-gray-600">Today</p>
              <p className="text-2xl font-bold text-gray-900">$140</p>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% vs yesterday
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">$485</p>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% vs last week
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">$1,650</p>
              <p className="text-xs text-gray-500">83% of $2,000 goal</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">This Year</p>
              <p className="text-2xl font-bold text-gray-900">$18,240</p>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15% vs last year
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Performance */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Business Performance</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setCurrentView("business-analytics")}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-lg font-semibold text-gray-900">24</p>
              <p className="text-xs text-gray-600">Active Clients</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-lg font-semibold text-gray-900">89%</p>
              <p className="text-xs text-gray-600">Session Rate</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-lg font-semibold text-gray-900">$76</p>
              <p className="text-xs text-gray-600">Avg Session</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Monthly Revenue Goal</span>
              <span className="font-medium">$1,650 / $2,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "83%" }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Management */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Tax Management</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setCurrentView("tax-export")}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-green-900">Q4 2024 Ready</p>
              <p className="text-xs text-green-700">All transactions categorized</p>
            </div>
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Business Expenses</p>
              <p className="font-semibold text-gray-900">$2,340</p>
            </div>
            <div>
              <p className="text-gray-600">Tax Deductions</p>
              <p className="font-semibold text-gray-900">$1,890</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Financial Overview */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Top Clients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "Emma L.", avatar: "EL", revenue: 520, sessions: 8, trend: "up" },
            { name: "John D.", avatar: "JD", revenue: 450, sessions: 6, trend: "up" },
            { name: "Sarah K.", avatar: "SK", revenue: 380, sessions: 5, trend: "down" },
          ].map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-50"
              onClick={() => {
                setSelectedClient(client)
                setCurrentView("client-details")
              }}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-700">{client.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{client.name}</p>
                  <p className="text-sm text-gray-600">{client.sessions} sessions this month</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${client.revenue}</p>
                <div className="flex items-center space-x-1">
                  {client.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600" />
                  )}
                  <span className={`text-xs ${client.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {client.trend === "up" ? "+12%" : "-5%"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setCurrentView("transaction-history")}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { client: "Emma L.", service: "Yoga Session", amount: 65, time: "2 hours ago", status: "completed" },
            { client: "John D.", service: "Strength Training", amount: 75, time: "1 day ago", status: "completed" },
            { client: "Sarah K.", service: "HIIT Session", amount: 80, time: "2 days ago", status: "pending" },
          ].map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
              <div>
                <p className="font-medium text-gray-900">{transaction.client}</p>
                <p className="text-sm text-gray-600">{transaction.service}</p>
                <p className="text-xs text-gray-500">{transaction.time}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${transaction.amount}</p>
                <Badge
                  variant={transaction.status === "completed" ? "secondary" : "outline"}
                  className={
                    transaction.status === "completed" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                  }
                >
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Growth Opportunities */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Growth Opportunities</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setCurrentView("growth-opportunities")}>
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-blue-900">Client Follow-ups</h4>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                5 pending
              </Badge>
            </div>
            <p className="text-sm text-blue-700 mb-2">Clients who haven't booked in 2+ weeks</p>
            <Button size="sm" variant="outline" className="bg-white">
              View Details
            </Button>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-green-900">Pending Bookings</h4>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                3 requests
              </Badge>
            </div>
            <p className="text-sm text-green-700 mb-2">New session requests awaiting confirmation</p>
            <Button size="sm" variant="outline" className="bg-white">
              Review Requests
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Client Details Component
function ClientDetails({ client, onBack }: { client: any; onBack: () => void }) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Client Details</h1>
            <p className="text-gray-600 mt-1">{client.name}</p>
          </div>
        </div>
      </div>

      {/* Client Overview */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-blue-100 text-blue-700 text-lg">{client.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{client.name}</h2>
              <p className="text-gray-600">Active since March 2024</p>
              <Badge variant="secondary" className="bg-green-100 text-green-700 mt-1">
                Premium Client
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
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-900">${client.revenue}</p>
              <p className="text-sm text-blue-700">Total Revenue</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-900">{client.sessions}</p>
              <p className="text-sm text-green-700">Sessions This Month</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Average Session Value</span>
              <span className="font-medium">${Math.round(client.revenue / client.sessions)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium">Credit Card</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Next Payment</span>
              <span className="font-medium">Dec 15, 2024</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { date: "Dec 10", service: "Yoga Session", amount: 65, status: "completed" },
            { date: "Dec 8", service: "Pilates", amount: 70, status: "completed" },
            { date: "Dec 5", service: "Yoga Session", amount: 65, status: "completed" },
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
              <div>
                <p className="font-medium text-gray-900">{session.service}</p>
                <p className="text-sm text-gray-600">{session.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${session.amount}</p>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {session.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="bg-transparent">
          <MessageCircle className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Book Session
        </Button>
      </div>
    </div>
  )
}

// Tax Export Component
function TaxExport({ onBack }: { onBack: () => void }) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Tax Export</h1>
            <p className="text-gray-600 mt-1">Download tax documents</p>
          </div>
        </div>
      </div>

      {/* Tax Summary */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">2024 Tax Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-900">$18,240</p>
              <p className="text-sm text-green-700">Total Income</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-900">$2,340</p>
              <p className="text-sm text-blue-700">Business Expenses</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Equipment Purchases</span>
              <span className="font-medium">$890</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Professional Development</span>
              <span className="font-medium">$650</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Marketing & Advertising</span>
              <span className="font-medium">$450</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Insurance</span>
              <span className="font-medium">$350</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Export Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            Download Full Tax Report (PDF)
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export Transaction Data (CSV)
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <CreditCard className="h-4 w-4 mr-2" />
            Payment Summary Report
          </Button>
        </CardContent>
      </Card>

      {/* Quarterly Breakdown */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Quarterly Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { quarter: "Q1 2024", income: 4200, expenses: 580, status: "complete" },
            { quarter: "Q2 2024", income: 4800, expenses: 620, status: "complete" },
            { quarter: "Q3 2024", income: 4640, expenses: 590, status: "complete" },
            { quarter: "Q4 2024", income: 4600, expenses: 550, status: "in-progress" },
          ].map((quarter, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
              <div>
                <p className="font-medium text-gray-900">{quarter.quarter}</p>
                <p className="text-sm text-gray-600">
                  Income: ${quarter.income.toLocaleString()} | Expenses: ${quarter.expenses.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <Badge
                  variant={quarter.status === "complete" ? "secondary" : "outline"}
                  className={
                    quarter.status === "complete" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                  }
                >
                  {quarter.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// Growth Opportunities Component
function GrowthOpportunities({
  onBack,
  setCurrentView,
}: { onBack: () => void; setCurrentView: (view: FinancialView) => void }) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Growth Opportunities</h1>
            <p className="text-gray-600 mt-1">Expand your business</p>
          </div>
        </div>
      </div>

      {/* Client Follow-ups */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              Client Follow-ups
            </CardTitle>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              5 pending
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600 mb-3">
            Clients who haven't booked sessions in 2+ weeks. Following up can increase rebooking rates by 40%.
          </p>

          {[
            { name: "Mike R.", avatar: "MR", lastSession: "3 weeks ago", potentialRevenue: 240 },
            { name: "Lisa M.", avatar: "LM", lastSession: "2 weeks ago", potentialRevenue: 195 },
            { name: "David K.", avatar: "DK", lastSession: "4 weeks ago", potentialRevenue: 300 },
          ].map((client, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-700">{client.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{client.name}</p>
                  <p className="text-sm text-gray-600">Last session: {client.lastSession}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">+${client.potentialRevenue}</p>
                <p className="text-xs text-gray-500">potential</p>
              </div>
            </div>
          ))}

          <Button className="w-full" onClick={() => setCurrentView("follow-up-details")}>
            <MessageCircle className="h-4 w-4 mr-2" />
            Start Follow-up Campaign
          </Button>
        </CardContent>
      </Card>

      {/* Pending Booking Requests */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-green-600" />
              Pending Bookings
            </CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              3 requests
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600 mb-3">
            New session requests awaiting your confirmation. Quick responses increase booking conversion by 60%.
          </p>

          {[
            {
              name: "Jennifer S.",
              avatar: "JS",
              service: "Yoga Session",
              requestedTime: "Tomorrow 10:00 AM",
              value: 65,
            },
            { name: "Robert T.", avatar: "RT", service: "HIIT Training", requestedTime: "Friday 6:00 PM", value: 80 },
            {
              name: "Maria G.",
              avatar: "MG",
              service: "Personal Training",
              requestedTime: "Saturday 9:00 AM",
              value: 75,
            },
          ].map((request, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-green-100 text-green-700">{request.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{request.name}</p>
                  <p className="text-sm text-gray-600">{request.service}</p>
                  <p className="text-xs text-gray-500">{request.requestedTime}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">${request.value}</p>
                <Badge variant="outline" className="text-xs">
                  New
                </Badge>
              </div>
            </div>
          ))}

          <Button className="w-full" onClick={() => setCurrentView("pending-bookings-details")}>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Review Booking Requests
          </Button>
        </CardContent>
      </Card>

      {/* Revenue Impact */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-gray-900">Potential Revenue Impact</h3>
            <p className="text-3xl font-bold text-green-600">+$955</p>
            <p className="text-sm text-gray-600">
              By following up with inactive clients and confirming pending bookings
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Follow-up Details Component
function FollowUpDetails({ onBack }: { onBack: () => void }) {
  const [selectedClients, setSelectedClients] = useState<number[]>([])
  const [messageTemplate, setMessageTemplate] = useState(
    "Hi {name}! It's been a while since our last session. I'd love to help you continue your fitness journey. Are you available for a session this week?",
  )

  const clients = [
    {
      id: 1,
      name: "Mike R.",
      avatar: "MR",
      lastSession: "3 weeks ago",
      preferredTime: "Evenings",
      potentialRevenue: 240,
    },
    {
      id: 2,
      name: "Lisa M.",
      avatar: "LM",
      lastSession: "2 weeks ago",
      preferredTime: "Mornings",
      potentialRevenue: 195,
    },
    {
      id: 3,
      name: "David K.",
      avatar: "DK",
      lastSession: "4 weeks ago",
      preferredTime: "Weekends",
      potentialRevenue: 300,
    },
    {
      id: 4,
      name: "Anna P.",
      avatar: "AP",
      lastSession: "5 weeks ago",
      preferredTime: "Lunch time",
      potentialRevenue: 180,
    },
    {
      id: 5,
      name: "Tom W.",
      avatar: "TW",
      lastSession: "3 weeks ago",
      preferredTime: "Early morning",
      potentialRevenue: 220,
    },
  ]

  const toggleClient = (clientId: number) => {
    setSelectedClients((prev) => (prev.includes(clientId) ? prev.filter((id) => id !== clientId) : [...prev, clientId]))
  }

  const totalPotentialRevenue = clients
    .filter((client) => selectedClients.includes(client.id))
    .reduce((sum, client) => sum + client.potentialRevenue, 0)

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Client Follow-ups</h1>
            <p className="text-gray-600 mt-1">Re-engage inactive clients</p>
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      {selectedClients.length > 0 && (
        <Card className="border-0 shadow-sm bg-blue-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="font-medium text-blue-900">
                {selectedClients.length} client{selectedClients.length > 1 ? "s" : ""} selected
              </p>
              <p className="text-2xl font-bold text-green-600">+${totalPotentialRevenue}</p>
              <p className="text-sm text-blue-700">Potential revenue</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Client List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Select Clients to Follow Up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {clients.map((client) => (
            <div
              key={client.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedClients.includes(client.id)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => toggleClient(client.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-700">{client.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{client.name}</p>
                    <p className="text-sm text-gray-600">Last session: {client.lastSession}</p>
                    <p className="text-xs text-gray-500">Prefers: {client.preferredTime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">+${client.potentialRevenue}</p>
                  {selectedClients.includes(client.id) && <CheckCircle2 className="h-5 w-5 text-blue-600 mt-1" />}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Message Template */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Follow-up Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <textarea
            value={messageTemplate}
            onChange={(e) => setMessageTemplate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            rows={4}
            placeholder="Customize your follow-up message..."
          />
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {"{name}"} - Client name
            </Badge>
            <Badge variant="outline" className="text-xs">
              {"{last_session}"} - Last session date
            </Badge>
            <Badge variant="outline" className="text-xs">
              {"{preferred_time}"} - Preferred time
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Send Options */}
      <div className="space-y-3">
        <Button className="w-full" disabled={selectedClients.length === 0}>
          <MessageCircle className="h-4 w-4 mr-2" />
          Send Follow-up Messages ({selectedClients.length})
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="bg-transparent">
            <Clock className="h-4 w-4 mr-2" />
            Schedule Later
          </Button>
          <Button variant="outline" className="bg-transparent">
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>
    </div>
  )
}

// Pending Bookings Details Component
function PendingBookingsDetails({ onBack }: { onBack: () => void }) {
  const [bookingRequests, setBookingRequests] = useState([
    {
      id: 1,
      name: "Jennifer S.",
      avatar: "JS",
      service: "Yoga Session",
      requestedTime: "Tomorrow 10:00 AM",
      value: 65,
      message: "Hi! I'd like to book a yoga session focusing on stress relief and flexibility.",
      status: "pending",
    },
    {
      id: 2,
      name: "Robert T.",
      avatar: "RT",
      service: "HIIT Training",
      requestedTime: "Friday 6:00 PM",
      value: 80,
      message: "Looking for an intense HIIT workout to improve my cardio fitness.",
      status: "pending",
    },
    {
      id: 3,
      name: "Maria G.",
      avatar: "MG",
      service: "Personal Training",
      requestedTime: "Saturday 9:00 AM",
      value: 75,
      message: "Need help with strength training form and building a workout routine.",
      status: "pending",
    },
  ])

  const handleBookingAction = (bookingId: number, action: "accept" | "decline") => {
    setBookingRequests((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: action === "accept" ? "accepted" : "declined" } : booking,
      ),
    )
  }

  const pendingCount = bookingRequests.filter((b) => b.status === "pending").length
  const totalValue = bookingRequests.filter((b) => b.status === "accepted").reduce((sum, b) => sum + b.value, 0)

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Pending Bookings</h1>
            <p className="text-gray-600 mt-1">Review session requests</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <Card className="border-0 shadow-sm bg-green-50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-900">{pendingCount}</p>
              <p className="text-sm text-green-700">Pending Requests</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-900">${totalValue}</p>
              <p className="text-sm text-green-700">Confirmed Revenue</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Requests */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Session Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {bookingRequests.map((request) => (
            <div key={request.id} className="p-4 rounded-lg border border-gray-200 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-700">{request.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{request.name}</p>
                    <p className="text-sm text-gray-600">{request.service}</p>
                    <p className="text-xs text-gray-500">{request.requestedTime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${request.value}</p>
                  <Badge
                    variant={request.status === "pending" ? "outline" : "secondary"}
                    className={
                      request.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : request.status === "declined"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                    }
                  >
                    {request.status}
                  </Badge>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700">{request.message}</p>
              </div>

              {request.status === "pending" && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleBookingAction(request.id, "decline")}
                  >
                    Decline
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => handleBookingAction(request.id, "accept")}>
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                </div>
              )}

              {request.status === "accepted" && (
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Confirmation Details
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Add Availability
        </Button>
        <Button variant="outline" className="bg-transparent">
          <Calendar className="h-4 w-4 mr-2" />
          View Calendar
        </Button>
      </div>
    </div>
  )
}

// Transaction History Component
function TransactionHistory({ onBack }: { onBack: () => void }) {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const transactions = [
    {
      id: 1,
      client: "Emma L.",
      service: "Yoga Session",
      amount: 65,
      date: "2024-12-10",
      status: "completed",
      method: "Credit Card",
    },
    {
      id: 2,
      client: "John D.",
      service: "Strength Training",
      amount: 75,
      date: "2024-12-09",
      status: "completed",
      method: "Bank Transfer",
    },
    {
      id: 3,
      client: "Sarah K.",
      service: "HIIT Session",
      amount: 80,
      date: "2024-12-08",
      status: "pending",
      method: "Credit Card",
    },
    {
      id: 4,
      client: "Mike R.",
      service: "Personal Training",
      amount: 75,
      date: "2024-12-07",
      status: "completed",
      method: "Cash",
    },
    {
      id: 5,
      client: "Lisa M.",
      service: "Pilates",
      amount: 70,
      date: "2024-12-06",
      status: "completed",
      method: "Credit Card",
    },
    {
      id: 6,
      client: "David K.",
      service: "Yoga Session",
      amount: 65,
      date: "2024-12-05",
      status: "refunded",
      method: "Credit Card",
    },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = filter === "all" || transaction.status === filter
    const matchesSearch =
      transaction.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.service.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Transaction History</h1>
            <p className="text-gray-600 mt-1">All payment records</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            {["all", "completed", "pending", "refunded"].map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(status)}
                className={filter !== status ? "bg-transparent" : ""}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Transactions ({filteredTransactions.length})</CardTitle>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100"
            >
              <div>
                <p className="font-medium text-gray-900">{transaction.client}</p>
                <p className="text-sm text-gray-600">{transaction.service}</p>
                <p className="text-xs text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()} • {transaction.method}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${transaction.amount}</p>
                <Badge
                  variant="secondary"
                  className={
                    transaction.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : transaction.status === "pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                  }
                >
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Export Options */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
        <Button variant="outline" className="bg-transparent">
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>
    </div>
  )
}

// Business Analytics Component
function BusinessAnalytics({ onBack }: { onBack: () => void }) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Business Analytics</h1>
            <p className="text-gray-600 mt-1">Performance insights</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Key Performance Indicators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-900">89%</p>
              <p className="text-sm text-blue-700">Session Completion Rate</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-900">76%</p>
              <p className="text-sm text-green-700">Client Retention Rate</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-900">$76</p>
              <p className="text-sm text-purple-700">Avg Session Value</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <Users className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-900">24</p>
              <p className="text-sm text-orange-700">Active Clients</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Trends */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Revenue Trends</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            {[
              { month: "December", revenue: 1650, growth: 12, sessions: 22 },
              { month: "November", revenue: 1470, growth: 8, sessions: 19 },
              { month: "October", revenue: 1360, growth: -3, sessions: 18 },
              { month: "September", revenue: 1400, growth: 15, sessions: 20 },
            ].map((month, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">{month.month}</p>
                  <p className="text-sm text-gray-600">{month.sessions}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{month.revenue}</p>
                  <p className="text-xs text-gray-500">
                    {month.growth > 0 ? (
                      <span className="text-green-600 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />+{month.growth}%
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        {month.growth}%
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
