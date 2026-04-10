"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Cpu, Search } from "lucide-react";

// List of components with corresponding pages
const cpuList = [
  { id: 1, name: "CPU Cooler Assembly", href: "/components/cpu-cooler" },
  { id: 2, name: "RAM Module", href: "/components/ram-module" },
  { id: 3, name: "GPU Assembly", href: "/components/gpu-assembly" },
  { id: 4, name: "Video Memory (VRAM)", href: "/components/vram" },
  { id: 5, name: "HDD Assembly", href: "/components/hdd-assembly" },
  { id: 6, name: "Motherboard Assembly", href: "/components/motherboard" },
  { id: 7, name: "Monitor Assembly", href: "/components/monitor" },
  { id: 8, name: "Processor Assembly", href: "/components/processor" },
  { id: 9, name: "Power Supply Unit Assembly", href: "/components/psu" },
  { id: 10, name: "Webcam Assembly", href: "/components/webcam" },
  { id: 11, name: "Keyboard Assembly", href: "/components/keyboard" },
  { id: 12, name: "Mouse Assembly", href: "/components/mouse" },
];

export default function Navigation() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter components based on search query
  const filteredCPUs = cpuList.filter((cpu) =>
    cpu.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <nav className="bg-black/50 backdrop-blur-md border-b border-blue-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Use grid to center search bar */}
        <div className="grid grid-cols-3 items-center h-16 gap-4">
          {/* Logo (left) */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">HOLO PC</span>
          </Link>

          {/* Search Bar (center) */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search Component..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="w-full pl-9 pr-3 py-2 bg-black/40 text-white border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Live Dropdown */}
              {showDropdown && query && filteredCPUs.length > 0 && (
                <div className="absolute mt-1 w-full bg-black/90 border border-blue-500/30 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filteredCPUs.map((cpu) => (
                    <Link
                      key={cpu.id}
                      href={cpu.href}
                      className="block px-4 py-2 hover:bg-blue-500/30 cursor-pointer text-white"
                      onClick={() => setShowDropdown(false)}
                    >
                      {cpu.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Home (right) */}
          <div className="flex justify-end">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}