// asset imports with the ?url suffix return the emitted asset's URL
declare module '*?url' {
  const url: string
  export default url
}
