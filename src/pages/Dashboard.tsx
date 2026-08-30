import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  BookOpen,
  Clock,
  Flame,
  Target,
  Trophy,
  FileText,
  ArrowRight,
  Search,
  Headphones,
  Anchor,
  Ship,
} from "lucide-react";

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

/*
 * Get logged-in student
 */
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

/*
 * Get completed lesson IDs
 */
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

/*
 * Get test history
 */
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

function Dashboard() {
  const navigate = useNavigate();

  const [completedLessons, setCompletedLessons] =
    useState<string[]>([]);

  const [testHistory, setTestHistory] =
    useState<TestResult[]>([]);

  const [user, setUser] =
    useState<NavPathUser | null>(null);

  /*
   * Load dashboard data
   */
  const loadDashboardData = () => {
    setCompletedLessons(getCompletedLessons());
    setTestHistory(getTestHistory());
    setUser(getCurrentUser());
  };

  useEffect(() => {
    loadDashboardData();

    /*
     * Update dashboard if localStorage changes
     */
    const handleStorage = () => {
      loadDashboardData();
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    /*
     * Refresh when returning to dashboard
     */
    const handleFocus = () => {
      loadDashboardData();
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

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
   * STUDENT NAME
   * ============================
   */

  const studentName =
    user?.name?.trim() ||
    user?.email
      ?.split("@")[0]
      ?.trim() ||
    "Student";

  const firstName =
    studentName.split(" ")[0] || "Student";

  const avatarLetter =
    firstName.charAt(0).toUpperCase();

  /*
   * ============================
   * REAL PROGRESS DATA
   * ============================
   */

  const totalLessons: number = 5;

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
   * COURSE DATA
   * ============================
   */

  const courses = [
    {
      id: "imu-cet",
      title: "Complete CET Preparation",
      category: "IMU CET",
      description:
        "Build a strong foundation across every major subject.",
      lessons: "150+ lessons",
    },
    {
      id: "dns",
      title: "DNS Preparation Program",
      category: "DNS",
      description:
        "Prepare for entrance exams and your maritime journey.",
      lessons: "80+ lessons",
    },
    {
      id: "career",
      title: "Sponsorship Accelerator",
      category: "CAREER",
      description:
        "Interview preparation and career guidance.",
      lessons: "40+ lessons",
    },
  ];

  return (
    <div className="min-h-screen bg-[#eaf6fb] text-slate-950">

      {/* ================= HEADER ================= */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          {/* Logo */}

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#0b1f3a] via-[#0b3d66] to-blue-600 text-white shadow-lg sm:h-12 sm:w-12">

              <Anchor
                size={22}
                strokeWidth={2.5}
              />

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400" />
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

          <div className="flex items-center gap-1 sm:gap-3">

            {/* Search */}

            <button
              type="button"
              onClick={() => navigate("/search")}
              className="rounded-full p-2.5 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
              title="Search courses"
              aria-label="Search courses"
            >
              <Search size={21} />
            </button>

            {/* Notifications */}

            <button
              type="button"
              onClick={() =>
                navigate("/notifications")
              }
              className="relative rounded-full p-2.5 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell size={21} />

              <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-blue-600" />
            </button>

            <div className="mx-1 hidden h-8 w-px bg-slate-200 sm:block" />

            {/* Profile */}

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-slate-50 sm:gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 font-bold text-blue-700">
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

      {/* ================= QUICK NAVIGATION ================= */}

    <div className="border-b border-blue-100 bg-white">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex min-w-max items-center gap-1 py-3 sm:gap-2">

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard")
              }
              className="rounded-lg bg-[#0b1f3a] px-4 py-2.5 text-sm font-semibold text-white shadow-sm sm:px-5"
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

            {/* SUPPORT */}

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

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* ================= WELCOME ================= */}

        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-blue-600">
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

        {/* ================= CONTINUE LEARNING ================= */}

        <section className="relative mb-9 overflow-hidden rounded-2xl bg-gradient-to-br from-[#07182e] via-[#0b2948] to-[#0b5fa5] p-6 text-white shadow-xl sm:p-8">

          {/* Maritime decoration */}

          <div className="pointer-events-none absolute -right-10 -top-10 opacity-10">
            <Ship size={220} />
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 opacity-10">
            <div className="h-full bg-[radial-gradient(ellipse_at_center,white,transparent_65%)]" />
          </div>

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div className="flex-1">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/10 px-4 py-2 text-sm font-semibold text-blue-200">
                <Flame size={16} />
                Continue Learning
              </div>

              <h2 className="text-2xl font-bold md:text-3xl">
                IMU CET 2027 — Complete Preparation
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100/70 sm:text-base">
                Physics, Chemistry, Mathematics, English
                and aptitude preparation in one structured
                learning path.
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

                <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-blue-400 transition-all duration-500"
                    style={{
                      width: `${courseProgress}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/learn/imu-cet")
              }
              className="flex shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 font-semibold text-[#07182e] shadow-lg transition hover:bg-blue-50 sm:px-7"
            >
              <BookOpen size={20} />

              Continue Learning

              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* ================= STATISTICS ================= */}

        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Active Courses */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BookOpen size={22} />
            </div>

            <p className="text-sm text-slate-500">
              Active Courses
            </p>

            <p className="mt-1 text-3xl font-bold">
              3
            </p>
          </div>

          {/* Tests */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Target size={22} />
            </div>

            <p className="text-sm text-slate-500">
              Tests Completed
            </p>

            <p className="mt-1 text-3xl font-bold">
              {testsCompleted}
            </p>
          </div>

          {/* Learning Time */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock size={22} />
            </div>

            <p className="text-sm text-slate-500">
              Learning Time
            </p>

            <p className="mt-1 text-3xl font-bold">
              {learningTime}
            </p>
          </div>

          {/* Average Score */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
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

        {/* ================= PRACTICE ================= */}

        <section className="mb-10 grid gap-6 lg:grid-cols-[2fr_1fr]">

          {/* Upcoming Test */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

            <div className="mb-6 flex items-start justify-between">

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-blue-600">
                  Practice
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Upcoming Test
                </h2>
              </div>

              <FileText
                className="text-slate-300"
                size={28}
              />
            </div>

            <div className="flex flex-col justify-between gap-5 rounded-xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:p-6">

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
                className="flex items-center justify-center gap-2 rounded-xl bg-[#0b1f3a] px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Start Test
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Weekly Progress */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-blue-600">
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
                    #0b5fa5 ${courseProgress * 3.6}deg,
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
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 font-medium text-blue-600 transition hover:bg-slate-50"
            >
              View Progress
              <ArrowRight size={17} />
            </button>
          </div>
        </section>

        {/* ================= RECOMMENDED COURSES ================= */}

        <section>

          <div className="mb-6 flex items-end justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-blue-600">
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
              className="hidden items-center gap-2 font-medium text-blue-600 transition hover:text-blue-700 sm:flex"
            >
              View all
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {courses.map((course) => (
              <button
                type="button"
                key={course.id}
                onClick={() =>
                  navigate(
                    `/courses/${course.id}`
                  )
                }
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Course banner */}

                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#07182e] via-[#0b2948] to-[#0b5fa5]">

                  <Ship
                    size={110}
                    className="absolute -right-3 -top-4 text-white opacity-10"
                  />

                  <div className="absolute bottom-5 left-5 rounded-full border border-blue-300/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
                    {course.category}
                  </div>
                </div>

                {/* Course information */}

                <div className="p-6">

                  <h3 className="text-xl font-bold transition group-hover:text-blue-600">
                    {course.title}
                  </h3>

                  <p className="mt-3 leading-6 text-slate-500">
                    {course.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

                    <span className="text-sm text-slate-400">
                      {course.lessons}
                    </span>

                    <span className="flex items-center gap-2 font-medium text-blue-600">
                      Explore
                      <ArrowRight size={17} />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Mobile View All */}

          <button
            type="button"
            onClick={() =>
              navigate("/courses")
            }
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-blue-600 sm:hidden"
          >
            View all courses
            <ArrowRight size={18} />
          </button>
        </section>

        {/* ================= SUPPORT CARD ================= */}

        <section className="mt-10 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-slate-50 p-6 sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
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
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0b1f3a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Headphones size={17} />
              Contact Support
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;