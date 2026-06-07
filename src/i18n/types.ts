/**
 * Single source of truth for every translatable string in the site.
 * Each locale dictionary must satisfy this shape (or a Partial of it,
 * which is deep-merged with the English fallback at load time).
 */

export interface NavItem {
  label: string;
  href: string;
  description: string;
  tags: string[];
  image: string;
}

export interface HeroData {
  pioneering: string[];
  title: string;
  body: string;
  scrollDownLabel: string;
  videoSrc: string;
}

export interface ParallaxGridData {
  title: string;
  body: string;
  previewImage?: string;
}

export interface FeatureItem {
  label: string;
  description: string;
}

export interface FeatureTabsData {
  heading: string;
  intro: string;
  features: FeatureItem[];
  image?: string;
  imageAlt?: string;
}

export interface ProductCard {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  videoSrc?: string;
  imageSrc?: string;
  align?: "left" | "right";
}

export interface ProductShowcaseData {
  eyebrow: string;
  seeFullPictureLabel: string;
  mobileTitle: string;
  cards: ProductCard[];
}

export interface SafetyHeroData {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  videoSrc?: string;
}

export interface Testimonial {
  id: string;
  company: string;
  companyLogoKind: "icon" | "text";
  companyIcon?: "airbnb" | "booking" | "expedia" | "tripadvisor" | "marriott" | "hilton";
  companyTextLogo?: string;
  brandColor?: string;
  rating: number;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorInitials: string;
  authorBg: string;
}

export interface PartnersData {
  eyebrow: string;
  heading: string;
  intro: string;
  trustedByLabel: string;
  becomePartnerLabel: string;
  testimonials?: Testimonial[];
  previousLabel?: string;
  nextLabel?: string;
}

export interface InsightsData {
  eyebrow: string;
  heading: string;
  intro: string;
  viewAllLabel: string;
  previousLabel: string;
  nextLabel: string;
}

