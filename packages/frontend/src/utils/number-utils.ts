export const formatNumber = (
  number: number | string | undefined,
  options: Intl.NumberFormatOptions = {}
): string | undefined => {
  if (number === undefined) return undefined
  return new Intl.NumberFormat('en-US', options).format(Number(number))
}
