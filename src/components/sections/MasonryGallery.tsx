"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, ArrowUpRight } from "@/components/icons";
import { ZoomInIcon, ZoomOutIcon, Maximize2Icon, Minimize2Icon } from "@/components/icons-extended";
import { useT } from "@/i18n/provider";
import { format } from "@/i18n/provider";

const ASPECT_CLASS = {
  square: "aspect-square",
  tall: "aspect-[3/4]",
  short: "aspect-[4/3]",
  wide: "aspect-[3/2]",
  portrait: "aspect-[9/16]",
  landscape: "aspect-[16/10]",
} as const;

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;

export default function MasonryGallery() {
  const t = useT();
  const data = t.portfolio.data;
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    counts.set("All", data.projects.length);
    for (const p of data.projects) {
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    }
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, [data.projects]);

  const visible = activeFilter === "All"
    ? data.projects
    : data.projects.filter((p) => p.category === activeFilter);

  const [featured, ...rest] = visible;

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextProject = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % visible.length));
  }, [visible.length]);
  const prevProject = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + visible.length) % visible.length));
  }, [visible.length]);

  return (
    <section className="relative w-full bg-background">
      <div className="mx-auto w-full max-w-[123rem] px-24 pb-40 pt-80 sm:px-40 md:px-90 md:pb-60 md:pt-120">
        <div className="flex flex-col gap-32 md:flex-row md:items-end md:justify-between">
          <Reveal as="div" className="flex max-w-[80rem] flex-col gap-16">
            <span className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.2em] text-foreground/60">
              {data.eyebrow}
            </span>
            <h2
              className="font-display text-balance text-foreground"
              style={{
                fontSize: "clamp(3.6rem, 8vw, 8rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
              }}
            >
              {data.title}
            </h2>
            <p className="max-w-full text-pretty font-body text-[1.4rem] font-medium leading-[1.45] text-foreground/75 sm:max-w-[52rem] md:text-[1.6rem]">
              {data.body}
            </p>
          </Reveal>

          <Reveal as="div" delay={1} className="flex flex-col gap-8 md:items-end">
            <span className="font-mono text-[1.2rem] uppercase tracking-[0.15em] text-foreground/50">
              {String(visible.length).padStart(2, "0")} {data.projectCountLabel}
            </span>
            <span className="font-body text-[1.2rem] font-medium text-foreground/60">
              {data.zoomHint}
            </span>
          </Reveal>
        </div>

        <Reveal as="div" delay={1} className="mt-32 flex flex-wrap gap-8 md:mt-40">
          {categories.map(({ name, count }) => {
            const isActive = name === activeFilter;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setActiveFilter(name)}
                className="group inline-flex items-center gap-8 rounded-full border px-16 py-8 font-body text-[1.2rem] font-medium transition-all duration-300 md:text-[1.3rem]"
                style={{
                  borderColor: isActive ? "var(--color-pink)" : "oklab(0 0 0 / 0.15)",
                  backgroundColor: isActive ? "var(--color-pink)" : "transparent",
                  color: isActive ? "white" : "inherit",
                }}
              >
                <span>{name}</span>
                <span
                  className="font-mono text-[1.1rem] opacity-70"
                  style={{ color: isActive ? "white" : "oklab(0 0 0 / 0.5)" }}
                >
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </Reveal>
      </div>

      {featured ? (
        <Reveal variant="scale" className="mx-auto w-full max-w-[160rem] px-24 sm:px-40 md:px-60">
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="hover-zoom group block w-full overflow-hidden rounded-[2rem] border border-foreground/10 bg-cream-light text-left"
            aria-label={`${data.featuredLabel}: ${featured.title}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="img-zoom relative aspect-[4/3] overflow-hidden md:col-span-8 md:aspect-auto md:h-full">
                <Image
                  src={featured.src}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  fetchPriority="high"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ transitionTimingFunction: "var(--ease-snappy)" }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, oklab(0 0 0 / 0.55) 100%)",
                  }}
                />
                <div className="pointer-events-none absolute bottom-20 left-20 inline-flex items-center gap-8 rounded-full bg-white/95 px-14 py-8 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <Maximize2Icon className="size-14 text-foreground" />
                  <span className="font-body text-[1.2rem] font-semibold text-foreground">{data.zoomBadgeLabel}</span>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-16 p-32 md:col-span-4 md:p-60">
                <div className="flex flex-wrap items-center gap-12 font-body text-[1.1rem] font-semibold uppercase tracking-[0.15em]">
                  <span className="rounded-full bg-foreground px-12 py-4 text-white">{data.featuredLabel}</span>
                  <span className="text-foreground/55">{featured.category}</span>
                </div>
                <h3
                  className="font-display text-balance text-foreground"
                  style={{
                    fontSize: "clamp(2.6rem, 4.4vw, 4.6rem)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {featured.title}
                </h3>
                {featured.description ? (
                  <p className="text-pretty font-body text-[1.4rem] font-medium leading-[1.5] text-foreground/75 md:text-[1.5rem]">
                    {featured.description}
                  </p>
                ) : null}
                <div className="mt-8 flex flex-wrap items-center gap-x-16 gap-y-4 font-body text-[1.2rem] font-medium text-foreground/55">
                  {featured.location ? <span>{featured.location}</span> : null}
                  {featured.location && featured.year ? <span aria-hidden>·</span> : null}
                  {featured.year ? <span>{featured.year}</span> : null}
                </div>
              </div>
            </div>
          </button>
        </Reveal>
      ) : null}

      <div className="mx-auto w-full max-w-[160rem] px-24 pb-80 pt-40 sm:px-40 md:px-60 md:pb-120 md:pt-60">
        <div
          key={activeFilter}
          className="columns-1 gap-16 sm:columns-2 md:columns-3 lg:columns-4"
        >
          {rest.map((project, i) => (
            <Reveal
              key={`${activeFilter}-${project.src}`}
              variant="scale"
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="mb-16 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => openLightbox(i + 1)}
                className="hover-zoom img-zoom group relative block w-full overflow-hidden rounded-[1.2rem] bg-cream"
                aria-label={`${data.zoomBadgeLabel}: ${project.title}`}
              >
                <div className={`relative w-full ${ASPECT_CLASS[project.aspect]}`}>
                    <Image
                      src={project.src}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ transitionTimingFunction: "var(--ease-snappy)" }}
                    />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 35%, oklab(0 0 0 / 0.9) 100%)",
                    }}
                  />
                  <div className="pointer-events-none absolute right-12 top-12 grid size-32 place-items-center rounded-full bg-white/95 opacity-0 transition-all duration-500 group-hover:opacity-100 md:size-40">
                    <Maximize2Icon className="size-14 text-foreground md:size-18" />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-20 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="font-body text-[1.1rem] font-semibold uppercase tracking-[0.15em] text-cream/80">
                      {project.category}
                    </span>
                    <h3
                      className="mt-6 font-display text-cream"
                      style={{
                        fontSize: "clamp(1.6rem, 2.2vw, 2.2rem)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {project.title}
                    </h3>
                    <div className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-2 font-body text-[1.2rem] font-medium text-cream/75">
                      {project.location ? <span>{project.location}</span> : null}
                      {project.location && project.year ? <span aria-hidden>·</span> : null}
                      {project.year ? <span>{project.year}</span> : null}
                    </div>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="py-80 text-center font-body text-[1.4rem] text-foreground/60">
            {data.emptyState}
          </p>
        ) : null}
      </div>

      <Lightbox
        projects={visible}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextProject}
        onPrev={prevProject}
        labels={data.lightbox}
        bookSimilarLabel={data.bookSimilarLabel}
      />
    </section>
  );
}

interface LightboxProps {
  projects: ReturnType<typeof useT>["portfolio"]["data"]["projects"];
  index: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  labels: ReturnType<typeof useT>["portfolio"]["data"]["lightbox"];
  bookSimilarLabel: string;
}

function Lightbox({ projects, index, onClose, onNext, onPrev, labels, bookSimilarLabel }: LightboxProps) {
  const open = index !== null;
  const project = open ? projects[index] : null;

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOrigin = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const touchStart = useRef<{ x: number; y: number; t: number } | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const reset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    reset();
  }, [index, reset]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(1)));
      else if (e.key === "-") setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(1)));
      else if (e.key === "0") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onNext, onPrev, reset]);

  const clampPan = (x: number, y: number, z: number) => {
    if (z <= 1) return { x: 0, y: 0 };
    const el = imageRef.current;
    if (!el) return { x, y };
    const rect = el.getBoundingClientRect();
    const maxX = (rect.width * (z - 1)) / 2;
    const maxY = (rect.height * (z - 1)) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setZoom((z) => {
      const next = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, +(z + delta).toFixed(1)));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const startDrag = (clientX: number, clientY: number) => {
    if (zoom <= 1) return;
    setDragging(true);
    dragOrigin.current = { x: clientX, y: clientY, px: pan.x, py: pan.y };
  };

  const moveDrag = (clientX: number, clientY: number) => {
    if (!dragging || !dragOrigin.current) return;
    const dx = clientX - dragOrigin.current.x;
    const dy = clientY - dragOrigin.current.y;
    const next = clampPan(dragOrigin.current.px + dx, dragOrigin.current.py + dy, zoom);
    setPan(next);
  };

  const endDrag = () => {
    setDragging(false);
    dragOrigin.current = null;
  };

  const toggleZoom = () => {
    if (zoom > 1) {
      reset();
    } else {
      setZoom(2);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const tt = e.touches[0];
      touchStart.current = { x: tt.clientX, y: tt.clientY, t: Date.now() };
      startDrag(tt.clientX, tt.clientY);
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const tt = e.changedTouches[0];
    const dx = tt.clientX - touchStart.current.x;
    const dy = tt.clientY - touchStart.current.y;
    const dt = Date.now() - touchStart.current.t;
    touchStart.current = null;
    endDrag();
    if (zoom <= 1 && dt < 400 && Math.abs(dx) < 8 && Math.abs(dy) < 8) {
      toggleZoom();
    } else if (zoom <= 1 && Math.abs(dx) > 60 && Math.abs(dy) < 40) {
      dx < 0 ? onNext() : onPrev();
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) moveDrag(e.touches[0].clientX, e.touches[0].clientY);
  };

  const counter = format(labels.counterTemplate, {
    current: String(index! + 1).padStart(2, "0"),
    total: String(projects.length).padStart(2, "0"),
  });

  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[600] bg-foreground/95 backdrop-blur-xl"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — full screen`}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-16 p-24 md:p-32">
            <div
              className="pointer-events-auto flex items-center gap-16 text-cream"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[1.1rem] uppercase tracking-[0.18em] text-cream/55">
                  {counter}
                </span>
                <span className="font-body text-[1.1rem] font-semibold uppercase tracking-[0.15em] text-cream/80">
                  {project.category}
                </span>
              </div>
            </div>

            <div className="pointer-events-auto flex items-center gap-8" onClick={(e) => e.stopPropagation()}>
              <div className="hidden items-center gap-4 rounded-full border border-cream/20 bg-cream/5 p-4 md:flex">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(1)))}
                  className="grid size-36 place-items-center rounded-full text-cream transition-colors hover:bg-cream/10 disabled:opacity-30"
                  disabled={zoom <= MIN_ZOOM}
                  aria-label={labels.zoomOutLabel}
                >
                  <ZoomOutIcon className="size-16" />
                </button>
                <span className="min-w-[48px] text-center font-mono text-[1.2rem] tabular-nums text-cream">
                  {zoom.toFixed(1)}×
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(1)))}
                  className="grid size-36 place-items-center rounded-full text-cream transition-colors hover:bg-cream/10 disabled:opacity-30"
                  disabled={zoom >= MAX_ZOOM}
                  aria-label={labels.zoomInLabel}
                >
                  <ZoomInIcon className="size-16" />
                </button>
                <button
                  type="button"
                  onClick={toggleZoom}
                  className="ml-4 grid size-36 place-items-center rounded-full text-cream transition-colors hover:bg-cream/10"
                  aria-label={zoom > 1 ? labels.resetZoomLabel : labels.zoomToLabel}
                >
                  {zoom > 1 ? <Minimize2Icon className="size-16" /> : <Maximize2Icon className="size-16" />}
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="grid size-44 place-items-center rounded-full border border-cream/20 bg-cream/5 text-cream transition-colors hover:bg-cream/15"
                aria-label={labels.closeLabel}
              >
                <CloseIcon className="size-18" />
              </button>
            </div>
          </div>

          {projects.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="pointer-events-auto absolute left-16 top-1/2 z-10 grid size-56 -translate-y-1/2 place-items-center rounded-full border border-cream/20 bg-cream/5 text-cream transition-all hover:scale-105 hover:bg-cream/15 md:left-32 md:size-64"
                aria-label={labels.previousLabel}
              >
                <ArrowLeftIcon className="size-20" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="pointer-events-auto absolute right-16 top-1/2 z-10 grid size-56 -translate-y-1/2 place-items-center rounded-full border border-cream/20 bg-cream/5 text-cream transition-all hover:scale-105 hover:bg-cream/15 md:right-32 md:size-64"
                aria-label={labels.nextLabel}
              >
                <ArrowRightIcon className="size-20" />
              </button>
            </>
          ) : null}

          <div
            className="absolute inset-0 flex items-center justify-center p-32 md:p-60"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={project.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full max-h-full w-full max-w-full items-center justify-center"
              onWheel={handleWheel}
              onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
              onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onClick={(e) => {
                e.stopPropagation();
                if (zoom <= 1) toggleZoom();
              }}
              style={{
                cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in",
                touchAction: "none",
              }}
            >
              <img
                ref={imageRef}
                src={project.src}
                alt={project.title}
                width={1080}
                height={810}
                draggable={false}
                decoding="async"
                className="max-h-[78vh] max-w-full select-none rounded-[1.2rem] object-contain shadow-[0_3rem_8rem_-2rem_oklab(0_0_0_/0.6)] md:max-h-[80vh]"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transition: dragging ? "none" : "transform 0.25s var(--ease-snappy)",
                  willChange: "transform",
                }}
              />
            </motion.div>
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-24 md:p-32"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-auto mx-auto flex max-w-[140rem] flex-col gap-20 rounded-[1.6rem] border border-cream/15 bg-foreground/70 p-24 backdrop-blur md:flex-row md:items-end md:justify-between md:p-32">
              <div className="flex flex-col gap-8">
                <h3
                  className="font-display text-balance text-cream"
                  style={{
                    fontSize: "clamp(2rem, 3.6vw, 3.4rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {project.title}
                </h3>
                {project.description ? (
                  <p className="max-w-[60rem] text-pretty font-body text-[1.3rem] font-medium leading-[1.5] text-cream/80 md:text-[1.4rem]">
                    {project.description}
                  </p>
                ) : null}
                <div className="mt-4 flex flex-wrap items-center gap-x-16 gap-y-6 font-body text-[1.2rem] font-medium text-cream/65">
                  {project.client ? <span>{project.client}</span> : null}
                  {project.client && project.location ? <span aria-hidden>·</span> : null}
                  {project.location ? <span>{project.location}</span> : null}
                  {project.location && project.year ? <span aria-hidden>·</span> : null}
                  {project.year ? <span>{project.year}</span> : null}
                </div>
              </div>
              <a
                href="/contact"
                className="inline-flex w-fit items-center gap-8 self-start rounded-full bg-pink px-20 py-12 font-body text-[1.2rem] font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-foreground md:self-end"
              >
                <span>{bookSimilarLabel}</span>
                <ArrowUpRight className="size-14" />
              </a>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
