import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "fixelcloud-consent";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem(STORAGE_KEY));
  }, []);

  if (!visible) return null;

  const choose = (value: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  return (
    <div className="fixed right-4 bottom-4 left-4 z-[60] max-w-[440px] border border-line bg-white p-6 shadow-card sm:right-auto">
      <h2 className="text-2xl font-extrabold text-ink">We value your privacy</h2>
      <p className="mt-3 text-base leading-7">
        We use cookies to enhance your browsing experience, serve personalised ads or content, and analyse our
        traffic. By clicking “Accept all”, you consent to our use of cookies. Read the{" "}
        <Link className="text-brand underline" to="/privacy-policy">
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button className="press border border-brand px-4 py-2.5 text-[15px] font-bold text-brand hover:bg-brand hover:text-white" type="button" onClick={() => choose("rejected")}>
          Reject all
        </button>
        <button className="press bg-brand px-4 py-2.5 text-[15px] font-bold text-white hover:bg-brand-dark" type="button" onClick={() => choose("accepted")}>
          Accept all
        </button>
      </div>
    </div>
  );
}
