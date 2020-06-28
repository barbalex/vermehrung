export default () => {
  if (typeof window === 'undefined') return
  const hostnameWithoutWww = window.location.hostname.replace('www.', '')
  const isLocalhost = hostnameWithoutWww === 'localhost'
  const hostname = isLocalhost ? 'localhost' : window.location.hostname

  return {
    graphQlUri: 'https://api.vermehrung.ch/v1/graphql',
    graphQlWsUri: 'wss://api.vermehrung.ch/v1/graphql',
    heaslthUri: 'https://api.vermehrung.ch/healthz',
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
