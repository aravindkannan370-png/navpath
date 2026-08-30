import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Search,
  Ship,
  Target,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Course = {
  id: number
  title: string
  category: string
  description: string
  lessons: string
  duration: string
  students: string
  level: string
  price: string
  featured?: boolean
}

const courses: Course[] = [
  {
    id: 1,
    title: 'IMU CET 2027 — Complete Preparation',
    category: 'IMU CET',
    description:
      'Complete preparation for IMU CET with Physics, Chemistry, Mathematics, English and aptitude.',
    lessons: '150+ lessons',
    duration: '120+ hours',
    students: '2,500+ students',
    level: 'Beginner to Advanced',
    price: '₹4,999',
    featured: true,
  },
  {
    id: 2,
    title: 'IMU CET Repeaters Program',
    category: 'IMU CET',
    description:
      'A focused preparation program for repeaters who want to improve their IMU CET score.',
    lessons: '100+ lessons',
    duration: '90+ hours',
    students: '1,200+ students',
    level: 'Advanced',
    price: '₹3,999',
  },
  {
    id: 3,
    title: 'DNS Preparation Program',
    category: 'DNS',
    description:
      'Prepare for DNS entrance examinations and build the academic foundation for your maritime journey.',
    lessons: '80+ lessons',
    duration: '70+ hours',
    students: '1,000+ students',
    level: 'Beginner',
    price: '₹3,499',
    featured: true,
  },
  {
    id: 4,
    title: 'Merchant Navy Career Program',
    category: 'Merchant Navy',
    description:
      'Understand the Merchant Navy career path, entrance process, interviews and sponsorship opportunities.',
    lessons: '60+ lessons',
    duration: '45+ hours',
    students: '850+ students',
    level: 'Beginner',
    price: '₹2,999',
  },
  {
    id: 5,
    title: 'IMU CET Mock Test Series',
    category: 'Mock Tests',
    description:
      'Practice with exam-style mock tests designed to improve speed, accuracy and confidence.',
    lessons: '50+ tests',
    duration: '25+ hours',
    students: '3,000+ students',
    level: 'All levels',
    price: '₹999',
    featured: true,
  },
  {
    id: 6,
    title: 'Sponsorship Interview Preparation',
    category: 'Career',
    description:
      'Prepare for sponsorship interviews with structured practice, communication training and guidance.',
    lessons: '40+ lessons',
    duration: '30+ hours',
    students: '600+ students',
    level: 'Intermediate',
    price: '₹1,999',
  },
]

const categories = [
  'All Courses',
  'IMU CET',
  'DNS',
  'Merchant Navy',
  'Mock Tests',
  'Career',
]

function Courses() {
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = useState('All Courses')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === 'All Courses' ||
        course.category === selectedCategory

      const search = searchTerm.toLowerCase().trim()

      const matchesSearch =
        search === '' ||
        course.title.toLowerCase().includes(search) ||
        course.description.toLowerCase().includes(search) ||
        course.category.toLowerCase().includes(search)

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">
              N
            </div>

            <div className="text-left">
              <p className="text-lg font-bold tracking-wide text-slate-950">
                NAVPATH
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500">
                Academy
              </p>
            </div>
          </button>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="hidden items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 sm:flex"
            >
              <ArrowLeft size={17} />
              Dashboard
            </button>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
              A
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {/* Heading */}
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Explore
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950">
            Courses for your journey
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
            Choose a structured learning path designed to help you prepare for
            IMU CET, DNS and a successful maritime career.
          </p>
        </section>

        {/* Search */}
        <section className="mb-7">
          <div className="relative max-w-2xl">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search courses, exams or career programs..."
              className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
        </section>

        {/* Categories */}
        <section className="mb-10 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                selectedCategory === category
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </section>

        {/* Course count */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Showing{' '}
              <span className="font-semibold text-slate-900">
                {filteredCourses.length}
              </span>{' '}
              {filteredCourses.length === 1 ? 'course' : 'courses'}
            </p>
          </div>
        </div>

        {/* Courses */}
        {filteredCourses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => (
              <article
                key={course.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Course visual */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-400/20 blur-2xl" />

                  <div className="absolute -bottom-16 -left-8 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />

                  <div className="relative flex h-full flex-col justify-between p-6">
                    <div className="flex items-start justify-between">
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur">
                        {course.category}
                      </span>

                      {course.featured && (
                        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-900">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-blue-200 backdrop-blur">
                        {course.category === 'Merchant Navy' ||
                        course.category === 'Career' ? (
                          <Ship size={23} />
                        ) : course.category === 'Mock Tests' ? (
                          <Target size={23} />
                        ) : (
                          <BookOpen size={23} />
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-medium text-blue-200">
                          NavPath Academy
                        </p>

                        <p className="text-sm font-semibold text-white">
                          Learn. Prepare. Sail.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course content */}
                <div className="p-6">
                  <h2 className="min-h-[3.5rem] text-xl font-bold leading-7 text-slate-950">
                    {course.title}
                  </h2>

                  <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-slate-500">
                    {course.description}
                  </p>

                  {/* Course information */}
                  <div className="mt-5 grid grid-cols-2 gap-3 border-y border-slate-100 py-5">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <BookOpen size={15} className="text-blue-600" />
                      {course.lessons}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock3 size={15} className="text-blue-600" />
                      {course.duration}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Users size={15} className="text-blue-600" />
                      {course.students}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <CheckCircle2 size={15} className="text-blue-600" />
                      {course.level}
                    </div>
                  </div>

                  {/* Price + action */}
                  <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-400">Course fee</p>

                      <p className="mt-1 text-2xl font-bold text-slate-950">
                        {course.price}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="group flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                    >
                      View Course

                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty search state */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <Search size={24} className="text-slate-400" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-950">
              No courses found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try another search term or select a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All Courses')
              }}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default Courses