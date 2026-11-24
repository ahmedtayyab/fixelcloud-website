import { Link, useParams } from "react-router-dom";
import { postImage } from "../config/media";
import { BlogSidebar } from "../components/sections/BlogSidebar";
import { ContentBody } from "../components/sections/ContentBody";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { usePageMeta } from "../hooks/usePageMeta";
import { parseContent } from "../utils/parseContent";
import { formatDate, posts } from "../utils/posts";

export function PostPage() {
  const { slug = "" } = useParams();
  const post = posts.find((item) => item.slug === slug);

  usePageMeta(post?.title ?? "Insight not found", post?.excerpt);

  if (!post) {
    return (
      <Container className="py-24 md:py-section-lg">
        <h1 className="heading-section">Article not found</h1>
        <Button href="/blog" variant="tertiary" className="mt-6">
          Back to insights
        </Button>
      </Container>
    );
  }

  const parsed = parseContent(post.blocks);
  const image = postImage(post.slug);
  const lead = parsed.summary;

  return (
    <Container className="grid gap-14 py-16 md:py-section lg:grid-cols-[minmax(0,1fr)_270px] lg:gap-[60px]">
      <article>
        {image ? (
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="aspect-[16/9] w-full object-cover"
          />
        ) : null}
        <ul className="mt-6 flex flex-wrap gap-1.5">
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
        <p className="mt-4 text-sm font-bold text-ink">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h1 className="heading-section mt-2">{post.title}</h1>
        <div className="mt-8 space-y-6">
          {lead ? <p>{lead}</p> : null}
          <ContentBody blocks={parsed.blocks} compact article />
        </div>
        <Link className="mt-12 inline-flex text-sm font-bold tracking-wide text-brand uppercase transition-colors hover:text-brand-dark" to="/blog">
          ← Back to insights
        </Link>
      </article>
      <BlogSidebar />
    </Container>
  );
}
