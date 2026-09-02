import { type MouseEvent } from 'react';
import { ArrowUp, Truck, Heart, Phone, Mail, Instagram, MessageSquare, Sliders } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { navItems } from './Navbar';

const socialIconMap: Record<string, typeof Truck> = {
  Truck,
  Phone,
  Mail,
  Instagram,
  MessageSquare
};

export default function Footer() {
  const { personalInfo, socialLinks, setIsAdminOpen } = usePortfolio();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
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
    <footer className="bg-[#07070B] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#7C3AED]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5">
          
          {/* Logo & Bio */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 max-w-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] p-[1.5px]">
                <div className="w-full h-full bg-[#0A0A0F] rounded-[10px] flex items-center justify-center">
                  <Truck className="w-4 h-4 text-[#06B6D4]" />
                </div>
              </div>
              <span className="font-bold text-lg text-white">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              {personalInfo.role}. Berpengalaman mengemudikan armada Truk Tangki (CPO, BBM & Kimia) lintas pulau dengan rekor Zero Accident dan Zero Spill.
            </p>
          </div>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-[#94A3B8]">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="hover:text-white transition-colors py-1"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Social Icons & Back to Top & Admin */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2.5 rounded-xl bg-[#15151D] hover:bg-[#1f1f2c] border border-white/10 text-[#06B6D4] hover:text-white transition-all duration-200 hover:-translate-y-0.5"
              title="Edit Beranda"
              aria-label="Edit Beranda"
            >
              <Sliders className="w-4 h-4" />
            </button>

            {socialLinks.map((social) => {
              const Icon = socialIconMap[social.icon] || Mail;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  id={`footer-social-${social.platform.toLowerCase()}`}
                  aria-label={social.platform}
                  className="p-2.5 rounded-xl bg-[#111118] border border-white/10 text-[#94A3B8] hover:text-[#06B6D4] hover:border-[#06B6D4]/40 hover:bg-[#181824] transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}

            <button
              id="footer-back-to-top-btn"
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-gradient-to-tr from-[#7C3AED]/30 to-[#06B6D4]/30 hover:from-[#7C3AED] hover:to-[#06B6D4] border border-white/10 text-white transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-black/50"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
          <p className="flex items-center gap-1">
            <span>Designed & Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>by {personalInfo.name}</span>
          </p>

          <p className="font-mono text-[11px] text-slate-400">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
