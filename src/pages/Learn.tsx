import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Play,
} from "lucide-react";

import { getCourseById } from "../data/courses";

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

function getMinutes(duration: string): number {
  const match = duration.match(/\d+/);

  return match ? Number(match[0]) : 0;
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }

  return `${remainingMinutes}m`;
}

export default function Learn() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [completedLessons, setCompletedLessons] =
    useState<string[]>([]);

  const loadProgress = () => {
    setCompletedLessons(
      getCompletedLessons()
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

  const course = courseId
    ? getCourseById(courseId)
    : undefined;

  /* ===================================================
     COURSE NOT FOUND
  =================================================== */

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="flex items-center gap-2 text-blue-600 transition hover:text-blue-700"
            >
              <ArrowLeft size={20} />
              Dashboard
            </button>

            <div className="font-bold text-slate-900">
              NAVPATH{" "}
              <span className="text-blue-600">
                ACADEMY
              </span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-6 py-16">
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900">
              Course Not Found
            </h1>

            <p className="mt-3 text-slate-500">
              The course you are looking for
              does not exist.
            </p>

            <button
              onClick={() =>
                navigate("/courses")
              }
              className="mt-7 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Courses
            </button>
          </div>
        </main>
      </div>
    );
  }

  /* ===================================================
     COURSE DATA
  =================================================== */

  const totalLessons =
    course.lessons.length;

  const completedCount =
    course.lessons.filter((lesson) =>
      completedLessons.includes(
        lesson.id
      )
    ).length;

  const progress =
    totalLessons === 0
      ? 0
      : Math.round(
          (completedCount /
            totalLessons) *
            100
        );

  const totalMinutes =
    course.lessons.reduce(
      (total, lesson) =>
        total +
        getMinutes(lesson.duration),
      0
    );

  const completedMinutes =
    course.lessons
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

  const nextLesson =
    course.lessons.find(
      (lesson) =>
        !completedLessons.includes(
          lesson.id
        )
    );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="flex items-center gap-2 text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={20} />
            Dashboard
          </button>

          <div className="font-bold text-slate-900">
            NAVPATH{" "}
            <span className="text-blue-600">
              ACADEMY
            </span>
          </div>
        </div>
      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* =================================================
            COURSE HEADER
        ================================================= */}

        <section>
          <div className="flex flex-wrap items-center gap-3">

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
              {course.category}
            </span>

            {completedCount ===
              totalLessons &&
              totalLessons > 0 && (
                <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                  <CheckCircle2
                    size={14}
                  />
                  Completed
                </span>
              )}
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            {course.title}
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-500">
            {course.description}
          </p>
        </section>

        {/* =================================================
            COURSE OVERVIEW
        ================================================= */}

        <section className="mt-8 rounded-2xl bg-slate-950 p-7 text-white shadow-xl">

          <div className="grid gap-6 md:grid-cols-3">

            {/* Lessons */}

            <div>
              <p className="text-sm text-slate-400">
                Lessons
              </p>

              <p className="mt-2 text-3xl font-bold">
                {completedCount}
                <span className="text-lg font-medium text-slate-500">
                  {" "}
                  / {totalLessons}
                </span>
              </p>

              <p className="mt-1 text-sm text-slate-500">
                lessons completed
              </p>
            </div>

            {/* Duration */}

            <div>
              <p className="text-sm text-slate-400">
                Course Duration
              </p>

              <p className="mt-2 text-3xl font-bold">
                {formatDuration(
                  totalMinutes
                )}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                total lesson time
              </p>
            </div>

            {/* Progress */}

            <div>
              <p className="text-sm text-slate-400">
                Progress
              </p>

              <p className="mt-2 text-3xl font-bold">
                {progress}%
              </p>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-7 border-t border-slate-800 pt-6">
            <p className="text-sm text-slate-400">
              Completed learning time
            </p>

            <p className="mt-1 font-semibold text-white">
              {formatDuration(
                completedMinutes
              )}
            </p>
          </div>
        </section>

        {/* =================================================
            CONTINUE
        ================================================= */}

        {nextLesson && (
          <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-7">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Continue Learning
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  {nextLesson.title}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <Clock3 size={16} />
                  {nextLesson.duration}
                </div>
              </div>

              <button
                onClick={() =>
                  navigate(
                    `/lesson/${nextLesson.id}`
                  )
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Continue
                <ArrowRight size={18} />
              </button>
            </div>
          </section>
        )}

        {/* =================================================
            LESSON LIST
        ================================================= */}

        <section className="mt-10">

          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Course Content
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Lessons
            </h2>
          </div>

          <div className="space-y-3">

            {course.lessons.map(
              (lesson, index) => {
                const isCompleted =
                  completedLessons.includes(
                    lesson.id
                  );

                const isNext =
                  nextLesson?.id ===
                  lesson.id;

                return (
                  <article
                    key={lesson.id}
                    className={`rounded-2xl border bg-white p-5 transition ${
                      isNext
                        ? "border-blue-200 shadow-sm"
                        : "border-slate-200"
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                      {/* Number */}

                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold ${
                          isCompleted
                            ? "bg-green-50 text-green-600"
                            : isNext
                            ? "bg-blue-50 text-blue-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2
                            size={22}
                          />
                        ) : (
                          index + 1
                        )}
                      </div>

                      {/* Details */}

                      <div className="flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="font-semibold text-slate-900">
                            {lesson.title}
                          </h3>

                          {isNext && (
                            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                              Up Next
                            </span>
                          )}

                          {isCompleted && (
                            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                              Completed
                            </span>
                          )}
                        </div>

                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                          <Clock3
                            size={15}
                          />
                          {lesson.duration}
                        </div>
                      </div>

                      {/* Button */}

                      <button
                        onClick={() =>
                          navigate(
                            `/lesson/${lesson.id}`
                          )
                        }
                        className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
                          isCompleted
                            ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        <Play
                          size={16}
                          fill={
                            isCompleted
                              ? "none"
                              : "currentColor"
                          }
                        />

                        {isCompleted
                          ? "Review"
                          : "Start Lesson"}

                        <ArrowRight
                          size={16}
                        />
                      </button>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </section>

        {/* =================================================
            BOTTOM NAVIGATION
        ================================================= */}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <button
            onClick={() =>
              navigate("/courses")
            }
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Browse Courses
          </button>

          <button
            onClick={() =>
              navigate("/progress")
            }
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Progress
          </button>

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}