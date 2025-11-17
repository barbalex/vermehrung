import { useState, useEffect, useContext } from 'react'
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

import {
  formControl,
  fieldContainer,
  leftFormControl,
  rowClass,
  container,
  buttonContainer,
  menuTitle,
} from './Coordinates.module.css'

const Container = styled.div`
  display: flex;
`
const ButtonContainer = styled.div`
  align-self: center;
  flex-shrink: 2;
`
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

  const saveToDb = (geomPoint) => {
    const fakeEvent = {
      target: {
        name: 'geom_point',
        value: geomPoint,
      },
    }
    originalSaveToDb(fakeEvent)
  }

  const saveToDbLv95 = (x, y) => {
    let geomPoint = null
    if (x && y) {
      geomPoint = {
        type: 'Point',
        coordinates: epsg2056to4326(x, y),
        crs: { type: 'name', properties: { name: 'EPSG:4326' } },
      }
    }
    saveToDb(geomPoint, 'lv95')
  }

  const onChangeX = (event) => {
    const value = ifIsNumericAsNumber(event.target.value)
    setLv95XState(value)
  }

  const onBlurX = (event) => {
    const value = ifIsNumericAsNumber(event.target.value)
    const isValid = xIsValid(value)
    if (!isValid) return setXError(xMessage)
    setXError('')
    // only save if changed
    if (value === lv95_x) return
    if ((value && lv95YState) || (!value && !lv95YState)) {
      saveToDbLv95(value, lv95YState)
    }
  }

  const onChangeY = (event) => {
    const value = ifIsNumericAsNumber(event.target.value)
    setLv95YState(value)
  }

  const onBlurY = (event) => {
    const value = ifIsNumericAsNumber(event.target.value)
    const isValid = yIsValid(value)
    if (!isValid) return setYError(yMessage)
    setYError('')
    // only save if changed
    if (value === lv95_y) return
    if ((value && lv95XState) || (!value && !lv95XState))
      saveToDbLv95(lv95XState, value)
  }

  const saveToDbWgs84 = (lat, long) => {
    let geomPoint = null
    if (lat && long) {
      geomPoint = {
        type: 'Point',
        coordinates: [long, lat],
        crs: { type: 'name', properties: { name: 'EPSG:4326' } },
      }
    }
    saveToDb(geomPoint, 'wgs84')
  }

  const onChangeWgs84Lat = (event) => {
    const value = ifIsNumericAsNumber(event.target.value)
    setWgs84LatState(value)
  }

  const onBlurWgs84Lat = (event) => {
    const value = ifIsNumericAsNumber(event.target.value)
    const isValid = wgs84LatIsValid(value)
    if (!isValid) return setWgs84LatError(wgs84LatMessage)
    setWgs84LatError('')
    // only save if changed
    if (value === wgs84_lat) return
    if ((value && wgs84LongState) || (!value && !wgs84LongState)) {
      saveToDbWgs84(value, wgs84LongState)
    }
  }

  const onChangeWgs84Long = (event) => {
    const value = ifIsNumericAsNumber(event.target.value)
    setWgs84LongState(value)
  }

  const onBlurWgs84Long = (event) => {
    const value = ifIsNumericAsNumber(event.target.value)
    const isValid = wgs84LongIsValid(value)
    if (!isValid) return setWgs84LongError(wgs84LongMessage)
    setWgs84LongError('')
    // only save if changed
    if (value === wgs84_long) return
    if ((value && wgs84LatState) || (!value && !wgs84LatState)) {
      saveToDbWgs84(wgs84LatState, value)
    }
  }

  const [mapMenuAnchorEl, setMapMenuAnchorEl] = useState(null)
  const mapMenuOpen = Boolean(mapMenuAnchorEl)

  const onClickGeoAdmin = () => {
    if (lv95_x && lv95_y) {
      window.open(
        `https://map.geo.admin.ch/?bgLayer=ch.swisstopo.pixelkarte-farbe&Y=${lv95_x}&X=${lv95_y}&zoom=10&crosshair=circle`,
        'target="_blank"',
      )
    }
    setMapMenuAnchorEl(null)
  }

  const onClickMapsZhCh = () => {
    if (lv95_x && lv95_y) {
      // BEWARE: maps.zh.ch seems to only work in production
      // nope. Does it only work for certain urls??????
      window.open(
        `https://maps.zh.ch/?x=${lv95_x}&y=${lv95_y}&scale=3000&markers=ring`,
        'target="_blank"',
      )
    }
    setMapMenuAnchorEl(null)
  }

  return (
    <Container>
      <div className={fieldContainer}>
        {ga_lat_lng && (
          <div className={rowClass}>
            <FormControl
              fullWidth
              error={!!wgs84LatError}
              aria-describedby={`${id}wgs84LatErrorText`}
              variant="standard"
              className={leftFormControl}
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
            </FormControl>
            <FormControl
              fullWidth
              error={!!wgs84LongError}
              aria-describedby={`${id}wgs84LongErrorText`}
              variant="standard"
              className={formControl}
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
            </FormControl>
          </div>
        )}
        <div className={rowClass}>
          <FormControl
            fullWidth
            error={!!xError}
            aria-describedby={`${id}lv95XErrorText`}
            variant="standard"
            className={leftFormControl}
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
          </FormControl>
          <FormControl
            fullWidth
            error={!!yError}
            aria-describedby={`${id}lv95YErrorText`}
            variant="standard"
            className={formControl}
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
          </FormControl>
        </div>
      </div>
      <ButtonContainer>
        <IconButton
          aria-label="Öffnen in map.geo.admin.ch"
          title="Öffnen in map.geo.admin.ch"
          //onClick={(event) => setMapMenuAnchorEl(event.currentTarget)}
          onClick={onClickGeoAdmin}
          aria-owns={mapMenuOpen ? 'mapMenu' : undefined}
          aria-haspopup="true"
          disabled={!(lv95_x && lv95_y)}
        >
          <FaGlobeEurope />
        </IconButton>
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
