'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Video, User, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import { cn } from '@/lib/utils/cn';
import { User as UserType } from '@/types';

interface HeaderProps {
  user: UserType | null;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-earth-200 dark:border-earth-800 bg-white/95 dark:bg-earth-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-earth-950/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-nature-700 dark:text-nature-400">
            <Video className="h-6 w-6" />
            <span className="hidden sm:inline">WorldWildlifeWatch</span>
            <span className="sm:hidden">WWW</span>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={cn(
                'text-sm font-medium transition-colors hover:text-nature-700 dark:hover:text-nature-400',
                isActive('/')
                  ? 'text-nature-700 dark:text-nature-400'
                  : 'text-earth-600 dark:text-earth-400'
              )}
            >
              Home
            </Link>
            <Link
              href="/browse"
              className={cn(
                'text-sm font-medium transition-colors hover:text-nature-700 dark:hover:text-nature-400',
                isActive('/browse')
                  ? 'text-nature-700 dark:text-nature-400'
                  : 'text-earth-600 dark:text-earth-400'
              )}
            >
              Browse Cameras
            </Link>
            {user && (
              <Link
                href="/account/favorites"
                className={cn(
                  'text-sm font-medium transition-colors hover:text-nature-700 dark:hover:text-nature-400',
                  isActive('/account/favorites')
                    ? 'text-nature-700 dark:text-nature-400'
                    : 'text-earth-600 dark:text-earth-400'
                )}
              >
                My Favorites
              </Link>
            )}
          </div>
        </div>

        {/* Right Side - User Menu & Dark Mode */}
        <div className="flex items-center gap-4">
          <DarkModeToggle />

          {user ? (
            <div className="flex items-center gap-3">
              {/* Creator Dashboard Link */}
              {(user.role === 'creator' || user.role === 'admin') && (
                <Link
                  href="/creator/dashboard"
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-nature-700 dark:text-nature-400 hover:bg-nature-50 dark:hover:bg-nature-950 rounded-lg transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              )}

              {/* Admin Panel Link */}
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              )}

              {/* Account Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-earth-700 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-earth-800 rounded-lg transition-colors">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.full_name || user.email}</span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-earth-900 rounded-lg shadow-lg border border-earth-200 dark:border-earth-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm text-earth-700 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800"
                  >
                    Account Settings
                  </Link>
                  <Link
                    href="/account/subscriptions"
                    className="block px-4 py-2 text-sm text-earth-700 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800"
                  >
                    Subscriptions
                  </Link>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-earth-50 dark:hover:bg-earth-800 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-earth-700 dark:text-earth-300 hover:text-nature-700 dark:hover:text-nature-400 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-nature-600 hover:bg-nature-700 rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
