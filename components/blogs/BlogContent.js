// BlogContent.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export function BlogContent({ blog, comments, recentArticles }) {
  return (
    <>
      <div className="bg-off-white min-h-screen">
        <main className="site-x py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            <h1 className="text-4xl text-primary-navy font-bold">{blog.name}</h1>
            <p className="text-secondary flex items-center gap-2 py-3">
              GDC Admin <span className="mx-1">•</span>{" "}
              {new Date(blog.publishDate).toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
            <div className="relative w-full h-96 mb-6">
              <Image
                src={blog.featuredImage || "/images/default-blog.webp"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                className="object-cover rounded-lg"
                alt={blog.featuredImageAltText || blog.htmlTitle}
                priority
              />
            </div>

            <div
              className="text-md text-dark text-justify mb-4 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: blog.postBody }}
            />

            <CommentSection blogSlug={blog.slug} />
          </article>

          <aside className="space-y-6">
            <RecentArticles articles={recentArticles} />
            <RecentComments comments={comments} />
          </aside>
        </main>
      </div>
    </>
  );
}

function CommentSection({ blogSlug }) {
  const [formData, setFormData] = useState({
    email: "",
    comment: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = {
      fields: [
        { name: "email", value: formData.email },
        { name: "comment", value: formData.comment },
        { name: "blog_post_slug", value: blogSlug },
      ],
    };

    try {
      const response = await axios.post(
        `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}/${process.env.NEXT_PUBLIC_HUBSPOT_COMMENT_FORM_ID}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setMessage("Comment submitted successfully.");
        setError(null);
        setFormData({ email: "", comment: "" });
      }
    } catch (error) {
      setMessage(null);
      setError("Error submitting comment. Please try again later.");
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl text-primary-navy font-bold mb-4">Leave a Reply</h2>
      <p className="text-secondary mb-4">
        Your email address will not be published. Required fields are marked *
      </p>

      {message && <p className="text-dark border-l-4 border-accent-teal pl-3 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block text-dark">Comment*</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-light rounded-md text-black"
          ></textarea>
        </div>
        <div>
          <label className="block text-dark">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-light rounded-md text-black"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-primary-blue-dark transition-colors"
        >
          Submit
        </button>
      </form>
    </section>
  );
}

function RecentArticles({ articles }) {
  return (
    <div>
      <h2 className="text-xl text-primary-navy font-bold">Recent Articles</h2>
      {articles.map((article, index) => (
        <Link
          href={`/${article.slug}`}
          key={index}
          className="flex items-center gap-4"
        >
          <div className="w-20 h-20 relative flex-shrink-0">
            <Image
              src={article.featuredImage || "/images/default-blog.webp"}
              fill
              sizes="100vw"
              className="object-cover rounded-md"
              alt={article.name}
            />
          </div>
          <div>
            <h3 className="text-md font-semibold text-dark">{article.name}</h3>
            <p className="text-sm text-secondary">Author</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function RecentComments({ comments }) {
  return (
    <div className="p-4">
      <h2 className="text-xl text-primary-navy font-bold mb-4">Recent Comments</h2>
      <ul className="list-none space-y-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <li key={index} className="flex space-x-3">
              <div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-semibold text-dark">
                    {comment.name || "Anonymous"}
                  </p>
                  <small className="text-xs text-secondary">
                    {new Date(comment.submittedOn).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </small>
                </div>
                <p className="mt-1 text-sm text-dark">{comment.comment}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-secondary">No comments yet.</p>
        )}
      </ul>
    </div>
  );
}