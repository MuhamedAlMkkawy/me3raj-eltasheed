import { useConfirm } from "primevue/useconfirm";

export interface ConfirmActionOptions {
  message?: string;
  header?: string;
  icon?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptClass?: string;
  rejectClass?: string;
  onAccept: () => void | Promise<void>;
  onReject?: () => void;
}

export function useConfirmAction() {
  const confirm = useConfirm();
  const { t } = useI18n();

  const requireConfirmation = (options: ConfirmActionOptions) => {
    confirm.require({
      message: options.message || t('common.confirm_message', 'هل أنت متأكد من تنفيذ هذا الإجراء؟'),
      header: options.header || t('common.confirm_title', 'تأكيد العملية'),
      icon: options.icon || 'pi pi-exclamation-triangle text-amber-500',
      acceptLabel: options.acceptLabel || t('common.yes_confirm', 'نعم، تأكيد'),
      rejectLabel: options.rejectLabel || t('common.cancel', 'إلغاء'),
      acceptProps: {
        severity: 'danger',
        class: options.acceptClass || 'p-button-danger',
      },
      rejectProps: {
        severity: 'secondary',
        variant: 'outlined',
        class: options.rejectClass || 'p-button-secondary',
      },
      accept: options.onAccept,
      reject: options.onReject,
    });
  };

  return {
    requireConfirmation,
  };
}
