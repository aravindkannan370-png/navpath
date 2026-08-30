import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  CheckCircle,
  Clock3,
  Trophy,
  Target,
  Award,
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

function getLatestTest(): TestResult | null {
  try {
    const saved = localStorage.getItem(
      "latestTestResult"
    );

    if (!saved) return null;

    return JSON.parse(saved);
  } catch {
    return null;
  }
}

function formatDate(dateString: string) {
  if (!dateString) {
    return "Recently completed";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Recently completed";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getMinutes(duration: string): number {
  const match = duration.match(/\d+/);

  return match ? Number(match[0]) : 0;
}

export default function Progress() {
  const navigate = useNavigate();

  const [completedLessons, setCompletedLessons] =
    useState<string[]>([]);

  const [testHistory, setTestHistory] =
    useState<TestResult[]>([]);

  const [latestTest, setLatestTest] =
    useState<TestResult | null>(null);

  const loadProgress = () => {
    setCompletedLessons(getCompletedLessons());
    setTestHistory(getTestHistory());
    setLatestTest(getLatestTest());
  };

  useEffect(() => {
    loadProgress();

    const handleStorage = () => {
      loadProgress();
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  /* ============================
     IMU CET COURSE
  ============================ */

  const course = getCourseById("imu-cet");

  const lessons = course?.lessons || [];

  const totalLessons = lessons.length;

  const lessonsCompleted = lessons.filter(
    (lesson) =>
      completedLessons.includes(lesson.id)
  ).length;

  const courseCompletion =
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

  /* ============================
     TESTS
  ============================ */

  const testsCompleted = testHistory.length;

  const averageScore =
    testsCompleted === 0
      ? 0
      : Math.round(
          testHistory.reduce(
            (total, test) =>
              total + Number(test.score || 0),
            0
          ) / testsCompleted
        );

  /* ============================
     LEARNING TIME
  ============================ */

  const learningTime = lessons
    .filter((lesson) =>
      completedLessons.includes(
        lesson.id
      )
    )
    .reduce(
      (total, lesson) =>
        total +
        getMinutes(lesson.duration),
      0
    );

  /* ============================
     SUBJECTS
  ============================ */

  const physicsLessons = lessons.filter(
    (lesson) =>
      lesson.id.startsWith(
        "imu-physics"
      )
  );

  const chemistryLessons = lessons.filter(
    (lesson) =>
      lesson.id.startsWith(
        "imu-chemistry"
      )
  );

  const mathematicsLessons = lessons.filter(
    (lesson) =>
      lesson.id.startsWith("imu-maths")
  );

  const englishLessons = lessons.filter(
    (lesson) =>
      lesson.id.startsWith(
        "imu-english"
      )
  );

  const getCompletedCount = (
    subjectLessons: typeof lessons
  ) => {
    return subjectLessons.filter(
      (lesson) =>
        completedLessons.includes(
          lesson.id
        )
    ).length;
  };

  const physicsCompleted =
    getCompletedCount(
      physicsLessons
    );

  const chemistryCompleted =
    getCompletedCount(
      chemistryLessons
    );

  const mathematicsCompleted =
    getCompletedCount(
      mathematicsLessons
    );

  const englishCompleted =
    getCompletedCount(
      englishLessons
    );

  const getPercentage = (
    completed: number,
    total: number
  ) => {
    return total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );
  };

  const physicsProgress =
    getPercentage(
      physicsCompleted,
      physicsLessons.length
    );

  const chemistryProgress =
    getPercentage(
      chemistryCompleted,
      chemistryLessons.length
    );

  const mathematicsProgress =
    getPercentage(
      mathematicsCompleted,
      mathematicsLessons.length
    );

  const englishProgress =
    getPercentage(
      englishCompleted,
      englishLessons.length
    );

  /* ============================
     ACHIEVEMENTS
  ============================ */

  const firstTestUnlocked =
    testsCompleted >= 1;

  const fiveTestsUnlocked =
    testsCompleted >= 5;

  const tenLessonsUnlocked =
    lessonsCompleted >= 10;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

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
              <div className="text-xl font-bold">
                NAVPATH
              </div>

              <div className="text-xs tracking-[0.25em] text-slate-400">
                ACADEMY
              </div>
            </div>
          </button>

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="flex items-center gap-2 text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={20} />
            Dashboard
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-7xl px-6 py-12">

        {/* Heading */}

        <section>
          <p className="text-sm font-semibold tracking-wide text-blue-600">
            YOUR PERFORMANCE
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Student Progress
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Track your preparation, learning activity
            and performance across NavPath Academy.
          </p>
        </section>

        {/* ================= OVERALL ================= */}

        <section className="mt-10 overflow-hidden rounded-3xl bg-slate-950 p-8 text-white shadow-xl">

          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex-1">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                  <BarChart3 size={28} />
                </div>

                <div>
                  <p className="font-medium text-blue-400">
                    Overall Progress
                  </p>

                  <h2 className="mt-1 text-2xl font-bold">
                    IMU CET 2027 Preparation
                  </h2>
                </div>

              </div>

              {/* Progress */}

              <div className="mt-10">

                <div className="mb-3 flex items-center justify-between">

                  <span className="text-sm text-slate-400">
                    Course completion
                  </span>

                  <span className="font-bold">
                    {courseCompletion}%
                  </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-800">

                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-500"
                    style={{
                      width: `${courseCompletion}%`,
                    }}
                  />

                </div>
              </div>

              {/* Stats */}

              <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">

                <div>
                  <p className="text-3xl font-bold">
                    {lessonsCompleted}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Lessons completed
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-bold">
                    {testsCompleted}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Tests completed
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-bold">
                    {averageScore}%
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Average score
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-bold">
                    {learningTime}m
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Learning time
                  </p>
                </div>

              </div>
            </div>

            {/* Circular Progress */}

            <div className="flex justify-center lg:pr-8">

              <div
                className="flex h-56 w-56 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(
                    #2563eb ${
                      courseCompletion *
                      3.6
                    }deg,
                    #172033 ${
                      courseCompletion *
                      3.6
                    }deg
                  )`,
                }}
              >

                <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full bg-slate-950">

                  <span className="text-4xl font-bold">
                    {courseCompletion}%
                  </span>

                  <span className="mt-1 text-sm text-blue-300">
                    Complete
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ================= STAT CARDS ================= */}

        <section className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={<BookOpen size={24} />}
            title="Lessons Completed"
            value={lessonsCompleted.toString()}
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            icon={<CheckCircle size={24} />}
            title="Tests Completed"
            value={testsCompleted.toString()}
            iconClass="bg-green-50 text-green-600"
          />

          <StatCard
            icon={<Clock3 size={24} />}
            title="Learning Time"
            value={`${learningTime}m`}
            iconClass="bg-purple-50 text-purple-600"
          />

          <StatCard
            icon={<Trophy size={24} />}
            title="Average Score"
            value={`${averageScore}%`}
            iconClass="bg-orange-50 text-orange-500"
          />

        </section>

        {/* ================= SUBJECT PROGRESS ================= */}

        <section className="mt-10 rounded-3xl border bg-white p-8 shadow-sm">

          <p className="text-sm font-semibold tracking-wide text-blue-600">
            PREPARATION
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Subject Progress
          </h2>

          <p className="mt-2 text-slate-500">
            See how much of each subject you have completed.
          </p>

          <div className="mt-10 space-y-9">

            <SubjectProgress
              name="Physics"
              completed={physicsCompleted}
              total={physicsLessons.length}
              percentage={physicsProgress}
            />

            <SubjectProgress
              name="Chemistry"
              completed={chemistryCompleted}
              total={chemistryLessons.length}
              percentage={chemistryProgress}
            />

            <SubjectProgress
              name="Mathematics"
              completed={mathematicsCompleted}
              total={mathematicsLessons.length}
              percentage={mathematicsProgress}
            />

            <SubjectProgress
              name="English"
              completed={englishCompleted}
              total={englishLessons.length}
              percentage={englishProgress}
            />

          </div>
        </section>

        {/* ================= RECENT TESTS ================= */}

        <section className="mt-10 rounded-3xl border bg-white p-8 shadow-sm">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <p className="text-sm font-semibold tracking-wide text-blue-600">
                PERFORMANCE
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Recent Test Results
              </h2>

              <p className="mt-2 text-slate-500">
                Review your latest mock test performance.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/tests/imu-cet")
              }
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Take another test →
            </button>

          </div>

          {testHistory.length > 0 ? (

            <div className="mt-8 space-y-4">

              {testHistory
                .slice()
                .reverse()
                .slice(0, 5)
                .map((test, index) => (

                  <div
                    key={`${test.date}-${index}`}
                    className="rounded-2xl bg-slate-50 p-6"
                  >

                    <div className="flex items-center gap-5">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <CheckCircle size={24} />
                      </div>

                      <div className="flex-1">

                        <h3 className="font-semibold">
                          {test.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                          {test.subject} •{" "}
                          {formatDate(test.date)}
                        </p>

                      </div>

                      <div className="text-right">

                        <p
                          className={`text-2xl font-bold ${
                            test.score >= 70
                              ? "text-green-600"
                              : test.score >= 40
                              ? "text-orange-500"
                              : "text-red-500"
                          }`}
                        >
                          {test.score}%
                        </p>

                        <p className="text-sm text-slate-400">
                          {test.correctAnswers}/
                          {test.totalQuestions} correct
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

            </div>

          ) : (

            <div className="mt-8 rounded-2xl bg-slate-50 p-8 text-center">

              <p className="font-medium text-slate-700">
                No tests completed yet.
              </p>

              <button
                onClick={() =>
                  navigate("/tests/imu-cet")
                }
                className="mt-4 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Start Your First Test
              </button>

            </div>

          )}

          {latestTest && (
            <div className="mt-6 text-right">

              <button
                onClick={() =>
                  navigate("/results")
                }
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View Latest Result →
              </button>

            </div>
          )}

        </section>

        {/* ================= ACHIEVEMENTS ================= */}

        <section className="mt-10">

          <p className="text-sm font-semibold tracking-wide text-blue-600">
            ACHIEVEMENTS
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Your Milestones
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">

            <Achievement
              icon={<Target size={25} />}
              title="First Test"
              description="Complete your first practice test."
              unlocked={firstTestUnlocked}
            />

            <Achievement
              icon={<Trophy size={25} />}
              title="Test Master"
              description="Complete 5 practice tests."
              unlocked={fiveTestsUnlocked}
            />

            <Achievement
              icon={<Award size={25} />}
              title="Dedicated Learner"
              description="Complete 10 lessons."
              unlocked={tenLessonsUnlocked}
            />

          </div>

        </section>

        {/* ================= ACTIONS ================= */}

        <section className="mt-10 flex flex-wrap gap-3">

          <button
            onClick={() =>
              navigate("/learn/imu-cet")
            }
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Continue Learning
          </button>

          <button
            onClick={() =>
              navigate("/tests/imu-cet")
            }
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Take Practice Test
          </button>

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Dashboard
          </button>

        </section>

      </main>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({
  icon,
  title,
  value,
  iconClass,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-7 shadow-sm">

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <p className="mt-7 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>

    </div>
  );
}

/* ================= SUBJECT ================= */

function SubjectProgress({
  name,
  completed,
  total,
  percentage,
}: {
  name: string;
  completed: number;
  total: number;
  percentage: number;
}) {
  return (
    <div>

      <div className="flex items-end justify-between">

        <div>

          <h3 className="text-lg font-semibold">
            {name}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {total === 0
              ? "Lessons coming soon"
              : `${completed} of ${total} lessons`}
          </p>

        </div>

        <span className="text-lg font-bold text-blue-600">
          {percentage}%
        </span>

      </div>

      <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

/* ================= ACHIEVEMENT ================= */

function Achievement({
  icon,
  title,
  description,
  unlocked,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  unlocked: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border bg-white p-7 shadow-sm ${
        unlocked
          ? "border-green-200"
          : "border-slate-200"
      }`}
    >

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-xl ${
          unlocked
            ? "bg-green-50 text-green-600"
            : "bg-orange-50 text-orange-500"
        }`}
      >
        {icon}
      </div>

      <h3 className="mt-7 text-lg font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <p
        className={`mt-5 text-xs font-semibold ${
          unlocked
            ? "text-green-600"
            : "text-slate-400"
        }`}
      >
        {unlocked
          ? "✓ UNLOCKED"
          : "LOCKED"}
      </p>

    </div>
  );
}