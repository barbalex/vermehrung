export default (h) => {
  // only show lokalname if exist
  // does not exist if user does not have right to see it
  const gemeinde = h.gemeinde ?? ''
  const lokalname = h.lokalname ?? ''
  const nr = h.nr ?? '(keine Nr.)'
  const label = [nr, gemeinde, lokalname].filter((e) => !!e).join(', ')

  return label
}
