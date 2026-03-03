export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatNumericToken(token: string): string {
  const numeric = Number(token);
  if (!Number.isFinite(numeric)) return token;

  const decimals = token.includes(".") ? token.split(".")[1]?.length ?? 0 : 0;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(numeric);
}

export function formatAmount(value: string | number | null | undefined): string {
  if (value == null) return "-";
  if (typeof value === "number") return formatNumber(value);

  const input = String(value);
  // Formats numeric segments inside mixed strings, e.g. "₦8500/night" -> "₦8,500/night".
  return input.replace(/\d+(?:\.\d+)?/g, (match) => formatNumericToken(match));
}
