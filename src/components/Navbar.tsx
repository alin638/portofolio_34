import { useState, useEffect, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Truck, ArrowUpRight, Sparkles, Sliders } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  activeSection: string;
}

export const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ activeSection }: NavbarProps) {
  const { personalInfo, setIsAdminOpen } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#home"
            id="brand-logo"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#7C3AED] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] via-[#6366F1] to-[#06B6D4] p-[1.5px] shadow-lg shadow-[#7C3AED]/20 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0A0A0F] rounded-[10px] flex items-center justify-center">
                <Truck className="w-5 h-5 text-[#06B6D4] group-hover:text-[#F8FAFC] transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-[#F8FAFC] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-slate-200 group-hover:to-[#06B6D4] transition-all">
                {personalInfo.name.split(' ')[0]}
                <span className="text-[#06B6D4]">.Logistics</span>
              </span>
              <span className="text-[10px] text-[#94A3B8] font-medium tracking-wider uppercase">
                Pro Truck Driver
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#15151D]/70 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.name}
                  id={`nav-link-${sectionId}`}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/80 to-[#06B6D4]/80 rounded-full -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action / CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              id="nav-admin-btn"
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-[#15151D] hover:bg-[#1f1f2c] border border-white/10 hover:border-[#7C3AED]/50 rounded-full transition-all duration-200"
              title="Ubah konten beranda"
            >
              <Sliders className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>Edit Beranda</span>
            </button>

            <a
              href="#contact"
              id="nav-cta-talk"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-full hover:opacity-95 hover:shadow-lg hover:shadow-[#7C3AED]/25 transition-all duration-300 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#15151D] border border-white/10 text-[#94A3B8] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass-nav border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navItems.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.name}
                    id={`mobile-nav-link-${sectionId}`}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#06B6D4]/20 text-white border border-[#7C3AED]/40'
                        : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      {isActive && <div className="w-2 h-2 rounded-full bg-[#06B6D4]" />}
                    </div>
                  </a>
                );
              })}

              <div className="pt-3 space-y-2">
                <button
                  id="mobile-menu-admin-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-200 bg-[#15151D] border border-white/10 rounded-xl"
                >
                  <Sliders className="w-4 h-4 text-[#06B6D4]" />
                  <span>Edit Konten Beranda</span>
                </button>

                <a
                  href="#contact"
                  id="mobile-menu-cta"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-xl shadow-lg shadow-[#7C3AED]/25"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Let's Talk & Collaborate</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
