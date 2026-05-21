import type { SupportedLanguage } from './dantalion';
import { isBirthdayInSupportedRange } from './personality-form';

export type PermalinkInput = {
  birthday: string;
  language: SupportedLanguage;
  nickname?: string | undefined;
};

export const encodePermalink = ({
  birthday,
  language,
  nickname,
}: PermalinkInput): string => {
  const params = new URLSearchParams();
  params.set('d', birthday);
  if (nickname) {
    params.set('n', nickname);
  }
  return `/${language}/?${params.toString()}`;
};

export type DecodedPermalink = {
  birthday: string | null;
  nickname: string | undefined;
};

export const decodePermalink = (
  search: string | URLSearchParams,
): DecodedPermalink => {
  const params =
    typeof search === 'string' ? new URLSearchParams(search) : search;
  const rawBirthday = params.get('d') ?? '';
  const birthday = isBirthdayInSupportedRange(rawBirthday) ? rawBirthday : null;
  const rawNickname = params.get('n')?.trim() ?? '';
  const nickname =
    rawNickname.length > 0 ? rawNickname.slice(0, 32) : undefined;
  return { birthday, nickname };
};
