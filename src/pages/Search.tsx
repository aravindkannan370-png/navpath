import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileText,
  Search as SearchIcon,
  Video,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type SearchItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  type: "Course" | "Lesson" | "Test" | "Study Material";
  route: string;
};

const searchData: SearchItem[] = [
  {
    id: 1,
    title: "IMU CET 2027 Complete Preparation",
    description:
      "Complete preparation for Physics, Chemistry, Mathematics and English.",
    category: "IMU CET",
    type: "Course",
    route: "/courses/1",
  },
  {
    id: 2,
    title: "Physics — Mechanics",
    description:
      "Learn motion, force, work, energy and other important mechanics concepts.",
    category: "Physics",
    type: "Lesson",
    route: "/learn/1",
  },
  {
    id: 3,
    title: "Chemistry Preparation",
    description:
      "Important chemistry concepts and exam-focused preparation.",
    category: "Chemistry",
    type: "Lesson",
    route: "/learn/1",
  },
  {
    id: 4,
    title: "Mathematics Preparation",
    description:
      "Practice important mathematics topics for the IMU CET examination.",
    category: "Mathematics",
    type: "Lesson",
    route: "/learn/1",
  },
  {
    id: 5,
    title: "Physics Mechanics Mock Test",
    description:
      "20-question practice test covering important mechanics concepts.",
    category: "Mock Test",
    type: "Test",
    route: "/tests/1",
  },
  {
    id: 6,
    title: "IMU CET Study Materials",
    description:
      "Download notes, preparation materials and revision resources.",
    category: "Study Material",
    type: "Study Material",
    route: "/my-courses",
  },
  {
    id: 7,
    title: "DNS Preparation Program",
    description:
      "Structured preparation for DNS entrance examinations.",
    category: "DNS",
    type: "Course",
    route: "/courses/3",
  },
  {
    id: 8,
    title: "Merchant Navy Career Guide",
    description:
      "Learn about Merchant Navy careers, sponsorships and opportunities.",
    category: "Career",
    type: "Course",
    route: "/courses/4",
  },
];

function Search() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Courses",
    "Lessons",
    "Tests",
    "Study Materials",
  ];

  const filteredResults = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return searchData.filter((item) => {
      const matchesQuery =
        searchTerm === "" ||
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm);

      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Courses" && item.type === "Course") ||
        (activeFilter === "Lessons" && item.type === "Lesson") ||
        (activeFilter === "Tests" && item.type === "Test") ||
        (activeFilter === "Study Materials" &&
          item.type === "Study Material");

      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter]);

  const getIcon = (type: SearchItem["type"]) => {
    switch (type) {
      case "Course":
        return <BookOpen size={21} />;

      case "Lesson":
        return <Video size={21} />;

      case "Test":
        return <FileText size={21} />;

      case "Study Material":
        return <FileText size={21} />;

      default:
        return <SearchIcon size={21} />;
    }
  };

  const getIconBackground = (type: SearchItem["type"]) => {
    switch (type) {
      case "Course":
        return "bg-blue-50 text-blue-600";

      case "Lesson":
        return "bg-purple-50 text-purple-600";

      case "Test":
        return "bg-orange-50 text-orange-600";

      case "Study Material":
        return "bg-green-50 text-green-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              N
            </div>

            <div className="text-left">
              <p className="font-bold">NAVPATH</p>

              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                Academy
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Dashboard
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* TITLE */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Explore NavPath
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
            Search
          </h1>

          <p className="mt-2 text-slate-500">
            Find courses, lessons, tests and study materials.
          </p>
        </div>

        {/* SEARCH BOX */}
        <div className="relative">
          <SearchIcon
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoFocus
            placeholder="Search IMU CET, Physics, DNS, mock tests..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-5 pl-14 pr-14 text-base shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Clear search"
            >
              <X size={19} />
            </button>
          )}
        </div>

        {/* FILTERS */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeFilter === filter
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* RESULTS HEADER */}
        <div className="mt-9 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              {query
                ? `Search results for "${query}"`
                : "Recommended content"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredResults.length}{" "}
              {filteredResults.length === 1
                ? "result"
                : "results"}{" "}
              found
            </p>
          </div>
        </div>

        {/* RESULTS */}
        {filteredResults.length > 0 ? (
          <div className="mt-6 space-y-4">
            {filteredResults.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.route)}
                className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-6"
              >
                {/* ICON */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${getIconBackground(
                    item.type
                  )}`}
                >
                  {getIcon(item.type)}
                </div>

                {/* CONTENT */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-950">
                      {item.title}
                    </h3>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500">
                      {item.type}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
                    {item.category}
                  </p>
                </div>

                {/* ARROW */}
                <div className="hidden shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600 sm:block">
                  <ArrowRight size={21} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* NO RESULTS */
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <SearchIcon size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              No results found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              We couldn't find anything matching your search.
              Try another keyword such as IMU CET, Physics, DNS or
              Mock Test.
            </p>

            <button
              onClick={() => {
                setQuery("");
                setActiveFilter("All");
              }}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* POPULAR SEARCHES */}
        {!query && (
          <section className="mt-10">
            <h3 className="text-lg font-bold">
              Popular searches
            </h3>

            <div className="mt-4 flex flex-wrap gap-3">
              {[
                "IMU CET",
                "IMU CET 2027",
                "Physics",
                "Chemistry",
                "DNS",
                "Mock Test",
                "Merchant Navy",
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  {term}
                </button>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Search;