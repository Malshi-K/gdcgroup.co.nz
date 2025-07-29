import { BlogContent } from "@/components/blogs/BlogContent";
import axios from "axios";
import "@/app/globals.css";

// Specific meta tags for certain blog posts
const specificMetaTags = {
  "gold-award-win-for-waikato-hospital-molecular-biology-laboratory-project": {
    title: "Gold Award for Waikato Hospital Project | GDC Consultants",
    description: "GDC Consultants proudly contributed to the award-winning Waikato Hospital Molecular Biology Lab project, honored at the NZ Commercial Project Awards 2025.",
    imageAlt: "Award-winning Waikato Hospital Molecular Biology Laboratory building designed by GDC Consultants NZ.",
    ogImage: "/images/waikato-hospital-award-og.jpg",
    twitterImage: "/images/waikato-hospital-award-twitter.jpg",
  },
  "a-day-in-the-life-with-rojesh-koshy-operation-manager-civil-engineer": {
    title: "A Day in the Life of Rojesh Koshy | GDC Consultants NZ",
    description: "Go behind the scenes with Rojesh Koshy, Operations Manager & Civil Engineer at GDC Consultants, as he shares insights into his daily work and project leadership.",
    imageAlt: "Rojesh Koshy, Civil Engineer and Operations Manager at GDC Consultants NZ, on-site.",
    ogImage: "/images/rojesh-koshy-day-life-og.jpg",
    twitterImage: "/images/rojesh-koshy-day-life-twitter.jpg",
  },
  "meet-the-team-maurice-bellantoni-architectural-designer": {
    title: "Meet Maurice Bellantoni – Architectural Designer | GDC NZ",
    description: "Get to know Maurice Bellantoni, an experienced Architectural Designer at GDC Consultants NZ. Discover his design approach and passion for innovative architecture.",
    imageAlt: "Portrait of Maurice Bellantoni, Architectural Designer at GDC Consultants NZ.",
    ogImage: "/images/maurice-bellantoni-profile-og.jpg",
    twitterImage: "/images/maurice-bellantoni-profile-twitter.jpg",
  },
};

async function fetchBlogData(slug) {
  try {
    const res = await axios.get(`https://api.hubapi.com/cms/v3/blogs/posts`, {
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_BLOG_MANAGER_API_KEY}`,
      },
      params: {
        limit: 100,
        state: "published",
      },
    });

    // Find blog post by checking both with and without the prefix
    const blog = res.data.results.find((post) => {
      const postSlug = post.slug.replace("blog/", "");
      const searchSlug = slug.replace("blog/", "");
      return (
        postSlug === searchSlug ||
        postSlug === `a-day-in-the-life-with-${searchSlug}` ||
        postSlug === searchSlug.replace("a-day-in-the-life-with-", "")
      );
    });

    if (!blog) {
      return null;
    }

    // Fetch comments
    const commentsRes = await axios.get(
      `https://api.hubapi.com/form-integrations/v1/submissions/forms/4712e0e3-c31d-482b-be76-3882c5ed3d77`,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_BLOG_MANAGER_API_KEY}`,
        },
      }
    );

    const comments = commentsRes.data.results
      .map((submission) => ({
        name: submission.values.find((field) => field.name === "email")?.value,
        comment: submission.values.find((field) => field.name === "comment")
          ?.value,
        slug: submission.values.find((field) => field.name === "blog_post_slug")
          ?.value,
        submittedOn: submission.submittedAt,
      }))
      .filter((comment) => comment.slug === blog.slug);

    // Get recent articles
    const recentArticles = res.data.results
      .filter((post) => post.slug !== blog.slug)
      .slice(0, 3)
      .map((post) => ({
        name: post.name,
        featuredImage: post.featuredImage,
        slug: post.slug.replace("blog/", ""),
      }));

    return { blog, comments, recentArticles };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const rawSlug = await Promise.resolve(params.slug);
  const slug = Array.isArray(rawSlug) ? rawSlug.join("/") : rawSlug;

  // Debug logging - remove after testing
  console.log("Current slug:", slug);
  console.log("Available specific meta keys:", Object.keys(specificMetaTags));
  console.log("Has specific meta?", !!specificMetaTags[slug]);

  const data = await fetchBlogData(slug);

  if (!data?.blog) {
    return {
      title: "Blog Not Found",
    };
  }

  // Clean the slug for matching - remove any blog/ prefix and normalize
  const cleanSlug = slug.replace("blog/", "").toLowerCase();
  
  // Try multiple slug variations for matching
  const possibleSlugs = [
    cleanSlug,
    slug,
    data.blog.slug.replace("blog/", ""),
    data.blog.slug
  ];

  console.log("Trying slug variations:", possibleSlugs);

  let specificMeta = null;
  for (const testSlug of possibleSlugs) {
    if (specificMetaTags[testSlug]) {
      specificMeta = specificMetaTags[testSlug];
      console.log("Found match with slug:", testSlug);
      break;
    }
  }

  if (specificMeta) {
    console.log("Using specific meta tags for:", slug);
    return {
      title: specificMeta.title,
      description: specificMeta.description,
      
      // Open Graph tags
      openGraph: {
        title: specificMeta.title,
        description: specificMeta.description,
        url: `https://gdcgroup.co.nz/blogs/${slug}`,
        siteName: "GDC Consultants NZ",
        type: "article",
        locale: "en_NZ",
        images: [
          {
            url: specificMeta.ogImage,
            width: 1200,
            height: 630,
            alt: specificMeta.imageAlt,
          },
        ],
      },

      // Twitter Card tags
      twitter: {
        card: "summary_large_image",
        title: specificMeta.title,
        description: specificMeta.description,
        images: [specificMeta.twitterImage],
        creator: "@gdcnz",
        site: "@gdcnz",
      },

      alternates: {
        canonical: `https://gdcgroup.co.nz/blogs/${slug}`,
      },
    };
  }

  console.log("Using default meta tags for:", slug);
  
  // Default meta tags for other blog posts
  return {
    title: data.blog.name,
    description:
      data.blog.metaDescription ||
      "Read the latest blog post from GDC Consultants about architecture, engineering, and project management.",
    
    // Default Open Graph tags
    openGraph: {
      title: data.blog.name,
      description: data.blog.metaDescription || "Read the latest blog post from GDC Consultants about architecture, engineering, and project management.",
      url: `https://gdcgroup.co.nz/blogs/${slug}`,
      siteName: "GDC Consultants NZ",
      type: "article",
      locale: "en_NZ",
      images: data.blog.featuredImage ? [
        {
          url: data.blog.featuredImage,
          width: 1200,
          height: 630,
          alt: data.blog.name,
        },
      ] : [],
    },

    // Default Twitter Card tags
    twitter: {
      card: "summary_large_image",
      title: data.blog.name,
      description: data.blog.metaDescription || "Read the latest blog post from GDC Consultants about architecture, engineering, and project management.",
      images: data.blog.featuredImage ? [data.blog.featuredImage] : [],
      creator: "@gdcnz",
      site: "@gdcnz",
    },

    alternates: {
      canonical: `https://gdcgroup.co.nz/blogs/${slug}`,
    },
  };
}

export default async function Page({ params }) {
  const rawSlug = await Promise.resolve(params.slug);
  const slug = Array.isArray(rawSlug) ? rawSlug.join("/") : rawSlug;

  const data = await fetchBlogData(slug);

  if (!data || !data.blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Blog Not Found
          </h1>
          <p className="text-gray-600">
            The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return <BlogContent {...data} />;
}