import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { getCourseById } from "../data/courses";

export default function CourseDetails() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const course = courseId
    ? getCourseById(courseId)
    : undefined;

  if (!course) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <BookOpen
              className="text-slate-400"
              size={28}
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-950">
            Course not found
          </h1>

          <p className="mt-2 text-slate-500">
            The course you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/courses")}
            className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-600"
          >
            Back to Courses
          </button>
        </div>
      </main>
    );
  }

  const totalMinutes = course.lessons.reduce(
    (total, lesson) => {
      const match = lesson.duration.match(/\d+/);
      return total + (match ? Number(match[0]) : 0);
    },
    0
  );

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const duration =
    hours > 0
      ? `${hours} hr${hours > 1 ? "s" : ""}${
          minutes > 0 ? ` ${minutes} min` : ""
        }`
      : `${minutes} min`;

  const features = [
    `${course.lessons.length} structured lessons`,
    "Video lessons and learning resources",
    "Study materials and revision support",
    "Practice questions and assessments",
    "Student progress tracking",
    "Access through the NavPath learning platform",
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              N
            </div>

            <div className="text-left">
              <p className="text-lg font-bold tracking-wide text-slate-950">
                NAVPATH
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500">
                Academy
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/courses")}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            <ArrowLeft size={17} />

            <span className="hidden sm:inline">
              All Courses
            </span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            {/* Course information */}
            <div>
              <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
                {course.category}
              </span>

              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                {course.title}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                {course.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                  <BookOpen
                    size={17}
                    className="text-blue-400"
                  />

                  {course.lessons.length} lessons
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                  <Clock3
                    size={17}
                    className="text-blue-400"
                  />

                  {duration}
                </div>
              </div>
            </div>

            {/* Purchase Card */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
              <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-blue-950 to-blue-700">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-400/20 blur-2xl" />

                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  <PlayCircle
                    size={42}
                    className="text-white"
                  />
                </div>

                <div className="absolute bottom-5 left-5">
                  <p className="text-xs text-blue-200">
                    NavPath Academy
                  </p>

                  <p className="mt-1 font-semibold text-white">
                    Learn. Prepare. Sail.
                  </p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-slate-400">
                  Course fee
                </p>

                <p className="mt-1 text-3xl font-bold">
                  ₹{course.price.toLocaleString("en-IN")}
                </p>

                {/* PURCHASE BUTTON */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/enrollment/${course.id}`
                    )
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Enrol Now
                  <ArrowRight size={18} />
                </button>

                <p className="mt-4 text-center text-xs text-slate-500">
                  Secure enrollment • Lifetime course access
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          {/* Features */}
          <section>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Course Overview
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              Everything you need to prepare
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-500">
              Follow a structured learning journey with
              lessons, study materials, practice and
              assessments designed around your
              preparation goals.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <span className="text-sm font-medium leading-6 text-slate-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Course Information */}
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">
              Course Information
            </h3>

            <div className="mt-5 space-y-4">
              <InfoRow
                icon={<BookOpen size={18} />}
                label="Lessons"
                value={`${course.lessons.length} lessons`}
              />

              <InfoRow
                icon={<Clock3 size={18} />}
                label="Duration"
                value={duration}
              />

              <InfoRow
                icon={<ShieldCheck size={18} />}
                label="Access"
                value="Online"
              />
            </div>

            {/* Purchase section */}
            <div className="mt-6 rounded-2xl bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-900">
                Ready to start?
              </p>

              <p className="mt-1 text-sm leading-6 text-blue-700">
                Enrol in this course and begin your
                preparation today.
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-blue-700">
                  Course fee
                </span>

                <span className="text-xl font-bold text-blue-950">
                  ₹{course.price.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/enrollment/${course.id}`
                  )
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Purchase Course
                <ArrowRight size={17} />
              </button>
            </div>
          </aside>
        </div>

        {/* Lessons Preview */}
        <section className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Course Content
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-950">
            What you will learn
          </h2>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {course.lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="flex items-center gap-4 border-b border-slate-100 p-5 last:border-b-0"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">
                  {index + 1}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-slate-900">
                    {lesson.title}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Video lesson
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock3 size={16} />
                  {lesson.duration}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

type InfoRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoRow({
  icon,
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}