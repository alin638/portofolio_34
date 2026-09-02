import { useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  MessageSquare,
  Truck,
  ShieldCheck,
  Award,
  CheckCircle2,
  Zap,
  Phone,
  Mail,
  Instagram,
  Navigation,
  Compass,
  Gauge,
  Sliders,
  MapPin,
  Clock,
  Camera,
  Upload
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import PhotoUploadModal from './PhotoUploadModal';

const iconMap: Record<string, typeof Truck> = {
  Truck,
  Phone,
  Mail,
  Instagram,
  MessageSquare
};

export default function Hero() {
  const { personalInfo, setPersonalInfo, socialLinks, setIsAdminOpen } = usePortfolio();
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 flex items-center overflow-hidden"
    >
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#7C3AED]/15 rounded-full blur-[130px] pointer-events-none -z-10 animate-glow" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#06B6D4]/12 rounded-full blur-[110px] pointer-events-none -z-10 animate-float" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-[#6366F1]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-10 opacity-60" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15151D] border border-white/10 text-xs font-medium text-[#F8FAFC] mb-6 shadow-sm shadow-emerald-500/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[#94A3B8]">Status:</span>
              <span className="text-emerald-400 font-semibold">{personalInfo.availability}</span>
            </motion.div>

            {/* Main Greeting & Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Hi, Saya{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#06B6D4] to-[#7C3AED]">
                  {personalInfo.name}
                </span>
              </h1>
              
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#06B6D4] tracking-tight">
                {personalInfo.role}
              </h2>
            </motion.div>

            {/* Bio paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 text-base sm:text-lg text-[#94A3B8] max-w-2xl leading-relaxed"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Key Qualifications pill chips */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                SIM BII Umum & Sertifikasi B3
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] text-xs font-semibold">
                <Navigation className="w-3.5 h-3.5" />
                Trayek Tangki Trans-Jawa & Sumatra
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-purple-300 text-xs font-semibold">
                <Gauge className="w-3.5 h-3.5" />
                500.000+ KM Zero Spill & Accident
              </span>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#projects"
                id="hero-cta-projects"
                onClick={(e) => handleScrollTo(e, 'projects')}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-semibold text-sm sm:text-base shadow-xl shadow-[#7C3AED]/25 hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Lihat Riwayat Trayek & Ekspedisi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                id="hero-cta-contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#15151D] border border-white/10 hover:border-white/20 text-[#F8FAFC] font-semibold text-sm sm:text-base hover:bg-[#1c1c27] active:scale-[0.98] transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-[#06B6D4]" />
                <span>Hubungi / Order Muatan</span>
              </a>
            </motion.div>

            {/* Social media / Contact links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 pt-8 border-t border-white/5 flex items-center gap-4 w-full"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                Kontak Cepat & Dispatch:
              </span>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = iconMap[social.icon] || Mail;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      id={`hero-social-${social.platform.toLowerCase()}`}
                      aria-label={social.platform}
                      className="p-2.5 rounded-xl bg-[#15151D] border border-white/10 text-[#94A3B8] hover:text-[#06B6D4] hover:border-[#06B6D4]/40 hover:bg-[#1E1E2A] transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual, Avatar & Floating Interactive Logistics Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0"
          >
            {/* Outer Glow Ring */}
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#7C3AED]/30 via-transparent to-[#06B6D4]/30 p-[1.5px] -z-10 animate-pulseGlow" />

              {/* Main Avatar Card Frame */}
              <div className="relative w-[300px] sm:w-[340px] aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-[#1E1E2A] to-[#111118] border border-white/10 shadow-2xl shadow-black/80 flex flex-col">
                
                {/* Window header decor */}
                <div className="px-4 py-3 bg-[#15151D] border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <button
                    onClick={() => setIsAdminOpen(true)}
                    className="flex items-center gap-1.5 text-[11px] font-mono text-[#94A3B8] hover:text-[#06B6D4] transition-colors"
                    title="Edit Profil & Data Driver"
                  >
                    <Sliders className="w-3 h-3 text-[#7C3AED]" />
                    <span>driver_profile.json</span>
                  </button>
                </div>

                {/* Profile Portrait / Illustrated Image */}
                <div className="relative flex-1 bg-[#0D0D14] overflow-hidden group">
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-80" />
                  
                  {/* Quick Change Photo Manual Button on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <button
                      id="hero-change-photo-btn"
                      onClick={() => setIsPhotoModalOpen(true)}
                      className="px-4 py-2 rounded-full bg-white text-[#0A0A0F] font-semibold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all"
                      title="Ganti Foto Manual dari HP/Laptop"
                    >
                      <Camera className="w-4 h-4 text-[#7C3AED]" />
                      <span>Ubah Foto Manual</span>
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="glass-panel p-3 rounded-xl border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-white">{personalInfo.name}</p>
                          <p className="text-[11px] text-[#06B6D4] font-medium">Tangki CPO, BBM & Hazmat Pro</p>
                        </div>
                        <button
                          onClick={() => setIsPhotoModalOpen(true)}
                          className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 hover:bg-[#7C3AED]/40 border border-[#7C3AED]/40 flex items-center justify-center transition-colors"
                          title="Ganti Foto Manual"
                        >
                          <Camera className="w-4 h-4 text-[#06B6D4]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating UI Card 1: Safety & Zero Accident */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 sm:-left-8 glass-panel px-4 py-3 rounded-2xl border border-white/10 shadow-xl shadow-black/50 z-20 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-white">Zero Accident & Spill</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-[#94A3B8] font-medium">Kepatuhan K3 & B3 Hazmat</span>
                </div>
              </motion.div>

              {/* Floating UI Card 2: Active License & Route Snapshot */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -right-4 sm:-right-6 glass-panel p-3.5 rounded-2xl border border-white/10 shadow-xl shadow-black/50 z-20 hidden sm:block max-w-[220px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#06B6D4]" />
                  <span className="text-[10px] font-mono text-[#94A3B8]">Kualifikasi Tangki</span>
                </div>
                <div className="space-y-1 font-mono text-[10px]">
                  <div className="text-purple-400 font-bold">SIM BII & B3: <span className="text-emerald-400">Aktif</span></div>
                  <div className="text-slate-300">Tangki: <span className="text-cyan-400">16KL - 40KL</span></div>
                  <div className="text-slate-300">Muatan: <span className="text-purple-300">CPO, BBM, Kimia</span></div>
                </div>
              </motion.div>

              {/* Floating Badge 3: On-Time Delivery */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute top-1/2 -right-8 glass-panel px-3.5 py-2 rounded-xl border border-white/10 shadow-xl shadow-black/50 z-20 hidden lg:flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-lg bg-[#7C3AED]/20 flex items-center justify-center text-[#06B6D4]">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-200">99.8% Tepat Waktu</span>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Manual Photo Upload Modal */}
      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentPhotoUrl={personalInfo.avatarUrl}
        onSavePhoto={(newUrl) => {
          setPersonalInfo((prev) => ({ ...prev, avatarUrl: newUrl }));
        }}
        title="Ubah Foto Profil Driver Truk Tangki"
        subtitle="Unggah foto manual dari galeri atau kamera perangkat Anda"
      />
    </section>
  );
}
