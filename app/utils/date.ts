// Function to format the date with a given format
export function formatDateTime(
  isoString: string,
  locale: string,
  options: Intl.DateTimeFormatOptions,
): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat(locale, options).format(date);
}

// e.g Mon, Jul 29
export const humanReadableDate = (isoString: string, locale: string, timeZone?: string) => {
  return formatDateTime(isoString, locale, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    timeZone: timeZone,
  });
};

// e.g 17:00 o'clock
export const standardTimeFormat = (isoString: string, locale: string, timeZone?: string) => {
  const result = formatDateTime(isoString, locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timeZone,
  });

  return `${result} ${locale === "en-US" ? "o'clock" : "Uhr"}`;
};

// e.g. 01.08.2017
export const standardDateFormat = (isoString: string, locale: string, timeZone?: string) => {
  return formatDateTime(isoString, locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: timeZone,
  });
};

// e.g 31.1
export const basicDayAndMonthFormat = (isoString: string) => {
  const date = new Date(isoString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // getUTCMonth() returns 0-indexed month, so we add 1
  return `${day}.${month}`;
};
