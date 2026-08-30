import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Ship,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Question = {
  id: number;
  subject: string;
  question: string;
  options: string[];
  answer: string;
};

const testQuestions: Question[] = [
  {
    id: 1,
    subject: "Physics",
    question: "What is the SI unit of force?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    answer: "Newton",
  },
  {
    id: 2,
    subject: "Physics",
    question: "Which law explains the concept of inertia?",
    options: [
      "Newton's First Law",
      "Newton's Second Law",
      "Newton's Third Law",
      "Law of Gravitation",
    ],
    answer: "Newton's First Law",
  },
  {
    id: 3,
    subject: "Physics",
    question: "What is the rate of change of velocity called?",
    options: ["Speed", "Acceleration", "Momentum", "Displacement"],
    answer: "Acceleration",
  },
  {
    id: 4,
    subject: "Physics",
    question: "What is the SI unit of energy?",
    options: ["Newton", "Watt", "Joule", "Volt"],
    answer: "Joule",
  },
  {
    id: 5,
    subject: "Physics",
    question: "Which of the following is a vector quantity?",
    options: ["Speed", "Distance", "Mass", "Velocity"],
    answer: "Velocity",
  },
  {
    id: 6,
    subject: "Physics",
    question:
      "What happens to the resistance of a metallic conductor when temperature increases?",
    options: [
      "It decreases",
      "It increases",
      "It becomes zero",
      "It remains unchanged",
    ],
    answer: "It increases",
  },
  {
    id: 7,
    subject: "Chemistry",
    question: "What is the atomic number of oxygen?",
    options: ["6", "7", "8", "9"],
    answer: "8",
  },
  {
    id: 8,
    subject: "Chemistry",
    question: "What is the pH of a neutral solution at room temperature?",
    options: ["0", "5", "7", "14"],
    answer: "7",
  },
  {
    id: 9,
    subject: "Chemistry",
    question: "Which gas is most abundant in Earth's atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: "Nitrogen",
  },
  {
    id: 10,
    subject: "Chemistry",
    question: "What is the chemical symbol for sodium?",
    options: ["So", "S", "Na", "Sn"],
    answer: "Na",
  },
  {
    id: 11,
    subject: "Mathematics",
    question: "What is 12 × 8?",
    options: ["86", "96", "108", "112"],
    answer: "96",
  },
  {
    id: 12,
    subject: "Mathematics",
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "14"],
    answer: "12",
  },
  {
    id: 13,
    subject: "Mathematics",
    question: "If x + 7 = 15, what is x?",
    options: ["6", "7", "8", "9"],
    answer: "8",
  },
  {
    id: 14,
    subject: "Mathematics",
    question: "What is the value of 2³?",
    options: ["4", "6", "8", "9"],
    answer: "8",
  },
  {
    id: 15,
    subject: "Mathematics",
    question: "What is the sum of the angles in a triangle?",
    options: ["90°", "180°", "270°", "360°"],
    answer: "180°",
  },
  {
    id: 16,
    subject: "English",
    question: "Choose the correctly spelled word.",
    options: [
      "Enviroment",
      "Envirnoment",
      "Environment",
      "Environmant",
    ],
    answer: "Environment",
  },
  {
    id: 17,
    subject: "English",
    question: "Choose the synonym of 'rapid'.",
    options: ["Slow", "Quick", "Weak", "Late"],
    answer: "Quick",
  },
  {
    id: 18,
    subject: "Aptitude",
    question:
      "If a ship travels 120 km in 3 hours, what is its average speed?",
    options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
    answer: "40 km/h",
  },
  {
    id: 19,
    subject: "Maritime",
    question: "What does IMO stand for?",
    options: [
      "International Maritime Organization",
      "Indian Maritime Office",
      "International Marine Operations",
      "Indian Marine Organization",
    ],
    answer: "International Maritime Organization",
  },
  {
    id: 20,
    subject: "Maritime",
    question:
      "Which instrument is primarily used to determine direction at sea?",
    options: ["Barometer", "Compass", "Thermometer", "Altimeter"],
    answer: "Compass",
  },
];

const TEST_DURATION = 30 * 60;

