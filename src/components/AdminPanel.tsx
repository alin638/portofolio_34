import { useState, useRef, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Sparkles,
  BarChart3,
  Briefcase,
  Layers,
  Wrench,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  Edit2,
  Check,
  Save,
  Sliders,
  ExternalLink,
  Code2,
  HelpCircle,
  FileCode,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, SkillItem, ExperienceItem, ServiceItem } from '../types';
import PhotoUploadModal from './PhotoUploadModal';
import { resizeAndCompressImage } from '../utils/imageUpload';

export default function AdminPanel() {
  const {
    personalInfo,
    setPersonalInfo,
    statsData,
    setStatsData,
    skillCategories,
    setSkillCategories,
    projectsData,
    setProjectsData,
    experienceData,
    setExperienceData,
    servicesData,
    setServicesData,
    isAdminOpen,
    setIsAdminOpen,
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
    showToast
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'profile' | 'stats' | 'projects' | 'skills' | 'experience' | 'services' | 'backup'>('profile');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isProjectPhotoModalOpen, setIsProjectPhotoModalOpen] = useState(false);

  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const projectFileInputRef = useRef<HTMLInputElement>(null);

  if (!isAdminOpen) return null;

  // Handle direct file upload for profile avatar
  const handleAvatarFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await resizeAndCompressImage(file, 1000, 1200, 0.85);
      setPersonalInfo((prev) => ({ ...prev, avatarUrl: compressed }));
      showToast('Foto profil berhasil diunggah!');
    } catch (err: any) {
      showToast(err.message || 'Gagal mengunggah foto');
    }
  };

  // Handle direct file upload for project image
  const handleProjectImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;
    try {
      const compressed = await resizeAndCompressImage(file, 1200, 800, 0.85);
      setEditingProject({ ...editingProject, image: compressed });
      showToast('Foto rute ekspedisi berhasil diunggah!');
    } catch (err: any) {
      showToast(err.message || 'Gagal mengunggah foto');
    }
  };

  // Handle Profile changes
  const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Stats changes
  const handleStatChange = (index: number, field: 'value' | 'label' | 'description', val: string) => {
    setStatsData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: val };
      return updated;
    });
  };

  // Handle Projects
  const handleSaveProject = (projectToSave: Project) => {
    setProjectsData((prev) => {
      const exists = prev.some((p) => p.id === projectToSave.id);
      if (exists) {
        return prev.map((p) => (p.id === projectToSave.id ? projectToSave : p));
      } else {
        return [projectToSave, ...prev];
      }
    });
    setEditingProject(null);
    setIsAddingProject(false);
    showToast('Proyek berhasil disimpan.');
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
      setProjectsData((prev) => prev.filter((p) => p.id !== id));
      showToast('Proyek dihapus.');
    }
  };

  // Handle Skills
  const handleSkillLevelChange = (catIndex: number, skillIndex: number, newLevel: number) => {
    setSkillCategories((prev) => {
      const updated = [...prev];
      const cat = { ...updated[catIndex] };
      const skills = [...cat.skills];
      skills[skillIndex] = { ...skills[skillIndex], level: newLevel };
      cat.skills = skills;
      updated[catIndex] = cat;
      return updated;
    });
  };

  const handleAddSkill = (catIndex: number) => {
    const name = prompt('Masukkan nama skill baru (misal: React Query, GraphQL):');
    if (!name?.trim()) return;

    setSkillCategories((prev) => {
      const updated = [...prev];
      const cat = { ...updated[catIndex] };
      const newSkill: SkillItem = {
        name: name.trim(),
        level: 85,
        levelLabel: 'Advanced',
        iconName: 'Zap',
        color: '#06B6D4'
      };
      cat.skills = [...cat.skills, newSkill];
      updated[catIndex] = cat;
      return updated;
    });
    showToast(`Skill "${name}" berhasil ditambahkan.`);
  };

  const handleDeleteSkill = (catIndex: number, skillIndex: number) => {
    setSkillCategories((prev) => {
      const updated = [...prev];
      const cat = { ...updated[catIndex] };
      cat.skills = cat.skills.filter((_, idx) => idx !== skillIndex);
      updated[catIndex] = cat;
      return updated;
    });
    showToast('Skill berhasil dihapus.');
  };

  // Handle Experience
  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      period: '2024 - Present',
      role: 'Frontend Engineer',
      company: 'Nama Perusahaan',
      location: 'Jakarta, Indonesia',
      type: 'Work',
      description: 'Deskripsi pekerjaan dan kontribusi utama...',
      achievements: ['Meningkatkan kecepatan web', 'Membangun reusable UI components'],
      technologies: ['React', 'TypeScript', 'Tailwind CSS']
    };
    setExperienceData((prev) => [newExp, ...prev]);
    showToast('Pengalaman baru ditambahkan ke timeline.');
  };

  const handleDeleteExperience = (id: string) => {
    setExperienceData((prev) => prev.filter((e) => e.id !== id));
    showToast('Item pengalaman dihapus.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsAdminOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Main Admin Panel Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ type: 'spring', duration: 0.35, bounce: 0 }}
        className="relative w-full max-w-5xl bg-[#111118] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-4 max-h-[92vh] flex flex-col"
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#15151D] border-b border-white/10 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white shadow-lg shadow-[#7C3AED]/20">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">Admin & Pengelola Beranda</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live Editing Active
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                Perubahan langsung diterapkan pada tampilan website secara real-time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="admin-close-btn"
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors"
              aria-label="Tutup admin panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2.5 bg-[#15151D]/60 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto custom-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile & Hero</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3.5 py-2 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'stats'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Statistik</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-2 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Projects ({projectsData.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-3.5 py-2 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'skills'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Skills</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`px-3.5 py-2 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'experience'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-3.5 py-2 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'services'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Services</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`px-3.5 py-2 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'backup'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup & Sync</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-6">
          
          {/* 1. PROFILE & HERO TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    value={personalInfo.name}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#15151D] border border-white/10 text-sm text-white focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nama Panggilan / Brand</label>
                  <input
                    type="text"
                    name="nickname"
                    value={personalInfo.nickname}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#15151D] border border-white/10 text-sm text-white focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Role / Profesi</label>
                  <input
                    type="text"
                    name="role"
                    value={personalInfo.role}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#15151D] border border-white/10 text-sm text-white focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Status Ketersediaan</label>
                  <input
                    type="text"
                    name="availability"
                    value={personalInfo.availability}
                    onChange={handleProfileChange}
                    placeholder="e.g. Available for Freelance"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#15151D] border border-white/10 text-sm text-white focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Kontak</label>
                  <input
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#15151D] border border-white/10 text-sm text-white focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Lokasi</label>
                  <input
                    type="text"
                    name="location"
                    value={personalInfo.location}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#15151D] border border-white/10 text-sm text-white focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>
              </div>

              {/* Avatar / Profile Photo Manual Controls */}
              <div className="p-4 rounded-2xl bg-[#15151D] border border-white/10 space-y-3">
                <input
                  ref={avatarFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarFileUpload}
                  className="hidden"
                />

                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-white flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#06B6D4]" />
                    <span>Avatar & Foto Driver Truk Tangki</span>
                  </label>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Mendukung Unggah Manual
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="relative group shrink-0">
                    <img
                      src={personalInfo.avatarUrl}
                      alt="Preview Avatar"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-white/15 bg-black shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => setIsAvatarModalOpen(true)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center text-white text-[10px] font-semibold"
                    >
                      <Camera className="w-4 h-4 mb-0.5 text-cyan-300" />
                      <span>Ubah</span>
                    </button>
                  </div>

                  <div className="flex-1 min-w-0 space-y-2 w-full">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        id="admin-upload-photo-btn"
                        onClick={() => avatarFileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-semibold shadow-md hover:opacity-95 active:scale-95 transition-all"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Unggah File dari HP / Laptop</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsAvatarModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
                        <span>Buka Galeri Preset Tangki</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        name="avatarUrl"
                        value={personalInfo.avatarUrl}
                        onChange={handleProfileChange}
                        placeholder="https://images.unsplash.com/... atau URL foto"
                        className="w-full px-3 py-1.5 rounded-lg bg-[#111118] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Bio Singkat (Hero Section)</label>
                <textarea
                  name="bio"
                  rows={3}
                  value={personalInfo.bio}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#15151D] border border-white/10 text-sm text-white focus:outline-none focus:border-[#7C3AED] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Paragraf Detail (About Section)</label>
                <div className="space-y-3">
                  {personalInfo.detailedBio.map((paragraph, idx) => (
                    <textarea
                      key={idx}
                      rows={2}
                      value={paragraph}
                      onChange={(e) => {
                        const newBio = [...personalInfo.detailedBio];
                        newBio[idx] = e.target.value;
                        setPersonalInfo((prev) => ({ ...prev, detailedBio: newBio }));
                      }}
                      className="w-full px-4 py-2 rounded-xl bg-[#15151D] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7C3AED] resize-none"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. STATS TAB */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              <p className="text-xs text-[#94A3B8]">
                Atur angka statistik yang ditampilkan di About section dan hero badges.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {statsData.map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#15151D] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#06B6D4]">Stat #{idx + 1}</span>
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#94A3B8] mb-1">Nilai Teks (Contoh: 3+, 28+, 99%)</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#111118] border border-white/10 text-sm text-white focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#94A3B8] mb-1">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#111118] border border-white/10 text-sm text-white focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#94A3B8] mb-1">Keterangan Singkat</label>
                      <input
                        type="text"
                        value={stat.description}
                        onChange={(e) => handleStatChange(idx, 'description', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#111118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Daftar Portofolio Proyek</h4>
                  <p className="text-xs text-[#94A3B8]">Tambah, ubah data proyek atau link demo.</p>
                </div>
                <button
                  onClick={() => {
                    const newProj: Project = {
                      id: `project-${Date.now()}`,
                      title: 'Rute Ekspedisi Tangki Baru',
                      description: 'Deskripsi pengiriman muatan cair dan rute perjalanan...',
                      category: 'Tangki CPO & Minyak',
                      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
                      tags: ['PT Budi Starch', 'Tangki Glukosa 24KL', 'Food Grade CIP'],
                      liveUrl: 'https://example.com',
                      githubUrl: 'https://github.com',
                      metrics: 'Zero Contamination 100%',
                      routeDetails: 'Pabrik BUDI Lampung - Kawasan Industri Cikarang',
                      highlights: ['Pemeriksaan Segel Sanitasi', 'Sertifikat CIP Food Grade', 'Pengendalian Slosh Cairan Kental']
                    };
                    setEditingProject(newProj);
                    setIsAddingProject(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-semibold shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Rute Tangki</span>
                </button>
              </div>

              {/* Project Edit Form Modal / Card */}
              {editingProject && (
                <div className="p-5 rounded-2xl bg-[#15151D] border-2 border-[#7C3AED]/40 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h5 className="text-sm font-bold text-white">
                      {isAddingProject ? 'Tambah Rute Ekspedisi Tangki Baru' : `Edit: ${editingProject.title}`}
                    </h5>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Trayek / Ekspedisi</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#111118] border border-white/10 text-sm text-white focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Kategori Armada / Rute</label>
                      <select
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-[#111118] border border-white/10 text-sm text-white focus:outline-none focus:border-[#7C3AED]"
                      >
                        <option value="Tangki Glukosa & Food Grade">Tangki Glukosa & Food Grade</option>
                        <option value="Tangki CPO & Minyak">Tangki CPO & Minyak</option>
                        <option value="Tangki BBM & Gas">Tangki BBM & Gas</option>
                        <option value="Tangki Kimia & Industri">Tangki Kimia & Industri</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Proyek</label>
                    <textarea
                      rows={2}
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#111118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7C3AED] resize-none"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111118] border border-white/10 space-y-3">
                    <input
                      ref={projectFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProjectImageUpload}
                      className="hidden"
                    />

                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-slate-300">
                        Foto / Visual Rute Ekspedisi Tangki
                      </label>
                      <span className="text-[10px] font-mono text-cyan-400">
                        Manual File Upload Ready
                      </span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <img
                        src={editingProject.image}
                        alt="Project Preview"
                        className="w-16 h-12 rounded-lg object-cover border border-white/10 bg-black shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => projectFileInputRef.current?.click()}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-[11px] font-semibold"
                          >
                            <Upload className="w-3 h-3" />
                            <span>Unggah Foto dari HP/Laptop</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsProjectPhotoModalOpen(true)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-[11px] font-semibold"
                          >
                            <Sparkles className="w-3 h-3 text-[#06B6D4]" />
                            <span>Pilih Preset Foto</span>
                          </button>
                        </div>
                        <input
                          type="text"
                          value={editingProject.image}
                          onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                          placeholder="URL foto..."
                          className="w-full px-2.5 py-1 rounded bg-[#15151D] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Metrik / Badge (Contoh: Zero Spill 100%)</label>
                      <input
                        type="text"
                        value={editingProject.metrics || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, metrics: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#111118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Rute Detail (Contoh: Surabaya - Semarang)</label>
                      <input
                        type="text"
                        value={editingProject.routeDetails || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, routeDetails: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#111118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Live Demo URL</label>
                      <input
                        type="text"
                        value={editingProject.liveUrl}
                        onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#111118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Repo URL</label>
                      <input
                        type="text"
                        value={editingProject.githubUrl}
                        onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#111118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Tech Stack Tags (Pisahkan dengan koma)</label>
                    <input
                      type="text"
                      value={editingProject.tags.join(', ')}
                      onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      className="w-full px-3 py-2 rounded-xl bg-[#111118] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300 hover:text-white"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => handleSaveProject(editingProject)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-xs font-semibold text-white shadow"
                    >
                      Simpan Proyek
                    </button>
                  </div>
                </div>
              )}

              {/* Projects List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectsData.map((project) => (
                  <div key={project.id} className="p-4 rounded-2xl bg-[#15151D] border border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white truncate block">{project.title}</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/5 text-[#06B6D4]">
                            {project.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#94A3B8] truncate">{project.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setIsAddingProject(false);
                        }}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                        title="Hapus Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. SKILLS TAB */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <p className="text-xs text-[#94A3B8]">
                Sesuaikan daftar keahlian dan geser slider persentase kemahiran untuk setiap teknologi.
              </p>

              <div className="space-y-6">
                {skillCategories.map((cat, catIdx) => (
                  <div key={cat.title} className="p-5 rounded-2xl bg-[#15151D] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <h5 className="text-sm font-bold text-white">{cat.title}</h5>
                      <button
                        onClick={() => handleAddSkill(catIdx)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#06B6D4] font-medium"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Skill</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cat.skills.map((skill, skillIdx) => (
                        <div key={skill.name} className="p-3 rounded-xl bg-[#111118] border border-white/5 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-200">{skill.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[#06B6D4] text-xs font-bold">{skill.level}%</span>
                              <button
                                onClick={() => handleDeleteSkill(catIdx, skillIdx)}
                                className="text-slate-500 hover:text-rose-400 p-0.5"
                                title="Hapus skill"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <input
                            type="range"
                            min="30"
                            max="100"
                            value={skill.level}
                            onChange={(e) => handleSkillLevelChange(catIdx, skillIdx, Number(e.target.value))}
                            className="w-full accent-[#7C3AED] h-1.5 bg-[#15151D] rounded-lg cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Timeline Pengalaman & Pendidikan</h4>
                  <p className="text-xs text-[#94A3B8]">Kelola riwayat karir dan pencapaian.</p>
                </div>
                <button
                  onClick={handleAddExperience}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-semibold shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Pengalaman</span>
                </button>
              </div>

              <div className="space-y-4">
                {experienceData.map((exp, idx) => (
                  <div key={exp.id} className="p-4 rounded-2xl bg-[#15151D] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#7C3AED]">Item #{idx + 1}</span>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#94A3B8] mb-1">Posisi / Role</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const updated = [...experienceData];
                            updated[idx] = { ...updated[idx], role: e.target.value };
                            setExperienceData(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-[#111118] border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#94A3B8] mb-1">Perusahaan / Institusi</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = [...experienceData];
                            updated[idx] = { ...updated[idx], company: e.target.value };
                            setExperienceData(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-[#111118] border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#94A3B8] mb-1">Periode (Contoh: 2023 - Present)</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => {
                            const updated = [...experienceData];
                            updated[idx] = { ...updated[idx], period: e.target.value };
                            setExperienceData(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-[#111118] border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#94A3B8] mb-1">Lokasi</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => {
                            const updated = [...experienceData];
                            updated[idx] = { ...updated[idx], location: e.target.value };
                            setExperienceData(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-[#111118] border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#94A3B8] mb-1">Deskripsi</label>
                      <textarea
                        rows={2}
                        value={exp.description}
                        onChange={(e) => {
                          const updated = [...experienceData];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          setExperienceData(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-[#111118] border border-white/10 text-xs text-white resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <p className="text-xs text-[#94A3B8]">
                Atur judul dan deskripsi layanan pada section "What I Do".
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {servicesData.map((service, idx) => (
                  <div key={service.id} className="p-4 rounded-2xl bg-[#15151D] border border-white/10 space-y-3">
                    <span className="text-xs font-bold text-[#06B6D4]">Service #{idx + 1}</span>
                    <div>
                      <label className="block text-[11px] text-[#94A3B8] mb-1">Judul Layanan</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => {
                          const updated = [...servicesData];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setServicesData(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-[#111118] border border-white/10 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#94A3B8] mb-1">Deskripsi Singkat</label>
                      <textarea
                        rows={2}
                        value={service.description}
                        onChange={(e) => {
                          const updated = [...servicesData];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          setServicesData(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-[#111118] border border-white/10 text-xs text-white resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. BACKUP & SYNC TAB */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#15151D] border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white">Ekspor & Impor Data Portofolio</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Anda dapat mengunduh seluruh konfigurasi portofolio Anda sebagai file JSON untuk backup atau memindahkannya ke perangkat lain.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={exportDataJSON}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-semibold shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Yakin ingin mereset seluruh data kembali ke default awal?')) {
                        resetToDefaults();
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 text-xs font-semibold border border-rose-500/20"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset ke Data Default</span>
                  </button>
                </div>
              </div>

              {/* Paste JSON Importer */}
              <div className="p-5 rounded-2xl bg-[#15151D] border border-white/10 space-y-3">
                <h5 className="text-xs font-bold text-white">Impor dari Teks JSON</h5>
                <textarea
                  rows={4}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Tempel data JSON di sini..."
                  className="w-full px-3 py-2 rounded-xl bg-[#111118] border border-white/10 text-xs font-mono text-slate-300 focus:outline-none focus:border-[#7C3AED]"
                />
                <button
                  onClick={() => {
                    if (!jsonInput.trim()) return;
                    if (importDataJSON(jsonInput)) {
                      setJsonInput('');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-medium text-white"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Impor Data Sekarang</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer info & Done button */}
        <div className="p-4 bg-[#15151D] border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-[#94A3B8]">Perubahan otomatis tersimpan di peramban Anda.</span>
          <button
            onClick={() => {
              setIsAdminOpen(false);
              showToast('Perubahan beranda tersimpan!');
            }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-semibold shadow-md active:scale-95 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Selesai & Tutup</span>
          </button>
        </div>

      </motion.div>

      {/* Avatar Photo Modal */}
      <PhotoUploadModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        currentPhotoUrl={personalInfo.avatarUrl}
        onSavePhoto={(newUrl) => {
          setPersonalInfo((prev) => ({ ...prev, avatarUrl: newUrl }));
          showToast('Foto profil berhasil diperbarui!');
        }}
        title="Ubah Foto Profil Driver Truk Tangki"
        subtitle="Pilih dari galeri foto tangki atau unggah manual dari memori perangkat"
      />

      {/* Project Image Modal */}
      {editingProject && (
        <PhotoUploadModal
          isOpen={isProjectPhotoModalOpen}
          onClose={() => setIsProjectPhotoModalOpen(false)}
          currentPhotoUrl={editingProject.image}
          onSavePhoto={(newUrl) => {
            setEditingProject({ ...editingProject, image: newUrl });
            showToast('Visual rute proyek berhasil diubah!');
          }}
          title="Ubah Visual Rute Ekspedisi Tangki"
          subtitle="Unggah foto manual armada tangki Anda untuk rute ini"
        />
      )}
    </div>
  );
}
