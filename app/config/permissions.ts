import type { UserRole } from '~/types';

export const PERMISSIONS = {
  DASHBOARD_VIEW: 'dashboard:view',
  PAGES_MANAGE: 'pages:manage',
  HOMEPAGE_MANAGE: 'homepage:manage',
  PROJECTS_MANAGE: 'projects:manage',
  SERVICES_MANAGE: 'services:manage',
  COMPANY_MANAGE: 'company:manage',
  MEDIA_MANAGE: 'media:manage',
  MESSAGES_VIEW: 'messages:view',
  MESSAGES_MANAGE: 'messages:manage',
  SEO_MANAGE: 'seo:manage',
  SETTINGS_MANAGE: 'settings:manage',
  USERS_MANAGE: 'users:manage',
  ROLES_MANAGE: 'roles:manage',
} as const;

export type PermissionKey = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<UserRole, PermissionKey[]> = {
  super_admin: Object.values(PERMISSIONS),
  admin: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.PAGES_MANAGE,
    PERMISSIONS.HOMEPAGE_MANAGE,
    PERMISSIONS.PROJECTS_MANAGE,
    PERMISSIONS.SERVICES_MANAGE,
    PERMISSIONS.COMPANY_MANAGE,
    PERMISSIONS.MEDIA_MANAGE,
    PERMISSIONS.MESSAGES_VIEW,
    PERMISSIONS.MESSAGES_MANAGE,
    PERMISSIONS.SEO_MANAGE,
    PERMISSIONS.SETTINGS_MANAGE,
  ],
  editor: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.PAGES_MANAGE,
    PERMISSIONS.HOMEPAGE_MANAGE,
    PERMISSIONS.PROJECTS_MANAGE,
    PERMISSIONS.SERVICES_MANAGE,
    PERMISSIONS.MEDIA_MANAGE,
    PERMISSIONS.MESSAGES_VIEW,
  ],
};

export function hasPermission(role: UserRole | undefined, permission: PermissionKey): boolean {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}
