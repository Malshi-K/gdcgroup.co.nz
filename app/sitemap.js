import axios from "axios";
import services from "@/app/data/servicesData";
import locations from "@/app/data/localLocation.json";

const BASE_URL = "https://gdcgroup.co.nz";

// Regenerate every 24 hours so newly published HubSpot posts appear without a redeploy.
export const revalidate = 86400;

const mainPaths = [
  "/",
  "/services",
  "/locations",
  "/blogs",
  "/contact-us",
  "/about-us/who-we-are",
  "/about-us/careers",
  "/about-us/review",
  "/portfolio/all-projects",
  "/privacy-policy",
  "/cookie-preferences",
];

// Mirrors the route rules in app/services/[service]/page.js (keys starting with "_" are archived).
const servicePaths = Object.keys(services)
  .filter((key) => !key.startsWith("_"))
  .map((key) => `/services/${key}`);

// Mirrors the route rules in utils/locationContent.js: offices have no parentSlug,
// suburbs live under /locations/<parentSlug>/<suburb>.
const locationPaths = Object.entries(locations).map(([slug, loc]) =>
  loc.parentSlug ? `/locations/${loc.parentSlug}/${slug}` : `/locations/${slug}`
);

async function getBlogPaths() {
  const apiKey = process.env.HUBSPOT_BLOG_MANAGER_API_KEY;
  if (!apiKey) {
    console.warn(
      "[sitemap] HUBSPOT_BLOG_MANAGER_API_KEY is not set - blog URLs are omitted from the sitemap."
    );
    return [];
  }

  try {
    const res = await axios.get("https://api.hubapi.com/cms/v3/blogs/posts", {
      headers: { Authorization: `Bearer ${apiKey}` },
      params: { limit: 100, state: "PUBLISHED" },
      timeout: 10000,
    });

    return (res.data.results || [])
      .filter((post) => (post.state || "").toUpperCase() === "PUBLISHED" && post.slug)
      .map((post) => `/blogs/${post.slug.replace(/^\/+/, "")}`);
  } catch (error) {
    console.warn(
      `[sitemap] Failed to fetch blog posts from HubSpot - blog URLs are omitted: ${error.message}`
    );
    return [];
  }
}

export default async function sitemap() {
  const blogPaths = await getBlogPaths();
  const lastModified = new Date();

  return [...mainPaths, ...servicePaths, ...locationPaths, ...blogPaths].map((path) => ({
    url: path === "/" ? BASE_URL : `${BASE_URL}${path}`,
    lastModified,
  }));
}
