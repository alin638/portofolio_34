import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, FileText, Check, ExternalLink, Briefcase, GraduationCap, Award, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { personalInfo, experienceData, skillCategories, statsData } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadCV = () => {
    setDownloading(true);
    // Generate text/markdown formatted resume for immediate clean download
    const cvContent = `
============================================================
${personalInfo.name.toUpperCase()}
${personalInfo.role}
============================================================
Location: ${personalInfo.location}
Email: ${personalInfo.email}
Status: ${personalInfo.availability}

------------------------------------------------------------
SUMMARY / PROFILE
------------------------------------------------------------
${personalInfo.bio}

${personalInfo.detailedBio.join('\n\n')}

------------------------------------------------------------
KEY METRICS & IMPACT
------------------------------------------------------------
${statsData.map(s => `- ${s.label}: ${s.value} (${s.description})`).join('\n')}

------------------------------------------------------------
CORE SKILLS & TECH STACK
------------------------------------------------------------
${skillCategories.map(cat => `[${cat.title}]\n${cat.skills.map(s => `  • ${s.name} (${s.levelLabel || 'Proficient'})`).join('\n')}`).join('\n\n')}

------------------------------------------------------------
WORK EXPERIENCE & EDUCATION
------------------------------------------------------------
${experienceData.map(exp => `
${exp.role} | ${exp.company}
Period: ${exp.period} | Location: ${exp.location}
Description: ${exp.description}
Achievements:
${exp.achievements.map(a => `  - ${a}`).join('\n')}
Tech Stack: ${exp.technologies.join(', ')}
`).join('\n------------------------------------------------------------\n')}

============================================================
Generated from ${personalInfo.name}'s Web Portfolio
============================================================
    `.trim();

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_${personalInfo.name.replace(/\s+/g, '_')}_Tanker_Truck_Driver_Logistics.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloading(false);
    }, 800);
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(
      `${personalInfo.name} - ${personalInfo.role}\nEmail: ${personalInfo.email}\nPortfolio & CV summary ready for review.`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
            className="relative w-full max-w-3xl bg-[#111118] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[88vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-[#15151D] border-b border-white/10 flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Curriculum Vitae Preview</h3>
                  <p className="text-xs text-[#94A3B8]">{personalInfo.name} • {personalInfo.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="cv-download-btn-modal"
                  onClick={handleDownloadCV}
                  disabled={downloading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloading ? 'Downloading...' : 'Download File'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors"
                  aria-label="Close CV preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar">
              
              {/* Header Profile Bar */}
              <div className="p-5 rounded-2xl bg-[#15151D] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xl font-bold text-white">{personalInfo.name}</h4>
                  <p className="text-sm text-[#06B6D4] font-medium">{personalInfo.role}</p>
                  <div className="mt-2 flex flex-wrap gap-y-1 gap-x-4 text-xs text-[#94A3B8]">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#7C3AED]" /> {personalInfo.location}</span>
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-[#06B6D4]" /> {personalInfo.email}</span>
                  </div>
                </div>

                <button
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#94A3B8] hover:text-white border border-white/5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ExternalLink className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Summary Copied' : 'Copy Quick Info'}</span>
                </button>
              </div>

              {/* Summary */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#7C3AED] mb-2 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Executive Summary
                </h5>
                <p className="text-sm text-slate-300 leading-relaxed bg-[#15151D]/60 p-4 rounded-xl border border-white/5">
                  {personalInfo.bio} {personalInfo.detailedBio[0]}
                </p>
              </div>

              {/* Experience */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#06B6D4] mb-3 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Work Experience
                </h5>
                <div className="space-y-3">
                  {experienceData.filter(e => e.type === 'Work').map((exp) => (
                    <div key={exp.id} className="p-4 rounded-xl bg-[#15151D]/80 border border-white/5 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <span className="text-sm font-semibold text-white">{exp.role}</span>
                        <span className="text-xs text-[#06B6D4] font-mono">{exp.period}</span>
                      </div>
                      <p className="text-xs text-[#94A3B8] font-medium">{exp.company} • {exp.location}</p>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx}>{ach}</li>
                        ))}
                      </ul>
                      <div className="pt-1 flex flex-wrap gap-1">
                        {exp.technologies.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#7C3AED] mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> Education & Certifications
                </h5>
                {experienceData.filter(e => e.type === 'Education').map((edu) => (
                  <div key={edu.id} className="p-4 rounded-xl bg-[#15151D]/80 border border-white/5 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-white">{edu.role}</span>
                      <span className="text-xs text-emerald-400 font-mono">{edu.period}</span>
                    </div>
                    <p className="text-xs text-[#94A3B8]">{edu.company}</p>
                    <p className="text-xs text-slate-300">{edu.description}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Footer actions */}
            <div className="p-4 bg-[#15151D] border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#94A3B8]">Ready to bring high-impact results to your team.</span>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleDownloadCV}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white hover:opacity-90 transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CV</span>
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
