export const exists = <T>(val: T | null | undefined): val is T =>
  val !== undefined && val !== null && val !== ''
