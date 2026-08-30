import {
  ArrowLeft,
  Bell,
  BookOpen,
  Camera,
  CheckCircle2,
  Mail,
  Phone,
  Save,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type NavPathUser = {
  name: string;
  email: string;
  isLoggedIn: boolean;
  phone?: string;
};

function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);

  // Load the currently logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("navpath-user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const user: NavPathUser = JSON.parse(storedUser);

      if (!user.isLoggedIn) {
        navigate("/login");
        return;
      }

      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    } catch {
      localStorage.removeItem("navpath-user");
      navigate("/login");
    }
  }, [navigate]);

  const handleSave = () => {
    const storedUser = localStorage.getItem("navpath-user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const existingUser: NavPathUser = JSON.parse(storedUser);

      const updatedUser: NavPathUser = {
        ...existingUser,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        isLoggedIn: true,
      };

      localStorage.setItem(
        "navpath-user",
        JSON.stringify(updatedUser),
      );

      setName(updatedUser.name);
      setEmail(updatedUser.email);
      setPhone(updatedUser.phone || "");

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch {
      navigate("/login");
    }
  };

  const avatarLetter = name.trim()
    ? name.trim().charAt(0).toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              N
            </div>

            <div className="text-left">
              <p className="font-bold">NAVPATH</p>

              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                Academy
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Dashboard
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* TITLE */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Account
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your personal information and learning preferences.
          </p>
        </div>

        {/* PROFILE CARD */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* COVER */}
          <div className="h-32 bg-gradient-to-r from-slate-950 via-blue-950 to-blue-700" />

          <div className="px-6 pb-8 sm:px-8">
            {/* AVATAR */}
            <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-blue-100 text-3xl font-bold text-blue-600 shadow-lg">
                  {avatarLetter}

                  <button
                    onClick={() =>
                      alert("Profile photo upload coming soon")
                    }
                    className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-md hover:bg-blue-700"
                  >
                    <Camera size={16} />
                  </button>
                </div>

                <div className="pb-1">
                  <h2 className="text-xl font-bold">
                    {name || "Student"}
                  </h2>

                  <p className="text-sm text-slate-500">
                    NavPath Academy Student
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2 text-sm font-semibold text-green-600">
                <CheckCircle2 size={17} />
                Active Student
              </div>
            </div>

            {/* FORM */}
            <div className="mt-10">
              <h3 className="text-lg font-bold">
                Personal Information
              </h3>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {/* NAME */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      value={phone}
                      onChange={(event) =>
                        setPhone(event.target.value)
                      }
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* PRIMARY GOAL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Primary Goal
                  </label>

                  <div className="relative">
                    <BookOpen
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10">
                      <option>IMU CET</option>
                      <option>DNS</option>
                      <option>Merchant Navy</option>
                      <option>IMU CET Repeater</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* NOTIFICATIONS */}
            <div className="mt-10 border-t border-slate-100 pt-8">
              <h3 className="text-lg font-bold">
                Notification Preferences
              </h3>

              <div className="mt-5 rounded-2xl bg-slate-50 p-5">
                <label className="flex cursor-pointer items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Bell size={20} />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Learning Notifications
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Receive reminders about lessons, tests and
                        important course updates.
                      </p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 accent-blue-600"
                  />
                </label>
              </div>
            </div>

            {/* SAVE */}
            <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm">
                {saved && (
                  <span className="flex items-center gap-2 font-medium text-green-600">
                    <CheckCircle2 size={17} />
                    Profile updated successfully
                  </span>
                )}
              </div>

              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;