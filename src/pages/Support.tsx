import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  Headphones,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";

type SupportRequest = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  submittedAt: string;
  status: "New" | "In Progress" | "Resolved";
};

function getSupportRequests(): SupportRequest[] {
  try {
    const saved = localStorage.getItem(
      "supportRequests"
    );

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}

export default function Support() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [subject, setSubject] =
    useState("");
  const [message, setMessage] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      setError(
        "Please fill in all fields."
      );

      return;
    }

    const now =
      new Date().toISOString();

    const request: SupportRequest = {
      id:
        `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 9)}`,

      name: name.trim(),

      email: email.trim(),

      subject: subject.trim(),

      message: message.trim(),

      date: now,

      submittedAt: now,

      status: "New",
    };

    const existingRequests =
      getSupportRequests();

    const updatedRequests = [
      ...existingRequests,
      request,
    ];

    localStorage.setItem(
      "supportRequests",
      JSON.stringify(
        updatedRequests
      )
    );

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");

    setSubmitted(true);

    window.dispatchEvent(
      new Event("supportRequestSubmitted")
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =================================================
          HEADER
      ================================================= */}

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

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="mx-auto max-w-6xl px-6 py-12">

        {/* Heading */}

        <section>

          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            SUPPORT
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Support & Contact
          </h1>

          <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-500">
            Need help with your courses,
            tests or learning progress?
            Send us a message and our
            support team can assist you.
          </p>
        </section>

        {/* =================================================
            CONTENT
        ================================================= */}

        <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.5fr]">

          {/* =================================================
              SUPPORT INFORMATION
          ================================================= */}

          <div className="space-y-5">

            {/* Support card */}

            <div className="rounded-2xl bg-slate-950 p-7 text-white shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <Headphones
                  size={24}
                />
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                How can we help?
              </h2>

              <p className="mt-3 leading-7 text-slate-400">
                Contact NavPath Academy
                support for questions about
                your courses, tests,
                progress or account.
              </p>

              <div className="mt-7 space-y-4">

                <div className="flex items-center gap-3">

                  <Mail
                    size={19}
                    className="text-blue-400"
                  />

                  <span className="text-sm text-slate-300">
                    Support team
                  </span>
                </div>

                <div className="flex items-center gap-3">

                  <MessageSquare
                    size={19}
                    className="text-blue-400"
                  />

                  <span className="text-sm text-slate-300">
                    Submit a support request
                  </span>
                </div>
              </div>
            </div>

            {/* Requests button */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <h3 className="font-bold text-slate-900">
                Already submitted a request?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View your previously submitted
                support messages.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/support-requests"
                  )
                }
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View Support Requests
                <ArrowLeft
                  size={17}
                  className="rotate-180"
                />
              </button>
            </div>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-8">

            {submitted ? (
              <div className="py-12 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <CheckCircle2
                    size={34}
                  />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-slate-900">
                  Message Submitted
                </h2>

                <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500">
                  Your support request has
                  been submitted successfully.
                  You can view it from the
                  Support Requests page.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">

                  <button
                    onClick={() =>
                      navigate(
                        "/support-requests"
                      )
                    }
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    View Support Request
                  </button>

                  <button
                    onClick={() =>
                      setSubmitted(false)
                    }
                    className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-7">

                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                    Contact Support
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Send us a message
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Fill in the details below
                    and submit your request.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* Name */}

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Your Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(event) =>
                        setName(
                          event.target.value
                        )
                      }
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  {/* Email */}

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(
                          event.target.value
                        )
                      }
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  {/* Subject */}

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      type="text"
                      value={subject}
                      onChange={(event) =>
                        setSubject(
                          event.target.value
                        )
                      }
                      placeholder="What do you need help with?"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  {/* Message */}

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      value={message}
                      onChange={(event) =>
                        setMessage(
                          event.target.value
                        )
                      }
                      placeholder="Describe your question or issue..."
                      rows={7}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  {/* Error */}

                  {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                      {error}
                    </div>
                  )}

                  {/* Submit */}

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Send size={18} />
                    Submit Support Request
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="mt-16 border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-6xl px-6 py-8">

          <div className="flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026 NavPath Academy. All
              rights reserved.
            </p>

            <p>
              Learn. Prepare. Navigate your
              future.
            </p>

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="text-left transition hover:text-blue-600 sm:text-right"
            >
              Dashboard
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}