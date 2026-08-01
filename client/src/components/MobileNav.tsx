/*
 * TAKAM — Mobile Navigation Component
 * Hamburger menu for mobile screens, sticker-bomb themed
 */
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

interface MobileNavProps {
  phone: string;
}

export function MobileNav({ phone }: MobileNavProps) {
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
              href="#menu"
              onClick={closeMenu}
              className="font-display font-bold text-lg hover:underline decoration-[3px] decoration-mascot underline-offset-4"
            >
              खायला काय? 🍽️
            </a>
            <a
              href="#story"
              onClick={closeMenu}
              className="font-display font-bold text-lg hover:underline decoration-[3px] decoration-mint underline-offset-4"
            >
              आमची गोष्ट
            </a>
            <a
              href="#order"
              onClick={closeMenu}
              className="font-display font-bold text-lg hover:underline decoration-[3px] decoration-peach underline-offset-4"
            >
              भूक लागली?
            </a>
            <Link
              href="/catalog"
              onClick={closeMenu}
              className="font-display font-bold text-lg hover:underline decoration-[3px] decoration-mascot underline-offset-4"
            >
              Catalog 📋
            </Link>
            <div className="pt-2 border-t-2 border-ink/10">
              <a
                href={`tel:${phone}`}
                className="sticker-btn bg-tomato text-primary-foreground px-5 py-2 text-sm flex items-center gap-2 -rotate-1 w-full justify-center"
              >
                📞 Call करा
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
