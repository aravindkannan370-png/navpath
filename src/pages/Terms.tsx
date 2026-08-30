import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Terms() {
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
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back
          </button>
        </div>
      </header>

      {/* Main Content */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        {/* Page Heading */}
        <div className="mb-10">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
            <FileText size={28} />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
            NavPath Academy
          </p>

          <h1 className="text-4xl font-bold text-white">
            Terms & Conditions
          </h1>

          <p className="mt-3 text-slate-400">
            Last updated: August 2026
          </p>
        </div>

        {/* Terms */}
        <div className="space-y-8 leading-7 text-slate-300">

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              1. Introduction
            </h2>

            <p>
              Welcome to NavPath Academy. These Terms & Conditions govern
              your use of the NavPath Academy website, learning platform,
              mobile applications and related services.
            </p>

            <p className="mt-3">
              By accessing or using our services, you agree to comply with
              these Terms & Conditions. If you do not agree with these
              terms, please do not use the platform.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              2. User Accounts
            </h2>

            <p>
              Users may be required to create an account to access certain
              features of the platform.
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Users must provide accurate information when creating an
                account.
              </li>

              <li>
                Users are responsible for maintaining the confidentiality
                of their account credentials.
              </li>

              <li>
                Users should not share their account with unauthorized
                individuals.
              </li>

              <li>
                Users are responsible for activity performed through their
                account.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              3. Courses and Learning Content
            </h2>

            <p>
              NavPath Academy provides educational courses, video lessons,
              study materials, mock tests and other learning resources.
            </p>

            <p className="mt-3">
              Access to specific courses and materials may depend on the
              user's enrolment or purchase status.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              4. Educational Use
            </h2>

            <p>
              NavPath Academy's educational content is intended to support
              students in their learning and preparation.
            </p>

            <p className="mt-3">
              Course content should not be considered a guarantee of
              admission, examination results, employment or any particular
              academic or professional outcome.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              5. Course Enrolment and Payments
            </h2>

            <p>
              Certain courses or services may require payment before access
              is provided.
            </p>

            <p className="mt-3">
              Where applicable, payments may be processed through
              authorized third-party payment providers. Pricing,
              availability and applicable payment conditions may be
              displayed at the time of purchase.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              6. Intellectual Property
            </h2>

            <p>
              Course videos, study materials, graphics, text, logos,
              designs and other content provided by NavPath Academy are
              protected by applicable intellectual property laws.
            </p>

            <p className="mt-3">
              Users may access the content for personal educational use
              only and must not reproduce, redistribute, resell, publish
              or commercially exploit the content without authorization.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              7. Prohibited Activities
            </h2>

            <p>Users must not:</p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Attempt to gain unauthorized access to the platform.
              </li>

              <li>
                Share paid course credentials with other individuals.
              </li>

              <li>
                Copy, distribute or sell protected learning materials.
              </li>

              <li>
                Attempt to bypass platform security or content protection.
              </li>

              <li>
                Use the platform for unlawful or abusive activities.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              8. Tests and Assessments
            </h2>

            <p>
              Mock tests, assessments and results available through the
              platform are intended for educational and preparation
              purposes.
            </p>

            <p className="mt-3">
              Test scores may be stored and displayed as part of the
              student's learning progress.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              9. Platform Availability
            </h2>

            <p>
              We aim to keep NavPath Academy services available and
              reliable. However, temporary interruptions may occur because
              of maintenance, technical issues, network problems or
              circumstances beyond our reasonable control.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              10. Third-Party Services
            </h2>

            <p>
              NavPath Academy may use third-party services for
              authentication, payments, content delivery, analytics,
              notifications, hosting and other technical functions.
            </p>

            <p className="mt-3">
              Use of third-party services may also be subject to the terms
              and policies of those providers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              11. Account Suspension or Termination
            </h2>

            <p>
              NavPath Academy may restrict or suspend access to an account
              where there is a violation of these Terms & Conditions,
              misuse of the platform or activity that may compromise the
              security of users or the service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              12. Privacy
            </h2>

            <p>
              Your use of NavPath Academy is also subject to our Privacy
              Policy, which explains how personal information may be
              collected, used and protected.
            </p>

            <button
              type="button"
              onClick={() => navigate("/privacy-policy")}
              className="mt-4 font-medium text-blue-400 transition hover:text-blue-300"
            >
              View Privacy Policy →
            </button>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              13. Changes to These Terms
            </h2>

            <p>
              NavPath Academy may update these Terms & Conditions from time
              to time. Updated terms will be published on this page with a
              revised date.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              14. Contact Us
            </h2>

            <p>
              If you have questions about these Terms & Conditions, please
              contact NavPath Academy.
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

export default Terms;