"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const SLIDES = [
  { type: "text", content: "Hi, baby...", pause: false },
  { type: "text", content: "It's me..", pause: false },
  { type: "text", content: "You are 26 today.", pause: false },
  {
    type: "text",
    content:
      "It's a little bit hard to believe that I've known you for 6 years.",
    pause: false,
  },
  { type: "text", content: "You were 19 when we first met.", pause: false },
  {
    type: "text",
    content: "You were 20 when you fell in love with me.",
    pause: false,
  },
  {
    type: "text",
    content: "I was 17 when I fell in love with you.",
    pause: false,
  },
  { type: "text", content: "It would've been quite the story.", pause: false },
  { type: "pause", content: "", pause: true },
  {
    type: "text",
    content: "I know you're not even half of what you hoped to be at this age.",
    pause: false,
  },
  {
    type: "text",
    content: "I suppose today you're feeling sad rather than happy.",
    pause: false,
  },
  {
    type: "text",
    content:
      "I worried about that and hoped to be there with you today so you wouldn't feel that way",
    pause: false,
  },
  { type: "text", content: "or feel alone.", pause: false },
  { type: "pause", content: "", pause: true },
  { type: "text", content: "But let me show you something", pause: false },
  {
    type: "image",
    content: "23rd March — the first picture you ever sent to me.",
    src: "/vee/1.jpg",
    pause: false,
  },
  {
    type: "image",
    content: "27th March — you used to like so many chains then.",
    src: "/vee/2.jpg",
    pause: false,
  },
  {
    type: "image",
    content:
      "This was the night we realized I liked you, with my legs soaked in water. It's the first and only time I've ever done that.",
    src: "/vee/3.jpeg",
    pause: false,
  },
  {
    type: "image",
    content: "This was the first video you took of me, I think.",
    src: "/vee/4.jpg",
    pause: false,
  },
  { type: "slideshow", content: "Our memories together.", pause: false },
  {
    type: "text",
    content:
      "We've been through so much together. Wins, house changes, relocation, losses, celebrations, hurts, insecurities, growth, development.",
    pause: false,
  },
  {
    type: "text",
    content:
      "And whenever I look at you, I see someone who has grown so much more than I ever imagined. From the moment we met. From the days of being a decorator to being a COO, to thinking in different systems, to reading, sticking to schedules.",
    pause: false,
  },
  { type: "text", content: "You inspire me.", pause: false },
  { type: "text", content: "You have your flaws.", pause: false },
  { type: "text", content: "You have your strengths.", pause: false },
  { type: "text", content: "God has his plans.", pause: false },
  { type: "text", content: "You have yours.", pause: false },
  {
    type: "text",
    content: "It may not be altogether right now.",
    pause: false,
  },
  { type: "text", content: "But I believe that it'll be.", pause: false },
  {
    type: "text",
    content: "And I may not be there with you right now.",
    pause: false,
  },
  {
    type: "text",
    content: "But I'm always here for you, whenever you need.",
    pause: false,
  },
  { type: "text", content: "And I'll always love you.", pause: false },
  {
    type: "text",
    content: "So, let's take a picture yet again.",
    pause: false,
  },
  { type: "text", content: "Smile...", pause: false },
  {
    type: "text",
    content: "And remember that today is a wonderful day.",
    pause: false,
  },
  {
    type: "text",
    content: "That a wonderful man came to earth from Heaven.",
    pause: false,
  },
  { type: "text", content: "And...", pause: false },
  { type: "text", content: "I have two songs for you.", pause: false },
  {
    type: "songs",
    videos: ["/vee/videos/1.mp4", "/vee/videos/2.mp4", "/vee/videos/3.mp4"],
    spotifyUrl:
      "https://open.spotify.com/track/59uhGXMiUlMNv5CnAf4y7l?si=4c97ff4110a943f4",
    spotifyLabel: "You're not alone",
  },
] as const;

const SLIDESHOW_IMAGES = [
  "/vee/slideshow/5.jpeg",
  "/vee/slideshow/6.jpg",
  "/vee/slideshow/7.jpg",
  "/vee/slideshow/8.jpeg",
  "/vee/slideshow/9.jpeg",
  "/vee/slideshow/10.jpg",
  "/vee/slideshow/11.jpg",
  "/vee/slideshow/12.jpg",
  "/vee/slideshow/23.jpg",
  "/vee/slideshow/IMG-20211026-WA0026.jpeg",
  "/vee/slideshow/IMG-20211213-WA0027.jpg",
  "/vee/slideshow/IMG-20220126-WA0022.jpg",
];

