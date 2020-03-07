import React, { useState, useCallback, useEffect, useContext } from 'react'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import upperFirst from 'lodash/upperFirst'
import get from 'lodash/get'

import ifIsNumericAsNumber from '../../utils/ifIsNumericAsNumber'
import epsg2056to4326 from '../../utils/epsg2056to4326'
import {
  isValid as xIsValid,
  message as xMessage,
} from '../../utils/lv95XIsValid'
import {
  isValid as yIsValid,
  message as yMessage,
} from '../../utils/lv95YIsValid'
import {
  isValid as wgs84LatIsValid,
  message as wgs84LatMessage,
} from '../../utils/wgs84LatIsValid'
import {
  isValid as wgs84LongIsValid,
  message as wgs84LongMessage,
} from '../../utils/wgs84LongIsValid'
import {
  herkunft as herkunftFragment,
  garten as gartenFragment,
  sammlung as sammlungFragment,
  personOption as personOptionFragment,
} from '../../utils/fragments'
import firebaseContext from '../../firebaseContext'

const StyledFormControl = styled(FormControl)`
  padding-bottom: 19px !important;
  > div:before {
    border-bottom-color: rgba(0, 0, 0, 0.1) !important;
  }
`
const LeftFormControl = styled(StyledFormControl)`
  padding-right: 8px !important;
`
const Row = styled.div`
  display: flex;
`

const personOptionQuery = gql`
  query personOptionQueryForCoordinates($account_id: string) {
    person_option(where: { person: { account_id: { _eq: $account_id } } }) {
      ...PersonOptionFields
    }
  }
  ${personOptionFragment}
`

const fragments = {
  herkunft: herkunftFragment,
  garten: gartenFragment,
  sammlung: sammlungFragment,
}

