"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Clock,
  MapPin,
  Target,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  SkipForward,
  Star,
  MessageCircle,
  Camera,
  Send,
  Plus,
  Edit,
  Save,
  Dumbbell,
  Zap,
  Award,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react"

type SessionStep = "details" | "pre-session" | "during-session" | "post-session" | "summary" | "feedback" | "payment"

interface SessionFlowProps {
  session: any
  initialStep: SessionStep
  onBack: () => void
  onComplete: (sessionData: any) => void
}

export function SessionFlow({ session, initialStep, onBack, onComplete }: SessionFlowProps) {
  const [currentStep, setCurrentStep] = useState<SessionStep>(initialStep)
  const [sessionData, setSessionData] = useState(session)
  const [timer, setTimer] = useState({ isRunning: false, seconds: 0, currentExercise: 0 })
  const [sessionNotes, setSessionNotes] = useState("")
  const [clientFeedback, setClientFeedback] = useState({ rating: 0, comments: "" })

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timer.isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => ({ ...prev, seconds: prev.seconds + 1 }))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer.isRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getStepProgress = () => {
    const steps = ["details", "pre-session", "during-session", "post-session", "summary"]
    const currentIndex = steps.indexOf(currentStep)
    return ((currentIndex + 1) / steps.length) * 100
  }

  if (currentStep === "details") {
    return <SessionDetails session={sessionData} onNext={() => setCurrentStep("pre-session")} onBack={onBack} />
  }

  if (currentStep === "pre-session") {
    return (
      <PreSession
        session={sessionData}
        onNext={() => setCurrentStep("during-session")}
        onBack={() => setCurrentStep("details")}
        onUpdateSession={setSessionData}
      />
    )
  }

  if (currentStep === "during-session") {
    return (
      <DuringSession
        session={sessionData}
        timer={timer}
        setTimer={setTimer}
        onNext={() => setCurrentStep("post-session")}
        onBack={() => setCurrentStep("pre-session")}
        onUpdateSession={setSessionData}
      />
    )
  }

  if (currentStep === "post-session") {
    return (
      <PostSession
        session={sessionData}
        sessionNotes={sessionNotes}
        setSessionNotes={setSessionNotes}
        onNext={() => setCurrentStep("summary")}
        onBack={() => setCurrentStep("during-session")}
      />
    )
  }

  if (currentStep === "summary") {
    return (
      <SessionSummary
        session={sessionData}
        sessionNotes={sessionNotes}
        onComplete={onComplete}
        onBack={() => setCurrentStep("post-session")}
      />
    )
  }

  return null
}

