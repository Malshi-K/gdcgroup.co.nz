// Homepage-only visual helpers (technical / blueprint style experiment).
// Imported only by components/home/* so the mono font and these styles never load on other pages.
import { JetBrains_Mono } from "next/font/google";

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

// Small uppercase monospace label that sits above a section heading.
// tone="light" for light backgrounds, tone="dark" for navy backgrounds.
export const Eyebrow = ({ children, tone = "light", center = false }) => (
  <p
    className={`${mono.className} mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] ${
      center ? "justify-center" : ""
    } ${tone === "dark" ? "text-light-blue" : "text-primary-blue"}`}
  >
    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
    <span>{children}</span>
    <span
      aria-hidden="true"
      className={`h-px w-10 ${tone === "dark" ? "bg-light-blue/40" : "bg-primary-blue/40"}`}
    />
  </p>
);

// Thin blueprint grid, faded towards one side. Purely decorative.
export const BlueprintGrid = ({ tone = "dark", className = "" }) => {
  const line =
    tone === "dark" ? "rgba(234,244,251,0.08)" : "rgba(0,97,180,0.07)";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
        backgroundSize: "44px 44px",
        WebkitMaskImage:
          "linear-gradient(to right, black 0%, black 35%, transparent 85%)",
        maskImage:
          "linear-gradient(to right, black 0%, black 35%, transparent 85%)",
      }}
    />
  );
};

// Thin "+" registration mark.
export const Crosshair = ({ className = "", tone = "light" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={`h-6 w-6 ${className}`}
    fill="none"
    stroke={tone === "dark" ? "#EAF4FB" : "#0061B4"}
    strokeWidth="1.25"
    strokeLinecap="round"
  >
    <path d="M12 2v20M2 12h20" />
  </svg>
);

// Line-art structural truss.
export const TrussArt = ({ className = "" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 280 110"
    className={className}
    fill="none"
    stroke="#0061B4"
    strokeWidth="1.2"
    strokeLinejoin="round"
    strokeLinecap="round"
  >
    <path d="M8 90 L272 90 M8 90 L140 14 L272 90" />
    <path d="M52 90 L52 64 M96 90 L96 39 M184 90 L184 39 M228 90 L228 64" />
    <path d="M52 64 L96 90 M96 39 L140 90 L184 39 M184 90 L228 64 M52 64 L140 14 L228 64" />
    <path d="M30 100 L250 100 M30 96 L30 104 M250 96 L250 104" strokeWidth="0.8" />
    <circle cx="140" cy="14" r="2.5" />
    <circle cx="8" cy="90" r="2.5" />
    <circle cx="272" cy="90" r="2.5" />
  </svg>
);

// Line-art isometric building frame.
export const BuildingFrameArt = ({ className = "" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 200 200"
    className={className}
    fill="none"
    stroke="#1A242F"
    strokeWidth="1.2"
    strokeLinejoin="round"
    strokeLinecap="round"
  >
    {/* base + top slabs */}
    <path d="M100 176 L28 138 L100 100 L172 138 Z" />
    <path d="M100 76 L28 38 L100 0 L172 38 Z" />
    {/* columns */}
    <path d="M28 38 V138 M172 38 V138 M100 76 V176 M100 0 V100" />
    {/* floor plates */}
    <path d="M28 71 L100 109 L172 71 M28 104 L100 142 L172 104" />
    {/* bracing */}
    <path d="M28 38 L100 76 L172 38 M28 71 L100 109 M172 71 L100 109" stroke="#0061B4" />
    <path d="M100 0 L100 76" stroke="#0061B4" />
  </svg>
);
