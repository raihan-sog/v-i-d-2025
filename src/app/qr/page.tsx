"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import NextImage from "next/image";

export default function QRPage() {
  const [url, setUrl] = useState("https://indodefence.vercel.app/");
  const qrRef = useRef<HTMLDivElement | null>(null);

  // Fungsi untuk download QR code sebagai PNG
  const downloadQRCode = () => {
    if (!qrRef.current) return;
    
    // Ambil elemen QR code
    //const qrContainer = qrRef.current;
    const svgElement = qrRef.current.querySelector("svg");
    
    if (!svgElement) return;
    
    // Buat canvas untuk menggambar QR code
    const canvas = document.createElement("canvas");
    canvas.width = 300; // Ukuran yang lebih besar untuk kualitas yang lebih baik
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;
    
    // Langkah 1: Render SVG QR code ke canvas
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const imgElement = document.createElement("img");
    
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const blobUrl = URL.createObjectURL(blob);
    
    imgElement.onload = () => {
      // Menggambar QR code
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
      
      // Langkah 2: Menambahkan logo ke tengah QR code
      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.onload = () => {
        // Menggambar logo di tengah canvas
        const logoSize = 70; // Ukuran logo
        const logoX = (canvas.width - logoSize) / 2;
        const logoY = (canvas.height - logoSize) / 2;
        
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
        
        // Download gambar gabungan
        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode-with-logo.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Pembersihan resource
        URL.revokeObjectURL(blobUrl);
      };
      
      // Muat gambar logo dari public directory
      logoImg.src = "/logo-sog.png";
    };
    
    imgElement.src = blobUrl;
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">QR Code Generator</h1>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Masukkan URL form"
        className="input w-full max-w-md mb-4 p-2 border rounded"
      />

      <div ref={qrRef} className="relative bg-white p-4 rounded shadow mb-4">
        {/* QR Code */}
        <QRCodeSVG
          value={url}
          size={200}
          fgColor="#000000"
          bgColor="#ffffff"
          level="H"
          includeMargin={true}
        />

        {/* Logo overlay - Ukuran logo dibesarkan dari 40x40 menjadi 60x60 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <NextImage
            src="/logo-sog.png"
            alt="Logo"
            width={77}
            height={77}
            className="rounded"
          />
        </div>
      </div>

      {/* Tombol Download */}
      <button 
        onClick={downloadQRCode}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download QR Code
      </button>

      <p className="mt-4 text-gray-600 text-sm text-center">Scan ini untuk akses form pengunjung</p>
    </main>
  );
}