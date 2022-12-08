export const stagger = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
};
