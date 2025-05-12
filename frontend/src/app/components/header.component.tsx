import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur flex justify-center bg-[#C2EAF9] px-3">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo-removebg.png" className="w-10" alt="" />
            <span className="text-xl font-bold">Chris Dental Clinic</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="block md:hidden mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="/"
            className="text-sm font-medium hover:text-sky-600 transition-colors"
          >
            Home
          </a>
          <a
            href="/services"
            className="text-sm font-medium hover:text-sky-600 transition-colors"
          >
            Dashboard
          </a>
          <a
            href="/about"
            className="text-sm font-medium hover:text-sky-600 transition-colors"
          >
            Appointment
          </a>
          {/* <a
            href="/contact"
            className="text-sm font-medium hover:text-sky-600 transition-colors"
          >
            Book Appointment
          </a> */}
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <a href="/login">Login</a>
            </Button>
            <Button asChild className="bg-sky-600 hover:bg-sky-700" size="sm">
              <a href="/signup">Sign Up</a>
            </Button>
          </div>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <div className="container py-4 space-y-4">
              <a
                href="/"
                className="block text-sm font-medium hover:text-sky-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/services"
                className="block text-sm font-medium hover:text-sky-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="/about"
                className="block text-sm font-medium hover:text-sky-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
              <a
                href="/contact"
                className="block text-sm font-medium hover:text-sky-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="flex flex-col gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </a>
                </Button>
                <Button
                  asChild
                  className="bg-sky-600 hover:bg-sky-700"
                  size="sm"
                >
                  <a href="/signup" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
