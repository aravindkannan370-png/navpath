import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "IMU CET 2027 — Complete Preparation",
    category: "IMU CET",
    price: "₹4,999",
  },
  {
    id: 2,
    title: "IMU CET Repeaters Program",
    category: "IMU CET",
    price: "₹3,999",
  },
  {
    id: 3,
    title: "DNS Preparation Program",
    category: "DNS",
    price: "₹3,499",
  },
  {
    id: 4,
    title: "Merchant Navy Career Program",
    category: "Merchant Navy",
    price: "₹2,999",
  },
  {
    id: 5,
    title: "IMU CET Mock Test Series",
    category: "Mock Tests",
    price: "₹999",
  },
  {
    id: 6,
    title: "Sponsorship Interview Preparation",
    category: "Career",
    price: "₹1,999",
  },
];

function Enrollment() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const course = courses.find(
    (item) => item.id === Number(courseId)
  );

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-950">
            Course not found
          </h1>

          <button
            onClick={() => navigate("/courses")}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const numericPrice = Number(
    course.price.replace(/[₹,]/g, "")
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <button
            onClick={() => navigate(`/courses/${course.id}`)}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              N
            </div>

            <div className="text-left">
              <p className="font-bold tracking-wide">NAVPATH</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                Academy
              </p>
            </div>
          </button>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Lock size={16} />
            Secure Enrollment
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Back */}
        <button
          onClick={() => navigate(`/courses/${course.id}`)}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Course
        </button>

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Enrollment
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
            Complete your enrollment
          </h1>

          <p className="mt-3 text-slate-500">
            Review your course details and continue to secure payment.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Student details */}
          <section className="rounded-3xl border border-slate-200 bg-white p-7">
            <h2 className="text-xl font-bold">
              Student Information
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Enter the details that will be associated with your
              NavPath Academy account.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-8 rounded-2xl bg-blue-50 p-5">
              <h3 className="font-semibold text-blue-950">
                What you will receive
              </h3>

              <div className="mt-4 space-y-3">
                {[
                  "Access to structured course content",
                  "Video lessons and study materials",
                  "Practice tests and mock examinations",
                  "Student progress tracking",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-blue-900"
                  >
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-blue-600"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Order summary */}
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Order Summary
            </p>

            <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white">
              <span className="inline-flex rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                {course.category}
              </span>

              <h2 className="mt-4 text-lg font-bold leading-7">
                {course.title}
              </h2>
            </div>

            <div className="mt-6 space-y-4 border-b border-slate-100 pb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Course fee</span>
                <span className="font-semibold">
                  {course.price}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Platform fee</span>
                <span className="font-semibold">₹0</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-5">
              <span className="font-semibold text-slate-700">
                Total
              </span>

              <span className="text-2xl font-bold">
                {course.price}
              </span>
            </div>

            <button
              onClick={() => {
                alert(
                  `Payment demo initiated for ${course.title} — ₹${numericPrice.toLocaleString(
                    "en-IN"
                  )}`
                );
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              <CreditCard size={19} />
              Proceed to Payment
              <ArrowRight size={18} />
            </button>

            <div className="mt-5 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-green-600"
              />

              <p className="text-xs leading-5 text-slate-500">
                Your payment will be processed through a secure
                payment gateway. This prototype does not process
                real payments.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Enrollment;