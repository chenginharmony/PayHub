"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import { getUserRole, isAdmin } from '@/utils/role';
import Image from 'next/image';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Chart configuration
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'white',
      titleColor: '#1f2937',
      bodyColor: '#1f2937',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 8,
      displayColors: false,
      callbacks: {
        label: function(context: any) {
          return `${context.raw} transactions`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f3f4f6',
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12
        }
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12
        }
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index' as const
  }
};

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeProjects: 0,
    monthlyRevenue: 0,
    weeklyTransactions: [] as number[]
  });

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

        // Load dashboard data
        await loadDashboardData();
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/admin');
      }
    }

    checkAuth();
  }, [router]);

  async function loadDashboardData() {
    try {
      // Load users count
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      // Load active projects
      const { count: projectsCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact' })
        .eq('status', 'active');

      // Load monthly revenue
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data: payments } = await supabase
        .from('payments')
        .select('amount')
        .gte('created_at', thirtyDaysAgo.toISOString());

      const monthlyRevenue = payments?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;

      // Weekly transactions
      const weeklyData = [65, 72, 84, 91, 87, 95, 88]; // Replace with real data

      setStats({
        totalUsers: usersCount || 0,
        activeProjects: projectsCount || 0,
        monthlyRevenue,
        weeklyTransactions: weeklyData
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: stats.weeklyTransactions,
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
      }
    ]
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Active Projects</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeProjects}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Monthly Revenue</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ${stats.monthlyRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-gray-900 text-lg font-medium mb-4">Weekly Transactions</h3>
        <div className="h-[300px]">
          <Line options={options} data={chartData} />
        </div>
      </div>
    </div>
  );
}
