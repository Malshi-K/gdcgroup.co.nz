// pages/api/get-comments.js
import axios from 'axios';

export default async function handler(req, res) {
  const { formId, slug } = req.query;

  // Check if the API Key is set correctly
  if (!process.env.HUBSPOT_BLOG_MANAGER_API_KEY) {
    return res.status(500).json({ error: 'HubSpot API Key is missing.' });
  }

  try {
    // Fetch the form submissions from HubSpot
    const response = await axios.get(
      `https://api.hubapi.com/form-integrations/v1/submissions/forms/${formId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_BLOG_MANAGER_API_KEY}`,
        },
      }
    );

    // Extract and filter comments based on the blog post slug
    const comments = response.data.results
      .map((submission) => ({
        email: submission.values.find((field) => field.name === 'email')?.value,
        comment: submission.values.find((field) => field.name === 'comment')?.value,
        slug: submission.values.find((field) => field.name === 'blog_post_slug')?.value,
        submittedOn: submission.submittedAt,
      }))
      .filter((comment) => comment.slug === slug); // Filter comments by the relevant blog post slug

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch comments. Check API credentials and permissions.' });
  }
}
