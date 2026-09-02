import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  PersonalInfo,
  StatItem,
  SocialLink,
  SkillCategory,
  Project,
  ExperienceItem,
  ServiceItem
} from '../types';
import {
  personalInfo as defaultPersonalInfo,
  statsData as defaultStatsData,
  socialLinks as defaultSocialLinks,
  skillCategories as defaultSkillCategories,
  projectsData as defaultProjectsData,
  experienceData as defaultExperienceData,
  servicesData as defaultServicesData
} from '../data/portfolio';
import {
  fetchPortfolioFromFirestore,
  savePortfolioToFirestore,
  FirebasePortfolioPayload
} from '../lib/firebase';

const STORAGE_KEYS = {
  VERSION: 'portfolio_storage_v5_glukosa_budi_wa',
  PERSONAL: 'portfolio_personal_info_v5_glukosa_budi_wa',
  STATS: 'portfolio_stats_data_v5_glukosa_budi_wa',
  SOCIALS: 'portfolio_social_links_v5_glukosa_budi_wa',
  SKILLS: 'portfolio_skill_categories_v5_glukosa_budi_wa',
  PROJECTS: 'portfolio_projects_data_v5_glukosa_budi_wa',
  EXPERIENCE: 'portfolio_experience_data_v5_glukosa_budi_wa',
  SERVICES: 'portfolio_services_data_v5_glukosa_budi_wa',
};

interface PortfolioContextType {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  statsData: StatItem[];
  setStatsData: React.Dispatch<React.SetStateAction<StatItem[]>>;
  socialLinks: SocialLink[];
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLink[]>>;
  skillCategories: SkillCategory[];
  setSkillCategories: React.Dispatch<React.SetStateAction<SkillCategory[]>>;
  projectsData: Project[];
  setProjectsData: React.Dispatch<React.SetStateAction<Project[]>>;
  experienceData: ExperienceItem[];
  setExperienceData: React.Dispatch<React.SetStateAction<ExperienceItem[]>>;
  servicesData: ServiceItem[];
  setServicesData: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  
  // Firebase sync capabilities
  isFirebaseConnected: boolean;
  isFirebaseSyncing: boolean;
  firebaseLastSync: string | null;
  syncToCloudFirestore: () => Promise<boolean>;
  syncFromCloudFirestore: () => Promise<boolean>;

