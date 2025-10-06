import Header from '@/components/header';

export default function LessonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-6 md:py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
