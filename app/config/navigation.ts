import { PERMISSIONS } from './permissions';

export interface AdminNavLink {
  to: string;
  labelAr: string;
  labelEn: string;
  icon: string;
  permission?: string;
}

export interface PublicNavLink {
  to: string;
  labelAr: string;
  labelEn: string;
  icon?: string;
}

export const PUBLIC_NAV_LINKS: PublicNavLink[] = [
  { to: '/', labelAr: 'الرئيسية', labelEn: 'Home' },
  { to: '/about', labelAr: 'عن معراج التشييد', labelEn: 'About Us' },
  { to: '/services', labelAr: 'خدماتنا', labelEn: 'Services' },
  { to: '/projects', labelAr: 'أعمالنا ومشاريعنا', labelEn: 'Projects' },
  { to: '/contact', labelAr: 'اتصل بنا', labelEn: 'Contact Us' },
];

export const ADMIN_NAV_LINKS: AdminNavLink[] = [
  {
    to: '/admin',
    labelAr: 'نظرة عامة',
    labelEn: 'Overview',
    icon: 'pi pi-chart-pie',
    permission: PERMISSIONS.DASHBOARD_VIEW,
  },
  {
    to: '/admin/homepage',
    labelAr: 'محتوى الرئيسية',
    labelEn: 'Homepage',
    icon: 'pi pi-home',
    permission: PERMISSIONS.HOMEPAGE_MANAGE,
  },
  {
    to: '/admin/services',
    labelAr: 'الخدمات',
    labelEn: 'Services',
    icon: 'pi pi-briefcase',
    permission: PERMISSIONS.SERVICES_MANAGE,
  },
  {
    to: '/admin/projects',
    labelAr: 'المشاريع والأعمال',
    labelEn: 'Projects',
    icon: 'pi pi-building',
    permission: PERMISSIONS.PROJECTS_MANAGE,
  },
  {
    to: '/admin/pages',
    labelAr: 'الصفحات الثابتة',
    labelEn: 'Pages',
    icon: 'pi pi-file',
    permission: PERMISSIONS.PAGES_MANAGE,
  },
  {
    to: '/admin/company',
    labelAr: 'بيانات الشركة',
    labelEn: 'Company Profile',
    icon: 'pi pi-info-circle',
    permission: PERMISSIONS.COMPANY_MANAGE,
  },
  {
    to: '/admin/media',
    labelAr: 'مكتبة الوسائط & Drive',
    labelEn: 'Media & Drive',
    icon: 'pi pi-images',
    permission: PERMISSIONS.MEDIA_MANAGE,
  },
  {
    to: '/admin/messages',
    labelAr: 'رسائل التواصل',
    labelEn: 'Messages',
    icon: 'pi pi-envelope',
    permission: PERMISSIONS.MESSAGES_VIEW,
  },
  {
    to: '/admin/seo',
    labelAr: 'تهيئة محركات البحث (SEO)',
    labelEn: 'SEO Settings',
    icon: 'pi pi-search',
    permission: PERMISSIONS.SEO_MANAGE,
  },
  {
    to: '/admin/users',
    labelAr: 'المستخدمون والصلاحيات',
    labelEn: 'Users & Roles',
    icon: 'pi pi-users',
    permission: PERMISSIONS.USERS_MANAGE,
  },
  {
    to: '/admin/settings',
    labelAr: 'إعدادات الموقع والمزامنة',
    labelEn: 'Settings & Sync',
    icon: 'pi pi-cog',
    permission: PERMISSIONS.SETTINGS_MANAGE,
  },
];
