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
import get from 'lodash/get'
import styled from 'styled-components'

import storeContext from '../../../storeContext'
import { personOption as personOptionFragment } from '../../../utils/fragments'
import ErrorBoundary from '../../shared/ErrorBoundary'

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
`
const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 800;
  user-select: none;
`

const SettingsSammelLieferung = ({ personId, personOptionResult }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store

  const { data, error, loading } = personOptionResult
  const { sl_show_empty_when_next_to_li, sl_auto_copy_edits } =
    get(data, 'person_option[0]') || {}

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = event.target.value === 'true'
      try {
        await client.mutate({
          mutation: gql`
              mutation update_person_option(
                $personId: bigint!
              ) {
                update_person_option(
                  where: { person_id: { _eq: $personId } }
                  _set: {
                    ${field}: ${!value}
                  }
                ) {
                  affected_rows
                  returning {
                    ...PersonOptionFields
                  }
                }
              }
              ${personOptionFragment}
            `,
          variables: {
            personId,
          },
          refetchQueries: ['PersonOptionQueryForSammelLieferung'],
        })
      } catch (error) {
        return enqueNotification({
          message: error.message,
          options: {
            variant: 'error',
          },
        })
      }
    },
    [client, personId, enqueNotification],
  )
  const onClickFrown = useCallback(() => {
    enqueNotification({
      message: error.message,
      options: {
        variant: 'error',
      },
    })
  }, [enqueNotification, error])

  const [anchorEl, setAnchorEl] = useState(null)
  const onClose = useCallback(() => setAnchorEl(null), [])
  const onClickConfig = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )

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
          <TitleRow>
            <Title>Optionen für Sammel-Lieferungen wählen:</Title>
          </TitleRow>
          <MenuItem>
            <FormControlLabel
              value={sl_show_empty_when_next_to_li === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={sl_show_empty_when_next_to_li}
                  onClick={saveToDb}
                  name="sl_show_empty_when_next_to_li"
                />
              }
              label="Felder mit Leer-Werten anzeigen (wenn neben einer Lieferung angezeigt)"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={sl_auto_copy_edits === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={sl_auto_copy_edits}
                  onClick={saveToDb}
                  name="sl_auto_copy_edits"
                />
              }
              label="Änderungen automatisch in alle Lieferungen kopieren"
              labelPlacement="end"
            />
          </MenuItem>
        </Menu>
      )}
    </ErrorBoundary>
  )
}

export default observer(SettingsSammelLieferung)
