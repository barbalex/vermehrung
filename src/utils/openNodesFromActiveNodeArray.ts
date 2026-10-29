export const openNodesFromActiveNodeArray = (activeNodeArray: string[]) =>
  activeNodeArray.map((_, index) => activeNodeArray.slice(0, index + 1))
