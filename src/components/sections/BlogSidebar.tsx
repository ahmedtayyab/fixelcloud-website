import { Link } from "react-router-dom";
import { postImage } from "../../config/media";
import { categories, formatDate, posts } from "../../utils/posts";

function WidgetTitle({ children }: { children: string }) {
  return (
    <h2 className="relative pb-4 text-xl font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-brand">
      {children}
    </h2>
  );
}

export function BlogSidebar() {
  const recent = posts.slice(0, 3);

  return (
    <aside className="space-y-12">
      <form action="/search" className="flex">
        <label className="sr-only" htmlFor="blog-search">
          Search insights
        </label>
        <input id="blog-search" name="q" className="w-full bg-field px-4 py-3 text-ink" placeholder="Search …" />
        <button className="w-12 shrink-0 bg-brand text-white transition-colors hover:bg-brand-dark" type="submit" aria-label="Search">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="mx-auto h-4 w-4 fill-none stroke-current" strokeWidth="2.4">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
        </button>
      </form>

      <section>
        <WidgetTitle>Categories</WidgetTitle>
        <ul className="mt-5 space-y-2">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                className="text-sm font-bold text-ink uppercase transition-colors hover:text-brand"
                to={`/blog?category=${encodeURIComponent(category.name)}`}
              >
                {category.name} <span className="font-normal text-muted">({category.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <WidgetTitle>Recent Posts</WidgetTitle>
        <ul className="mt-6 space-y-6">
          {recent.map((post) => {
            const image = postImage(post.slug);
            return (
              <li key={post.slug} className="flex gap-4">
                {image ? (
                  <img src={image.src} alt="" loading="lazy" className="h-[70px] w-[70px] shrink-0 object-cover" />
                ) : null}
                <div>
                  <Link className="font-display text-base leading-6 font-semibold text-ink transition-colors hover:text-brand" to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                  <p className="mt-1 text-sm leading-5">{formatDate(post.date)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </aside>
  );
}
