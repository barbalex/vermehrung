import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ErrorBoundary from 'react-error-boundary'
import get from 'lodash/get'

import storeContext from '../../../../storeContext'

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  padding-left: 10px;
  padding-right: 13px;
  border-bottom: thin solid #0000001c;
  &:hover {
    background-color: rgba(74, 20, 140, 0.03);
  }
`
const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const DelIcon = styled(IconButton)`
  svg {
    font-size: 1.1rem;
  }
`
const MenuTitle = styled.h3`
  padding-top: 8px;
  padding-left: 15px;
  padding-right: 16px;
  padding-bottom: 0;
  margin-bottom: 3px;
  &:focus {
    outline: none;
  }
`

const AvArt = ({ avArt, refetch }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)

  const [delMenuAnchorEl, setDelMenuAnchorEl] = React.useState(null)
  const delMenuOpen = Boolean(delMenuAnchorEl)

  const onClickDelete = useCallback(async () => {
    try {
      await client.mutate({
        mutation: gql`
          mutation deleteArtFile($artId: bigint!, $personId: bigint!) {
            delete_av_art(
              where: {
                _and: [
                  { art_id: { _eq: $artId } }
                  { person_id: { _eq: $personId } }
                ]
              }
            ) {
              returning {
                art_id
              }
            }
          }
        `,
        variables: { artId: avArt.art_id, personId: avArt.person_id },
      })
    } catch (error) {
      console.log(error)
      return store.enqueNotification({
        message: `Die Art konnte nicht entfernt werden: ${error.message}`,
        options: {
          variant: 'error',
        },
      })
    }
    refetch()
  }, [refetch, client, avArt.art_id, avArt.person_id, store])

  const artname = get(avArt, 'art.art_ae_art.name')

  if (!avArt) return null

  return (
    <ErrorBoundary>
      <Container>
        <Text>
          <div>{artname}</div>
        </Text>
        <DelIcon
          title="löschen"
          aria-label="löschen"
          aria-owns={delMenuOpen ? 'delMenu' : undefined}
          aria-haspopup="true"
          onClick={event => setDelMenuAnchorEl(event.currentTarget)}
        >
          <FaTimes />
        </DelIcon>
        <Menu
          id="delMenu"
          anchorEl={delMenuAnchorEl}
          open={delMenuOpen}
          onClose={() => setDelMenuAnchorEl(null)}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: 120,
            },
          }}
        >
          <MenuTitle>löschen?</MenuTitle>
          <MenuItem onClick={onClickDelete}>ja</MenuItem>
          <MenuItem onClick={() => setDelMenuAnchorEl(null)}>nein</MenuItem>
        </Menu>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(AvArt)
