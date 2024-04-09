function createDateFromString(date: string): Date {
    const day = parseInt(date.substring(0, 2));
    const month = parseInt(date.substring(2, 4)) - 1;
    const year = parseInt(date.substring(4, 8));
    return new Date(year, month, day);
  }

  function getDateParameter(date: Date): string {
    const dayString = date.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString();
    const monthString = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth().toString();
    const yearString = date.getFullYear().toString();

    return dayString + monthString + yearString;
  }

  export { createDateFromString, getDateParameter }