function Test() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("testAnswers");

      if (!saved) {
        return Array(testQuestions.length).fill("");
      }

      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        return Array(testQuestions.length).fill("");
      }

      return testQuestions.map(
        (_, index) => parsed[index] ?? ""
      );
    } catch {
      return Array(testQuestions.length).fill("");
    }
  });

  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [submitted, setSubmitted] = useState(false);

  const question = testQuestions[currentQuestion];

  const answeredCount = answers.filter(
    (answer) => answer !== ""
  ).length;

  const progress = Math.round(
    ((currentQuestion + 1) / testQuestions.length) * 100
  );

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const calculateAndSubmit = () => {
    if (submitted) {
      return;
    }

    let correct = 0;

    testQuestions.forEach((item, index) => {
      if (answers[index] === item.answer) {
        correct++;
      }
    });

    const score = Math.round(
      (correct / testQuestions.length) * 100
    );

    localStorage.setItem(
      "testAnswers",
      JSON.stringify(answers)
    );

    localStorage.setItem("testScore", String(score));
    localStorage.setItem("testCompleted", "true");
    localStorage.setItem(
      "testQuestionCount",
      String(testQuestions.length)
    );
    localStorage.setItem(
      "testCorrectAnswers",
      String(correct)
    );

    setSubmitted(true);

    navigate("/results");
  };

  useEffect(() => {
    if (submitted) {
      return;
    }

    if (timeLeft <= 0) {
      calculateAndSubmit();
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [timeLeft, submitted]);

  const selectAnswer = (answer: string) => {
    setAnswers((previous) => {
      const updated = [...previous];

      updated[currentQuestion] = answer;

      localStorage.setItem(
        "testAnswers",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <button
            type="button"
            onClick={() => navigate("/tests/imu-cet")}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Tests
          </button>

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              N
            </div>

            <div className="hidden text-left sm:block">
              <p className="font-bold tracking-wide text-slate-950">
                NAVPATH
              </p>

              <p className="text-[9px] uppercase tracking-[0.25em] text-slate-400">
                Academy
              </p>
            </div>

          </div>

          <div
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-white ${
              timeLeft <= 300
                ? "bg-red-600"
                : "bg-slate-950"
            }`}
          >
            <Clock3 size={17} />

            <span className="font-semibold tabular-nums">
              {formatTime(timeLeft)}
            </span>
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-6 py-8 lg:px-8">

        {/* Test Header */}
        <section className="mb-6 overflow-hidden rounded-3xl bg-[#061b32] p-7 text-white shadow-xl sm:p-9">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200">
                <Ship size={16} />
                IMU CET Mock Test
              </div>

              <h1 className="text-2xl font-bold sm:text-3xl">
                IMU CET 2027 Practice Test
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100/70">
                Test your preparation across Physics,
                Chemistry, Mathematics, English, aptitude
                and maritime awareness.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-3 text-center">

              <div className="rounded-2xl bg-white/10 px-5 py-4">
                <p className="text-2xl font-bold">
                  {testQuestions.length}
                </p>

                <p className="text-xs text-blue-100/60">
                  Questions
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 px-5 py-4">
                <p className="text-2xl font-bold">
                  30
                </p>

                <p className="text-xs text-blue-100/60">
                  Minutes
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* Progress */}
        <section className="mb-6 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">

          <div className="mb-3 flex items-center justify-between">

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Question {currentQuestion + 1} of{" "}
                {testQuestions.length}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {answeredCount} of {testQuestions.length} answered
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
              <Target size={17} />
              {progress}%
            </div>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-[#087ea4] transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </section>

        {/* Question Card */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-8 flex flex-wrap items-center gap-3">

            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {question.subject}
            </span>

            <span className="text-sm text-slate-400">
              Question {question.id}
            </span>

          </div>

          <h2 className="max-w-3xl text-xl font-bold leading-8 text-slate-950 sm:text-2xl">
            {question.question}
          </h2>

          <div className="mt-8 space-y-3">

            {question.options.map((option, index) => {
              const selected =
                answers[currentQuestion] === option;

              const letter =
                String.fromCharCode(65 + index);

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => selectAnswer(option)}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    selected
                      ? "border-[#087ea4] bg-cyan-50 ring-2 ring-cyan-100"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50"
                  }`}
                >

                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold ${
                      selected
                        ? "bg-[#087ea4] text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {letter}
                  </span>

                  <span
                    className={`flex-1 font-medium ${
                      selected
                        ? "text-[#087ea4]"
                        : "text-slate-700"
                    }`}
                  >
                    {option}
                  </span>

                  {selected && (
                    <CheckCircle2
                      size={21}
                      className="text-[#087ea4]"
                    />
                  )}

                </button>
              );
            })}

          </div>

          {/* Navigation */}
          <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={18} />
              Previous
            </button>

            {currentQuestion === testQuestions.length - 1 ? (
              <button
                type="button"
                onClick={calculateAndSubmit}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#061b32] px-7 py-3 font-semibold text-white transition hover:bg-[#087ea4]"
              >
                Submit Test
                <CheckCircle2 size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#087ea4] px-7 py-3 font-semibold text-white transition hover:bg-[#061b32]"
              >
                Next Question
                <ArrowRight size={18} />
              </button>
            )}

          </div>

        </section>

        {/* Question Navigator */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-4">

            <h3 className="font-bold text-slate-900">
              Question Navigator
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Click a number to jump to a question.
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            {testQuestions.map((item, index) => {

              const answered =
                answers[index] !== "";

              const active =
                currentQuestion === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setCurrentQuestion(index)
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition ${
                    active
                      ? "bg-[#061b32] text-white"
                      : answered
                        ? "bg-cyan-100 text-[#087ea4]"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}

          </div>

        </section>

        {/* Test Information */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-slate-900">
              Correct Answer
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Each correct answer contributes to your final score.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-slate-900">
              Practice Mode
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Improve your speed, accuracy and confidence.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-slate-900">
              Test Results
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Your result will be available immediately after submission.
            </p>
          </div>

        </section>

      </main>
    </div>
  );
}

export default Test;