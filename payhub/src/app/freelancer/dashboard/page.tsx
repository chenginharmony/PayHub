import { getUser, signOut } from '@/utils/auth';
import { getUserRole, isFreelancer } from '@/utils/role';
import { useEffect, useState } from 'react';

export default function FreelancerDashboard() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      const { data } = await getUser();
      const user = data?.user;
      if (!user) {
        window.location.href = '/freelancer';
        return;
      }
      const userRole = await getUserRole(user.id);
      setRole(userRole);
      setLoading(false);
      if (!userRole || !isFreelancer(userRole)) {
        window.location.href = '/';
      }
    }
    fetchRole();
  }, []);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-blue-50 p-8">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mb-4 text-blue-700 text-center">Freelancer Dashboard</h1>
        <p className="mb-8 text-lg text-gray-700 text-center max-w-lg">
          Welcome, Freelancer! Here you can manage your projects, upload previews, and track payments.
        </p>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 rounded-lg p-6 text-center shadow">
            <h2 className="font-bold text-lg mb-2">My Projects</h2>
            <ul className="text-blue-700 text-sm">
              <li>Create & Manage Projects</li>
              <li>Client List</li>
              <li>Project Status</li>
            </ul>
          </div>
          <div className="bg-blue-100 rounded-lg p-6 text-center shadow">
            <h2 className="font-bold text-lg mb-2">File Uploads</h2>
            <ul className="text-blue-700 text-sm">
              <li>Upload Previews</li>
              <li>Share Files</li>
              <li>Comment Threads</li>
            </ul>
          </div>
          <div className="bg-blue-100 rounded-lg p-6 text-center shadow">
            <h2 className="font-bold text-lg mb-2">Payments & Profile</h2>
            <ul className="text-blue-700 text-sm">
              <li>Track Payments</li>
              <li>Commission Info</li>
              <li>Profile & Branding</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
