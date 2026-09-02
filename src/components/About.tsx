import { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Sparkles,
  Award,
  Truck,
  ShieldCheck,
  Navigation,
  Download,
  Edit2,
  CheckCircle2,
  Gauge,
  Camera,
  Upload
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import ResumeModal from './ResumeModal';
import PhotoUploadModal from './PhotoUploadModal';

export default function About() {
  const { personalInfo, setPersonalInfo, statsData, setIsAdminOpen } = usePortfolio();
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0A0A0F]/90">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Tag */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15151D] border border-white/10 text-xs font-semibold text-[#06B6D4] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>PROFIL PENGEMUDI PROFESIONAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#06B6D4] to-[#7C3AED]">Saya</span>
          </h2>
          <p className="mt-3 text-base text-[#94A3B8] max-w-xl">
            Dedikasi tinggi menjaga keselamatan kargo, keandalan armada, dan ketepatan waktu distribusi logistik nasional.
          </p>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Stylized Profile Image & Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative gradient border */}
              <div className="p-1 rounded-3xl bg-gradient-to-br from-[#7C3AED] via-[#6366F1] to-[#06B6D4] shadow-2xl shadow-[#7C3AED]/20">
                <div className="relative rounded-[22px] bg-[#15151D] overflow-hidden">
                  
                  {/* Photo with overlay */}
                  <div className="relative aspect-[4/5] overflow-hidden group">
                    <img
                      src={personalInfo.avatarUrl}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-black/20 to-transparent" />
                    
                    {/* Change Photo Overlay Button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <button
                        id="about-change-photo-btn"
                        onClick={() => setIsPhotoModalOpen(true)}
                        className="px-4 py-2 rounded-full bg-white text-[#0A0A0F] font-semibold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all"
                        title="Ganti Foto Manual"
                      >
                        <Camera className="w-4 h-4 text-[#7C3AED]" />
                        <span>Ubah Foto Manual</span>
                      </button>
                    </div>

                    {/* Badge on image bottom */}
                    <div className="absolute bottom-4 left-4 right-4 glass-panel p-3.5 rounded-xl border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 flex items-center justify-center text-[#06B6D4]">
                            <Award className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">SIM BII Umum & Food Safety</p>
                            <p className="text-[11px] text-[#94A3B8]">Tangki Glukosa 16KL-32KL • PT Budi Starch</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setIsPhotoModalOpen(true)}
                          className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                          title="Ubah Foto"
                        >
                          <Camera className="w-3.5 h-3.5 text-[#06B6D4]" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Decorative side pill */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 glass-panel px-4 py-2.5 rounded-2xl border border-white/10 shadow-xl flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white">Zero Accident Record</span>
                  <span className="block text-[10px] text-[#94A3B8]">500K+ KM Teruji & Aman</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Bio Details, Stats, and Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                Menghantarkan Kargo dengan <span className="text-[#06B6D4]">Aman</span>,{' '}
                <span className="text-[#7C3AED]">Tepat Waktu</span>, dan Profesional.
              </h3>
            </div>

            <div className="space-y-4 text-base text-[#94A3B8] leading-relaxed">
              {personalInfo.detailedBio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4">
              {statsData.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#15151D] border border-white/5 hover:border-white/15 transition-all duration-300 group hover:-translate-y-0.5"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#06B6D4] to-[#7C3AED] group-hover:scale-105 transition-transform origin-left">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-white mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-[#94A3B8] mt-0.5 leading-tight">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                id="about-download-cv-btn"
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-semibold text-sm shadow-lg shadow-[#7C3AED]/25 hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Profil Driver / CV</span>
              </button>

              <button
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#15151D] border border-white/10 hover:border-white/20 text-[#94A3B8] hover:text-white text-sm font-medium transition-colors"
              >
                <FileText className="w-4 h-4 text-[#7C3AED]" />
                <span>Lihat Portofolio Lengkap</span>
              </button>

              <button
                onClick={() => setIsAdminOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#06B6D4] font-medium border border-white/5 transition-colors"
                title="Edit About & Stats"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Info</span>
              </button>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Photo Upload Modal */}
      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentPhotoUrl={personalInfo.avatarUrl}
        onSavePhoto={(newUrl) => {
          setPersonalInfo((prev) => ({ ...prev, avatarUrl: newUrl }));
        }}
        title="Ubah Foto Profil Driver"
        subtitle="Unggah foto manual dari galeri atau kamera HP/laptop"
      />
    </section>
  );
}
