import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="w-full py-20 lg:py-32 xl:py-48 px-4 md:px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Watch. Stream. Connect.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground sm:text-xl md:text-2xl">
          NovaLive is the next generation live streaming platform. Watch your favorite creators
          or go live and share your passion with the world.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/explore">
            <Button size="lg" className="w-full sm:w-auto">
              Explore Streams
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
