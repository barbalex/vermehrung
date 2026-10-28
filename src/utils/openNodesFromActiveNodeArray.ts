export const openNodesFromActiveNodeArray = (activeNodeArray) =>
  activeNodeArray.map((n, index) => activeNodeArray.slice(0, index + 1))
