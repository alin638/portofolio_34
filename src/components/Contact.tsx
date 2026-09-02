import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  MapPin,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Clock,
  Truck,
  Phone,
  MessageSquare,
  Instagram,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const socialIconMap: Record<string, typeof Truck> = {
  Truck,
  Phone,
  Mail,
  Instagram,
  MessageSquare
};

export default function Contact() {
  const { personalInfo, socialLinks } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap / Nama Perusahaan wajib diisi.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nama minimal 2 karakter.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Alamat email wajib diisi.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format email tidak valid.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Rute / Jenis Muatan wajib diisi.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Detail muatan wajib diisi.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Pesan minimal 10 karakter.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 6000);
    }, 1200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0A0A0F]">
      {/* Background accents */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[#7C3AED]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-10 w-[400px] h-[400px] bg-[#06B6D4]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15151D] border border-white/10 text-xs font-semibold text-[#06B6D4] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>ORDER MUATAN & DISPATCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Hubungi <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#06B6D4] to-[#7C3AED]">Driver</span>
          </h2>
          <p className="mt-3 text-base text-[#94A3B8] max-w-xl">
            Siap melayani kebutuhan transportasi muatan cair, sewa armada Truk Tangki (16KL - 40KL), atau kontrak ekspedisi tangki CPO, BBM & Kimia industri.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Direct Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Distribusi Aman & <span className="text-[#06B6D4]">Tepat Waktu</span>
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Tersedia untuk trayek reguler, charter truk tangki per rit, dan kebutuhan distribusi muatan cair prioritas ke seluruh Indonesia.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-3 pt-2">
              
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/6285732033278?text=Halo%20Mas%20Alin,%20saya%20ingin%20konsultasi%20pengiriman%20kargo%20truk%20tangki"
                target="_blank"
                rel="noreferrer"
                id="contact-whatsapp-direct-card"
                className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between hover:border-emerald-500/60 hover:bg-emerald-950/60 transition-all group shadow-lg shadow-emerald-950/20"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs text-emerald-300 block font-medium">WhatsApp / Telepon Langsung</span>
                    <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors block">
                      {personalInfo.phone || '085732033278'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                  <span>Chat WA</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>

              {/* Email Card with Copy button */}
              <div className="p-4 rounded-2xl bg-[#111118] border border-white/10 flex items-center justify-between hover:border-white/20 transition-colors">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center text-[#06B6D4] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs text-[#94A3B8] block">Email Korespondensi</span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm font-semibold text-white hover:text-[#06B6D4] transition-colors truncate block"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  id="contact-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors"
                  title="Copy email address"
                  aria-label="Copy email"
                >
                  {emailCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-[#111118] border border-white/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/20 border border-[#06B6D4]/30 flex items-center justify-center text-[#06B6D4] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#94A3B8] block">Homebase & Pool Armada</span>
                  <span className="text-sm font-semibold text-white">{personalInfo.location}</span>
                </div>
              </div>

              {/* Response Time Card */}
              <div className="p-4 rounded-2xl bg-[#111118] border border-white/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#94A3B8] block">Respon Dispatcher & Driver</span>
                  <span className="text-sm font-semibold text-emerald-400">Siap standby & respon cepat 24 Jam</span>
                </div>
              </div>

            </div>

            {/* Social / Dispatch Channels */}
            <div className="pt-4 border-t border-white/5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] block mb-3">
                Kanal Kontak & Dispatching
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = socialIconMap[social.icon] || Phone;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      id={`contact-social-${social.platform.toLowerCase()}`}
                      className="p-3 rounded-xl bg-[#111118] border border-white/5 hover:border-white/15 text-slate-300 hover:text-white flex items-center justify-between text-xs font-medium transition-all group"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#06B6D4] group-hover:text-[#7C3AED] transition-colors" />
                        <span>{social.platform}</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  );
                })}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-[#111118] border border-white/10 shadow-2xl shadow-black/50 relative">
              
              <h4 className="text-xl font-bold text-white mb-1">Form Pemesanan & Pertanyaan Kargo</h4>
              <p className="text-xs text-[#94A3B8] mb-6">
                Lengkapi rute asal, tujuan, jenis kargo, dan tanggal muat untuk penawaran tarif terbaik.
              </p>

              {/* Toast Success Message */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="mb-6 p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 flex items-start gap-3 shadow-lg shadow-emerald-950/50"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-bold text-white">Pesanan Terkirim!</h5>
                      <p className="text-xs text-emerald-300 mt-0.5">
                        Terima kasih. Permintaan trayek/muatan Anda telah diterima dan akan segera dihubungi oleh pengemudi/dispatch.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
                {/* Name & Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Nama / Nama Perusahaan <span className="text-[#06B6D4]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. PT Logistik Jaya Abadi"
                      className={`w-full px-4 py-3 rounded-xl bg-[#15151D] border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                        errors.name
                          ? 'border-rose-500/70 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-white/10 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Alamat Email <span className="text-[#06B6D4]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="dispatch@perusahaan.co.id"
                      className={`w-full px-4 py-3 rounded-xl bg-[#15151D] border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                        errors.email
                          ? 'border-rose-500/70 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-white/10 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                </div>

                {/* Subject / Route Topic */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Rute & Tipe Armada <span className="text-[#06B6D4]">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Surabaya - Semarang (Tangki CPO 24.000L)"
                    className={`w-full px-4 py-3 rounded-xl bg-[#15151D] border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.subject
                        ? 'border-rose-500/70 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-white/10 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Detail Muatan & Jadwal Muat <span className="text-[#06B6D4]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Jelaskan estimasi berat muatan, lokasi muat/bongkar, dan jadwal pengiriman yang diinginkan..."
                    className={`w-full px-4 py-3 rounded-xl bg-[#15151D] border text-sm text-white placeholder-slate-500 focus:outline-none transition-all resize-none ${
                      errors.message
                        ? 'border-rose-500/70 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-white/10 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-semibold text-sm shadow-lg shadow-[#7C3AED]/25 hover:shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Mengirim Permintaan Muatan...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Kirim Permintaan Trayek / Muatan</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
