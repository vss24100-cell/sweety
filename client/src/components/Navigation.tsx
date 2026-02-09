import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#dancer", label: "The Dancer" },
  { href: "#athlete", label: "The Athlete" },
  { href: "#genius", label: "The Genius" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div 
            className="text-2xl font-bold font-display cursor-pointer text-gradient"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Sri Manasvini
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium tracking-wide hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 items-center">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-display font-medium text-foreground hover:text-primary"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
