import type { Component } from 'solid-js';
import { InnerIcon } from '../components/result/axis-icons/inner-icon';
import { OuterIcon } from '../components/result/axis-icons/outer-icon';
import { WorkStyleIcon } from '../components/result/axis-icons/work-style-icon';

export type GeniusAxisId = 'inner' | 'outer' | 'workStyle';

export type GeniusAxisToken = {
  Icon: Component<{ class?: string }>;
  badgeTone: string;
  textTone: string;
};

export const geniusAxes: Record<GeniusAxisId, GeniusAxisToken> = {
  inner: {
    Icon: InnerIcon,
    badgeTone: 'badge-primary',
    textTone: 'text-primary',
  },
  outer: {
    Icon: OuterIcon,
    badgeTone: 'badge-secondary',
    textTone: 'text-secondary',
  },
  workStyle: {
    Icon: WorkStyleIcon,
    badgeTone: 'badge-accent',
    textTone: 'text-accent',
  },
};

export const geniusAxisIds: readonly GeniusAxisId[] = [
  'inner',
  'outer',
  'workStyle',
];
