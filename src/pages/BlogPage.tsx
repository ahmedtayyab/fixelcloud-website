import { Link, useSearchParams } from "react-router-dom";
import { postImage } from "../config/media";
import { BlogSidebar } from "../components/sections/BlogSidebar";
import { Container } from "../components/ui/Container";
import { ArrowIcon } from "../components/ui/Icons";
import { usePageMeta } from "../hooks/usePageMeta";
import { formatDate, posts } from "../utils/posts";

const PER_PAGE = 6;

export function BlogPage() {
  const [params] = useSearchParams();
  const category = params.get("category");
  const filtered = category ? posts.filter((post) => post.categories.includes(category)) : posts;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(pageCount, Math.max(1, Number(params.get("page")) || 1));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  usePageMeta(category ? `${category} - Insights` : "Insights", "Articles from Fixelcloud on AI, design, development, and digital operations.");

  const pageHref = (target: number) => {
    const next = new URLSearchParams(params);
    if (target === 1) next.delete("page");
    else next.set("page", String(target));
    const query = next.toString();
    return `/blog${query ? `?${query}` : ""}`;
  };

  return (
    <Container className="grid gap-14 py-16 md:py-section lg:grid-cols-[minmax(0,1fr)_270px] lg:gap-[60px]">
      <div>
        <h1 className={category ? "heading-section mb-8" : "sr-only"}>{category ? `Category: ${category}` : "Insights"}</h1>
        <ul className="space-y-14">
          {visible.map((post) => {
            const image = postImage(post.slug);
            return (
              <li key={post.slug}>
                <article className="lift group border border-line bg-white">
                  {image ? (
                    <div className="relative">
                      <Link to={`/blog/${post.slug}`} className="block overflow-hidden" tabIndex={-1} aria-hidden="true">
                        <img
                          src={image.src}
                          alt=""
                          width={image.width}
                          height={image.height}
                          loading="lazy"
                          className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </Link>
                      {post.categories.length ? (
                        <ul className="absolute bottom-4 left-6 flex flex-wrap gap-1.5 md:left-10">
                          {post.categories.map((name) => (
                            <li key={name}>
                              <Link
                                className="press inline-block bg-brand px-2.5 py-1 text-[13px] leading-5 font-bold text-white uppercase hover:bg-brand-dark"
                                to={`/blog?category=${encodeURIComponent(name)}`}
                              >
                                {name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="px-6 py-8 md:px-10">
                    <p className="text-sm font-bold text-ink">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </p>
                    <h2 className="mt-2 text-2xl leading-8 font-bold md:text-[30px] md:leading-10">
                      <Link className="transition-colors hover:text-brand" to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-4 text-base leading-8">{post.excerpt.replace(/\s*\[…\]$/, "…")}</p>
                    <Link
                      className="group/more mt-6 inline-flex items-center gap-2 text-sm font-bold tracking-wide text-brand uppercase hover:text-brand-dark"
                      to={`/blog/${post.slug}`}
                    >
                      <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover/more:translate-x-1" />
                      Learn more<span className="sr-only">: {post.title}</span>
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
        {pageCount > 1 ? (
          <nav className="mt-12 flex gap-2" aria-label="Pagination">
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((target) => (
              <Link
                key={target}
                to={pageHref(target)}
                aria-current={target === page ? "page" : undefined}
                className={`press flex h-11 w-11 items-center justify-center text-base font-bold ${target === page ? "bg-brand text-white" : "bg-field text-ink hover:bg-brand hover:text-white"}`}
              >
                {target}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
      <BlogSidebar />
    </Container>
  );
}
