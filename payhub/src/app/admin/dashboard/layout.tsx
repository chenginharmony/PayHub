"use client";

import React, { useEffect, useState, Suspense } from 'react';
import Sidebar from '@/components/Sidebar';
import { getUser } from '@/utils/auth';
import { getUserRole, isAdmin } from '@/utils/role';
import { useRouter, usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

function LoadingIndicator() {
  return (
    <div className="fixed top-0 left-0 w-full h-1">
      <div className="h-full bg-blue-600 animate-loading-bar"></div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: LayoutProps): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Prefetch all main dashboard routes
    const routes = [
      '/admin/dashboard/projects',
      '/admin/dashboard/payments',
      '/admin/dashboard/disputes',
      '/admin/dashboard/users',
      '/admin/dashboard/analytics',
      '/admin/dashboard/settings'
    ];
    
    routes.forEach(route => {
      if (route !== pathname) {
        router.prefetch(route);
      }
    });
  }, [router, pathname]);

  useEffect(() => {
    async function checkAuth() {
      const { data } = await getUser();
      const user = data?.user;
      if (!user) {
        router.push('/admin');
        return;
      }
      const userRole = await getUserRole(user.id);
      if (!userRole || !isAdmin(userRole)) {
        router.push('/');
        return;
      }
      setUserName(user.email || '');
      setLoading(false);
    }
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Loading Indicator */}
        <Suspense fallback={<LoadingIndicator />}>
          {/* Top Navigation Bar */}
          <header className="bg-white shadow-sm z-10">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div className="text-gray-600">
                  <span className="text-sm">Welcome back,</span>
                  <span className="ml-1 font-semibold">{userName}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </header>
          
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="transition-opacity duration-200">
              {children}
            </div>
          </main>
        </Suspense>
      </div>
    </div>
  );
}
