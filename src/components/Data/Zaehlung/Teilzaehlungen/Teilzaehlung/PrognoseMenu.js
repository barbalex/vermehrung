import React, { useState, useCallback, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'
import Menu from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import get from 'lodash/get'

import TextField from '../../../../shared/TextField'
import {
  teilzaehlung as teilzaehlungFragment,
  zaehlung as zaehlungFragment,
} from '../../../../../utils/fragments'
import ifIsNumericAsNumber from '../../../../../utils/ifIsNumericAsNumber'
import storeContext from '../../../../../storeContext'
import exists from '../../../../../utils/exists'
import appBaseUrl from '../../../../../utils/appBaseUrl'
import ErrorBoundary from '../../../../shared/ErrorBoundary'

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
const Field = styled.div`
  padding: 0 16px;
`
const Buttons = styled.div`
  padding: 0 16px;
  display: flex;
  justify-content: flex-end;
`

const Teilzaehlung = ({
  onClosePrognosis,
  anchorEl,
  setAnchorEl,
  teilzaehlung,
  zaehlung: zaehlungPassed,
}) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store
  const { refetch: refetchTree } = store.tree

  const [jahr, setJahr] = useState(null)
  const [anz, setAnz] = useState(null)

  const [errors, setErrors] = useState({})
  useEffect(() => {
    setErrors({})
  }, [])

  const saveToDb = useCallback(
    async (event) => {
      setErrors({})
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      // type is always number so no need to use 'valueToSet'
      // only do something if both values exist
      field === 'anzahl_auspflanzbereit' ? setAnz(value) : setJahr(value)
      const anzAuspflanzbereit =
        field === 'anzahl_auspflanzbereit' ? value : anz
      const yearToUse = field === 'jahr' ? value : jahr
      if (!exists(yearToUse)) return
      if (!(yearToUse > 1900 && yearToUse < 2200)) {
        return setErrors({
          jahr: 'Das Jahr muss zwischen 1900 und 2200 liegen',
        })
      }
      if (!exists(value)) return
      if (!exists(anzAuspflanzbereit)) return
      // we have both values. Let's go on
      // check if zaehlung with date of 15.09. of year exist
      let existingZaehlungData
      const dateOfZaehlung = `${yearToUse}.09.15`
      try {
        existingZaehlungData = await client.query({
          query: gql`
            query GetExistingPrognoseData($datum: date!) {
              zaehlung(
                where: { datum: { _eq: $datum }, prognose: { _eq: true } }
              ) {
                ...ZaehlungFields
              }
            }
            ${zaehlungFragment}
          `,
          variables: {
            datum: dateOfZaehlung,
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
      const existingZaehlung = get(existingZaehlungData, 'data.zaehlung[0]')
      // if not: create it first
      let newZaehlung
      // if not: create it first
      if (!existingZaehlung) {
        let zaehlungData
        try {
          zaehlungData = await client.mutate({
            mutation: gql`
              mutation insertZaehlungForTeilzaehlung(
                $kulturId: bigint!
                $datum: date!
                $prognose: Boolean!
              ) {
                insert_zaehlung(
                  objects: [
                    { kultur_id: $kulturId, datum: $datum, prognose: $prognose }
                  ]
                ) {
                  returning {
                    ...ZaehlungFields
                  }
                }
              }
              ${zaehlungFragment}
            `,
            variables: {
              kulturId: zaehlungPassed.kultur_id,
              datum: dateOfZaehlung,
              prognose: true,
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
        newZaehlung = get(zaehlungData, 'data.insert_zaehlung.returning[0]')
      }
      const zaehlung = existingZaehlung || newZaehlung
      // create new teilzaehlung
      try {
        await client.mutate({
          mutation: gql`
            mutation insertPrognose(
              $zaehlId: bigint!
              $teilkulturId: bigint
              $anzA: Int!
            ) {
              insert_teilzaehlung(
                objects: [
                  {
                    zaehlung_id: $zaehlId
                    teilkultur_id: $teilkulturId
                    anzahl_auspflanzbereit: $anzA
                  }
                ]
              ) {
                returning {
                  ...TeilzaehlungFields
                }
              }
            }
            ${teilzaehlungFragment}
          `,
          variables: {
            zaehlId: zaehlung.id,
            teilkulturId: teilzaehlung.teilkultur_id,
            anzA: anzAuspflanzbereit,
          },
          refetchQueries: ['TreeQueryForTreeContainer'],
        })
      } catch (error) {
        return enqueNotification({
          message: error.message,
          options: {
            variant: 'error',
          },
        })
      }
      // delete empty teilzaehlung
      let emptyTeilzaehlungenData
      try {
        emptyTeilzaehlungenData = await client.query({
          query: gql`
            query GetTeilzaehlungen($zaehlungId: bigint!) {
              teilzaehlung(
                where: {
                  zaehlung_id: { _eq: $zaehlungId }
                  teilkultur_id: { _is_null: true }
                  anzahl_pflanzen: { _is_null: true }
                  anzahl_auspflanzbereit: { _is_null: true }
                  anzahl_mutterpflanzen: { _is_null: true }
                  andere_menge: { _is_null: true }
                  bemerkungen: { _is_null: true }
                  auspflanzbereit_beschreibung: { _is_null: true }
                }
              ) {
                ...TeilzaehlungFields
              }
            }
            ${teilzaehlungFragment}
          `,
          variables: {
            zaehlungId: zaehlung.id,
          },
          refetchQueries: ['TreeQueryForTreeContainer'],
        })
      } catch (error) {
        return enqueNotification({
          message: error.message,
          options: {
            variant: 'error',
          },
        })
      }
      const emptyTeilzaehlung = get(
        emptyTeilzaehlungenData,
        'data.teilzaehlung[0]',
      )
      if (emptyTeilzaehlung) {
        try {
          await client.mutate({
            mutation: gql`
              mutation deleteEmptyTz($id: bigint!) {
                delete_teilzaehlung(where: { id: { _eq: $id } }) {
                  affected_rows
                }
              }
            `,
            variables: {
              id: emptyTeilzaehlung.id,
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
      }
      enqueNotification({
        message: 'Die Prognose wurde gespeichert',
        options: {
          variant: 'info',
        },
      })
      setAnchorEl(null)
      // update tree
      refetchTree()
      setErrors({})
    },
    [
      anz,
      client,
      enqueNotification,
      jahr,
      refetchTree,
      setAnchorEl,
      teilzaehlung.teilkultur_id,
      zaehlungPassed.kultur_id,
    ],
  )
  const onClickAbbrechen = useCallback(() => setAnchorEl(null), [setAnchorEl])
  const openDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Planen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  return (
    <ErrorBoundary>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClosePrognosis}
      >
        <TitleRow>
          <Title>Prognose für diese Teil-Zählung:</Title>
          <div>
            <IconButton
              aria-label="Anleitung öffnen"
              title="Anleitung öffnen"
              onClick={openDocs}
            >
              <IoMdInformationCircleOutline />
            </IconButton>
          </div>
        </TitleRow>
        <Field>
          <TextField
            key="jahr"
            name="jahr"
            label="Jahr"
            value=""
            saveToDb={saveToDb}
            error={errors.jahr}
            type="number"
            autoFocus
          />
        </Field>
        <Field>
          <TextField
            key="anzahl_auspflanzbereit"
            name="anzahl_auspflanzbereit"
            label="Anzahl auspflanz-bereit"
            value=""
            saveToDb={saveToDb}
            error={errors.anzahl_auspflanzbereit}
            type="number"
          />
        </Field>
        <Buttons>
          <Button onClick={onClickAbbrechen}>abbrechen</Button>
          <Button onClick={onClickAbbrechen}>speichern</Button>
        </Buttons>
      </Menu>
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlung)
