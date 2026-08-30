import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Play,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { courses } from "../data/courses";

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

function getTotalMinutes(courseId: string): number {
  const course = courses.find(
    (item) => item.id === courseId
  );

  if (!course) {
    return 0;
  }

  return course.lessons.reduce((total, lesson) => {
    const match = lesson.duration.match(/\d+/);

    return total + (match ? Number(match[0]) : 0);
  }, 0);
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

const MyCourses = () => {
  const navigate = useNavigate();

  const [completedLessons, setCompletedLessons] =
    useState<string[]>([]);

  const loadProgress = () => {
    setCompletedLessons(getCompletedLessons());
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

  /*
   * ============================
   * COURSE PROGRESS
   * ============================
   */

  const getCourseProgress = (courseId: string) => {
    const course = courses.find(
      (item) => item.id === courseId
    );

    if (!course || course.lessons.length === 0) {
      return {
        completed: 0,
        total: 0,
        progress: 0,
      };
    }

    const completed = course.lessons.filter(
      (lesson) =>
        completedLessons.includes(lesson.id)
    ).length;

    const total = course.lessons.length;

    const progress = Math.round(
      (completed / total) * 100
    );

    return {
      completed,
      total,
      progress: Math.min(100, progress),
    };
  };

  /*
   * ============================
   * SUMMARY
   * ============================
   */

  const totalCompletedLessons =
    completedLessons.length;

  const learningMinutes = courses.reduce(
    (total, course) => {
      const completedForCourse =
        course.lessons.filter((lesson) =>
          completedLessons.includes(lesson.id)
        );

      return (
        total +
        completedForCourse.reduce(
          (courseTotal, lesson) => {
            const match =
              lesson.duration.match(/\d+/);

            return (
              courseTotal +
              (match ? Number(match[0]) : 0)
            );
          },
          0
        )
      );
    },
    0
  );

  const learningTime =
    formatDuration(learningMinutes);

  /*
   * ============================
   * NEXT LESSON
   * ============================
   */

  const getNextLesson = (courseId: string) => {
    const course = courses.find(
      (item) => item.id === courseId
    );

    if (!course) {
      return null;
    }

    const nextLesson = course.lessons.find(
      (lesson) =>
        !completedLessons.includes(lesson.id)
    );

    return nextLesson ?? course.lessons[0] ?? null;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              N
            </div>

            <div className="text-left">
              <p className="font-bold">
                NAVPATH
              </p>

              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                Academy
              </p>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                navigate("/search")
              }
              className="rounded-full p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
              title="Search"
            >
              <Search size={21} />
            </button>

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
            >
              <ArrowLeft size={17} />
              Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* TITLE */}

        <section className="mb-9">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Learning
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            My Courses
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Continue your enrolled courses and keep
            progressing toward your goals.
          </p>
        </section>

        {/* ================= SUMMARY ================= */}

        <section className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Enrolled Courses */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <BookOpen size={20} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Enrolled Courses
                </p>

                <p className="text-xl font-bold">
                  {courses.length}
                </p>
              </div>
            </div>
          </div>

          {/* Lessons Completed */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Lessons Completed
                </p>

                <p className="text-xl font-bold">
                  {totalCompletedLessons}
                </p>
              </div>
            </div>
          </div>

          {/* Learning Time */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Clock3 size={20} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Learning Time
                </p>

                <p className="text-xl font-bold">
                  {learningTime}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= COURSE LIST ================= */}

        <section className="space-y-6">
          {courses.map((course) => {
            const courseProgress =
              getCourseProgress(course.id);

            const nextLesson =
              getNextLesson(course.id);

            const totalMinutes =
              getTotalMinutes(course.id);

            return (
              <article
                key={course.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="grid lg:grid-cols-[280px_1fr]">
                  {/* COURSE COVER */}

                  <div className="relative min-h-[220px] overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-6">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

                    <span className="relative inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-blue-100 backdrop-blur">
                      {course.category}
                    </span>

                    <div className="absolute bottom-6 left-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur">
                        <BookOpen size={27} />
                      </div>
                    </div>
                  </div>

                  {/* COURSE DETAILS */}

                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                      <div className="max-w-3xl">
                        <h2 className="text-xl font-bold sm:text-2xl">
                          {course.title}
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {course.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-2">
                            <BookOpen size={16} />
                            {course.lessons.length} lessons
                          </span>

                          <span className="flex items-center gap-2">
                            <Clock3 size={16} />
                            {formatDuration(
                              totalMinutes
                            )}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          navigate(
                            `/learn/${course.id}`
                          )
                        }
                        className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                      >
                        <Play
                          size={17}
                          fill="currentColor"
                        />

                        Continue
                      </button>
                    </div>

                    {/* ================= PROGRESS ================= */}

                    <div className="mt-7">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">
                          Course Progress
                        </span>

                        <span className="text-sm font-bold text-blue-600">
                          {courseProgress.progress}%
                        </span>
                      </div>

                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600 transition-all duration-500"
                          style={{
                            width: `${courseProgress.progress}%`,
                          }}
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                        <span>
                          {courseProgress.completed} of{" "}
                          {courseProgress.total} lessons
                          completed
                        </span>

                        <span>
                          {Math.max(
                            0,
                            courseProgress.total -
                              courseProgress.completed
                          )}{" "}
                          remaining
                        </span>
                      </div>
                    </div>

                    {/* ================= NEXT LESSON ================= */}

                    <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Up next
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {nextLesson
                            ? nextLesson.title
                            : "Course completed"}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          navigate(
                            `/learn/${course.id}`
                          )
                        }
                        className="flex items-center justify-center gap-2 text-sm font-semibold text-blue-600"
                      >
                        Continue lesson
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* ================= EXPLORE MORE ================= */}

        <section className="mt-10 rounded-3xl bg-slate-950 p-7 text-white sm:p-9">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                Keep Learning
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Looking for another course?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Explore more NavPath Academy programs and
                find the right preparation path for you.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/courses")
              }
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-blue-50"
            >
              Browse Courses
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 NavPath Academy. All rights reserved.
            </p>

            <p>
              Learn. Prepare. Navigate your future.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyCourses;