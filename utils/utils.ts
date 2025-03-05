export function extractIdFromUrl(url: string): number | null {
  // Remove any trailing slash
  const cleanUrl = url.replace(/\/$/, '');

  // Split the URL by '/' and get the last segment
  const urlParts = cleanUrl.split('/');
  const lastSegment = urlParts[urlParts.length - 1];

  // Convert to number, return null if not a valid number
  const id = parseInt(lastSegment, 10);

  return isNaN(id) ? null : id;
}
