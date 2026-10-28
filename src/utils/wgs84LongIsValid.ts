export const isValid = (x: number | string | null | undefined) =>
  !x || (Number(x) >= -180 && Number(x) <= 180)
export const message = `Der Längengrad muss zwischen -180 und 180 liegen`
