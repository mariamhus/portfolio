import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Check, Copy, Mail, RotateCcw, Send } from "lucide-react";
import { profile } from "../data/profile";

type Field = "name" | "email" | "subject" | "message";
type Values = Record<Field, string>;
type Status = "editing" | "sent";

const EMPTY: Values = { name: "", email: "", subject: "", message: "" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// mailto links get unreliable past about 2,000 characters, so the message is capped below that.
const MESSAGE_MAX = 1500;

function validate(values: Values): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  if (!values.name.trim()) errors.name = "Please tell me your name.";
  if (!EMAIL.test(values.email.trim())) errors.email = "That email doesn't look quite right.";
  if (values.message.trim().length < 10) errors.message = "Write a little more, at least 10 characters.";
  return errors;
}

function mailto(values: Values) {
  const subject = values.subject.trim() || `Hello from ${values.name.trim()}`;
  const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`;
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// The message form: it checks the fields, then opens the visitor's email app with the message
// addressed to me and filled in.
export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("editing");
  const [copied, setCopied] = useState(false);
  const fields = useRef<Partial<Record<Field, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  const errors = validate(values);
  const shown = (field: Field) => (submitted || touched[field] ? errors[field] : undefined);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  function onChange(field: Field) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
    };
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    const invalid = (["name", "email", "message"] as Field[]).find((field) => errors[field]);
    if (invalid) {
      fields.current[invalid]?.focus();
      return;
    }
    window.location.href = mailto(values);
    setStatus("sent");
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(`To: ${profile.email}\nSubject: ${values.subject.trim() || `Hello from ${values.name.trim()}`}\n\n${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`);
      setCopied(true);
    } catch {
      // Clipboard can be blocked; the email link is still there.
    }
  }

  function reset() {
    setValues(EMPTY);
    setTouched({});
    setSubmitted(false);
    setStatus("editing");
  }

  const fieldProps = (field: Field) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange: onChange(field),
    onBlur: () => setTouched((current) => ({ ...current, [field]: true })),
    "aria-invalid": shown(field) ? true : undefined,
    "aria-describedby": shown(field) ? `contact-${field}-error` : undefined,
    className: "field",
  });

  return status === "sent" ? (
      <div className="contact-card" role="status">
        <p className="flex items-center gap-2 font-display text-2xl font-bold">
          <Check aria-hidden="true" className="size-6 text-accent" />
          Message ready
        </p>
        <p className="mt-3 text-muted">
          Your email app should have opened with everything filled in, so just press send there. Nothing opened? Copy
          the message and send it to {profile.email}.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => void copyMessage()} className="button-primary" aria-live="polite">
            {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
            {copied ? "Copied" : "Copy message"}
          </button>
          <a href={mailto(values)} className="button-secondary">
            <Mail aria-hidden="true" className="size-4" />
            Open email again
          </a>
          <button type="button" onClick={reset} className="button-secondary">
            <RotateCcw aria-hidden="true" className="size-4" />
            Write another
          </button>
        </div>
      </div>
    ) : (
      <form noValidate onSubmit={onSubmit} className="contact-card grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="field-label">
              Name
            </label>
            <input {...fieldProps("name")} ref={(element) => { fields.current.name = element; }} autoComplete="name" />
            {shown("name") && <p id="contact-name-error" className="field-error">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="contact-email" className="field-label">
              Email
            </label>
            <input {...fieldProps("email")} ref={(element) => { fields.current.email = element; }} type="email" autoComplete="email" inputMode="email" />
            {shown("email") && <p id="contact-email-error" className="field-error">{errors.email}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="contact-subject" className="field-label">
            Subject <span className="font-normal text-muted">(optional)</span>
          </label>
          <input {...fieldProps("subject")} ref={(element) => { fields.current.subject = element; }} maxLength={120} />
        </div>
        <div>
          <label htmlFor="contact-message" className="field-label">
            Message
          </label>
          <textarea {...fieldProps("message")} ref={(element) => { fields.current.message = element; }} rows={6} maxLength={MESSAGE_MAX} />
          <div className="mt-1.5 flex justify-between gap-4 text-sm">
            {shown("message") ? <p id="contact-message-error" className="field-error mt-0">{errors.message}</p> : <span />}
            <span className="text-muted tabular-nums">
              {values.message.length} / {MESSAGE_MAX}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="button-primary">
            <Send aria-hidden="true" className="size-4" />
            Send message
          </button>
          <p className="text-sm text-muted">Opens in your email app.</p>
        </div>
      </form>
    );
}
