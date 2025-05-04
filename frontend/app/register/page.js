"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, full_name: fullName, password }),
      });
      if (!res.ok) throw new Error('Registration failed');
      router.push('/login');
    } catch (err) {
      setError('Registration failed. Please check your information.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-blue-50 to-blue-300">
      <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-lg flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">Create your account</h2>
        <p className="text-center text-gray-500 mb-10 text-lg">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline font-medium">Sign in</a>
        </p>
        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 mb-4 text-center text-base w-full">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-7 w-full">
          <div>
            <label htmlFor="fullName" className="block text-base font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Full Name"
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg bg-gray-50 shadow-sm text-gray-900"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg bg-gray-50 shadow-sm text-gray-900"
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
              autoComplete="new-password"
              placeholder="Password"
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg bg-gray-50 shadow-sm text-gray-900"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-semibold hover:bg-blue-700 transition text-lg shadow-md mt-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
