export function extractLocaleFromUrl(url: string): string {
  const match = url.match(/\/([a-z]{2}_[A-Z]{2})\//);

  // convert the locale from e.g. "de_DE" to "de-DE" so it matches the  Intl.DateTimeFormatOptions (see date.ts)
  return match ? match[1].replace("_", "-") : "de-DE";
}
