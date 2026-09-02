export type ProjectCategory = 'All' | 'Tangki Glukosa & Food Grade' | 'Tangki CPO & Minyak' | 'Tangki BBM & Gas' | 'Tangki Kimia & Industri';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Tangki Glukosa & Food Grade' | 'Tangki CPO & Minyak' | 'Tangki BBM & Gas' | 'Tangki Kimia & Industri';
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
  featured?: boolean;
  metrics?: string;
  highlights?: string[];
  routeDetails?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  levelLabel?: 'Expert' | 'Advanced' | 'Intermediate';
  iconName: string;
  color?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: 'Work' | 'Education' | 'Contract' | 'Sertifikasi';
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  handle: string;
}

export interface StatItem {
  label: string;
  value: string;
  numericValue: number;
  suffix: string;
  description: string;
}

export interface PersonalInfo {
  name: string;
  nickname: string;
  role: string;
  subRole: string;
  location: string;
  email: string;
  phone?: string;
  licenseType: string;
  availability: string;
  bio: string;
  detailedBio: string[];
  resumeUrl: string;
  avatarUrl: string;
}
