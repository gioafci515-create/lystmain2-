export const site = {
  instagram: "https://www.instagram.com/lystinvites/",
  instagramDm: "https://ig.me/m/lystinvites",
  tiktok: "https://www.tiktok.com/@lystinvites",
  platform: "https://lyst-nu.vercel.app/",
};

export type InviteCategory = "wedding" | "brand" | "party";

export type Invite = {
  slug: string;
  url: string;
  category: InviteCategory;
  date: string;
  features: ("rsvp" | "camera" | "voice" | "capsule" | "polls" | "gallery" | "map" | "letters")[];
};

export const invites: Invite[] = [
  {
    slug: "data-keti",
    url: "https://dataketi.vercel.app/",
    category: "wedding",
    date: "02.09.2026",
    features: ["rsvp", "map", "gallery", "voice"],
  },
  {
    slug: "object-07",
    url: "https://lyst-invite-1.vercel.app/",
    category: "brand",
    date: "01.10.2026",
    features: ["rsvp", "camera", "voice", "capsule", "gallery"],
  },
  {
    slug: "unfold",
    url: "https://lyst-invite-2.vercel.app/",
    category: "party",
    date: "14.11.2026",
    features: ["rsvp", "camera", "polls", "letters", "capsule"],
  },
  {
    slug: "nocturne",
    url: "https://lyst-invite-3.vercel.app/",
    category: "party",
    date: "31.12.2026",
    features: ["rsvp", "map", "gallery"],
  },
];
