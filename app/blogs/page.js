// app/blogs/page.js
import BlogGalleryClient from '@/components/blogs/BlogGalleryClient';

async function fetchBlogs() {
  try {
    const response = await fetch(
      'https://api.hubapi.com/cms/v3/blogs/posts', {
      headers: {
        'Authorization': `Bearer ${process.env.HUBSPOT_BLOG_MANAGER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      next: { 
        revalidate: 3600 // Revalidate every hour
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }

    const data = await response.json();
    console.log('Fetched blogs:', data); // For debugging
    return data.results || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export const metadata = {
  title: 'Our Blog | GDC Consultants - Latest News & Updates',
  description: 'Stay updated with the latest news, insights, and updates from GDC Consultants.',
}

export default async function BlogPage() {
  const blogs = await fetchBlogs();
  return <BlogGalleryClient blogs={blogs} />;
}