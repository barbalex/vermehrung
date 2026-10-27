export const constants = {
  singleRowHeight: 48,
  getApiUri: () =>
    window?.location?.hostname === 'localhost' ?
      `http://${window.location.hostname}:8080`
    : 'https://api.vermehrung.ch',
  // the api root doubles as the health endpoint (PostgREST serves the
  // OpenApi spec there without authentication)
  getHealthUri: () =>
    window?.location?.hostname === 'localhost' ?
      `http://${window.location.hostname}:8080/`
    : 'https://api.vermehrung.ch/',
  authUri: 'https://auth.vermehrung.ch',
  getAppUri: () =>
    window?.location?.hostname === 'localhost' ?
      `http://${window.location.host}`
    : 'https://vermehrung.ch',
  tree: {
    minimalWindowWidth: 1000,
  },
}
