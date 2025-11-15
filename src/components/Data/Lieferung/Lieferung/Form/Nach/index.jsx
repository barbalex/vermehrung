import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../../../../../mobxStoreContext.js'
import { Select } from '../../../../../shared/Select/index.jsx'
import { Checkbox2States } from '../../../../../shared/Checkbox2States.jsx'
import { JesNo } from '../../../../../shared/JesNo.jsx'
import { exists } from '../../../../../../utils/exists.js'
import { useLieferungNachData } from './useData.jsx'
import { LieferungAdd as Add } from './Add/index.jsx'

import { title, titleRow } from '../Wann.module.css'
import { selectRow } from './index.module.css'

export const LieferungNach = observer(
  ({ showFilter, row, saveToDb, ifNeeded, herkunft }) => {
    const store = useContext(MobxStoreContext)
    const { errors, db, filter } = store

    const { nachKulturWerte } = useLieferungNachData({
      showFilter,
      row,
      herkunft,
      db,
      filter,
    })

    return (
      <>
        <div
          className={titleRow}
          style={{
            backgroundColor: showFilter ? '#ffe0b2' : 'rgba(248, 243, 254, 1)',
          }}
        >
          <div className={title}>nach</div>
        </div>
        {ifNeeded('nach_kultur_id') && (
          <div className={selectRow}>
            <Select
              key={`${row.id}${row.nach_kultur_id}nach_kultur_id`}
              name="nach_kultur_id"
              value={row.nach_kultur_id}
              field="nach_kultur_id"
              label={`Kultur${
                exists(row.art_id) ?
                  ` (Kulturen derselben Art und Herkunft${
                    row.von_kultur_id ? ', ohne die von-Kultur' : ''
                  })`
                : ''
              }`}
              options={nachKulturWerte}
              saveToDb={saveToDb}
              error={errors?.lieferung?.nach_kultur_id}
            />
            <Add
              disabled={!(row.art_id && herkunft) || !row.von_sammlung_id}
              herkunft={herkunft}
              lieferung={row}
            />
          </div>
        )}
        {ifNeeded('nach_ausgepflanzt') && (
          <>
            {showFilter ?
              <JesNo
                key={`${row.id}nach_ausgepflanzt`}
                label="ausgepflanzt"
                name="nach_ausgepflanzt"
                value={row.nach_ausgepflanzt}
                saveToDb={saveToDb}
                error={errors?.lieferung?.nach_ausgepflanzt}
              />
            : <Checkbox2States
                key={`${row.id}nach_ausgepflanzt`}
                label="ausgepflanzt"
                name="nach_ausgepflanzt"
                value={row.nach_ausgepflanzt}
                saveToDb={saveToDb}
                error={errors?.lieferung?.nach_ausgepflanzt}
              />
            }
          </>
        )}
      </>
    )
  },
)
