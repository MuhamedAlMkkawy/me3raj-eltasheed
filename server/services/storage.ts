import fs from 'node:fs';
import path from 'node:path';
import { getInitialData } from '../data/initialData';
import { getSheetData, updateSheetData, appendSheetRow } from './googleSheets';
import type {
  Project,
  Service,
  PageContent,
  CompanyInfo,
  HomepageContent,
  ContactMessage,
  User,
  SeoSettings,
  WebsiteSettings,
  MediaItem,
} from '~/types';

interface DatabaseSchema {
  users: Array<User & { passwordHash: string }>;
  company: CompanyInfo;
  services: Service[];
  projects: Project[];
  homepage: HomepageContent;
  pages: PageContent[];
  messages: ContactMessage[];
  media: MediaItem[];
  seo: SeoSettings;
  settings: WebsiteSettings;
}

let dbInstance: DatabaseSchema | null = null;
const DATA_DIR = path.resolve(process.cwd(), 'server/data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

function initDb(): DatabaseSchema {
  if (dbInstance) return dbInstance;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      const fileData = fs.readFileSync(DB_FILE, 'utf-8');
      dbInstance = JSON.parse(fileData);
      return dbInstance!;
    }
  } catch (err) {
    console.error('[Storage] Error reading db.json, falling back to initial data:', err);
  }

  const initial = getInitialData();
  dbInstance = initial;
  saveDbToDisk();
  return dbInstance;
}

function saveDbToDisk(): void {
  if (!dbInstance) return;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(dbInstance, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Storage] Error writing db.json:', err);
  }
}

// -------------------------------------------------------------
// HOMEPAGE
// -------------------------------------------------------------
export async function getHomepageData(): Promise<HomepageContent> {
  const db = initDb();
  return db.homepage;
}

export async function saveHomepageData(data: Partial<HomepageContent>): Promise<HomepageContent> {
  const db = initDb();
  db.homepage = { ...db.homepage, ...data };
  saveDbToDisk();

  // Try sync with Google Sheets if configured
  try {
    await updateSheetData('Homepage!A1', [[JSON.stringify(db.homepage)]]);
  } catch {}

  return db.homepage;
}

// -------------------------------------------------------------
// COMPANY INFO
// -------------------------------------------------------------
export async function getCompanyData(): Promise<CompanyInfo> {
  const db = initDb();
  return db.company;
}

export async function saveCompanyData(data: Partial<CompanyInfo>): Promise<CompanyInfo> {
  const db = initDb();
  db.company = { ...db.company, ...data };
  saveDbToDisk();

  try {
    await updateSheetData('CompanyInfo!A1', [[JSON.stringify(db.company)]]);
  } catch {}

  return db.company;
}

// -------------------------------------------------------------
// SERVICES
// -------------------------------------------------------------
export async function getServicesList(): Promise<Service[]> {
  const db = initDb();
  return db.services.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const db = initDb();
  return db.services.find((s) => s.slug === slug || s.id === slug) || null;
}

export async function saveServiceItem(item: Partial<Service>): Promise<Service> {
  const db = initDb();
  const id = item.id || `srv_${Date.now()}`;
  const existingIndex = db.services.findIndex((s) => s.id === id);

  const fullItem: Service = {
    id,
    title: item.title || '',
    slug: item.slug || `service-${Date.now()}`,
    icon: item.icon || 'pi pi-briefcase',
    shortDescription: item.shortDescription || '',
    fullDescription: item.fullDescription || '',
    coverImage: item.coverImage || '',
    features: item.features || [],
    order: item.order !== undefined ? item.order : db.services.length + 1,
    active: item.active !== undefined ? item.active : true,
  };

  if (existingIndex >= 0) {
    db.services[existingIndex] = { ...db.services[existingIndex], ...fullItem };
  } else {
    db.services.push(fullItem);
  }

  saveDbToDisk();
  return fullItem;
}

export async function deleteServiceItem(id: string): Promise<boolean> {
  const db = initDb();
  const initialLength = db.services.length;
  db.services = db.services.filter((s) => s.id !== id);
  if (db.services.length !== initialLength) {
    saveDbToDisk();
    return true;
  }
  return false;
}

