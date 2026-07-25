export const dynamic = "force-static";

const SITE = "https://tanaygondil.com";

const posts = [
  {
    slug: "roger-ackroyd",
    title: "The Perfect Murder Mystery",
    description: "It's The Murder of Roger Ackroyd by Agatha Christie.",
    date: "2026-07-21",
  },
  {
    slug: "building-tterm",
    title: "The Only Window I Need",
    description:
      "I spent my evenings this year building tterm, a terminal made for one person, shaped around one problem: the attention I spend verifying the model.",
    date: "2026-07-08",
  },
  {
    slug: "optimizing-for-reality",
    title: "The Most Dangerous Thing You Can Optimize For",
    description:
      "Gwern's \"Evolution as Backstop for Reinforcement Learning,\" explained the way I'd explain it to myself.",
    date: "2026-05-06",
  },
  {
    slug: "introspective-refusal",
    title: "Do Language Models Know When They'll Refuse?",
    description:
      "Probing introspective awareness of safety boundaries across frontier models.",
    date: "2025-01-28",
  },
  {
    slug: "calvin-and-hobbes",
    title: "What Calvin and Hobbes Taught Me About Saying Goodbye",
    description:
      "What Calvin and Hobbes taught me about saying goodbye before learning to say hello.",
    date: "2024-12-24",
  },
];

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid>${SITE}/blog/${p.slug}</guid>
      <description>${escapeXml(p.description)}</description>
      <pubDate>${new Date(p.date + "T12:00:00Z").toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tanay Gondil</title>
    <link>${SITE}/blog</link>
    <description>Essays on building, reading, and research.</description>
    <language>en</language>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
