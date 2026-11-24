import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { CookieNotice } from "./CookieNotice";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (params.get("fluent-form") === "4") {
      navigate("/estimate", { replace: true });
    }
    const legacySearch = params.get("s");
    if (legacySearch) {
      navigate(`/search?q=${encodeURIComponent(legacySearch)}`, { replace: true });
    }
  }, [navigate, params]);

  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[70] focus:bg-white focus:px-4 focus:py-2"
        href="#main"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CookieNotice />
    </>
  );
}
