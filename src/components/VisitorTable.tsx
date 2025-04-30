"use client";

import { useEffect, useState } from "react";

export default function VisitorTable() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const fetchVisitors = async () => {
    const res = await fetch("http://localhost:5555/api/visitors");
    const data = await res.json();
    setVisitors(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const sendRekap = async () => {
    setSending(true);
    const res = await fetch("http://localhost:5555/api/send-rekap", {
      method: "POST",
    });

    if (res.ok) {
      alert("Rekap berhasil dikirim ke email!");
      fetchVisitors(); // refresh data
    } else {
      alert("Gagal mengirim rekap!");
    }

    setSending(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <button
        onClick={sendRekap}
        disabled={sending}
        className={`mb-6 px-5 py-2 rounded-lg text-white font-semibold ${
          sending ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {sending ? "Mengirim..." : "Kirim Rekap ke Email"}
      </button>

      {loading ? (
        <p className="text-gray-600">Memuat data visitor...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
              <tr>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">Jabatan</th>
                <th className="p-3 text-left">Perusahaan</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Nomor HP</th>
                <th className="p-3 text-left">Waktu</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((v: any, i: number) => (
                <tr
                  key={i}
                  className={`border-t text-sm ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3 text-gray-800">{v.nama}</td>
                  <td className="p-3 text-gray-800">{v.jabatan || "-"}</td>
                  <td className="p-3 text-gray-800">{v.perusahaan}</td>
                  <td className="p-3 text-gray-800">{v.email}</td>
                  <td className="p-3 text-gray-800">{v.nomor_hp || "-"}</td>
                  <td className="p-3 text-gray-800">
                    {new Date(v.created_at).toLocaleString()}
                  </td>
                  <td className="p-3 font-semibold">
                    {v.is_sent ? (
                      <span className="text-green-600">Terkirim</span>
                    ) : (
                      <span className="text-red-600">Belum</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
