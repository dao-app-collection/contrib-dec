export const capitalizeFirstLetter = (value: string | undefined): string => {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}
