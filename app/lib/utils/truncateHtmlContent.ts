export function truncateHtmlContent(content: string, maxWords: number): string {
  const strippedText = content.replace(/(<([^>]+)>)/gi, '');
  const words = strippedText.split(/\s+/);
  const truncatedWords = words.slice(0, maxWords).join(' ');

  return truncatedWords + (words.length > maxWords ? '...' : '');
}
