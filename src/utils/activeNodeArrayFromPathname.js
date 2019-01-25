export default () => {
  if (typeof window !== 'undefined') {
    return (
      window.location.pathname
        .split('/')
        .filter(e => !!e && e !== 0)
        // need to decode in case of Umlaute
        .map(e => decodeURIComponent(e))
        // convert numbers to numbers
        .map(e => {
          if (!isNaN(e)) {
            return +e
          }
          return e
        })
    )
  }
  return []
}
