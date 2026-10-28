export const isValid = (x: number | string | null | undefined) => !x || (Number(x) >= -90 && Number(x) <= 90)
export const message = `Der Breitengrad muss zwischen -90 und 90 liegen`
