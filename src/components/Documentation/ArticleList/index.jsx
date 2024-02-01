import React, { useContext } from 'react'
import List from '@mui/material/List'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router-dom'

import Article from './Article'
import constants from '../../../utils/constants'
import storeContext from '../../../storeContext'
import IntoViewScroller from './IntoViewScroller'

const Container = styled.div`
  height: calc(100dvh - ${constants.appBarHeight}px);
  overflow-y: auto;
`

const ArticleList = ({ articles }) => {
  const store = useContext(storeContext)
  const { docFilter } = store

  const articlesFiltered = articles.filter(
    (node) => node.title?.toLowerCase?.()?.includes?.(docFilter) ?? true,
  )

  const { pathname } = useLocation()

  return (
    <Container>
      <List component="nav" dense>
        {articlesFiltered.map((node) => {
          const isOpen = pathname.includes(node.slug)

          return (
            <div key={node.slug}>
              <Article node={node} />
              {isOpen &&
                (node.children ?? []).map((child) => (
                  <Article node={child} key={child.slug} />
                ))}
            </div>
          )
        })}
      </List>
      <IntoViewScroller />
    </Container>
  )
}

export default observer(ArticleList)
