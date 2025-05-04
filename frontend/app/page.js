"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-red-500 text-white p-10 text-3xl">
      Eğer bu kutu kırmızıysa Tailwind çalışıyor!
    </div>
  );
}