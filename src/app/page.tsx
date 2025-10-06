'use client';

import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAppState } from '@/components/providers/app-state-provider';

function RedirectHandler() {
  const router = useRouter();
  const { isReady, settings } = useAppState();

  useEffect(() => {
    if (isReady) {
      if (settings.onboardingComplete) {
        router.replace('/home');
      } else {
        router.replace('/onboarding');
      }
    }
  }, [isReady, settings.onboardingComplete, router]);

  return null;
}


export default function WelcomePage() {
  return (
    <Suspense fallback={null}>
      <main className="flex h-screen w-full flex-col items-center justify-center bg-background p-8 text-center">
        <div className="flex items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h1 className="text-4xl font-bold text-primary">Silver Connect</h1>
        </div>
        <p className="mt-4 text-lg text-muted-foreground">Loading your learning journey...</p>
        <RedirectHandler />
      </main>
    </Suspense>
  );
}
