import { description } from '../../package.json' with { type: 'json' };
import type { Resources } from './types.mjs';

const resources: Resources = {
  author: 'Kuroné Kito',
  description,
  language: '🇬🇧',
  siteName: 'Dantalion',
};

export default resources;
