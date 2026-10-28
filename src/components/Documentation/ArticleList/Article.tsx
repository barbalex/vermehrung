import { useLocation, useNavigate } from 'react-router'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'
import { isEqual } from 'es-toolkit'

export interface ArticleNode {
  slug: string
  title?: string | null
  level?: number
  children?: ArticleNode[]
}

export const Article = ({ node }: { node: ArticleNode }) => {
  const navigate = useNavigate()
  const { slug, title, children } = node
  const activeUrl = `/Dokumentation/${slug}`

  const onClickMenuItem = () => navigate(`${activeUrl}/`)

  // reactive location: the react compiler memoizes this component, a
  // direct window.location read would never be re-evaluated on navigation
  const { pathname: locationPathname } = useLocation()
  const pathname = locationPathname?.split('/').filter((a) => !!a)
  const isParent = (children?.length ?? 0) > 0
  const isChild = node?.level === 2
  const pathSplit = activeUrl.split('/').filter((a) => !!a)
  const isParentOpen = pathSplit[1] === pathname[1]
  const isChildClosed = isChild && pathSplit[1] !== pathname[1]
  const active = isEqual(pathname, pathSplit)

  if (isChildClosed) return null

  return (
    <ListItemButton
      onClick={onClickMenuItem}
      selected={active}
      divider
      id={slug}
      sx={{
        // same visual language for the active document as the nav tree
        // uses for its active node
        ...(active && { color: '#D84315', fontWeight: 700 }),
      }}
      style={{ ...(isChild ? { paddingLeft: 35 } : {}) }}
    >
      <ListItemText onClick={onClickMenuItem}>
        {title ?? '(Titel fehlt)'}
      </ListItemText>
      {isParent && isParentOpen && <FaChevronDown />}
      {isParent && !isParentOpen && <FaChevronRight />}
    </ListItemButton>
  )
}
