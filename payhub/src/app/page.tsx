"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-700 text-center">
          PayHub
        </h1>
        <p className="mb-8 text-lg text-gray-700 text-center max-w-lg">
          The all-in-one platform for freelancers, clients, and admins to manage
          creative projects, share files, communicate, and handle payments
          securely.
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => router.push("/freelancer")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition"
          >
            Freelancer Login
          </button>
          <button
            onClick={() => router.push("/admin")}
            className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg text-center transition"
          >
            Admin Login
          </button>
        </div>
      </div>
    </main>
  );
}
