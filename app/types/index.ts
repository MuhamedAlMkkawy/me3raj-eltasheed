export type UserRole = 'super_admin' | 'admin' | 'editor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  avatar?: string;
  createdAt?: string;
  lastLogin?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  gallery?: string[];
  features?: string[];
  order: number;
  active: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  client: string;
  location: string;
  year: string;
  area?: string;
  cost?: string;
  duration?: string;
  description: string;
  fullDescription?: string;
  coverImage: string;
  images: string[];
  features?: string[];
  challenge?: string;
  solution?: string;
  status: 'completed' | 'in_progress' | 'planned';
  featured: boolean;
  order: number;
}

export interface PageContent {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  content: string;
  coverImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  active: boolean;
  updatedAt?: string;
}

export interface MediaItem {
  id: string;
  fileId: string;
  name: string;
  mimeType: string;
  size: number;
  webViewLink?: string;
  thumbnailLink?: string;
  downloadUrl?: string;
  driveFolderId?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  notes?: string;
}

export interface CompanyInfo {
  nameAr: string;
  nameEn: string;
  tagline: string;
  description: string;
  vision: string;
  mission: string;
  values: string[];
  address: string;
  city: string;
  country: string;
  phone: string;
  phoneSecondary?: string;
  whatsapp: string;
  email: string;
  emailSupport?: string;
  workingHours: string;
  mapEmbedUrl: string;
  crNumber: string;
  vatNumber: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    youtube?: string;
  };
}

export interface StatItem {
  id: string;
  number: number;
  suffix?: string;
  label: string;
  icon?: string;
}

export interface WhyUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface HomepageContent {
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroSecondaryCtaText: string;
  heroSecondaryCtaLink: string;
  heroBackgroundImage?: string;
  aboutBadge: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutYearsExperience: number;
  aboutCompletedProjects: number;
  aboutImage1?: string;
  aboutImage2?: string;
  stats: StatItem[];
  whyUs: WhyUsItem[];
  process: ProcessStep[];
  testimonials: Testimonial[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
  ctaButtonLink: string;
}

export interface SeoSettings {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string;
  ogImage: string;
  twitterCard: string;
}

export interface WebsiteSettings {
  siteName: string;
  maintenanceMode: boolean;
  contactEmail: string;
  notifyOnNewMessage: boolean;
  sheetsConnected: boolean;
  driveConnected: boolean;
}
