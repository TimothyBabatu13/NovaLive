import { Link } from 'react-scroll';
import { Github, Twitter, Discord, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">NovaLive</h3>
            <p className="text-sm text-muted-foreground">
              Watch and stream live content with the world. A modern Twitch clone.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/explore" className="text-muted-foreground hover:text-foreground transition-colors">Explore</a></li>
              <li><a href="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
              <li><a href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="/press" className="text-muted-foreground hover:text-foreground transition-colors">Press</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <div className="flex space-x-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Discord className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NovaLive. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs text-muted-foreground">
            <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
