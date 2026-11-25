export function useFormatters() {
  const { locale } = useI18n();

  const formatDate = (dateInput?: string | Date | null, format = 'medium'): string => {
    if (!dateInput) return '-';
    try {
      const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
      if (isNaN(date.getTime())) return String(dateInput);

      return new Intl.DateTimeFormat(locale.value === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: format === 'short' ? 'numeric' : 'long',
        day: 'numeric',
      }).format(date);
    } catch {
      return String(dateInput);
    }
  };

  const formatNumber = (val?: number | string | null): string => {
    if (val === null || val === undefined || val === '') return '0';
    const num = Number(val);
    if (isNaN(num)) return String(val);
    return new Intl.NumberFormat(locale.value === 'ar' ? 'ar-SA' : 'en-US').format(num);
  };

  const formatCurrency = (val?: number | string | null, currency = 'SAR'): string => {
    if (val === null || val === undefined || val === '') return '-';
    const num = Number(val);
    if (isNaN(num)) return String(val);

    return new Intl.NumberFormat(locale.value === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const slugify = (text: string): string => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u0621-\u064A-]+/g, '')
      .replace(/--+/g, '-');
  };

  return {
    formatDate,
    formatNumber,
    formatCurrency,
    formatFileSize,
    slugify,
  };
}
