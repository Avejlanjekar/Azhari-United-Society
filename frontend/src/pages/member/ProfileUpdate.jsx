
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  User,
  Mail,
  Phone,
  LockKeyhole,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Save,
} from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosClient.get("/loan/profile");

        setProfile(res.data);

        setEmail(res.data.email || "");
        setPhone(res.data.phone || "");
      } catch (err) {
        console.error(err);
        setMessage("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      const data = {
        email,
        phone,
      };

      // Only send password when user wants to change it
      if (password.trim()) {
        data.password = password;
      }

      const res = await axiosClient.put(
        "/loan/profile",
        data
      );

      setProfile(res.data.user);
      setEmail(res.data.user.email || "");
      setPhone(res.data.user.phone || "");
      setPassword("");

      setMessage("Profile updated successfully");

    } catch (err) {
      console.error(err);

      setMessage(
        err.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // Loading State
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>

          <p className="text-sm font-medium text-slate-500">
            Loading profile...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">

      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div className="mb-8">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="mb-1 text-sm font-medium text-blue-600">
              Account Settings
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              My Profile
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Update your contact information and account password.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">

            <ShieldCheck className="h-4 w-4 text-emerald-500" />

            <span className="text-xs font-medium text-slate-600">
              Secure account
            </span>

          </div>

        </div>

      </div>

      {/* ==================================================
          STATUS MESSAGE
      ================================================== */}

      {message && (
        <div
          className={`mb-6 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${
            message === "Profile updated successfully"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : message === "Failed to load profile" ||
                message === "Failed to update profile"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-blue-200 bg-blue-50 text-blue-700"
          }`}
        >

          {message === "Profile updated successfully" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          )}

          <span>{message}</span>

        </div>
      )}

      {/* ==================================================
          PROFILE CARD
      ================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Card Header */}
        <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <User className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Profile Information
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Manage your personal account details
              </p>
            </div>

          </div>

        </div>

        {/* ==================================================
            FORM
        ================================================== */}

        <form onSubmit={handleSubmit}>

          <div className="space-y-7 p-5 sm:p-6">

            {/* ==================================================
                READ-ONLY INFORMATION
            ================================================== */}

            <div>

              <div className="mb-4">

                <h3 className="text-sm font-semibold text-slate-800">
                  Personal Information
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Your name is managed by the society and cannot be changed here.
                </p>

              </div>

              {/* Name */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Name
                </label>

                <div className="relative">

                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    value={`${profile?.name || ""} ${
                      profile?.middlename || ""
                    } ${profile?.lastname || ""}`}
                    disabled
                    className="w-full rounded-xl border border-slate-200 bg-slate-100 py-3 pl-10 pr-4 text-sm text-slate-500 outline-none"
                  />

                </div>

                <p className="mt-1.5 text-xs text-slate-400">
                  This field cannot be edited.
                </p>

              </div>

            </div>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* ==================================================
                CONTACT INFORMATION
            ================================================== */}

            <div>

              <div className="mb-4">

                <h3 className="text-sm font-semibold text-slate-800">
                  Contact Information
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Keep your contact details up to date.
                </p>

              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Email */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>

                  <div className="relative">

                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                </div>

                {/* Phone */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>

                  <div className="relative">

                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* ==================================================
                PASSWORD
            ================================================== */}

            <div>

              <div className="mb-4">

                <h3 className="text-sm font-semibold text-slate-800">
                  Password
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Change your password only when necessary.
                </p>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  New Password
                </label>

                <div className="relative">

                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank to keep current password"
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

                <p className="mt-1.5 text-xs leading-5 text-slate-400">
                  Enter a password only if you want to change your current password.
                </p>

              </div>

            </div>

          </div>

          {/* ==================================================
              FORM FOOTER
          ================================================== */}

          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <p className="text-xs leading-5 text-slate-400">
              Your updated information will be saved to your account.
            </p>

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >

              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Update Profile
                </>
              )}

            </button>

          </div>

        </form>

      </div>

      {/* ==================================================
          SECURITY INFORMATION
      ================================================== */}

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 sm:p-5">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          <ShieldCheck className="h-4 w-4" />
        </div>

        <div>

          <h3 className="text-sm font-semibold text-blue-900">
            Account Security
          </h3>

          <p className="mt-1 text-xs leading-5 text-blue-700">
            Your name is read-only. Email and phone number can be updated, while your password is changed only when you provide a new one.
          </p>

        </div>

      </div>

    </div>
  );
}

