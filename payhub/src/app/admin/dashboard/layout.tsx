"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { supabase } from '@/utils/supabaseClient';
import { getUserRole, isAdmin } from '@/utils/role';
import { useRouter, usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.replace('/admin');
          return;
        }

        const role = await getUserRole(session.user.id);
        
        if (!role || !isAdmin(role)) {
          await supabase.auth.signOut();
          router.replace('/admin');
          return;
        }

        setUserName(session.user.email || '');
        setLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/admin');
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userName={userName} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {pathname === '/admin/dashboard' && 'Dashboard Overview'}
              {pathname === '/admin/dashboard/users' && 'User Management'}
              {pathname === '/admin/dashboard/projects' && 'Projects'}
              {pathname === '/admin/dashboard/payments' && 'Payments'}
              {pathname === '/admin/dashboard/analytics' && 'Analytics'}
              {pathname === '/admin/dashboard/disputes' && 'Disputes'}
              {pathname === '/admin/dashboard/settings' && 'Settings'}
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
