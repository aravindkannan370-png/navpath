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
  lessons: Lesson[];
};

export const courses: Course[] = [
  {
    id: "imu-cet",
    title: "IMU CET 2027 — Complete Preparation",
    category: "IMU CET",
    description:
      "Complete preparation for Physics, Chemistry, Mathematics and English.",
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