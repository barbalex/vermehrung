// history urls must be built from the current path, not from
// activeNodeArray: with breadcrumbs enabled the form url's object-name
// suffix ('Art', 'Herkünfte', ...) lives outside activeNodeArray, so urls
// built from it would drop the form and the history could never render
const basePath = () =>
  window.location.pathname.replace(/\/histories(\/[^/]+)?$/, '')

export const historyUrlOpen = () => `${basePath()}/histories`

export const historyUrlClose = () => basePath()

export const historyUrlForRev = (rev: string) =>
  `${basePath()}/histories/${rev}`
