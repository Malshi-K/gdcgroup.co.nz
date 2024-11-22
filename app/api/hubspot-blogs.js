import { fetchPublishedBlogs } from '@/utils/hubspot';

export default async function handler(req, res) {
  try {
    const blogs = await fetchPublishedBlogs();
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ error: 'No blogs found.' });
    }
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs from HubSpot:', error.message);
    res.status(500).json({ error: 'Failed to fetch blogs from HubSpot' });
  }
}
