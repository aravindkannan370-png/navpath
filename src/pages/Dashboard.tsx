import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  GraduationCap,
  Search,
  X,
} from "lucide-react";

import { courses } from "../data/courses";

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Welcome to NavPath Academy",
    message:
      "Start exploring courses and continue your maritime learning journey.",
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    title: "IMU CET 2027 Course Available",
    message:
      "The complete IMU CET 2027 preparation course is now available.",
    time: "Today",
    read: false,
  },
  {
    id: 3,
    title: "Mock Tests Available",
    message:
      "Practice with the new IMU CET Mock Test Series.",
    time: "Yesterday",
    read: true,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notifications, setNotifications] = useState<Notification[]>(
    () => {
      try {
        const saved = localStorage.getItem(
          "navpathNotifications"
        );

        if (saved) {
          return JSON.parse(saved);
        }
      } catch {
        // Ignore invalid localStorage data
      }

      return initialNotifications;
    }
  );

  const filteredCourses = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return [];

    return courses.filter((course) => {
      return (
        course.title.toLowerCase().includes(value) ||
        course.category.toLowerCase().includes(value) ||
        course.description.toLowerCase().includes(value)
      );
    });
  }, [search]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const saveNotifications = (
    updated: Notification[]
  ) => {
    setNotifications(updated);

    localStorage.setItem(
      "navpathNotifications",
      JSON.stringify(updated)
    );
  };

  const markAsRead = (id: number) => {
    const updated = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, read: true }
        : notification
    );

    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));

    saveNotifications(updated);
  };

  const handleCourseClick = (courseId: string) => {
    setSearch("");
    setShowSearch(false);
    navigate(`/courses/${courseId}`);
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
              <GraduationCap size={24} />
            </div>

            <div>
              <p className="font-bold tracking-wide text-slate-950">
                NAVPATH
              </p>

              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                Academy
              </p>
            </div>
          </Link>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              type="button"
              onClick={() => {
                setShowSearch(!showSearch);
                setShowNotifications(false);
              }}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
              aria-label="Search courses"
            >
              <Search size={21} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(
                    !showNotifications
                  );
                  setShowSearch(false);
                }}
                className="relative flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
                aria-label="Notifications"
              >
                <Bell size={21} />

                {unreadCount > 0 && (
                  <span className="absolute right-1.5 top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {unreadCount > 9
                      ? "9+"
                      : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-14 z-50 w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:w-[380px]">
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div>
                      <h3 className="font-bold text-slate-900">
                        Notifications
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {unreadCount} unread notification
                        {unreadCount !== 1 ? "s" : ""}
                      </p>
                    </div>

                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllAsRead}
                        className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                      >
                        <Check size={14} />
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-[380px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-5 py-10 text-center">
                        <Bell
                          size={32}
                          className="mx-auto text-slate-300"
                        />

                        <p className="mt-3 font-medium text-slate-700">
                          No notifications
                        </p>
                      </div>
                    ) : (
                      notifications.map(
                        (notification) => (
                          <button
                            key={notification.id}
                            type="button"
                            onClick={() =>
                              markAsRead(
                                notification.id
                              )
                            }
                            className={`w-full border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50 ${
                              !notification.read
                                ? "bg-blue-50/60"
                                : "bg-white"
                            }`}
                          >
                            <div className="flex gap-3">
                              <div
                                className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                                  notification.read
                                    ? "bg-slate-200"
                                    : "bg-blue-600"
                                }`}
                              />

                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-900">
                                  {notification.title}
                                </p>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                  {notification.message}
                                </p>

                                <p className="mt-2 text-[11px] font-medium text-slate-400">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </button>
                        )
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="ml-1 flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700 hover:bg-blue-200"
              aria-label="Profile"
            >
              A
            </button>
          </div>
        </div>

        {/* Search Panel */}
        {showSearch && (
          <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-sm">
            <div className="mx-auto max-w-7xl">
              <div className="relative">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search courses..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              {/* Search Results */}
              {search.trim() && (
                <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  {filteredCourses.length === 0 ? (
                    <div className="px-5 py-8 text-center">
                      <BookOpen
                        size={32}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-3 font-semibold text-slate-800">
                        No courses found
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Try another course name or category.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {filteredCourses.map(
                        (course) => (
                          <button
                            key={course.id}
                            type="button"
                            onClick={() =>
                              handleCourseClick(
                                course.id
                              )
                            }
                            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-blue-50"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                <BookOpen size={19} />
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-900">
                                  {course.title}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                  {course.category} •{" "}
                                  {course.lessons.length}{" "}
                                  lessons •{" "}
                                  {formatPrice(
                                    course.price
                                  )}
                                </p>
                              </div>
                            </div>

                            <ChevronRight
                              size={18}
                              className="shrink-0 text-slate-400"
                            />
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Welcome */}
        <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-7 text-white shadow-sm sm:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Student Dashboard
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Welcome to NavPath Academy
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Continue your learning journey, explore courses
              and prepare for your maritime career.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/courses"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Courses
              </Link>

              <Link
                to="/my-courses"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                My Courses
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/courses"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <BookOpen size={22} />
            </div>

            <h2 className="mt-5 font-bold text-slate-900">
              Explore Courses
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Browse all available NavPath courses.
            </p>

            <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-600">
              View courses
              <ChevronRight size={16} />
            </div>
          </Link>

          <Link
            to="/my-courses"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <GraduationCap size={22} />
            </div>

            <h2 className="mt-5 font-bold text-slate-900">
              My Courses
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Continue courses you have enrolled in.
            </p>

            <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-green-600">
              Continue learning
              <ChevronRight size={16} />
            </div>
          </Link>

          <Link
            to="/progress"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <Clock size={22} />
            </div>

            <h2 className="mt-5 font-bold text-slate-900">
              My Progress
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Track your learning and test performance.
            </p>

            <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-purple-600">
              View progress
              <ChevronRight size={16} />
            </div>
          </Link>

          <Link
            to="/support"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Bell size={22} />
            </div>

            <h2 className="mt-5 font-bold text-slate-900">
              Support
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Get help with your learning journey.
            </p>

            <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-orange-600">
              Contact support
              <ChevronRight size={16} />
            </div>
          </Link>
        </section>

        {/* Featured Courses */}
        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Featured Learning
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Popular Courses
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Start preparing with structured learning resources.
              </p>
            </div>

            <Link
              to="/courses"
              className="hidden items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:flex"
            >
              View all
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <article
                key={course.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">
                  <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                    {course.category}
                  </span>

                  <h3 className="mt-4 min-h-[56px] text-lg font-bold leading-7">
                    {course.title}
                  </h3>
                </div>

                <div className="p-6">
                  <p className="min-h-[48px] text-sm leading-6 text-slate-600">
                    {course.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <BookOpen size={16} />
                      {course.lessons.length} lessons
                    </span>

                    <span className="font-bold text-slate-900">
                      {formatPrice(course.price)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/courses/${course.id}`)
                    }
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    View Course
                    <ChevronRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Mobile View All */}
        <Link
          to="/courses"
          className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-blue-600 sm:hidden"
        >
          View All Courses
          <ChevronRight size={17} />
        </Link>
      </main>
    </div>
  );
}