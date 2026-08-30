import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  Trophy,
  MinusCircle,
} from "lucide-react";

const questions = [
  {
    question: "What is the SI unit of force?",
    answer: "Newton",
  },
  {
    question: "Which law explains the concept of inertia?",
    answer: "Newton's First Law",
  },
  {
    question: "What is the rate of change of velocity called?",
    answer: "Acceleration",
  },
  {
    question: "What is the SI unit of energy?",
    answer: "Joule",
  },
  {
    question: "Which of the following is a vector quantity?",
    answer: "Velocity",
  },
  {
    question:
      "What happens to the resistance of a metallic conductor when temperature increases?",
    answer: "It increases",
  },
  {
    question: "What is the atomic number of oxygen?",
    answer: "8",
  },
  {
    question:
      "What is the pH of a neutral solution at room temperature?",
    answer: "7",
  },
  {
    question:
      "Which gas is most abundant in Earth's atmosphere?",
    answer: "Nitrogen",
  },
  {
    question: "What is the chemical symbol for sodium?",
    answer: "Na",
  },
  {
    question: "What is 12 × 8?",
    answer: "96",
  },
  {
    question: "What is the square root of 144?",
    answer: "12",
  },
  {
    question: "If x + 7 = 15, what is x?",
    answer: "8",
  },
  {
    question: "What is the value of 2³?",
    answer: "8",
  },
  {
    question: "What is the sum of the angles in a triangle?",
    answer: "180°",
  },
  {
    question: "Choose the correctly spelled word.",
    answer: "Environment",
  },
  {
    question: "Choose the synonym of 'rapid'.",
    answer: "Quick",
  },
  {
    question:
      "If a ship travels 120 km in 3 hours, what is its average speed?",
    answer: "40 km/h",
  },
  {
    question: "What does IMO stand for?",
    answer: "International Maritime Organization",
  },
  {
    question:
      "Which instrument is primarily used to determine direction at sea?",
    answer: "Compass",
  },
];

export default function Results() {
  const navigate = useNavigate();

  let userAnswers: string[] = [];

  try {
    const saved = localStorage.getItem("testAnswers");

    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        userAnswers = parsed;
      }
    }
  } catch {
    userAnswers = [];
  }

  const totalQuestions = questions.length;

  const correctAnswers = questions.filter(
    (question, index) =>
      userAnswers[index] === question.answer
  ).length;

  const answeredQuestions = questions.filter(
    (_, index) =>
      Boolean(userAnswers[index])
  ).length;

  const unansweredQuestions =
    totalQuestions - answeredQuestions;

  const incorrectAnswers =
    answeredQuestions - correctAnswers;

  const score = Math.round(
    (correctAnswers / totalQuestions) * 100
  );

  const accuracy =
    answeredQuestions > 0
      ? Math.round(
          (correctAnswers / answeredQuestions) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-blue-600 transition hover:text-blue-800"
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

      <main className="mx-auto max-w-5xl px-6 py-10">

        {/* Result Header */}
        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Trophy size={38} />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Test Completed
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            IMU CET 2027 Practice Test
          </h1>

          <p className="mt-3 text-slate-500">
            Here is your complete 20-question test performance.
          </p>

        </div>

        {/* Score */}
        <section className="mt-8 rounded-3xl bg-white p-8 text-center shadow-sm sm:p-10">

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
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${score}%`,
              }}
            />

          </div>

        </section>

        {/* Summary */}
        <section className="mt-6 grid gap-4 sm:grid-cols-4">

          {/* Total */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">

            <p className="text-sm text-slate-500">
              Questions
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {totalQuestions}
            </p>

          </div>

          {/* Correct */}
          <div className="rounded-2xl border border-green-100 bg-white p-6 text-center shadow-sm">

            <p className="text-sm text-slate-500">
              Correct
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {correctAnswers}
            </p>

          </div>

          {/* Incorrect */}
          <div className="rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">

            <p className="text-sm text-slate-500">
              Incorrect
            </p>

            <p className="mt-2 text-3xl font-bold text-red-500">
              {incorrectAnswers}
            </p>

          </div>

          {/* Unanswered */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">

            <p className="text-sm text-slate-500">
              Unanswered
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-500">
              {unansweredQuestions}
            </p>

          </div>

        </section>

        {/* Accuracy */}
        <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold text-blue-900">
                Answer Accuracy
              </p>

              <p className="mt-1 text-sm text-blue-700">
                Accuracy based on questions you attempted.
              </p>
            </div>

            <div className="text-3xl font-bold text-blue-700">
              {accuracy}%
            </div>

          </div>

        </section>

        {/* Questions Review */}
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-2xl font-bold">
                Answer Review
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review all {totalQuestions} questions from your test.
              </p>
            </div>

            <div className="text-sm font-semibold text-slate-500">
              {correctAnswers}/{totalQuestions} Correct
            </div>

          </div>

          <div className="mt-6 space-y-4">

            {questions.map((question, index) => {

              const userAnswer =
                userAnswers[index] || "";

              const isAnswered =
                userAnswer !== "";

              const isCorrect =
                userAnswer === question.answer;

              return (
                <div
                  key={index}
                  className={`rounded-2xl border p-5 ${
                    !isAnswered
                      ? "border-slate-200 bg-slate-50"
                      : isCorrect
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                  }`}
                >

                  <div className="flex gap-3">

                    {!isAnswered ? (
                      <MinusCircle
                        className="mt-0.5 shrink-0 text-slate-400"
                        size={21}
                      />
                    ) : isCorrect ? (
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

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-start justify-between gap-2">

                        <p className="font-semibold leading-6 text-slate-900">
                          {index + 1}. {question.question}
                        </p>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            !isAnswered
                              ? "bg-slate-200 text-slate-600"
                              : isCorrect
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {!isAnswered
                            ? "Not Answered"
                            : isCorrect
                              ? "Correct"
                              : "Incorrect"}
                        </span>

                      </div>

                      <p className="mt-3 text-sm text-slate-600">
                        Your answer:{" "}
                        <strong
                          className={
                            !isAnswered
                              ? "text-slate-500"
                              : isCorrect
                                ? "text-green-700"
                                : "text-red-600"
                          }
                        >
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
            type="button"
            onClick={() => navigate("/dashboard")}
            className="rounded-xl bg-slate-950 px-7 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Back to Dashboard
          </button>

          <button
            type="button"
            onClick={() => navigate("/progress")}
            className="rounded-xl border border-slate-200 bg-white px-7 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Progress
          </button>

          <button
            type="button"
            onClick={() => navigate("/tests/imu-cet")}
            className="rounded-xl border border-slate-200 bg-white px-7 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Retake Test
          </button>

        </div>

      </main>
    </div>
  );
}