/** Scroll runway below the sticky pin (vh per message) */
export const VOICE_DEMO_SCROLL_VH_PER_LINE = 24;

export function getScrollRunwayHeightVh(lineCount: number): number {
  return Math.max(lineCount, 1) * VOICE_DEMO_SCROLL_VH_PER_LINE;
}

/** Per-line reveal 0–1; last line reaches 1 when conversationProgress is 1 */
export function getLineReveal(
  conversationProgress: number,
  lineIndex: number,
  lineCount: number
): number {
  if (lineCount <= 0 || conversationProgress <= 0) return 0;
  if (conversationProgress >= 1) return 1;

  const start = lineIndex / lineCount;
  const end = (lineIndex + 1) / lineCount;
  if (conversationProgress <= start) return 0;
  if (conversationProgress >= end) return 1;
  return (conversationProgress - start) / (end - start);
}

/**
 * 0 → section top reaches sticky offset (empty card).
 * 1 → section bottom reaches viewport bottom (conversation complete).
 */
export function getSectionScrollProgressFromRect(
  section: HTMLElement,
  stickyTopPx: number
): number {
  const rect = section.getBoundingClientRect();
  const viewH = window.innerHeight;
  const scrollRange = section.offsetHeight - viewH;

  if (scrollRange <= 0) return rect.top <= stickyTopPx ? 1 : 0;

  if (rect.top > stickyTopPx) return 0;
  if (rect.bottom <= viewH + 2) return 1;

  const traveled = stickyTopPx - rect.top;
  return Math.min(1, Math.max(0, traveled / scrollRange));
}
