'use client';

import { useAppState } from './providers/app-state-provider';
import { getLessonsForModule } from '@/lib/modules';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from './ui/skeleton';

interface ModuleProgressProps {
    moduleSlug: string;
}

export function ModuleProgress({ moduleSlug }: ModuleProgressProps) {
    const { isLessonCompleted, t, isReady } = useAppState();
    
    if (!isReady) {
        return (
            <div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-10" />
                </div>
                <Skeleton className="mt-2 h-3 w-full" />
            </div>
        )
    }

    const lessons = getLessonsForModule(moduleSlug);
    const completedLessons = lessons.filter(lesson => isLessonCompleted(lesson.slug)).length;
    const progressPercentage = lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0;

    return (
        <>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{t('progress')}</span>
                <span>{completedLessons} / {lessons.length}</span>
            </div>
            <Progress value={progressPercentage} className="mt-2 h-3" />
        </>
    )
}
