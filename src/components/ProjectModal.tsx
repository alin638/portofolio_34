import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Truck, ShieldCheck, Sparkles, CheckCircle2, MapPin, Navigation, Clock, Award, Gauge, Camera } from 'lucide-react';
import { Project } from '../types';
import PhotoUploadModal from './PhotoUploadModal';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdatePhoto?: (projectId: string, newPhotoUrl: string) => void;
}

export default function ProjectModal({ project, isOpen, onClose, onUpdatePhoto }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'details'>('preview');
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  if (!project) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
              className="relative w-full max-w-4xl bg-[#111118] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 bg-[#15151D] border-b border-white/10 flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white font-bold shadow-lg shadow-[#7C3AED]/20">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white tracking-tight">{project.title}</h3>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#7C3AED]/20 text-[#06B6D4] border border-[#7C3AED]/30">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] line-clamp-1">{project.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {onUpdatePhoto && (
                    <button
                      onClick={() => setIsPhotoModalOpen(true)}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
                      title="Ubah Foto Rute Manual"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#06B6D4]" />
                      <span className="hidden sm:inline">Ubah Foto Manual</span>
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Sub-Header Tabs */}
              <div className="px-6 py-2.5 bg-[#15151D]/60 border-b border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                      activeTab === 'preview'
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    Dokumentasi Ekspedisi
                  </button>
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                      activeTab === 'details'
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    Detail Rute & SOP Kargo
                  </button>
                </div>

                {project.routeDetails && (
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#06B6D4] font-mono bg-[#0A0A0F] px-3 py-1 rounded-lg border border-white/5">
                    <Navigation className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[280px]">{project.routeDetails}</span>
                  </div>
                )}
              </div>

              {/* Body Content */}
              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                {activeTab === 'preview' ? (
                  <div className="space-y-6">
                    {/* Photo / Visual Frame */}
                    <div className="mx-auto rounded-2xl overflow-hidden border border-white/15 bg-[#0A0A0F] shadow-2xl">
                      <div className="relative aspect-video bg-[#111118] overflow-hidden group">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                        
                        {/* Quick Manual Photo Replacement Button */}
                        {onUpdatePhoto && (
                          <div className="absolute top-4 right-4 z-10">
                            <button
                              onClick={() => setIsPhotoModalOpen(true)}
                              className="px-3.5 py-2 rounded-full bg-black/75 hover:bg-black/90 text-white text-xs font-semibold flex items-center gap-2 border border-white/20 backdrop-blur-md shadow-xl hover:scale-105 active:scale-95 transition-all"
                            >
                              <Camera className="w-3.5 h-3.5 text-[#06B6D4]" />
                              <span>Ganti Foto Manual</span>
                            </button>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-6">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] uppercase font-bold text-[#06B6D4] tracking-wider px-2 py-0.5 rounded bg-black/60 border border-white/10">
                                Status: Terkirim Sukses (Zero Accident)
                              </span>
                            </div>
                            <h4 className="text-xl font-bold text-white">{project.title}</h4>
                            <p className="text-xs text-slate-300 max-w-xl">{project.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Highlights Grid */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {project.highlights.map((highlight, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-[#15151D] border border-white/5 flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-200">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Details View */
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-bold text-white mb-2">Ikhtisar Perjalanan & Kargo</h4>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        {project.description} Setiap tahapan perjalanan mematuhi SOP keselamatan K3 transportasi darat, pemeriksaan muatan di titik transit, dan pencatatan e-manifest secara digital.
                      </p>
                    </div>

                    {project.metrics && (
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#7C3AED]/10 to-[#06B6D4]/10 border border-[#7C3AED]/20 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 flex items-center justify-center text-[#06B6D4]">
                          <Gauge className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-[#94A3B8]">Pencapaian Ekspedisi</span>
                          <div className="text-base font-bold text-white">{project.metrics}</div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-base font-bold text-white mb-3">Spesifikasi Armada & Muatan</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 rounded-xl bg-[#15151D] text-slate-200 text-xs font-medium border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer actions */}
              <div className="p-4 sm:p-5 bg-[#15151D] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Pengemudi Bersertifikasi SIM BII Umum & Standar K3 Logistik</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
                  >
                    <span>Tutup Info</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manual Photo Upload Modal for this specific Project */}
      {onUpdatePhoto && (
        <PhotoUploadModal
          isOpen={isPhotoModalOpen}
          onClose={() => setIsPhotoModalOpen(false)}
          currentPhotoUrl={project.image}
          title={`Ubah Foto: ${project.title}`}
          subtitle="Unggah foto manual dari perangkat Anda atau pilih dari galeri preset tangki glukosa"
          onSavePhoto={(newUrl) => {
            onUpdatePhoto(project.id, newUrl);
            setIsPhotoModalOpen(false);
          }}
        />
      )}
    </>
  );
}
