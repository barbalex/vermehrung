import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'
import styled from '@emotion/styled'
import isEqual from 'lodash/isEqual'

const ListItem = styled(ListItemButton)`
  ${(props) => props.ischild1 === 'true' && 'padding-left: 35px !important;'}
`

const MenuItem = ({ node }) => {
  const navigate = useNavigate()
  const { slug, sort2 } = node.frontmatter
  const activeUrl = `/Dokumentation/${slug}`

  const onClickMenuItem = useCallback(
    () => navigate(`${activeUrl}/`),
    [activeUrl, navigate],
  )

  const pathname = window?.location?.pathname?.split('/').filter((a) => !!a)
  const isParent1 = sort2 === 0
  const isChild1 = sort2 > 0
  const pathSplit = activeUrl.split('/').filter((a) => !!a)
  const isParentOpen = pathSplit[1] === pathname[1]
  const isChildClosed = isChild1 && pathSplit[1] !== pathname[1]
  const active = isEqual(pathname, pathSplit)

  if (isChildClosed) return null

  return (
    <>
      <ListItem
        onClick={onClickMenuItem}
        selected={active}
        divider
        ischild1={isChild1.toString()}
      >
        <ListItemText onClick={onClickMenuItem}>
          {node?.frontmatter?.title ?? '(Titel fehlt)'}
        </ListItemText>
        {isParent1 && isParentOpen && <FaChevronDown />}
        {isParent1 && !isParentOpen && <FaChevronRight />}
      </ListItem>
    </>
  )
}

export default MenuItem
