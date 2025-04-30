"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin@sog.com" && password === "sogindodefence") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/admin");
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm" onSubmit={handleLogin}>
        <Image
          src="/logo-sog.png"
          alt="Logo SOG"
          width={120}
          height={60}
          priority
          className="mx-auto mb-6"
        />
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login Admin</h1>

        <input
          type="email"
          placeholder="Email"
          className="input mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-400 mt-8">
          © PT. SOG Indonesia {new Date().getFullYear()}
        </p>
      </form>
    </main>
  );
}
