import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
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
  const { slug, title, children } = node
  const activeUrl = `/Dokumentation/${slug}`

  const onClickMenuItem = useCallback(
    () => navigate(`${activeUrl}/`),
    [activeUrl, navigate],
  )

  const pathname = window?.location?.pathname?.split('/').filter((a) => !!a)
  const isParent = children?.length > 0
  const isChild = node?.level === 2
  const pathSplit = activeUrl.split('/').filter((a) => !!a)
  const isParentOpen = pathSplit[1] === pathname[1]
  const isChildClosed = isChild && pathSplit[1] !== pathname[1]
  const active = isEqual(pathname, pathSplit)

  if (isChildClosed) return null

  return (
    <>
      <ListItem
        onClick={onClickMenuItem}
        selected={active}
        divider
        ischild1={isChild.toString()}
        id={slug}
      >
        <ListItemText onClick={onClickMenuItem}>
          {title ?? '(Titel fehlt)'}
        </ListItemText>
        {isParent && isParentOpen && <FaChevronDown />}
        {isParent && !isParentOpen && <FaChevronRight />}
      </ListItem>
    </>
  )
}

export default MenuItem
