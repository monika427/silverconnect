'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAppState } from './providers/app-state-provider';
import { useToast } from '@/hooks/use-toast';

interface ResetProgressDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ResetProgressDialog({ isOpen, onOpenChange }: ResetProgressDialogProps) {
  const { resetProgress, t } = useAppState();
  const { toast } = useToast();

  const handleReset = () => {
    resetProgress();
    toast({
      title: t('resetSuccessToast'),
    });
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('resetDialogTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('resetDialogDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('resetDialogCancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleReset} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {t('resetDialogConfirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
