"use client";

import { Facebook, Linkedin, Link2, Twitter } from "lucide-react";
import { useState } from "react";

export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, label: "Compartir en Facebook" },
    { icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, label: "Compartir en Twitter" },
    { icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, label: "Compartir en LinkedIn" }
  ];

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2">
      {links.map(({ icon: Icon, href, label }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal-900/10 text-charcoal-700 hover:border-gold-500 hover:text-gold-700">
          <Icon size={16} />
        </a>
      ))}
      <button onClick={copyLink} aria-label="Copiar enlace" className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal-900/10 text-charcoal-700 hover:border-gold-500 hover:text-gold-700">
        <Link2 size={16} />
      </button>
      {copied && <span className="text-xs text-gold-700">¡Enlace copiado!</span>}
    </div>
  );
}