export interface CareersCTAData {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface PricingFeature {
  text: string;
  highlight?: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  priceSuffix?: string;
  pricePrefix?: string;
  ctaLabel: string;
  ctaHref: string;
  features: PricingFeature[];
  badge?: "popular" | "new";
  accent?: "default" | "dark" | "pink";
}

export interface PricingData {
  eyebrow: string;
  title: string;
  body: string;
  billingNote: string;
  popularLabel: string;
  newLabel: string;
  tiers: PricingTier[];
}

export interface ProjectItem {
  src: string;
  title: string;
  category: string;
  aspect: "square" | "tall" | "short" | "wide" | "portrait" | "landscape";
  location?: string;
  year?: string;
  description?: string;
  client?: string;
}

export interface PortfolioData {
  eyebrow: string;
  title: string;
  body: string;
  projectCountLabel: string;
  zoomHint: string;
  featuredLabel: string;
  zoomBadgeLabel: string;
  emptyState: string;
  bookSimilarLabel: string;
  projects: ProjectItem[];
  lightbox: {
    counterTemplate: string; // "{current} / {total}"
    categoryLabel: string;
    ratingLabel: string;
    closeLabel: string;
    previousLabel: string;
    nextLabel: string;
    zoomInLabel: string;
    zoomOutLabel: string;
    resetZoomLabel: string;
    zoomToLabel: string;
  };
}

export interface ContactInfo {
  label: string;
  value: string;
  href?: string;
}

export interface ContactData {
  form: {
    subjects: string[];
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    sendInquiryLabel: string;
  };
  info: ContactInfo[];
  ctaBody: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  heroImage: string;
  author: { name: string; role: string; avatar: string };
  intro: string;
  sections: BlogSection[];
  outro: string;
  relatedSlugs: string[];
}

export interface BlogSection {
  heading?: string;
  body: string;
  image?: string;
  imageCaption?: string;
  pullquote?: string;
  list?: string[];
}

export interface BlogData {
  eyebrow: string;
  title: string;
  body: string;
  featuredLabel: string;
  noPostsLabel: string;
  subscribeHeading: string;
  subscribeBody: string;
  subscribeLabel: string;
  posts: BlogPost[];
}

export interface BookingServiceOption {
  id: string;
  name: string;
  price: string;
  description: string;
}

export interface BookingStep {
  title: string;
  subtitle: string;
}

export interface BookingFormData {
  bookSessionLabel: string;
  services: BookingServiceOption[];
  steps: BookingStep[];
  serviceStepTitle: string;
  serviceStepSubtitle: string;
  projectStepTitle: string;
  projectStepSubtitle: string;
  dateTimeStepTitle: string;
  dateTimeStepSubtitle: string;
  budgetStepTitle: string;
  budgetStepSubtitle: string;
  detailsStepTitle: string;
  detailsStepSubtitle: string;
  confirmStepTitle: string;
  confirmStepSubtitle: string;
  locationLabel: string;
  locations: string[];
  projectTypeLabel: string;
  projectTypePlaceholder: string;
  pickDateLabel: string;
  pickTimeLabel: string;
  selectedDateTemplate: string; // "Selected: {date}"
  budgetRangeLabel: string;
  budgetHint: string;
  yourDetailsLabel: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  phoneLabel: string;
  emailLabel: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  anythingElseLabel: string;
  notesPlaceholder: string;
  backLabel: string;
  continueLabel: string;
  sendRequestLabel: string;
  closeLabel: string;
  submittedHeaderTitle: string;
  requiredHint: string;
  confirmIntro: string;
  summary: {
    service: string;
    location: string;
    project: string;
    dateTime: string;
    budget: string;
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
  successTitleTemplate: string; // "Request sent, {firstName}."
  successGenericName: string;
  successBodyTemplate: string; // contains {service}, {location}, {email}
  successFallbackService: string;
  successFallbackLocation: string;
  successFallbackEmail: string;
  doneLabel: string;
}

/**
 * Recursive partial — every leaf and every nested object is optional.
 * Used for the FR dictionary stub so translators can fill in just the
 * fields they have translations for, without satisfying the full shape.
 */
export type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

export interface AISupportData {
  triggerLabel: string;
  closeLabel: string;
  title: string;
  subtitle: string;
  clearLabel: string;
  welcomeLabel: string;
  welcome: string;
  tryLabel: string;
  inputPlaceholder: string;
  sendLabel: string;
  errorFallback: string;
  emptyReply: string;
  clearAriaLabel: string;
  suggestions: string[];
}

export type Dictionary = {
  meta: {
    titleDefault: string;
    titleTemplate: string; // "%s — Lensies"
    description: string;
    keywords: string[];
    authors: { name: string }[];
    creator: string;
    ogSiteName: string;
    ogTitle: string;
    ogDescription: string;
    ogImageAlt: string;
    twitterTitle: string;
    twitterDescription: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
    pageTitle: {
      home: string;
      about: string;
      services: string;
      portfolio: string;
      pricing: string;
      contact: string;
      blog: string;
      blogPostTemplate: string; // e.g. "{title} — Lensies Field Notes"
    };
  };
  localeSwitcher: {
    enLabel: string;
    frLabel: string;
    ariaLabel: string;
  };
  nav: {
    items: NavItem[];
  };
  header: {
    bookButton: string;
    openMenuLabel: string;
    closeMenuLabel: string;
    logoAriaLabel: string;
    navigationLabel: string;
    previewLabel: string;
    getInTouchLabel: string;
    copyrightTemplate: string; // "© {year} Lensies"
  };
  footer: {
    taglineTemplate: string; // contains placeholders
    emailLabel: string;
    pressLabel: string;
    email: string;
    pressEmail: string;
    studioLabel: string;
    copyrightTemplate: string; // "© {year} Lensies Studio · Marrakech"
    aboutLinks: { label: string; href: string }[];
    socials: { label: string; href: string; kind: "instagram" | "youtube" | "x" }[];
  };
  backToTop: {
    label: string;
  };
  aiSupport: AISupportData;
  booking: BookingFormData;
  home: {
    hero: HeroData;
    platforms: { eyebrow: string };
    parallax: ParallaxGridData;
    features: FeatureTabsData;
    showcase: ProductShowcaseData;
    safety: SafetyHeroData;
    partners: PartnersData;
    insights: InsightsData;
    cta: CareersCTAData;
  };
  about: {
    hero: HeroData;
    parallax: ParallaxGridData;
    features: FeatureTabsData;
    showcase: ProductShowcaseData;
    safety: SafetyHeroData;
    partners: PartnersData;
    cta: CareersCTAData;
  };
  services: {
    hero: HeroData;
    parallax: ParallaxGridData;
    features: FeatureTabsData;
    showcase: ProductShowcaseData;
    safety: SafetyHeroData;
    partners: PartnersData;
    cta: CareersCTAData;
  };
  portfolio: {
    hero: HeroData;
    data: PortfolioData;
    cta: CareersCTAData;
  };
  pricing: {
    hero: HeroData;
    data: PricingData;
    cta: CareersCTAData;
  };
  contact: {
    hero: HeroData;
    parallax: ParallaxGridData;
    features: FeatureTabsData;
    form: ContactData["form"];
    info: ContactInfo[];
    ctaBody: string;
    safety: SafetyHeroData;
    cta: CareersCTAData;
  };
  blog: {
    hero: HeroData;
    data: BlogData;
    cta: CareersCTAData;
  };
  blogPost: {
    backLabel: string;
    backToAllLabel: string;
    shareLabel: string;
    shareOnXLabel: string;
    shareOnLinkedInLabel: string;
    copyLinkLabel: string;
    bookSessionLabel: string;
    relatedHeading: string;
    allPostsLabel: string;
    notFoundTitle: string;
    notFoundBody: string;
    backToBlogLabel: string;
  };
  notFound: {
    title: string;
    body: string;
    ctaLabel: string;
  };
};
