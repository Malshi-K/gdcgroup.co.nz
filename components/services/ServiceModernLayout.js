// components/services/ServiceModernLayout.js
// Modern layout for service pages, driven by the `modern` content object in app/data/servicesData.js
//
// content = {
//   tagline, intro: [..],
//   images?: [".."],   (extra photos used in the sections below the hero)
//   aside?: { title, lead?, style: "chips" | "list", items: [..] },   (a "list" aside becomes the services overview card)
//   highlights?: [{ title, text }]   (optional override of the 4 strip items)
//   blocks: [
//     { type: "cardGrid", id?, heading?, columns?: 2 | 3, listLabel?, cards: [{ icon, title, subtitle?, summary: [..], listLabel?, items?: [..], after?: [..] }] },
//     { type: "text", id?, icon, heading, paragraphs: [..] },
//     { type: "split", id?, icon, heading, subheading?, paragraphs: [..], listLabel, items: [..], after?: [..] },
//   ],
//   closing: { title, paragraphs: [..], ctaLead, ctaLabel, ctaHref },
// }
// (Older shape with `audience` / `services` / `development` is still accepted.)
import Image from "next/image";
import Link from "next/link";
import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  ArrowTrendingDownIcon,
  BeakerIcon,
  BoltIcon,
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  CloudIcon,
  CpuChipIcon,
  CubeIcon,
  DocumentTextIcon,
  FireIcon,
  HomeIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  MapIcon,
  MapPinIcon,
  PencilSquareIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  Square3Stack3DIcon,
  Squares2X2Icon,
  SunIcon,
  TruckIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

const ICONS = {
  investigation: MagnifyingGlassIcon,
  foundation: BuildingOffice2Icon,
  earthworks: TruckIcon,
  slope: ArrowTrendingDownIcon,
  improvement: WrenchScrewdriverIcon,
  development: Square3Stack3DIcon,
  stormwater: CloudIcon,
  wastewater: ArrowPathIcon,
  supply: BeakerIcon,
  contamination: ShieldExclamationIcon,
  design: PencilSquareIcon,
  commercial: BuildingOffice2Icon,
  residential: HomeIcon,
  seismic: BoltIcon,
  constructability: CubeIcon,
  integrated: UserGroupIcon,
  sustainable: SunIcon,
  model: CubeIcon,
  documentation: DocumentTextIcon,
  power: BoltIcon,
  lighting: LightBulbIcon,
  controls: CpuChipIcon,
  planning: MapIcon,
  road: ArrowsRightLeftIcon,
  safety: ShieldCheckIcon,
  infrastructure: TruckIcon,
  liaison: ChatBubbleLeftRightIcon,
  fire: FireIcon,
};

const HIGHLIGHTS = [
  {
    icon: UserGroupIcon,
    title: "Multidisciplinary Expertise",
    text: "Engineering, surveying and planning expertise within one coordinated team.",
  },
  {
    icon: CheckBadgeIcon,
    title: "Practical Solutions",
    text: "Practical, cost-effective advice tailored to each project and site.",
  },
  {
    icon: Squares2X2Icon,
    title: "Integrated Approach",
    text: "Disciplines coordinated early to reduce conflicts and improve outcomes.",
  },
  {
    icon: MapPinIcon,
    title: "Built for New Zealand",
    text: "Aligned with New Zealand standards, conditions and communities.",
  },
];

const VISIBLE_ITEMS = 8;

const normalize = (content) => {
  if (content.blocks) return content;
  const blocks = [];
  if (content.services) {
    blocks.push({
      type: "cardGrid",
      id: "service-details",
      heading: content.servicesHeading,
      columns: 2,
      listLabel: "Our services include:",
      cards: content.services,
    });
  }
  if (content.development) {
    blocks.push({
      type: "split",
      icon: "development",
      heading: content.development.title,
      paragraphs: content.development.paragraphs,
      listLabel: "We provide geotechnical advice for:",
      items: content.development.items,
    });
  }
  return {
    ...content,
    aside:
      content.aside ||
      (content.audience && {
        title: "Who we work with",
        style: "chips",
        items: content.audience,
      }),
    blocks,
  };
};

