import React, { useContext, useState, useEffect, useCallback } from 'react'
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
    background-color:rgba(74, 20, 140, 0.03);
  }
`
const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const DelIcon = styled(IconButton)`
  font-size: 1.1rem;
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
    // TODO: 1. remove dataset
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
                id
              }
            }
          }
        `,
        variables: { artId: avArt.art_id, personId: avArt.person_id },
      })
    } catch (error) {
      console.log(error)
      return store.enqueNotification({
        message: `Die Datei konnte nicht gelöscht werden: ${error.message}`,
        options: {
          variant: 'error',
        },
      })
    }
    refetch()
    // 2. remove avArt
    // actually no: not secure
    // batch delete unneeded files using the api
    // https://uploadcare.com/docs/api_reference/rest/accessing_files
    // also: following does not work due to
    // 1. cors issue, 2. "Date is an unsafe header"...
    /*
    const verb = 'DELETE'
    const uri = `/files/${avArt.file_id}/storage`
    const signature = uploadcareApiSignature({ verb, uri })
    let res
    try {
      res = await axios.delete(`https://api.uploadcare.com${uri}`, {
        mode: 'no-cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Credentials': 'true',
          Accept: 'application/vnd.uploadcare-v0.5+json',
          Date: new Date().toISOString(),
          Authorization: `Uploadcare ${
            process.env.UPLOADCARE_PUBLIC_KEY
          }:${signature}`,
        },
      })
    } catch (error) {
      console.log(error)
    }
    console.log('AvArt, onClickDelete', { res, avArt })*/
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
