export const getShowTeilkultur = ({ userPersonOption, activeNodeArray }) =>
  // always show if url contains it
  !!userPersonOption?.tree_teilkultur || activeNodeArray?.[0] === 'Teilkulturen'
