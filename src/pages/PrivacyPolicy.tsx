import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
              N
            </div>

            <div>
              <p className="font-bold tracking-wide text-white">
                NAVPATH
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Academy
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back
          </button>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-10">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
            <ShieldCheck size={28} />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
            NavPath Academy
          </p>

          <h1 className="text-4xl font-bold text-white">
            Privacy Policy
          </h1>

          <p className="mt-3 text-slate-400">
            Last updated: August 2026
          </p>
        </div>

        <div className="space-y-8 leading-7 text-slate-300">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              1. Introduction
            </h2>

            <p>
              NavPath Academy respects your privacy and is committed to
              protecting the personal information of students, parents and
              other users of our platform.
            </p>

            <p className="mt-3">
              This Privacy Policy explains what information we may collect,
              how we use it and how we protect it when you use NavPath
              Academy services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              2. Information We Collect
            </h2>

            <p>Depending on how you use the platform, we may collect:</p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Account and authentication information</li>
              <li>Course enrolment information</li>
              <li>Learning progress</li>
              <li>Test and assessment results</li>
              <li>Information you provide when contacting support</li>
              <li>Technical information required to operate the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              3. How We Use Information
            </h2>

            <p>
              Information may be used to provide and improve NavPath
              Academy services, including:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Creating and managing student accounts</li>
              <li>Providing access to courses and learning content</li>
              <li>Tracking learning progress</li>
              <li>Providing tests and assessments</li>
              <li>Communicating important account information</li>
              <li>Providing customer and technical support</li>
              <li>Improving platform performance and user experience</li>
              <li>Maintaining platform security</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              4. Course and Learning Data
            </h2>

            <p>
              Your course activity, lesson progress and assessment results
              may be stored so that NavPath Academy can provide a
              personalized learning experience and display your progress.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              5. Payments
            </h2>

            <p>
              If paid courses or other paid services are introduced,
              payments may be processed through authorized third-party
              payment providers. Payment providers may process payment
              information according to their own privacy policies and
              security practices.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              6. Third-Party Services
            </h2>

            <p>
              NavPath Academy may use trusted third-party services for
              authentication, hosting, analytics, payments, notifications,
              content delivery and other platform functions.
            </p>

            <p className="mt-3">
              Such services may process information according to their
              respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              7. Data Security
            </h2>

            <p>
              We take reasonable technical and organizational measures to
              protect user information against unauthorized access,
              alteration, disclosure or destruction.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              8. Data Retention
            </h2>

            <p>
              We retain information for as long as reasonably necessary to
              provide our services, maintain records, meet legal
              requirements and resolve disputes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              9. Children's Privacy
            </h2>

            <p>
              NavPath Academy is intended to be used by students and other
              users with appropriate authorization. Where required, parents
              or guardians should supervise the use of services by younger
              students.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              10. Your Rights
            </h2>

            <p>
              Subject to applicable law, users may request access to,
              correction of, or deletion of their personal information.
              Requests can be made through our support contact.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              11. Changes to This Policy
            </h2>

            <p>
              We may update this Privacy Policy from time to time. Any
              changes will be reflected on this page with an updated
              revision date.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              12. Contact Us
            </h2>

            <p>
              If you have questions about this Privacy Policy or your
              personal information, please contact NavPath Academy.
            </p>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="font-medium text-white">
                NavPath Academy
              </p>

              <p className="mt-2 text-slate-400">
                Email: info@navpathacademy.com
              </p>

              <p className="text-slate-400">
                Phone: +91 77365 22210
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default PrivacyPolicy;