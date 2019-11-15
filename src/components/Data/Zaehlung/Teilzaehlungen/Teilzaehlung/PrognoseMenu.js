import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'
import Menu from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import { FaChartLine } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import ErrorBoundary from 'react-error-boundary'
import get from 'lodash/get'

import TextField from '../../../../shared/TextField'
import { teilzaehlung as teilzaehlungFragment } from '../../../../../utils/fragments'
import ifIsNumericAsNumber from '../../../../../utils/ifIsNumericAsNumber'
import types from '../../../../../store/Filter/simpleTypes'
import storeContext from '../../../../../storeContext'

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
const Info = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.4);
  user-select: none;
`
const Field = styled.div`
  padding: 0 16px;
`

const Teilzaehlung = ({ onClosePrognosis, anchorEl, row }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store
  const { refetch: refetchTree } = store.tree

  const [errors, setErrors] = useState({})
  useEffect(() => {
    setErrors({})
  }, [])

  const jahrEl = useRef(null)
  useEffect(() => {
    setTimeout(() => {
      console.log('jahrEl:', jahrEl)
      jahrEl && jahrEl.current && jahrEl.current.focus()
    })
  }, [])

  const onClickPrognosis2 = useCallback(async () => {
    // create new teilzaehlung
    // if a zaehlung with date of 15.09. of year does not yet exist create that first
    // using: zaehlung.kultur_id, zaehlung.id, teilzaehlung.teilkultur_id
    console.log('TODO:')
    try {
      await client.mutate({
        mutation: gql`
          mutation insertDataset($zaehlId: bigint!) {
            insert_teilzaehlung(objects: [{ zaehlung_id: $zaehlId }]) {
              returning {
                ...TeilzaehlungFields
              }
            }
          }
          ${teilzaehlungFragment}
        `,
        variables: {
          id: row.id,
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
  }, [])

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const type = types.lieferung[field]
      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      try {
        let valueToSet
        if (value === null) {
          valueToSet = null
        } else if (['number', 'boolean'].includes(type)) {
          valueToSet = value
        } else {
          valueToSet = `"${value}"`
        }
        await client.mutate({
          mutation: gql`
              mutation update_teilzaehlung(
                $id: bigint!
              ) {
                update_teilzaehlung(
                  where: { id: { _eq: $id } }
                  _set: {
                    ${field}: ${valueToSet}
                  }
                ) {
                  affected_rows
                  returning {
                    ...TeilzaehlungFields
                  }
                }
              }
              ${teilzaehlungFragment}
            `,
          variables: {
            id: row.id,
          },
        })
      } catch (error) {
        return setErrors({ [field]: error.message })
      }
      // update tree if numbers were changed
      if (
        [
          'anzahl_pflanzen',
          'anzahl_auspflanzbereit',
          'anzahl_mutterpflanzen',
          'prognose',
          'ziel',
        ].includes(field)
      )
        refetchTree()
      setErrors({})
    },
    [client, refetchTree, row],
  )

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
              onClick={() => console.log('TODO:')}
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
            ref={jahrEl}
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
        <Info>
          Zwingende Felder sind nicht aufgelistet.
          <br />
          Die Wahl gilt (nur) für diese Kultur.
        </Info>
      </Menu>
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlung)
