export const openNodesFromActiveNodeArray = (activeNodeArray: string[]) =>
  activeNodeArray.map((n, index) => activeNodeArray.slice(0, index + 1))
