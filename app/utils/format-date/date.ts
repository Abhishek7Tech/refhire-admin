export function formatMonth(val: string) {
  if (!val) return;
  const [year, month] = val.split("-");
  const date = new Date(+year, +month - 1);
  return date
    .toLocaleString("en-US", { month: "short", year: "numeric" })
    .replace(" ", "-");
}

export function convertMonthYearToInputFormat(dateStr: string): string {
  const monthMap: Record<string, string> = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const [monthStr, year] = dateStr.split("-");
  const month = monthMap[monthStr];
  return `${year}-${month}`;
}
