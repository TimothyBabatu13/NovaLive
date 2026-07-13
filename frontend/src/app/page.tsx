import { HeroSection } from '@/components/hero-section';
import { FeaturedStreams } from '@/components/featured-streams';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-background">
        <HeroSection />
        <FeaturedStreams />
      </main>
      <Footer />
    </>
  );
}
