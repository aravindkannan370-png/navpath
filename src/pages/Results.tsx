import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, ArrowLeft, Trophy } from "lucide-react";

const questions = [
  {
    question: "What is the SI unit of force?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    answer: "Newton",
  },
  {
    question: "Which law explains inertia?",
    options: [
      "Newton's First Law",
      "Newton's Second Law",
      "Newton's Third Law",
      "Law of Gravitation",
    ],
    answer: "Newton's First Law",
  },
  {
    question: "What is acceleration?",
    options: [
      "Rate of change of velocity",
      "Rate of change of distance",
      "Distance travelled",
      "Force divided by mass",
    ],
    answer: "Rate of change of velocity",
  },
  {
    question: "What is the SI unit of energy?",
    options: ["Newton", "Joule", "Watt", "Pascal"],
    answer: "Joule",
  },
  {
    question: "Which quantity has both magnitude and direction?",
    options: ["Speed", "Distance", "Mass", "Velocity"],
    answer: "Velocity",
  },
];

export default function Results() {
  const navigate = useNavigate();

  let userAnswers: string[] = [];

  try {
    const saved = localStorage.getItem("testAnswers");

    if (saved) {
      userAnswers = JSON.parse(saved);
    }
  } catch {
    userAnswers = [];
  }

  const correctAnswers = questions.filter(
    (question, index) =>
      userAnswers[index] === question.answer
  ).length;

  const totalQuestions = questions.length;

  const score = Math.round(
    (correctAnswers / totalQuestions) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-blue-600"
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

      <main className="mx-auto max-w-4xl px-6 py-10">
        {/* Result Header */}
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Trophy size={38} />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Test Completed
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Physics — Mechanics Mock Test
          </h1>

          <p className="mt-3 text-slate-500">
            Here is your test performance.
          </p>
        </div>

        {/* Score */}
        <section className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Your Score
          </p>

          <div className="mt-3 text-6xl font-bold text-blue-600">
            {score}%
          </div>

          <p className="mt-3 text-slate-500">
            {correctAnswers} out of {totalQuestions} answers correct
          </p>

          <div className="mx-auto mt-6 h-3 max-w-xl overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{
                width: `${score}%`,
              }}
            />
          </div>
        </section>

        {/* Summary */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 text-center">
            <p className="text-sm text-slate-500">
              Questions
            </p>

            <p className="mt-2 text-3xl font-bold">
              {totalQuestions}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 text-center">
            <p className="text-sm text-slate-500">
              Correct
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {correctAnswers}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 text-center">
            <p className="text-sm text-slate-500">
              Incorrect
            </p>

            <p className="mt-2 text-3xl font-bold text-red-500">
              {totalQuestions - correctAnswers}
            </p>
          </div>
        </section>

        {/* Questions Review */}
        <section className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">
            Answer Review
          </h2>

          <div className="mt-6 space-y-5">
            {questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect =
                userAnswer === question.answer;

              return (
                <div
                  key={index}
                  className={`rounded-xl border p-5 ${
                    isCorrect
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex gap-3">
                    {isCorrect ? (
                      <CheckCircle
                        className="mt-0.5 shrink-0 text-green-600"
                        size={21}
                      />
                    ) : (
                      <XCircle
                        className="mt-0.5 shrink-0 text-red-500"
                        size={21}
                      />
                    )}

                    <div>
                      <p className="font-semibold">
                        {index + 1}. {question.question}
                      </p>

                      <p className="mt-2 text-sm text-slate-600">
                        Your answer:{" "}
                        <strong>
                          {userAnswer || "Not answered"}
                        </strong>
                      </p>

                      {!isCorrect && (
                        <p className="mt-1 text-sm text-green-700">
                          Correct answer:{" "}
                          <strong>
                            {question.answer}
                          </strong>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl bg-slate-950 px-7 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Back to Dashboard
          </button>

          <button
            onClick={() => navigate("/progress")}
            className="rounded-xl border border-slate-200 bg-white px-7 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            View Progress
          </button>

          <button
            onClick={() => navigate("/tests/imu-cet")}
            className="rounded-xl border border-slate-200 bg-white px-7 py-3 font-semibold text-blue-600 hover:bg-slate-50"
          >
            Retake Test
          </button>
        </div>
      </main>
    </div>
  );
}