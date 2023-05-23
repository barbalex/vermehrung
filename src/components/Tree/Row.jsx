import React, { useContext, useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import {
  MdAccountCircle as AccountIcon,
  MdChevronRight as ChevronRightIcon,
  MdExpandMore as ExpandMoreIcon,
  MdMoreHoriz as MoreHorizIcon,
} from 'react-icons/md'
import { observer } from 'mobx-react-lite'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'
import last from 'lodash/last'
import { of as $of } from 'rxjs'

import StoreContext from '../../storeContext'
import isNodeInActiveNodePath from './isNodeInActiveNodePath'
import isNodeOpen from './isNodeOpen'
import someChildrenAreOpen from './someChildrenAreOpen'
import someChildrenAreClosed from './someChildrenAreClosed'
import openAllChildren from './openAllChildren'
import closeAllChildren from './closeAllChildren'
import toggleNode from './toggleNode'
import toggleNodeSymbol from './toggleNodeSymbol'
import createNew from './createNew'
import deleteDataset from './delete'
import signup from '../../utils/signup'
import deleteAccount from '../../utils/deleteAccount'
import setPassword from '../../utils/setPassword'

const Container = styled.div`
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
const StyledNode = styled.div`
  padding-left: ${(props) => `${Number(props['data-level']) * 17 - 10}px`};
  height: ${(props) => props['data-row-height']}px;
  max-height: ${(props) => props['data-row-height']}px;
  box-sizing: border-box;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  user-select: none;
  color: ${(props) =>
    props['data-nodeisinactivenodepath']
      ? '#D84315'
      : props['data-inaktiv']
      ? 'rgba(0, 0, 0, 0.35)'
      : 'inherit'};
`
const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  margin-top: -5px !important;
  margin-left: ${(props) => (props['data-nodeisopen'] ? '-1px !important' : 0)};
  margin-right: ${(props) =>
    props['data-nodeisopen'] ? '-5px !important' : 0};
  padding-left: ${(props) => (props['data-nodeisopen'] ? '2px' : '2px')};
  height: ${(props) =>
    props['data-nodeisopen'] ? '30px !important' : '22px !important'};
  width: ${(props) =>
    props['data-nodeisopen'] ? '30px !important' : '26px !important'};
  color: ${(props) =>
    props['data-nodeisinactivenodepath'] ? '#D84315 !important' : 'inherit'};
  cursor: pointer;
  &:hover {
    color: #f57c00 !important;
  }
`
const StyledChevronRightIcon = styled(ChevronRightIcon)`
  padding-left: 2px;
  height: 22px !important;
  width: 26px;
  cursor: pointer;
  &:hover {
    color: #f57c00 !important;
  }
`
const StyledMoreHorizIcon = styled(MoreHorizIcon)`
  padding-left: ${(props) =>
    props['data-nodeisinactivenodepath'] ? '1px' : '2px'};
  height: ${(props) =>
    props['data-nodeisinactivenodepath']
      ? '26px !important'
      : '22px !important'};
  color: ${(props) =>
    props['data-nodeisinactivenodepath'] ? '#D84315 !important' : 'inherit'};
  width: 26px;
  cursor: pointer;
  &:hover {
    color: #f57c00 !important;
  }
`
const StyledAccountIcon = styled(AccountIcon)`
  margin-top: 3px;
  font-size: 1.1em;
`
const SymbolDiv = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SymbolSpan = styled.span`
  padding-right: ${(props) =>
    props['data-mobile'] ? '13px !important' : '11px !important'};
  padding-left: 9px;
  font-weight: ${(props) =>
    props['data-nodeisinactivenodepath'] ? '700 !important' : 'inherit'};
  margin-top: ${(props) =>
    props['data-mobile'] ? '-2px !important' : '-1px !important'};
  font-size: ${(props) =>
    props['data-mobile'] ? '32px !important' : '28px !important'};
  width: ${(props) => (props['data-mobile'] ? '12px' : '9px')};
`
const TextSpan = styled.span`
  margin-left: 0;
  padding-right: 4px;
  font-family: ${(props) => (props['data-mono'] ? 'Roboto Mono' : 'Roboto')};
  font-size: ${(props) => `${props['data-font-size']}px !important`};
  font-weight: ${(props) =>
    props['data-nodeisinactivenodepath'] ? '700 !important' : 'inherit'};
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    color: #f57c00;
  }
`
const MenuSubtitle = styled.div`
  padding-top: 7px;
`
const MenuExplainerItem = styled(MenuItem)`
  white-space: normal !important;
  cursor: auto !important;
  &:hover {
    color: white !important;
    border-color: rgb(255, 255, 255) !important;
  }
`

const Row = ({ style, node, nodes, userRole }) => {
  const store = useContext(StoreContext)

  const { showTreeInSingleColumnView, singleColumnView, tree, db } = store
  const { activeNodeArray, singleRowHeight } = tree

  const isMobile = showTreeInSingleColumnView && singleColumnView
  let fontSize = node?.mono ? 15 : 16
  if (isMobile) fontSize = node?.mono ? 17 : 18

  const nodeIsInActiveNodePath = isNodeInActiveNodePath({
    node,
    activeNodeArray,
  })
  const nodeIsOpen = isNodeOpen({ store, url: node?.url })
  // build symbols
  let useSymbolIcon = true
  let useSymbolSpan = false
  let symbolIcon
  if (
    node?.hasChildren &&
    nodeIsOpen &&
    // If is folder: only open if childrenCount is > 0
    ((node?.nodeType === 'folder' && node?.childrenCount) ||
      node?.nodeType !== 'folder')
  ) {
    symbolIcon = 'expandMore'
  } else if (node?.hasChildren) {
    symbolIcon = 'chevronRight'
  } else if (node?.label === 'lade Daten...') {
    symbolIcon = 'moreHoriz'
  } else {
    useSymbolSpan = true
    useSymbolIcon = false
  }

  const [person, setPerson] = useState()
  useEffect(() => {
    const personObservable =
      node?.nodeType === 'table' && node.table === 'person' && node.url
        ? db.get('person').findAndObserve(last(node.url))
        : $of({})

    const subscription = personObservable.subscribe((person) =>
      setPerson(person),
    )

    return () => subscription?.unsubscribe?.()
  }, [db, node?.nodeType, node.table, node.url])

  const accountId = person?.account_id ?? null

  const onClickNode = useCallback(
    () =>
      toggleNode({
        nodes,
        node,
        store,
      }),
    [node, nodes, store],
  )
  const onClickNodeSymbol = useCallback(
    () => toggleNodeSymbol({ node, store }),
    [node, store],
  )
  const onClickNeu = useCallback(
    () => createNew({ node, store }),
    [node, store],
  )
  const onClickDelete = useCallback(
    () => deleteDataset({ node, store }),
    [node, store],
  )

  const onClickSetPassword = useCallback(
    () => setPassword({ store, person }),
    [person, store],
  )
  const onClickDeleteAccout = useCallback(
    () => deleteAccount({ store, person }),
    [person, store],
  )
  const onClickSignup = useCallback(
    () => signup({ store, person }),
    [person, store],
  )

  const onClickOpenAllChildren = useCallback(
    () => openAllChildren({ node, store, nodes }),
    [node, store, nodes],
  )
  const onClickCloseAllChildren = useCallback(
    () => closeAllChildren({ node, store }),
    [node, store],
  )

  // for unknows reaseon this happens momentarily when new art is created
  if (!node?.url) return null

  const level =
    node?.url[0] === 'Projekte' ? node?.url?.length - 1 : node?.url?.length
  const inaktiv = node?.aktiv === false

  return (
    <Container style={style}>
      <ContextMenuTrigger id={`cm${node?.id}`}>
        <StyledNode
          data-level={level}
          data-row-height={singleRowHeight}
          data-nodeisinactivenodepath={nodeIsInActiveNodePath}
          data-inaktiv={inaktiv}
        >
          {useSymbolIcon && (
            <SymbolDiv onClick={onClickNodeSymbol} data-mobile={isMobile}>
              {symbolIcon === 'expandMore' && (
                <StyledExpandMoreIcon
                  data-nodeisinactivenodepath={nodeIsInActiveNodePath}
                  data-nodeisopen={nodeIsOpen}
                />
              )}
              {symbolIcon === 'chevronRight' && <StyledChevronRightIcon />}
              {symbolIcon === 'moreHoriz' && (
                <StyledMoreHorizIcon
                  data-nodeisinactivenodepath={nodeIsInActiveNodePath}
                />
              )}
            </SymbolDiv>
          )}
          {useSymbolSpan && (
            <SymbolSpan
              data-nodeisinactivenodepath={nodeIsInActiveNodePath}
              data-mobile={isMobile}
            >
              {'-'}
            </SymbolSpan>
          )}
          <TextSpan
            data-nodeisinactivenodepath={nodeIsInActiveNodePath}
            node={node}
            onClick={onClickNode}
            data-mono={!!node?.mono}
            data-font-size={fontSize}
          >
            {node?.label ?? '(kein Label)'}
          </TextSpan>
          {accountId && <StyledAccountIcon title="hat ein Konto" />}
        </StyledNode>
      </ContextMenuTrigger>
      {['table', 'folder'].includes(node?.nodeType) && (
        <ContextMenu id={`cm${node?.id}`}>
          <div className="react-contextmenu-title">{node?.menuTitle}</div>
          {node?.menuExplainerText && (
            <MenuExplainerItem>{node?.menuExplainerText}</MenuExplainerItem>
          )}
          {!(node?.hasMenu === false) && (
            <>
              <MenuItem onClick={onClickNeu}>neu</MenuItem>
              {node?.nodeType === 'table' && (
                <MenuItem onClick={onClickDelete}>löschen</MenuItem>
              )}
              {node?.nodeType === 'folder' &&
                isNodeOpen({ store, url: node?.url }) && (
                  <>
                    {someChildrenAreOpen({
                      store,
                      nodes,
                      url: node?.url,
                    }) && (
                      <MenuItem onClick={onClickCloseAllChildren}>
                        alle schliessen
                      </MenuItem>
                    )}
                    {someChildrenAreClosed({
                      store,
                      nodes,
                      url: node?.url,
                    }) && (
                      <MenuItem onClick={onClickOpenAllChildren}>
                        alle öffnen
                      </MenuItem>
                    )}
                  </>
                )}
              {node?.nodeType === 'table' &&
                node?.menuTitle === 'Person' &&
                userRole?.name === 'manager' &&
                !accountId && (
                  <>
                    <MenuSubtitle className="react-contextmenu-title">
                      Konto
                    </MenuSubtitle>
                    <MenuItem onClick={onClickSignup}>neu</MenuItem>
                  </>
                )}
              {node?.nodeType === 'table' &&
                node?.menuTitle === 'Person' &&
                userRole?.name === 'manager' &&
                accountId && (
                  <>
                    <MenuSubtitle className="react-contextmenu-title">
                      Konto
                    </MenuSubtitle>
                    <MenuItem onClick={onClickSetPassword}>
                      Email schicken, um ein Passwort zu setzen (Achtung: Ist
                      nur ca. 2 Stunden gültig)
                    </MenuItem>
                    <MenuItem onClick={onClickDeleteAccout}>löschen</MenuItem>
                  </>
                )}
            </>
          )}
        </ContextMenu>
      )}
    </Container>
  )
}

export default observer(Row)
