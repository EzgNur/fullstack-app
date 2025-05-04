"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, password }).toString(),
      });
      if (!res.ok) throw new Error('Sign in failed');
      const data = await res.json();
      const userRes = await fetch('http://localhost:8000/api/me', {
        headers: { Authorization: `Bearer ${data.access_token}` },
      });
      const user = await userRes.json();
      login(data.access_token, user);
      router.push('/dashboard');
    } catch (err) {
      setError('Sign in failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-blue-50 to-blue-300">
      <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-lg flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">Sign in to your account</h2>
        <p className="text-center text-gray-500 mb-10 text-lg">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline font-medium">Register</a>
        </p>
        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 mb-4 text-center text-base w-full">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-7 w-full">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg bg-gray-50 shadow-sm"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg bg-gray-50 shadow-sm"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-semibold hover:bg-blue-700 transition text-lg shadow-md mt-2"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
