import React, { useContext, useCallback } from 'react'
import styled from 'styled-components'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { MdAccountCircle as AccountIcon } from 'react-icons/md'
import { observer } from 'mobx-react-lite'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'
import last from 'lodash/last'
import get from 'lodash/get'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import axios from 'axios'

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
import { person as personFragment } from '../../../utils/fragments'

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
const StyledAccountIcon = styled(AccountIcon)`
  margin-top: 3px;
  font-size: 1.1em;
`
const SymbolDiv = styled.div`
  cursor: pointer;
`
const SymbolSpan = styled.span`
  padding-right: 11px !important;
  padding-left: 9px;
  font-weight: ${props =>
    props['data-nodeisinactivenodepath'] ? '900 !important' : 'inherit'};
  margin-top: -10px !important;
  font-size: 28px !important;
  width: 9px;
`
const TextSpan = styled.span`
  margin-left: 0;
  padding-right: 4px;
  font-family: ${props => (props['data-mono'] ? 'Roboto Mono' : 'Roboto')};
  font-size: ${props =>
    props['data-mono'] ? '15px !important' : '16px !important'};
  font-weight: ${props =>
    props['data-nodeisinactivenodepath'] ? '900 !important' : 'inherit'};
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    color: #f57c00;
  }
`
const MenuSubtitle = styled.div`
  padding-top: 7px;
`
const personQuery = gql`
  query PersonQueryForTree($accountId: String) {
    person(where: { account_id: { _eq: $accountId } }) {
      id
      user_role
    }
  }
`

