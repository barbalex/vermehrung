import { useAtomValue } from 'jotai'
import IconButton from '@mui/material/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'

import { errorsAtom } from '../../../../../store/index.ts'
import { DateField as Date } from '../../../../shared/Date.tsx'
import { Checkbox2States } from '../../../../shared/Checkbox2States.tsx'
import { JesNo } from '../../../../shared/JesNo.tsx'
import { constants } from '../../../../../utils/constants.ts'

import wannStyles from './Wann.module.css'

export const LieferungWann = ({ showFilter, row, saveToDb, ifNeeded }) => {
  const errors = useAtomValue(errorsAtom)

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
        className={wannStyles.titleRow}
        style={{
          backgroundColor: showFilter ? 'var(--filter-bg-alt)' : 'var(--form-bg)',
        }}
      >
        <div className={wannStyles.title}>wann</div>
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
        <div className={wannStyles.fieldRow}>
          {showFilter ? (
            <JesNo
              key={`${row.id}geplant`}
              label="Geplant"
              name="geplant"
              value={row.geplant}
              saveToDb={saveToDb}
              error={errors?.lieferung?.geplant}
            />
          ) : (
            <Checkbox2States
              key={`${row.id}geplant`}
              label="Geplant"
              name="geplant"
              value={row.geplant}
              saveToDb={saveToDb}
              error={errors?.lieferung?.geplant}
            />
          )}
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
}
