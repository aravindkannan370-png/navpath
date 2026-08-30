import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  BookOpen,
  Clock,
  Target,
  Trophy,
  FileText,
  ArrowRight,
  Search,
  Headphones,
  Anchor,
  Ship,
  Compass,
  Navigation,
  Waves,
  GraduationCap,
  X,
  ShoppingCart,
} from "lucide-react";

import { courses as courseData } from "../data/courses";

type TestResult = {
  title: string;
  subject: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  date: string;
};

type NavPathUser = {
  name?: string;
  email?: string;
  isLoggedIn?: boolean;
};

function getCurrentUser(): NavPathUser | null {
  try {
    const savedUser = localStorage.getItem("navpath-user");

    if (!savedUser) {
      return null;
    }

    const parsed = JSON.parse(savedUser);

    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function getCompletedLessons(): string[] {
  try {
    const saved = localStorage.getItem(
      "navpath_completed_lessons"
    );

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getTestHistory(): TestResult[] {
  try {
    const saved = localStorage.getItem("testHistory");

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

function Dashboard() {
  const navigate = useNavigate();

  const [completedLessons, setCompletedLessons] =
    useState<string[]>([]);

  const [testHistory, setTestHistory] =
    useState<TestResult[]>([]);

  const [user, setUser] =
    useState<NavPathUser | null>(null);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const loadDashboardData = () => {
    setCompletedLessons(getCompletedLessons());
    setTestHistory(getTestHistory());
    setUser(getCurrentUser());
  };

  useEffect(() => {
    loadDashboardData();

    const handleStorage = () => {
      loadDashboardData();
    };

    const handleFocus = () => {
      loadDashboardData();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );

      window.removeEventListener(
        "focus",
        handleFocus
      );
    };
  }, []);

  /*
   * ============================
   * STUDENT
   * ============================
   */

  const studentName =
    user?.name?.trim() ||
    user?.email?.split("@")[0]?.trim() ||
    "Student";

  const firstName =
    studentName.split(" ")[0] || "Student";

  const avatarLetter =
    firstName.charAt(0).toUpperCase();

  /*
   * ============================
   * PROGRESS
   * ============================
   */

  const totalLessons =
    courseData.find(
      (course) => course.id === "imu-cet"
    )?.lessons.length || 0;

  const lessonsCompleted =
    completedLessons.length;

  const courseProgress =
    totalLessons === 0
      ? 0
      : Math.min(
          100,
          Math.round(
            (lessonsCompleted / totalLessons) * 100
          )
        );

  const testsCompleted =
    testHistory.length;

  const averageScore =
    testsCompleted === 0
      ? 0
      : Math.round(
          testHistory.reduce(
            (total, test) =>
              total + test.score,
            0
          ) / testsCompleted
        );

  const learningHours = Math.floor(
    (lessonsCompleted * 25) / 60
  );

  const learningMinutes =
    (lessonsCompleted * 25) % 60;

  const learningTime =
    learningHours > 0
      ? `${learningHours}h ${learningMinutes}m`
      : `${learningMinutes}m`;

  /*
   * ============================
   * COURSE SEARCH
   * ============================
   */

  const searchResults = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return [];
    }

    return courseData
      .filter(
        (course) =>
          course.title.toLowerCase().includes(value) ||
          course.category.toLowerCase().includes(value) ||
          course.description
            .toLowerCase()
            .includes(value)
      )
      .slice(0, 6);
  }, [search]);

  /*
   * ============================
   * NOTIFICATIONS
   * ============================
   */

  const notifications = [
    {
      id: 1,
      title: "New IMU CET course content",
      message:
        "Continue your IMU CET 2027 preparation.",
      time: "Recently",
    },
    {
      id: 2,
      title: "Mock tests available",
      message:
        "Practice with the latest IMU CET mock tests.",
      time: "Today",
    },
    {
      id: 3,
      title: "Keep learning",
      message:
        "Complete your next lesson to improve your progress.",
      time: "Today",
    },
  ];

  /*
   * ============================
   * RECOMMENDED COURSES
   * ============================
   */

  const recommendedCourses = courseData.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#eaf6fb] text-slate-950">

      {/* =========================================
          HEADER
      ========================================= */}

      <header className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          {/* Logo */}

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard")
            }
            className="flex items-center gap-3"
          >
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#061b32] via-[#0a4268] to-[#087ea4] text-white shadow-lg sm:h-12 sm:w-12">
              <Anchor
                size={23}
                strokeWidth={2.4}
              />

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-300" />
            </div>

            <div className="text-left">
              <div className="text-base font-bold tracking-[0.12em] text-slate-950 sm:text-lg">
                NAVPATH
              </div>

              <div className="text-[10px] font-medium tracking-[0.28em] text-slate-400 sm:text-xs">
                ACADEMY
              </div>
            </div>
          </button>

          {/* Header actions */}

          <div className="relative flex items-center gap-1 sm:gap-3">

            {/* Search */}

            <button
              type="button"
              onClick={() => {
                setSearchOpen((value) => !value);
                setNotificationsOpen(false);
              }}
              className="rounded-full p-2.5 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
              title="Search courses"
            >
              <Search size={21} />
            </button>

            {/* Notifications */}

            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(
                  (value) => !value
                );
                setSearchOpen(false);
              }}
              className="relative rounded-full p-2.5 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
              title="Notifications"
            >
              <Bell size={21} />

              <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-blue-600" />
            </button>

            {/* Search panel */}

            {searchOpen && (
              <div className="absolute right-0 top-14 z-50 w-[320px] overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-2xl sm:w-[380px]">

                <div className="flex items-center gap-3 border-b border-slate-100 p-4">
                  <Search
                    size={18}
                    className="text-slate-400"
                  />

                  <input
                    autoFocus
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search courses..."
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setSearchOpen(false);
                    }}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X size={18} />
                  </button>
                </div>

                {search.length > 0 ? (
                  <div className="max-h-[360px] overflow-y-auto p-2">

                    {searchResults.length === 0 ? (
                      <div className="px-4 py-8 text-center">
                        <BookOpen
                          size={30}
                          className="mx-auto text-slate-300"
                        />

                        <p className="mt-3 text-sm font-semibold text-slate-700">
                          No courses found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try another search term.
                        </p>
                      </div>
                    ) : (
                      searchResults.map((course) => (
                        <button
                          key={course.id}
                          type="button"
                          onClick={() => {
                            setSearch("");
                            setSearchOpen(false);
                            navigate(
                              `/courses/${course.id}`
                            );
                          }}
                          className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-blue-50"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#087ea4]">
                            <BookOpen size={18} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {course.title}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {course.category} ·{" "}
                              {formatPrice(course.price)}
                            </p>
                          </div>

                          <ArrowRight
                            size={16}
                            className="shrink-0 text-slate-400"
                          />
                        </button>
                      ))
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setSearchOpen(false);
                        navigate("/courses");
                      }}
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-100 px-4 py-3 text-sm font-semibold text-[#087ea4] hover:bg-blue-50"
                    >
                      View all courses
                      <ArrowRight size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Quick Search
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      Search IMU CET, DNS, Merchant Navy,
                      mock tests and more.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Notification panel */}

            {notificationsOpen && (
              <div className="absolute right-0 top-14 z-50 w-[320px] overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-2xl sm:w-[380px]">

                <div className="flex items-center justify-between border-b border-slate-100 p-4">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Notifications
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Latest updates
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setNotificationsOpen(false)
                    }
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="max-h-[350px] overflow-y-auto">
                  {notifications.map(
                    (notification) => (
                      <div
                        key={notification.id}
                        className="border-b border-slate-100 p-4 last:border-b-0 hover:bg-blue-50/50"
                      >
                        <div className="flex gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#087ea4]">
                            <Bell size={16} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {notification.title}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {notification.message}
                            </p>

                            <p className="mt-1 text-[11px] text-slate-400">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="mx-1 hidden h-8 w-px bg-slate-200 sm:block" />

            {/* Profile */}

            <button
              type="button"
              onClick={() =>
                navigate("/profile")
              }
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-slate-50 sm:gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 font-bold text-blue-700">
                {avatarLetter}
              </div>

              <div className="hidden text-left sm:block">
                <p className="max-w-28 truncate text-sm font-semibold text-slate-900">
                  {firstName}
                </p>

                <p className="text-xs text-slate-400">
                  Student
                </p>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================
          NAVIGATION
      ========================================= */}

      <div className="border-b border-blue-100 bg-white">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">

          <nav className="flex min-w-max items-center gap-1 py-3 sm:gap-2">

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard")
              }
              className="rounded-lg bg-[#061b32] px-4 py-2.5 text-sm font-semibold text-white shadow-sm sm:px-5"
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/courses")
              }
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 sm:px-5"
            >
              Courses
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/my-courses")
              }
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 sm:px-5"
            >
              My Courses
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/progress")
              }
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 sm:px-5"
            >
              Progress
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/tests/imu-cet")
              }
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 sm:px-5"
            >
              Tests
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/profile")
              }
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 sm:px-5"
            >
              Profile
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/support")
              }
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 sm:px-5"
            >
              <Headphones size={16} />
              Support
            </button>
          </nav>
        </div>
      </div>

      {/* =========================================
          MAIN
      ========================================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* WELCOME */}

        <section className="mb-8">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#087ea4]">
            <Waves size={16} />
            Student Dashboard
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Good evening, {firstName} 👋
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Continue your preparation and stay on
            course for your maritime goals.
          </p>
        </section>

        {/* =========================================
            HERO
        ========================================= */}

        <section className="relative mb-9 min-h-[390px] overflow-hidden rounded-3xl bg-[#061b32] shadow-xl">

          <img
            src="https://images.unsplash.com/photo-1552207802-77bcb0d13122?auto=format&fit=crop&fm=jpg&q=80&w=1800"
            alt="Cargo ship sailing across the ocean"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#031426]/95 via-[#062844]/80 to-[#087ea4]/30" />

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#031426]/80 to-transparent" />

          <Anchor
            className="absolute right-8 top-8 text-white/10"
            size={150}
          />

          <Ship
            className="absolute bottom-8 right-12 text-white/10"
            size={100}
          />

          <div className="relative z-10 flex min-h-[390px] flex-col justify-center p-6 text-white sm:p-10 lg:max-w-3xl lg:p-12">

            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 text-sm font-semibold text-cyan-100 backdrop-blur-sm">
              <Anchor size={16} />
              Continue Learning
            </div>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              IMU CET 2027

              <span className="block text-cyan-300">
                Complete Preparation
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-50/80 sm:text-base">
              Physics, Chemistry, Mathematics, English
              and aptitude preparation in one structured
              learning path designed for maritime aspirants.
            </p>

            <div className="mt-7 max-w-xl">

              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-blue-100/70">
                  Course progress
                </span>

                <span className="font-semibold text-white">
                  {courseProgress}%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-cyan-300 transition-all duration-500"
                  style={{
                    width: `${courseProgress}%`,
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/learn/imu-cet")
              }
              className="mt-7 flex w-fit items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 font-semibold text-[#061b32] shadow-lg transition hover:bg-cyan-50"
            >
              <BookOpen size={20} />

              Continue Learning

              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* =========================================
            STATS
        ========================================= */}

        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BookOpen size={22} />
            </div>

            <p className="text-sm text-slate-500">
              Available Courses
            </p>

            <p className="mt-1 text-3xl font-bold">
              {courseData.length}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <Target size={22} />
            </div>

            <p className="text-sm text-slate-500">
              Tests Completed
            </p>

            <p className="mt-1 text-3xl font-bold">
              {testsCompleted}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Clock size={22} />
            </div>

            <p className="text-sm text-slate-500">
              Learning Time
            </p>

            <p className="mt-1 text-3xl font-bold">
              {learningTime}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Trophy size={22} />
            </div>

            <p className="text-sm text-slate-500">
              Average Score
            </p>

            <p className="mt-1 text-3xl font-bold">
              {averageScore}%
            </p>
          </div>
        </section>

        {/* =========================================
            PRACTICE
        ========================================= */}

        <section className="mb-10 grid gap-6 lg:grid-cols-[2fr_1fr]">

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:p-7">

            <div className="mb-6 flex items-start justify-between">

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#087ea4]">
                  Practice
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Upcoming Test
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText size={23} />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-5 rounded-xl bg-[#f0f9fc] p-5 sm:flex-row sm:items-center sm:p-6">

              <div>
                <h3 className="text-lg font-semibold">
                  Physics — Mechanics Mock Test
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  20 questions · 30 minutes · Practice
                  test
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/tests/imu-cet")
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-[#061b32] px-6 py-3 font-semibold text-white transition hover:bg-[#087ea4]"
              >
                Start Test
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Progress */}

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:p-7">

            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#087ea4]">
              Your Goal
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Weekly Progress
            </h2>

            <div className="mt-6 flex justify-center">

              <div
                className="flex h-36 w-36 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(
                    #087ea4 ${courseProgress * 3.6}deg,
                    #dbeafe ${courseProgress * 3.6}deg
                  )`,
                }}
              >
                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">

                  <p className="text-2xl font-bold">
                    {courseProgress}%
                  </p>

                  <p className="text-sm text-slate-400">
                    Complete
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/progress")
              }
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-blue-100 px-4 py-3 font-medium text-[#087ea4] transition hover:bg-blue-50"
            >
              View Progress
              <ArrowRight size={17} />
            </button>
          </div>
        </section>

        {/* =========================================
            RECOMMENDED COURSES
        ========================================= */}

        <section>

          <div className="mb-6 flex items-end justify-between">

            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-[#087ea4]">
                <Compass size={16} />
                Explore
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Recommended for you
              </h2>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/courses")
              }
              className="hidden items-center gap-2 font-medium text-[#087ea4] transition hover:text-blue-700 sm:flex"
            >
              View all
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {recommendedCourses.map((course) => {

              const icons: Record<
                string,
                typeof GraduationCap
              > = {
                "imu-cet": GraduationCap,
                dns: Navigation,
                career: Compass,
                "imu-mock-tests": Target,
                "maritime-english": BookOpen,
                "sponsorship-interview": Trophy,
              };

              const CourseIcon =
                icons[course.id] ||
                GraduationCap;

              return (
                <article
                  key={course.id}
                  className="group overflow-hidden rounded-2xl border border-blue-100 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Image */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/courses/${course.id}`
                      )
                    }
                    className="relative block h-44 w-full overflow-hidden text-left"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1552207802-77bcb0d13122?auto=format&fit=crop&fm=jpg&q=80&w=1200"
                      alt={course.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#061b32]/90 via-[#061b32]/20 to-transparent" />

                    <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white backdrop-blur">
                      <CourseIcon size={20} />
                    </div>

                    <div className="absolute bottom-4 left-5 rounded-full border border-cyan-200/20 bg-[#061b32]/70 px-4 py-2 text-xs font-semibold text-cyan-100 backdrop-blur">
                      {course.category}
                    </div>
                  </button>

                  {/* Content */}

                  <div className="p-6">

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/courses/${course.id}`
                        )
                      }
                      className="text-left"
                    >
                      <h3 className="text-xl font-bold transition group-hover:text-[#087ea4]">
                        {course.title}
                      </h3>
                    </button>

                    <p className="mt-3 leading-6 text-slate-500">
                      {course.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between">

                      <span className="text-lg font-bold text-slate-900">
                        {formatPrice(course.price)}
                      </span>

                      <span className="text-sm text-slate-400">
                        {course.lessons.length} lessons
                      </span>
                    </div>

                    {/* Actions */}

                    <div className="mt-5 grid grid-cols-2 gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/courses/${course.id}`
                          )
                        }
                        className="flex items-center justify-center gap-2 rounded-xl border border-blue-100 px-3 py-3 text-sm font-semibold text-[#087ea4] transition hover:bg-blue-50"
                      >
                        View Course
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/enroll/${course.id}`
                          )
                        }
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#061b32] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#087ea4]"
                      >
                        <ShoppingCart size={16} />
                        Enroll
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/courses")
            }
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white px-4 py-3 font-semibold text-[#087ea4] sm:hidden"
          >
            View all courses
            <ArrowRight size={18} />
          </button>
        </section>

        {/* =========================================
            MARITIME CAREER SECTION
        ========================================= */}

        <section className="relative mt-10 overflow-hidden rounded-2xl bg-[#061b32] p-7 text-white shadow-xl sm:p-9">

          <div className="absolute -right-8 -top-8 opacity-10">
            <Ship size={190} />
          </div>

          <div className="absolute -bottom-10 right-28 opacity-10">
            <Waves size={180} />
          </div>

          <div className="relative z-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-center">

            <div className="max-w-2xl">

              <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-cyan-300">
                <Anchor size={17} />
                Your Maritime Journey
              </div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Prepare today.

                <span className="block text-cyan-300">
                  Sail towards your future.
                </span>
              </h2>

              <p className="mt-3 leading-7 text-blue-100/70">
                Build the knowledge, confidence and skills
                needed to take the next step towards a
                successful maritime career.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/courses")
              }
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-6 py-3.5 font-semibold text-[#061b32] transition hover:bg-white"
            >
              Explore Courses
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* =========================================
            SUPPORT
        ========================================= */}

        <section className="mt-10 overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#087ea4]">
                <Headphones size={23} />
              </div>

              <div>
                <h2 className="font-bold text-slate-950">
                  Need help with your preparation?
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Contact NavPath Academy support for
                  course, payment or learning assistance.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/support")
              }
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#061b32] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#087ea4]"
            >
              <Headphones size={17} />
              Contact Support
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* =========================================
            FOOTER
        ========================================= */}

        <footer className="mt-10 border-t border-blue-100 pt-6 pb-8">

          <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="font-semibold text-slate-700">
                © 2026 NavPath Academy
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Learn. Prepare. Sail towards your future.
              </p>
            </div>

            <div className="flex flex-wrap items-center text-sm">

              <button
                type="button"
                onClick={() =>
                  navigate("/privacy-policy")
                }
                className="mr-8 text-slate-500 transition hover:text-[#087ea4]"
              >
                Privacy Policy
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/terms")
                }
                className="mr-8 text-slate-500 transition hover:text-[#087ea4]"
              >
                Terms & Conditions
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/support")
                }
                className="text-slate-500 transition hover:text-[#087ea4]"
              >
                Support
              </button>

            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;