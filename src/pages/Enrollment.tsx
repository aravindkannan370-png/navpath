import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { courses } from "../data/courses";


function Enrollment() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const course = courses.find(
    (item) => item.id === courseId
  );

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

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

 const price = course.price;

  const handlePayment = () => {
    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setProcessing(true);

    // Demo payment processing
    setTimeout(() => {
      try {
        const saved = localStorage.getItem(
          "navpath_enrolled_courses"
        );

        let enrolledCourses: string[] = [];

        if (saved) {
          try {
            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
              enrolledCourses = parsed;
            }
          } catch {
            enrolledCourses = [];
          }
        }

        // Avoid duplicate enrollment
        if (!enrolledCourses.includes(course.id)) {
          enrolledCourses.push(course.id);
        }

        localStorage.setItem(
          "navpath_enrolled_courses",
          JSON.stringify(enrolledCourses)
        );

        // Save student information for the prototype
        localStorage.setItem(
          "navpath-student",
          JSON.stringify({
            fullName: fullName.trim(),
            phone: phone.trim(),
            email: email.trim(),
          })
        );

        // Save the latest enrollment
        localStorage.setItem(
          "navpath-last-enrollment",
          JSON.stringify({
            courseId: course.id,
            courseTitle: course.title,
            amount: price,
            enrolledAt: new Date().toISOString(),
          })
        );

        setProcessing(false);

        navigate("/my-courses");
      } catch {
        setProcessing(false);
        setError(
          "Something went wrong while completing enrollment. Please try again."
        );
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <button
            onClick={() =>
              navigate(`/courses/${course.id}`)
            }
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              N
            </div>

            <div className="text-left">
              <p className="font-bold tracking-wide">
                NAVPATH
              </p>

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
          onClick={() =>
            navigate(`/courses/${course.id}`)
          }
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
            Enter your details and continue to the
            secure demo payment.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Student details */}
          <section className="rounded-3xl border border-slate-200 bg-white p-7">
            <h2 className="text-xl font-bold">
              Student Information
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Enter the details associated with your
              NavPath Academy account.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(event.target.value)
                  }
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

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

          {/* Order Summary */}
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
                <span className="text-slate-500">
                  Course fee
                </span>

                <span className="font-semibold">
                  ₹{price.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Platform fee
                </span>

                <span className="font-semibold">
                  ₹0
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-5">
              <span className="font-semibold text-slate-700">
                Total
              </span>

              <span className="text-2xl font-bold">
                ₹{price.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CreditCard size={19} />

              {processing
                ? "Processing Payment..."
                : "Proceed to Payment"}

              {!processing && <ArrowRight size={18} />}
            </button>

            <div className="mt-5 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-green-600"
              />

              <p className="text-xs leading-5 text-slate-500">
                This is a demonstration payment flow.
                No real payment is processed. After the
                simulated payment, the course will be
                added to your My Courses section.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Enrollment;