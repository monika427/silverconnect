'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { useAppState } from './providers/app-state-provider';
import { Settings, Languages, Text, Contrast, RotateCcw } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
  DropdownMenuItem
} from './ui/dropdown-menu';
import type { Settings as AppSettings } from '@/lib/types';
import { useState } from 'react';
import { ResetProgressDialog } from './reset-progress-dialog';

const Logo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-primary"
  >
    <path
      d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.5 19.5C20.4431 20.9338 18.8602 21.9056 17.0723 22.2155C15.2844 22.5253 13.454 22.1481 11.944 21.166C10.434 20.1839 9.35853 18.6757 8.92134 16.9482C8.48415 15.2207 8.71963 13.3932 9.58579 11.8787"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


export default function Header() {
  const { settings, updateSettings, t } = useAppState();
  const [isResetDialogOpen, setResetDialogOpen] = useState(false);


  const handleSettingChange = (key: keyof AppSettings, value: string) => {
    updateSettings({ [key]: value });
  };

  return (
    <>
      <ResetProgressDialog isOpen={isResetDialogOpen} onOpenChange={setResetDialogOpen} />
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/home" className="flex items-center gap-3">
            <Logo />
            <span className="text-2xl font-bold text-primary">Silver Connect</span>
          </Link>
          <nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-6 w-6" />
                  <span className="sr-only">{t('settings')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{t('settings')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal text-muted-foreground flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    {t('language')}
                  </DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={settings.language}
                    onValueChange={(value) => handleSettingChange('language', value)}
                  >
                    <DropdownMenuRadioItem value="en">{t('english')}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="np">{t('nepali')}</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal text-muted-foreground flex items-center gap-2">
                    <Text className="h-4 w-4" />
                    {t('textSize')}
                  </DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={settings.textSize}
                    onValueChange={(value) => handleSettingChange('textSize', value)}
                  >
                    <DropdownMenuRadioItem value="normal">{t('normal')}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="large">{t('large')}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="xlarge">{t('xlarge')}</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal text-muted-foreground flex items-center gap-2">
                    <Contrast className="h-4 w-4" />
                    {t('contrast')}
                  </DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={settings.contrast}
                    onValueChange={(value) => handleSettingChange('contrast', value)}
                  >
                    <DropdownMenuRadioItem value="normal">{t('normal')}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="high">{t('highContrast')}</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onSelect={() => setResetDialogOpen(true)}
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {t('resetProgress')}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>
    </>
  );
}