// -------------------------------------------------------------
// PROJECTS
// -------------------------------------------------------------
export async function getProjectsList(): Promise<Project[]> {
  const db = initDb();
  return db.projects.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getProjectById(idOrSlug: string): Promise<Project | null> {
  const db = initDb();
  return db.projects.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || null;
}

export async function saveProjectItem(item: Partial<Project>): Promise<Project> {
  const db = initDb();
  const id = item.id || `prj_${Date.now()}`;
  const existingIndex = db.projects.findIndex((p) => p.id === id);

  const fullItem: Project = {
    id,
    title: item.title || '',
    slug: item.slug || `project-${Date.now()}`,
    category: item.category || 'عام',
    client: item.client || '',
    location: item.location || '',
    year: item.year || `${new Date().getFullYear()}`,
    area: item.area || '',
    cost: item.cost || '',
    duration: item.duration || '',
    description: item.description || '',
    fullDescription: item.fullDescription || '',
    coverImage: item.coverImage || '',
    images: item.images && item.images.length > 0 ? item.images : [item.coverImage || ''],
    features: item.features || [],
    challenge: item.challenge || '',
    solution: item.solution || '',
    status: item.status || 'completed',
    featured: item.featured !== undefined ? item.featured : false,
    order: item.order !== undefined ? item.order : db.projects.length + 1,
  };

  if (existingIndex >= 0) {
    db.projects[existingIndex] = { ...db.projects[existingIndex], ...fullItem };
  } else {
    db.projects.push(fullItem);
  }

  saveDbToDisk();
  return fullItem;
}

export async function deleteProjectItem(id: string): Promise<boolean> {
  const db = initDb();
  const initialLength = db.projects.length;
  db.projects = db.projects.filter((p) => p.id !== id);
  if (db.projects.length !== initialLength) {
    saveDbToDisk();
    return true;
  }
  return false;
}

// -------------------------------------------------------------
// PAGES
// -------------------------------------------------------------
export async function getPagesList(): Promise<PageContent[]> {
  const db = initDb();
  return db.pages;
}

export async function getPageBySlug(slug: string): Promise<PageContent | null> {
  const db = initDb();
  return db.pages.find((p) => p.slug === slug || p.id === slug) || null;
}

export async function savePageItem(item: Partial<PageContent>): Promise<PageContent> {
  const db = initDb();
  const id = item.id || `pg_${Date.now()}`;
  const existingIndex = db.pages.findIndex((p) => p.id === id);

  const fullItem: PageContent = {
    id,
    slug: item.slug || `page-${Date.now()}`,
    title: item.title || '',
    subtitle: item.subtitle || '',
    content: item.content || '',
    coverImage: item.coverImage || '',
    metaTitle: item.metaTitle || item.title || '',
    metaDescription: item.metaDescription || '',
    active: item.active !== undefined ? item.active : true,
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    db.pages[existingIndex] = { ...db.pages[existingIndex], ...fullItem };
  } else {
    db.pages.push(fullItem);
  }

  saveDbToDisk();
  return fullItem;
}

export async function deletePageItem(id: string): Promise<boolean> {
  const db = initDb();
  const initialLength = db.pages.length;
  db.pages = db.pages.filter((p) => p.id !== id);
  if (db.pages.length !== initialLength) {
    saveDbToDisk();
    return true;
  }
  return false;
}

// -------------------------------------------------------------
// CONTACT MESSAGES
// -------------------------------------------------------------
export async function getMessagesList(): Promise<ContactMessage[]> {
  const db = initDb();
  return [...db.messages].reverse();
}

export async function addContactMessage(message: Omit<ContactMessage, 'id' | 'date' | 'status'>): Promise<ContactMessage> {
  const db = initDb();
  const fullItem: ContactMessage = {
    ...message,
    id: `msg_${Date.now()}`,
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: 'new',
  };

  db.messages.push(fullItem);
  saveDbToDisk();

  // Try appending to Google Sheets
  try {
    await appendSheetRow('Messages!A1', [
      fullItem.id,
      fullItem.date,
      fullItem.name,
      fullItem.email,
      fullItem.phone,
      fullItem.company || '',
      fullItem.service || '',
      fullItem.subject,
      fullItem.message,
      fullItem.status,
    ]);
  } catch {}

  return fullItem;
}

export async function updateMessage(id: string, updates: Partial<ContactMessage>): Promise<ContactMessage | null> {
  const db = initDb();
  const item = db.messages.find((m) => m.id === id);
  if (!item) return null;

  Object.assign(item, updates);
  saveDbToDisk();
  return item;
}

export async function deleteMessage(id: string): Promise<boolean> {
  const db = initDb();
  const initialLength = db.messages.length;
  db.messages = db.messages.filter((m) => m.id !== id);
  if (db.messages.length !== initialLength) {
    saveDbToDisk();
    return true;
  }
  return false;
}

// -------------------------------------------------------------
// MEDIA LIBRARY
// -------------------------------------------------------------
export async function getMediaList(): Promise<MediaItem[]> {
  const db = initDb();
  return [...db.media].reverse();
}

export async function saveMediaItem(item: MediaItem): Promise<MediaItem> {
  const db = initDb();
  const existing = db.media.find((m) => m.id === item.id || m.fileId === item.fileId);
  if (existing) {
    Object.assign(existing, item);
  } else {
    db.media.push(item);
  }
  saveDbToDisk();
  return item;
}

export async function deleteMediaItem(id: string): Promise<boolean> {
  const db = initDb();
  const initialLength = db.media.length;
  db.media = db.media.filter((m) => m.id !== id && m.fileId !== id);
  if (db.media.length !== initialLength) {
    saveDbToDisk();
    return true;
  }
  return false;
}

// -------------------------------------------------------------
// USERS & ROLES
// -------------------------------------------------------------
export async function getUsersList(): Promise<User[]> {
  const db = initDb();
  return db.users.map(({ passwordHash, ...user }) => user);
}

export async function getUserByEmailWithPassword(email: string): Promise<(User & { passwordHash: string }) | null> {
  const db = initDb();
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function getUserById(id: string): Promise<User | null> {
  const db = initDb();
  const found = db.users.find((u) => u.id === id);
  if (!found) return null;
  const { passwordHash, ...user } = found;
  return user;
}

export async function saveUserItem(
  user: Partial<User> & { password?: string }
): Promise<User> {
  const db = initDb();
  const id = user.id || `usr_${Date.now()}`;
  const existingIndex = db.users.findIndex((u) => u.id === id);

  let passwordHash = '';
  if (user.password) {
    const { hashPassword } = await import('../utils/auth');
    passwordHash = hashPassword(user.password);
  }

  if (existingIndex >= 0) {
    const existing = db.users[existingIndex];
    db.users[existingIndex] = {
      ...existing,
      ...user,
      passwordHash: passwordHash || existing.passwordHash,
    };
    saveDbToDisk();
    const { passwordHash: _, ...cleanUser } = db.users[existingIndex];
    return cleanUser;
  } else {
    const newUser = {
      id,
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'editor',
      active: user.active !== undefined ? user.active : true,
      passwordHash: passwordHash || (await import('../utils/auth')).hashPassword('Admin@123456'),
      createdAt: new Date().toISOString(),
    };
    db.users.push(newUser);
    saveDbToDisk();
    const { passwordHash: _, ...cleanUser } = newUser;
    return cleanUser;
  }
}

export async function deleteUserItem(id: string): Promise<boolean> {
  const db = initDb();
  const user = db.users.find((u) => u.id === id);
  if (user?.role === 'super_admin') {
    return false; // Cannot delete super admin
  }
  const initialLength = db.users.length;
  db.users = db.users.filter((u) => u.id !== id);
  if (db.users.length !== initialLength) {
    saveDbToDisk();
    return true;
  }
  return false;
}

// -------------------------------------------------------------
// SEO & SETTINGS
// -------------------------------------------------------------
export async function getSeoSettings(): Promise<SeoSettings> {
  const db = initDb();
  return db.seo;
}

export async function saveSeoSettings(data: Partial<SeoSettings>): Promise<SeoSettings> {
  const db = initDb();
  db.seo = { ...db.seo, ...data };
  saveDbToDisk();
  return db.seo;
}

export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  const db = initDb();
  return db.settings;
}

export async function saveWebsiteSettings(data: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
  const db = initDb();
  db.settings = { ...db.settings, ...data };
  saveDbToDisk();
  return db.settings;
}

// -------------------------------------------------------------
// DASHBOARD STATS
// -------------------------------------------------------------
export async function getDashboardOverviewStats() {
  const db = initDb();
  const newMessages = db.messages.filter((m) => m.status === 'new').length;
  const activeProjects = db.projects.filter((p) => p.status === 'in_progress').length;
  const completedProjects = db.projects.filter((p) => p.status === 'completed').length;

  return {
    projectsCount: db.projects.length,
    activeProjects,
    completedProjects,
    servicesCount: db.services.length,
    messagesCount: db.messages.length,
    newMessagesCount: newMessages,
    mediaCount: db.media.length,
    usersCount: db.users.length,
    recentMessages: db.messages.slice(-5).reverse(),
    recentProjects: db.projects.slice(0, 5),
  };
}
