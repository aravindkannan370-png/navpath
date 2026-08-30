import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  BookOpen,
} from "lucide-react";

import { getLessonById } from "../data/courses";

/*
 * Get completed lesson IDs from localStorage
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

/*
 * Save a lesson as completed
 */
function saveCompletedLesson(
  lessonId: string
) {
  const completedLessons =
    getCompletedLessons();

  if (
    !completedLessons.includes(lessonId)
  ) {
    completedLessons.push(lessonId);
  }

  localStorage.setItem(
    "navpath_completed_lessons",
    JSON.stringify(completedLessons)
  );
}

export default function Lesson() {
  const navigate = useNavigate();
  const { lessonId } = useParams();

  /*
   * Find lesson from courses.ts
   */
  const result = lessonId
    ? getLessonById(lessonId)
    : null;

  /*
   * Lesson not found
   */
  if (!result) {
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

            <h1 className="text-2xl font-bold text-slate-900">
              Lesson Not Found
            </h1>

            <p className="mt-3 text-slate-500">
              The lesson you are looking
              for does not exist.
            </p>

            <button
              onClick={() =>
                navigate("/courses")
              }
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Courses
            </button>
          </div>
        </main>
      </div>
    );
  }

  const { course, lesson } = result;

  /*
   * Check completion
   */
  const completedLessons =
    getCompletedLessons();

  const isCompleted =
    completedLessons.includes(
      lesson.id
    );

  /*
   * Find lesson position
   */
  const lessonIndex =
    course.lessons.findIndex(
      (item) =>
        item.id === lesson.id
    );

  const lessonNumber =
    lessonIndex + 1;

  /*
   * Complete lesson
   */
  const completeLesson = () => {
    saveCompletedLesson(lesson.id);

    navigate(
      `/learn/${course.id}`
    );
  };

  /*
   * Go back to course
   */
  const goBackToCourse = () => {
    navigate(
      `/learn/${course.id}`
    );
  };

  /*
   * Previous lesson
   */
  const previousLesson =
    lessonIndex > 0
      ? course.lessons[
          lessonIndex - 1
        ]
      : null;

  /*
   * Next lesson
   */
  const nextLesson =
    lessonIndex <
    course.lessons.length - 1
      ? course.lessons[
          lessonIndex + 1
        ]
      : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ================= HEADER ================= */}

      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <button
            onClick={goBackToCourse}
            className="flex items-center gap-2 text-blue-600 transition hover:text-blue-700"
          >
            <ArrowLeft size={20} />
            Back to Course
          </button>

          <div className="font-bold text-slate-900">
            NAVPATH{" "}
            <span className="text-blue-600">
              ACADEMY
            </span>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-4xl px-6 py-10">

        {/* Course information */}

        <div>

          <div className="flex flex-wrap items-center gap-3">

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
              {course.category}
            </span>

            {isCompleted && (
              <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                <CheckCircle2
                  size={14}
                />
                Completed
              </span>
            )}
          </div>

          <p className="mt-5 text-sm font-semibold text-blue-600">
            LESSON {lessonNumber} OF{" "}
            {course.lessons.length}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            {lesson.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-slate-500">

            <Clock size={18} />

            <span>
              {lesson.duration}
            </span>

            <span>•</span>

            <span>
              {course.title}
            </span>
          </div>
        </div>

        {/* ================= PROGRESS ================= */}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between text-sm">

            <span className="font-medium text-slate-600">
              Lesson Progress
            </span>

            <span className="font-semibold text-blue-600">
              {Math.round(
                (lessonNumber /
                  course.lessons.length) *
                  100
              )}
              %
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${
                  (lessonNumber /
                    course.lessons.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* ================= LESSON CONTENT ================= */}

        <section className="mt-8 rounded-2xl bg-white p-8 shadow-sm md:p-10">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BookOpen size={24} />
            </div>

            <div>

              <p className="text-sm font-medium text-slate-500">
                Course Lesson
              </p>

              <h2 className="text-xl font-bold text-slate-900">
                {lesson.title}
              </h2>
            </div>
          </div>

          {/* Content */}

          <div className="mt-8 space-y-6 leading-8 text-slate-600">

            <p>
              Welcome to{" "}
              <strong className="text-slate-900">
                {lesson.title}
              </strong>
              .
            </p>

            <p>
              This lesson is part of the{" "}
              <strong className="text-slate-900">
                {course.title}
              </strong>{" "}
              preparation program. Study
              the concepts carefully and make
              notes of the important points.
            </p>

            <div className="rounded-xl bg-blue-50 p-6 text-blue-900">

              <h3 className="font-bold">
                Study Tip
              </h3>

              <p className="mt-2 text-sm leading-6 text-blue-800">
                Take notes while studying and
                revise the important concepts
                before moving to the next
                lesson.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-6">

              <h3 className="font-bold text-slate-900">
                What you should do
              </h3>

              <ul className="mt-4 space-y-3 text-sm">

                <li>
                  ✓ Read and understand the
                  lesson concepts.
                </li>

                <li>
                  ✓ Make notes of important
                  formulas and concepts.
                </li>

                <li>
                  ✓ Revise the lesson before
                  attempting the practice
                  test.
                </li>

                <li>
                  ✓ Mark the lesson as
                  completed when you finish
                  studying.
                </li>
              </ul>
            </div>
          </div>

          {/* ================= COMPLETE ================= */}

          <div className="mt-10 border-t pt-7">

            {isCompleted ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3 text-green-600">

                  <CheckCircle2
                    size={25}
                  />

                  <div>

                    <p className="font-semibold">
                      Lesson Completed
                    </p>

                    <p className="text-sm text-slate-500">
                      You have completed this
                      lesson.
                    </p>
                  </div>
                </div>

                {nextLesson ? (
                  <button
                    onClick={() =>
                      navigate(
                        `/lesson/${nextLesson.id}`
                      )
                    }
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Next Lesson →
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      navigate("/progress")
                    }
                    className="rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
                  >
                    View Progress
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={completeLesson}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                <CheckCircle2
                  size={20}
                />
                Complete Lesson
              </button>
            )}
          </div>
        </section>

        {/* ================= PREVIOUS / NEXT ================= */}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">

          {previousLesson ? (
            <button
              onClick={() =>
                navigate(
                  `/lesson/${previousLesson.id}`
                )
              }
              className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-left transition hover:bg-slate-50"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Previous Lesson
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                ←{" "}
                {previousLesson.title}
              </p>
            </button>
          ) : (
            <div />
          )}

          {nextLesson && (
            <button
              onClick={() =>
                navigate(
                  `/lesson/${nextLesson.id}`
                )
              }
              className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-right transition hover:bg-slate-50"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Next Lesson
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {nextLesson.title} →
              </p>
            </button>
          )}
        </div>

        {/* ================= COURSE BUTTON ================= */}

        <div className="mt-6 text-center">

          <button
            onClick={goBackToCourse}
            className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            ← Back to all lessons
          </button>
        </div>
      </main>
    </div>
  );
}