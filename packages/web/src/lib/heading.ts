export const formatHeading = (
  template: string,
  nickname: string | undefined,
  fallback: string,
): string => {
  const trimmed = nickname?.trim();
  const name = trimmed && trimmed.length > 0 ? trimmed : fallback;
  return template.replaceAll('{{nickname}}', name);
};

export const normalizeNickname = (
  value: string | null | undefined,
  maxLength = 32,
): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return undefined;
  }
  return trimmed.length > maxLength ? trimmed.slice(0, maxLength) : trimmed;
};
