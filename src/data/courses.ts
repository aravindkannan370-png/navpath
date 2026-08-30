export type Lesson = {
  id: string;
  title: string;
  duration: string;
};

export type Course = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  lessons: Lesson[];
};

export const courses: Course[] = [
  {
    id: "imu-cet",
    title: "IMU CET 2027 — Complete Preparation",
    category: "IMU CET",
    description:
      "Complete preparation for Physics, Chemistry, Mathematics and English.",
    price: 4999,
    lessons: [
      {
        id: "imu-physics-1",
        title: "Introduction to Physics",
        duration: "25 min",
      },
      {
        id: "imu-physics-2",
        title: "Units and Measurements",
        duration: "30 min",
      },
      {
        id: "imu-physics-3",
        title: "Motion in a Straight Line",
        duration: "35 min",
      },
      {
        id: "imu-physics-4",
        title: "Laws of Motion",
        duration: "40 min",
      },
      {
        id: "imu-physics-5",
        title: "Work, Energy and Power",
        duration: "35 min",
      },
      {
        id: "imu-chemistry-1",
        title: "Atomic Structure",
        duration: "30 min",
      },
      {
        id: "imu-chemistry-2",
        title: "Periodic Classification",
        duration: "35 min",
      },
      {
        id: "imu-chemistry-3",
        title: "Chemical Bonding",
        duration: "40 min",
      },
      {
        id: "imu-maths-1",
        title: "Algebra Basics",
        duration: "30 min",
      },
      {
        id: "imu-maths-2",
        title: "Quadratic Equations",
        duration: "35 min",
      },
    ],
  },

  {
    id: "dns",
    title: "DNS Preparation Program",
    category: "DNS",
    description:
      "Structured preparation for DNS entrance examinations.",
    price: 3499,
    lessons: [
      {
        id: "dns-1",
        title: "DNS Examination Overview",
        duration: "20 min",
      },
      {
        id: "dns-2",
        title: "Mathematics Fundamentals",
        duration: "30 min",
      },
      {
        id: "dns-3",
        title: "Physics Fundamentals",
        duration: "30 min",
      },
      {
        id: "dns-4",
        title: "English Preparation",
        duration: "25 min",
      },
      {
        id: "dns-5",
        title: "Aptitude Preparation",
        duration: "30 min",
      },
    ],
  },

  {
    id: "career",
    title: "Merchant Navy Career Guide",
    category: "CAREER",
    description:
      "Career guidance, sponsorship information and interview preparation.",
    price: 2999,
    lessons: [
      {
        id: "career-1",
        title: "Merchant Navy Career Overview",
        duration: "20 min",
      },
      {
        id: "career-2",
        title: "Eligibility and Requirements",
        duration: "25 min",
      },
      {
        id: "career-3",
        title: "Sponsorship Preparation",
        duration: "30 min",
      },
      {
        id: "career-4",
        title: "Interview Preparation",
        duration: "35 min",
      },
      {
        id: "career-5",
        title: "Career Roadmap",
        duration: "25 min",
      },
    ],
  },

  {
    id: "imu-mock-tests",
    title: "IMU CET Mock Test Series",
    category: "MOCK TESTS",
    description:
      "Practice with structured IMU CET mock tests and improve your exam readiness.",
    price: 999,
    lessons: [
      {
        id: "mock-1",
        title: "Physics Mock Test",
        duration: "45 min",
      },
      {
        id: "mock-2",
        title: "Chemistry Mock Test",
        duration: "45 min",
      },
      {
        id: "mock-3",
        title: "Mathematics Mock Test",
        duration: "45 min",
      },
      {
        id: "mock-4",
        title: "English Mock Test",
        duration: "30 min",
      },
      {
        id: "mock-5",
        title: "Full IMU CET Mock Test",
        duration: "90 min",
      },
    ],
  },

  {
    id: "maritime-english",
    title: "Maritime English & Communication",
    category: "MARITIME",
    description:
      "Improve English communication and vocabulary for maritime studies and careers.",
    price: 1499,
    lessons: [
      {
        id: "maritime-english-1",
        title: "Maritime English Fundamentals",
        duration: "25 min",
      },
      {
        id: "maritime-english-2",
        title: "Maritime Vocabulary",
        duration: "30 min",
      },
      {
        id: "maritime-english-3",
        title: "Communication Skills",
        duration: "35 min",
      },
      {
        id: "maritime-english-4",
        title: "Interview Communication",
        duration: "30 min",
      },
      {
        id: "maritime-english-5",
        title: "Professional Maritime Communication",
        duration: "35 min",
      },
    ],
  },

  {
    id: "sponsorship-interview",
    title: "Sponsorship Interview Preparation",
    category: "CAREER",
    description:
      "Prepare for maritime company sponsorship interviews with structured practice.",
    price: 1999,
    lessons: [
      {
        id: "sponsor-1",
        title: "Understanding Sponsorship Interviews",
        duration: "25 min",
      },
      {
        id: "sponsor-2",
        title: "Common Interview Questions",
        duration: "35 min",
      },
      {
        id: "sponsor-3",
        title: "Technical Interview Preparation",
        duration: "40 min",
      },
      {
        id: "sponsor-4",
        title: "HR Interview Preparation",
        duration: "30 min",
      },
      {
        id: "sponsor-5",
        title: "Mock Sponsorship Interview",
        duration: "45 min",
      },
    ],
  },
];

export function getCourseById(
  courseId: string
): Course | undefined {
  return courses.find(
    (course) => course.id === courseId
  );
}

export function getLessonById(
  lessonId: string
): {
  course: Course;
  lesson: Lesson;
} | null {
  for (const course of courses) {
    const lesson = course.lessons.find(
      (lesson) => lesson.id === lessonId
    );

    if (lesson) {
      return {
        course,
        lesson,
      };
    }
  }

  return null;
}