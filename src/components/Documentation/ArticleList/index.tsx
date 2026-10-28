import { useAtomValue } from 'jotai'
import List from '@mui/material/List'
import { useLocation } from 'react-router'

import { Article } from './Article.tsx'
import { docFilterAtom } from '../../../store/index.ts'
import { IntoViewScroller } from './IntoViewScroller.tsx'

import styles from './index.module.css'

import type { ArticleNode } from './Article.tsx'

export const ArticleList = ({ articles }: { articles: ArticleNode[] }) => {
  const docFilter = useAtomValue(docFilterAtom)

  const articlesFiltered = articles.filter(
    (node) => node.title?.toLowerCase?.()?.includes?.(docFilter) ?? true,
  )

  const { pathname } = useLocation()

  return (
    <div className={styles.container}>
      <List component="nav" dense>
        {articlesFiltered.map((node) => {
          const isOpen = pathname.includes(node.slug)

          return (
            <div key={node.slug}>
              <Article node={node} />
              {isOpen &&
                (node.children ?? []).map((child: ArticleNode) => (
                  <Article node={child} key={child.slug} />
                ))}
            </div>
          )
        })}
      </List>
      <IntoViewScroller />
    </div>
  )
}
