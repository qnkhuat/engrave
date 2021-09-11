export const formatHexString = (s: string): string => {
  if (s.startsWith("0x")) return s
  else return "0x" + s
}
