import Link from 'next/link';
import { getAllCPUModels } from '@/app/lib/cpu-data';
import Navigation from '@/app/components/Navigation';
import { Cpu, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const models = getAllCPUModels();
  console.log('====================================');
  console.log(models);
  console.log('====================================');
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
            <Cpu className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Explore CPU Components in AR
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            View detailed 3D models of CPU components on your desktop, or place
            them in your real environment using augmented reality on mobile
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model) => (
            <Link
              key={model.id}
              href={`/cpu/${model.id}`}
              className="group bg-black/30 backdrop-blur rounded-xl border border-blue-500/30 overflow-hidden hover:border-blue-400 transition-all hover:scale-105"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <Cpu className="w-20 h-20 text-blue-400 group-hover:text-blue-300 transition" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {model.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {model.manufacturer}
                </p>
                <p className="text-gray-300 text-sm mb-4">
                  {model.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 text-sm font-semibold">
                    {model.parts.length} Components
                  </span>
                  <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-black/30 backdrop-blur rounded-xl border border-blue-500/30 p-6 text-center">
            <div className="text-4xl mb-3">🖥️</div>
            <h3 className="text-lg font-bold text-white mb-2">
              Desktop Viewer
            </h3>
            <p className="text-gray-400 text-sm">
              Rotate, zoom, and inspect 3D models with mouse controls
            </p>
          </div>
          <div className="bg-black/30 backdrop-blur rounded-xl border border-blue-500/30 p-6 text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-lg font-bold text-white mb-2">Mobile AR</h3>
            <p className="text-gray-400 text-sm">
              Place models in your real environment using your phone's camera
            </p>
          </div>
          <div className="bg-black/30 backdrop-blur rounded-xl border border-blue-500/30 p-6 text-center">
            <div className="text-4xl mb-3">🏷️</div>
            <h3 className="text-lg font-bold text-white mb-2">
              Interactive Labels
            </h3>
            <p className="text-gray-400 text-sm">
              Learn about each component with detailed descriptions
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
