import { Facebook, Instagram, SmileIcon as Tooth, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col gap-6 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <a href="/" className="flex items-center gap-2">
              <Tooth className="h-6 w-6 text-sky-600" />
              <span className="text-xl font-bold">Chris Dental Clinic</span>
            </a>
            <p className="text-sm text-muted-foreground">
              Providing exceptional dental care for your entire family since
              2005.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Quick as</h3>
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-sky-600 transition-colors"
            >
              Home
            </a>
            <a
              href="/services"
              className="text-sm text-muted-foreground hover:text-sky-600 transition-colors"
            >
              Services
            </a>
            <a
              href="/about"
              className="text-sm text-muted-foreground hover:text-sky-600 transition-colors"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="text-sm text-muted-foreground hover:text-sky-600 transition-colors"
            >
              Contact
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Services</h3>
            <a
              href="/services/preventive"
              className="text-sm text-muted-foreground hover:text-sky-600 transition-colors"
            >
              Preventive Care
            </a>
            <a
              href="/services/restorative"
              className="text-sm text-muted-foreground hover:text-sky-600 transition-colors"
            >
              Restorative Dentistry
            </a>
            <a
              href="/services/cosmetic"
              className="text-sm text-muted-foreground hover:text-sky-600 transition-colors"
            >
              Cosmetic Dentistry
            </a>
            <a
              href="/services/emergency"
              className="text-sm text-muted-foreground hover:text-sky-600 transition-colors"
            >
              Emergency Dental Care
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="text-sm text-muted-foreground">123 Dental Way</p>
            <p className="text-sm text-muted-foreground">
              Smile City, SC 12345
            </p>
            <p className="text-sm text-muted-foreground">(555) 123-4567</p>
            <p className="text-sm text-muted-foreground">
              info@brightsmile.com
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-sky-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-sky-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-sky-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Chris Dental Clinic. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
