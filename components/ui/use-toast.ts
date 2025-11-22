import { toast as sonnerToast } from 'sonner';

export function toast(options: {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}) {
  if (options.variant === 'destructive') {
    sonnerToast.error(options.title, {
      description: options.description,
    });
  } else {
    sonnerToast(options.title, {
      description: options.description,
    });
  }
}
