import { useRowLabel } from './useRowLabel.ts'

export const RowCrumb = ({
  folder,
  parentFolder,
  id,
}: {
  folder: string
  parentFolder?: string | number
  id: string | number
}) => {
  const label = useRowLabel({ folder, parentFolder, id })

  return <>{label ?? String(id)}</>
}
