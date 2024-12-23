'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Search, Settings, Moon, Sun } from 'lucide-react';
import { useThemeContext } from '@/providers/ThemeProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';

interface AdminHeaderClientProps {
  userImage: string | null;
}

export function AdminHeaderClient({ userImage }: AdminHeaderClientProps) {
  const { currentTheme, setTheme, isDark, toggleDark, themes } = useThemeContext();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background-main/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-full rounded-md border bg-background-main pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
         {/* Theme Controls */}
          <div className="relative flex items-center space-x-2">
            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-2 rounded-lg bg-primary-100 dark:bg-primary-800 text-primary-900 dark:text-primary-50"
              >
                <Settings className="h-5 w-5" />
              </button>
              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background-main border border-primary-200 dark:border-primary-800"
                  >
                    <div className="py-1">
                      {Object.entries(themes).map(([id, theme]) => (
                        <button
                          key={id}
                          onClick={() => {
                            setTheme(id);
                            setIsThemeMenuOpen(false);
                          }}
                          className={`block w-full px-4 py-2 text-left text-sm hover:bg-primary-100 dark:hover:bg-primary-800 ${
                            currentTheme === id ? 'bg-accent-600 dark:bg-primary-700' : ''
                          }`}
                        >
                          {theme.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg bg-primary-100 dark:bg-primary-800 text-primary-900 dark:text-primary-50"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div> 

          {/* Notifications */}
          <button className="p-2 rounded-lg bg-primary-100 dark:bg-primary-800 text-primary-900 dark:text-primary-50">
            <Bell className="h-5 w-5" />
          </button>

          {/* User */}
          <Avatar className="h-9 w-9">
            {userImage ? (
              <AvatarImage src={userImage} alt="User profile" />
            ) : (
              <AvatarFallback>
                <Icons name="user" className="h-5 w-5" />
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>
    </header>
  );
}
