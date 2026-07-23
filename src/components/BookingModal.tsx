"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/src/style.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckIcon as Check,
  SparklesIcon as Sparkles,
  CalendarIcon as Calendar,
  ClockIcon as Clock,
  WalletIcon as Wallet,
  UserIcon as User,
  MapPinIcon as MapPin,
  CameraIcon as Camera,
} from "@/components/icons-extended";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@/components/icons";
import { useT } from "@/i18n/provider";
import type { BookingServiceOption } from "@/i18n/types";

interface FormState {
  service: string;
  location: string;
  projectType: string;
  date: Date | null;
  time: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const INITIAL: FormState = {
  service: "",
  location: "",
  projectType: "",
  date: null,
  time: "",
  budget: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

const SERVICE_ICON_MAP: Record<string, typeof Camera> = {
  appartement: Camera,
  riads: Camera,
  villa: Camera,
  events: Camera,
  drone: Camera,
};

export interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function BookingModal({ open, onClose, preselectedService }: BookingModalProps) {
  const t = useT();
  const b = t.booking;
  const dateLocale = t.locale === "fr" ? "fr-FR" : "en-GB";

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const services = b.services;
  const budgets = useMemo(
    () => [
      { id: "1-2", label: "1,000–2,000 MAD", description: "Entry tier" },
      { id: "2-3", label: "2,000–3,000 MAD", description: "Mid range" },
      { id: "3-5", label: "3,000–5,000 MAD", description: "Premium" },
      { id: "5+", label: "5,000+ MAD", description: "Custom" },
    ],
    []
  );
  const times = useMemo(
    () => ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00 (Golden Hour)"],
    []
  );

  useEffect(() => {
    if (open && preselectedService) {
      setForm((f) => ({ ...f, service: preselectedService }));
    }
  }, [open, preselectedService]);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setStep(0);
        setForm(INITIAL);
        setSubmitted(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return !!form.service;
      case 1: return !!form.location;
      case 2: return !!form.date && !!form.time;
      case 3: return !!form.budget;
      case 4: return !!form.name && !!form.email && !!form.phone;
      default: return true;
    }
  };

  const next = () => {
    if (!canProceed()) return;
    setDirection(1);
    setStep((s) => Math.min(b.steps.length - 1, s + 1));
  };
  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const serviceName = selectedService ? `${selectedService.name} — ${selectedService.price}` : form.service;
    const dateStr = form.date
      ? form.date.toLocaleDateString(t.locale === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" })
      : "";
    const budgetLabel = budgets.find((b) => b.id === form.budget)?.label ?? form.budget;

    const lines = [
      "Hi Lensies! I'd like to book a shoot.",
      "",
      `Service: ${serviceName}`,
      `Location: ${form.location}`,
      `Project Type: ${form.projectType}`,
      `Date: ${dateStr} · ${form.time}`,
      `Budget: ${budgetLabel}`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/212621947493?text=${text}`, "_blank", "noopener");
  };

  const selectedService = services.find((s) => s.id === form.service);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[600] flex items-end justify-center bg-foreground/70 backdrop-blur-sm md:items-center"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[92vh] w-full max-w-[110rem] flex-col overflow-hidden rounded-t-[2.4rem] bg-white shadow-[0_4rem_8rem_-2rem_oklab(0 0 0 /0.5)] md:h-[88vh] md:rounded-[2.4rem]"
          >
            <div className="flex items-center justify-between border-b border-foreground/10 px-32 py-20 md:px-48 md:py-28">
              <div className="flex items-center gap-16">
                <span className="grid size-44 place-items-center rounded-full bg-pink text-white md:size-50">
                  <Sparkles className="size-18 md:size-20" />
                </span>
                <div className="flex flex-col">
                  <span className="font-body text-[1.1rem] font-semibold uppercase tracking-[0.2em] text-foreground/55 md:text-[1.2rem]">
                    {b.bookSessionLabel}
                  </span>
                  <span className="font-display text-[1.8rem] font-medium text-foreground md:text-[2rem]" style={{ letterSpacing: "-0.02em" }}>
                    {submitted ? b.submittedHeaderTitle : b.steps[step].title}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={b.closeLabel}
                className="grid size-40 place-items-center rounded-full text-foreground/65 transition-all duration-300 hover:bg-foreground hover:text-white md:size-50"
              >
                <CloseIcon className="size-14 md:size-16" />
              </button>
            </div>

            {!submitted ? (
              <div className="flex items-center gap-8 border-b border-foreground/10 px-32 py-12 md:px-48">
                {b.steps.map((s, i) => (
                  <div
                    key={s.title}
                    className="h-4 flex-1 overflow-hidden rounded-full bg-foreground/10"
                  >
                    <motion.div
                      className="h-full bg-pink"
                      initial={false}
                      animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    />
                  </div>
                ))}
                <span className="ml-12 shrink-0 font-body text-[1.1rem] font-semibold uppercase tracking-[0.15em] text-foreground/55">
                  {step + 1}/{b.steps.length}
                </span>
              </div>
            ) : null}

            <div className="relative flex-1 overflow-y-auto px-32 py-32 md:px-48 md:py-48">
              {submitted ? (
                <SuccessView
                  form={form}
                  service={selectedService}
                  onClose={onClose}
                  t={b}
                />
              ) : (
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * 30 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="flex h-full flex-col"
                  >
                    <h2
                      id="booking-modal-title"
                      className="mb-8 font-display text-balance text-foreground"
                      style={{
                        fontSize: "clamp(2.2rem, 3.4vw, 3.4rem)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {b.steps[step].title}
                    </h2>
                    <p className="mb-24 font-body text-[1.3rem] text-foreground/55 md:text-[1.4rem]">
                      {b.steps[step].subtitle}
                    </p>

                    {step === 0 ? (
                      <StepService form={form} update={update} services={services} />
                    ) : null}
                    {step === 1 ? (
                      <StepProject form={form} update={update} t={b} />
                    ) : null}
                    {step === 2 ? (
                      <StepDateTime form={form} update={update} t={b} times={times} dateLocale={dateLocale} />
                    ) : null}
                    {step === 3 ? (
                      <StepBudget form={form} update={update} t={b} budgets={budgets} />
                    ) : null}
                    {step === 4 ? (
                      <StepDetails form={form} update={update} t={b} />
                    ) : null}
                    {step === 5 ? (
                      <StepConfirm form={form} service={selectedService} t={b} budgets={budgets} dateLocale={dateLocale} />
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {!submitted ? (
              <div className="flex items-center justify-between gap-16 border-t border-foreground/10 bg-cream-light/50 px-32 py-20 md:px-48 md:py-24">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex items-center gap-10 rounded-full px-20 py-12 font-body text-[1.3rem] font-semibold text-foreground transition-all duration-300 hover:bg-foreground/5 disabled:opacity-30 disabled:hover:bg-transparent md:text-[1.4rem]"
                >
                  <ArrowLeftIcon className="size-12" />
                  {b.backLabel}
                </button>
                {step < b.steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canProceed()}
                    className="group inline-flex items-center gap-10 rounded-full bg-foreground px-24 py-14 font-body text-[1.3rem] font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-pink disabled:scale-100 disabled:bg-foreground/30 disabled:hover:bg-foreground/30 md:px-32 md:py-16 md:text-[1.4rem]"
                  >
                    {b.continueLabel}
                    <ArrowRightIcon className="size-12 transition-transform duration-300 group-hover:translate-x-2" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submit}
                    disabled={!canProceed()}
                    className="group inline-flex items-center gap-10 rounded-full bg-pink px-24 py-14 font-body text-[1.3rem] font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-foreground disabled:scale-100 disabled:bg-foreground/30 disabled:hover:bg-foreground/30 md:px-32 md:py-16 md:text-[1.4rem]"
                  >
                    {b.sendRequestLabel}
                    <Check className="size-14" strokeWidth={3} />
                  </button>
                )}
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function StepService({
  form,
  update,
  services,
}: {
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  services: BookingServiceOption[];
}) {
  return (
    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => {
        const isActive = form.service === s.id;
        const Icon = SERVICE_ICON_MAP[s.id] ?? Camera;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => update("service", s.id)}
            className={`group relative flex flex-col items-start gap-12 rounded-[1.6rem] border p-24 text-left transition-all duration-300 md:p-28 ${
              isActive
                ? "border-pink bg-pink-soft shadow-[0_2rem_4rem_-1rem_oklab(0.66_0.23_-0.05_/_0.35)]"
                : "border-foreground/10 bg-white hover:-translate-y-1 hover:border-foreground/30"
            }`}
          >
            {isActive ? (
              <span className="absolute top-20 right-20 grid size-32 place-items-center rounded-full bg-pink text-white">
                <Check className="size-14" strokeWidth={3} />
              </span>
            ) : null}
            <span className="grid size-48 place-items-center rounded-full bg-cream text-foreground">
              <Icon className="size-20" />
            </span>
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-[2rem] text-foreground" style={{ letterSpacing: "-0.02em" }}>
                {s.name}
              </h3>
              <p className="font-body text-[1.2rem] text-foreground/65">{s.description}</p>
            </div>
            <span className="mt-auto font-body text-[1.4rem] font-semibold text-foreground">
              {s.price}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StepProject({
  form,
  update,
  t,
}: {
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  t: ReturnType<typeof useT>["booking"];
}) {
  return (
    <div className="flex flex-col gap-32">
      <div className="flex flex-col gap-16">
        <label className="flex items-center gap-10 font-body text-[1.2rem] font-semibold uppercase tracking-[0.15em] text-foreground/65">
          <MapPin className="size-16" />
          {t.locationLabel}
        </label>
        <div className="flex flex-wrap gap-8">
          {t.locations.map((loc) => {
            const isActive = form.location === loc;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => update("location", loc)}
                className="rounded-full border px-16 py-10 font-body text-[1.3rem] font-medium transition-all duration-300 md:text-[1.4rem]"
                style={{
                  borderColor: isActive ? "var(--color-pink)" : "oklab(0 0 0 / 0.15)",
                  backgroundColor: isActive ? "var(--color-pink)" : "transparent",
                  color: isActive ? "white" : "inherit",
                }}
              >
                {loc}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-12">
        <label className="flex items-center gap-10 font-body text-[1.2rem] font-semibold uppercase tracking-[0.15em] text-foreground/65">
          <Camera className="size-16" />
          {t.projectTypeLabel}
        </label>
        <input
          type="text"
          value={form.projectType}
          onChange={(e) => update("projectType", e.target.value)}
          placeholder={t.projectTypePlaceholder}
          className="w-full rounded-[1.2rem] border border-foreground/15 bg-white px-20 py-16 font-body text-[1.4rem] text-foreground placeholder:text-foreground/40 focus:border-pink focus:outline-none md:text-[1.5rem]"
        />
      </div>
    </div>
  );
}

function StepDateTime({
  form,
  update,
  t,
  times,
  dateLocale,
}: {
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  t: ReturnType<typeof useT>["booking"];
  times: string[];
  dateLocale: string;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="grid grid-cols-1 gap-32 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <label className="mb-16 flex items-center gap-10 font-body text-[1.2rem] font-semibold uppercase tracking-[0.15em] text-foreground/65">
          <Calendar className="size-16" />
          {t.pickDateLabel}
        </label>
        <div className="booking-calendar rounded-[1.6rem] border border-foreground/10 bg-white p-16 md:p-20">
          <DayPicker
            mode="single"
            selected={form.date ?? undefined}
            onSelect={(d) => update("date", d ?? null)}
            disabled={{ before: today }}
            showOutsideDays
          />
        </div>
      </div>

      <div className="flex flex-col gap-16 lg:col-span-2">
        <label className="flex items-center gap-10 font-body text-[1.2rem] font-semibold uppercase tracking-[0.15em] text-foreground/65">
          <Clock className="size-16" />
          {t.pickTimeLabel}
        </label>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-2">
          {times.map((slot) => {
            const isActive = form.time === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => update("time", slot)}
                className="rounded-[1rem] border px-12 py-12 text-center font-body text-[1.2rem] font-medium transition-all duration-300 md:text-[1.3rem]"
                style={{
                  borderColor: isActive ? "var(--color-pink)" : "oklab(0 0 0 / 0.15)",
                  backgroundColor: isActive ? "var(--color-pink)" : "transparent",
                  color: isActive ? "white" : "inherit",
                }}
              >
                {slot}
              </button>
            );
          })}
        </div>
        {form.date ? (
          <p className="mt-12 font-body text-[1.2rem] text-foreground/55">
            {t.selectedDateTemplate.replace("{date}", form.date.toLocaleDateString(dateLocale, { weekday: "long", day: "numeric", month: "long" }))}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function StepBudget({
  form,
  update,
  t,
  budgets,
}: {
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  t: ReturnType<typeof useT>["booking"];
  budgets: { id: string; label: string; description: string }[];
}) {
  return (
    <div className="flex flex-col gap-16">
      <label className="flex items-center gap-10 font-body text-[1.2rem] font-semibold uppercase tracking-[0.15em] text-foreground/65">
        <Wallet className="size-16" />
        {t.budgetRangeLabel}
      </label>
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
        {budgets.map((b) => {
          const isActive = form.budget === b.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => update("budget", b.id)}
              className={`group flex flex-col items-start gap-8 rounded-[1.6rem] border p-24 text-left transition-all duration-300 md:p-28 ${
                isActive
                  ? "border-pink bg-pink-soft"
                  : "border-foreground/10 bg-white hover:-translate-y-1 hover:border-foreground/30"
              }`}
            >
              <span className="font-display text-[2rem] text-foreground" style={{ letterSpacing: "-0.02em" }}>
                {b.label}
              </span>
              <span className="font-body text-[1.2rem] text-foreground/65">{b.description}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-8 font-body text-[1.2rem] italic text-foreground/45">
        {t.budgetHint}
      </p>
    </div>
  );
}

function StepDetails({
  form,
  update,
  t,
}: {
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  t: ReturnType<typeof useT>["booking"];
}) {
  return (
    <div className="flex flex-col gap-24">
      <label className="flex items-center gap-10 font-body text-[1.2rem] font-semibold uppercase tracking-[0.15em] text-foreground/65">
        <User className="size-16" />
        {t.yourDetailsLabel}
      </label>
      <div className="grid grid-cols-1 gap-20 sm:grid-cols-2">
        <Field
          label={t.fullNameLabel}
          value={form.name}
          onChange={(v) => update("name", v)}
          placeholder={t.fullNamePlaceholder}
          required
        />
        <Field
          label={t.phoneLabel}
          value={form.phone}
          onChange={(v) => update("phone", v)}
          placeholder={t.phonePlaceholder}
          type="tel"
          required
        />
      </div>
      <Field
        label={t.emailLabel}
        value={form.email}
        onChange={(v) => update("email", v)}
        placeholder={t.emailPlaceholder}
        type="email"
        required
      />
      <div className="flex flex-col gap-12">
        <label className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.15em] text-foreground/65">
          {t.anythingElseLabel}
        </label>
        <textarea
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          rows={4}
          placeholder={t.notesPlaceholder}
          className="w-full resize-none rounded-[1.2rem] border border-foreground/15 bg-white px-20 py-16 font-body text-[1.4rem] text-foreground placeholder:text-foreground/40 focus:border-pink focus:outline-none md:text-[1.5rem]"
        />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-10">
      <label className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.12em] text-foreground/65">
        {label} {required ? <span className="text-pink">*</span> : null}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-[1.2rem] border border-foreground/15 bg-white px-20 py-14 font-body text-[1.4rem] text-foreground placeholder:text-foreground/40 focus:border-pink focus:outline-none md:text-[1.5rem]"
      />
    </div>
  );
}

function StepConfirm({
  form,
  service,
  t,
  budgets,
  dateLocale,
}: {
  form: FormState;
  service: BookingServiceOption | undefined;
  t: ReturnType<typeof useT>["booking"];
  budgets: { id: string; label: string; description: string }[];
  dateLocale: string;
}) {
  return (
    <div className="flex flex-col gap-24">
      <p className="font-body text-[1.4rem] text-foreground/75">
        {t.confirmIntro}
      </p>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <SummaryRow label={t.summary.service} value={service ? `${service.name} — ${service.price}` : "—"} />
        <SummaryRow label={t.summary.location} value={form.location || "—"} />
        <SummaryRow label={t.summary.project} value={form.projectType || "—"} />
        <SummaryRow
          label={t.summary.dateTime}
          value={
            form.date
              ? `${form.date.toLocaleDateString(dateLocale, { day: "numeric", month: "long", year: "numeric" })} · ${form.time}`
              : "—"
          }
        />
        <SummaryRow
          label={t.summary.budget}
          value={budgets.find((b) => b.id === form.budget)?.label || "—"}
        />
        <SummaryRow label={t.summary.name} value={form.name || "—"} />
        <SummaryRow label={t.summary.email} value={form.email || "—"} />
        <SummaryRow label={t.summary.phone} value={form.phone || "—"} />
      </div>
      {form.notes ? (
        <div className="flex flex-col gap-8 rounded-[1.2rem] bg-cream-light p-20">
          <span className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.12em] text-foreground/55">
            {t.summary.notes}
          </span>
          <p className="font-body text-[1.4rem] text-foreground/80">{form.notes}</p>
        </div>
      ) : null}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-[1rem] border border-foreground/10 bg-white p-16">
      <span className="font-body text-[1.1rem] font-semibold uppercase tracking-[0.15em] text-foreground/55">
        {label}
      </span>
      <span className="font-body text-[1.4rem] font-medium text-foreground md:text-[1.5rem]">{value}</span>
    </div>
  );
}

function SuccessView({
  form,
  service,
  onClose,
  t,
}: {
  form: FormState;
  service: BookingServiceOption | undefined;
  onClose: () => void;
  t: ReturnType<typeof useT>["booking"];
}) {
  const firstName = form.name.split(" ")[0] || t.successGenericName;
  const title = t.successTitleTemplate.replace("{firstName}", firstName);
  const body = t.successBodyTemplate
    .replace("{service}", service?.name ?? t.successFallbackService)
    .replace("{location}", form.location || t.successFallbackLocation)
    .replace("{email}", form.email || t.successFallbackEmail);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="flex h-full flex-col items-center justify-center gap-32 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 16 }}
        className="grid size-100 place-items-center rounded-full bg-pink text-white md:size-120"
      >
        <Check className="size-50 md:size-60" strokeWidth={3} />
      </motion.div>
      <div className="flex flex-col gap-16">
        <h2
          className="font-display text-balance text-foreground"
          style={{
            fontSize: "clamp(2.4rem, 4vw, 4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </h2>
        <p className="max-w-[48rem] text-pretty font-body text-[1.4rem] text-foreground/70 md:text-[1.6rem]">
          {body}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="rounded-full bg-foreground px-32 py-16 font-body text-[1.4rem] font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-pink"
      >
        {t.doneLabel}
      </button>
    </motion.div>
  );
}
