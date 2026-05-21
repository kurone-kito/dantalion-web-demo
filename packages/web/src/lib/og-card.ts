import type { Genius, SupportedLanguage } from './dantalion';

export type OgCardInput = {
  fileIdLabel: string;
  footerUrl: string;
  innerGenius: Genius;
  language: SupportedLanguage;
  nickname?: string | undefined;
  outerGenius: Genius;
  resultHeading: string;
  workStyleGenius: Genius;
};

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;

type Brand = {
  background: string;
  foreground: string;
  muted: string;
  accent: string;
};

const readBrand = (): Brand => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return {
      accent: '#7c3aed',
      background: '#ffffff',
      foreground: '#111827',
      muted: '#6b7280',
    };
  }
  const styles = window.getComputedStyle(document.documentElement);
  const fallback = (value: string, fb: string): string => {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : fb;
  };
  return {
    accent: fallback(styles.getPropertyValue('--color-primary'), '#7c3aed'),
    background: fallback(
      styles.getPropertyValue('--color-base-100'),
      '#ffffff',
    ),
    foreground: fallback(
      styles.getPropertyValue('--color-base-content'),
      '#111827',
    ),
    muted: fallback(styles.getPropertyValue('--color-base-content'), '#6b7280'),
  };
};

const drawWrappedText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 2,
): number => {
  const words = text.split(/(\s+)/u);
  const lines: string[] = [];
  let current = '';
  for (const part of words) {
    const candidate = current + part;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      if (current.length > 0) lines.push(current.trim());
      current = part;
      if (lines.length >= maxLines - 1) break;
    }
  }
  if (current.length > 0 && lines.length < maxLines) {
    lines.push(current.trim());
  }
  for (const [index, line] of lines.entries()) {
    ctx.fillText(line, x, y + index * lineHeight);
  }
  return y + lines.length * lineHeight;
};

const FONT_STACK =
  "system-ui, -apple-system, 'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', sans-serif";

type CardCanvas =
  | { kind: 'offscreen'; canvas: OffscreenCanvas }
  | { kind: 'element'; canvas: HTMLCanvasElement };

const createCanvas = (): CardCanvas => {
  if (typeof OffscreenCanvas !== 'undefined') {
    return {
      canvas: new OffscreenCanvas(CARD_WIDTH, CARD_HEIGHT),
      kind: 'offscreen',
    };
  }
  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  return { canvas, kind: 'element' };
};

const get2dContext = (
  surface: CardCanvas,
): OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D => {
  const ctx = surface.canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to acquire 2D drawing context for OG card.');
  }
  return ctx as OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;
};

const toBlob = async (surface: CardCanvas): Promise<Blob> => {
  if (surface.kind === 'offscreen') {
    return surface.canvas.convertToBlob({ type: 'image/png' });
  }
  return new Promise<Blob>((resolve, reject) => {
    surface.canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to encode PNG from canvas.'));
    }, 'image/png');
  });
};

export const renderOgCard = async (input: OgCardInput): Promise<Blob> => {
  const brand = readBrand();
  const surface = createCanvas();
  const ctx = get2dContext(surface) as CanvasRenderingContext2D;

  // background
  ctx.fillStyle = brand.background;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  // accent bar
  ctx.fillStyle = brand.accent;
  ctx.fillRect(0, 0, CARD_WIDTH, 12);

  // wordmark
  ctx.fillStyle = brand.accent;
  ctx.font = `700 28px ${FONT_STACK}`;
  ctx.textBaseline = 'top';
  ctx.fillText('Dantalion', 80, 72);

  // file id chip
  ctx.fillStyle = brand.foreground;
  ctx.font = `500 24px ${FONT_STACK}`;
  ctx.fillText(`${input.fileIdLabel}: ${input.innerGenius}`, 80, 120);

  // heading
  ctx.fillStyle = brand.foreground;
  ctx.font = `700 56px ${FONT_STACK}`;
  drawWrappedText(ctx, input.resultHeading, 80, 200, CARD_WIDTH - 160, 64, 2);

  // axes row
  const axisLabels: readonly { label: string; value: Genius; tint: string }[] =
    [
      { label: 'INNER', tint: brand.accent, value: input.innerGenius },
      { label: 'OUTER', tint: brand.foreground, value: input.outerGenius },
      { label: 'WORK', tint: brand.muted, value: input.workStyleGenius },
    ];
  const axisY = 380;
  const axisGap = (CARD_WIDTH - 160) / axisLabels.length;
  axisLabels.forEach((axis, index) => {
    const x = 80 + axisGap * index;
    ctx.fillStyle = axis.tint;
    ctx.font = `600 22px ${FONT_STACK}`;
    ctx.fillText(axis.label, x, axisY);
    ctx.fillStyle = brand.foreground;
    ctx.font = `800 80px ${FONT_STACK}`;
    ctx.fillText(axis.value, x, axisY + 36);
  });

  // footer
  ctx.fillStyle = brand.muted;
  ctx.font = `400 24px ${FONT_STACK}`;
  ctx.fillText(input.footerUrl, 80, CARD_HEIGHT - 64);

  return toBlob(surface);
};

export const canShareFiles = (): boolean => {
  if (typeof navigator === 'undefined' || !('canShare' in navigator)) {
    return false;
  }
  try {
    const probe = new File([new Uint8Array([0])], 'probe.png', {
      type: 'image/png',
    });
    return navigator.canShare?.({ files: [probe] }) ?? false;
  } catch {
    return false;
  }
};