const slugify = (t) =>
  t
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Two-tone hero heading: split at the first sentence break, otherwise at the middle word
const splitTagline = (t) => {
  const m = t.match(/^(.+?[.!?])\s+(.+)$/);
  if (m) return [m[1], m[2]];
  const w = t.split(" ");
  if (w.length < 3) return [t, ""];
  const mid = Math.ceil(w.length / 2);
  return [w.slice(0, mid).join(" "), w.slice(mid).join(" ")];
};

const Eyebrow = ({ children, light = false }) => (
  <p
    className={`text-xs uppercase tracking-widest font-semibold mb-3 ${light ? "text-light-blue" : "text-primary-blue"}`}
  >
    {children}
  </p>
);

const SectionHeading = ({ eyebrow, children }) => (
  <div className="text-center mb-12">
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <h2 className="text-3xl md:text-4xl font-bold text-primary-navy">
      {children}
    </h2>
    <div className="w-24 h-1 bg-primary-blue mx-auto mt-4" />
  </div>
);

const IconTile = ({ name, size = "md" }) => {
  const Icon = ICONS[name] || Square3Stack3DIcon;
  const box = size === "lg" ? "h-14 w-14 rounded-2xl" : "h-12 w-12 rounded-xl";
  return (
    <span
      className={`flex ${box} flex-shrink-0 items-center justify-center bg-gradient-to-br from-primary-blue to-primary-navy shadow-md`}
    >
      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
    </span>
  );
};

const Chip = ({ children }) => (
  <li className="flex items-start gap-2 rounded-lg border border-light bg-off-white px-3 py-2 text-sm text-primary-navy">
    <CheckCircleIcon
      className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent-teal"
      aria-hidden="true"
    />
    <span>{children}</span>
  </li>
);

const ChipList = ({ items }) => {
  const shown = items.slice(0, VISIBLE_ITEMS);
  const rest = items.slice(VISIBLE_ITEMS);
  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {shown.map((i) => (
          <Chip key={i}>{i}</Chip>
        ))}
      </ul>
      {rest.length > 0 && (
        <details className="group mt-3">
          <summary className="list-none cursor-pointer inline-flex items-center gap-1 text-sm font-semibold text-primary-blue hover:text-primary-blue-dark">
            <span className="group-open:hidden">Show {rest.length} more</span>
            <span className="hidden group-open:inline">Show less</span>
            <span
              aria-hidden="true"
              className="transition-transform group-open:rotate-180"
            >
              ▾
            </span>
          </summary>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {rest.map((i) => (
              <Chip key={i}>{i}</Chip>
            ))}
          </ul>
        </details>
      )}
    </>
  );
};

const Callout = ({ children }) => (
  <div className="mt-5 rounded-r-xl border-l-4 border-primary-blue bg-light-blue/70 px-4 py-3 text-sm md:text-base leading-relaxed text-primary-navy space-y-2">
    {children}
  </div>
);

const PhotoCard = ({ src, alt, label, flip = false }) => (
  <div className={`relative ${flip ? "lg:order-2" : ""}`}>
    <div
      className={`absolute ${flip ? "-bottom-4 -left-4" : "-bottom-4 -right-4"} h-full w-full rounded-3xl bg-light-blue`}
      aria-hidden="true"
    />
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/50 via-transparent to-transparent" />
      {label && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-white/95 px-4 py-3 shadow-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-blue text-white text-xs font-bold">
            GDC
          </span>
          <span className="text-sm font-semibold text-primary-navy">{label}</span>
        </div>
      )}
    </div>
  </div>
);

