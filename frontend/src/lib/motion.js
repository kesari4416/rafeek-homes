// Shared motion variants for framer-motion
export const easing = [0.65, 0, 0.35, 1];

export const lineReveal = {
  hidden: { y: "110%" },
  show: (i = 0) => ({
    y: "0%",
    transition: { duration: 0.9, ease: easing, delay: 0.15 + i * 0.12 },
  }),
};

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easing, delay: i * 0.08 },
  }),
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
