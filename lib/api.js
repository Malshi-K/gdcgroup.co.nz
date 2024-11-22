// lib/api.js
import axios from 'axios';

export async function fetchBlogPost(slug) {
  const response = await axios.get(
    'https://api.hubapi.com/cms/v3/blogs/posts',
    {
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_BLOG_MANAGER_API_KEY}`,
      },
      params: {
        limit: 100,
        state: 'published',
      },
    }
  );

  const blog = response.data.results.find((post) => post.slug === slug);
  
  if (!blog) {
    return null;
  }

  const recentArticles = response.data.results
    .filter((post) => post.slug !== slug)
    .slice(0, 3)
    .map((post) => ({
      name: post.name,
      featuredImage: post.featuredImage,
      slug: post.slug,
    }));

  return { blog, recentArticles };
}

export async function submitComment(data) {
  return axios.post(
    `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}/${process.env.NEXT_PUBLIC_HUBSPOT_COMMENT_FORM_ID}`,
    {
      fields: [
        { name: 'email', value: data.email },
        { name: 'comment', value: data.comment },
        { name: 'blog_post_slug', value: data.blogSlug },
      ],
    }
  );
}