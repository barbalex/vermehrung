import React, { useContext, useCallback, useState, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { FaRegCopy } from 'react-icons/fa'
import ErrorBoundary from 'react-error-boundary'
import styled from 'styled-components'

import storeContext from '../../../storeContext'
import {
  lieferung as lieferungFragment,
  sammelLieferung as sammelLieferungFragment,
} from '../../../utils/fragments'
import isString from '../../../utils/isString'
import exists from '../../../utils/exists'
import fieldsFromFragment from '../../../utils/fieldsFromFragment'

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

const lieferungFields = fieldsFromFragment(lieferungFragment)
const sammelLieferungFields = fieldsFromFragment(sammelLieferungFragment)

const CopySammelLieferungMenu = ({ sammelLieferung, lieferungId }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store

  const [anchorEl, setAnchorEl] = useState(null)
  const onClose = useCallback(() => setAnchorEl(null), [])
  const onClickConfig = useCallback(
    event => setAnchorEl(event.currentTarget),
    [],
  )
  const updateLieferung = useCallback(
    async lieferungId => {
      const lieferung = {
        ...sammelLieferung,
        id: lieferungId,
        sammel_lieferung_id: sammelLieferung.id,
      }
      const objectString = Object.entries(lieferung)
        .filter(
          // only accept lieferung's fields
          // eslint-disable-next-line no-unused-vars
          ([key, value]) => lieferungFields.includes(key),
        )
        // only update with existing values
        // eslint-disable-next-line no-unused-vars
        .filter(([key, val]) => exists(val))
        .map(([key, value]) => {
          if (isString(value)) {
            return `${key}: "${value}"`
          }
          return `${key}: ${value}`
        })
        .join(', ')
      try {
        await client.mutate({
          mutation: gql`
        mutation update_lieferung(
          $id: bigint!
        ) {
          update_lieferung(
            where: { id: { _eq: $id } }
            _set: {
              ${objectString}
            }
          ) {
            affected_rows
            returning {
              ...LieferungFields
            }
          }
        }
        ${lieferungFragment}
        `,
          variables: {
            id: lieferungId,
          },
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
    [client, enqueNotification, sammelLieferung],
  )
  const containsData = useMemo(
    () =>
      Object.entries(sammelLieferung)
        .filter(
          // only accept lieferung's fields
          // eslint-disable-next-line no-unused-vars
          ([key, value]) =>
            sammelLieferungFields.filter(f => f !== 'id').includes(key),
        )
        // only update with existing values
        // eslint-disable-next-line no-unused-vars
        .filter(([key, val]) => exists(val) && val !== false).length > 0,
    [sammelLieferung],
  )
  const onClickActiveLieferung = useCallback(async () => {
    setAnchorEl(null)
    try {
      await updateLieferung(lieferungId)
    } catch (error) {
      return
    }
    enqueNotification({
      message: 'Lieferung aktualisiert',
      options: {
        variant: 'info',
      },
    })
  }, [enqueNotification, lieferungId, updateLieferung])
  const onClickAllLieferung = useCallback(async () => {
    setAnchorEl(null)
    let error = null
    for (const l of sammelLieferung.lieferungs) {
      try {
        await updateLieferung(l.id)
      } catch (err) {
        error = true
      }
    }
    if (!error) {
      enqueNotification({
        message: 'Alle Lieferungen aktualisiert',
        options: {
          variant: 'info',
        },
      })
    }
  }, [enqueNotification, sammelLieferung.lieferungs, updateLieferung])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Daten kopieren"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        title="Daten kopieren"
        onClick={onClickConfig}
        disabled={!containsData}
      >
        <FaRegCopy />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <TitleRow>
          <Title>Die Daten der Sammel-Lieferung kopieren:</Title>
        </TitleRow>
        {lieferungId && (
          <MenuItem onClick={onClickActiveLieferung}>
            in die links angezeigte Lieferung
          </MenuItem>
        )}
        <MenuItem onClick={onClickAllLieferung}>in alle Lieferungen</MenuItem>
      </Menu>
    </ErrorBoundary>
  )
}

export default observer(CopySammelLieferungMenu)