function SessionDetails({ session, onNext, onBack }: any) {
  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Session Details</h1>
            <p className="text-gray-600 mt-1">
              {session.service} with {session.client}
            </p>
          </div>
        </div>
      </div>

      {/* Session Info */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-blue-100 text-blue-700 text-lg">{session.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{session.client}</h2>
              <p className="text-gray-600">{session.service}</p>
              <Badge
                variant="secondary"
                className={
                  session.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : session.status === "starting-soon"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-blue-100 text-blue-700"
                }
              >
                {session.status === "starting-soon"
                  ? "Starting Soon"
                  : session.status === "completed"
                    ? "Completed"
                    : "Upcoming"}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <div>
                <p className="font-medium">{session.time}</p>
                <p className="text-gray-600">{session.duration} minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <div>
                <p className="font-medium">{session.location}</p>
                <p className="text-gray-600">Location</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-purple-600" />
              <div>
                <p className="font-medium">${session.price}</p>
                <p className="text-gray-600">Session fee</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-4 w-4 text-orange-600" />
              <div>
                <p className="font-medium">{session.equipment.length} items</p>
                <p className="text-gray-600">Equipment</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Goals */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-600" />
            Client Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {session.clientGoals.map((goal: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-700">{goal}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Equipment Needed */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Equipment Needed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {session.equipment.map((item: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Session Notes */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Session Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">{session.notes}</p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex space-x-2">
        <Button variant="outline" className="flex-1 bg-transparent">
          <MessageCircle className="h-4 w-4 mr-2" />
          Message Client
        </Button>
        <Button className="flex-1" onClick={onNext}>
          {session.status === "starting-soon" ? "Start Session" : "Continue"}
        </Button>
      </div>
    </div>
  )
}

function PreSession({ session, onNext, onBack, onUpdateSession }: any) {
  const [checklist, setChecklist] = useState([
    { id: 1, item: "Equipment prepared", checked: false },
    { id: 2, item: "Space set up", checked: false },
    { id: 3, item: "Client contacted", checked: false },
    { id: 4, item: "Session plan reviewed", checked: false },
    { id: 5, item: "Music/playlist ready", checked: false },
  ])

  const [sessionPlan, setSessionPlan] = useState(session.sessionPlan)
  const [additionalNotes, setAdditionalNotes] = useState("")

  const toggleChecklistItem = (id: number) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const allChecked = checklist.every((item) => item.checked)

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Pre-Session Setup</h1>
            <p className="text-gray-600 mt-1">Prepare for {session.client}'s session</p>
          </div>
        </div>
      </div>

      {/* Session Info Bar */}
      <Card className="border-0 shadow-sm bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-blue-100 text-blue-700">{session.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-blue-900">{session.client}</p>
                <p className="text-sm text-blue-700">
                  {session.service} • {session.time}
                </p>
              </div>
            </div>
            <Badge className="bg-orange-100 text-orange-700">Starting Soon</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Pre-Session Checklist */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Pre-Session Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {checklist.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <button
                onClick={() => toggleChecklistItem(item.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  item.checked ? "bg-green-600 border-green-600 text-white" : "border-gray-300 hover:border-green-400"
                }`}
              >
                {item.checked && <CheckCircle2 className="h-3 w-3" />}
              </button>
              <span className={`text-sm ${item.checked ? "text-gray-500 line-through" : "text-gray-900"}`}>
                {item.item}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Session Plan Review */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Session Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sessionPlan.map((exercise: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{exercise.exercise}</p>
                <p className="text-sm text-gray-600">{exercise.duration} minutes</p>
              </div>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Exercise
          </Button>
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Any last-minute notes or adjustments..."
            className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex space-x-2">
        <Button variant="outline" className="flex-1 bg-transparent">
          <MessageCircle className="h-4 w-4 mr-2" />
          Quick Message
        </Button>
        <Button className="flex-1" onClick={onNext} disabled={!allChecked}>
          <Play className="h-4 w-4 mr-2" />
          Start Session
        </Button>
      </div>

      {!allChecked && (
        <p className="text-sm text-orange-600 text-center">Complete all checklist items to start the session</p>
      )}
    </div>
  )
}

function DuringSession({ session, timer, setTimer, onNext, onBack, onUpdateSession }: any) {
  const [sessionPlan, setSessionPlan] = useState(session.sessionPlan)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [sessionNotes, setSessionNotes] = useState("")
  const [clientPerformance, setClientPerformance] = useState({
    energy: 5,
    form: 5,
    engagement: 5,
  })

  const toggleTimer = () => {
    setTimer((prev: any) => ({ ...prev, isRunning: !prev.isRunning }))
  }

  const completeExercise = (index: number) => {
    const updatedPlan = sessionPlan.map((exercise: any, i: number) =>
      i === index ? { ...exercise, completed: true } : exercise,
    )
    setSessionPlan(updatedPlan)

    if (index < sessionPlan.length - 1) {
      setCurrentExercise(index + 1)
    }
  }

  const skipExercise = () => {
    if (currentExercise < sessionPlan.length - 1) {
      setCurrentExercise(currentExercise + 1)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const completedExercises = sessionPlan.filter((ex: any) => ex.completed).length
  const progressPercentage = (completedExercises / sessionPlan.length) * 100

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Active Session</h1>
            <p className="text-gray-600 mt-1">
              {session.client} • {session.service}
            </p>
          </div>
        </div>
      </div>

      {/* Session Timer */}
      <Card className="border-0 shadow-sm bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-700 mb-2">{formatTime(timer.seconds)}</div>
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" size="sm" onClick={toggleTimer} className="bg-white">
                {timer.isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {timer.isRunning ? "Pause" : "Start"}
              </Button>
              <div className="text-sm text-green-700">Session in progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Bar */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Session Progress</span>
            <span className="text-sm text-gray-600">
              {completedExercises}/{sessionPlan.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Current Exercise */}
      <Card className="border-0 shadow-sm border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Zap className="h-5 w-5 mr-2 text-blue-600" />
            Current Exercise
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentExercise < sessionPlan.length && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 text-lg">{sessionPlan[currentExercise].exercise}</h3>
              <p className="text-blue-700 mt-1">Duration: {sessionPlan[currentExercise].duration} minutes</p>
              <div className="flex space-x-2 mt-3">
                <Button size="sm" onClick={() => completeExercise(currentExercise)} className="flex-1">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Complete
                </Button>
                <Button variant="outline" size="sm" onClick={skipExercise} className="bg-white">
                  <SkipForward className="h-4 w-4 mr-2" />
                  Skip
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exercise List */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Exercise Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sessionPlan.map((exercise: any, index: number) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${
                index === currentExercise
                  ? "bg-blue-50 border border-blue-200"
                  : exercise.completed
                    ? "bg-green-50"
                    : "bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                {exercise.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : index === currentExercise ? (
                  <Circle className="h-5 w-5 text-blue-600 fill-current" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
                <div>
                  <p
                    className={`font-medium ${
                      exercise.completed
                        ? "text-green-700"
                        : index === currentExercise
                          ? "text-blue-900"
                          : "text-gray-700"
                    }`}
                  >
                    {exercise.exercise}
                  </p>
                  <p className="text-sm text-gray-600">{exercise.duration} min</p>
                </div>
              </div>
              {index === currentExercise && <Badge className="bg-blue-100 text-blue-700">Active</Badge>}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Client Performance Tracking */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Client Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(clientPerformance).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                <span className="text-sm text-gray-600">{value}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={value}
                onChange={(e) =>
                  setClientPerformance((prev) => ({
                    ...prev,
                    [key]: Number.parseInt(e.target.value),
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Session Notes */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Session Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={sessionNotes}
            onChange={(e) => setSessionNotes(e.target.value)}
            placeholder="Notes about client performance, modifications made, etc..."
            className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex space-x-2">
        <Button variant="outline" className="flex-1 bg-transparent">
          <Camera className="h-4 w-4 mr-2" />
          Take Photo
        </Button>
        <Button className="flex-1" onClick={onNext} disabled={completedExercises === 0}>
          End Session
        </Button>
      </div>
    </div>
  )
}

function PostSession({ session, sessionNotes, setSessionNotes, onNext, onBack }: any) {
  const [clientFeedback, setClientFeedback] = useState({ rating: 0, comments: "" })
  const [nextSessionPlanning, setNextSessionPlanning] = useState("")
  const [followUpActions, setFollowUpActions] = useState([
    { id: 1, action: "Send workout summary", checked: false },
    { id: 2, action: "Schedule next session", checked: false },
    { id: 3, action: "Update client progress", checked: false },
    { id: 4, action: "Send nutrition tips", checked: false },
  ])

  const toggleFollowUpAction = (id: number) => {
    setFollowUpActions((prev) =>
      prev.map((action) => (action.id === id ? { ...action, checked: !action.checked } : action)),
    )
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
            <h1 className="text-2xl font-semibold text-gray-900">Session Complete</h1>
            <p className="text-gray-600 mt-1">Wrap up with {session.client}</p>
          </div>
        </div>
      </div>

      {/* Session Summary */}
      <Card className="border-0 shadow-sm bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">Session Completed!</h3>
              <p className="text-green-700 text-sm">
                {session.service} with {session.client}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Notes */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Session Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={sessionNotes}
            onChange={(e) => setSessionNotes(e.target.value)}
            placeholder="How did the session go? Any observations about client performance..."
            className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Client Feedback */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Client Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Session Rating</p>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setClientFeedback((prev) => ({ ...prev, rating: star }))}
                  className={`w-8 h-8 ${star <= clientFeedback.rating ? "text-yellow-400" : "text-gray-300"}`}
                >
                  <Star className="w-full h-full fill-current" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Client Comments</label>
            <textarea
              value={clientFeedback.comments}
              onChange={(e) => setClientFeedback((prev) => ({ ...prev, comments: e.target.value }))}
              placeholder="Any feedback from the client..."
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg text-sm"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Next Session Planning */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Next Session Focus</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={nextSessionPlanning}
            onChange={(e) => setNextSessionPlanning(e.target.value)}
            placeholder="What should we focus on in the next session?"
            className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Follow-up Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Follow-up Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {followUpActions.map((action) => (
            <div key={action.id} className="flex items-center space-x-3">
              <button
                onClick={() => toggleFollowUpAction(action.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  action.checked ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 hover:border-blue-400"
                }`}
              >
                {action.checked && <CheckCircle2 className="h-3 w-3" />}
              </button>
              <span className={`text-sm ${action.checked ? "text-gray-500 line-through" : "text-gray-900"}`}>
                {action.action}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex space-x-2">
        <Button variant="outline" className="flex-1 bg-transparent">
          <MessageCircle className="h-4 w-4 mr-2" />
          Message Client
        </Button>
        <Button className="flex-1" onClick={onNext}>
          <Save className="h-4 w-4 mr-2" />
          Save & Continue
        </Button>
      </div>
    </div>
  )
}

function SessionSummary({ session, sessionNotes, onComplete, onBack }: any) {
  const completedExercises = session.sessionPlan.filter((ex: any) => ex.completed).length
  const totalExercises = session.sessionPlan.length
  const completionRate = (completedExercises / totalExercises) * 100

  return (
    <div className="p-3 space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Session Summary</h1>
            <p className="text-gray-600 mt-1">
              {session.service} with {session.client}
            </p>
          </div>
        </div>
      </div>

      {/* Success Card */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="pt-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Great Session!</h2>
          <p className="text-gray-600">You've successfully completed another training session</p>
        </CardContent>
      </Card>

      {/* Session Stats */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Session Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">{session.duration}</span>
              </div>
              <p className="text-sm text-gray-600">Minutes</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">{completedExercises}</span>
              </div>
              <p className="text-sm text-gray-600">Exercises</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900">{Math.round(completionRate)}%</span>
              </div>
              <p className="text-sm text-gray-600">Completion</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">${session.price}</span>
              </div>
              <p className="text-sm text-gray-600">Earned</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise Summary */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Exercises Completed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {session.sessionPlan.map((exercise: any, index: number) => (
            <div key={index} className="flex items-center space-x-3">
              {exercise.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
              <div className="flex-1">
                <p className={`font-medium ${exercise.completed ? "text-gray-900" : "text-gray-500"}`}>
                  {exercise.exercise}
                </p>
                <p className="text-sm text-gray-600">{exercise.duration} minutes</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Session Notes */}
      {sessionNotes && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Session Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">{sessionNotes}</p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Next
          </Button>
          <Button variant="outline" className="bg-transparent">
            <Send className="h-4 w-4 mr-2" />
            Send Summary
          </Button>
        </div>
        <Button className="w-full" onClick={() => onComplete(session)}>
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Complete Session
        </Button>
      </div>
    </div>
  )
}
