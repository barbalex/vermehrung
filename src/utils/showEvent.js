export const getShowEvent = ({ userPersonOption, activeNodeArray }) =>
  // always show if url contains it
  userPersonOption?.tree_event || activeNodeArray?.[0] === 'Events'
