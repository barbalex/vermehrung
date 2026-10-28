export const getShowTeilkultur = ({ userPersonOption, activeNodeArray }: { userPersonOption: import('../dbModel.ts').PersonOption | null | undefined; activeNodeArray: string[] }) =>
  // always show if url contains it
  !!userPersonOption?.tree_teilkultur || activeNodeArray?.[0] === 'Teilkulturen'
