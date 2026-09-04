/*
 * TAKAM - Mobile Navigation Component
 * Hamburger menu for mobile screens, sticker-bomb themed
 */
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-cream/50 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-cream border-b-[3px] border-ink shadow-lg z-40">
          <nav className="container py-4 space-y-3 flex flex-col">
            <a
              href="/#story"
              onClick={closeMenu}
              className="font-display font-bold text-lg hover:underline decoration-[3px] decoration-mint underline-offset-4"
            >
              आमची गोष्ट
            </a>
            <Link
              href="/ganapati-modak-special"
              onClick={closeMenu}
              className="font-display font-bold text-lg hover:underline decoration-[3px] decoration-peach underline-offset-4"
            >
              गणपती Special 🙏
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
