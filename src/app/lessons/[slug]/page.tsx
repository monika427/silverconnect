
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { getLesson, lessons, modules } from '@/lib/modules';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppState } from '@/components/providers/app-state-provider';
import { PracticeDialog } from '@/components/practice-dialog';
import { ArrowLeft, ArrowRight, CheckCircle, Circle, Hand, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import type { Lesson } from '@/lib/types';

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const { toast } = useToast();
  const { t } = useAppState();

  const [lesson, setLesson] = useState<Lesson | undefined | null>(undefined);
  const { completeLesson, isLessonCompleted } = useAppState();

  const [currentStep, setCurrentStep] = useState(0);
  const [isPracticeOpen, setPracticeOpen] = useState(false);

  useEffect(() => {
    const lessonData = getLesson(slug);
    setLesson(lessonData);
    setCurrentStep(0); // Reset step when lesson changes
  }, [slug]);

  if (lesson === undefined) {
    return (
        <div className="flex flex-col items-center justify-center text-center h-96">
            <h1 className="text-2xl font-bold">{t('loadingJourney')}</h1>
        </div>
    )
  }

  if (lesson === null) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-96">
        <h1 className="text-2xl font-bold">{t('lessonNotFound')}</h1>
        <p className="mt-2 text-muted-foreground">{t('lessonNotExist')}</p>
        <Link href="/home">
            <Button className="mt-6">
                <Home className="mr-2"/>
                {t('backToHome')}
            </Button>
        </Link>
      </div>
    );
  }

  const lessonIndex = lessons.findIndex(l => l.slug === slug);
  const nextLesson = lessonIndex !== -1 && lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;
  const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;

  const handleNext = () => {
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (nextLesson) {
      router.push(`/lessons/${nextLesson.slug}`);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (prevLesson) {
        router.push(`/lessons/${prevLesson.slug}`);
    }
  };

  const handleComplete = () => {
    completeLesson(lesson.slug);
    toast({
      title: t('lessonComplete'),
      description: t('lessonCompleteDesc'),
      variant: "default",
    });
  };
  
  const step = lesson.steps[currentStep];
  const isLastStep = currentStep === lesson.steps.length - 1;
  const isCompleted = isLessonCompleted(lesson.slug);
  const module = modules.find(m => m.slug === lesson.moduleSlug);

  if (!step) {
     return (
      <div className="flex flex-col items-center justify-center text-center h-96">
        <h1 className="text-2xl font-bold">{t('lessonNotFound')}</h1>
        <p className="mt-2 text-muted-foreground">{t('lessonNotExist')}</p>
        <Link href="/home">
            <Button className="mt-6">
                <Home className="mr-2"/>
                {t('backToHome')}
            </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <PracticeDialog isOpen={isPracticeOpen} onOpenChange={setPracticeOpen} lesson={lesson} />
      
      <div className="mb-6 md:mb-8 text-center">
        <p className="text-primary font-semibold">{module ? t(`module_${module.slug}_title`) : lesson.moduleSlug}</p>
        <h1 className="text-3xl md:text-5xl font-bold">{t(`lesson_${lesson.slug}_title`)}</h1>
      </div>

      <Card key={slug} className="overflow-hidden shadow-xl rounded-xl">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-2xl md:text-3xl">{t(`lesson_${lesson.slug}_step_${currentStep}_title`)}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0">
          {step.image && (
            <div className="relative w-full h-48 md:h-72 rounded-lg overflow-hidden border">
                <Image
                  src={step.image}
                  alt={t(`lesson_${lesson.slug}_step_${currentStep}_title`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
          )}
          <p className="text-base md:text-xl leading-relaxed">{t(`lesson_${lesson.slug}_step_${currentStep}_content`)}</p>

          {isLastStep && (
            <div className="mt-6 md:mt-8 p-4 md:p-6 bg-accent/20 rounded-lg">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">{t('reachedEnd')}</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="flex-1 text-base md:text-lg" onClick={() => setPracticeOpen(true)}>
                        <Hand className="mr-2"/> {isCompleted ? t('practiceAgain') : t('practice')}
                    </Button>
                    {!isCompleted ? (
                        <Button size="lg" className="flex-1 text-base md:text-lg bg-green-600 hover:bg-green-700" onClick={handleComplete}>
                            <CheckCircle className="mr-2"/> {t('markAsComplete')}
                        </Button>
                    ) : (
                         <Alert className="border-green-500 bg-green-50 text-green-800 flex-1">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <AlertTitle className="font-bold">{t('completed')}</AlertTitle>
                            <AlertDescription>
                                {t('alreadyCompleted')}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mt-6 md:mt-8 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2 flex-wrap">
            {lesson.steps.map((_, index) => (
                <button key={index} onClick={() => setCurrentStep(index)} className="p-1 rounded-full transition-colors">
                {index === currentStep ? (
                    <CheckCircle className="w-5 h-5 text-primary" />
                ) : (
                    <Circle className="w-5 h-5 text-muted-foreground/30 hover:text-muted-foreground/60" />
                )}
                </button>
            ))}
        </div>
        <div className="flex items-center justify-center gap-4 w-full">
            <Button variant="outline" size="lg" onClick={handlePrev} disabled={currentStep === 0 && !prevLesson}>
                <ArrowLeft className="mr-2 h-4 w-4" /> {t('previous')}
            </Button>
            <Button size="lg" onClick={handleNext} disabled={isLastStep && !nextLesson}>
                {t('next')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </div>

    </div>
  );
}
