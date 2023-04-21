const activeFormFromActiveNodeArray = (url) => {
  //console.log('acitveFormFromActiveNodeArray, url:', url.slice())
  if (url.length === 0) {
    return 'root'
  }
  if (url.length === 1 && url[0] === 'Arten') {
    return 'arten'
  }
  if (url.length === 1 && url[0] === 'Events') {
    return 'events'
  }
  if (url.length === 1 && url[0] === 'Gaerten') {
    return 'gaerten'
  }
  if (url.length === 1 && url[0] === 'Herkuenfte') {
    return 'herkuenfte'
  }
  if (url.length === 1 && url[0] === 'Kulturen') {
    return 'kulturen'
  }
  if (url.length === 1 && url[0] === 'Lieferungen') {
    return 'lieferungen'
  }
  if (url.length === 1 && url[0] === 'Personen') {
    return 'personen'
  }
  if (url.length === 1 && url[0] === 'Sammel-Lieferungen') {
    return 'sammelLieferungen'
  }
  if (url.length === 1 && url[0] === 'Sammlungen') {
    return 'sammlungen'
  }
  if (url.length === 1 && url[0] === 'Teilkulturen') {
    return 'teilkulturen'
  }
  if (url.length === 1 && url[0] === 'Zaehlungen') {
    return 'zaehlungen'
  }
  if (url.length === 1) {
    return null
  }

  if (url.length === 2 && url[0] === 'Arten') {
    return 'art'
  }
  if (url.length === 2 && url[0] === 'Gaerten') {
    return 'garten'
  }
  if (url.length === 2 && url[0] === 'Herkuenfte') {
    return 'herkunft'
  }
  if (url.length === 2 && url[0] === 'Lieferungen') {
    return 'lieferung'
  }
  if (url.length === 2 && url[0] === 'Sammel-Lieferungen') {
    return 'sammel_lieferung'
  }
  if (url.length === 2 && url[0] === 'Teilkulturen') {
    return 'teilkultur'
  }
  if (url.length === 2 && url[0] === 'Zaehlungen') {
    return 'zaehlung'
  }
  if (url.length === 2 && url[0] === 'Events') {
    return 'event'
  }
  if (url.length === 2 && url[0] === 'Personen') {
    return 'person'
  }
  if (url.length === 2 && url[0] === 'Sammlungen') {
    return 'sammlung'
  }
  if (url.length === 2 && url[0] === 'Kulturen') {
    return 'kultur'
  }

  if (
    url.length === 3 &&
    url[0] === 'Sammel-Lieferungen' &&
    url[2] === 'Lieferungen'
  ) {
    return 'lieferungen'
  }
  if (url.length === 3 && url[0] === 'Sammlungen' && url[2] === 'Herkuenfte') {
    return 'herkuenfte'
  }
  if (
    url.length === 3 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen'
  ) {
    return 'lieferungen'
  }
  if (url.length === 3 && url[0] === 'Arten' && url[2] === 'Kulturen') {
    return 'kulturen'
  }
  if (url.length === 3 && url[0] === 'Arten' && url[2] === 'Sammlungen') {
    return 'sammlungen'
  }
  if (url.length === 3 && url[0] === 'Arten' && url[2] === 'Herkuenfte') {
    return 'herkuenfte'
  }
  if (url.length === 3 && url[0] === 'Gaerten' && url[2] === 'Kulturen') {
    return 'kulturen'
  }
  if (url.length === 3 && url[0] === 'Herkuenfte' && url[2] === 'Sammlungen') {
    return 'sammlungen'
  }
  if (url.length === 3 && url[0] === 'Kulturen' && url[2] === 'Events') {
    return 'events'
  }
  if (
    url.length === 3 &&
    url[0] === 'Kulturen' &&
    ['An-Lieferungen', 'Aus-Lieferungen'].includes(url[2])
  ) {
    return 'lieferungen'
  }
  if (url.length === 3 && url[0] === 'Kulturen' && url[2] === 'Teilkulturen') {
    return 'teilkulturen'
  }
  if (url.length === 3 && url[0] === 'Kulturen' && url[2] === 'Zaehlungen') {
    return 'zaehlungen'
  }
  if (url.length === 3 && url[0] === 'Personen' && url[2] === 'Gaerten') {
    return 'gaerten'
  }
  if (url.length === 3 && url[0] === 'Personen' && url[2] === 'Sammlungen') {
    return 'sammlungen'
  }
  if (url.length === 3 && url[0] === 'Personen' && url[2] === 'Lieferungen') {
    return 'lieferungen'
  }

  if (url.length === 4 && url[0] === 'Arten' && url[2] === 'Kulturen') {
    return 'kultur'
  }
  if (url.length === 4 && url[0] === 'Arten' && url[2] === 'Sammlungen') {
    return 'sammlung'
  }
  if (url.length === 4 && url[0] === 'Arten' && url[2] === 'Herkuenfte') {
    return 'herkunft'
  }
  if (url.length === 4 && url[0] === 'Gaerten' && url[2] === 'Kulturen') {
    return 'kultur'
  }
  if (url.length === 4 && url[0] === 'Herkuenfte' && url[2] === 'Sammlungen') {
    return 'sammlung'
  }
  if (url.length === 4 && url[0] === 'Personen' && url[2] === 'Gaerten') {
    return 'garten'
  }
  if (url.length === 4 && url[0] === 'Personen' && url[2] === 'Sammlungen') {
    return 'sammlung'
  }
  if (url.length === 4 && url[0] === 'Sammlungen' && url[2] === 'Herkuenfte') {
    return 'herkunft'
  }
  if (url.length === 4 && url[0] === 'Sammlungen' && url[2] === 'Kulturen') {
    return 'kultur'
  }
  if (
    url.length === 4 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen'
  ) {
    return 'lieferung'
  }
  if (
    url.length === 4 &&
    url[0] === 'Sammel-Lieferungen' &&
    url[2] === 'Lieferungen'
  ) {
    return 'lieferung'
  }
  if (url.length === 4 && url[0] === 'Kulturen' && url[2] === 'Zaehlungen') {
    return 'zaehlung'
  }
  if (
    url.length === 4 &&
    url[0] === 'Kulturen' &&
    url[2] === 'An-Lieferungen'
  ) {
    return 'lieferung'
  }
  if (
    url.length === 4 &&
    url[0] === 'Kulturen' &&
    url[2] === 'Aus-Lieferungen'
  ) {
    return 'lieferung'
  }
  if (url.length === 4 && url[0] === 'Kulturen' && url[2] === 'Events') {
    return 'event'
  }
  if (url.length === 4 && url[0] === 'Kulturen' && url[2] === 'Teilkulturen') {
    return 'teilkultur'
  }
  if (url.length === 4 && url[0] === 'Personen' && url[2] === 'Lieferungen') {
    return 'lieferung'
  }

  if (
    url.length === 5 &&
    url[0] === 'Arten' &&
    url[2] === 'Herkuenfte' &&
    url[4] === 'Sammlungen'
  ) {
    return 'sammlungen'
  }
  if (
    url.length === 5 &&
    url[0] === 'Arten' &&
    url[2] === 'Herkuenfte' &&
    url[4] === 'Kulturen'
  ) {
    return 'kulturen'
  }
  if (
    url.length === 5 &&
    url[0] === 'Arten' &&
    url[2] === 'Kulturen' &&
    url[4] === 'Events'
  ) {
    return 'events'
  }
  if (
    url.length === 5 &&
    url[0] === 'Arten' &&
    url[2] === 'Kulturen' &&
    ['An-Lieferungen', 'Aus-Lieferungen'].includes(url[4])
  ) {
    return 'lieferungen'
  }
  if (
    url.length === 5 &&
    url[0] === 'Arten' &&
    url[2] === 'Kulturen' &&
    url[4] === 'Teilkulturen'
  ) {
    return 'teilkulturen'
  }
  if (
    url.length === 5 &&
    url[0] === 'Arten' &&
    url[2] === 'Kulturen' &&
    url[4] === 'Zaehlungen'
  ) {
    return 'zaehlungen'
  }
  if (url.length === 5 && url[0] === 'Arten' && url[2] === 'Kulturen') {
    return 'kultur'
  }
  if (
    url.length === 5 &&
    url[0] === 'Gaerten' &&
    url[2] === 'Kulturen' &&
    url[4] === 'Events'
  ) {
    return 'events'
  }
  if (
    url.length === 5 &&
    url[0] === 'Gaerten' &&
    url[2] === 'Kulturen' &&
    ['An-Lieferungen', 'Aus-Lieferungen'].includes(url[4])
  ) {
    return 'lieferungen'
  }
  if (
    url.length === 5 &&
    url[0] === 'Gaerten' &&
    url[2] === 'Kulturen' &&
    url[4] === 'Teilkulturen'
  ) {
    return 'teilkulturen'
  }
  if (
    url.length === 5 &&
    url[0] === 'Gaerten' &&
    url[2] === 'Kulturen' &&
    url[4] === 'Zaehlungen'
  ) {
    return 'zaehlungen'
  }
  if (url.length === 5 && url[0] === 'Gaerten' && url[2] === 'Kulturen') {
    return 'kultur'
  }
  if (
    url.length === 5 &&
    url[0] === 'Arten' &&
    url[2] === 'Sammlungen' &&
    url[4] === 'Aus-Lieferungen'
  ) {
    return 'lieferungen'
  }
  if (
    url.length === 5 &&
    url[0] === 'Herkuenfte' &&
    url[2] === 'Sammlungen' &&
    url[4] === 'Aus-Lieferungen'
  ) {
    return 'lieferungen'
  }
  if (
    url.length === 5 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen'
  ) {
    return 'kulturen'
  }
  if (
    url.length === 5 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen'
  ) {
    return 'lieferung'
  }

  if (
    url.length === 6 &&
    url[0] === 'Arten' &&
    url[2] === 'Herkuenfte' &&
    url[4] === 'Sammlungen'
  ) {
    return 'sammlung'
  }
  if (
    url.length === 6 &&
    url[0] === 'Arten' &&
    url[2] === 'Herkuenfte' &&
    url[4] === 'Kulturen'
  ) {
    return 'kultur'
  }
  if (
    url.length === 6 &&
    url[0] === 'Arten' &&
    url[2] === 'Kulturen' &&
    ['An-Lieferungen', 'Aus-Lieferungen'].includes(url[4])
  ) {
    return 'lieferung'
  }
  if (
    url.length === 6 &&
    url[0] === 'Arten' &&
    url[2] === 'Sammlungen' &&
    url[4] === 'Aus-Lieferungen'
  ) {
    return 'lieferung'
  }
  if (
    url.length === 6 &&
    url[0] === 'Arten' &&
    url[2] === 'Kulturen' &&
    url[4] === 'Zaehlungen'
  ) {
    return 'zaehlung'
  }
  if (
    url.length === 6 &&
    url[0] === 'Arten' &&
    url[2] === 'Kulturen' &&
    url[4] === 'Events'
  ) {
    return 'event'
  }
  if (
    url.length === 6 &&
    url[0] === 'Arten' &&
    url[2] === 'Kulturen' &&
    url[4] === 'Teilkulturen'
  ) {
    return 'teilkultur'
  }
  if (
    url.length === 6 &&
    url[0] === 'Gaerten' &&
    url[2] === 'Kulturen' &&
    ['An-Lieferungen', 'Aus-Lieferungen'].includes(url[4])
  ) {
    return 'lieferung'
  }
  if (
    url.length === 6 &&
    url[0] === 'Gaerten' &&
    url[2] === 'Kulturen' &&
    url[4] === 'Zaehlungen'
  ) {
    return 'zaehlung'
  }
  if (
    url.length === 6 &&
    url[0] === 'Gaerten' &&
    url[2] === 'Kulturen' &&
    url[4] === 'Events'
  ) {
    return 'event'
  }
  if (
    url.length === 6 &&
    url[0] === 'Gaerten' &&
    url[2] === 'Kulturen' &&
    url[4] === 'Teilkulturen'
  ) {
    return 'teilkultur'
  }
  if (
    url.length === 6 &&
    url[0] === 'Herkuenfte' &&
    url[2] === 'Sammlungen' &&
    url[4] === 'Aus-Lieferungen'
  ) {
    return 'lieferung'
  }
  if (
    url.length === 6 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen'
  ) {
    return 'kultur'
  }
  if (
    url.length === 6 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen' &&
    url[4] === 'Kulturen'
  ) {
    return 'kultur'
  }

  if (
    url.length === 7 &&
    url[0] === 'Arten' &&
    url[2] === 'Herkuenfte' &&
    url[4] === 'Sammlungen' &&
    url[6] === 'Aus-Lieferungen'
  ) {
    return 'lieferungen'
  }
  if (
    url.length === 7 &&
    url[0] === 'Arten' &&
    url[2] === 'Herkuenfte' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Teilkulturen'
  ) {
    return 'teilkulturen'
  }
  if (
    url.length === 7 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Events'
  ) {
    return 'events'
  }
  if (
    url.length === 7 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen' &&
    url[4] === 'Kulturen' &&
    ['An-Lieferungen', 'Aus-Lieferungen'].includes(url[6])
  ) {
    return 'lieferungen'
  }
  if (
    url.length === 7 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Teilkulturen'
  ) {
    return 'teilkulturen'
  }
  if (
    url.length === 7 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Zaehlungen'
  ) {
    return 'zaehlungen'
  }
  if (
    url.length === 7 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Events'
  ) {
    return 'events'
  }
  if (
    url.length === 7 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen' &&
    ['An-Lieferungen', 'Aus-Lieferungen'].includes(url[6])
  ) {
    return 'lieferungen'
  }
  if (
    url.length === 7 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Teilkulturen'
  ) {
    return 'teilkulturen'
  }
  if (
    url.length === 7 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Zaehlungen'
  ) {
    return 'zaehlungen'
  }
  if (
    url.length === 7 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen'
  ) {
    return 'kultur'
  }

  if (
    url.length === 8 &&
    url[0] === 'Arten' &&
    url[2] === 'Herkuenfte' &&
    url[4] === 'Sammlungen' &&
    url[6] === 'Aus-Lieferungen'
  ) {
    return 'lieferung'
  }
  if (
    url.length === 8 &&
    url[0] === 'Arten' &&
    url[2] === 'Herkuenfte' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Teilkulturen'
  ) {
    return 'teilkultur'
  }
  if (
    url.length === 8 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen' &&
    ['An-Lieferungen', 'Aus-Lieferungen'].includes(url[6])
  ) {
    return 'lieferung'
  }
  if (
    url.length === 8 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Zaehlungen'
  ) {
    return 'zaehlung'
  }
  if (
    url.length === 8 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Events'
  ) {
    return 'event'
  }
  if (
    url.length === 8 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Teilkulturen'
  ) {
    return 'teilkultur'
  }
  if (
    url.length === 8 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen' &&
    url[4] === 'Kulturen' &&
    ['An-Lieferungen', 'Aus-Lieferungen'].includes(url[6])
  ) {
    return 'lieferung'
  }
  if (
    url.length === 8 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Zaehlungen'
  ) {
    return 'zaehlung'
  }
  if (
    url.length === 8 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Events'
  ) {
    return 'event'
  }
  if (
    url.length === 8 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Teilkulturen'
  ) {
    return 'teilkultur'
  }
  return null
}

export default activeFormFromActiveNodeArray
