export const getShowZaehlung = ({ userPersonOption, activeNodeArray }: { userPersonOption: Record<string, unknown> | null | undefined; activeNodeArray: string[] }) =>
  // always show if url contains it
  userPersonOption?.tree_zaehlung || activeNodeArray?.[0] === 'Zaehlungen'
