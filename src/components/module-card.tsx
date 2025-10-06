import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { getLessonsForModule } from '@/lib/modules';
import type { Module } from '@/lib/types';
import { ModuleProgress } from './module-progress';
import { useAppState } from './providers/app-state-provider';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const { t } = useAppState();
  const lessons = getLessonsForModule(module.slug);
  const Icon = module.icon;

  return (
    <Card className="flex h-full flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl border-border/20 hover:border-primary/50 hover:-translate-y-1 bg-gradient-to-br from-card to-secondary/40">
      <CardHeader className="p-6">
        <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
            <Icon className="h-9 w-9" />
            </div>
            <CardTitle className="text-2xl font-bold leading-tight">{t(`module_${module.slug}_title`)}</CardTitle>
        </div>
        <CardDescription className="text-base mt-4 h-12">{t(`module_${module.slug}_description`)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <ModuleProgress moduleSlug={module.slug} />
      </CardContent>
      <CardFooter className="p-6 pt-4 mt-auto">
         <Link href={`/lessons/${lessons[0]?.slug || ''}`} className="w-full">
            <Button className="w-full text-lg py-6" size="lg">
                {t('startLearning')} <ArrowRight className="ml-2" />
            </Button>
         </Link>
      </CardFooter>
    </Card>
  );
}
