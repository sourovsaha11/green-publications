import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdPhone, MdLocationOn, MdSend, MdMessage } from 'react-icons/md';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';

/* ── Real contact details ───────────────────────────── */
const PHONE      = '01923507973';
const FB_LINK    = 'https://www.facebook.com/share/1ETaTwSJU1/';
const ADDRESS    = '40/2 Purana Paltan, Level-3, Dhaka-1000, Bangladesh';
const WHATSAPP   = `https://wa.me/88${PHONE}`;

const ContactItem = ({ icon, label, children }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-green-accent/10 border border-green-accent/20
                    flex items-center justify-center text-green-accent text-xl">
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">{label}</p>
      {children}
    </div>
  </div>
);

const Contact = () => {
  const [form, setForm]         = useState({ name: '', phone: '', message: '' });
  const [submitting, setSubmit] = useState(false);

  const handleChange  = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    setTimeout(() => {
      toast.success('Message sent! We will get back to you shortly.');
      setForm({ name: '', phone: '', message: '' });
      setSubmit(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-bg-primary font-body">

      {/* ── Hero banner ─────────────────────────────── */}
      <section className="relative pt-32 pb-16 border-b border-border-dark
                           bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(46,204,113,0.07)_0%,transparent_70%)]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-accent mb-3">
            Get In Touch
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-text-main leading-tight mb-4">
            Contact <span className="text-green-accent">Us</span>
          </h1>
          <p className="text-text-sub text-lg max-w-xl leading-relaxed">
            Have a question about our books or need a recommendation?
            We're just a call or message away.
          </p>
        </div>
      </section>

      {/* ── Main content ────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* ── Left: info panel ──────────────────── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Contact cards */}
            <div>
              <h2 className="font-display text-2xl font-bold text-text-main mb-8">
                Reach Out To Us
              </h2>
              <div className="space-y-7">

                <ContactItem icon={<MdPhone />} label="Phone / WhatsApp">
                  <a href={`tel:${PHONE}`}
                     className="text-text-main font-semibold text-lg hover:text-green-accent transition-colors">
                    {PHONE}
                  </a>
                </ContactItem>

                <ContactItem icon={<FaFacebook />} label="Facebook Page">
                  <a href={FB_LINK} target="_blank" rel="noreferrer"
                     className="text-text-sub hover:text-green-accent transition-colors text-sm font-medium
                                flex items-center gap-1.5">
                    Green Publications
                    <span className="text-[10px] bg-green-accent/10 text-green-accent px-2 py-0.5 rounded-full border border-green-accent/20">
                      Official Page
                    </span>
                  </a>
                </ContactItem>

                <ContactItem icon={<MdLocationOn />} label="Address">
                  <span className="text-text-sub text-sm leading-relaxed">{ADDRESS}</span>
                </ContactItem>

              </div>
            </div>

            {/* Quick action buttons */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
                Quick Actions
              </p>
              <a href={`tel:${PHONE}`}
                 className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl
                            bg-green-accent text-black font-semibold text-sm
                            hover:bg-green-dark transition-all hover:-translate-y-0.5
                            hover:shadow-green-glow">
                <MdPhone className="text-lg" />
                Call Us Now
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer"
                 className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl
                            bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/25
                            font-semibold text-sm hover:bg-[#25D366]/20
                            transition-all hover:-translate-y-0.5">
                <FaWhatsapp className="text-lg" />
                WhatsApp Us
              </a>
              <a href={FB_LINK} target="_blank" rel="noreferrer"
                 className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl
                            bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/25
                            font-semibold text-sm hover:bg-[#1877F2]/20
                            transition-all hover:-translate-y-0.5">
                <FaFacebook className="text-lg" />
                Message on Facebook
              </a>
            </div>

            {/* Hours */}
            <div className="p-5 rounded-2xl bg-bg-card border border-border-dark">
              <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
                Business Hours
              </p>
              {[
                ['Saturday – Thursday', '9:00 AM – 8:00 PM'],
                ['Friday',              'Closed'],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between items-center py-2.5
                                          border-b border-border-dark last:border-0">
                  <span className="text-sm text-text-sub">{day}</span>
                  <span className={`text-sm font-semibold ${time === 'Closed' ? 'text-red-400' : 'text-green-accent'}`}>
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: message form ────────────────── */}
          <div className="lg:col-span-3 bg-bg-card border border-border-dark rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-green-accent/10 border border-green-accent/20
                              flex items-center justify-center text-green-accent">
                <MdMessage />
              </div>
              <h2 className="font-display text-2xl font-bold text-text-main">Send a Message</h2>
            </div>
            <p className="text-text-sub text-sm mb-8">
              Fill in the form and we'll get back to you within a few hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-sub mb-2">
                  Your Name <span className="text-green-accent">*</span>
                </label>
                <input
                  name="name" value={form.name} onChange={handleChange}
                  placeholder="Full name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-dark
                             text-text-main text-sm placeholder-text-muted
                             focus:outline-none focus:border-green-accent
                             focus:ring-2 focus:ring-green-accent/10 transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-sub mb-2">
                  Phone Number <span className="text-green-accent">*</span>
                </label>
                <input
                  name="phone" value={form.phone} onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-dark
                             text-text-main text-sm placeholder-text-muted
                             focus:outline-none focus:border-green-accent
                             focus:ring-2 focus:ring-green-accent/10 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-sub mb-2">
                  Message <span className="text-green-accent">*</span>
                </label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  rows={5}
                  placeholder="Tell us what you need — book recommendation, order query, etc."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-dark
                             text-text-main text-sm placeholder-text-muted resize-none
                             focus:outline-none focus:border-green-accent
                             focus:ring-2 focus:ring-green-accent/10 transition-all"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2.5
                           px-6 py-4 rounded-xl bg-green-accent text-black
                           font-bold text-sm tracking-wide
                           hover:bg-green-dark transition-all hover:-translate-y-0.5
                           hover:shadow-green-glow disabled:opacity-60 disabled:cursor-not-allowed
                           disabled:hover:translate-y-0">
                {submitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <><MdSend className="text-base" /> Send Message</>
                )}
              </button>

              <p className="text-center text-xs text-text-muted pt-1">
                Or reach us directly at{' '}
                <a href={`tel:${PHONE}`} className="text-green-accent hover:underline font-medium">
                  {PHONE}
                </a>
              </p>
            </form>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Contact;
