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
  Compass,
  Anchor,
  Waves,
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

function getCompletedLessons(): string[] {
  try {
    const saved = localStorage.getItem("navpath_completed_lessons");

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getTestHistory(): TestResult[] {
  try {
    const saved = localStorage.getItem("testHistory");

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getUserName() {
  try {
    const saved = localStorage.getItem("navpath-user");

    if (!saved) return "Student";

    const user = JSON.parse(saved);

    return user?.name || "Student";
  } catch {
    return "Student";
  }
}

function Dashboard() {
  const navigate = useNavigate();

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const [userName, setUserName] = useState("Student");

  const loadProgress = () => {
    setCompletedLessons(getCompletedLessons());
    setTestHistory(getTestHistory());
    setUserName(getUserName());
  };

  useEffect(() => {
    loadProgress();

    const handleStorage = () => {
      loadProgress();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  /*
   * ============================
   * REAL PROGRESS DATA
   * ============================
   */

  const totalLessons: number = 5;

const lessonsCompleted = completedLessons.length;

const courseProgress =
  totalLessons === 0
    ? 0
    : Math.min(
        100,
        Math.round((lessonsCompleted / totalLessons) * 100)
      );
  const testsCompleted = testHistory.length;

  const averageScore =
    testsCompleted === 0
      ? 0
      : Math.round(
          testHistory.reduce(
            (total, test) => total + test.score,
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
      icon: Compass,
    },
    {
      id: "dns",
      title: "DNS Preparation Program",
      category: "DNS",
      description:
        "Prepare for entrance exams and your maritime journey.",
      lessons: "80+ lessons",
      icon: Ship,
    },
    {
      id: "career",
      title: "Sponsorship Accelerator",
      category: "CAREER",
      description:
        "Interview preparation and career guidance.",
      lessons: "40+ lessons",
      icon: Anchor,
    },
  ];

  const firstName =
    userName.trim().split(" ")[0] || "Student";

  return (
    <div className="min-h-screen bg-[#f3f7fb] text-slate-950">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur">

        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          {/* LOGO */}

          <button
            onClick={() => navigate("/dashboard")}
            className="group flex items-center gap-3"
          >

            {/* Compass Logo */}

            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-[#071a2f] shadow-lg shadow-blue-950/20 transition group-hover:scale-105">

              <div className="absolute inset-0 bg-gradient-to-br from-[#0b3158] to-[#071a2f]" />

              <Compass
                size={25}
                strokeWidth={1.8}
                className="relative z-10 text-cyan-300"
              />

              <div className="absolute h-1.5 w-1.5 rounded-full bg-white" />

            </div>

            <div className="text-left">

              <div className="text-[17px] font-extrabold tracking-[0.08em] text-[#071a2f]">
                NAVPATH
              </div>

              <div className="text-[9px] font-semibold tracking-[0.32em] text-slate-400">
                ACADEMY
              </div>

            </div>
          </button>

          {/* HEADER ACTIONS */}

          <div className="flex items-center gap-2 sm:gap-4">

            <button
              onClick={() => navigate("/search")}
              className="rounded-xl p-2.5 text-slate-500 transition hover:bg-blue-50 hover:text-[#0b5fa5]"
              title="Search"
            >
              <Search size={20} />
            </button>

            <button
              onClick={() => navigate("/notifications")}
              className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-blue-50 hover:text-[#0b5fa5]"
              title="Notifications"
            >
              <Bell size={20} />

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-cyan-500 ring-2 ring-white" />
            </button>

            <div className="mx-1 hidden h-8 w-px bg-slate-200 sm:block" />

            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-50"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0b5fa5] to-[#071a2f] text-sm font-bold text-white shadow-md">
                {firstName.charAt(0).toUpperCase()}
              </div>

              <div className="hidden text-left sm:block">

                <p className="text-sm font-bold text-slate-800">
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


      {/* =====================================================
          QUICK NAVIGATION
      ===================================================== */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl overflow-x-auto px-5 sm:px-6 lg:px-8">

          <nav className="flex min-w-max items-center gap-1.5 py-2.5">

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-lg bg-[#071a2f] px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/courses")}
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-[#0b5fa5]"
            >
              Courses
            </button>

            <button
              onClick={() => navigate("/my-courses")}
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-[#0b5fa5]"
            >
              My Courses
            </button>

            <button
              onClick={() => navigate("/progress")}
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-[#0b5fa5]"
            >
              Progress
            </button>

            <button
              onClick={() => navigate("/tests/imu-cet")}
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-[#0b5fa5]"
            >
              Tests
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-[#0b5fa5]"
            >
              Profile
            </button>

          </nav>

        </div>
      </div>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

        {/* =====================================================
            WELCOME
        ===================================================== */}

        <section className="mb-8">

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#0b5fa5]">
                <Waves size={14} />
                Student Dashboard
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-[#071a2f] md:text-4xl">
                Good evening, {firstName}
                <span className="ml-2">👋</span>
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
                Stay focused, keep learning and move one step closer
                to your maritime career.
              </p>

            </div>

            <div className="hidden items-center gap-2 text-sm font-medium text-slate-400 md:flex">
              <Anchor size={17} />
              Navigate your future
            </div>

          </div>

        </section>


        {/* =====================================================
            MARITIME HERO / CONTINUE LEARNING
        ===================================================== */}

        <section className="relative mb-9 overflow-hidden rounded-[28px] bg-[#071a2f] shadow-2xl shadow-blue-950/20">

          {/* Decorative gradients */}

          <div className="absolute inset-0 bg-gradient-to-br from-[#0b3158] via-[#071a2f] to-[#04111f]" />

          <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          {/* Navigation lines */}

          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 overflow-hidden opacity-20">

            <div className="absolute right-[-100px] top-[-100px] h-[420px] w-[420px] rounded-full border border-cyan-300/30" />

            <div className="absolute right-[-60px] top-[-60px] h-[340px] w-[340px] rounded-full border border-cyan-300/20" />

            <div className="absolute right-[-20px] top-[-20px] h-[260px] w-[260px] rounded-full border border-cyan-300/20" />

          </div>


          <div className="relative z-10 flex flex-col justify-between gap-10 p-7 sm:p-9 lg:flex-row lg:items-center lg:p-10">

            <div className="max-w-2xl flex-1">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">
                <Flame size={15} />
                Continue Learning
              </div>

              <h2 className="text-2xl font-extrabold leading-tight text-white md:text-3xl lg:text-[34px]">
                IMU CET 2027 — Complete Preparation
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Physics, Chemistry, Mathematics, English and aptitude
                preparation in one structured learning path.
              </p>

              <div className="mt-7 max-w-xl">

                <div className="mb-2.5 flex items-center justify-between text-sm">

                  <span className="font-medium text-slate-400">
                    Course progress
                  </span>

                  <span className="font-bold text-cyan-300">
                    {courseProgress}%
                  </span>

                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-white/10">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                    style={{
                      width: `${courseProgress}%`,
                    }}
                  />

                </div>

              </div>

            </div>


            {/* Compass */}

            <div className="hidden shrink-0 items-center justify-center lg:flex">

              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-cyan-300/20 bg-white/5">

                <div className="absolute inset-3 rounded-full border border-white/10" />

                <Compass
                  size={72}
                  strokeWidth={1.2}
                  className="text-cyan-300"
                />

                <div className="absolute top-4 text-[9px] font-bold tracking-widest text-slate-400">
                  N
                </div>

                <div className="absolute bottom-4 text-[9px] font-bold tracking-widest text-slate-500">
                  S
                </div>

              </div>

            </div>


            {/* Continue button */}

            <button
              onClick={() => navigate("/learn/imu-cet")}
              className="group flex shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 font-bold text-[#071a2f] shadow-xl transition hover:-translate-y-0.5 hover:bg-cyan-50"
            >
              <BookOpen size={19} />

              Continue Learning

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

          </div>

        </section>


        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Active Courses */}

          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0b5fa5] transition group-hover:bg-[#071a2f] group-hover:text-cyan-300">
              <BookOpen size={21} />
            </div>

            <p className="text-sm font-medium text-slate-500">
              Active Courses
            </p>

            <p className="mt-1 text-3xl font-extrabold text-[#071a2f]">
              3
            </p>

          </div>


          {/* Tests */}

          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0b5fa5] transition group-hover:bg-[#071a2f] group-hover:text-cyan-300">
              <Target size={21} />
            </div>

            <p className="text-sm font-medium text-slate-500">
              Tests Completed
            </p>

            <p className="mt-1 text-3xl font-extrabold text-[#071a2f]">
              {testsCompleted}
            </p>

          </div>


          {/* Learning time */}

          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0b5fa5] transition group-hover:bg-[#071a2f] group-hover:text-cyan-300">
              <Clock size={21} />
            </div>

            <p className="text-sm font-medium text-slate-500">
              Learning Time
            </p>

            <p className="mt-1 text-3xl font-extrabold text-[#071a2f]">
              {learningTime}
            </p>

          </div>


          {/* Score */}

          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0b5fa5] transition group-hover:bg-[#071a2f] group-hover:text-cyan-300">
              <Trophy size={21} />
            </div>

            <p className="text-sm font-medium text-slate-500">
              Average Score
            </p>

            <p className="mt-1 text-3xl font-extrabold text-[#071a2f]">
              {averageScore}%
            </p>

          </div>

        </section>


        {/* =====================================================
            PRACTICE
        ===================================================== */}

        <section className="mb-10 grid gap-6 lg:grid-cols-[2fr_1fr]">

          {/* Upcoming Test */}

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

            <div className="mb-6 flex items-start justify-between">

              <div>

                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0b5fa5]">
                  <Target size={15} />
                  Practice
                </div>

                <h2 className="text-2xl font-extrabold text-[#071a2f]">
                  Upcoming Test
                </h2>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0b5fa5]">
                <FileText size={22} />
              </div>

            </div>


            <div className="flex flex-col justify-between gap-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-[#f3f8fc] to-blue-50/50 p-6 sm:flex-row sm:items-center">

              <div>

                <div className="mb-2 inline-flex rounded-full bg-[#071a2f] px-3 py-1 text-xs font-semibold text-cyan-300">
                  IMU CET
                </div>

                <h3 className="text-lg font-bold text-[#071a2f]">
                  Physics — Mechanics Mock Test
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  20 questions · 30 minutes · Practice test
                </p>

              </div>

              <button
                onClick={() => navigate("/tests/imu-cet")}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#071a2f] px-6 py-3 font-semibold text-white transition hover:bg-[#0b3158]"
              >
                Start Test
                <ArrowRight size={18} />
              </button>

            </div>

          </div>


          {/* Weekly Progress */}

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0b5fa5]">
                  Your Goal
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[#071a2f]">
                  Weekly Progress
                </h2>

              </div>

              <Waves className="text-blue-200" size={28} />

            </div>


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

                  <p className="text-2xl font-extrabold text-[#071a2f]">
                    {courseProgress}%
                  </p>

                  <p className="text-sm text-slate-400">
                    Complete
                  </p>

                </div>

              </div>

            </div>


            <button
              onClick={() => navigate("/progress")}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-[#0b5fa5] transition hover:border-blue-200 hover:bg-blue-50"
            >
              View Progress
              <ArrowRight size={17} />
            </button>

          </div>

        </section>


        {/* =====================================================
            RECOMMENDED COURSES
        ===================================================== */}

        <section>

          <div className="mb-6 flex items-end justify-between">

            <div>

              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0b5fa5]">
                <Compass size={15} />
                Explore
              </div>

              <h2 className="text-2xl font-extrabold text-[#071a2f]">
                Recommended for you
              </h2>

            </div>

            <button
              onClick={() => navigate("/courses")}
              className="hidden items-center gap-2 font-semibold text-[#0b5fa5] transition hover:text-[#071a2f] sm:flex"
            >
              View all
              <ArrowRight size={18} />
            </button>

          </div>


          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {courses.map((course) => {

              const CourseIcon = course.icon;

              return (
                <button
                  key={course.id}
                  onClick={() =>
                    navigate(`/courses/${course.id}`)
                  }
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >

                  {/* Course visual */}

                  <div className="relative h-44 overflow-hidden bg-[#071a2f]">

                    <div className="absolute inset-0 bg-gradient-to-br from-[#0b3158] via-[#071a2f] to-[#04111f]" />

                    {/* Decorative circles */}

                    <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border border-cyan-300/10" />

                    <div className="absolute -right-6 -top-10 h-36 w-36 rounded-full border border-cyan-300/10" />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.12),transparent_35%)]" />

                    <div className="relative flex h-full items-center justify-center">

                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-white/10 text-cyan-300 backdrop-blur">
                        <CourseIcon size={31} strokeWidth={1.5} />
                      </div>

                    </div>


                    <div className="absolute bottom-4 left-5 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-cyan-100 backdrop-blur">
                      {course.category}
                    </div>

                  </div>


                  {/* Course content */}

                  <div className="p-6">

                    <h3 className="text-xl font-extrabold text-[#071a2f] transition group-hover:text-[#0b5fa5]">
                      {course.title}
                    </h3>

                    <p className="mt-3 leading-6 text-slate-500">
                      {course.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

                      <span className="text-sm font-medium text-slate-400">
                        {course.lessons}
                      </span>

                      <span className="flex items-center gap-2 font-semibold text-[#0b5fa5]">
                        Explore
                        <ArrowRight
                          size={17}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>

                    </div>

                  </div>

                </button>
              );
            })}

          </div>

        </section>


        {/* Mobile View All */}

        <button
          onClick={() => navigate("/courses")}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-[#0b5fa5] sm:hidden"
        >
          View all courses
          <ArrowRight size={18} />
        </button>

      </main>


      {/* =====================================================
          FOOTER BRAND STRIP
      ===================================================== */}

      <footer className="mt-12 border-t border-slate-200 bg-[#071a2f]">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-cyan-300">
              <Compass size={20} />
            </div>

            <div>
              <p className="text-sm font-bold tracking-wider text-white">
                NAVPATH ACADEMY
              </p>

              <p className="text-xs text-slate-400">
                Navigate your future.
              </p>
            </div>

          </div>

          <p className="text-xs text-slate-500">
            © 2026 NavPath Academy. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Dashboard;