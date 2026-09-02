import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Truck,
  Navigation,
  Wrench,
  Shield,
  ShieldCheck,
  Award,
  Clock,
  Gauge,
  MapPin,
  Compass,
  CheckCircle2,
  Sparkles,
  Zap,
  Box,
  Layers,
  Cpu,
  Globe,
  FileText,
  Smartphone,
  Flame,
  HardDrive,
  Edit2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const categoryIconMap: Record<string, typeof Truck> = {
  Truck: Truck,
  Navigation: Navigation,
  Wrench: Wrench,
  Shield: Shield
};

const skillIconMap: Record<string, typeof Truck> = {
  Truck,
  Navigation,
  Wrench,
  Shield,
  ShieldCheck,
  Award,
  Clock,
  Gauge,
  MapPin,
  Compass,
  CheckCircle2,
  Sparkles,
  Zap,
  Box,
  Layers,
  Cpu,
  Globe,
  FileText,
  Smartphone,
  Flame,
  HardDrive
};

export default function Skills() {
  const { skillCategories, setIsAdminOpen } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');

  const displayedCategories = selectedCategory === 'all'
    ? skillCategories
    : [skillCategories[selectedCategory]];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0A0A0F]">
      {/* Subtle Glows */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15151D] border border-white/10 text-xs font-semibold text-[#7C3AED] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>KOMPETENSI & KEAHLIAN DRIVER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Keahlian & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#06B6D4] to-[#7C3AED]">Sertifikasi</span>
          </h2>
          <p className="mt-3 text-base text-[#94A3B8] max-w-xl">
            Standar kompetensi pengemudian armada berat, navigasi lintas provinsi, perawatan armada, dan kepatuhan K3 logistik.
          </p>

          {/* Category Filter Pills & Edit */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#15151D] rounded-2xl border border-white/5 max-w-3xl">
            <button
              id="skill-filter-all"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              Semua Kategori
            </button>
            {skillCategories.map((cat, idx) => (
              <button
                key={cat.title}
                id={`skill-filter-${idx}`}
                onClick={() => setSelectedCategory(idx)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === idx
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.title.split(' ')[0]}
              </button>
            ))}

            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-[#06B6D4] hover:text-white hover:bg-white/5 flex items-center gap-1 transition-all"
              title="Edit & Tambah Skill"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="wait">
            {displayedCategories.map((category, catIndex) => {
              const CategoryIcon = categoryIconMap[category.icon] || Truck;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: catIndex * 0.08 }}
                  className="rounded-3xl bg-[#111118] border border-white/10 p-6 sm:p-7 flex flex-col justify-between hover:border-white/20 transition-all duration-300 shadow-xl shadow-black/40 group"
                >
                  {/* Category Header */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#7C3AED]/20 to-[#06B6D4]/20 border border-[#7C3AED]/30 flex items-center justify-center text-[#06B6D4] group-hover:scale-105 transition-transform">
                          <CategoryIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white tracking-tight">{category.title}</h3>
                          <p className="text-xs text-[#94A3B8]">{category.skills.length} Poin Kualifikasi Driver</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Terverifikasi
                      </span>
                    </div>

                    <p className="text-xs text-[#94A3B8] mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Skill items list */}
                    <div className="space-y-4">
                      {category.skills.map((skill) => {
                        const SkillIcon = skillIconMap[skill.iconName] || Layers;
                        return (
                          <div key={skill.name} className="space-y-1.5 group/skill">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-[#15151D] border border-white/5 flex items-center justify-center text-[#94A3B8] group-hover/skill:text-white transition-colors">
                                  <SkillIcon className="w-3.5 h-3.5" />
                                </div>
                                <span className="font-semibold text-slate-200 group-hover/skill:text-white transition-colors">
                                  {skill.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#15151D] text-[#94A3B8]">
                                  {skill.levelLabel || 'Expert'}
                                </span>
                                <span className="font-mono text-slate-400 text-[11px] w-8 text-right">
                                  {skill.level}%
                                </span>
                              </div>
                            </div>

                            {/* Minimal Elegant Progress Line */}
                            <div className="w-full h-1.5 bg-[#15151D] rounded-full overflow-hidden border border-white/5">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                                className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card bottom footer note */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#94A3B8]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Standar K3 & Defensive Driving
                    </span>
                    <span className="text-slate-400 font-mono">Zero Accident Commitment</span>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
