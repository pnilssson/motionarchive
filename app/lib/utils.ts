
function getMonthAndDayLink(month: number, day: number) {
    const readableMonth = month + 1;
    return `${readableMonth.toString()}/${day.toString()}`;
}

function getDayLink(day: number) {
    return `${day.toString()}`;
}

function getUrl(path: string) {
    const BASE_URL =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000";
  
  const INCLUDES_FORWARD_SLASH_AT_START_REGEX = /^\/(.|\n)*$/;
  const INCLUDES_FORWARD_SLASH_AT_START = (string: string) =>
    INCLUDES_FORWARD_SLASH_AT_START_REGEX.test(string);

    return `${BASE_URL}${!INCLUDES_FORWARD_SLASH_AT_START(path) ? "/" : ""}${path}`;
}

function dateToDateInput(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

export { getMonthAndDayLink, getDayLink, getUrl,dateToDateInput }