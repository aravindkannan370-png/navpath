import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

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
    options: [
      "Newton",
      "Joule",
      "Watt",
      "Pascal",
    ],
    answer: "Joule",
  },
  {
    question:
      "Which quantity has both magnitude and direction?",
    options: [
      "Speed",
      "Distance",
      "Mass",
      "Velocity",
    ],
    answer: "Velocity",
  },
];

export default function Test() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const question = questions[current];

  /*
   * ================= SELECT ANSWER =================
   */

  const selectAnswer = (answer: string) => {
    const updatedAnswers = [...answers];

    updatedAnswers[current] = answer;

    setAnswers(updatedAnswers);
  };

  /*
   * ================= SUBMIT TEST =================
   */

  const submitTest = () => {
    /*
     * Save individual answers
     */

    localStorage.setItem(
      "testAnswers",
      JSON.stringify(answers)
    );

    /*
     * Mark test as completed
     */

    localStorage.setItem(
      "testCompleted",
      "true"
    );

    /*
     * Save the course associated with the test
     */

    localStorage.setItem(
      "lastTestCourse",
      courseId || "imu-cet"
    );

    /*
     * Calculate score
     */

    const correctAnswers = questions.filter(
      (question, index) =>
        answers[index] === question.answer
    ).length;

    const totalQuestions = questions.length;

    const score = Math.round(
      (correctAnswers / totalQuestions) * 100
    );

    /*
     * Create result object
     */

    const result = {
      title:
        "Physics — Mechanics Mock Test",
      subject: "Physics",
      score,
      totalQuestions,
      correctAnswers,
      date: new Date().toISOString(),
    };

    /*
     * Save latest result
     */

    localStorage.setItem(
      "latestTestResult",
      JSON.stringify(result)
    );

    /*
     * Get previous test history
     */

    let existingHistory: typeof result[] = [];

    try {
      const savedHistory =
        localStorage.getItem(
          "testHistory"
        );

      if (savedHistory) {
        const parsed = JSON.parse(
          savedHistory
        );

        if (Array.isArray(parsed)) {
          existingHistory = parsed;
        }
      }
    } catch {
      existingHistory = [];
    }

    /*
     * Add current result
     */

    const updatedHistory = [
      ...existingHistory,
      result,
    ];

    /*
     * Save test history
     */

    localStorage.setItem(
      "testHistory",
      JSON.stringify(updatedHistory)
    );

    /*
     * Go to results page
     */

    navigate("/results");
  };

  /*
   * ================= NEXT QUESTION =================
   */

  const nextQuestion = () => {
    /*
     * Don't continue without an answer
     */

    if (!answers[current]) {
      return;
    }

    /*
     * If this is the last question,
     * submit the test.
     */

    if (current === questions.length - 1) {
      submitTest();
      return;
    }

    /*
     * Move to next question
     */

    setCurrent(current + 1);
  };

  /*
   * ================= PREVIOUS QUESTION =================
   */

  const previousQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  /*
   * ================= PROGRESS =================
   */

  const progress =
    ((current + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ================= HEADER ================= */}

      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          {/* Dashboard button */}

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="flex items-center gap-2 text-blue-600 transition hover:text-blue-700"
          >
            <ArrowLeft size={20} />
            Dashboard
          </button>

          {/* Logo */}

          <div className="font-bold text-slate-900">
            NAVPATH{" "}
            <span className="text-blue-600">
              ACADEMY
            </span>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-3xl px-6 py-10">
        {/* Test heading */}

        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Practice Test
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Physics — Mechanics Mock Test
          </h1>

          <p className="mt-2 text-slate-500">
            Question {current + 1} of{" "}
            {questions.length}
          </p>
        </div>

        {/* ================= TEST CARD ================= */}

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          {/* Progress bar */}

          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
              <span>
                Test Progress
              </span>

              <span>
                {Math.round(progress)}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* Question */}

          <h2 className="mb-6 text-xl font-semibold leading-8 text-slate-900">
            {question.question}
          </h2>

          {/* Options */}

          <div className="space-y-3">
            {question.options.map(
              (option) => {
                const selected =
                  answers[current] ===
                  option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      selectAnswer(option)
                    }
                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-medium">
                      {option}
                    </span>

                    {selected && (
                      <CheckCircle
                        size={20}
                        className="shrink-0"
                      />
                    )}
                  </button>
                );
              }
            )}
          </div>

          {/* ================= NAVIGATION BUTTONS ================= */}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {/* Previous */}

            <button
              type="button"
              onClick={previousQuestion}
              disabled={current === 0}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>

            {/* Next / Submit */}

            <button
              type="button"
              onClick={nextQuestion}
              disabled={!answers[current]}
              className="rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {current ===
              questions.length - 1
                ? "Submit Test"
                : "Next Question →"}
            </button>
          </div>
        </div>

        {/* ================= ANSWER STATUS ================= */}

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Questions answered
            </p>

            <p className="font-semibold text-slate-900">
              {
                answers.filter(
                  Boolean
                ).length
              }{" "}
              / {questions.length}
            </p>
          </div>

          <div className="mt-3 flex gap-2">
            {questions.map(
              (_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full ${
                    answers[index]
                      ? "bg-green-500"
                      : index === current
                      ? "bg-blue-500"
                      : "bg-slate-200"
                  }`}
                />
              )
            )}
          </div>
        </div>

        {/* ================= BACK TO LEARNING ================= */}

        <div className="mt-6 text-center">
          <button
            onClick={() =>
              navigate(
                `/learn/${
                  courseId ||
                  "imu-cet"
                }`
              )
            }
            className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            ← Back to Course
          </button>
        </div>
      </main>
    </div>
  );
}