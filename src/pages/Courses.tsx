import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Search,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import { courses } from "../data/courses";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(courses.map((course) => course.category))
      ),
    ];
  }, []);

  const filteredCourses = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesCategory =
        category === "All" || course.category === category;

      const matchesSearch =
        searchValue === "" ||
        course.title.toLowerCase().includes(searchValue) ||
        course.description.toLowerCase().includes(searchValue) ||
        course.category.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const getTotalMinutes = (courseId: string) => {
    const course = courses.find(
      (item) => item.id === courseId
    );

    if (!course) return 0;

    return course.lessons.reduce((total, lesson) => {
      const match = lesson.duration.match(/\d+/);

      return total + (match ? Number(match[0]) : 0);
    }, 0);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
      return `${hours} hr${hours > 1 ? "s" : ""}`;
    }

    return `${hours} hr${hours > 1 ? "s" : ""} ${remainingMinutes} min`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
              <GraduationCap size={24} />
            </div>

            <span className="text-sm font-semibold text-blue-600">
              NAVPATH ACADEMY
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Explore Courses
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Build your knowledge, prepare for examinations and develop
            the skills you need for your maritime career.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search courses..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Category */}
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  category === item
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredCourses.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
            <BookOpen
              size={42}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              No courses found
            </h2>

            <p className="mt-2 text-slate-500">
              Try changing your search or category filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => {
              const totalMinutes = getTotalMinutes(course.id);

              return (
                <article
                  key={course.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Course Header */}
                  <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">
                    <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                      <BookOpen size={21} />
                    </div>

                    <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                      {course.category}
                    </span>

                    <h2 className="mt-5 pr-10 text-xl font-bold leading-snug">
                      {course.title}
                    </h2>
                  </div>

                  {/* Course Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm leading-6 text-slate-600">
                      {course.description}
                    </p>

                    {/* Stats */}
                    <div className="mt-6 flex items-center gap-5 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <BookOpen size={17} />
                        <span>
                          {course.lessons.length}{" "}
                          {course.lessons.length === 1
                            ? "lesson"
                            : "lessons"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock size={17} />
                        <span>
                          {formatDuration(totalMinutes)}
                        </span>
                      </div>
                    </div>

                    {/* View Course */}
                    <Link
                      to={`/courses/${course.id}`}
                      className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Course
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}