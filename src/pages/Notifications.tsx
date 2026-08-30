import {
  ArrowLeft,
  Bell,
  BookOpen,
  CheckCheck,
  Clock3,
  FileText,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "course" | "test" | "reminder" | "achievement";
  unread: boolean;
};

function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New lesson available",
      message:
        "A new Physics lesson has been added to your IMU CET preparation course.",
      time: "10 minutes ago",
      type: "course",
      unread: true,
    },
    {
      id: 2,
      title: "Mock test reminder",
      message:
        "Your Mechanics mock test is waiting. Test your preparation today.",
      time: "1 hour ago",
      type: "test",
      unread: true,
    },
    {
      id: 3,
      title: "Keep your streak going",
      message:
        "You have studied for 5 consecutive days. Continue learning to maintain your streak.",
      time: "3 hours ago",
      type: "reminder",
      unread: true,
    },
    {
      id: 4,
      title: "Achievement unlocked",
      message:
        "Congratulations! You completed 20 practice tests.",
      time: "Yesterday",
      type: "achievement",
      unread: false,
    },
    {
      id: 5,
      title: "Course progress updated",
      message:
        "You have completed 72% of your IMU CET preparation course.",
      time: "Yesterday",
      type: "course",
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const markAsRead = (id: number) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "course":
        return <BookOpen size={20} />;

      case "test":
        return <FileText size={20} />;

      case "reminder":
        return <Clock3 size={20} />;

      case "achievement":
        return <Trophy size={20} />;

      default:
        return <Bell size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              N
            </div>

            <div className="text-left">
              <p className="font-bold">NAVPATH</p>

              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                Academy
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Dashboard
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* TITLE */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Bell size={24} />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Updates
                </p>

                <h1 className="text-3xl font-bold text-slate-950">
                  Notifications
                </h1>
              </div>
            </div>

            <p className="mt-3 text-slate-500">
              Stay updated with your courses, tests and learning activity.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
            >
              <CheckCheck size={17} />
              Mark all as read
            </button>
          )}
        </div>

        {/* SUMMARY */}
        <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Bell size={20} />
            </div>

            <div>
              <p className="font-semibold text-blue-950">
                {unreadCount === 0
                  ? "You're all caught up!"
                  : `${unreadCount} unread ${
                      unreadCount === 1
                        ? "notification"
                        : "notifications"
                    }`}
              </p>

              <p className="mt-1 text-sm text-blue-900/60">
                We'll keep you updated about important learning activities.
              </p>
            </div>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {notifications.map((notification, index) => (
            <button
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`flex w-full gap-4 p-5 text-left transition hover:bg-slate-50 sm:p-6 ${
                index !== notifications.length - 1
                  ? "border-b border-slate-100"
                  : ""
              } ${
                notification.unread
                  ? "bg-blue-50/30"
                  : "bg-white"
              }`}
            >
              {/* ICON */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  notification.unread
                    ? "bg-blue-100 text-blue-600"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {getIcon(notification.type)}
              </div>

              {/* CONTENT */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-sm font-bold ${
                        notification.unread
                          ? "text-slate-950"
                          : "text-slate-700"
                      }`}
                    >
                      {notification.title}
                    </h3>

                    {notification.unread && (
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </div>

                  <span className="text-xs text-slate-400">
                    {notification.time}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {notification.message}
                </p>
              </div>
            </button>
          ))}
        </section>

        {/* EMPTY STATE */}
        {notifications.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Bell size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              No notifications
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              You're all caught up. New updates will appear here.
            </p>
          </div>
        )}

        {/* BACK */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← Back to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

export default Notifications;