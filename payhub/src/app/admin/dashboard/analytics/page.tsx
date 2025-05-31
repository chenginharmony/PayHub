"use client";

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Analytics() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeFreelancers: 0,
    totalTransactions: 0,
    monthlyRevenue: 0
  });

  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchStats = async () => {
      // TODO: Replace with actual analytics data from Supabase
      const { data: users } = await supabase
        .from('profiles')
        .select('*');

      setStats({
        totalUsers: users?.length || 0,
        activeFreelancers: users?.filter((u: any) => u.role === 'freelancer')?.length || 0,
        totalTransactions: 0,
        monthlyRevenue: 0
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Active Freelancers</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeFreelancers}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Transactions</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalTransactions}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Monthly Revenue</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ${stats.monthlyRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="text-gray-500 text-center py-8">
            No recent activity to display
          </div>
        </div>
      </div>
    </div>
  );
}
