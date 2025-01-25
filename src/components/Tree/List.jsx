/**
 * needed to place list in own component
 * because ref did not work when this was included in it's parent
 * listRef.current was always null
 */
import React, { useContext, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
import { FixedSizeList as List } from 'react-window'

import { MobxStoreContext } from '../../mobxStoreContext.js'
import { TreeRow } from './Row.jsx'

const StyledList = styled(List)`
  margin-top: 5px;

  @media print {
    display: none !important;
  }
`

const Container = styled.div`
  width: 100%;
  .react-contextmenu {
    display: flex;
    flex-direction: column;
    min-width: 100px;
    padding: 5px 0;
    margin: 2px 0 0;
    font-size: 14px;
    text-align: left;
    background-color: rgb(66, 66, 66);
    background-clip: padding-box;
    border: 1px solid grey;
    border-radius: 0.25rem;
    outline: none;
    opacity: 0;
    pointer-events: none;
    font-family: 'Roboto', sans-serif;
    transition: opacity 250ms ease !important;
    /* no idea why this is needed */
    margin-top: -70px;
  }
  .react-contextmenu.react-contextmenu--visible {
    color: white;
    opacity: 1;
    pointer-events: auto;
    z-index: 1000;
  }
  .react-contextmenu-title {
    opacity: 0;
  }
  .react-contextmenu--visible .react-contextmenu-title {
    color: #b3b3b3;
    padding-left: 10px;
    padding-right: 15px;
    padding-bottom: 3px;
    opacity: 1;
  }
  .react-contextmenu-title::after {
    content: ':';
  }
  .react-contextmenu > .react-contextmenu-item {
    display: inline-block;
    padding: 3px 20px;
    clear: both;
    font-weight: 400;
    line-height: 1.5;
    color: white;
    text-align: inherit;
    white-space: nowrap;
    background: 0 0;
    border: 0;
    text-decoration: none;
    cursor: pointer;
  }
  .react-contextmenu-item.active,
  .react-contextmenu-item:hover {
    color: #f57c00;
    border-color: #0275d8;
    text-decoration: none;
  }

  .react-contextmenu-divider {
    border-top: 1px solid grey;
    margin-top: 4px;
    margin-bottom: 7px;
  }

  .react-contextmenu-submenu {
    padding-right: 27px !important;
  }

  .react-contextmenu-submenu:after {
    content: '▶';
    display: inline-block;
    position: absolute;
    right: 7px;
    bottom: 3px;
  }
`

export const TreeList = observer(
  ({ scrollableNodeRef, contentNodeRef, width, height, nodes, userRole }) => {
    const store = useContext(MobxStoreContext)
    const {
      singleRowHeight,
      activeNodeArray: aNAProxy,
      lastActiveNodeArray: lastTouchedNodeProxy,
    } = store.tree
    const aNA = getSnapshot(aNAProxy)
    const activeNode = nodes.find((n) => isEqual(n.url, aNA))

    const listRef = useRef(null)
    const lastActiveNodeArray = getSnapshot(lastTouchedNodeProxy)
    // when loading on url, lastActiveNodeArray may not be set
    const urlToFocus = lastActiveNodeArray.length ? lastActiveNodeArray : aNA
    const nodeIndex = findIndex(nodes, (node) => isEqual(node.url, urlToFocus))
    useEffect(() => {
      if (nodeIndex > -1) {
        listRef.current?.scrollToItem(nodeIndex)
      }
    }, [listRef, activeNode?.label, aNA, nodes, nodeIndex])

    console.log('TreeList, nodes:', nodes)

    return (
      <>
        {nodes.map((node) => (
          <TreeRow
            key={node.id}
            node={node}
            nodes={nodes}
            userRole={userRole}
          />
        ))}
      </>
    )

    return (
      <StyledList
        height={height - 5}
        itemCount={nodes.length}
        itemSize={singleRowHeight}
        width={width}
        ref={listRef}
        innerRef={contentNodeRef}
        outerRef={scrollableNodeRef}
      >
        {({ index, style }) => (
          <TreeRow
            key={index}
            style={style}
            index={index}
            node={nodes[index]}
            nodes={nodes}
            userRole={userRole}
          />
        )}
      </StyledList>
    )
  },
)
