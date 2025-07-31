"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Search,
  Phone,
  Video,
  MoreHorizontal,
  Send,
  Paperclip,
  Smile,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Star,
  Archive,
  Trash2,
} from "lucide-react"

type ChatView = "list" | "conversation"

export function ChatDashboard() {
  const [currentView, setCurrentView] = useState<ChatView>("list")
  const [selectedChat, setSelectedChat] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [messageInput, setMessageInput] = useState("")

  const chats = [
    {
      id: 1,
      client: "Sarah K.",
      avatar: "SK",
      lastMessage: "Thanks for the great session today! See you Thursday.",
      time: "2 min ago",
      unread: 0,
      online: true,
      type: "client",
      totalSessions: 12,
      nextSession: "Thursday 6:00 PM",
      messages: [
        { id: 1, sender: "client", message: "Hi! Ready for today's session?", time: "10:00 AM", read: true },
        { id: 2, sender: "trainer", message: "See you at the gym in 10 minutes.", time: "10:02 AM", read: true },
        {
          id: 3,
          sender: "client",
          message: "Thanks for the great session today! See you Thursday.",
          time: "11:30 AM",
          read: true,
        },
      ],
    },
    {
      id: 2,
      client: "Emma L.",
      avatar: "EL",
      lastMessage: "Can we reschedule tomorrow's yoga session?",
      time: "1 hour ago",
      unread: 2,
      online: false,
      type: "client",
      totalSessions: 8,
      nextSession: "Tomorrow 10:00 AM",
      messages: [
        { id: 1, sender: "client", message: "Hi Sarah!", time: "Yesterday", read: true },
        {
          id: 2,
          sender: "trainer",
          message: "Hello Emma! How are you feeling after yesterday's session?",
          time: "Yesterday",
          read: true,
        },
        { id: 3, sender: "client", message: "Great! A bit sore but in a good way 😊", time: "Yesterday", read: true },
        {
          id: 4,
          sender: "client",
          message: "Can we reschedule tomorrow's yoga session?",
          time: "1 hour ago",
          read: false,
        },
        { id: 5, sender: "client", message: "Something came up at work", time: "1 hour ago", read: false },
      ],
    },
    {
      id: 3,
      client: "Mike R.",
      avatar: "MR",
      lastMessage: "You: Let's focus on upper body next session",
      time: "3 hours ago",
      unread: 0,
      online: false,
      type: "client",
      totalSessions: 6,
      nextSession: "Friday 7:00 PM",
      messages: [
        {
          id: 1,
          sender: "client",
          message: "Hey, I'm really struggling with the diet plan",
          time: "4 hours ago",
          read: true,
        },
        {
          id: 2,
          sender: "trainer",
          message: "I understand. Let's adjust it to be more sustainable for you.",
          time: "3 hours ago",
          read: true,
        },
        {
          id: 3,
          sender: "trainer",
          message: "Let's focus on upper body next session",
          time: "3 hours ago",
          read: true,
        },
      ],
    },
    {
      id: 4,
      client: "John D.",
      avatar: "JD",
      lastMessage: "Perfect! I'll be there at 2 PM sharp.",
      time: "5 hours ago",
      unread: 0,
      online: true,
      type: "client",
      totalSessions: 15,
      nextSession: "Today 2:00 PM",
      messages: [
        {
          id: 1,
          sender: "trainer",
          message: "Don't forget about today's session at 2 PM!",
          time: "6 hours ago",
          read: true,
        },
        { id: 2, sender: "client", message: "Perfect! I'll be there at 2 PM sharp.", time: "5 hours ago", read: true },
      ],
    },
    {
      id: 5,
      client: "Lisa M.",
      avatar: "LM",
      lastMessage: "You: Thanks for the payment! See you next week.",
      time: "1 day ago",
      unread: 0,
      online: false,
      type: "client",
      totalSessions: 4,
      nextSession: "Next Monday 9:00 AM",
      messages: [
        {
          id: 1,
          sender: "client",
          message: "Just sent the payment for this week's sessions",
          time: "1 day ago",
          read: true,
        },
        {
          id: 2,
          sender: "trainer",
          message: "Thanks for the payment! See you next week.",
          time: "1 day ago",
          read: true,
        },
      ],
    },
  ]

  const filteredChats = chats.filter((chat) => chat.client.toLowerCase().includes(searchQuery.toLowerCase()))

  const totalUnread = chats.reduce((sum, chat) => sum + chat.unread, 0)

  const sendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      const newMessage = {
        id: selectedChat.messages.length + 1,
        sender: "trainer",
        message: messageInput,
        time: "Just now",
        read: true,
      }

      // Update the selected chat's messages
      const updatedChat = {
        ...selectedChat,
        messages: [...selectedChat.messages, newMessage],
        lastMessage: `You: ${messageInput}`,
        time: "Just now",
      }

      setSelectedChat(updatedChat)
      setMessageInput("")
    }
  }

  if (currentView === "conversation" && selectedChat) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-3 pt-12">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => setCurrentView("list")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-100 text-blue-700">{selectedChat.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h2 className="font-semibold text-gray-900">{selectedChat.client}</h2>
                {selectedChat.online && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
              </div>
              <p className="text-sm text-gray-600">{selectedChat.totalSessions} sessions</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Client Info Bar */}
        <div className="bg-blue-50 border-b border-blue-100 p-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-blue-900">Next: {selectedChat.nextSession}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-700">{selectedChat.totalSessions} sessions</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600">
              <Calendar className="h-4 w-4 mr-1" />
              Book
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 pb-20">
          {selectedChat.messages.map((message: any) => (
            <div key={message.id} className={`flex ${message.sender === "trainer" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === "trainer"
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <p className={`text-xs mt-1 ${message.sender === "trainer" ? "text-blue-100" : "text-gray-500"}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-3 pb-8">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button variant="ghost" size="sm">
              <Smile className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={sendMessage} disabled={!messageInput.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
            <p className="text-gray-600 mt-1">
              {totalUnread} unread message{totalUnread !== 1 ? "s" : ""}
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Star className="h-4 w-4 mr-2" />
              Starred
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Trash2 className="h-4 w-4 mr-2" />
              Deleted
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chat List */}
      <div className="space-y-3">
        {filteredChats.map((chat) => (
          <Card
            key={chat.id}
            className="border-0 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => {
              setSelectedChat(chat)
              setCurrentView("conversation")
            }}
          >
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-700">{chat.avatar}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 truncate">{chat.client}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{chat.time}</span>
                      {chat.unread > 0 && (
                        <Badge variant="destructive" className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{chat.nextSession}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-gray-500">{chat.totalSessions} sessions</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
