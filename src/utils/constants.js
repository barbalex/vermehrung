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
  tree: {
    minimalWindowWidth: 1000,
  },
}
