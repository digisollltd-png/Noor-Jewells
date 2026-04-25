import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "The Royal Chronicles | Nooré Jewells Blog",
  description: "Explore the stories, craft, and heritage of Indian artistry. Dive into our guides on jewelry care, bridal trends, and the history of temple jewelry.",
  openGraph: {
    title: "The Royal Chronicles | Nooré Jewells Blog",
    description: "Heritage stories, artisan secrets, and styling guides from the world of Nooré Jewells.",
    url: "https://noorejewells.com/blog",
  }
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
