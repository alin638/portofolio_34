import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Calendar, MapPin, Sparkles, CheckCircle2, Edit2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Experience() {
  const { experienceData, setIsAdminOpen } = usePortfolio();
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#0A0A0F]">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15151D] border border-white/10 text-xs font-semibold text-[#7C3AED] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>CAREER PATH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#06B6D4] to-[#7C3AED]">Education</span>
          </h2>
          <p className="mt-3 text-base text-[#94A3B8] max-w-xl">
            Perjalanan profesional dan latar belakang akademik dalam membangun produk teknologi.
          </p>
          <div className="mt-4">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-[#06B6D4] border border-white/5 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Timeline</span>
            </button>
          </div>
        </div>

        {/* Vertical Modern Timeline */}
        <div className="relative">
          
          {/* Vertical central guide line (desktop) / left line (mobile) */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#7C3AED] via-[#06B6D4] to-transparent opacity-30" />

          <div className="space-y-12 sm:space-y-16">
            {experienceData.map((item, index) => {
              const isEven = index % 2 === 0;
              const isWork = item.type === 'Work';

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Node Marker */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 z-10">
                    <div className="w-9 h-9 rounded-full bg-[#15151D] border-2 border-[#06B6D4] flex items-center justify-center shadow-lg shadow-[#06B6D4]/30">
                      {isWork ? (
                        <Briefcase className="w-4 h-4 text-[#06B6D4]" />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-[#7C3AED]" />
                      )}
                    </div>
                  </div>

                  {/* Content Box (Left or Right on desktop, indented on mobile) */}
                  <div className="w-full sm:w-[calc(50%-36px)] pl-12 sm:pl-0">
                    <div className="p-6 sm:p-7 rounded-3xl bg-[#111118] border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl shadow-black/40 group hover:-translate-y-1">
                      
                      {/* Top Meta info */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#15151D] text-[#06B6D4] border border-white/5">
                          <Calendar className="w-3 h-3 text-[#7C3AED]" />
                          {item.period}
                        </span>

                        <span className="text-xs text-[#94A3B8] font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#7C3AED]" />
                          {item.location}
                        </span>
                      </div>

                      {/* Title & Company */}
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#06B6D4] transition-colors">
                        {item.role}
                      </h3>
                      <h4 className="text-sm font-semibold text-[#7C3AED] mt-0.5">
                        {item.company}
                      </h4>

                      {/* Description */}
                      <p className="mt-3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                        {item.description}
                      </p>

                      {/* Achievements Bullets */}
                      {item.achievements && item.achievements.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {item.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{achievement}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Chips */}
                      <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-[#15151D] text-[#94A3B8] border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
