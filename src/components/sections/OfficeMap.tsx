import { useEffect, useRef, useState } from "react";
import { site } from "../../config/site";

interface GoogleMaps {
  maps: {
    Map: new (element: HTMLElement, options: object) => GoogleMap;
    Marker: new (options: object) => GoogleMarker;
    InfoWindow: new (options: object) => GoogleInfoWindow;
    LatLngBounds: new () => { extend: (position: object) => void };
  };
}

interface GoogleMap {
  setZoom: (zoom: number) => void;
  setCenter: (position: object) => void;
  fitBounds: (bounds: object, padding?: number) => void;
  addListener: (event: string, handler: () => void) => void;
}

interface GoogleMarker {
  addListener: (event: string, handler: () => void) => void;
  getPosition: () => object;
}

interface GoogleInfoWindow {
  open: (map: GoogleMap, marker: GoogleMarker) => void;
  close: () => void;
}

declare global {
  interface Window {
    google?: GoogleMaps;
    gm_authFailure?: () => void;
  }
}

let mapsPromise: Promise<GoogleMaps | null> | null = null;

function loadMaps(key: string) {
  if (window.google?.maps) return Promise.resolve(window.google);
  mapsPromise ??= new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}`;
    script.async = true;
    script.onload = () => resolve(window.google?.maps ? window.google : null);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
  return mapsPromise;
}

/* The three office pins from the original contact page. Falls back to the addresses if Maps cannot load. */
export function OfficeMap() {
  const node = useRef<HTMLDivElement>(null);
  const openers = useRef<Record<string, () => void>>({});
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    window.gm_authFailure = () => {
      if (!cancelled) setFailed(true);
    };
    loadMaps(site.mapsKey).then((google) => {
      if (cancelled || !node.current) return;
      if (!google) {
        setFailed(true);
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      const map = new google.maps.Map(node.current, {
        zoom: 3,
        center: { lat: 31.71, lng: 0 },
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });
      let open: GoogleInfoWindow | null = null;
      site.mapOffices.forEach((office) => {
        const position = { lat: office.lat, lng: office.lng };
        bounds.extend(position);
        const marker = new google.maps.Marker({
          position,
          map,
          title: office.title,
        });
        const info = new google.maps.InfoWindow({
          content: `<div style="font-family:Montserrat,sans-serif"><strong>${office.title}</strong><br>${office.address}</div>`,
        });
        const show = () => {
          open?.close();
          info.open(map, marker);
          open = info;
          map.setZoom(12);
          map.setCenter(marker.getPosition());
        };
        marker.addListener("click", show);
        openers.current[office.title] = show;
      });
      map.fitBounds(bounds, 80);
      map.addListener("click", () => open?.close());
      window.setTimeout(() => {
        if (!cancelled && node.current?.querySelector(".gm-err-container, .gm-err-message")) setFailed(true);
      }, 1500);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section aria-label="Office locations">
      <div ref={node} className={failed ? "hidden" : "h-[420px] w-full bg-canvas md:h-[520px]"} />
      <ul className="mx-auto grid max-w-[1100px] gap-6 px-5 py-8 sm:grid-cols-3">
        {site.mapOffices.map((office) => (
          <li key={office.title}>
            <button type="button" className="text-left" onClick={() => openers.current[office.title]?.()}>
              <p className="font-display text-base font-extrabold text-ink">{office.title}</p>
              <p className="mt-1 text-sm leading-6">{office.address}</p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
