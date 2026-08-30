import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    localStorage.setItem(
      'navpath-user',
      JSON.stringify({
        email,
        name: 'Aravind',
        isLoggedIn: true,
      }),
    )

    navigate('/dashboard')
  }

  const handleGoogleLogin = () => {
    localStorage.setItem(
      'navpath-user',
      JSON.stringify({
        name: 'Google Student',
        email: 'student@google.demo',
        isLoggedIn: true,
      }),
    )

    navigate('/dashboard')
  }

  const handleForgotPassword = () => {
    alert('Password reset functionality will be connected to the backend.')
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side - Brand */}
        <section className="relative hidden overflow-hidden lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                  N
                </div>

                <div>
                  <p className="text-lg font-bold tracking-wide text-white">
                    NAVPATH
                  </p>

                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                    Academy
                  </p>
                </div>
              </div>
            </div>

            {/* Hero content */}
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300">
                Learn. Prepare. Sail.
              </div>

              <h1 className="text-5xl font-bold leading-tight tracking-tight text-white xl:text-6xl">
                Navigate your path to a maritime career.
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
                Prepare for IMU CET, DNS and Merchant Navy opportunities with
                structured courses, mock tests and expert guidance.
              </p>

              {/* Stats */}
              <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
                <div className="border-l border-white/10 pl-4">
                  <p className="text-2xl font-bold text-white">50+</p>
                  <p className="mt-1 text-sm text-slate-400">Mock Tests</p>
                </div>

                <div className="border-l border-white/10 pl-4">
                  <p className="text-2xl font-bold text-white">150+</p>
                  <p className="mt-1 text-sm text-slate-400">Lessons</p>
                </div>

                <div className="border-l border-white/10 pl-4">
                  <p className="text-2xl font-bold text-white">24/7</p>
                  <p className="mt-1 text-sm text-slate-400">Learning</p>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-sm text-slate-500">
              © 2026 NavPath Academy. All rights reserved.
            </p>
          </div>
        </section>

        {/* Right side - Login */}
        <section className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                N
              </div>

              <div>
                <p className="text-lg font-bold tracking-wide text-slate-900">
                  NAVPATH
                </p>

                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                  Academy
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Student Portal
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Welcome back
              </h2>

              <p className="mt-2 text-slate-500">
                Sign in to continue your learning journey.
              </p>
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                    className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                    className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Sign in */}
              <button
                type="submit"
                className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:bg-blue-600"
              >
                Sign in

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                or
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex h-13 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold">
                G
              </span>

              Continue with Google
            </button>

            {/* Registration */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Create account
              </button>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login