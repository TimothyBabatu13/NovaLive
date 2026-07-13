import Link from 'next/link';
import { SearchIcon, MenuIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">NovaLive</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/explore" className="text-sm font-medium hover:text-primary transition-colors">
            Explore
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/streaming" className="text-sm font-medium hover:text-primary transition-colors">
            Go Live
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[240px] pl-8"
              />
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>

          <Button variant="ghost" size="icon">
            <UserIcon className="h-4 w-4" />
            <span className="sr-only">Open user menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
