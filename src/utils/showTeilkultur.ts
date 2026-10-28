export const getShowTeilkultur = ({ userPersonOption, activeNodeArray }: { userPersonOption: Record<string, unknown> | null | undefined; activeNodeArray: string[] }) =>
  // always show if url contains it
  !!userPersonOption?.tree_teilkultur || activeNodeArray?.[0] === 'Teilkulturen'
