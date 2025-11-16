import { useNavigate } from 'react-router'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'
import { isEqual } from 'es-toolkit'

export const Article = ({ node }) => {
  const navigate = useNavigate()
  const { slug, title, children } = node
  const activeUrl = `/Dokumentation/${slug}`

  const onClickMenuItem = () => navigate(`${activeUrl}/`)

  const pathname = window?.location?.pathname?.split('/').filter((a) => !!a)
  const isParent = children?.length > 0
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
