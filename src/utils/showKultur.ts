export const getShowKultur = ({ userPersonOption, activeNodeArray }: { userPersonOption: import('../dbModel.ts').PersonOption | null | undefined; activeNodeArray: string[] }) =>
  // always show if url contains it
  userPersonOption?.tree_kultur || activeNodeArray?.[0] === 'Kulturen'
