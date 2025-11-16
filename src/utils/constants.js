export const constants = {
  singleRowHeight: 48,
  getGraphQlUri: () =>
    window?.location?.hostname === 'localhost' ?
      `http://${window.location.hostname}:8080/v1/graphql`
    : 'https://api.vermehrung.ch/v1/graphql',
  getGraphQlWsUri: () =>
    window?.location?.hostname === 'localhost' ?
      `ws://${window.location.hostname}:8080/v1/graphql`
    : 'wss://api.vermehrung.ch/v1/graphql',
  getHealthUri: () =>
    window?.location?.hostname === 'localhost' ?
      `http://${window.location.hostname}:8080/healthz`
    : 'https://api.vermehrung.ch/healthz',
  authUri: 'https://auth.vermehrung.ch',
  getAppUri: () =>
    window?.location?.hostname === 'localhost' ?
      `http://${window.location.host}`
    : 'https://vermehrung.ch',
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
