import { getCPUModel } from '@/app/lib/cpu-data';
import { notFound } from 'next/navigation';
import Navigation from '@/app/components/Navigation';
import CPUViewerClient from './CPUViewerClient';

export default async function CPUDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cpu = getCPUModel(id);
  if (!cpu) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Navigation />
      <CPUViewerClient cpu={cpu} />
    </div>
  );
}
