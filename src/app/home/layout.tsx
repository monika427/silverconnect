import Header from '@/components/header';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
}
