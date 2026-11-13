import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreError';
import { useAuth } from './AuthContext';
import { SERVICES_DATA, ServiceItem } from '../data/services';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data/portfolio';
import { BLOG_POSTS, BlogPost } from '../data/blog';
import { TEAM_MEMBERS, TeamMember } from '../data/team';
import { AGENCY_DETAILS, Testimonial, AgencyStat, SocialLink } from '../data/agency';

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  business: string;
  service?: string;
  message?: string;
  type: 'contact' | 'audit';
  websiteOrSocial?: string;
  adSpend?: string;
  primaryGoal?: string;
  status: 'new' | 'contacted' | 'won' | 'lost';
  createdAt: string;
}

export interface AgencySettings {
  name: string;
  fullName: string;
  tagline: string;
  heroHeadline: string;
  heroSnippet: string;
  contactEmail: string;
  inquiriesEmail: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  address: string;
  city: string;
  fullAddress: string;
  hours: string;
  mapsEmbedUrl: string;
  stats: AgencyStat[];
  socials: SocialLink[];
  metaTitle: string;
  metaDescription: string;
}

interface ContentContextType {
  services: ServiceItem[];
  portfolio: PortfolioProject[];
  blog: BlogPost[];
  testimonials: Testimonial[];
  team: TeamMember[];
  settings: AgencySettings;
  leads: LeadItem[];
  loadingContent: boolean;
  addLead: (lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => Promise<string>;
  updateLeadStatus: (leadId: string, status: LeadItem['status']) => Promise<void>;
  deleteLead: (leadId: string) => Promise<void>;
  // Service CRUD
  saveService: (service: ServiceItem, isNew?: boolean) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  // Portfolio CRUD
  saveProject: (project: PortfolioProject, isNew?: boolean) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  // Blog CRUD
  saveBlogPost: (post: BlogPost, isNew?: boolean) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  // Testimonial CRUD
  saveTestimonial: (item: Testimonial, isNew?: boolean) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  // Team CRUD
  saveTeamMember: (member: TeamMember, isNew?: boolean) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
  // Settings
  saveSettings: (settings: Partial<AgencySettings>) => Promise<void>;
  // Seed Database helper
  seedInitialDataToFirestore: () => Promise<void>;
  isSeeding: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const defaultSettings: AgencySettings = {
  name: AGENCY_DETAILS.name,
  fullName: AGENCY_DETAILS.fullName || 'NOSHLANE AGENCY',
  tagline: AGENCY_DETAILS.tagline,
  heroHeadline: "Digital marketing engineered for ruthless commercial growth.",
  heroSnippet: AGENCY_DETAILS.shortDescription,
  contactEmail: AGENCY_DETAILS.contact.email,
  inquiriesEmail: AGENCY_DETAILS.contact.inquiriesEmail,
  phone: AGENCY_DETAILS.contact.phone,
  phoneDisplay: AGENCY_DETAILS.contact.phoneDisplay,
  whatsappNumber: AGENCY_DETAILS.contact.whatsappNumber,
  whatsappDefaultMessage: AGENCY_DETAILS.contact.whatsappDefaultMessage,
  address: AGENCY_DETAILS.location.address,
  city: AGENCY_DETAILS.location.city,
  fullAddress: AGENCY_DETAILS.location.fullAddress,
  hours: AGENCY_DETAILS.contact.hours,
  mapsEmbedUrl: AGENCY_DETAILS.location.mapsEmbedUrl,
  stats: AGENCY_DETAILS.stats,
  socials: AGENCY_DETAILS.socials,
  metaTitle: "NOSHLANE | Digital Marketing & Content Agency Lahore",
  metaDescription: "Premier Lahore-based digital marketing, content creation, paid advertising, branding, and web development agency scaling high-growth brands.",
};

export function ContentProvider({ children }: { children: ReactNode }) {
  const { user, isAdmin } = useAuth();

  const [services, setServices] = useState<ServiceItem[]>(SERVICES_DATA);
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>(PORTFOLIO_PROJECTS);
  const [blog, setBlog] = useState<BlogPost[]>(BLOG_POSTS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(AGENCY_DETAILS.testimonials);
  const [team, setTeam] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [settings, setSettings] = useState<AgencySettings>(defaultSettings);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loadingContent, setLoadingContent] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);

  // 1. Subscribe to Public Content Collections from Firestore
  useEffect(() => {
    // Services Listener
    const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((docSnap) => ({ ...docSnap.data(), id: docSnap.id } as ServiceItem));
        setServices(items);
      }
    }, (error) => {
      console.warn('Services listener note:', error.message);
    });

