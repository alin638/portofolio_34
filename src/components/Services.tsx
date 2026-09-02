import { type MouseEvent } from 'react';
import { motion } from 'motion/react';
import {
  Truck,
  ShieldCheck,
  Wrench,
  Navigation,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Edit2,
  Box,
  Clock
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const serviceIconMap: Record<string, typeof Truck> = {
  Truck: Truck,
  ShieldCheck: ShieldCheck,
  Wrench: Wrench,
  Navigation: Navigation,
  Box: Box,
  Clock: Clock
};

export default function Services() {
  const { servicesData, setIsAdminOpen } = usePortfolio();
  const handleScrollToContact = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
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
    <section id="services" className="py-24 relative overflow-hidden bg-[#0A0A0F]/90">
      {/* Background ambient accents */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#06B6D4]/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15151D] border border-white/10 text-xs font-semibold text-[#06B6D4] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>LAYANAN & SPESIALISASI LOGISTIK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Spesialisasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#06B6D4] to-[#7C3AED]">Layanan</span>
          </h2>
          <p className="mt-3 text-base text-[#94A3B8] max-w-xl">
            Layanan pengemudian dan operasional armada berat profesional untuk mendukung kelancaran rantai pasok perusahaan Anda.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => {
            const Icon = serviceIconMap[service.icon] || Truck;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group rounded-3xl bg-[#111118] border border-white/10 p-6 sm:p-7 flex flex-col justify-between hover:border-white/20 transition-all duration-300 shadow-xl shadow-black/40 hover:-translate-y-1.5 hover:shadow-cyan-500/5 relative overflow-hidden"
              >
                {/* Top Subtle Gradient Hover Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Service Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7C3AED]/20 to-[#06B6D4]/20 border border-[#7C3AED]/30 flex items-center justify-center text-[#06B6D4] mb-5 group-hover:scale-105 group-hover:bg-[#7C3AED]/30 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#06B6D4] transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-white/5">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom link to contact */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <a
                    href="#contact"
                    onClick={handleScrollToContact}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#06B6D4] group-hover:text-white transition-colors"
                  >
                    <span>Hubungi Driver</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  
                  <button
                    onClick={() => setIsAdminOpen(true)}
                    className="p-1 rounded text-slate-500 hover:text-cyan-400 transition-colors"
                    title="Edit Layanan"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
