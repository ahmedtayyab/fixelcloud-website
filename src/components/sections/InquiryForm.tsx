import { useState, type FormEvent } from "react";
import { site } from "../../config/site";
import { serviceGroups } from "../../data/navigation";
import { Button } from "../ui/Button";

export interface InquiryValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  service: string;
  budget: string;
  message: string;
  smsConsent: boolean;
  privacyConsent: boolean;
}

const empty: InquiryValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  service: "",
  budget: "",
  message: "",
  smsConsent: false,
  privacyConsent: false,
};

const services = serviceGroups.flatMap((group) => group.items.map((item) => item.label));

const fieldClass =
  "mt-2 w-full border border-transparent bg-field px-4 py-3.5 text-base leading-6 text-ink transition-colors placeholder:text-muted/80 focus:border-brand focus:bg-white focus:outline-none";

export function InquiryForm({ intent }: { intent: "contact" | "estimate" }) {
  const [values, setValues] = useState<InquiryValues>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");

  const update = (key: keyof InquiryValues, value: string | boolean) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    const next: Partial<Record<keyof InquiryValues, string>> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email address.";
    if (values.message.trim().length < 12) next.message = "Add a few more details so we can respond usefully.";
    if (!values.privacyConsent) next.privacyConsent = "Please confirm before sending.";
    if (intent === "estimate" && !values.service) next.service = "Choose a service.";
    return next;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    const payload = { intent, ...values, submittedAt: new Date().toISOString() };
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

    if (endpoint) {
      setStatus("sending");
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Request failed");
        setStatus("sent");
        setValues(empty);
      } catch {
        setStatus("error");
      }
      return;
    }

    const body = [
      `Name: ${`${values.firstName} ${values.lastName}`.trim() || "—"}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone || "—"}`,
      `Company: ${values.company || "—"}`,
      `Service: ${values.service || "—"}`,
      `Budget: ${values.budget || "—"}`,
      `Text message consent: ${values.smsConsent ? "yes" : "no"}`,
      "",
      values.message,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      values.subject || (intent === "estimate" ? "Project estimate" : "Website enquiry"),
    )}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
  };

  const error = (name: keyof InquiryValues) =>
    errors[name] ? (
      <span id={`${name}-error`} className="mt-1 block text-sm text-red-700">
        {errors[name]}
      </span>
    ) : null;

  const field = (name: keyof InquiryValues, label: string, placeholder: string, type = "text", required = false) => (
    <label className="block text-sm font-semibold text-ink">
      {label}
      {required ? <span className="text-red-600"> *</span> : null}
      <input
        className={fieldClass}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        value={String(values[name])}
        onChange={(event) => update(name, event.target.value)}
      />
      {error(name)}
    </label>
  );

  return (
    <form className="grid gap-5" onSubmit={onSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("firstName", "First Name", "First Name")}
        {field("lastName", "Last Name", "Last Name")}
      </div>
      {intent === "estimate" ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            {field("email", "Email", "Email Address", "email", true)}
            {field("phone", "Phone", "Phone Number", "tel")}
          </div>
          {field("company", "Company", "Company Name")}
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-ink">
              Service<span className="text-red-600"> *</span>
              <select
                className={fieldClass}
                name="service"
                value={values.service}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? "service-error" : undefined}
                onChange={(event) => update("service", event.target.value)}
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {error("service")}
            </label>
            {field("budget", "Approximate budget", "e.g. $10,000")}
          </div>
        </>
      ) : (
        <>
          {field("email", "Email", "Email Address", "email", true)}
          {field("subject", "Subject", "Subject")}
        </>
      )}
      <label className="block text-sm font-semibold text-ink">
        Your Message<span className="text-red-600"> *</span>
        <textarea
          className={`${fieldClass} min-h-[150px]`}
          name="message"
          placeholder="Your Message"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
        />
        {error("message")}
      </label>
      <label className="flex items-start gap-3 text-sm leading-6">
        <input
          className="mt-1 accent-brand"
          type="checkbox"
          checked={values.smsConsent}
          onChange={(event) => update("smsConsent", event.target.checked)}
        />
        <span>
          I consent to receive text messages. My mobile number will not be shared with third parties or affiliates for
          marketing purposes. All opt-in details are kept private and handled securely.
        </span>
      </label>
      <div>
        <label className="flex items-start gap-3 text-sm leading-6">
          <input
            className="mt-1 accent-brand"
            type="checkbox"
            checked={values.privacyConsent}
            aria-invalid={Boolean(errors.privacyConsent)}
            aria-describedby={errors.privacyConsent ? "privacyConsent-error" : undefined}
            onChange={(event) => update("privacyConsent", event.target.checked)}
          />
          <span>I acknowledge that my personal information will be handled securely and in accordance with our privacy practices.</span>
        </label>
        {error("privacyConsent")}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : intent === "estimate" ? "Request estimate" : "Submit form"}
        </Button>
      </div>
      <div aria-live="polite" className="text-sm leading-6">
        {status === "sent" ? <p className="text-brand-dark">Message sent. We will reply within one business day.</p> : null}
        {status === "mailto" ? (
          <p>Your email app should now open with this message addressed to {site.email}. Press send there to reach the team.</p>
        ) : null}
        {status === "error" ? (
          <p className="text-red-700">The message could not be delivered. Please try again or email {site.email}.</p>
        ) : null}
      </div>
    </form>
  );
}
