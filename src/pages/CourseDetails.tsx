import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  PlayCircle,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

type Course = {
  id: number;
  title: string;
  category: string;
  description: string;
  lessons: string;
  duration: string;
  students: string;
  level: string;
  price: string;
  features: string[];
};

const courses: Course[] = [
  {
    id: 1,
    title: "IMU CET 2027 — Complete Preparation",
    category: "IMU CET",
    description:
      "A complete preparation program covering Physics, Chemistry, Mathematics, English and aptitude for IMU CET aspirants.",
    lessons: "150+ lessons",
    duration: "120+ hours",
    students: "2,500+ students",
    level: "Beginner to Advanced",
    price: "₹4,999",
    features: [
      "Complete IMU CET subject preparation",
      "150+ structured video lessons",
      "Study materials and revision notes",
      "Topic-wise practice questions",
      "Full-length mock tests",
      "Performance and progress tracking",
    ],
  },
  {
    id: 2,
    title: "IMU CET Repeaters Program",
    category: "IMU CET",
    description:
      "A focused preparation program designed for repeaters who want to improve their IMU CET score.",
    lessons: "100+ lessons",
    duration: "90+ hours",
    students: "1,200+ students",
    level: "Advanced",
    price: "₹3,999",
    features: [
      "Focused revision strategy",
      "Advanced problem solving",
      "Previous exam-style questions",
      "Mock test series",
      "Performance analysis",
      "Exam strategy and guidance",
    ],
  },
  {
    id: 3,
    title: "DNS Preparation Program",
    category: "DNS",
    description:
      "Prepare for DNS entrance examinations and build the academic foundation for your maritime career.",
    lessons: "80+ lessons",
    duration: "70+ hours",
    students: "1,000+ students",
    level: "Beginner",
    price: "₹3,499",
    features: [
      "DNS entrance preparation",
      "Subject-wise video lessons",
      "Study materials",
      "Practice tests",
      "Mock examinations",
      "Maritime career guidance",
    ],
  },
  {
    id: 4,
    title: "Merchant Navy Career Program",
    category: "Merchant Navy",
    description:
      "Understand the Merchant Navy career path, entrance process, interviews and sponsorship opportunities.",
    lessons: "60+ lessons",
    duration: "45+ hours",
    students: "850+ students",
    level: "Beginner",
    price: "₹2,999",
    features: [
      "Merchant Navy career roadmap",
      "Entrance process guidance",
      "Sponsorship preparation",
      "Interview preparation",
      "Communication guidance",
      "Career resources",
    ],
  },
  {
    id: 5,
    title: "IMU CET Mock Test Series",
    category: "Mock Tests",
    description:
      "Practice with exam-style mock tests designed to improve speed, accuracy and confidence.",
    lessons: "50+ tests",
    duration: "25+ hours",
    students: "3,000+ students",
    level: "All levels",
    price: "₹999",
    features: [
      "50+ mock tests",
      "Exam-style questions",
      "Timed practice",
      "Instant score calculation",
      "Performance analysis",
      "Detailed test results",
    ],
  },
  {
    id: 6,
    title: "Sponsorship Interview Preparation",
    category: "Career",
    description:
      "Prepare for sponsorship interviews with structured practice, communication training and guidance.",
    lessons: "40+ lessons",
    duration: "30+ hours",
    students: "600+ students",
    level: "Intermediate",
    price: "₹1,999",
    features: [
      "Interview preparation",
      "Frequently asked questions",
      "Communication practice",
      "Mock interviews",
      "Personality development",
      "Career guidance",
    ],
  },
];

function CourseDetails() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const course = courses.find(
    (item) => item.id === Number(courseId)
  );

  if (!course) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <BookOpen className="text-slate-400" size={28} />
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
            <span className="hidden sm:inline">All Courses</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
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
                  <BookOpen size={17} className="text-blue-400" />
                  {course.lessons}
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                  <Clock3 size={17} className="text-blue-400" />
                  {course.duration}
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                  <Users size={17} className="text-blue-400" />
                  {course.students}
                </div>
              </div>
            </div>

            {/* Course preview */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
              <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-blue-950 to-blue-700">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-400/20 blur-2xl" />

                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  <PlayCircle size={42} className="text-white" />
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
                <p className="text-sm text-slate-400">Course fee</p>

                <p className="mt-1 text-3xl font-bold">
                  {course.price}
                </p>

                <button
                  onClick={() => navigate(`/enroll/${course.id}`)}
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

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          {/* What you get */}
          <section>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Course Overview
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              Everything you need to prepare
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-500">
              Follow a structured learning journey with lessons, study
              materials, practice and assessments designed around your
              preparation goals.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {course.features.map((feature) => (
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

          {/* Course information */}
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">
              Course Information
            </h3>

            <div className="mt-5 space-y-4">
              <InfoRow
                icon={<BookOpen size={18} />}
                label="Lessons"
                value={course.lessons}
              />

              <InfoRow
                icon={<Clock3 size={18} />}
                label="Duration"
                value={course.duration}
              />

              <InfoRow
                icon={<Users size={18} />}
                label="Students"
                value={course.students}
              />

              <InfoRow
                icon={<Target size={18} />}
                label="Level"
                value={course.level}
              />

              <InfoRow
                icon={<ShieldCheck size={18} />}
                label="Access"
                value="Online"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-900">
                Ready to start?
              </p>

              <p className="mt-1 text-sm leading-6 text-blue-700">
                Enrol in this course and begin your preparation today.
              </p>

              <button
                onClick={() => navigate(`/enroll/${course.id}`)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Enrol Now
                <ArrowRight size={17} />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

type InfoRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

export default CourseDetails;