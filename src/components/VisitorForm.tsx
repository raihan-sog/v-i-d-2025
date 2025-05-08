"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function VisitorForm() {
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    perusahaan: "",
    email: "",
    nomor_hp: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5555/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message || "Data berhasil dikirim! Terima kasih sudah mengunjungi booth kami.");
        router.push("https://www.pt-sog.com"); // Redirect ke website resmi setelah submit
      } else {
        alert(result.message || "Gagal mengirim data!");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan!");
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <Image
        src="/logo-sog.png"
        alt="Logo SOG"
        width={120}
        height={60}
        priority
        className="mx-auto mb-4 object-contain"
      />
      <h1 className="text-2xl font-bold mb-6 text-center text-black">Visitor Indo-Defence 2025</h1>

      <input
        type="text"
        name="nama"
        required
        placeholder="Nama*"
        className="input mb-4"
        onChange={handleChange}
      />
      <input
        type="text"
        name="jabatan"
        placeholder="Jabatan"
        className="input mb-4"
        onChange={handleChange}
      />
      <input
        type="text"
        name="perusahaan"
        required
        placeholder="Perusahaan*"
        className="input mb-4"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Email*"
        className="input mb-4"
        onChange={handleChange}
      />
      <input
        type="tel"
        name="nomor_hp"
        placeholder="Nomor HP"
        className="input mb-6"
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 rounded-lg ${
          isSubmitting ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
        } text-white`}
      >
        {isSubmitting ? "Mengirim..." : "Submit"}
      </button>
      <p className="text-center text-sm text-gray-400 mt-8">
          HALL B BOOTH 080
          <br />© PT. SOG Indonesia {new Date().getFullYear()}
          <br />
      </p>

    </form>
  );
}
