export function formatMonth(val: string) {
  if (!val) return;
  const [year, month] = val.split("-");
  const date = new Date(+year, +month - 1);
  return date
    .toLocaleString("en-US", { month: "short", year: "numeric" })
    .replace(" ", "-");
}
