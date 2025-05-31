"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
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

// Chart options and data
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'white',
      titleColor: '#1f2937',
      bodyColor: '#1f2937',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      boxPadding: 4,
      usePointStyle: true,
      callbacks: {
        label: function(context: any) {
          return `  ${context.parsed.y} applicants`;
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: '#9ca3af'
      }
    },
    y: {
      beginAtZero: true,
      border: {
        display: false
      },
      grid: {
        color: '#f3f4f6'
      },
      ticks: {
        color: '#9ca3af',
        padding: 10,
        callback: function(value: number) {
          return value + ' hires';
        }
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'nearest' as const
  }
};

const generateChartData = () => {
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return {
    labels,
    datasets: [
      {
        label: 'LinkedIn',
        data: [65, 75, 65, 55, 72, 65, 70],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3b82f6',
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2
      }
    ]
  };
};

interface DashboardStats {
  attendance: number;
  absent: number;
  leaveApply: number;
}

interface TopPerformer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    attendance: 560,
    absent: 10,
    leaveApply: 40
  });
  const [topPerformers, setTopPerformers] = useState<TopPerformer[]>([]);
  const [loading, setLoading] = useState(true);

  // Add meetings state
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      time: '10:00 AM - 11:30 AM',
      date: '2025-05-31',
      attendees: [
        { id: 1, avatar: '/user1.jpg', name: 'John Doe' },
        { id: 2, avatar: '/user2.jpg', name: 'Jane Smith' },
        { id: 3, avatar: '/user3.jpg', name: 'Mike Johnson' }
      ]
    },
    {
      id: 2,
      title: 'Project Review',
      time: '2:00 PM - 3:00 PM',
      date: '2025-05-31',
      attendees: [
        { id: 4, avatar: '/user4.jpg', name: 'Sarah Wilson' },
        { id: 5, avatar: '/user5.jpg', name: 'Tom Brown' }
      ]
    }
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { data: users, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(6);

      if (error) throw error;

      const performers = users?.map(user => ({
        id: user.id,
        name: user.full_name || 'Anonymous',
        email: user.email,
        avatar: user.avatar_url
      })) || [];

      setTopPerformers(performers);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Welcome Back, Admin 👋</h1>
          <p className="mt-1 text-gray-500">Your Team's Success Starts Here. Let's Make Progress Together!</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            + Add New
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Attendance</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.attendance}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Total attendance this month</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Absent</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.absent}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">People absent today</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Leave Apply</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.leaveApply}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Pending leave applications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Top Hiring Sources</h2>
              <p className="text-sm text-gray-500 mt-1">Track your hiring pipeline</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg">Week</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Month</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Year</button>
            </div>
          </div>
          <div className="h-[300px]">
            <Line options={chartOptions} data={generateChartData()} />
          </div>
        </div>

        {/* Calendar Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h2>
              <p className="text-sm text-gray-500 mt-1">Today's scheduled calls</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg font-medium">
                    {meeting.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {meeting.attendees.slice(0, 3).map((attendee) => (
                      <div key={attendee.id} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {attendee.name[0]}
                        </span>
                      </div>
                    ))}
                    {meeting.attendees.length > 3 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          +{meeting.attendees.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors">
            + Schedule Meeting
          </button>
        </div>
      </div>

      {/* Top Performers Section */}
      <div className="mt-8 bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Top Performers</h2>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg">1d</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">7d</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">1m</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">All</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topPerformers.map((performer) => (
            <div key={performer.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  {performer.avatar ? (
                    <Image src={performer.avatar} alt={performer.name} width={40} height={40} className="rounded-full" />
                  ) : (
                    <span className="text-lg font-medium text-gray-600">
                      {performer.name[0]}
                    </span>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                  <p className="text-xs text-gray-500">{performer.email}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
