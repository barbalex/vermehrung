import React, { useState, useCallback, useEffect, useContext } from 'react'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import { FaGlobeEurope } from 'react-icons/fa'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { ifIsNumericAsNumber } from '../../utils/ifIsNumericAsNumber.js'
import { epsg2056to4326 } from '../../utils/epsg2056to4326.js'
import {
  isValid as xIsValid,
  message as xMessage,
} from '../../utils/lv95XIsValid.js'
import {
  isValid as yIsValid,
  message as yMessage,
} from '../../utils/lv95YIsValid.js'
import {
  isValid as wgs84LatIsValid,
  message as wgs84LatMessage,
} from '../../utils/wgs84LatIsValid.js'
import {
  isValid as wgs84LongIsValid,
  message as wgs84LongMessage,
} from '../../utils/wgs84LongIsValid.js'
import { MobxStoreContext } from '../../mobxStoreContext.js'

const StyledFormControl = styled(FormControl)`
  padding-bottom: 19px !important;
  > div:before {
    border-bottom-color: rgba(0, 0, 0, 0.1) !important;
  }
`
const FieldContainer = styled.div`
  flex-grow: 4;
`
const LeftFormControl = styled(StyledFormControl)`
  padding-right: 8px !important;
`
const Row = styled.div`
  display: flex;
`
const Container = styled.div`
  display: flex;
`
const ButtonContainer = styled.div`
  align-self: center;
  flex-shrink: 2;
`
const MapButton = styled(IconButton)``
const MenuTitle = styled.div`
  padding-top: 6px;
  padding-left: 15px;
  padding-right: 16px;
  padding-bottom: 0;
  margin-bottom: 3px;
  font-size: 0.8em;
  font-weight: 500;
  &:focus {
    outline: none;
  }
`

export const Coordinates = observer(({ row, saveToDb: originalSaveToDb }) => {
  const store = useContext(MobxStoreContext)
  const { user, db } = store

  const { id, lv95_x, lv95_y, wgs84_lat, wgs84_long } = row

  const [dataState, setDataState] = useState({
    userPersonOption: undefined,
  })
  useEffect(() => {
    const userPersonOptionsObservable =
      user.uid ?
        db
          .get('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['ga_lat_lng'])
      : $of({})
    const combinedObservables = combineLatest([userPersonOptionsObservable])
    const subscription = combinedObservables.subscribe(
      ([userPersonOptions]) => {
        setDataState({
          userPersonOption: userPersonOptions?.[0],
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [db, user.uid])
  const { userPersonOption } = dataState
  const { ga_lat_lng } = userPersonOption ?? {}

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

  const saveToDb = useCallback(
    async (geomPoint) => {
      const fakeEvent = {
        target: {
          name: 'geom_point',
          value: geomPoint,
        },
      }
      originalSaveToDb(fakeEvent)
    },
    [originalSaveToDb],
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

  const onChangeX = useCallback((event) => {
    const value = ifIsNumericAsNumber(event.target.value)
    setLv95XState(value)
  }, [])
  const onBlurX = useCallback(
    (event) => {
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
  const onChangeY = useCallback((event) => {
    const value = ifIsNumericAsNumber(event.target.value)
    setLv95YState(value)
  }, [])
  const onBlurY = useCallback(
    (event) => {
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

  const onChangeWgs84Lat = useCallback((event) => {
    const value = ifIsNumericAsNumber(event.target.value)
    setWgs84LatState(value)
  }, [])
  const onBlurWgs84Lat = useCallback(
    (event) => {
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
  const onChangeWgs84Long = useCallback((event) => {
    const value = ifIsNumericAsNumber(event.target.value)
    setWgs84LongState(value)
  }, [])
  const onBlurWgs84Long = useCallback(
    (event) => {
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

  const [mapMenuAnchorEl, setMapMenuAnchorEl] = React.useState(null)
  const mapMenuOpen = Boolean(mapMenuAnchorEl)

  const onClickGeoAdmin = useCallback(() => {
    if (lv95_x && lv95_y) {
      window.open(
        `https://map.geo.admin.ch/?bgLayer=ch.swisstopo.pixelkarte-farbe&Y=${lv95_x}&X=${lv95_y}&zoom=10&crosshair=circle`,
        'target="_blank"',
      )
    }
    setMapMenuAnchorEl(null)
  }, [lv95_x, lv95_y])

  const onClickMapsZhCh = useCallback(() => {
    if (lv95_x && lv95_y) {
      // BEWARE: maps.zh.ch seems to only work in production
      // nope. Does it only work for certain urls??????
      window.open(
        `https://maps.zh.ch/?x=${lv95_x}&y=${lv95_y}&scale=3000&markers=ring`,
        'target="_blank"',
      )
    }
    setMapMenuAnchorEl(null)
  }, [lv95_x, lv95_y])

  return (
    <Container>
      <FieldContainer>
        {ga_lat_lng && (
          <Row>
            <LeftFormControl
              fullWidth
              error={!!wgs84LatError}
              aria-describedby={`${id}wgs84LatErrorText`}
              variant="standard"
            >
              <InputLabel
                htmlFor={`${id}wgs84_long`}
                shrink
              >
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
            </LeftFormControl>
            <StyledFormControl
              fullWidth
              error={!!wgs84LongError}
              aria-describedby={`${id}wgs84LongErrorText`}
              variant="standard"
            >
              <InputLabel
                htmlFor={`${id}wgs84_lat`}
                shrink
              >
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
            variant="standard"
          >
            <InputLabel
              htmlFor={`${id}lv95_x`}
              shrink
            >
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
              <FormHelperText
                id={`${id}lv95XErrorText`}
                data-id="lv95XErrorText"
              >
                {xError}
              </FormHelperText>
            )}
          </LeftFormControl>
          <StyledFormControl
            fullWidth
            error={!!yError}
            aria-describedby={`${id}lv95YErrorText`}
            variant="standard"
          >
            <InputLabel
              htmlFor={`${id}lv95_y`}
              shrink
            >
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
              <FormHelperText
                id={`${id}lv95YErrorText`}
                data-id="lv95YErrorText"
              >
                {yError}
              </FormHelperText>
            )}
          </StyledFormControl>
        </Row>
      </FieldContainer>
      <ButtonContainer>
        <MapButton
          aria-label="Öffnen in map.geo.admin.ch"
          title="Öffnen in map.geo.admin.ch"
          //onClick={(event) => setMapMenuAnchorEl(event.currentTarget)}
          onClick={onClickGeoAdmin}
          aria-owns={mapMenuOpen ? 'mapMenu' : undefined}
          aria-haspopup="true"
          disabled={!(lv95_x && lv95_y)}
        >
          <FaGlobeEurope />
        </MapButton>
        <Menu
          id="mapMenu"
          anchorEl={mapMenuAnchorEl}
          open={mapMenuOpen}
          onClose={() => setMapMenuAnchorEl(null)}
        >
          <MenuTitle>Öffnen in:</MenuTitle>
          <MenuItem onClick={onClickGeoAdmin}>map.geo.admin.ch</MenuItem>
          <MenuItem onClick={onClickMapsZhCh}>maps.zh.ch</MenuItem>
        </Menu>
      </ButtonContainer>
    </Container>
  )
})
