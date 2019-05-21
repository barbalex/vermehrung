import React, { useContext, useCallback } from 'react'
import styled from 'styled-components'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { observer } from 'mobx-react-lite'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'
import { useApolloClient } from 'react-apollo-hooks'
import last from 'lodash/last'
import gql from 'graphql-tag'

import isNodeInActiveNodePath from '../isNodeInActiveNodePath'
import isNodeOpen from '../isNodeOpen'
import someChildrenAreOpen from '../someChildrenAreOpen'
import someChildrenAreClosed from '../someChildrenAreClosed'
import openAllChildren from '../openAllChildren'
import closeAllChildren from '../closeAllChildren'
import toggleNode from '../toggleNode'
import toggleNodeSymbol from '../toggleNodeSymbol'
import storeContext from '../../../storeContext'
import createNew from './createNew'
import deleteDataset from './delete'
import { signup, getProfile } from '../../../utils/auth'

const singleRowHeight = 23
const Container = styled.div`
  padding-right: 4px;
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
  padding-left: ${props => `${Number(props['data-level']) * 17 - 10}px`};
  height: ${singleRowHeight}px;
  max-height: ${singleRowHeight}px;
  box-sizing: border-box;
  margin: 0;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  user-select: none;
  color: ${props =>
    props['data-nodeisinactivenodepath'] ? '#D84315' : 'inherit'};
`
const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  margin-top: ${props =>
    props['data-nodeisopen'] ? '-5px !important' : '1px !important'};
  margin-left: ${props => (props['data-nodeisopen'] ? '-1px !important' : 0)};
  margin-right: ${props => (props['data-nodeisopen'] ? '-5px !important' : 0)};
  padding-left: ${props => (props['data-nodeisopen'] ? '2px' : '2px')};
  height: ${props =>
    props['data-nodeisopen'] ? '30px !important' : '22px !important'};
  width: ${props =>
    props['data-nodeisopen'] ? '30px !important' : '26px !important'};
  color: ${props =>
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
  margin-top: ${props =>
    props['data-nodeisinactivenodepath']
      ? '-5px !important'
      : '-2px !important'};
  padding-left: ${props =>
    props['data-nodeisinactivenodepath'] ? '1px' : '2px'};
  height: ${props =>
    props['data-nodeisinactivenodepath']
      ? '26px !important'
      : '22px !important'};
  color: ${props =>
    props['data-nodeisinactivenodepath'] ? '#D84315 !important' : 'inherit'};
  width: 26px;
  cursor: pointer;
  &:hover {
    color: #f57c00 !important;
  }
`
const SymbolDiv = styled.div`
  cursor: pointer;
`
const SymbolSpan = styled.span`
  padding-right: 11px !important;
  padding-left: ${props =>
    props['data-nodeisinactivenodepath'] ? '7px' : '9px'};
  font-weight: ${props =>
    props['data-nodeisinactivenodepath'] ? '900 !important' : 'inherit'};
  margin-top: -8px !important;
  font-size: 28px !important;
  width: 9px;
`
const TextSpan = styled.span`
  margin-left: 0;
  padding-right: 4px;
  font-size: 16px !important;
  font-weight: ${props =>
    props['data-nodeisinactivenodepath'] ? '900 !important' : 'inherit'};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden !important;
  cursor: pointer;
  &:hover {
    color: #f57c00;
  }
`

const Row = ({ style, node }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { tree } = store
  const { nodes, openNodes, activeNodeArray } = tree

  const nodeIsInActiveNodePath = isNodeInActiveNodePath(node, activeNodeArray)
  const nodeIsOpen = isNodeOpen(openNodes, node.url)
  // build symbols
  let useSymbolIcon = true
  let useSymbolSpan = false
  let symbolIcon
  if (node.hasChildren && nodeIsOpen) {
    symbolIcon = 'expandMore'
  } else if (node.hasChildren) {
    symbolIcon = 'chevronRight'
  } else if (node.label === 'lade Daten...') {
    symbolIcon = 'moreHoriz'
  } else {
    useSymbolSpan = true
    useSymbolIcon = false
  }
  const user = getProfile()
  const claims = user['https://hasura.io/jwt/claims'] || {}
  const role = claims['x-hasura-role']

  const onClickNode = useCallback(() => {
    toggleNode({
      node,
      activeNodeArray,
      store,
    })
  }, [node, openNodes, activeNodeArray])
  const onClickNodeSymbol = useCallback(() => {
    toggleNodeSymbol({ node, store })
  }, [node, openNodes])
  const onClickNeu = useCallback(() => {
    createNew({ node, store, client })
  }, [node, openNodes, activeNodeArray])
  const onClickDelete = useCallback(() => {
    deleteDataset({ node, store, client })
  }, [node, openNodes, activeNodeArray])

  const onClickSignup = useCallback(async () => {
    const personId = last(node.url).toString()
    // fetch email of this person
    let result
    try {
      result = await client.query({
        query: gql`
          query getPerson($id: Int!) {
            person (where: { id: { _eq: ${personId} } }) {
              id
              email
            }
          }
        `,
        variables: { id: personId },
      })
    } catch (error) {
      console.log(error)
    }
    //console.log({ result, data: result.data, email: result.data.email })
    signup({
      email: result.data.person[0].email,
      personId: personId.toString(),
      store,
    })
  }, [node, openNodes, activeNodeArray])

  const onClickOpenAllChildren = useCallback(() => {
    openAllChildren({ node, openNodes, store })
  }, [node, openNodes, activeNodeArray])
  const onClickCloseAllChildren = useCallback(() => {
    closeAllChildren({ node, openNodes, store })
  }, [node, openNodes, activeNodeArray])

  // for unknows reaseon this happens momentarily when new art is created
  if (!node.url) return null

  const dataUrl = JSON.stringify(node.url)
  const level =
    node.url[0] === 'Projekte' ? node.url.length - 1 : node.url.length

  return (
    <Container style={style}>
      <ContextMenuTrigger id={`cm${node.id}`}>
        <StyledNode
          data-level={level}
          data-nodeisinactivenodepath={nodeIsInActiveNodePath}
          data-id={node.id}
          data-parentid={node.parentId}
          data-url={dataUrl}
          data-nodetype={node.nodeType}
          data-label={node.label}
        >
          {useSymbolIcon && (
            <SymbolDiv onClick={onClickNodeSymbol}>
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
            <SymbolSpan data-nodeisinactivenodepath={nodeIsInActiveNodePath}>
              {'-'}
            </SymbolSpan>
          )}
          <TextSpan
            data-nodeisinactivenodepath={nodeIsInActiveNodePath}
            node={node}
            onClick={onClickNode}
          >
            {node.label}
          </TextSpan>
        </StyledNode>
      </ContextMenuTrigger>
      {['table', 'folder'].includes(node.nodeType) && (
        <ContextMenu id={`cm${node.id}`}>
          <div className="react-contextmenu-title">{node.menuTitle}</div>
          <MenuItem onClick={onClickNeu}>neu</MenuItem>
          {node.nodeType === 'table' && (
            <MenuItem onClick={onClickDelete}>löschen</MenuItem>
          )}
          {node.nodeType === 'table' &&
            node.menuTitle === 'Person' &&
            role === 'manager' && (
              <MenuItem onClick={onClickSignup}>Konto eröffnen</MenuItem>
            )}
          {node.nodeType === 'folder' && isNodeOpen(openNodes, node.url) && (
            <>
              {someChildrenAreOpen({ nodes, openNodes, url: node.url }) && (
                <MenuItem onClick={onClickCloseAllChildren}>
                  alle schliessen
                </MenuItem>
              )}
              {someChildrenAreClosed({ nodes, openNodes, url: node.url }) && (
                <MenuItem onClick={onClickOpenAllChildren}>
                  alle öffnen
                </MenuItem>
              )}
            </>
          )}
        </ContextMenu>
      )}
    </Container>
  )
}

export default observer(Row)
