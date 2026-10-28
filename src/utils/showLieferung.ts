export const getShowLieferung = ({
  userPersonOption,
  activeNodeArray,
}: {
  userPersonOption: import('../dbModel.ts').PersonOption | null | undefined
  activeNodeArray: string[]
}) =>
  // always show if url contains it
  userPersonOption?.tree_lieferung || activeNodeArray?.[0] === 'Lieferungen'
