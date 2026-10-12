import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const API_URL = "https://sendperplane-blog-backend-production.up.railway.app";
const SITE_URL = "https://sendperplane.com";
const POSTS_PER_PAGE = 10;

const updateCanonicalLink = (path) => {
  let canonicalLink = document.querySelector('link[rel="canonical"]');

  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.rel = "canonical";
    document.head.appendChild(canonicalLink);
  }

  canonicalLink.href = `${SITE_URL}${path}`;
  return () => canonicalLink.remove();
};

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

const formatPostDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const getFeaturedImage = (post) => {
  const image =
    post.featured_image ??
    post.featuredImage ??
    post.feature_image ??
    post.image_url ??
    post.thumbnail_url ??
    post.image ??
    post.thumbnail;

  if (typeof image === "string") return image;
  return image?.url ?? image?.src ?? "";
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => updateCanonicalLink("/blog"), []);

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
                const publishedDate = formatPostDate(post.created_at ?? post.date);
                const featuredImage = getFeaturedImage(post);

                return (
                  <Link
                    key={postId ?? slug}
                    to={`/blog/${slug}`}
                    state={{ postId }}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-lg shadow-black/10 transition hover:border-ngrokBlue/40 hover:bg-white/10"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-[#123246]">
                      {featuredImage ? (
                        <img
                          src={featuredImage}
                          alt={title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#102b3b_0%,#15526b_58%,#33bbcf_100%)]">
                          <div aria-hidden="true" className="absolute inset-3 border border-white/20 sm:inset-5" />
                          <div className="relative flex flex-col items-center text-center text-white">
                            <span className="font-poppins text-4xl font-bold sm:text-5xl">SP</span>
                            <span className="mt-1 text-[10px] font-semibold uppercase text-white/75 sm:text-xs">
                              Featured story
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      {post.category && (
                        <span className="inline-flex self-start rounded-full border border-ngrokBlue/30 bg-ngrokBlue/10 px-3 py-1 text-xs font-medium text-ngrokBlue">
                          {post.category}
                        </span>
                      )}
                      <h3 className="mt-4 text-xl font-semibold leading-snug text-white">
                        {title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-7 text-gray-300">
                        {excerpt}
                      </p>
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs text-gray-400">
                        {publishedDate && <span>Published {publishedDate}</span>}
                        {post.readTime && <span>{post.readTime}</span>}
                      </div>
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
  const location = useLocation();
  const postIdFromNavigation = location.state?.postId;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => updateCanonicalLink(`/blog/${slug}`), [slug]);

  useEffect(() => {
    let cancelled = false;

    const loadPost = async () => {
      try {
        let postId = postIdFromNavigation;
        if (!postId) {
          const listResponse = await fetch(`${API_URL}/blogs`);
          if (!listResponse.ok) throw new Error("Unable to load blog posts.");
          const list = getPosts(await listResponse.json());
          const matchedPost = list.find((item) => {
            const title = item.title ?? item.name ?? "";
            return (item.slug || createSlug(title)) === slug;
          });

          if (!matchedPost) throw new Error("Blog post not found.");
          postId = matchedPost.id ?? matchedPost._id;
        }

        const postResponse = await fetch(
          `${API_URL}/blog?id=${encodeURIComponent(postId)}`
        );
        if (!postResponse.ok) throw new Error("Unable to load this blog post.");
        const data = await postResponse.json();
        const fetchedData = data?.blog ?? data?.data ?? data;
        const fetchedPost = Array.isArray(fetchedData)
          ? fetchedData[0]
          : fetchedData;

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
  }, [slug, postIdFromNavigation]);

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
  const publishedDate = formatPostDate(post.created_at ?? post.date);

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
        {publishedDate && <span>Published {publishedDate}</span>}
        {post.readTime && <span>{post.readTime}</span>}
      </div>
      <div
        className="blog-content mt-10 text-base leading-8 text-gray-200"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </article>
  );
};

export default Blog;
