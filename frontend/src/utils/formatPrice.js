export function formatPrice(num) {
  if (!num) return num;
  return num.toLocaleString("en-IN");
}
