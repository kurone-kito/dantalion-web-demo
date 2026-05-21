import {
  type Genius,
  isSupportedGenius,
  type SupportedLanguage,
} from './dantalion';

export type GeniusTriple = readonly [Genius, Genius, Genius];

export type ShareUrlInput = {
  innerGenius: Genius;
  language: SupportedLanguage;
  nickname?: string | undefined;
  outerGenius: Genius;
  workStyleGenius: Genius;
};

const NICKNAME_MAX_LENGTH = 32;

export const encodeShareUrl = (input: ShareUrlInput): string => {
  const triple = `${input.innerGenius}-${input.outerGenius}-${input.workStyleGenius}`;
  const params = new URLSearchParams();
  if (input.nickname) {
    params.set('n', input.nickname);
  }
  const query = params.toString();
  return `/${input.language}/result/${triple}/${query ? `?${query}` : ''}`;
};

export type DecodedShareUrl = {
  genius: GeniusTriple | null;
  nickname: string | undefined;
};

const parseTriple = (segment: string): GeniusTriple | null => {
  const parts = segment.split('-');
  if (parts.length !== 3) return null;
  const [inner, outer, workStyle] = parts;
  if (
    !isSupportedGenius(inner) ||
    !isSupportedGenius(outer) ||
    !isSupportedGenius(workStyle)
  ) {
    return null;
  }
  return [inner, outer, workStyle];
};

export const decodeShareTriple = (segment: string): GeniusTriple | null =>
  parseTriple(segment);

export const decodeShareUrl = (
  segment: string,
  search: string | URLSearchParams,
): DecodedShareUrl => {
  const triple = parseTriple(segment);
  const params =
    typeof search === 'string' ? new URLSearchParams(search) : search;
  const rawNickname = params.get('n')?.trim() ?? '';
  const nickname =
    rawNickname.length > 0
      ? rawNickname.slice(0, NICKNAME_MAX_LENGTH)
      : undefined;
  return { genius: triple, nickname };
};
