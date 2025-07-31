"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Search,
  Plus,
  MessageCircle,
  Phone,
  Video,
  Send,
  Paperclip,
  Smile,
  CheckCheck,
  Clock,
  MoreHorizontal,
  Star,
  Archive,
} from "lucide-react"

type ChatView = "all" | "starred" | "archived" | "conversation"

interface ChatDashboardProps {
  onBack: () => void
}

export function ChatDashboard({ onBack }: ChatDashboardProps) {
  const [currentView, setCurrentView] = useState<ChatView>("all")
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [newMessage, setNewMessage] = useState("")

  const conversations = [
    {
      id: 1,
      name: "Emma L.",
      avatar: "EL",
      lastMessage: "Thanks for the great session today! 💪",
      time: "2 min ago",
      unread: 2,
      online: true,
      starred: false,
      archived: false,
      type: "client",
    },
    {
      id: 2,
      name: "John D.",
      avatar: "JD",
      lastMessage: "Can we reschedule tomorrow's session?",
      time: "15 min ago",
      unread: 1,
      online: false,
      starred: true,
      archived: false,
      type: "client",
    },
    {
      id: 3,
      name: "Sarah K.",
      avatar: "SK",
      lastMessage: "Perfect! See you at 6 PM",
      time: "1 hour ago",
      unread: 0,
      online: true,
      starred: false,
      archived: false,
      type: "client",
    },
    {
      id: 4,
      name: "Mike R.",
      avatar: "MR",
      lastMessage: "Thanks for the workout plan!",
      time: "2 hours ago",
      unread: 0,
      online: false,
      starred: true,
      archived: false,
      type: "client",
    },
    {
      id: 5,
      name: "Lisa M.",
      avatar: "LM",
      lastMessage: "Great progress this week 🎉",
      time: "1 day ago",
      unread: 0,
      online: false,
      starred: false,
      archived: true,
      type: "client",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Emma L.",
      message: "Hi Sarah! Just wanted to thank you for today's session",
      time: "2:30 PM",
      sent: false,
      read: true,
    },
    {
      id: 2,
      sender: "You",
      message: "You're so welcome! You did amazing today 💪",
      time: "2:32 PM",
      sent: true,
      read: true,
    },
    {
      id: 3,
      sender: "Emma L.",
      message: "I can already feel the difference! Same time next week?",
      time: "2:35 PM",
      sent: false,
      read: true,
    },
    {
      id: 4,
      sender: "You",
      message: "I'll send you the calendar link",
      time: "2:36 PM",
      sent: true,
      read: false,
    },
    {
      id: 5,
      sender: "Emma L.",
      message: "Thanks for the great session today! 💪",
      time: "2:38 PM",
      sent: false,
      read: false,
    },
  ]

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesView =
      currentView === "all"
        ? !conv.archived
        : currentView === "starred"
          ? conv.starred && !conv.archived
          : currentView === "archived"
            ? conv.archived
            : true
    return matchesSearch && matchesView
  })

  const unreadCount = conversations.filter((c) => c.unread > 0 && !c.archived).length

  if (currentView === "conversation" && selectedConversation) {
    return (
      <ConversationView
        conversation={selectedConversation}
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onBack={() => setCurrentView("all")}
      />
    )
  }

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
              <p className="text-gray-600 mt-1">
                {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDropdown(!showDropdown)}
                className="hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-300">
                  <button
                    onClick={() => {
                      setCurrentView("starred")
                      setShowDropdown(false)
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-2"
                  >
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-700">Starred</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView("archived")
                      setShowDropdown(false)
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-2"
                  >
                    <Archive className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Archived</span>
                  </button>
                </div>
              )}
            </div>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
        </div>
      </div>

      {/* View Selector */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="pt-6">
          <div className="flex space-x-2">
            {[
              { id: "all", label: "All", count: conversations.filter((c) => !c.archived).length },
              { id: "starred", label: "Starred", count: conversations.filter((c) => c.starred && !c.archived).length },
              { id: "archived", label: "Archived", count: conversations.filter((c) => c.archived).length },
            ].map((view) => (
              <Button
                key={view.id}
                variant={currentView === view.id ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentView(view.id as ChatView)}
                className={`transition-all duration-200 hover:scale-105 active:scale-95 ${
                  currentView !== view.id ? "bg-transparent hover:bg-gray-50" : "shadow-md"
                }`}
              >
                {view.label}
                {view.count > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-gray-100 text-gray-600 text-xs">
                    {view.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors duration-200" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
            />
          </div>
        </CardContent>
      </Card>

      {/* Conversations List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
            {currentView === "all"
              ? "All Conversations"
              : currentView === "starred"
                ? "Starred Conversations"
                : "Archived Conversations"}
            <Badge variant="secondary" className="ml-2">
              {filteredConversations.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group"
              onClick={() => {
                setSelectedConversation(conversation)
                setCurrentView("conversation")
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 transition-transform duration-200 group-hover:scale-110">
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 font-semibold">
                      {conversation.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {conversation.name}
                      </h3>
                      {conversation.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                      {conversation.unread > 0 && (
                        <Badge className="bg-blue-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1 group-hover:text-gray-700 transition-colors duration-200">
                    {conversation.lastMessage}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {conversation.type}
                    </Badge>
                    {conversation.online && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                        Online
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredConversations.length === 0 && (
            <div className="text-center py-12 animate-in fade-in duration-500">
              <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No conversations found</p>
              <p className="text-gray-400 text-sm mt-1">
                {currentView === "starred"
                  ? "Star important conversations to find them here"
                  : currentView === "archived"
                    ? "Archived conversations will appear here"
                    : "Start a new conversation with your clients"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Conversation View Component
function ConversationView({ conversation, messages, newMessage, setNewMessage, onBack }: any) {
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message sending logic here
      setNewMessage("")
      // Simulate typing indicator
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 2000)
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700">
                    {conversation.avatar}
                  </AvatarFallback>
                </Avatar>
                {conversation.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{conversation.name}</h2>
                <p className="text-xs text-gray-500">{conversation.online ? "Online now" : "Last seen 2 hours ago"}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Video className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message: any) => (
          <div
            key={message.id}
            className={`flex ${message.sent ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl transition-all duration-200 hover:scale-[1.02] ${
                message.sent
                  ? "bg-blue-600 text-white rounded-br-md shadow-lg"
                  : "bg-white border border-gray-200 text-gray-900 rounded-bl-md shadow-sm"
              }`}
            >
              <p className="text-sm">{message.message}</p>
              <div
                className={`flex items-center justify-between mt-2 text-xs ${
                  message.sent ? "text-blue-100" : "text-gray-500"
                }`}
              >
                <span>{message.time}</span>
                {message.sent && (
                  <div className="flex items-center space-x-1">
                    {message.read ? (
                      <CheckCheck className="h-3 w-3 text-blue-200" />
                    ) : (
                      <Clock className="h-3 w-3 text-blue-200" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-md shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-100 p-4">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed rounded-full w-12 h-12 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
