
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Book, Gavel, HelpCircle, FileText, MessageSquare, Users, Inbox, Info, Phone, LogIn, X, Menu } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigationItems = [
    { name: 'الرئيسية', path: '/', icon: Home },
    { name: 'القوانين الأساسية', path: '/laws', icon: Book },
    { name: 'الإجراءات القانونية', path: '/procedures', icon: Gavel },
    { name: 'الأسئلة الشائعة', path: '/faq', icon: HelpCircle },
    { name: 'المدونة القانونية', path: '/blog', icon: FileText },
    { name: 'المنتدى القانوني', path: '/forum', icon: MessageSquare },
    { name: 'مراكز قانونية', path: '/centers', icon: Users },
    { name: 'المكتبة القانونية', path: '/library', icon: Inbox },
    { name: 'من نحن', path: '/about', icon: Info },
    { name: 'اتصل بنا', path: '/contact', icon: Phone },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="bg-white shadow-lg border-b border-primary-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto mobile-container">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 space-x-reverse flex-shrink-0">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <Gavel className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-primary-900 font-bold text-base md:text-lg">الموسوعة القانونية</span>
                <span className="text-primary-600 text-xs md:text-sm">الجزائرية الذكية</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-6 space-x-reverse">
              {navigationItems.slice(0, 6).map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActivePath(item.path)
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* More Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50 transition-colors">
                  <span>المزيد</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    {navigationItems.slice(6).map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center space-x-3 space-x-reverse px-4 py-2 text-sm hover:bg-primary-50 transition-colors ${
                            isActivePath(item.path) ? 'text-primary-700 bg-primary-50' : 'text-gray-700'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* User Menu and Mobile Menu Button */}
            <div className="flex items-center space-x-3 space-x-reverse">
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50 transition-colors">
                    <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="hidden sm:block">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 transition-colors"
                      >
                        لوحة التحكم
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        تسجيل الخروج
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="hidden sm:flex items-center space-x-2 space-x-reverse bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>تسجيل الدخول</span>
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-md text-gray-700 hover:text-primary-700 hover:bg-primary-50 transition-colors mobile-nav"
                aria-label="فتح القائمة"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="mobile-menu-overlay xl:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="xl:hidden fixed top-16 right-0 left-0 bottom-0 bg-white z-50 overflow-y-auto mobile-nav">
            <div className="mobile-container py-4">
              <div className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-md text-base font-medium transition-colors mobile-button ${
                        isActivePath(item.path)
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                
                {!user && (
                  <Link
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 space-x-reverse px-4 py-3 mt-4 bg-primary-600 text-white rounded-md text-base font-medium hover:bg-primary-700 transition-colors mobile-button"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>تسجيل الدخول</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
