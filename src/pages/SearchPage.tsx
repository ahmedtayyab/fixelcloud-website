import { Link, useSearchParams } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { PageHero } from "../components/ui/PageHero";
import { usePageMeta } from "../hooks/usePageMeta";
import { searchContent } from "../utils/search";

export function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";
  const results = searchContent(query);
  usePageMeta(query ? `Search: ${query}` : "Search");

  return (
    <>
      <PageHero title="Search" summary="Find a service, industry, project, or insight." />
      <section>
        <Container className="py-16 md:py-section">
          <form className="flex max-w-2xl" action="/search" key={query}>
            <label className="sr-only" htmlFor="search-query">
              Search query
            </label>
            <input
              id="search-query"
              className="w-full bg-field px-4 py-3.5 text-base text-ink transition-colors focus:bg-white"
              name="q"
              defaultValue={query}
              placeholder="Search"
            />
            <button className="press bg-brand px-6 text-[15px] font-bold text-white uppercase hover:bg-brand-dark" type="submit">
              Search
            </button>
          </form>
          <p className="mt-8 text-base" aria-live="polite">
            {query ? `${results.length} results for “${query}”` : "Enter a word or phrase."}
          </p>
          <ul className="mt-4 max-w-3xl divide-y divide-line border-y border-line">
            {results.map((result) => (
              <li key={result.href} className="py-5">
                <p className="eyebrow text-brand">{result.kind}</p>
                <Link className="heading-card text-ink hover:text-brand" to={result.href}>
                  {result.title}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
