export default ({ herkunft }) => {
  // only show lokalname if exist
  // does not exist if user does not have right to see it
  const gemeinde = herkunft?.gemeinde ?? ''
  const lokalname = herkunft?.lokalname ?? ''
  const nr = herkunft?.nr ?? '(keine Nr.)'
  const label = [nr, gemeinde, lokalname].filter((e) => !!e).join(', ')

  return label
}
