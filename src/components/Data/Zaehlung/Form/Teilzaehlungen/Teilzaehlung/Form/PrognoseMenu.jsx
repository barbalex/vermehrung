import { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { Q } from '@nozbe/watermelondb'
import { of as $of } from 'rxjs'

import { MobxStoreContext } from '../../../../../../../mobxStoreContext.js'
import { TextField } from '../../../../../../shared/TextField.jsx'
import { ifIsNumericAsNumber } from '../../../../../../../utils/ifIsNumericAsNumber.js'
import { exists } from '../../../../../../../utils/exists.js'
import { constants } from '../../../../../../../utils/constants.js'
import { zaehlungSort } from '../../../../../../../utils/zaehlungSort.js'
import { ErrorBoundary } from '../../../../../../shared/ErrorBoundary.jsx'

import styles from './PrognoseMenu.module.css'

export const PrognoseMenu = observer(
  ({ onClosePrognosis, anchorEl, setAnchorEl, teilzaehlung }) => {
    const store = useContext(MobxStoreContext)
    const { addNotification, insertZaehlungRev, db } = store

    const [zaehlung, setZaehlung] = useState(null)
    useEffect(() => {
      const zaehlungObservable =
        teilzaehlung.zaehlung_id ? teilzaehlung.zaehlung.observe() : $of({})
      const subscription = zaehlungObservable.subscribe((zaehlung) =>
        setZaehlung(zaehlung),
      )

      return () => subscription?.unsubscribe?.()
    }, [teilzaehlung.zaehlung, teilzaehlung.zaehlung_id])
    const kulturId = zaehlung?.kultur_id

    const [jahr, setJahr] = useState(null)
    const [anz, setAnz] = useState(null)

    const [errors, setErrors] = useState({})
    useEffect(() => {
      setErrors({})
    }, [])

    const saveToDb = async (event) => {
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
      let existingZaehlungData = []
      try {
        existingZaehlungData = await db
          .get('zaehlung')
          .query(
            Q.where('_deleted', false),
            Q.where('prognose', true),
            Q.where('datum', dateOfZaehlung),
            Q.where('kultur_id', kulturId),
          )
          .fetch()
      } catch {}
      const existingZaehlungDataSorted = existingZaehlungData.sort(zaehlungSort)
      const existingZaehlung = existingZaehlungDataSorted?.[0]
      // if not: create it first
      let newZaehlungId
      // if not: create it first
      if (!existingZaehlung) {
        newZaehlungId = await insertZaehlungRev({
          values: {
            kultur_id: kulturId,
            datum: dateOfZaehlung,
            prognose: true,
          },
        })
      }
      const zaehlungId = existingZaehlung?.id ?? newZaehlungId
      // fetch teilzaehlungen with zaehlung_id === newZaehlungId, then update that
      // if inserting there will be two teilzaehlungs because of server trigger
      const interval = setInterval(async () => {
        const newTzs = await db
          .get('teilzaehlung')
          .query(Q.where('zaehlung_id', zaehlungId))
        const newTz = newTzs?.[0]
        if (newTz) {
          clearInterval(interval)
          await newTz.edit({
            field: 'anzahl_auspflanzbereit',
            value: anzAuspflanzbereit,
            store,
          })
          addNotification({
            message: 'Der Bedarf wurde gespeichert',
            type: 'info',
          })
        }
        setAnchorEl(null)
        setErrors({})
      }, 200)
    }

    const onClickAbbrechen = () => setAnchorEl(null)

    const openDocs = () => {
      const url = `${constants?.getAppUri()}/Dokumentation/planen`
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }

    return (
      <ErrorBoundary>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onClosePrognosis}
        >
          <div className={styles.titleRow}>
            <div className={styles.title}>Bedarf für diese Teil-Zählung:</div>
            <div>
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openDocs}
                size="large"
              >
                <IoMdInformationCircleOutline />
              </IconButton>
            </div>
          </div>
          <div className={styles.fieldClass}>
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
          </div>
          <div className={styles.fieldClass}>
            <TextField
              key="anzahl_auspflanzbereit"
              name="anzahl_auspflanzbereit"
              label="Anzahl auspflanz-bereit"
              value=""
              saveToDb={saveToDb}
              error={errors.anzahl_auspflanzbereit}
              type="number"
            />
          </div>
          <div className={styles.buttons}>
            <Button
              onClick={onClickAbbrechen}
              color="inherit"
            >
              abbrechen
            </Button>
            <Button
              onClick={onClickAbbrechen}
              color="inherit"
            >
              speichern
            </Button>
          </div>
        </Menu>
      </ErrorBoundary>
    )
  },
)
