import Link from 'next/link';
import { Video, Mail, Twitter, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-earth-200 dark:border-earth-800 bg-earth-50 dark:bg-earth-900 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-nature-700 dark:text-nature-400 mb-4">
              <Video className="h-6 w-6" />
              <span>WorldWildlifeWatch</span>
            </Link>
            <p className="text-sm text-earth-600 dark:text-earth-400">
              Connecting you with wildlife around the world, one stream at a time.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-earth-900 dark:text-earth-100 mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/browse" className="text-sm text-earth-600 dark:text-earth-400 hover:text-nature-700 dark:hover:text-nature-400 transition-colors">
                  Browse Cameras
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-earth-600 dark:text-earth-400 hover:text-nature-700 dark:hover:text-nature-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/creator/apply" className="text-sm text-earth-600 dark:text-earth-400 hover:text-nature-700 dark:hover:text-nature-400 transition-colors">
                  Become a Creator
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-earth-900 dark:text-earth-100 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-earth-600 dark:text-earth-400 hover:text-nature-700 dark:hover:text-nature-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-earth-600 dark:text-earth-400 hover:text-nature-700 dark:hover:text-nature-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-earth-600 dark:text-earth-400 hover:text-nature-700 dark:hover:text-nature-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-earth-600 dark:text-earth-400 hover:text-nature-700 dark:hover:text-nature-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-earth-900 dark:text-earth-100 mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-earth-600 dark:text-earth-400 hover:text-nature-700 dark:hover:text-nature-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-earth-600 dark:text-earth-400 hover:text-nature-700 dark:hover:text-nature-400 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-earth-600 dark:text-earth-400 hover:text-nature-700 dark:hover:text-nature-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="mailto:hello@worldwildlifewatch.com" className="text-earth-600 dark:text-earth-400 hover:text-nature-700 dark:hover:text-nature-400 transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-earth-200 dark:border-earth-700 text-center text-sm text-earth-600 dark:text-earth-400">
          <p>&copy; {currentYear} WorldWildlifeWatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
