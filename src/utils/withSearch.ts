// appends the current query string to a path: it carries linkable view
// state (filters, see modules/searchSync.ts) and must survive in-app
// navigation.
// currentSearch is tolerant of environments without a real location
// (unit tests run in node, some with a partial window stub).
export const currentSearch = (): string =>
  typeof window === 'undefined' || !window.location ?
    ''
  : (window.location.search ?? '')

export const withSearch = (path: string) => `${path}${currentSearch()}`

/** true when the browser is already on this exact url (path + search) */
export const isCurrentUrl = (url: string): boolean =>
  typeof window !== 'undefined' &&
  !!window.location &&
  `${window.location.pathname}${window.location.search ?? ''}` === url
