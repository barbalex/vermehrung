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

import storeContext from '../../../../storeContext'
import TextField from '../../../shared/TextField'
import {
  artFile as artFileFragment,
  herkunftFile as herkunftFileFragment,
  sammlungFile as sammlungFileFragment,
  personFile as personFileFragment,
  gartenFile as gartenFileFragment,
  kulturFile as kulturFileFragment,
  lieferungFile as lieferungFileFragment,
} from '../../../../utils/fragments'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: ${props => (props.showfilter ? '#fff3e0' : 'unset')};
  width: 100%;
`
const DelIcon = styled(IconButton)`
  margin-bottom: 20px !important;
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

const File = ({ file, parent, refetch }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)

  const [errors, setErrors] = useState({})

  const [delMenuAnchorEl, setDelMenuAnchorEl] = React.useState(null)
  const delMenuOpen = Boolean(delMenuAnchorEl)

  useEffect(() => setErrors({}), [file])

  const onClickDelete = useCallback(async () => {
    // 1. remove dataset
    try {
      await client.mutate({
        mutation: gql`
          mutation deleteDataset {
            delete_${parent}_file (where: {file_id: {_eq: "${file.file_id}"}}) {
              returning {
                id
              }
            }
          }
        `,
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
    // 2. remove file
    // actually no: not secure
    // batch delete unneeded files using the api
    // https://uploadcare.com/docs/api_reference/rest/accessing_files
    // also: following does not work due to
    // 1. cors issue, 2. "Date is an unsafe header"...
    /*
    const verb = 'DELETE'
    const uri = `/files/${file.file_id}/storage`
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
    console.log('File, onClickDelete', { res, file })*/
  }, [client, file.file_id, parent, refetch, store])


  if (!file) return null

  return (
    <ErrorBoundary>
      <Container>
        <div>Art</div>
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

export default observer(File)
