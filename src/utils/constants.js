const constants = {
  appBarHeight: 64,
  titleRowHeight: 48,
  singleRowHeight: 48,
  getGraphQlUri: () => {
    if (typeof window === 'undefined') return
    return window?.location?.hostname === 'localhost'
      ? `http://${window.location.hostname}:8080/v1/graphql`
      : 'https://api.vermehrung.ch/v1/graphql'
  },
  getGraphQlWsUri: () => {
    if (typeof window === 'undefined') return
    return window?.location?.hostname === 'localhost'
      ? `ws://${window.location.hostname}:8080/v1/graphql`
      : 'wss://api.vermehrung.ch/v1/graphql'
  },
  getHealthUri: () => {
    if (typeof window === 'undefined') return
    return window?.location?.hostname === 'localhost'
      ? `http://${window.location.hostname}:8080/healthz`
      : 'https://api.vermehrung.ch/healthz'
  },
  authUri: 'https://auth.vermehrung.ch',
  getAppUri: () => {
    if (typeof window === 'undefined') return
    return window?.location?.hostname === 'localhost'
      ? `http://${window.location.hostname}:8000`
      : 'https://vermehrung.ch'
  },
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

export default constants