  resetToDefaults: () => void;
  exportDataJSON: () => void;
  importDataJSON: (jsonString: string) => boolean;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PERSONAL);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.phone?.includes('812-3456-7890') || parsed.phone?.includes('81234567890')) {
          parsed.phone = defaultPersonalInfo.phone;
        }
        return { ...defaultPersonalInfo, ...parsed };
      }
      return defaultPersonalInfo;
    } catch {
      return defaultPersonalInfo;
    }
  });

  const [statsData, setStatsData] = useState<StatItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STATS);
      return saved ? JSON.parse(saved) : defaultStatsData;
    } catch {
      return defaultStatsData;
    }
  });

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOCIALS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((s: SocialLink) => {
          if (s.platform === 'WhatsApp' && s.url.includes('81234567890')) {
            return { ...s, url: 'https://wa.me/6285732033278', handle: '+62 857-3203-3278' };
          }
          if (s.platform === 'Phone' && s.url.includes('81234567890')) {
            return { ...s, url: 'tel:+6285732033278', handle: '0857-3203-3278' };
          }
          return s;
        });
      }
      return defaultSocialLinks;
    } catch {
      return defaultSocialLinks;
    }
  });

  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
      return saved ? JSON.parse(saved) : defaultSkillCategories;
    } catch {
      return defaultSkillCategories;
    }
  });

  const [projectsData, setProjectsData] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : defaultProjectsData;
    } catch {
      return defaultProjectsData;
    }
  });

  const [experienceData, setExperienceData] = useState<ExperienceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
      return saved ? JSON.parse(saved) : defaultExperienceData;
    } catch {
      return defaultExperienceData;
    }
  });

  const [servicesData, setServicesData] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : defaultServicesData;
    } catch {
      return defaultServicesData;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(true);
  const [isFirebaseSyncing, setIsFirebaseSyncing] = useState(false);
  const [firebaseLastSync, setFirebaseLastSync] = useState<string | null>(() => {
    return localStorage.getItem('portfolio_last_firebase_sync') || null;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PERSONAL, JSON.stringify(personalInfo));
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(statsData));
      localStorage.setItem(STORAGE_KEYS.SOCIALS, JSON.stringify(socialLinks));
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skillCategories));
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projectsData));
      localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(experienceData));
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(servicesData));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [personalInfo, statsData, socialLinks, skillCategories, projectsData, experienceData, servicesData]);

  // Sync to Firebase Cloud
  const syncToCloudFirestore = useCallback(async (): Promise<boolean> => {
    setIsFirebaseSyncing(true);
    try {
      const payload: FirebasePortfolioPayload = {
        personalInfo,
        statsData,
        socialLinks,
        skillCategories,
        projectsData,
        experienceData,
        servicesData,
        updatedAt: new Date().toISOString()
      };
      const success = await savePortfolioToFirestore(payload);
      if (success) {
        const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setFirebaseLastSync(now);
        localStorage.setItem('portfolio_last_firebase_sync', now);
        setIsFirebaseConnected(true);
        showToast('Data berhasil disinkronkan ke Firebase Firestore Cloud!');
        return true;
      } else {
        showToast('Gagal menyinkronkan data ke Firebase.');
        return false;
      }
    } catch (err) {
      console.error('Firebase sync error:', err);
      showToast('Error koneksi Firebase.');
      return false;
    } finally {
      setIsFirebaseSyncing(false);
    }
  }, [personalInfo, statsData, socialLinks, skillCategories, projectsData, experienceData, servicesData]);

  // Sync from Firebase Cloud
  const syncFromCloudFirestore = useCallback(async (): Promise<boolean> => {
    setIsFirebaseSyncing(true);
    try {
      const cloudData = await fetchPortfolioFromFirestore();
      if (cloudData) {
        if (cloudData.personalInfo) setPersonalInfo(cloudData.personalInfo);
        if (cloudData.statsData) setStatsData(cloudData.statsData);
        if (cloudData.socialLinks) setSocialLinks(cloudData.socialLinks);
        if (cloudData.skillCategories) setSkillCategories(cloudData.skillCategories);
        if (cloudData.projectsData) setProjectsData(cloudData.projectsData);
        if (cloudData.experienceData) setExperienceData(cloudData.experienceData);
        if (cloudData.servicesData) setServicesData(cloudData.servicesData);

        const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setFirebaseLastSync(now);
        localStorage.setItem('portfolio_last_firebase_sync', now);
        setIsFirebaseConnected(true);
        showToast('Data terbaru berhasil dimuat dari Firebase Firestore!');
        return true;
      } else {
        // If Firestore is empty, seed initial data to cloud
        await syncToCloudFirestore();
        return true;
      }
    } catch (err) {
      console.error('Firebase fetch error:', err);
      return false;
    } finally {
      setIsFirebaseSyncing(false);
    }
  }, [syncToCloudFirestore]);

  // Initial cloud fetch on startup
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const cloudData = await fetchPortfolioFromFirestore();
        if (isMounted) {
          if (cloudData) {
            if (cloudData.personalInfo) setPersonalInfo(cloudData.personalInfo);
            if (cloudData.statsData) setStatsData(cloudData.statsData);
            if (cloudData.socialLinks) setSocialLinks(cloudData.socialLinks);
            if (cloudData.skillCategories) setSkillCategories(cloudData.skillCategories);
            if (cloudData.projectsData) setProjectsData(cloudData.projectsData);
            if (cloudData.experienceData) setExperienceData(cloudData.experienceData);
            if (cloudData.servicesData) setServicesData(cloudData.servicesData);
            setIsFirebaseConnected(true);
          } else {
            // First time cloud initialization: save default data to Firestore
            savePortfolioToFirestore({
              personalInfo,
              statsData,
              socialLinks,
              skillCategories,
              projectsData,
              experienceData,
              servicesData,
              updatedAt: new Date().toISOString()
            });
          }
        }
      } catch (e) {
        console.warn('Initial Firestore sync notice:', e);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const resetToDefaults = () => {
    setPersonalInfo(defaultPersonalInfo);
    setStatsData(defaultStatsData);
    setSocialLinks(defaultSocialLinks);
    setSkillCategories(defaultSkillCategories);
    setProjectsData(defaultProjectsData);
    setExperienceData(defaultExperienceData);
    setServicesData(defaultServicesData);
    localStorage.clear();
    showToast('Semua data beranda berhasil direset ke default.');
  };

  const exportDataJSON = () => {
    const fullData = {
      personalInfo,
      statsData,
      socialLinks,
      skillCategories,
      projectsData,
      experienceData,
      servicesData,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Data berhasil diekspor sebagai JSON.');
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.personalInfo) setPersonalInfo(parsed.personalInfo);
      if (parsed.statsData) setStatsData(parsed.statsData);
      if (parsed.socialLinks) setSocialLinks(parsed.socialLinks);
      if (parsed.skillCategories) setSkillCategories(parsed.skillCategories);
      if (parsed.projectsData) setProjectsData(parsed.projectsData);
      if (parsed.experienceData) setExperienceData(parsed.experienceData);
      if (parsed.servicesData) setServicesData(parsed.servicesData);
      showToast('Data berhasil diimpor dan diperbarui!');
      return true;
    } catch (e) {
      console.error(e);
      showToast('Gagal mengimpor JSON: format tidak valid.');
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        statsData,
        setStatsData,
        socialLinks,
        setSocialLinks,
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
        isFirebaseConnected,
        isFirebaseSyncing,
        firebaseLastSync,
        syncToCloudFirestore,
        syncFromCloudFirestore,
        resetToDefaults,
        exportDataJSON,
        importDataJSON,
        toastMessage,
        showToast
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
