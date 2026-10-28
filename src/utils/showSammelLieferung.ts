export const getShowSammelLieferung = ({ userPersonOption, activeNodeArray }: { userPersonOption: Record<string, unknown> | null | undefined; activeNodeArray: string[] }) =>
  // always show if url contains it
  !!userPersonOption?.tree_lieferung ||
  activeNodeArray?.[0] === 'Sammel-Lieferungen'
