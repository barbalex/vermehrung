import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { DateField as Date } from '../../../../shared/Date.jsx'
import { Checkbox2States } from '../../../../shared/Checkbox2States.jsx'
import { JesNo } from '../../../../shared/JesNo.jsx'
import { constants } from '../../../../../utils/constants.js'

import { title, titleRow, fieldRow } from './Wann.module.css'

export const LieferungWann = observer(
  ({ showFilter, row, saveToDb, ifNeeded }) => {
    const store = useContext(MobxStoreContext)

    const { errors } = store

    const openPlanenDocs = () => {
      const url = `${constants?.getAppUri()}/Dokumentation/planen`
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }

    return (
      <>
        <div
          className={titleRow}
          style={{
            backgroundColor: showFilter ? '#ffe0b2' : 'rgba(248, 243, 254, 1)',
          }}
        >
          <div className={title}>wann</div>
        </div>
        {ifNeeded('datum') && (
          <Date
            key={`${row.id}datum`}
            name="datum"
            label="Datum"
            value={row.datum}
            saveToDb={saveToDb}
            error={errors?.lieferung?.datum}
          />
        )}
        {ifNeeded('geplant') && (
          <div className={fieldRow}>
            {showFilter ?
              <JesNo
                key={`${row.id}geplant`}
                label="Geplant"
                name="geplant"
                value={row.geplant}
                saveToDb={saveToDb}
                error={errors?.lieferung?.geplant}
              />
            : <Checkbox2States
                key={`${row.id}geplant`}
                label="Geplant"
                name="geplant"
                value={row.geplant}
                saveToDb={saveToDb}
                error={errors?.lieferung?.geplant}
              />
            }
            <div>
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openPlanenDocs}
                size="large"
              >
                <IoMdInformationCircleOutline />
              </IconButton>
            </div>
          </div>
        )}
      </>
    )
  },
)
