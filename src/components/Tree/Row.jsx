import { useContext, useEffect, useState } from 'react'
import {
  MdAccountCircle as AccountIcon,
  MdChevronRight as ChevronRightIcon,
  MdExpandMore as ExpandMoreIcon,
  MdMoreHoriz as MoreHorizIcon,
} from 'react-icons/md'
import { observer } from 'mobx-react-lite'
import { of as $of } from 'rxjs'

import { MobxStoreContext } from '../../mobxStoreContext.js'
import { isNodeInActiveNodePath } from './isNodeInActiveNodePath.js'
import { isNodeOpen } from './isNodeOpen.js'
import { someChildrenAreOpen } from './someChildrenAreOpen.js'
import { someChildrenAreClosed } from './someChildrenAreClosed.js'
import { openAllChildren } from './openAllChildren.js'
import { closeAllChildren } from './closeAllChildren.js'
import { toggleNode } from './toggleNode.js'
import { toggleNodeSymbol } from './toggleNodeSymbol.js'
import { createNew } from './createNew.js'
import { deleteDataset } from './delete.js'
import { signup } from '../../utils/signup.js'
import { deleteAccount } from '../../utils/deleteAccount.js'
import { setPassword } from '../../utils/setPassword.js'
import {
  ContextMenuTrigger,
  ContextMenu,
  MenuItem,
} from '../../utils/react-contextmenu/index.js'

import {
  nodeClass,
  expandMoreIcon,
  chevronRightIcon,
  moreHorizIcon,
  accountIcon,
  symbolDiv,
  symbolSpan,
  textSpan,
  menuSubtitle,
  menuExplainerItem,
} from './Row.module.css'

export const TreeRow = observer(({ style, node, nodes, userRole }) => {
  const store = useContext(MobxStoreContext)

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
    if (!node) return
    const personObservable =
      node?.nodeType === 'table' && node.table === 'person' && node.url ?
        db.get('person').findAndObserve(node.url.at(-1))
      : $of({})

    const subscription = personObservable.subscribe((person) =>
      setPerson(person),
    )

    return () => subscription?.unsubscribe?.()
  }, [db, node?.nodeType, node?.table, node?.url])

  const accountId = person?.account_id ?? null

  const onClickNode = () =>
    toggleNode({
      nodes,
      node,
      store,
    })

  const onClickNodeSymbol = () => toggleNodeSymbol({ node, store })
  const onClickNeu = () => createNew({ node, store })
  const onClickDelete = () => deleteDataset({ node, store })
  const onClickSetPassword = () => setPassword({ store, person })
  const onClickDeleteAccout = () => deleteAccount({ store, person })
  const onClickSignup = () => signup({ store, person })
  const onClickOpenAllChildren = () => openAllChildren({ node, store, nodes })
  const onClickCloseAllChildren = () => closeAllChildren({ node, store })

  // for unknown reason this happens momentarily when new art is created
  if (!node?.url) return null

  const level =
    node?.url[0] === 'Projekte' ? node?.url?.length - 1 : node?.url?.length
  const inaktiv = node?.aktiv === false

  return (
    <>
      <ContextMenuTrigger id={`cm${node?.id}`}>
        <div
          className={nodeClass}
          style={{
            paddingLeft: level * 17 - 10,
            color:
              nodeIsInActiveNodePath ? '#D84315'
              : inaktiv ? 'rgba(0, 0, 0, 0.35)'
              : 'inherit',
          }}
        >
          {useSymbolIcon && (
            <div
              className={symbolDiv}
              onClick={onClickNodeSymbol}
              data-mobile={isMobile}
            >
              {symbolIcon === 'expandMore' && (
                <ExpandMoreIcon
                  style={{
                    marginLeft: nodeIsOpen ? -1 : 0,
                    marginRight: nodeIsOpen ? -5 : 0,
                    height: nodeIsOpen ? 30 : 22,
                    width: nodeIsOpen ? 30 : 26,
                    color: nodeIsInActiveNodePath ? '#D84315' : 'inherit',
                  }}
                  className={expandMoreIcon}
                />
              )}
              {symbolIcon === 'chevronRight' && (
                <ChevronRightIcon className={chevronRightIcon} />
              )}
              {symbolIcon === 'moreHoriz' && (
                <MoreHorizIcon
                  style={{
                    paddingLeft: nodeIsInActiveNodePath ? 1 : 2,
                    height: nodeIsInActiveNodePath ? 26 : 22,
                    color: nodeIsInActiveNodePath ? '#D84315' : 'inherit',
                  }}
                  className={moreHorizIcon}
                />
              )}
            </div>
          )}
          {useSymbolSpan && (
            <span
              style={{
                paddingRight: isMobile ? 13 : 11,
                fontWeight: nodeIsInActiveNodePath ? 700 : 'inherit',
                marginTop: isMobile ? -2 : -1,
                fontSize: isMobile ? 32 : 28,
                width: isMobile ? 12 : 9,
              }}
              className={symbolSpan}
            >
              {'-'}
            </span>
          )}
          <span
            node={node}
            onClick={onClickNode}
            style={{
              fontFamily: node?.mono ? 'Roboto Mono' : 'Roboto',
              fontSize,
              fontWeight: nodeIsInActiveNodePath ? 700 : 'inherit',
            }}
            className={textSpan}
          >
            {node?.label ?? '(kein Label)'}
          </span>
          {accountId && (
            <AccountIcon
              title="hat ein Konto"
              className={accountIcon}
            />
          )}
        </div>
      </ContextMenuTrigger>
      {['table', 'folder'].includes(node?.nodeType) && (
        <ContextMenu id={`cm${node?.id}`}>
          <div className="react-contextmenu-title">{node?.menuTitle}</div>
          {node?.menuExplainerText && (
            <MenuItem className={menuExplainerItem}>
              {node?.menuExplainerText}
            </MenuItem>
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
                    <div className={`react-contextmenu-title ${menuSubtitle}`}>
                      Konto
                    </div>
                    <MenuItem onClick={onClickSignup}>neu</MenuItem>
                  </>
                )}
              {node?.nodeType === 'table' &&
                node?.menuTitle === 'Person' &&
                userRole?.name === 'manager' &&
                accountId && (
                  <>
                    <div className={`react-contextmenu-title ${menuSubtitle}`}>
                      Konto
                    </div>
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
    </>
  )
})
