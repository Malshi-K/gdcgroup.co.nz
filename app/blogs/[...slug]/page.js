// app/blogs/blog/[...slug]/page.js
import { BlogContent } from "@/components/blogs/BlogContent";
import axios from "axios";

async function fetchBlogData(slug) {
  try {
    console.log("Original slug:", slug); // Debug

    const res = await axios.get(`https://api.hubapi.com/cms/v3/blogs/posts`, {
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_BLOG_MANAGER_API_KEY}`,
      },
      params: {
        limit: 100,
        state: "published",
      },
    });

    console.log(
      "All blog posts:",
      res.data.results.map((post) => post.slug)
    );

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
      console.log("Blog not found for slug:", slug);
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
        slug: post.slug.replace("blog/", ""), // Clean the slug for links
      }));

    return { blog, comments, recentArticles };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const rawSlug = await Promise.resolve(params.slug);
  const slugPath = Array.isArray(rawSlug) ? rawSlug.join("/") : rawSlug;

  const data = await fetchBlogData(slugPath);

  if (!data?.blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: data.blog.name,
    description:
      data.blog.metaDescription ||
      "Read the latest blog post from GDC Consultants about architecture, engineering, and project management.",
    alternates: {
      canonical: `https://www.gdcgroup.co.nz/blogs/blog/${slugPath}`,
    },
  };
}

export default async function Page({ params }) {
  const rawSlug = await Promise.resolve(params.slug);
  const slugPath = Array.isArray(rawSlug) ? rawSlug.join("/") : rawSlug;

  const data = await fetchBlogData(slugPath);

  if (!data || !data.blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Blog Not Found
          </h1>
          <p className="text-gray-600">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return <BlogContent {...data} />;
}
