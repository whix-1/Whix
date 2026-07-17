'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/store/auth';
import { useTheme } from '@/store/theme';
import { FiMenu, FiX, FiSun, FiMoon, FiLogOut } from 'react-icons/fi';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">
                W
              </div>
              <span className="text-xl font-bold text-primary-500">Whix</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-gray-600 hover:text-primary-500">
              Services
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary-500">
              About
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-gray-600 hover:text-primary-500">
                  {user?.firstName}
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-danger-500"
                >
                  <FiLogOut />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-600 hover:text-primary-500">
                  Login
                </Link>
                <Link href="/register" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 p-4 space-y-4">
          <Link href="/services" className="block text-gray-600 hover:text-primary-500">
            Services
          </Link>
          <Link href="/about" className="block text-gray-600 hover:text-primary-500">
            About
          </Link>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="block w-full text-left text-danger-500"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="block text-gray-600">
                Login
              </Link>
              <Link href="/register" className="block btn-primary text-center">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
