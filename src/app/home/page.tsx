
'use client';

import { modules } from '@/lib/modules';
import { ModuleCard } from '@/components/module-card';
import { useAppState } from '@/components/providers/app-state-provider';

export default function HomePage() {
  const { t } = useAppState();
  return (
    <div className="space-y-8 md:space-y-12">
      <div 
        className="text-center relative bg-cover bg-center bg-no-repeat py-20 md:py-28"
        style={{backgroundImage: "url('https://github.com/monika427/hostSilverConnectImages/blob/main/digitalExclusion.png?raw=true')"}}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white">{t('yourLearningPath')}</h1>
            <p className="mt-4 md:mt-6 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            {t('chooseModule')}
            </p>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {modules.map((module) => {
            return <ModuleCard key={module.slug} module={module} />;
            })}
        </div>
      </div>
    </div>
  );
}
