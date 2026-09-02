import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  PersonalInfo,
  StatItem,
  SocialLink,
  SkillCategory,
  Project,
  ExperienceItem,
  ServiceItem
} from '../types';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific database ID if provided
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export interface FirebasePortfolioPayload {
  personalInfo: PersonalInfo;
  statsData: StatItem[];
  socialLinks: SocialLink[];
  skillCategories: SkillCategory[];
  projectsData: Project[];
  experienceData: ExperienceItem[];
  servicesData: ServiceItem[];
  updatedAt?: string;
}

export interface InquiryItem {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  status?: string;
}

const PORTFOLIO_DOC_ID = 'main_portfolio_budi_glukosa';

/**
 * Fetch portfolio data from Firestore cloud database
 */
export async function fetchPortfolioFromFirestore(): Promise<FirebasePortfolioPayload | null> {
  try {
    const docRef = doc(db, 'portfolio_data', PORTFOLIO_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as FirebasePortfolioPayload;
    }
    return null;
  } catch (error) {
    console.error('Error fetching portfolio data from Firestore:', error);
    return null;
  }
}

/**
 * Save / sync all portfolio changes to Firestore cloud database
 */
export async function savePortfolioToFirestore(payload: FirebasePortfolioPayload): Promise<boolean> {
  try {
    const docRef = doc(db, 'portfolio_data', PORTFOLIO_DOC_ID);
    await setDoc(docRef, {
      ...payload,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving portfolio data to Firestore:', error);
    return false;
  }
}

/**
 * Save new freight / cargo inquiry directly to Firestore inquiries collection
 */
export async function sendInquiryToFirestore(inquiry: Omit<InquiryItem, 'id'>): Promise<boolean> {
  try {
    const inquiriesRef = collection(db, 'inquiries');
    await addDoc(inquiriesRef, {
      ...inquiry,
      timestamp: serverTimestamp(),
      createdAt: inquiry.createdAt || new Date().toISOString(),
      status: inquiry.status || 'Baru'
    });
    return true;
  } catch (error) {
    console.error('Error sending inquiry to Firestore:', error);
    return false;
  }
}

/**
 * Subscribe to realtime updates for inquiries in admin panel
 */
export function subscribeToInquiries(callback: (inquiries: InquiryItem[]) => void) {
  try {
    const inquiriesRef = collection(db, 'inquiries');
    const q = query(inquiriesRef, orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const list: InquiryItem[] = [];
      snapshot.forEach((docSnap) => {
        list.push({
          id: docSnap.id,
          ...(docSnap.data() as Omit<InquiryItem, 'id'>)
        });
      });
      callback(list);
    }, (err) => {
      console.error('Snapshot listener error:', err);
    });
  } catch (error) {
    console.error('Failed to subscribe to inquiries:', error);
    return () => {};
  }
}
