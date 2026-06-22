"use client";

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: number;
}

export default function Marquee({ items, className = "", speed = 1 }: MarqueeProps) {
  const text = items.join("  ·  ");
  const duration = `${40 / speed}s`;

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex whitespace-nowrap"
        style={{ animation: `marquee ${duration} linear infinite` }}
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="mr-16 shrink-0 text-[0.6rem] font-light uppercase tracking-[0.4em] text-white/35"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
