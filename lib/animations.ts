import type { Transition, Variants } from "framer-motion";

export const EASE_OUT = "easeOut" as const;
export const REVEAL_DISTANCE = 24;
export const REVEAL_DURATION = 0.5;
export const STAGGER_GAP = 0.1;
export const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const;

export function revealTransition(reduced: boolean, delay = 0): Transition {
  return { duration: reduced ? 0.2 : REVEAL_DURATION, ease: EASE_OUT, delay: reduced ? 0 : delay };
}

/** Spread onto a motion component for the site-wide fade + slide-up scroll-reveal. */
export function fadeInUpProps(reduced: boolean, delay = 0) {
  return {
    initial: { opacity: 0, y: reduced ? 0 : REVEAL_DISTANCE },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT_ONCE,
    transition: revealTransition(reduced, delay),
  };
}

/** Spread onto a stagger container; children use `fadeInUpItemVariants`. */
export function staggerContainerProps(reduced: boolean, gap = STAGGER_GAP) {
  return {
    initial: "hidden",
    whileInView: "show",
    viewport: VIEWPORT_ONCE,
    variants: {
      hidden: {},
      show: { transition: { staggerChildren: reduced ? 0 : gap } },
    } satisfies Variants,
  };
}

export function fadeInUpItemVariants(reduced: boolean): Variants {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : REVEAL_DISTANCE },
    show: { opacity: 1, y: 0, transition: revealTransition(reduced) },
  };
}