const SLIDESHOW_IMAGE_DWELL_MS = 2200;

const TUNE_STOP_AT_CONTENT = "I have two songs for you.";
const indexOfVideoSlide = SLIDES.findIndex(
  (s) => s.type === "text" && s.content === TUNE_STOP_AT_CONTENT,
);
const indexOfSlideshowSlide = SLIDES.findIndex((s) => s.type === "slideshow");

const DWELL_MIN_MS = 3500;
const DWELL_MAX_MS = 10000;
const MS_PER_WORD = 300;
const DWELL_SCALE = 3 / 4;

function getDwellMs(slide: (typeof SLIDES)[number]): number {
  let ms: number;
  if (slide.type === "pause") ms = 3500;
  else if (slide.type === "slideshow")
    ms = SLIDESHOW_IMAGES.length * SLIDESHOW_IMAGE_DWELL_MS + 600;
  else if (slide.type === "image") {
    const words = slide.content.split(/\s+/).filter(Boolean).length;
    ms = Math.max(6000, Math.min(10000, DWELL_MIN_MS + words * MS_PER_WORD));
  } else if (slide.type === "songs") ms = 120000;
  else {
    const words = slide.content.split(/\s+/).filter(Boolean).length;
    const byContent = DWELL_MIN_MS + words * MS_PER_WORD;
    ms = Math.max(DWELL_MIN_MS, Math.min(DWELL_MAX_MS, byContent));
  }
  return Math.round(ms * DWELL_SCALE);
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = (seed + i * 7) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const shuffledAll = shuffle([...SLIDESHOW_IMAGES], 42);
const SIDE_IMAGES = shuffledAll.slice(0, 6);
const SLIDESHOW_ONLY_IMAGES = shuffledAll.slice(6, 12);

function getSideImageForSlide(slideIndex: number): string {
  return SIDE_IMAGES[slideIndex % SIDE_IMAGES.length];
}

const throwIn = {
  initial: { opacity: 0, y: 80, scale: 0.92, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring" as const, damping: 22, stiffness: 200 },
  },
  exit: {
    opacity: 0,
    x: -120,
    filter: "blur(6px)",
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const AUDIO_VOLUME = 0.12;

export default function Vee() {
  const [nav, setNav] = useState({ index: 0, direction: 0 });
  const { index, direction } = nav;

  const [progress, setProgress] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const slide = SLIDES[index];
  const isPause = slide?.type === "pause";
  const isLast = index >= SLIDES.length - 1;
  const isFirst = index <= 0;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null,
  );
  const progressStartRef = useRef(0);
  const pausedStateRef = useRef<{ remaining: number; total: number } | null>(
    null,
  );
  const activeDurationRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // FIX: don't set this to true optimistically in .then() — only set it after
  // a confirmed successful play so startAudioIfNeeded always retries on failure.
  const audioStartedRef = useRef(false);

  const dwellMs = slide ? getDwellMs(slide) : 5000;
  const sideImage = useMemo(() => getSideImageForSlide(index), [index]);
  const showLeftImage = index <= indexOfSlideshowSlide;
  const isImageSlide = slide?.type === "image";
  const isSlideshowSlide = slide?.type === "slideshow";
  const leftIsMainImage = showLeftImage && (isImageSlide || isSlideshowSlide);
  const leftIsSideImage = showLeftImage && !leftIsMainImage;
  const fullWidthContent = index > indexOfSlideshowSlide;

  // FIX: extracted into a stable ref-based helper so it can be called from
  // togglePause without being re-created on every render (avoids stale closure
  // issues and ensures the pause button also unblocks audio on first tap).
  const startAudioIfNeeded = useCallback(() => {
    if (audioStartedRef.current) return;
    if (!audioRef.current) return;
    if (indexOfVideoSlide >= 0 && index >= indexOfVideoSlide) return;
    audioRef.current.volume = AUDIO_VOLUME;
    audioRef.current
      .play()
      .then(() => {
        audioStartedRef.current = true;
      })
      .catch(() => {
        // Autoplay still blocked — will retry on next interaction
      });
  }, [index]);

  const navigateTo = useCallback(
    (nextIndex: number) => {
      pausedStateRef.current = null;
      setIsPaused(false);
      setNav({ index: nextIndex, direction: nextIndex > index ? 1 : -1 });
      setProgress(1);
    },
    [index],
  );

  const goNext = useCallback(() => {
    if (!isLast) navigateTo(index + 1);
  }, [isLast, index, navigateTo]);
  const goPrev = useCallback(() => {
    if (!isFirst) navigateTo(index - 1);
  }, [isFirst, index, navigateTo]);

  // ── Timer + progress bar ──────────────────────────────────────────────────
  useEffect(() => {
    if (!slide || isLast || isPaused) return;

    const clearAll = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
      timerRef.current = null;
      progressRef.current = null;
    };
    clearAll();

    const duration = pausedStateRef.current?.remaining ?? dwellMs;
    const total = pausedStateRef.current?.total ?? dwellMs;
    pausedStateRef.current = null;
    activeDurationRef.current = duration;
    progressStartRef.current = performance.now();

    const tick = () => {
      const elapsed = performance.now() - progressStartRef.current;
      const alreadyConsumed = total - duration;
      const totalElapsed = alreadyConsumed + elapsed;
      const frac = Math.max(0, 1 - totalElapsed / total);
      setProgress(frac);
      if (frac > 0) progressRef.current = requestAnimationFrame(tick);
    };
    progressRef.current = requestAnimationFrame(tick);

    timerRef.current = setTimeout(() => {
      setNav((prev) => ({ index: prev.index + 1, direction: 1 }));
      setProgress(1);
    }, duration);

    return clearAll;
  }, [index, slide, isLast, dwellMs, isPaused]);

  // ── Audio setup ───────────────────────────────────────────────────────────
  useEffect(() => {
    const audio = new Audio("/vee/tune.wav");
    audio.loop = true;
    audio.volume = AUDIO_VOLUME;
    audioRef.current = audio;
    // Attempt autoplay — succeeds on desktop, usually blocked on mobile.
    // audioStartedRef is only set true on actual success.
    audio
      .play()
      .then(() => {
        audioStartedRef.current = true;
      })
      .catch(() => {
        // Will be retried on first user interaction via startAudioIfNeeded
      });
    return () => {
      audio.pause();
      audioRef.current = null;
      audioStartedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (
      index >= indexOfVideoSlide &&
      indexOfVideoSlide >= 0 &&
      audioRef.current
    ) {
      audioRef.current.pause();
    }
  }, [index]);

  // ── Pause / resume ────────────────────────────────────────────────────────
  const togglePause = useCallback(() => {
    // FIX: always try to start audio on any user interaction, including the
    // pause button — this is the most common first tap on mobile.
    startAudioIfNeeded();

    if (isPaused) {
      setIsPaused(false);
      if (
        audioRef.current &&
        audioStartedRef.current &&
        (indexOfVideoSlide < 0 || index < indexOfVideoSlide)
      ) {
        audioRef.current.play().catch(() => {});
      }
    } else {
      const elapsed = performance.now() - progressStartRef.current;
      const remaining = Math.max(0, activeDurationRef.current - elapsed);
      pausedStateRef.current = { remaining, total: dwellMs };
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
      timerRef.current = null;
      progressRef.current = null;
      setIsPaused(true);
      if (audioRef.current) audioRef.current.pause();
    }
  }, [isPaused, index, dwellMs, startAudioIfNeeded]);

  const exitX = direction >= 0 ? -120 : 120;
  const enterX = direction >= 0 ? 120 : -120;
  const blueFillPercent = (1 - progress) * 100;
  const blueOpacity = fullWidthContent ? 1 - progress : 1;

  return (
    <div className="relative min-h-dvh w-full touch-manipulation select-none overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 bg-black" />
      {fullWidthContent ? (
        <div
          className="absolute inset-0 z-0 will-change-[opacity]"
          style={{
            opacity: blueOpacity,
            background:
              "linear-gradient(to right, rgba(30,58,138,0.9) 0%, rgba(59,130,246,0.7) 100%)",
          }}
        />
      ) : (
        <div className="absolute left-1/2 top-0 bottom-0 z-0 w-1/2 overflow-hidden">
          <div
            className="h-full will-change-[width]"
            style={{
              width: `${blueFillPercent}%`,
              background:
                "linear-gradient(to right, rgba(30,58,138,0.9) 0%, rgba(59,130,246,0.7) 100%)",
            }}
          />
        </div>
      )}

      {/* Progress dots */}
      <div className="absolute left-0 right-0 top-4 z-20 flex justify-center gap-1.5 px-4 sm:top-6">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              startAudioIfNeeded();
              navigateTo(i);
            }}
            className="h-1.5 min-w-0 flex-1 max-w-8 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80"
            style={{
              backgroundColor:
                i === index ? "rgb(251 191 36)" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>

      {/* Layout */}
      <button
        type="button"
        className="absolute inset-0 z-10 flex w-full"
        onClick={(e) => {
          startAudioIfNeeded();
          const t = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - t.left;
          if (fullWidthContent) {
            if (x < t.width * 0.25) goPrev();
            else if (x > t.width * 0.75) goNext();
          } else {
            if (x < t.width * 0.35) goPrev();
            else if (x > t.width * 0.65) goNext();
          }
        }}
        aria-label="Next or previous slide"
      >
        {!fullWidthContent && (
          <div className="relative h-full w-1/2 shrink-0">
            {leftIsSideImage && (
              <motion.div
                key={`side-${index}`}
                className="relative flex h-full w-full items-center justify-center p-8 sm:p-14"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <Image
                    src={sideImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="50vw"
                    priority
                  />
                </div>
              </motion.div>
            )}
            {leftIsMainImage && isImageSlide && "src" in slide && (
              <motion.div
                key={`mainimg-${index}`}
                className="relative flex h-full w-full items-center justify-center p-6 sm:p-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <Image
                    src={slide.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="50vw"
                    priority
                  />
                </div>
              </motion.div>
            )}
            {leftIsMainImage && isSlideshowSlide && (
              <SlideshowCarousel isPaused={isPaused} />
            )}
          </div>
        )}

        {/* Content */}
        <div
          className={
            fullWidthContent
              ? `flex min-h-full w-full flex-col px-6 py-16 sm:px-10 sm:py-20 md:px-16 lg:px-24 ${
                  slide?.type === "songs"
                    ? "items-center justify-start overflow-y-auto overflow-x-hidden min-h-0"
                    : "items-center justify-center"
                }`
              : "flex w-1/2 flex-col items-start justify-center pl-4 pr-6 py-16 sm:pl-6 sm:pr-8 sm:py-20"
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            {slide && (
              <motion.div
                key={index}
                className={
                  fullWidthContent
                    ? "w-full max-w-3xl text-center md:max-w-4xl"
                    : "w-full max-w-lg text-left"
                }
                initial={{ opacity: 0, x: enterX, filter: "blur(8px)" }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    type: "spring" as const,
                    damping: 22,
                    stiffness: 200,
                  },
                }}
                exit={{
                  opacity: 0,
                  x: exitX,
                  filter: "blur(6px)",
                  transition: {
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1] as const,
                  },
                }}
              >
                {isPause ? (
                  <motion.div
                    className="flex justify-center gap-2 py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-2 w-2 rounded-full bg-amber-400/80"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                ) : slide.type === "text" ? (
                  <AnimatedText content={slide.content} />
                ) : slide.type === "image" && "src" in slide ? (
                  <motion.p
                    className="font-sans text-xl text-amber-100/90 sm:text-2xl"
                    initial={throwIn.initial}
                    animate={throwIn.animate}
                    exit={throwIn.exit}
                  >
                    {slide.content}
                  </motion.p>
                ) : slide.type === "slideshow" ? (
                  <motion.p
                    className="font-sans text-2xl text-amber-100/90 sm:text-3xl"
                    initial={throwIn.initial}
                    animate={throwIn.animate}
                    exit={throwIn.exit}
                  >
                    {slide.content}
                  </motion.p>
                ) : slide.type === "songs" ? (
                  <SongsSlide
                    videos={slide.videos}
                    spotifyUrl={slide.spotifyUrl}
                    spotifyLabel={slide.spotifyLabel}
                    onVideo3Play={() => {
                      fetch("/api/vee-notify", { method: "POST" }).catch(
                        () => {},
                      );
                    }}
                  />
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>

      {/* Nav */}
      <div className="absolute bottom-16 left-0 right-0 z-20 flex items-center justify-between px-4 sm:bottom-20 sm:px-8">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            startAudioIfNeeded();
            goPrev();
          }}
          disabled={isFirst}
          className="rounded-full p-2 text-amber-400/80 transition hover:bg-white/10 hover:text-amber-300 disabled:opacity-30 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Previous"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span className="text-sm text-amber-200/60">
          {index + 1} / {SLIDES.length}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            startAudioIfNeeded();
            goNext();
          }}
          disabled={isLast}
          className="rounded-full p-2 text-amber-400/80 transition hover:bg-white/10 hover:text-amber-300 disabled:opacity-30 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Next"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Pause / Play */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center sm:bottom-8">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            togglePause();
          }}
          className="rounded-full bg-amber-400/20 p-3 text-amber-400 transition hover:bg-amber-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? (
            <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

function AnimatedText({ content }: { content: string }) {
  const words = content.split(/\s+/).filter(Boolean);
  return (
    <motion.p
      className="font-sans text-3xl leading-tight text-amber-50 sm:text-4xl md:text-5xl"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
        hidden: {},
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${i}-${word}`}
          className="inline-block pr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ type: "spring" as const, damping: 18, stiffness: 200 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

function SongsSlide({
  videos,
  spotifyUrl,
  spotifyLabel,
  onVideo3Play,
}: {
  videos: readonly string[];
  spotifyUrl: string;
  spotifyLabel: string;
  onVideo3Play: () => void;
}) {
  const video3NotifiedRef = useRef(false);

  const handleVideo3Play = useCallback(() => {
    if (video3NotifiedRef.current) return;
    video3NotifiedRef.current = true;
    onVideo3Play();
  }, [onVideo3Play]);

  return (
    <motion.div
      className="space-y-6"
      initial={throwIn.initial}
      animate={throwIn.animate}
      exit={throwIn.exit}
    >
      <p className="font-sans text-lg text-amber-100/90 sm:text-xl">
        Watch the videos, then open the second song below.
      </p>
      <div className="flex flex-row flex-wrap justify-center gap-4">
        {videos.map((src, i) => (
          <div key={src} className="flex flex-col items-center gap-2">
            <span className="font-sans text-sm font-medium text-amber-200/90">
              Video {i + 1}
            </span>
            <video
              className="w-full max-w-[min(28vw,320px)] rounded-xl bg-neutral-900 object-contain aspect-video"
              src={src}
              controls
              playsInline
              preload="metadata"
              onPlay={i === 2 ? () => handleVideo3Play() : undefined}
            />
          </div>
        ))}
      </div>
      <a
        href={spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#1DB954] px-5 py-2.5 font-sans text-base font-medium text-white transition hover:bg-[#1ed760] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        onClick={(e) => e.stopPropagation()}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.48-4.32 0-12.96-2.28-12.96-6.72 0-.84.36-1.56.96-2.04.24-.18.54-.24.84-.24.3 0 .6.06.84.24.6.48.96 1.2.96 2.04 0 4.44-8.64 6.72-12.96 6.72-.36 0-.66-.12-1.02-.48-.24-.36-.3-.84-.06-1.2.24-.36.72-.48 1.08-.24 3.96 2.28 11.04 2.28 15 0 .36-.24.84-.12 1.08.24.24.72.36 1.08.06z" />
        </svg>
        Listen on Spotify
      </a>
    </motion.div>
  );
}

function SlideshowCarousel({ isPaused }: { isPaused: boolean }) {
  const [current, setCurrent] = useState(0);
  const total = SLIDESHOW_ONLY_IMAGES.length;

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1 < total ? c + 1 : c));
    }, SLIDESHOW_IMAGE_DWELL_MS);
    return () => clearInterval(id);
  }, [isPaused, total]);

  const img = SLIDESHOW_ONLY_IMAGES[current];

  return (
    <motion.div
      className="relative flex h-full w-full flex-col items-center justify-center p-6 sm:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative aspect-[4/5] w-full max-h-full overflow-hidden rounded-xl bg-neutral-800 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <Image
              src={img}
              alt=""
              fill
              className="object-cover"
              sizes="50vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {SLIDESHOW_ONLY_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(i);
            }}
            className="h-2 w-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            style={{
              backgroundColor:
                i === current ? "rgb(251 191 36)" : "rgba(255,255,255,0.25)",
            }}
            aria-label={`Memory ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
