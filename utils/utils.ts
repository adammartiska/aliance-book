import { IMAGES_BASE_URL } from './constants';

export function extractIdFromUrl(url: string): number {
  // Remove any trailing slash
  const cleanUrl = url.replace(/\/$/, '');

  // Split the URL by '/' and get the last segment
  const urlParts = cleanUrl.split('/');
  const lastSegment = urlParts[urlParts.length - 1];

  // Convert to number, return null if not a valid number
  const id = parseInt(lastSegment, 10);

  return id;
}

export function getCharacterAvatarUri(url: string): string {
  const characterId = extractIdFromUrl(url);
  const avatarUrl = `${IMAGES_BASE_URL}/${characterId}.jpg`;
  return avatarUrl;
}
