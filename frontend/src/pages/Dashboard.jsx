import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  ClipboardList,
  StickyNote,
  Megaphone,
  Plus,
  Trash2,
  Check,
  X,
  Sun,
  Cloud,
  CloudRain,
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Archive,
  LayoutDashboard,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useStore from "@/store/useStore";

const WeatherWidget = () => {
  const weather = {
    name: "Chandigarh",
    main: { temp: 22, feels_like: 24 },
    weather: [{ main: "Clear", description: "clear sky" }],
  };

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case "clear":
        return <Sun className="w-5 h-5" />;
      case "clouds":
        return <Cloud className="w-5 h-5" />;
      case "rain":
        return <CloudRain className="w-5 h-5" />;
      default:
        return <Sun className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex items-center gap-2 text-gray-600">
      {getWeatherIcon(weather?.weather?.[0]?.main)}
      <span className="text-sm">
        {Math.round(weather?.main?.temp || 22)}°C {weather?.name || "London"}
      </span>
    </div>
  );
};

const WelcomeCard = ({ username }) => {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="bg-gradient-to-r from-gray-50 to-white border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Good day, {username}!
                </h2>
              </div>
            </div>
            <p className="text-gray-600">
              Here's your CRM dashboard overview for today.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarDays className="w-4 h-4" />
              <span>{today}</span>
            </div>
            <WeatherWidget />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");

  // Load from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: input.trim(),
          completed: false,
          priority: newTaskPriority,
        },
      ]);
      setInput("");
      setNewTaskPriority("medium");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-300";
    }
  };

  return (
    <Card className="overflow-x-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Tasks
          </CardTitle>
          <div className="flex gap-1">
            {["all", "pending", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs rounded-full capitalize ${
                  filter === f
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
            className="border px-2 py-2 rounded-lg text-sm"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button
            onClick={addTask}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 border-l-4 rounded-r-lg bg-gray-50 ${getPriorityColor(
                task.priority
              )}`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  task.completed
                    ? "bg-gray-800 border-gray-800 text-white"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {task.completed && <Check className="w-3 h-3" />}
              </button>
              <span
                className={`flex-1 text-sm ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => removeTask(task.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <ClipboardList className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No tasks found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const NotesWidget = () => {
  const [notes, setNotes] = useState(() => {
    return (
      localStorage.getItem("notes") ||
      "Welcome to your CRM dashboard!\n\nKey objectives for this quarter:\n• Increase lead conversion by 15%\n• Implement new follow-up system\n• Update customer database"
    );
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", notes);
  }, [notes]);

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <StickyNote className="w-5 h-5" />
            Quick Notes
          </CardTitle>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={isExpanded ? 10 : 6}
          className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
          placeholder="Write your notes here..."
        />
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span>{notes.length} characters</span>
          <span>Auto-saved</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default function DashboardPage() {
  const { user } = useStore();

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <div className="flex-1 flex flex-col p-4 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">
              Dashboard /{" "}
              <span className="text-gray-700 font-medium">CRM Overview</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <LayoutDashboard className="text-gray-800" />
              CRM Dashboard
            </h1>
          </div>
        </div>

        {/* Welcome Section */}
        <WelcomeCard username={user?.name} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TodoList />
          <NotesWidget />
        </div>
      </div>
    </div>
  );
}
