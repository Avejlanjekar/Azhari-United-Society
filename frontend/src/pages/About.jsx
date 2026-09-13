
import React from "react";
import {
  Building2,
  Target,
  WalletCards,
  Landmark,
  BarChart3,
  Bell,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: WalletCards,
      title: "Deposits Management",
      description:
        "Track monthly deposits with complete contribution history.",
    },
    {
      icon: Landmark,
      title: "Loan System",
      description:
        "Apply, approve, and manage loans with clear eligibility rules.",
    },
    {
      icon: BarChart3,
      title: "Fines & Repayments",
      description:
        "Automatic fine calculations and repayment tracking.",
    },
    {
      icon: Bell,
      title: "Notifications",
      description:
        "Get updates when your deposits, loans, or repayments are approved or rejected.",
    },
    {
      icon: Users,
      title: "Member Dashboard",
      description:
        "Every member can view their contributions, loans, and activities.",
    },
    {
      icon: ShieldCheck,
      title: "Transparency First",
      description:
        "Ensuring all financial activities are clear and accessible.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:px-8 lg:pb-14 lg:pt-12">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 sm:text-sm">
              <Building2 size={15} />
              Azhari United Society
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              About Azhar United Society
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
              A digital platform built to make society management
              <span className="font-semibold text-blue-600">
                {" "}
                simpler, faster, and more transparent.
              </span>
            </p>

            {/* Intro */}
            <div className="mt-7 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:mt-8 sm:p-6">
              <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                Welcome to the{" "}
                <span className="font-semibold text-slate-900">
                  Azhari United Society App
                </span>
                , a digital platform designed to make society management{" "}
                <span className="font-semibold text-emerald-600">
                  simpler, faster, and transparent
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* Mission */}
        <section className="mb-8 sm:mb-10">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[220px_1fr]">
              {/* Mission Label */}
              <div className="flex items-center border-b border-slate-200 bg-blue-600 p-5 text-white lg:border-b-0 lg:border-r lg:p-7">
                <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                    <Target size={23} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-blue-100">
                      Our Purpose
                    </p>
                    <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                      Our Mission
                    </h2>
                  </div>
                </div>
              </div>

              {/* Mission Content */}
              <div className="p-5 sm:p-7 lg:p-8">
                <p className="max-w-4xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
                  To empower our society members with{" "}
                  <span className="font-semibold text-slate-900">
                    financial transparency
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-slate-900">
                    easy access
                  </span>{" "}
                  to their records, while helping the management committee run
                  operations smoothly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-8 grid grid-cols-2 gap-3 sm:mb-10 sm:grid-cols-4 sm:gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <WalletCards className="text-blue-600" size={21} />
            <p className="mt-3 text-sm font-semibold text-slate-900">
              Deposits
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Contribution tracking
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <Landmark className="text-blue-600" size={21} />
            <p className="mt-3 text-sm font-semibold text-slate-900">
              Loans
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Application management
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <BarChart3 className="text-emerald-600" size={21} />
            <p className="mt-3 text-sm font-semibold text-slate-900">
              Repayments
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Financial tracking
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <ShieldCheck className="text-emerald-600" size={21} />
            <p className="mt-3 text-sm font-semibold text-slate-900">
              Transparency
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Clear financial records
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-8 sm:mb-10">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:mb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Platform Capabilities
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Key Features
              </h2>

              <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
                Everything needed to simplify society operations and improve
                member access.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    <ArrowRight
                      size={18}
                      className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500"
                    />
                  </div>

                  <h3 className="mt-5 text-base font-bold text-slate-900 sm:text-lg">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

      
        <section className="mb-8 sm:mb-10">
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 sm:p-7 lg:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                <Users size={23} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                  Community Focused
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-950 sm:text-2xl">
                  Why Azhari United Society App?
                </h2>

                <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  We believe in{" "}
                  <span className="font-semibold text-slate-900">
                    community-driven growth
                  </span>
                  . This app helps members stay informed, ensures
                  accountability, and reduces manual work for the committee.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section>
          <div className="rounded-2xl bg-slate-900 px-5 py-8 text-center sm:px-8 sm:py-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <CheckCircle2 size={25} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-white sm:text-2xl">
              Building a Stronger Community
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Together, we are building a stronger and more connected
              community through transparency, accessibility, and efficient
              management.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
