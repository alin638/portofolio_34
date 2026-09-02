import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, CheckCircle2 } from 'lucide-react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function PortfolioApp() {
  const { isAdminOpen, setIsAdminOpen, toastMessage } = usePortfolio();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'services', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut Alt+A or Ctrl+Shift+A to toggle Admin Panel
      if ((e.altKey && (e.key === 'a' || e.key === 'A')) || (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A'))) {
        e.preventDefault();
        setIsAdminOpen((prev: boolean) => !prev);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsAdminOpen]);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F8FAFC] selection:bg-[#7C3AED]/30 selection:text-[#06B6D4] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] relative">
      {/* Sticky Top Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Section */}
        <About />

        {/* 3. Skills Section */}
        <Skills />

        {/* 4. Projects Section */}
        <Projects />

        {/* 5. Experience Section */}
        <Experience />

        {/* 6. Services Section */}
        <Services />

        {/* 7. Contact Section */}
        <Contact />
      </main>

      {/* 8. Footer */}
      <Footer />

      {/* Admin Panel Modal */}
      <AdminPanel />

      {/* Floating Quick Admin Trigger Button */}
      <motion.button
        id="floating-admin-trigger"
        onClick={() => setIsAdminOpen(!isAdminOpen)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#15151D]/90 hover:bg-[#1E1E2A] text-white text-xs font-semibold border border-white/15 shadow-2xl backdrop-blur-md group transition-all"
        title="Buka panel admin untuk merubah beranda"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06B6D4] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06B6D4]" />
        </span>
        <Sliders className="w-3.5 h-3.5 text-[#06B6D4] group-hover:text-[#7C3AED] transition-colors" />
        <span className="hidden sm:inline text-slate-200 group-hover:text-white">Admin Beranda</span>
      </motion.button>

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#15151D] border border-[#06B6D4]/40 text-white text-xs font-semibold shadow-2xl shadow-black/80 backdrop-blur-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