    // Portfolio Listener
    const normalizeImg = (url?: string) =>
      typeof url === 'string' && url.startsWith('/src/assets/images/')
        ? url.replace('/src/assets/images/', '/assets/images/')
        : url || '';

    const unsubPortfolio = onSnapshot(collection(db, 'portfolio'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((docSnap) => {
          const data = docSnap.data() as PortfolioProject;
          return {
            ...data,
            id: docSnap.id,
            coverImage: normalizeImg(data.coverImage),
            galleryImages: Array.isArray(data.galleryImages)
              ? data.galleryImages.map(normalizeImg)
              : [],
          };
        });
        setPortfolio(items);
      }
    }, (error) => {
      console.warn('Portfolio listener note:', error.message);
    });

    // Blog Listener
    const unsubBlog = onSnapshot(collection(db, 'blog'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((docSnap) => ({ ...docSnap.data(), id: docSnap.id } as BlogPost));
        setBlog(items);
      }
    }, (error) => {
      console.warn('Blog listener note:', error.message);
    });

    // Testimonials Listener
    const unsubTestimonials = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((docSnap) => ({ ...docSnap.data(), id: docSnap.id } as Testimonial));
        setTestimonials(items);
      }
    }, (error) => {
      console.warn('Testimonials listener note:', error.message);
    });

    // Team Listener
    const unsubTeam = onSnapshot(collection(db, 'team'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((docSnap) => {
          const data = docSnap.data() as TeamMember;
          return {
            ...data,
            id: docSnap.id,
            image: normalizeImg(data.image),
          };
        });
        setTeam(items);
      }
    }, (error) => {
      console.warn('Team listener note:', error.message);
    });

    // Settings Listener
    const unsubSettings = onSnapshot(doc(db, 'settings', 'general'), (docSnap) => {
      if (docSnap.exists()) {
        setSettings({ ...defaultSettings, ...(docSnap.data() as AgencySettings) });
      }
      setLoadingContent(false);
    }, (error) => {
      console.warn('Settings listener note:', error.message);
      setLoadingContent(false);
    });

    return () => {
      unsubServices();
      unsubPortfolio();
      unsubBlog();
      unsubTestimonials();
      unsubTeam();
      unsubSettings();
    };
  }, []);

  // 2. Subscribe to Leads if Authenticated Admin
  useEffect(() => {
    if (!isAdmin) {
      setLeads([]);
      return;
    }

    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubLeads = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: typeof data.createdAt === 'string' ? data.createdAt : new Date().toISOString(),
        } as LeadItem;
      });
      setLeads(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'leads');
    });

    return () => unsubLeads();
  }, [isAdmin]);

  // 3. Add Lead Method (Used by public Contact & Free Audit forms)
  const addLead = async (leadData: Omit<LeadItem, 'id' | 'createdAt' | 'status'>): Promise<string> => {
    try {
      const cleanLead = {
        ...leadData,
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      const docRef = await addDoc(collection(db, 'leads'), cleanLead);
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'leads');
      throw error;
    }
  };

  const updateLeadStatus = async (leadId: string, status: LeadItem['status']) => {
    try {
      await updateDoc(doc(db, 'leads', leadId), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `leads/${leadId}`);
      throw error;
    }
  };

  const deleteLead = async (leadId: string) => {
    try {
      await deleteDoc(doc(db, 'leads', leadId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `leads/${leadId}`);
      throw error;
    }
  };

  // 4. Admin Content Operations
  const saveService = async (service: ServiceItem, isNew = false) => {
    try {
      const docId = service.slug || service.id;
      await setDoc(doc(db, 'services', docId), service, { merge: true });
    } catch (error) {
      handleFirestoreError(error, isNew ? OperationType.CREATE : OperationType.UPDATE, 'services');
      throw error;
    }
  };

  const deleteService = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `services/${id}`);
      throw error;
    }
  };

  const saveProject = async (project: PortfolioProject, isNew = false) => {
    try {
      const docId = project.slug || project.id;
      await setDoc(doc(db, 'portfolio', docId), project, { merge: true });
    } catch (error) {
      handleFirestoreError(error, isNew ? OperationType.CREATE : OperationType.UPDATE, 'portfolio');
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'portfolio', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `portfolio/${id}`);
      throw error;
    }
  };

  const saveBlogPost = async (post: BlogPost, isNew = false) => {
    try {
      const docId = post.slug || post.id;
      await setDoc(doc(db, 'blog', docId), post, { merge: true });
    } catch (error) {
      handleFirestoreError(error, isNew ? OperationType.CREATE : OperationType.UPDATE, 'blog');
      throw error;
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'blog', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `blog/${id}`);
      throw error;
    }
  };

  const saveTestimonial = async (item: Testimonial, isNew = false) => {
    try {
      const docId = item.id;
      await setDoc(doc(db, 'testimonials', docId), item, { merge: true });
    } catch (error) {
      handleFirestoreError(error, isNew ? OperationType.CREATE : OperationType.UPDATE, 'testimonials');
      throw error;
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `testimonials/${id}`);
      throw error;
    }
  };

  const saveTeamMember = async (member: TeamMember, isNew = false) => {
    try {
      const docId = member.id;
      await setDoc(doc(db, 'team', docId), member, { merge: true });
    } catch (error) {
      handleFirestoreError(error, isNew ? OperationType.CREATE : OperationType.UPDATE, 'team');
      throw error;
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'team', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `team/${id}`);
      throw error;
    }
  };

  const saveSettings = async (newSettings: Partial<AgencySettings>) => {
    try {
      const merged = { ...settings, ...newSettings };
      await setDoc(doc(db, 'settings', 'general'), merged, { merge: true });
      setSettings(merged);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/general');
      throw error;
    }
  };

  // Seed Helper to migrate initial data to Firestore
  const seedInitialDataToFirestore = async () => {
    if (!isAdmin) return;
    setIsSeeding(true);
    try {
      // 1. Seed Services
      for (const s of SERVICES_DATA) {
        await setDoc(doc(db, 'services', s.slug), s, { merge: true });
      }
      // 2. Seed Portfolio
      for (const p of PORTFOLIO_PROJECTS) {
        await setDoc(doc(db, 'portfolio', p.slug), p, { merge: true });
      }
      // 3. Seed Blog
      for (const b of BLOG_POSTS) {
        await setDoc(doc(db, 'blog', b.slug), b, { merge: true });
      }
      // 4. Seed Testimonials
      for (const t of AGENCY_DETAILS.testimonials) {
        await setDoc(doc(db, 'testimonials', t.id), t, { merge: true });
      }
      // 5. Seed Team
      for (const tm of TEAM_MEMBERS) {
        await setDoc(doc(db, 'team', tm.id), tm, { merge: true });
      }
      // 6. Seed Settings
      await setDoc(doc(db, 'settings', 'general'), defaultSettings, { merge: true });
    } catch (err) {
      console.error('Seeding error:', err);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <ContentContext.Provider
      value={{
        services,
        portfolio,
        blog,
        testimonials,
        team,
        settings,
        leads,
        loadingContent,
        addLead,
        updateLeadStatus,
        deleteLead,
        saveService,
        deleteService,
        saveProject,
        deleteProject,
        saveBlogPost,
        deleteBlogPost,
        saveTestimonial,
        deleteTestimonial,
        saveTeamMember,
        deleteTeamMember,
        saveSettings,
        seedInitialDataToFirestore,
        isSeeding,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
