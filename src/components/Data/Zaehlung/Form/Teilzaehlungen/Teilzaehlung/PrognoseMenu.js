import React, { useState, useCallback, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Menu from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import { IoMdInformationCircleOutline } from 'react-icons/io'

import { StoreContext } from '../../../../../../models/reactUtils'
import TextField from '../../../../../shared/TextField'
import ifIsNumericAsNumber from '../../../../../../utils/ifIsNumericAsNumber'
import exists from '../../../../../../utils/exists'
import getConstants from '../../../../../../utils/constants'
import ErrorBoundary from '../../../../../shared/ErrorBoundary'

const constants = getConstants()

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  user-select: none;
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

const PrognoseMenu = ({
  onClosePrognosis,
  anchorEl,
  setAnchorEl,
  teilzaehlung,
  zaehlungId,
}) => {
  const store = useContext(StoreContext)
  const {
    addNotification,
    insertZaehlungRev,
    insertTeilzaehlungRev,
    teilzaehlungsSorted,
    zaehlungsSorted,
  } = store

  const zaehlung = store.zaehlungs.get(zaehlungId) ?? {}
  const kulturId = zaehlung.kultur_id

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
      const dateOfZaehlung = `${yearToUse}-09-15`
      const existingZaehlungData = zaehlungsSorted
        .filter((z) => z.datum === dateOfZaehlung)
        .filter((z) => z.prognose)
        .filter((z) => z.kultur_id === kulturId)
      const existingZaehlung = existingZaehlungData?.zaehlung?.[0]
      // if not: create it first
      let newZaehlungId
      // if not: create it first
      if (!existingZaehlung) {
        newZaehlungId = insertZaehlungRev({
          values: {
            kultur_id: kulturId,
            datum: dateOfZaehlung,
            prognose: true,
          },
        })
      }
      const zaehlungId = existingZaehlung?.id ?? newZaehlungId
      console.log({
        newZaehlungId,
        zaehlungId,
        teilzaehlung,
      })
      // create new teilzaehlung
      insertTeilzaehlungRev({
        values: {
          zaehlung_id: zaehlungId,
          teilkultur_id: teilzaehlung.teilkultur_id,
          anzahl_auspflanzbereit: anzAuspflanzbereit,
        },
      })
      // delete empty teilzaehlung
      let emptyTeilzaehlungenData = teilzaehlungsSorted
        .filter((t) => t.zaehlung_id === zaehlungId)
        .filter((t) => !t.teilkultur_id)
        .filter((t) => !exists(t.anzahl_pflanzen))
        .filter((t) => !exists(t.anzahl_auspflanzbereit))
        .filter((t) => !exists(t.anzahl_mutterpflanzen))
        .filter((t) => !exists(t.andere_menge))
        .filter((t) => !exists(t.bemerkungen))
        .filter((t) => !exists(t.auspflanzbereit_beschreibung))
      const emptyTeilzaehlung = emptyTeilzaehlungenData?.teilzaehlung?.[0]
      if (emptyTeilzaehlung) {
        const emptyTzModel = store.teilzaehlungs.get(emptyTeilzaehlung.id)
        emptyTzModel.delete()
      }
      addNotification({
        message: 'Die Prognose wurde gespeichert',
        type: 'info',
      })
      setAnchorEl(null)
      setErrors({})
    },
    [
      addNotification,
      anz,
      insertTeilzaehlungRev,
      insertZaehlungRev,
      jahr,
      kulturId,
      setAnchorEl,
      store.teilzaehlungs,
      teilzaehlung,
      teilzaehlungsSorted,
      zaehlungsSorted,
    ],
  )
  const onClickAbbrechen = useCallback(() => setAnchorEl(null), [setAnchorEl])
  const openDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Planen`
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

export default observer(PrognoseMenu)