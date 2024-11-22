// app/api/blogs/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get(
      'https://api.hubapi.com/cms/v3/blogs/posts',
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_BLOG_MANAGER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        params: {
          limit: 3,  // Changed to 3
          state: 'PUBLISHED',
          sort: '-publishDate' // Sort by publish date descending to get latest
        }
      }
    );

    // Transform the HubSpot response to match your component's expected format
    const transformedBlogs = response.data.results.map(blog => ({
      id: blog.id,
      name: blog.name,
      htmlTitle: blog.htmlTitle,
      featuredImage: blog.featuredImage,
      publishDate: blog.publishDate,
      slug: `/blogs/${blog.slug}`,
      commentsCount: blog.comment_count || 0
    }));

    return NextResponse.json({ blogs: transformedBlogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
