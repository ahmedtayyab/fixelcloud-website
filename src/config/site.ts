import { asset } from "./media";

export type SocialId = "facebook" | "instagram" | "linkedin" | "youtube" | "dribbble";

export const site = {
  name: "Fixelcloud",
  title: "Digital Solutions - Fixelcloud",
  email: "contact@fixelcloud.com",
  phones: [
    { label: "+971 56 891 8084", href: "tel:+971568918084", region: "MENA" },
    { label: "+1 718873-3069", href: "tel:+17188733069", region: "USA" },
  ],
  address: "2925 Richmond Ave, Houston, TX 77098",
  /** Key published on fixelcloud.com for the contact map. */
  mapsKey: "AIzaSyCJxCN9-qbXA3WZcVJ_9lu3X9FpHhvQxdI",
  mapOffices: [
    {
      title: "FixelCloud, Pakistan",
      address: "Office #10, 1st Floor, Leeds Centre, Gulberg, Lahore, Pakistan",
      lat: 31.48597,
      lng: 74.26905,
    },
    {
      title: "FixelCloud, Dubai",
      address: "16th Floor, Green Tower Building, Riggat Al Buteen, Deira, Dubai",
      lat: 25.25791,
      lng: 55.31919,
    },
    {
      title: "FixelCloud, USA",
      address: "2925 Richmond Ave, Houston, TX 77098",
      lat: 29.7335,
      lng: -95.417,
    },
  ],
  offices: [
    {
      region: "MENA Office",
      lines: ["16th Floor, Green Tower Building, Riggat Al Buteen, Deira, Dubai"],
      phone: "+971 56 891 8084",
      phoneHref: "tel:+971568918084",
    },
    {
      region: "USA Office",
      lines: ["2925 Richmond Ave, Houston, TX 77098"],
      phone: "+1 718873 3069",
      phoneHref: "tel:+17188733069",
    },
  ],
  socials: [
    { id: "facebook", label: "Facebook", href: "https://www.facebook.com/fixelcloud/", color: "#3b5998" },
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/fixelcloud/", color: "#262626" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/fixel-cloud/", color: "#0077b5" },
    { id: "youtube", label: "YouTube", href: "https://www.youtube.com/channel/UCN5v69s7G-VVSmgpXl83F4A", color: "#cd201f" },
    { id: "dribbble", label: "Dribbble", href: "https://dribbble.com/fixelcloud", color: "#ea4c89" },
  ] satisfies { id: SocialId; label: string; href: string; color: string }[],
  logo: asset("2020/09/Group-1000002892.png"),
  videos: [
    { id: "AhcYNHjBQqY", title: "Why Trusts Fixelcloud" },
    { id: "6tN3-X7u4tk", title: "Fixelcloud Success Story" },
    { id: "ZL1kHdYQ5i8", title: "Honest Review of Fixelcloud" },
  ],
};

export const media = {
  hero: asset("2025/04/new-banner-scaled-1.jpg"),
  pageHeader: asset("2024/12/2.jpg"),
  linesBanner: asset("2024/12/website-Banner-1.png"),
  consultation: asset("2024/05/70310f46-6f86-4e35-835e-f9a2dfd3ac51-scaled.jpg"),
  footerMark: asset("2019/12/Frame-334266-2.png"),
  brandMark: asset("2024/12/Group-1000003967-2-1138x1536.png"),
  partners: [
    { name: "Guidewire", src: asset("2024/05/1.png") },
    { name: "Walmart", src: asset("2024/05/2.png") },
    { name: "Macy's", src: asset("2024/05/4.png") },
    { name: "Michaels", src: asset("2024/05/5.png") },
    { name: "Microsoft", src: asset("2024/05/6.png") },
  ],
  stack: [
    { name: "Angular", src: asset("2025/01/pngegg-32-150x150.png") },
    { name: "MongoDB", src: asset("2025/01/pngegg-35-150x150.png") },
    { name: "Node JS", src: asset("2025/01/pngegg-33-150x150.png") },
    { name: "Django", src: asset("2025/01/pngegg-34-150x150.png") },
  ],
  certifications: [
    { name: "PSEB", src: asset("2025/10/pakistan-software-export-board-pseb-logo-png_seeklogo-610709.png") },
    { name: "PITB", src: asset("2019/12/Screenshot-2025-11-05-163357.png") },
    { name: "Emporia", src: asset("2025/10/Screenshot-2025-10-31-225007.png") },
    { name: "PSDF", src: asset("2019/12/images-1-e1769689142912.png") },
  ],
  aboutTiles: [1, 2, 3, 4].map((n) => asset(`2020/02/image-box${n}.jpg`)),
  aboutTeam: asset("2024/12/medium-shot-people-working-with-computers-1024x683.jpg"),
  team: [1, 5, 2, 6, 3, 7, 4, 8].map((n) => asset(`2020/01/member${n}.jpg`)),
  ecommerce: [
    asset("2025/02/young-man-using-discount-coupon-his-smartphone-some-online-shopping-laptop-1024x683.jpg"),
    asset("2025/02/mobile-application-design-illustrator-creativity-concept-1024x716.jpg"),
    asset("2025/02/marketing-creative-collage-with-phone-1024x662.jpg"),
  ],
};
