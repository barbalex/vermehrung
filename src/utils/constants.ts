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
  // in dev the auth service runs locally (backend-dev compose),
  // minting tokens signed with the dev api's secret
  getAuthUri: () =>
    window?.location?.hostname === 'localhost' ?
      `http://${window.location.hostname}:7000`
    : 'https://auth.vermehrung.ch',
  getAppUri: () =>
    window?.location?.hostname === 'localhost' ?
      `http://${window.location.host}`
    : 'https://vermehrung.ch',
  tree: {
    minimalWindowWidth: 1000,
  },
}
