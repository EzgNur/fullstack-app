"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardPage() {
  const { user, token, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [token, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-lg flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Kullanıcı Bilgileri</h2>
        <div className="mb-4 text-lg text-gray-700 w-full text-center">
          <div className="mb-2"><span className="font-semibold">Ad Soyad:</span> {user?.full_name}</div>
          <div className="mb-2"><span className="font-semibold">Email:</span> {user?.email}</div>
        </div>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white p-4 rounded-xl font-semibold hover:bg-red-600 transition text-lg shadow-md mt-2"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}