const Row = ({ style, node }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)

  const { tree, enqueNotification, user, firebase } = store
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

  const personResult = useQuery(personQuery, {
    variables: { accountId: user.uid },
  })
  const { user_role: role } = get(personResult.data, 'person[0]') || {}

  const onClickNode = useCallback(() => {
    toggleNode({
      node,
      activeNodeArray,
      store,
    })
  }, [node, activeNodeArray, store])
  const onClickNodeSymbol = useCallback(() => {
    toggleNodeSymbol({ node, store })
  }, [node, store])
  const onClickNeu = useCallback(() => {
    createNew({ node, store, client })
  }, [node, store, client])
  const onClickDelete = useCallback(async () => {
    deleteDataset({ node, store, client })
    // delete firebase user
    if (node.accountId) {
      try {
        await axios.get(
          `https://auth.vermehrung.ch/delete-user/${node.accountId}`,
        )
      } catch (error) {
        console.log(error)
        return enqueNotification({
          message: error.response.data,
          options: {
            variant: 'error',
          },
        })
      }
    }
  }, [client, enqueNotification, node, store])

  const onClickSetPassword = useCallback(async () => {
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
              user_role
            }
          }
        `,
        variables: { id: personId },
      })
    } catch (error) {
      enqueNotification({
        message: error.message,
        options: {
          variant: 'error',
        },
      })
    }
    const email = get(result, 'data.person[0].email')
    try {
      await firebase.auth().sendPasswordResetEmail(email, {
        url: 'https://vermehrung.ch/Vermehrung',
        handleCodeInApp: true,
      })
    } catch (error) {
      enqueNotification({
        message: error.message,
        options: {
          variant: 'error',
        },
      })
    }
    store.enqueNotification({
      message: `${email} erhält einen Link, um ein Passwort zu setzen`,
      options: {
        variant: 'success',
      },
    })
  }, [client, enqueNotification, firebase, node.url, store])
  const onClickDeleteAccout = useCallback(async () => {
    // delete firebase user
    if (node.accountId) {
      try {
        await axios.get(
          `https://auth.vermehrung.ch/delete-user/${node.accountId}`,
        )
      } catch (error) {
        console.log(error)
        return enqueNotification({
          message: error.response.data,
          options: {
            variant: 'error',
          },
        })
      }
    }
    try {
      // remove users account_id
      client.mutate({
        mutation: gql`
          mutation update_person_for_deleting_account(
            $id: bigint!
            $accountId: String
          ) {
            update_person(
              where: { id: { _eq: $id } }
              _set: { account_id: $accountId }
            ) {
              affected_rows
              returning {
                ...PersonFields
              }
            }
          }
          ${personFragment}
        `,
        variables: {
          id: last(node.url).toString(),
          accountId: null,
        },
      })
    } catch (error) {
      console.log(error)
      return enqueNotification({
        message: error.message,
        options: {
          variant: 'error',
        },
      })
    }
  }, [client, enqueNotification, node.accountId, node.url])
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
              user_role
            }
          }
        `,
        variables: { id: personId },
      })
    } catch (error) {
      enqueNotification({
        message: error.message,
        options: {
          variant: 'error',
        },
      })
    }
    const email = get(result, 'data.person[0].email')
    if (!email) {
      return enqueNotification({
        message: 'Eine email-Adresse muss erfasst sein',
        options: {
          variant: 'warning',
        },
      })
    }
    const userRole = get(result, 'data.person[0].user_role')
    if (!userRole) {
      return enqueNotification({
        message: 'Eine Rolle muss erfasst sein',
        options: {
          variant: 'warning',
        },
      })
    }
    let res
    try {
      res = await axios.get(`https://auth.vermehrung.ch/create-user/${email}`)
    } catch (error) {
      console.log(error)
      return enqueNotification({
        message: error.response.data,
        options: {
          variant: 'error',
        },
      })
    }
    store.enqueNotification({
      message: `Für ${email} wurde ein Konto erstellt. Schicken Sie ein Email, um das Passwort zu setzen.`,
      options: {
        variant: 'success',
      },
    })

    // save resp.Id to mark users with account
    client.mutate({
      mutation: gql`
        mutation update_person_for_signup(
          $id: bigint!
        ) {
          update_person(
            where: { id: { _eq: $id } }
            _set: {
              account_id: "${res.data}"
            }
          ) {
            affected_rows
            returning {
              ...PersonFields
            }
          }
        }
        ${personFragment}
      `,
      variables: {
        id: last(node.url).toString(),
      },
    })
  }, [client, enqueNotification, node.url, store])

  const onClickOpenAllChildren = useCallback(() => {
    openAllChildren({ node, openNodes, store })
  }, [node, openNodes, store])
  const onClickCloseAllChildren = useCallback(() => {
    closeAllChildren({ node, openNodes, store })
  }, [node, openNodes, store])

  // for unknows reaseon this happens momentarily when new art is created
  if (!node.url) return null

  const level =
    node.url[0] === 'Projekte' ? node.url.length - 1 : node.url.length

  return (
    <Container style={style}>
      <ContextMenuTrigger id={`cm${node.id}`}>
        <StyledNode
          data-level={level}
          data-nodeisinactivenodepath={nodeIsInActiveNodePath}
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
            data-mono={!!node.mono}
          >
            {node.label}
          </TextSpan>
          {node.accountId && <StyledAccountIcon title="hat ein Konto" />}
        </StyledNode>
      </ContextMenuTrigger>
      {['table', 'folder'].includes(node.nodeType) && (
        <ContextMenu id={`cm${node.id}`}>
          <div className="react-contextmenu-title">{node.menuTitle}</div>
          <MenuItem onClick={onClickNeu}>neu</MenuItem>
          {node.nodeType === 'table' && (
            <MenuItem onClick={onClickDelete}>löschen</MenuItem>
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
          {node.nodeType === 'table' &&
            node.menuTitle === 'Person' &&
            role === 'manager' &&
            !node.accountId && (
              <>
                <MenuSubtitle className="react-contextmenu-title">
                  Konto
                </MenuSubtitle>
                <MenuItem onClick={onClickSignup}>neu</MenuItem>
              </>
            )}
          {node.nodeType === 'table' &&
            node.menuTitle === 'Person' &&
            role === 'manager' &&
            node.accountId && (
              <>
                <MenuSubtitle className="react-contextmenu-title">
                  Konto
                </MenuSubtitle>
                <MenuItem onClick={onClickSetPassword}>
                  Email schicken, um ein Passwort zu setzen
                </MenuItem>
                <MenuItem onClick={onClickDeleteAccout}>löschen</MenuItem>
              </>
            )}
        </ContextMenu>
      )}
    </Container>
  )
}

export default observer(Row)
