'use client';

import { useRouter } from 'next/navigation';
import { useAppState } from '@/components/providers/app-state-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Settings } from '@/lib/types';
import { Languages, Text, Contrast } from 'lucide-react';
import React, { useEffect } from 'react';

export default function OnboardingPage() {
  const { settings, updateSettings, t, isReady } = useAppState();
  const router = useRouter();

  useEffect(() => {
    if (isReady && settings.onboardingComplete) {
      router.replace('/home');
    }
  }, [isReady, settings.onboardingComplete, router]);

  const handleSettingChange = (key: keyof Settings, value: string) => {
    updateSettings({ [key]: value });
  };

  const handleStart = async () => {
    await updateSettings({ onboardingComplete: true });
  };
  
  if (!isReady) {
    return null;
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl shadow-2xl rounded-2xl">
        <CardHeader className="text-center p-6 md:p-8">
          <CardTitle className="text-3xl md:text-4xl font-bold">{t('welcome')}</CardTitle>
          <CardDescription className="text-base md:text-lg text-muted-foreground mt-2">{t('setupComfort')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 md:space-y-8 p-6 md:p-8 pt-0">
          <div className="space-y-3">
            <h3 className="flex items-center gap-3 text-lg md:text-xl font-semibold"><Languages className="text-primary h-6 w-6"/> {t('language')}</h3>
            <RadioGroup
              defaultValue={settings.language}
              onValueChange={(value) => handleSettingChange('language', value as 'en' | 'np')}
              className="flex gap-4 pt-1"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="en" id="lang-en" />
                <Label htmlFor="lang-en" className="text-lg cursor-pointer">{t('english')}</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="np" id="lang-np" />
                <Label htmlFor="lang-np" className="text-lg cursor-pointer">{t('nepali')}</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <h3 className="flex items-center gap-3 text-lg md:text-xl font-semibold"><Text className="text-primary h-6 w-6"/> {t('textSize')}</h3>
            <RadioGroup
              defaultValue={settings.textSize}
              onValueChange={(value) => handleSettingChange('textSize', value as 'normal' | 'large' | 'xlarge')}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1"
            >
              <div>
                <RadioGroupItem value="normal" id="size-normal" className="peer sr-only" />
                <Label htmlFor="size-normal" className="flex items-center justify-center cursor-pointer rounded-lg border-2 border-muted bg-popover p-4 text-center text-base md:text-lg hover:bg-accent hover:border-primary focus:outline-none peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-colors">
                  {t('normal')}
                </Label>
              </div>
              <div>
                <RadioGroupItem value="large" id="size-large" className="peer sr-only" />
                <Label htmlFor="size-large" className="flex items-center justify-center cursor-pointer rounded-lg border-2 border-muted bg-popover p-4 text-center text-lg md:text-xl hover:bg-accent hover:border-primary focus:outline-none peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-colors">
                  {t('large')}
                </Label>
              </div>
              <div>
                <RadioGroupItem value="xlarge" id="size-xlarge" className="peer sr-only" />
                <Label htmlFor="size-xlarge" className="flex items-center justify-center cursor-pointer rounded-lg border-2 border-muted bg-popover p-4 text-center text-xl md:text-2xl hover:bg-accent hover:border-primary focus:outline-none peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-colors">
                  {t('xlarge')}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <h3 className="flex items-center gap-3 text-lg md:text-xl font-semibold"><Contrast className="text-primary h-6 w-6"/> {t('contrast')}</h3>
            <RadioGroup
              defaultValue={settings.contrast}
              onValueChange={(value) => handleSettingChange('contrast', value as 'normal' | 'high')}
              className="flex gap-4 pt-1"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="normal" id="contrast-normal" />
                <Label htmlFor="contrast-normal" className="text-lg cursor-pointer">{t('normal')}</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="high" id="contrast-high" />
                <Label htmlFor="contrast-high" className="text-lg cursor-pointer">{t('highContrast')}</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="p-6 md:p-8 pt-0">
          <Button onClick={handleStart} className="w-full text-lg md:text-xl py-5 md:py-6" size="lg">
            {t('startLearning')}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
