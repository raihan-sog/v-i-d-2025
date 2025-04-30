"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import VisitorTable from "@/components/VisitorTable";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/admin/login");
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Dashboard Admin</h1>
        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            router.push("/admin/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <VisitorTable />
    </main>
  );
}
