import type { ReadonlyRecord } from '../types.mjs';

/** Type definition for the resources object. */
export type Resources = ReadonlyRecord<ResourcesKeys, string>;

/** Type definition for the resources keys. */
export type ResourcesKeys = 'language';
