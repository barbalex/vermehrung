export default (fragment) =>
  (fragment?.definitions?.[0]?.selectionSet?.selections).map(
    (d) => d?.name?.value,
  )
