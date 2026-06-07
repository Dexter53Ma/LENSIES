// Content types for the Waabi clone

export interface AnnouncementBarProps {
  text: string;
  linkText: string;
  linkHref: string;
}

export interface HeaderLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  logoHref?: string;
  activeHref?: string;
  onMenuClick?: () => void;
}

export interface HeroProps {
  pioneeringText: string;
  headlineFirst: string;
  headlineSecond: string;
  videoSrc: string;
  posterSrc?: string;
  onScrollDown?: () => void;
}

export interface ParallaxCell {
  src: string;
  alt: string;
  /** Whether this cell is the wider hero of its row. */
  wide?: boolean;
}

export interface ParallaxRow {
  cells: ParallaxCell[];
}

export interface ParallaxGridProps {
  introEyebrow: string;
  introBody: string;
  rows: ParallaxRow[];
  videoStrip: string[];
}

export interface FeatureItem {
  label: string;
  description: string;
  mediaSrc: string;
  mediaType: "image" | "video";
}

export interface FeatureTabsProps {
  heading: string;
  subhead: string;
  stickyMediaSrc: string;
  stickyMediaType: "image" | "video";
  features: FeatureItem[];
}

export interface ProductCard {
  eyebrow: string;
  title: string;
  href: string;
  image: string;
  ctaLabel: string;
}

export interface ProductShowcaseProps {
  title: string;
  ctaLabel: string;
  ctaHref: string;
  products: ProductCard[];
  backgroundMedia: string;
}

export interface SafetyHeroProps {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundMedia: string;
}

export interface PartnerCard {
  id: string;
  name: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  detailHref: string;
  detailLabel: string;
  bgImage: string;
  badge: string;
}

export interface PartnersProps {
  eyebrow?: string;
  heading: string;
  intro: string;
  partners: PartnerCard[];
}

export interface InsightTag {
  label: string;
  variant?: "default" | "muted";
}

export interface InsightArticle {
  title: string;
  date: string;
  tags: InsightTag[];
  image: string;
  href: string;
}

export interface InsightsProps {
  heading: string;
  intro: string;
  viewAllHref: string;
  articles: InsightArticle[];
}

export interface CareersCTAProps {
  heading: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImages: string[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  heading: string;
  emails: { label: string; href: string }[];
  aboutLinks: FooterLink[];
  socials: { label: string; href: string; icon: "linkedin" | "youtube" | "x" }[];
  copyright: string;
  privacyHref: string;
  privacyLabel: string;
}
