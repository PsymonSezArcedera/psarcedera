import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section id="top" className="wrap pt-40 pb-24">
          <h1 className="text-5xl font-bold tracking-tight">
            Psymon Sez Arcedera
          </h1>
          <p className="mt-4 text-ink-2">
            Sections will land here as we build them.
          </p>
        </section>
      </main>
    </>
  );
}
