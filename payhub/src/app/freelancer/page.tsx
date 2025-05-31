"use client";
import { useState } from 'react';
import { signInWithEmail } from '../../utils/auth';
import { useRouter } from 'next/navigation';

export default function FreelancerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await signInWithEmail(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push('/freelancer/dashboard');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-blue-50">
      <form onSubmit={handleSignIn} className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Freelancer Login</h2>
        <input
          type="email"
          placeholder="Freelancer Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </main>
  );
}
