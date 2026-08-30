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
  MessageSquare,
} from "lucide-react";

import { getCourseById } from "../data/courses";

type TestResult = {
  title: string;
  subject: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  date: string;
};

function getCompletedLessons(): string[] {
  try {
    const saved = localStorage.getItem(
      "navpath_completed_lessons"
    );

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed.filter(
          (item): item is string =>
            typeof item === "string"
        )
      : [];
  } catch {
    return [];
  }
}

function getTestHistory(): TestResult[] {
  try {
    const saved =
      localStorage.getItem("testHistory");

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [completedLessons, setCompletedLessons] =
    useState<string[]>([]);

  const [testHistory, setTestHistory] =
    useState<TestResult[]>([]);

  const loadProgress = () => {
    setCompletedLessons(
      getCompletedLessons()
    );

    setTestHistory(
      getTestHistory()
    );
  };

  useEffect(() => {
    loadProgress();

    const handleStorage = () => {
      loadProgress();
    };

    const handleFocus = () => {
      loadProgress();
    };

    const handleVisibility = () => {
      if (
        document.visibilityState ===
        "visible"
      ) {
        loadProgress();
      }
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    window.addEventListener(
      "focus",
      handleFocus
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibility
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

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  /* ===================================================
     REAL COURSE DATA
  =================================================== */

  const imuCourse =
    getCourseById("imu-cet");

  const imuLessons =
    imuCourse?.lessons || [];

  const totalLessons =
    imuLessons.length;

  const lessonsCompleted =
    imuLessons.filter((lesson) =>
      completedLessons.includes(
        lesson.id
      )
    ).length;

  const courseProgress =
    totalLessons === 0
      ? 0
      : Math.min(
          100,
          Math.round(
            (lessonsCompleted /
              totalLessons) *
              100
          )
        );

  const remainingLessons =
    Math.max(
      0,
      totalLessons - lessonsCompleted
    );

  /* ===================================================
     NEXT LESSON
  =================================================== */

  const nextLesson =
    imuLessons.find(
      (lesson) =>
        !completedLessons.includes(
          lesson.id
        )
    );

  /* ===================================================
     TEST STATISTICS
  =================================================== */

  const testsCompleted =
    testHistory.length;

  const averageScore =
    testsCompleted === 0
      ? 0
      : Math.round(
          testHistory.reduce(
            (total, test) =>
              total +
              Number(test.score || 0),
            0
          ) / testsCompleted
        );

  /* ===================================================
     LEARNING TIME
  =================================================== */

  const learningMinutes =
    imuLessons
      .filter((lesson) =>
        completedLessons.includes(
          lesson.id
        )
      )
      .reduce(
        (total, lesson) => {
          const match =
            lesson.duration.match(
              /\d+/
            );

          return (
            total +
            (match
              ? Number(match[0])
              : 0)
          );
        },
        0
      );

  const learningHours =
    Math.floor(
      learningMinutes / 60
    );

  const remainingMinutes =
    learningMinutes % 60;

  const learningTime =
    learningHours > 0
      ? `${learningHours}h ${remainingMinutes}m`
      : `${remainingMinutes}m`;

  /* ===================================================
     COURSES
  =================================================== */

  const courses = [
    {
      id: "imu-cet",
      title:
        "IMU CET 2027 — Complete Preparation",
      category: "IMU CET",
      description:
        "Complete preparation for Physics, Chemistry, Mathematics and English.",
      lessons:
        imuLessons.length,
    },

    {
      id: "dns",
      title:
        "DNS Preparation Program",
      category: "DNS",
      description:
        "Structured preparation for DNS entrance examinations.",
      lessons:
        getCourseById("dns")?.lessons
          .length || 0,
    },

    {
      id: "career",
      title:
        "Merchant Navy Career Guide",
      category: "CAREER",
      description:
        "Career guidance, sponsorship information and interview preparation.",
      lessons:
        getCourseById("career")?.lessons
          .length || 0,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* Logo */}

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
              N
            </div>

            <div className="text-left">
              <div className="text-xl font-bold tracking-tight">
                NAVPATH
              </div>

              <div className="text-xs tracking-[0.25em] text-slate-400">
                ACADEMY
              </div>
            </div>
          </button>

          {/* Header Actions */}

          <div className="flex items-center gap-2">

            {/* Search */}

            <button
              onClick={() =>
                navigate("/search")
              }
              className="rounded-full p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
              title="Search"
            >
              <Search size={21} />
            </button>

            {/* Notifications */}

            <button
              onClick={() =>
                navigate("/notifications")
              }
              className="rounded-full p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
              title="Notifications"
            >
              <Bell size={21} />
            </button>

            {/* Profile */}

            <button
              onClick={() =>
                navigate("/profile")
              }
              className="ml-2 flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-slate-50"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                A
              </div>

              <div className="hidden text-left sm:block">
                <p className="font-semibold">
                  Aravind
                </p>

                <p className="text-sm text-slate-400">
                  Student
                </p>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* =================================================
          QUICK NAVIGATION
      ================================================= */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl overflow-x-auto px-6 lg:px-8">

          <nav className="flex min-w-max items-center gap-2 py-3">

            {/* Dashboard */}

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Dashboard
            </button>

            {/* Courses */}

            <button
              onClick={() =>
                navigate("/courses")
              }
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
            >
              Courses
            </button>

            {/* My Courses */}

            <button
              onClick={() =>
                navigate("/my-courses")
              }
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
            >
              My Courses
            </button>

            {/* Progress */}

            <button
              onClick={() =>
                navigate("/progress")
              }
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
            >
              Progress
            </button>

            {/* Tests */}

            <button
              onClick={() =>
                navigate("/tests/imu-cet")
              }
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
            >
              Tests
            </button>

            {/* Profile */}

            <button
              onClick={() =>
                navigate("/profile")
              }
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
            >
              Profile
            </button>

            {/* Support */}

            <button
              onClick={() =>
                navigate("/support")
              }
              className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
            >
              <Headphones size={16} />
              Support
            </button>

            {/* Support Requests */}

            <button
              onClick={() =>
                navigate("/support-requests")
              }
              className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
            >
              <MessageSquare size={16} />
              Support Requests
            </button>
          </nav>
        </div>
      </div>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* =================================================
            WELCOME
        ================================================= */}

        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Student Dashboard
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Good evening, Aravind 👋
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Continue your preparation and
            stay on course for your goals.
          </p>
        </section>

        {/* =================================================
            CONTINUE LEARNING
        ================================================= */}

        <section className="mb-9 overflow-hidden rounded-2xl bg-slate-950 p-8 text-white shadow-xl">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div className="flex-1">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
                <Flame size={16} />
                Continue Learning
              </div>

              <h2 className="text-2xl font-bold md:text-3xl">
                IMU CET 2027 —
                Complete Preparation
              </h2>

              <p className="mt-3 max-w-2xl text-slate-400">
                Physics, Chemistry,
                Mathematics, English and
                aptitude preparation in one
                structured learning path.
              </p>

              {/* Progress */}

              <div className="mt-7 max-w-xl">

                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-400">
                    Course progress
                  </span>

                  <span className="font-semibold">
                    {courseProgress}%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-500"
                    style={{
                      width: `${courseProgress}%`,
                    }}
                  />
                </div>
              </div>

              {/* Course information */}

              <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-400">

                <span className="flex items-center gap-2">
                  <BookOpen size={17} />

                  {lessonsCompleted} /{" "}
                  {totalLessons} lessons
                </span>

                <span className="flex items-center gap-2">
                  <Clock size={17} />

                  {learningTime} learned
                </span>

                <span className="flex items-center gap-2">
                  <Target size={17} />

                  {averageScore}% average
                </span>
              </div>
            </div>

            {/* Continue button */}

            <button
              onClick={() =>
                navigate("/learn/imu-cet")
              }
              className="flex shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 font-semibold text-slate-950 shadow-lg transition hover:bg-slate-100"
            >
              <BookOpen size={20} />

              Continue Learning

              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Lessons */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6">

            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BookOpen size={22} />
            </div>

            <p className="text-sm text-slate-500">
              Lessons Completed
            </p>

            <p className="mt-2 text-3xl font-bold">
              {lessonsCompleted}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              of {totalLessons} total lessons
            </p>
          </div>

          {/* Tests */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6">

            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FileText size={22} />
            </div>

            <p className="text-sm text-slate-500">
              Tests Completed
            </p>

            <p className="mt-2 text-3xl font-bold">
              {testsCompleted}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              practice attempts
            </p>
          </div>

          {/* Learning Time */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6">

            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Clock size={22} />
            </div>

            <p className="text-sm text-slate-500">
              Learning Time
            </p>

            <p className="mt-2 text-3xl font-bold">
              {learningTime}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              completed lesson duration
            </p>
          </div>

          {/* Average */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6">

            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <Trophy size={22} />
            </div>

            <p className="text-sm text-slate-500">
              Average Score
            </p>

            <p className="mt-2 text-3xl font-bold">
              {averageScore}%
            </p>

            <p className="mt-1 text-xs text-slate-400">
              across completed tests
            </p>
          </div>
        </section>

        {/* =================================================
            NEXT LESSON
        ================================================= */}

        <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Up Next
              </p>

              <h2 className="mt-2 text-xl font-bold">
                {nextLesson
                  ? nextLesson.title
                  : "Course Completed 🎉"}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {nextLesson
                  ? `${nextLesson.duration} • ${remainingLessons} lesson${
                      remainingLessons === 1
                        ? ""
                        : "s"
                    } remaining`
                  : "You have completed every lesson in this course."}
              </p>
            </div>

            <button
              onClick={() => {
                if (nextLesson) {
                  navigate(
                    `/lesson/${nextLesson.id}`
                  );
                } else {
                  navigate("/progress");
                }
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              {nextLesson
                ? "Continue Lesson"
                : "View Progress"}

              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* =================================================
            RECENT TESTS
        ================================================= */}

        <section className="mb-10">

          <div className="mb-6 flex items-end justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Performance
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Recent Test Results
              </h2>
            </div>

            <button
              onClick={() =>
                navigate(
                  "/tests/imu-cet"
                )
              }
              className="hidden items-center gap-2 font-medium text-blue-600 sm:flex"
            >
              Take Test
              <ArrowRight size={18} />
            </button>
          </div>

          {testHistory.length > 0 ? (
            <div className="space-y-3">

              {testHistory
                .slice()
                .reverse()
                .slice(0, 3)
                .map((test, index) => (
                  <div
                    key={`${test.date}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-white p-5"
                  >

                    <div className="flex items-center gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FileText size={21} />
                      </div>

                      <div className="flex-1">

                        <p className="font-semibold">
                          {test.title}
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          {test.subject}
                        </p>
                      </div>

                      <div className="text-right">

                        <p
                          className={`text-xl font-bold ${
                            test.score >= 70
                              ? "text-green-600"
                              : test.score >= 40
                              ? "text-orange-500"
                              : "text-red-500"
                          }`}
                        >
                          {test.score}%
                        </p>

                        <p className="text-xs text-slate-400">
                          {test.correctAnswers}/
                          {test.totalQuestions}{" "}
                          correct
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">

              <p className="font-medium text-slate-700">
                No tests completed yet.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/tests/imu-cet"
                  )
                }
                className="mt-4 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Start Your First Test
              </button>
            </div>
          )}
        </section>

        {/* =================================================
            RECOMMENDED COURSES
        ================================================= */}

        <section>

          <div className="mb-6 flex items-end justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Explore
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Recommended for you
              </h2>
            </div>

            <button
              onClick={() =>
                navigate("/courses")
              }
              className="hidden items-center gap-2 font-medium text-blue-600 sm:flex"
            >
              View all
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() =>
                  navigate(
                    `/courses/${course.id}`
                  )
                }
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="relative h-40 bg-gradient-to-br from-blue-950 to-blue-800">

                  <div className="absolute bottom-5 left-5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
                    {course.category}
                  </div>
                </div>

                <div className="p-6">

                  <h3 className="text-xl font-bold group-hover:text-blue-600">
                    {course.title}
                  </h3>

                  <p className="mt-3 leading-6 text-slate-500">
                    {course.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

                    <span className="text-sm text-slate-400">
                      {course.lessons} lessons
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
        </section>

        {/* =================================================
            SUPPORT
        ================================================= */}

        <section className="mt-10 overflow-hidden rounded-2xl bg-slate-950 p-7 text-white sm:p-9">

          <div className="flex flex-col gap-6">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <div className="flex items-center gap-2 text-blue-400">

                  <Headphones size={19} />

                  <p className="text-sm font-semibold uppercase tracking-wide">
                    Support
                  </p>
                </div>

                <h2 className="mt-2 text-2xl font-bold">
                  Need help with your preparation?
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                  Contact NavPath Academy support for
                  questions about courses, tests or
                  your learning progress.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/support")
                }
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Support / Contact
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Support Requests */}

            <div className="border-t border-slate-800 pt-6">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <div className="flex items-center gap-2 text-slate-300">

                    <MessageSquare size={19} />

                    <p className="text-sm font-semibold">
                      Support Requests
                    </p>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    View messages submitted through
                    the support form.
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate(
                      "/support-requests"
                    )
                  }
                  className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 font-semibold text-white transition hover:bg-slate-800"
                >
                  View Support Requests
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="mt-16 border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-8">

          <div className="flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026 NavPath Academy. All
              rights reserved.
            </p>

            <p>
              Learn. Prepare. Navigate your
              future.
            </p>

            <button
              onClick={() =>
                navigate("/support")
              }
              className="text-left transition hover:text-blue-600 sm:text-right"
            >
              Support & Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}