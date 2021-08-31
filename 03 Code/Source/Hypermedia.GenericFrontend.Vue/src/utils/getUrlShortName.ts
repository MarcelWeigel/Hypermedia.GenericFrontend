export function getUrlShortName(url: string | undefined): string {
  if (!url) {
    return 'undefined';
  }
  const match = /.*\/([^?]+)/g.exec(url);
  return match ? match[1] : url;
}
