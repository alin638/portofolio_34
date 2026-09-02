import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, MapPin, Sparkles, Eye, ArrowUpRight, Plus, Edit2, ShieldCheck, Navigation, Camera } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, ProjectCategory } from '../types';
import ProjectModal from './ProjectModal';
import PhotoUploadModal from './PhotoUploadModal';

const categories: ProjectCategory[] = ['All', 'Tangki Glukosa & Food Grade', 'Tangki CPO & Minyak', 'Tangki BBM & Gas', 'Tangki Kimia & Industri'];

export default function Projects() {
  const { projectsData, setProjectsData, setIsAdminOpen } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingPhotoProject, setEditingPhotoProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  const handleUpdateProjectPhoto = (projectId: string, newPhotoUrl: string) => {
    setProjectsData((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, image: newPhotoUrl } : p))
    );
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject((prev) => (prev ? { ...prev, image: newPhotoUrl } : null));
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#0A0A0F]/95">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#7C3AED]/8 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#06B6D4]/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15151D] border border-white/10 text-xs font-semibold text-[#06B6D4] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>RIWAYAT EKSPEDISI & TRAYEK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Riwayat <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#06B6D4] to-[#7C3AED]">Pengiriman & Rute</span>
          </h2>
          <p className="mt-3 text-base text-[#94A3B8] max-w-xl">
            Dokumentasi pengiriman kargo strategis, muatan tonase besar, rute lintas pulau, dan logistik industri nasional.
          </p>

          {/* Interactive Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#15151D] rounded-2xl border border-white/5 max-w-3xl">
            {categories.map((category) => (
              <button
                key={category}
                id={`project-category-${category.toLowerCase().replace(/[\s&]+/g, '-')}`}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'text-white font-semibold'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeProjectCategory"
                    className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-xl -z-10 shadow-md shadow-[#7C3AED]/25"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span>{category}</span>
                <span className="ml-1.5 text-[11px] opacity-70">
                  ({category === 'All' ? projectsData.length : projectsData.filter(p => p.category === category).length})
                </span>
              </button>
            ))}

            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#06B6D4] hover:text-white hover:bg-white/5 flex items-center gap-1.5 transition-all"
              title="Kelola & Tambah Rute"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Kelola Rute</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="group rounded-3xl bg-[#111118] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#7C3AED]/10 hover:-translate-y-1.5"
              >
                {/* Image Frame with Hover Preview & Quick Manual Photo Change */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#15151D]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Category Pill on Image */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-[#0A0A0F]/85 text-[#06B6D4] border border-white/10 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Manual Photo Change Button on Top Right */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingPhotoProject(project);
                      }}
                      className="p-1.5 rounded-full bg-black/75 hover:bg-black text-white hover:text-[#06B6D4] border border-white/20 backdrop-blur-md transition-all shadow-md active:scale-95"
                      title="Ubah Foto Rute Manual"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Dark gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent opacity-80" />

                  {/* Quick Action Overlay on image */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 backdrop-blur-[2px]">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-3.5 py-2 rounded-full bg-white text-[#0A0A0F] font-semibold text-xs flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-transform shadow-lg"
                      title="Lihat Detail Ekspedisi"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Detail Rute</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingPhotoProject(project);
                      }}
                      className="px-3.5 py-2 rounded-full bg-[#15151D]/90 text-white font-semibold text-xs flex items-center gap-1.5 border border-white/20 hover:scale-105 active:scale-95 transition-transform shadow-lg hover:border-[#06B6D4]"
                      title="Ubah Foto Manual"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#06B6D4]" />
                      <span>Ubah Foto</span>
                    </button>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-[#15151D] text-[#94A3B8] border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-white/5 text-[#94A3B8]">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#06B6D4] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {project.routeDetails && (
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#06B6D4] font-mono">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{project.routeDetails}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                    <button
                      id={`project-demo-btn-${project.id}`}
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-semibold hover:opacity-95 active:scale-95 transition-all shadow-md shadow-[#7C3AED]/20"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Detail Rute Kargo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setEditingPhotoProject(project)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/5 transition-colors"
                      title="Ubah Foto Rute Manual"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#06B6D4]" />
                      <span>Ganti Foto</span>
                    </button>
                  </div>

                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Interactive Project Preview Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onUpdatePhoto={handleUpdateProjectPhoto}
      />

      {/* Manual Photo Upload Modal for selected card */}
      {editingPhotoProject && (
        <PhotoUploadModal
          isOpen={!!editingPhotoProject}
          onClose={() => setEditingPhotoProject(null)}
          currentPhotoUrl={editingPhotoProject.image}
          title={`Ubah Foto Rute: ${editingPhotoProject.title}`}
          subtitle="Unggah file foto manual dari komputer/ponsel Anda atau pilih dari preset tangki glukosa"
          onSavePhoto={(newUrl) => {
            handleUpdateProjectPhoto(editingPhotoProject.id, newUrl);
            setEditingPhotoProject(null);
          }}
        />
      )}
    </section>
  );
}
