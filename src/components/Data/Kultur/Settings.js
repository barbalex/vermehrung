import React, { useContext, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import { FaCog, FaFrown } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import get from 'lodash/get'
import styled from 'styled-components'

import { StoreContext } from '../../../models/reactUtils'
import { kulturOption as kulturOptionFragment } from '../../../utils/fragments'
import appBaseUrl from '../../../utils/appBaseUrl'
import ErrorBoundary from '../../shared/ErrorBoundary'

const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 800;
  user-select: none;
`
const Info = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.4);
  user-select: none;
`

const SettingsKultur = ({ kulturResult }) => {
  const client = useApolloClient()
  const store = useContext(StoreContext)
  const { addNotif } = store

  const { data, error, loading } = kulturResult
  const { tk } = get(data, 'kultur[0].kultur_option') || {}
  const kulturId = get(data, 'kultur[0].id')

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = event.target.value === 'true'
      try {
        await client.mutate({
          mutation: gql`
              mutation update_kultur_option(
                $kulturId: uuid!
              ) {
                update_kultur_option(
                  where: { id: { _eq: $kulturId } }
                  _set: {
                    ${field}: ${!value}
                  }
                ) {
                  affected_rows
                  returning {
                    ...KulturOptionFields
                  }
                }
              }
              ${kulturOptionFragment}
            `,
          variables: {
            kulturId,
          },
          refetchQueries: ['TreeQueryForTreeContainer', 'KulturQueryForKultur'],
        })
      } catch (error) {
        return addNotif({
          message: error.message,
          options: {
            variant: 'error',
          },
        })
      }
    },
    [client, kulturId, addNotif],
  )
  const onClickFrown = useCallback(() => {
    addNotif({
      message: error.message,
      options: {
        variant: 'error',
      },
    })
  }, [addNotif, error])

  const [anchorEl, setAnchorEl] = useState(null)

  const onClose = useCallback(() => setAnchorEl(null), [])
  const onClickConfig = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )
  const openOptionDocs = useCallback(() => {
    setAnchorEl(null)
    const url = `${appBaseUrl()}Dokumentation/Teilkulturen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  if (error) {
    return (
      <IconButton
        aria-label="Felder wählen"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        title={error.message}
        onClick={onClickFrown}
      >
        <FaFrown />
      </IconButton>
    )
  }
  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Felder wählen"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        title="Felder wählen"
        onClick={onClickConfig}
      >
        <FaCog />
      </IconButton>
      {!loading && (
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onClose}
        >
          <Title>Optionen für diese Kultur:</Title>
          <MenuItem>
            <FormControlLabel
              value={tk === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={tk}
                  onClick={saveToDb}
                  name="tk"
                />
              }
              label="Mit Teil-Kulturen arbeiten"
              labelPlacement="end"
            />
            <div>
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openOptionDocs}
              >
                <IoMdInformationCircleOutline />
              </IconButton>
            </div>
          </MenuItem>
          <Info>Die Wahl gilt (nur) für diese Kultur.</Info>
        </Menu>
      )}
    </ErrorBoundary>
  )
}

export default observer(SettingsKultur)
