import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = "https://sendperplane-blog-backend-production.up.railway.app";
const POSTS_PER_PAGE = 10;

const createSlug = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getPosts = (data) => {
  if (Array.isArray(data)) return data;
  return data?.blogs ?? data?.posts ?? data?.data ?? [];
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/blogs`)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load blog posts.");
        return response.json();
      })
      .then((data) => setPosts(getPosts(data)))
      .catch((fetchError) => setError(fetchError.message))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const startItem = posts.length ? startIndex + 1 : 0;
  const endItem = Math.min(startIndex + currentPosts.length, posts.length);

  return (
    <section id="blog" className="w-full bg-primary py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ngrokBlue">
            Blog
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            Latest insights and updates
          </h2>
        </div>

        {loading && <p className="text-gray-300">Loading posts...</p>}
        {error && <p className="text-red-300">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="text-gray-300">No blog posts yet.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {currentPosts.map((post) => {
                const postId = post.id ?? post._id;
                const title = post.title ?? post.name ?? "Untitled post";
                const slug = post.slug || createSlug(title);
                const excerpt = post.excerpt ?? post.summary ?? "";

                return (
                  <Link
                    key={postId ?? slug}
                    to={`/blog/${slug}`}
                    className="block rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10 transition hover:border-ngrokBlue/40 hover:bg-white/10"
                  >
                    {post.category && (
                      <span className="inline-flex rounded-full border border-ngrokBlue/30 bg-ngrokBlue/10 px-3 py-1 text-xs font-medium text-ngrokBlue">
                        {post.category}
                      </span>
                    )}
                    <h3 className="mt-5 text-xl font-semibold leading-snug text-white">
                      {title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-gray-300">
                      {excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-gray-400">
                      <span>{post.date ? new Date(post.date).toLocaleDateString() : ""}</span>
                      {post.readTime && <span>{post.readTime}</span>}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-400">
                Showing {startItem}-{endItem} of {posts.length} posts
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="rounded-full border border-ngrokBlue/20 bg-ngrokBlue/10 px-3 py-2 text-sm font-medium text-ngrokBlue">
                  Page {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadPost = async () => {
      try {
        const listResponse = await fetch(`${API_URL}/blogs`);
        if (!listResponse.ok) throw new Error("Unable to load blog posts.");
        const list = getPosts(await listResponse.json());
        const matchedPost = list.find((item) => {
          const title = item.title ?? item.name ?? "";
          return (item.slug || createSlug(title)) === slug;
        });

        if (!matchedPost) throw new Error("Blog post not found.");
        const postId = matchedPost.id ?? matchedPost._id;
        const postResponse = await fetch(
          `${API_URL}/blog?id=${encodeURIComponent(postId)}`
        );
        if (!postResponse.ok) throw new Error("Unable to load this blog post.");
        const data = await postResponse.json();
        const fetchedPost = data?.blog ?? data?.data ?? data;

        if (!cancelled) setPost(fetchedPost);
      } catch (fetchError) {
        if (!cancelled) setError(fetchError.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadPost();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return <p className="mx-auto max-w-4xl px-4 py-16 text-gray-300">Loading post...</p>;
  }

  if (error || !post) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-white">
        <p className="text-red-300">{error || "Blog post not found."}</p>
        <Link to="/blog" className="mt-4 inline-block text-ngrokBlue hover:underline">
          Back to blog
        </Link>
      </div>
    );
  }

  const title = post.title ?? post.name ?? "Untitled post";
  const body = post.body ?? post.content ?? post.description ?? "";

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link to="/blog" className="text-sm font-medium text-ngrokBlue hover:underline">
          Back to blog
        </Link>
      </div>
      {post.category && (
        <span className="inline-flex rounded-full border border-ngrokBlue/30 bg-ngrokBlue/10 px-3 py-1 text-xs font-medium text-ngrokBlue">
          {post.category}
        </span>
      )}
      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-300">
        {post.date && <span>{new Date(post.date).toLocaleDateString()}</span>}
        {post.readTime && <span>{post.readTime}</span>}
      </div>
      <div className="mt-10 space-y-6 text-base leading-8 text-gray-200">
        {body.split("\n\n").map((paragraph, index) => (
          <p key={`${slug}-${index}`}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
};

export default Blog;
