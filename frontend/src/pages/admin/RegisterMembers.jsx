import { useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  UserPlus,
  User,
  Phone,
  Mail,
  LockKeyhole,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function RegisterMember() {
  const [form, setForm] = useState({
    name: "",
    middlename: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosClient.post("auth/register", form);
      setMessage(res.data.message);

      // reset form after success
      setForm({
        name: "",
        middlename: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "email/phone already exist");
    }
  };

  const fields = [
    {
      name: "name",
      label: "First Name",
      placeholder: "Enter first name",
      type: "text",
      icon: User,
    },
    {
      name: "middlename",
      label: "Middle Name",
      placeholder: "Enter middle name",
      type: "text",
      icon: User,
    },
    {
      name: "lastname",
      label: "Last Name",
      placeholder: "Enter last name",
      type: "text",
      icon: User,
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "Enter phone number",
      type: "tel",
      icon: Phone,
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "Enter email address",
      type: "email",
      icon: Mail,
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      type: "password",
      icon: LockKeyhole,
    },
  ];

  const isError =
    message.toLowerCase().includes("error") ||
    message.toLowerCase().includes("exist") ||
    message.toLowerCase().includes("failed") ||
    message.toLowerCase().includes("already");

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="mb-5 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <UserPlus size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
                Register New Member
              </h1>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Create a new member account with their basic details.
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
          <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-4 sm:px-6">
            <h2 className="text-sm font-semibold text-slate-800 sm:text-base">
              Member Information
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Enter the member's personal and account details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {fields.map((field) => {
                const Icon = field.icon;

                return (
                  <div
                    key={field.name}
                    className={
                      field.name === "password"
                        ? "sm:col-span-2"
                        : ""
                    }
                  >
                    <label
                      htmlFor={field.name}
                      className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                    >
                      {field.label}
                    </label>

                    <div className="relative">
                      <Icon
                        size={18}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        placeholder={field.placeholder}
                        value={form[field.name]}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:py-3 sm:text-base"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit */}
            <div className="mt-6 border-t border-slate-100 pt-5 sm:mt-8 sm:pt-6">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/20 sm:w-auto sm:px-6 sm:py-3 sm:text-base"
              >
                <UserPlus size={18} />
                Register Member
              </button>
            </div>
          </form>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mt-4 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm sm:mt-5 sm:px-5 sm:py-4 ${isError
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
          >
            {isError ? (
              <AlertCircle className="mt-0.5 shrink-0" size={19} />
            ) : (
              <CheckCircle2 className="mt-0.5 shrink-0" size={19} />
            )}

            <p className="font-medium leading-5">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
