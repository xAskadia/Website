import { useScroll, useTransform } from 'framer-motion'

/**
 * Wie `useScroll`, aber der Fortschritt läuft über eine Funktions-Transformation.
 * Dadurch nutzt Framer Motion keine native Scroll-Timeline-Beschleunigung, die bei
 * Sticky-Abschnitten und weichem Scrollen falsche Zwischenwerte liefern kann.
 */
export function useScrollProgress(options?: Parameters<typeof useScroll>[0]) {
  const { scrollYProgress, scrollY } = useScroll(options)
  const progress = useTransform(scrollYProgress, (v) => v)
  return { scrollYProgress: progress, scrollY }
}
