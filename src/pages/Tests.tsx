import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileQuestion,
  Trophy,
} from "lucide-react";

const questions = [
  {
    question: "What is the SI unit of force?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    answer: "Newton",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars",
  },
  {
    question: "What is the chemical symbol for oxygen?",
    options: ["O", "Ox", "C", "Og"],
    answer: "O",
  },
  {
    question: "What is 12 × 8?",
    options: ["86", "96", "108", "112"],
    answer: "96",
  },
  {
    question: "Which branch of mathematics deals with shapes and sizes?",
    options: ["Algebra", "Geometry", "Statistics", "Calculus"],
    answer: "Geometry",
  },
];

export default function Tests() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const question = questions[currentQuestion];

  const handleSelect = (option: string) => {
    setSelectedAnswer(option);

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = option;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || "");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || "");
    }
  };

  const handleSubmit = () => {
    if (!selectedAnswer && answers.length < questions.length) {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestion] = selectedAnswer;
      setAnswers(updatedAnswers);
    }

    setSubmitted(true);
  };

  const score = questions.reduce((total, item, index) => {
    return total + (answers[index] === item.answer ? 1 : 0);
  }, 0);

  if (submitted) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <Link
              to="/dashboard"
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                N
              </div>

              <div>
                <div className="font-bold tracking-wide text-slate-900">
                  NAVPATH
                </div>
                <div className="text-xs tracking-[0.2em] text-slate-500">
                  ACADEMY
                </div>
              </div>
            </Link>
          </div>
        </header>

        <main className="mx-auto flex max-w-3xl justify-center px-6 py-16">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
              <Trophy className="h-10 w-10 text-blue-600" />
            </div>

            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Test completed
            </p>

            <h1 className="text-3xl font-bold text-slate-950">
              Physics — Mechanics Mock Test
            </h1>

            <div className="my-10">
              <div className="text-6xl font-bold text-slate-950">
                {percentage}%
              </div>

              <p className="mt-2 text-slate-500">
                {score} out of {questions.length} answers correct
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="text-2xl font-bold text-slate-950">
                  {questions.length}
                </div>
                <div className="text-sm text-slate-500">Questions</div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="text-2xl font-bold text-slate-950">
                  {score}
                </div>
                <div className="text-sm text-slate-500">Correct</div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="text-2xl font-bold text-slate-950">
                  {questions.length - score}
                </div>
                <div className="text-sm text-slate-500">Incorrect</div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => navigate("/dashboard")}
                className="rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                Back to Dashboard
              </button>

              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswer("");
                  setAnswers([]);
                  setSubmitted(false);
                }}
                className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Retake Test
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            to="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              N
            </div>

            <div>
              <div className="font-bold tracking-wide text-slate-900">
                NAVPATH
              </div>
              <div className="text-xs tracking-[0.2em] text-slate-500">
                ACADEMY
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock3 className="h-4 w-4" />
            Practice Test
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Practice
          </p>

          <h1 className="text-3xl font-bold text-slate-950">
            Physics — Mechanics Mock Test
          </h1>

          <p className="mt-2 text-slate-500">
            Test your preparation before the IMU CET examination.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span className="text-sm text-slate-500">
              {Math.round(
                ((currentQuestion + 1) / questions.length) * 100
              )}
              %
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${
                  ((currentQuestion + 1) / questions.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <FileQuestion className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-slate-400">
                Question {currentQuestion + 1}
              </p>

              <h2 className="text-xl font-bold leading-relaxed text-slate-950">
                {question.question}
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    isSelected
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="font-medium text-slate-800">
                    {option}
                  </span>

                  {isSelected && (
                    <CheckCircle2 className="ml-auto h-5 w-5 text-blue-600" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}