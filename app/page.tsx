import Hero from '@/components/Hero';
import { SpaceBackground } from '@/components/SpaceBackground';

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative">
      <SpaceBackground speed={0.5} opacity={1} />
      <div className="relative z-10">
        <Hero />
      </div>
    </main>
  );
}
