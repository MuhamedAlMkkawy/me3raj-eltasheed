export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  // Public data
  PUBLIC: {
    HOMEPAGE: '/api/public/homepage',
    COMPANY_INFO: '/api/public/company',
    SERVICES: '/api/public/services',
    SERVICE_BY_SLUG: (slug: string) => `/api/public/services/${slug}`,
    PROJECTS: '/api/public/projects',
    PROJECT_BY_ID: (id: string) => `/api/public/projects/${id}`,
    PAGES: '/api/public/pages',
    PAGE_BY_SLUG: (slug: string) => `/api/public/pages/${slug}`,
    CONTACT_SUBMIT: '/api/public/contact',
  },
  // Admin CMS CRUD
  ADMIN: {
    DASHBOARD_STATS: '/api/admin/dashboard/stats',
    HOMEPAGE: '/api/admin/homepage',
    COMPANY_INFO: '/api/admin/company',
    SERVICES: '/api/admin/services',
    SERVICE_ITEM: (id: string) => `/api/admin/services/${id}`,
    PROJECTS: '/api/admin/projects',
    PROJECT_ITEM: (id: string) => `/api/admin/projects/${id}`,
    PAGES: '/api/admin/pages',
    PAGE_ITEM: (id: string) => `/api/admin/pages/${id}`,
    MEDIA: '/api/admin/media',
    MEDIA_ITEM: (id: string) => `/api/admin/media/${id}`,
    MEDIA_UPLOAD: '/api/admin/media/upload',
    MESSAGES: '/api/admin/messages',
    MESSAGE_ITEM: (id: string) => `/api/admin/messages/${id}`,
    USERS: '/api/admin/users',
    USER_ITEM: (id: string) => `/api/admin/users/${id}`,
    SEO: '/api/admin/seo',
    SETTINGS: '/api/admin/settings',
    SYNC_SHEETS: '/api/admin/sync/sheets',
    SYNC_DRIVE: '/api/admin/sync/drive',
  },
} as const;