const CardGridBlock = ({ block, bg }) => {
  const three = block.columns === 3;
  const odd = block.cards.length % 2 === 1;
  return (
    <section id={block.id} className={`${bg} py-16 md:py-24 scroll-mt-24`}>
      <div className="site-x">
        {block.heading && (
          <SectionHeading eyebrow="What we do">{block.heading}</SectionHeading>
        )}
        <div
          className={`grid grid-cols-1 ${three ? "lg:grid-cols-3" : "lg:grid-cols-2"} gap-6 lg:gap-8`}
        >
          {block.cards.map((card, ci) => {
            const last = ci === block.cards.length - 1;
            return (
              <article
                id={slugify(card.title)}
                key={card.title}
                className={`group relative flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-light bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${!three && odd && last ? "lg:col-span-2" : ""}`}
              >
                <div className="h-1.5 bg-gradient-to-r from-primary-blue to-primary-navy" />
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="mb-5 flex items-start justify-between">
                    <IconTile name={card.icon} size="lg" />
                    <span
                      className="select-none text-5xl font-bold leading-none text-light-blue"
                      aria-hidden="true"
                    >
                      {String(ci + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight text-primary-navy">
                    {card.title}
                  </h3>
                  {card.subtitle && (
                    <p className="mt-1 font-semibold text-primary-blue">
                      {card.subtitle}
                    </p>
                  )}
                  <div className="mt-3 space-y-3 leading-relaxed text-secondary">
                    {card.summary.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                  {card.items?.length > 0 && (
                    <div className="mt-5">
                      <p className="mb-3 font-semibold text-primary-navy">
                        {card.listLabel ||
                          block.listLabel ||
                          "Our services include:"}
                      </p>
                      <ChipList items={card.items} />
                    </div>
                  )}
                  {card.after?.length > 0 && (
                    <Callout>
                      {card.after.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </Callout>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Used for both "split" (with a list) and "text" (paragraphs only) blocks
const FeatureBlock = ({ block, bg, image, flip, label }) => (
  <section id={block.id} className={`${bg} py-16 md:py-24 scroll-mt-24`}>
    <div className="site-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <PhotoCard src={image} alt={block.heading} label={label} flip={flip} />
      <div>
        <div className="mb-4">
          <IconTile name={block.icon} size="lg" />
        </div>
        <h2 className="mb-3 text-3xl md:text-4xl font-bold leading-tight text-primary-navy">
          {block.heading}
        </h2>
        {block.subheading && (
          <p className="mb-4 text-xl font-semibold text-primary-blue">
            {block.subheading}
          </p>
        )}
        <div className="space-y-4 leading-relaxed text-secondary">
          {block.paragraphs.map((p, i) => (
            <p
              key={p}
              className={
                block.type === "text" && i === 0
                  ? "text-xl font-semibold leading-snug text-primary-navy"
                  : ""
              }
            >
              {p}
            </p>
          ))}
        </div>
        {block.items?.length > 0 && (
          <div className="mt-6">
            {block.listLabel && (
              <p className="mb-3 font-semibold text-primary-navy">
                {block.listLabel}
              </p>
            )}
            <ChipList items={block.items} />
          </div>
        )}
        {block.after?.length > 0 && (
          <Callout>
            {block.after.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Callout>
        )}
      </div>
    </div>
  </section>
);

const ServiceModernLayout = ({ title, image, content: rawContent }) => {
  const content = normalize(rawContent);
  const { tagline, intro, aside, blocks, closing } = content;
  const highlights = content.highlights
    ? content.highlights.map((h, i) => ({ ...HIGHLIGHTS[i % 4], ...h }))
    : HIGHLIGHTS;
  const [headA, headB] = splitTagline(tagline);
  const photos = [...(content.images || []), image];
  const photo = (i) => photos[i % photos.length];

  // Services overview card: the side list if there is one, otherwise the service categories
  const firstGrid = blocks.find((b) => b.type === "cardGrid");
  const overview =
    aside && aside.style === "list"
      ? {
          title: aside.title,
          lead: aside.lead,
          items: aside.items.map((label) => ({ label })),
        }
      : firstGrid
        ? {
            title: firstGrid.heading || "Our Services",
            lead: null,
            items: firstGrid.cards.map((c) => ({
              label: c.title,
              icon: c.icon,
              href: `#${slugify(c.title)}`,
            })),
          }
        : null;

  const restIntro = intro.slice(1);
  const chipsAside = aside && aside.style !== "list" ? aside : null;
  let photoIndex = 0;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-light-blue">
        <div className="relative">
          <div className="site-x relative z-10 flex flex-col justify-center py-14 md:min-h-[540px] md:py-24 pb-24 md:pb-36">
            <div className="max-w-xl">
              <p className="text-xs md:text-sm uppercase tracking-widest font-semibold text-primary-blue mb-4">
                {title}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary-navy">
                {headA}
                {headB && (
                  <>
                    <br />
                    <span className="text-primary-blue">{headB}</span>
                  </>
                )}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-secondary">
                {intro[0]}
              </p>
              <div className="mt-8">
                <a
                  href="#our-services"
                  className="inline-block bg-primary-blue hover:bg-primary-blue-dark text-white text-sm font-semibold uppercase tracking-wide px-7 py-3 rounded-md transition-colors duration-300"
                >
                  Our Services
                </a>
              </div>
            </div>
          </div>
          <div className="hero-fade relative h-64 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[58%]">
            <Image
              src={image}
              alt={title}
              fill
              priority
              quality={90}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services overview card (overlaps the hero) */}
      {overview && (
        <section
          id="our-services"
          className="relative z-10 -mt-16 md:-mt-24 pb-10 scroll-mt-24"
        >
          <div className="site-x">
            <div className="bg-white rounded-2xl shadow-xl border border-light p-6 md:p-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-2">
                <Eyebrow>Our Services</Eyebrow>
                <h2 className="text-2xl md:text-3xl font-bold text-primary-navy leading-tight mb-3">
                  {overview.title}
                </h2>
                {overview.lead && (
                  <p className="text-secondary leading-relaxed">
                    {overview.lead}
                  </p>
                )}
              </div>
              <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {overview.items.map((item) => {
                  const Icon = (item.icon && ICONS[item.icon]) || CheckCircleIcon;
                  const inner = (
                    <>
                      <Icon
                        className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary-blue"
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </>
                  );
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="flex items-start gap-3 text-primary-navy font-medium hover:text-primary-blue transition-colors"
                        >
                          {inner}
                        </a>
                      ) : (
                        <span className="flex items-start gap-3 text-dark">
                          {inner}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Highlights strip */}
      <section className="bg-light-blue border-y border-light py-8">
        <div className="site-x grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-light">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.title}
                className="flex items-start gap-3 lg:px-6 first:lg:pl-0 last:lg:pr-0"
              >
                <Icon
                  className="h-8 w-8 flex-shrink-0 text-primary-blue"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-bold text-primary-navy text-sm">
                    {h.title}
                  </p>
                  <p className="text-sm text-secondary leading-snug mt-1">
                    {h.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Remaining intro text: copy beside a photo */}
      {(restIntro.length > 0 || chipsAside) && (
        <section className="bg-white py-16 md:py-24">
          <div className="site-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>About this service</Eyebrow>
              <h2 className="mb-5 text-3xl md:text-4xl font-bold leading-tight text-primary-navy">
                {title}
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-secondary">
                {restIntro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {chipsAside && (
                <div className="mt-6 rounded-2xl border border-light bg-light-blue p-5">
                  <p className="mb-3 font-bold text-primary-navy">
                    {chipsAside.title}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {chipsAside.items.map((a) => (
                      <li
                        key={a}
                        className="rounded-full border border-light bg-white px-4 py-1.5 text-sm font-medium text-primary-navy"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <PhotoCard
              src={photo(photoIndex++)}
              alt={title}
              label={`GDC Group · ${title}`}
            />
          </div>
        </section>
      )}

      {/* Content blocks (alternating backgrounds) */}
      {blocks.map((block, i) => {
        const bg = i % 2 === 0 ? "bg-off-white" : "bg-white";
        const key = block.id || block.heading;
        if (block.type === "split" || block.type === "text") {
          const idx = photoIndex++;
          return (
            <FeatureBlock
              key={key}
              block={block}
              bg={bg}
              image={photo(idx)}
              flip={idx % 2 === 1}
              label={`GDC Group · ${title}`}
            />
          );
        }
        return <CardGridBlock key={key} block={block} bg={bg} />;
      })}

      {/* Closing CTA over a photo */}
      <section className="relative overflow-hidden bg-primary-navy py-16 md:py-24 text-white">
        <Image
          src={photo(photoIndex)}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-navy via-primary-navy/90 to-primary-navy/70" />
        <div className="site-x relative grid grid-cols-1 items-center gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-3">
            <Eyebrow light>GDC Group</Eyebrow>
            <h2 className="mb-5 text-3xl md:text-4xl font-bold leading-tight">
              {closing.title}
            </h2>
            <div className="space-y-4 leading-relaxed text-light-blue">
              {closing.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 rounded-2xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-sm lg:text-left">
            <p className="mb-6 text-xl md:text-2xl font-semibold">
              {closing.ctaLead}
            </p>
            <Link
              href={closing.ctaHref}
              className="inline-block rounded-lg bg-primary-blue px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-primary-blue-dark"
            >
              {closing.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceModernLayout;
