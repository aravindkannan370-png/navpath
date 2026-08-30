import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Trash2,
  MessageSquare,
} from "lucide-react";

type SupportRequest = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

function getSupportRequests(): SupportRequest[] {
  try {
    const saved = localStorage.getItem(
      "navpath_support_requests"
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

export default function SupportRequests() {
  const navigate = useNavigate();

  const requests = getSupportRequests();

  const deleteRequest = (id: string) => {
    const updatedRequests = requests.filter(
      (request) => request.id !== id
    );

    localStorage.setItem(
      "navpath_support_requests",
      JSON.stringify(updatedRequests)
    );

    window.location.reload();
  };

  const clearAllRequests = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all support requests?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(
      "navpath_support_requests"
    );

    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
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

          <div className="font-bold">
            NAVPATH{" "}
            <span className="text-blue-600">
              ACADEMY
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Heading */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Support
            </p>

            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
              Support Requests
            </h1>

            <p className="mt-3 text-slate-500">
              View messages submitted through the
              support form.
            </p>
          </div>

          {requests.length > 0 && (
            <button
              onClick={clearAllRequests}
              className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={17} />
              Clear All
            </button>
          )}
        </div>

        {/* Stats */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <MessageSquare size={21} />
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Total Requests
            </p>

            <p className="mt-1 text-3xl font-bold">
              {requests.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Mail size={21} />
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Messages
            </p>

            <p className="mt-1 text-3xl font-bold">
              {requests.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Status
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              Active
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Local support inbox
            </p>
          </div>
        </section>

        {/* Requests */}
        <section className="mt-8">
          {requests.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <MessageSquare size={28} />
              </div>

              <h2 className="mt-5 text-xl font-bold">
                No support requests yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-slate-500">
                When someone submits the support
                form, their message will appear here.
              </p>

              <button
                onClick={() =>
                  navigate("/support")
                }
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Open Support Form
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {requests
                .slice()
                .reverse()
                .map((request) => (
                  <article
                    key={request.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-xl font-bold">
                            {request.subject}
                          </h2>

                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                            New
                          </span>
                        </div>

                        <div className="mt-3 flex flex-col gap-1 text-sm text-slate-500 sm:flex-row sm:gap-4">
                          <span>
                            From:{" "}
                            <strong className="text-slate-700">
                              {request.name}
                            </strong>
                          </span>

                          <span>
                            {request.email}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          deleteRequest(request.id)
                        }
                        className="flex w-fit items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>

                    <div className="mt-5 rounded-xl bg-slate-50 p-5">
                      <p className="whitespace-pre-wrap leading-7 text-slate-600">
                        {request.message}
                      </p>
                    </div>

                    <div className="mt-4 text-xs text-slate-400">
                      Submitted{" "}
                      {new Date(
                        request.createdAt
                      ).toLocaleString()}
                    </div>
                  </article>
                ))}
            </div>
          )}
        </section>

        {/* Bottom Navigation */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() =>
              navigate("/support")
            }
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold hover:bg-slate-50"
          >
            Support Form
          </button>

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}