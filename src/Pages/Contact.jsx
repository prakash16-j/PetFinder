import React, { useState } from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { toast } from "react-toastify";

const defaultForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email looks invalid.";
    if (form.phone && !/^\d{10}$/.test(form.phone)) e.phone = "Phone must be 10 digits.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Message should be at least 10 characters.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      toast.warn("Please fix highlighted fields.");
      return;
    }

    setSending(true);

    try {
      const raw = localStorage.getItem("contacts");
      let arr = [];
      try {
        arr = raw ? JSON.parse(raw) : [];
      } catch {
        arr = [];
      }

      arr.unshift({
        id: Date.now(),
        ...form,
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem("contacts", JSON.stringify(arr));

      toast.success("Message sent successfully!");
      setForm(defaultForm);
      setErrors({});
    } catch (err) {
      toast.error("Failed to send message. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      <h1 className="text-4xl font-extrabold mb-6" style={{ color: "var(--brand)" }}>
        Contact Us
      </h1>
      <p className="helper mb-10 max-w-xl">
        Have a question or want to report a pet? Our team will respond within 24–48 hrs.
      </p>

      <div className="grid md:grid-cols-3 gap-8">

        {/* LEFT INFO CARD */}
        <div className="form-card rounded-2xl p-6 flex flex-col gap-5">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ background: "var(--brand)" }}>
              <span className="text-black text-xl">🐾</span>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Reach Us</h2>
              <p className="helper text-sm">We’re here to help</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MdLocationOn className="text-[var(--brand)] mt-1" size={22} />
              <div>
                <div className="text-xs helper">Address</div>
                <div className="font-medium">Community Shelter, Central Park</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MdEmail className="text-[var(--brand)] mt-1" size={22} />
              <div>
                <div className="text-xs helper">Email</div>
                <a href="mailto:help@pawfinder.com" className="hover:underline">
                  help@pawfinder.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MdPhone className="text-[var(--brand)] mt-1" size={22} />
              <div>
                <div className="text-xs helper">Phone</div>
                <a href="tel:+911234567890" className="hover:underline">
                  +91 12345 67890
                </a>
              </div>
            </div>
          </div>

          <div>
            <p className="helper text-sm mb-2">Social</p>
            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-black flex items-center 
                  justify-center cursor-pointer hover:scale-110 hover:bg-[var(--brand)] 
                  hover:text-black transition"
                >
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="md:col-span-2 form-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Send a Message</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              {/* NAME */}
              <div>
                <label className="text-sm helper">Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`mt-1 w-full px-3 py-2 rounded-lg border ${
                    errors.name ? "input-error" : ""
                  }`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-error text-xs">{errors.name}</p>}
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm helper">Email *</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`mt-1 w-full px-3 py-2 rounded-lg border ${
                    errors.email ? "input-error" : ""
                  }`}
                  placeholder="you@gmail.com"
                />
                {errors.email && <p className="text-error text-xs">{errors.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* PHONE */}
              <div>
                <label className="text-sm helper">Phone (optional)</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`mt-1 w-full px-3 py-2 rounded-lg border ${
                    errors.phone ? "input-error" : ""
                  }`}
                  placeholder="10 digit phone"
                />
                {errors.phone && <p className="text-error text-xs">{errors.phone}</p>}
              </div>

              {/* SUBJECT */}
              <div>
                <label className="text-sm helper">Subject *</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={`mt-1 w-full px-3 py-2 rounded-lg border ${
                    errors.subject ? "input-error" : ""
                  }`}
                  placeholder="Subject here"
                />
                {errors.subject && <p className="text-error text-xs">{errors.subject}</p>}
              </div>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-sm helper">Message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className={`mt-1 w-full px-3 py-2 rounded-lg border ${
                  errors.message ? "input-error" : ""
                }`}
                placeholder="Type your message..."
              />
              {errors.message && <p className="text-error text-xs">{errors.message}</p>}
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={sending}
                className="btn-primary px-4 py-2 rounded-lg shadow hover:brightness-95"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setForm(defaultForm);
                  setErrors({});
                }}
                className="px-4 py-2 rounded-lg border border-gray-500 hover:bg-[#2A2A2A]"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
