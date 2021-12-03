const constants = () => {
  if (typeof window === 'undefined') return
  const hostnameWithoutWww = window.location.hostname.replace('www.', '')
  const isLocalhost = hostnameWithoutWww === 'localhost'
  const hostname = isLocalhost ? 'localhost' : window.location.hostname

  return {
    appBarHeight: 64,
    titleRowHeight: 48,
    singleRowHeight: 48,
    graphQlUri: isLocalhost
      ? `http://${hostname}:8080/v1/graphql`
      : 'https://api.vermehrung.ch/v1/graphql',
    graphQlWsUri: isLocalhost
      ? `ws://${hostname}:8080/v1/graphql`
      : 'wss://api.vermehrung.ch/v1/graphql',
    healthUri: isLocalhost
      ? `http://${hostname}:8080/healthz`
      : 'https://api.vermehrung.ch/healthz',
    authUri: 'https://auth.vermehrung.ch',
    appUri: isLocalhost ? `http://${hostname}:8000` : 'https://vermehrung.ch',
    testArten: ['1ab6bbb1-979a-4232-a5d8-62efb5cb984a'],
    tree: {
      minimalWidth: 331,
      minimalWindowWidth: 1000,
    },
    sidebar: {
      width: 420,
      minimalWindowWidth: 1000,
    },
  }
}

export default constants
