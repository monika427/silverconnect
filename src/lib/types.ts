import type { LucideIcon } from 'lucide-react';

export type Step = {
  title: string;
  content: string;
  image?: string;
};

export type Lesson = {
  slug: string;
  moduleSlug: string;
  title: string;
  description: string;
  steps: Step[];
};

export type Module = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Settings = {
  language: 'en' | 'np';
  textSize: 'normal' | 'large' | 'xlarge';
  contrast: 'normal' | 'high';
  onboardingComplete: boolean;
};

export type Progress = {
  completedLessons: string[];
};