const Coordinates = ({ row, refetchForm, table }) => {
  const firebase = useContext(firebaseContext)

  const { id, computed } = row
  const { lv95_x, lv95_y, wgs84_lat, wgs84_long } = computed

  const client = useApolloClient()

  const personOptionResult = useQuery(personOptionQuery, {
    variables: { accountId: firebase.auth().User.uid },
  })
  const { ga_lat_lng } =
    get(personOptionResult.data, 'person_option[0]', {}) || {}

  const [lv95XState, setLv95XState] = useState(lv95_x || '')
  const [lv95YState, setLv95YState] = useState(lv95_y || '')
  const [xError, setXError] = useState('')
  const [yError, setYError] = useState('')

  const [wgs84LatState, setWgs84LatState] = useState(wgs84_lat || '')
  const [wgs84LongState, setWgs84LongState] = useState(wgs84_long || '')
  const [wgs84LatError, setWgs84LatError] = useState('')
  const [wgs84LongError, setWgs84LongError] = useState('')

  // ensure state is updated when changed from outside
  useEffect(() => {
    setLv95XState(lv95_x || '')
    setLv95YState(lv95_y || '')
  }, [lv95_x, lv95_y])
  useEffect(() => {
    setWgs84LatState(wgs84_lat || '')
    setWgs84LongState(wgs84_long || '')
  }, [wgs84_lat, wgs84_long])

  const onChangeX = useCallback(event => {
    const value = ifIsNumericAsNumber(event.target.value)
    setLv95XState(value)
  }, [])
  const onBlurX = useCallback(
    event => {
      const value = ifIsNumericAsNumber(event.target.value)
      const isValid = xIsValid(value)
      if (!isValid) return setXError(xMessage)
      setXError('')
      // only save if changed
      if (value === lv95_x) return
      if ((value && lv95YState) || (!value && !lv95YState)) {
        saveToDbLv95(value, lv95YState)
      }
    },
    [lv95YState, lv95_x, saveToDbLv95],
  )
  const onChangeY = useCallback(event => {
    const value = ifIsNumericAsNumber(event.target.value)
    setLv95YState(value)
  }, [])
  const onBlurY = useCallback(
    event => {
      const value = ifIsNumericAsNumber(event.target.value)
      const isValid = yIsValid(value)
      if (!isValid) return setYError(yMessage)
      setYError('')
      // only save if changed
      if (value === lv95_y) return
      if ((value && lv95XState) || (!value && !lv95XState))
        saveToDbLv95(lv95XState, value)
    },
    [lv95XState, lv95_y, saveToDbLv95],
  )

  const onChangeWgs84Lat = useCallback(event => {
    const value = ifIsNumericAsNumber(event.target.value)
    setWgs84LatState(value)
  }, [])
  const onBlurWgs84Lat = useCallback(
    event => {
      const value = ifIsNumericAsNumber(event.target.value)
      const isValid = wgs84LatIsValid(value)
      if (!isValid) return setWgs84LatError(wgs84LatMessage)
      setWgs84LatError('')
      // only save if changed
      if (value === wgs84_lat) return
      if ((value && wgs84LongState) || (!value && !wgs84LongState)) {
        saveToDbWgs84(value, wgs84LongState)
      }
    },
    [saveToDbWgs84, wgs84LongState, wgs84_lat],
  )
  const onChangeWgs84Long = useCallback(event => {
    const value = ifIsNumericAsNumber(event.target.value)
    setWgs84LongState(value)
  }, [])
  const onBlurWgs84Long = useCallback(
    event => {
      const value = ifIsNumericAsNumber(event.target.value)
      const isValid = wgs84LongIsValid(value)
      if (!isValid) return setWgs84LongError(wgs84LongMessage)
      setWgs84LongError('')
      // only save if changed
      if (value === wgs84_long) return
      if ((value && wgs84LatState) || (!value && !wgs84LatState)) {
        saveToDbWgs84(wgs84LatState, value)
      }
    },
    [saveToDbWgs84, wgs84LatState, wgs84_long],
  )

  const saveToDbLv95 = useCallback(
    (x, y) => {
      let geomPoint = null
      if (x && y) {
        geomPoint = {
          type: 'Point',
          coordinates: epsg2056to4326(x, y),
          crs: { type: 'name', properties: { name: 'EPSG:4326' } },
        }
      }
      saveToDb(geomPoint, 'lv95')
    },
    [saveToDb],
  )
  const saveToDbWgs84 = useCallback(
    (lat, long) => {
      let geomPoint = null
      if (lat && long) {
        geomPoint = {
          type: 'Point',
          coordinates: [long, lat],
          crs: { type: 'name', properties: { name: 'EPSG:4326' } },
        }
      }
      saveToDb(geomPoint, 'wgs84')
    },
    [saveToDb],
  )

  const saveToDb = useCallback(
    async (geomPoint, projection) => {
      try {
        const fragment = fragments[table]
        const Fields = `${upperFirst(table)}Fields`
        const mutationName = `update_${table}`
        await client.mutate({
          mutation: gql`
            mutation ${mutationName}(
              $id: bigint!
              $geomPoint: geometry
            ) {
              ${mutationName}(
                  where: { id: { _eq: $id } }
                  _set: {
                    geom_point: $geomPoint
                  }
                ) {
                  affected_rows
                  returning {
                    ...${Fields}
                  }
              }
            }
            ${fragment}
          `,
          variables: {
            id: row.id,
            geomPoint,
          },
        })
      } catch (error) {
        console.log('saveToDb, error:', error)
        return projection === 'lv95'
          ? setYError(error.message)
          : setWgs84LatError(error.message)
      }
      // refetch form
      refetchForm()
      setYError('')
      setXError('')
      setWgs84LatError('')
      setWgs84LongError('')
    },
    [client, refetchForm, row.id, table],
  )

  return (
    <>
      {ga_lat_lng && (
        <Row>
          <LeftFormControl
            fullWidth
            error={!!wgs84LatError}
            aria-describedby={`${id}wgs84LatErrorText`}
          >
            <InputLabel htmlFor={`${id}wgs84_lat`} shrink>
              Breitengrad
            </InputLabel>
            <Input
              id={`${id}wgs84_lat`}
              data-id="wgs84_lat"
              name="wgs84_lat"
              value={wgs84LatState}
              type="number"
              onChange={onChangeWgs84Lat}
              onBlur={onBlurWgs84Lat}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            {!!wgs84LatError && (
              <FormHelperText
                id={`${id}wgs84LatErrorText`}
                data-id="wgs84LatErrorText"
              >
                {wgs84LatError}
              </FormHelperText>
            )}
          </LeftFormControl>
          <StyledFormControl
            fullWidth
            error={!!wgs84LongError}
            aria-describedby={`${id}wgs84LongErrorText`}
          >
            <InputLabel htmlFor={`${id}wgs84_long`} shrink>
              Längengrad
            </InputLabel>
            <Input
              id={`${id}wgs84_long`}
              data-id="wgs84_long"
              name="wgs84_long"
              value={wgs84LongState}
              type="number"
              onChange={onChangeWgs84Long}
              onBlur={onBlurWgs84Long}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            {!!wgs84LongError && (
              <FormHelperText
                id={`${id}wgs84LongErrorText`}
                data-id="wgs84LongErrorText"
              >
                {wgs84LongError}
              </FormHelperText>
            )}
          </StyledFormControl>
        </Row>
      )}
      <Row>
        <LeftFormControl
          fullWidth
          error={!!xError}
          aria-describedby={`${id}lv95XErrorText`}
        >
          <InputLabel htmlFor={`${id}lv95_x`} shrink>
            X-Koordinate
          </InputLabel>
          <Input
            id={`${id}lv95_x`}
            data-id="lv95_x"
            name="lv95_x"
            value={lv95XState}
            type="number"
            onChange={onChangeX}
            onBlur={onBlurX}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          {!!xError && (
            <FormHelperText id={`${id}lv95XErrorText`} data-id="lv95XErrorText">
              {xError}
            </FormHelperText>
          )}
        </LeftFormControl>
        <StyledFormControl
          fullWidth
          error={!!yError}
          aria-describedby={`${id}lv95YErrorText`}
        >
          <InputLabel htmlFor={`${id}lv95_y`} shrink>
            Y-Koordinate
          </InputLabel>
          <Input
            id={`${id}lv95_y`}
            data-id="lv95_y"
            name="lv95_y"
            value={lv95YState}
            type="number"
            onChange={onChangeY}
            onBlur={onBlurY}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          {!!yError && (
            <FormHelperText id={`${id}lv95YErrorText`} data-id="lv95YErrorText">
              {yError}
            </FormHelperText>
          )}
        </StyledFormControl>
      </Row>
    </>
  )
}

export default observer(Coordinates)
