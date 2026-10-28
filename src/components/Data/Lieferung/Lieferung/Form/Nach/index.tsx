import { useAtomValue } from 'jotai'

import {
  dbAtom,
  errorsAtom,
  filterKulturAtom,
  filterSammlungAtom,
} from '../../../../../../store/index.ts'
import { Select } from '../../../../../shared/Select/index.tsx'
import { Checkbox2States } from '../../../../../shared/Checkbox2States.tsx'
import { JesNo } from '../../../../../shared/JesNo.tsx'
import { exists } from '../../../../../../utils/exists.ts'
import { useLieferungNachData } from './useData.tsx'
import { LieferungAdd as Add } from './Add/index.tsx'

import wannStyles from '../Wann.module.css'
import styles from './index.module.css'

export const LieferungNach = ({
  showFilter,
  row,
  saveToDb,
  ifNeeded,
  herkunft,
}: {
  showFilter: boolean
  row: import('../../../../../../dbModel.ts').Lieferung | null | undefined
  saveToDb: (event: { target: { name?: string; value: unknown } }) => void
  ifNeeded: boolean
  herkunft: import('../../../../../shared/types.ts').WmRow | null | undefined
}) => {
  const db = useAtomValue(dbAtom)
  const errors = useAtomValue(errorsAtom)
  const kulturFilter = useAtomValue(filterKulturAtom)
  const sammlungFilter = useAtomValue(filterSammlungAtom)
  const filter = { kultur: kulturFilter, sammlung: sammlungFilter }

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
        className={wannStyles.titleRow}
        style={{
          backgroundColor: showFilter
            ? 'var(--filter-bg-alt)'
            : 'var(--form-bg)',
        }}
      >
        <div className={wannStyles.title}>nach</div>
      </div>
      {ifNeeded('nach_kultur_id') && (
        <div className={styles.selectRow}>
          <Select
            key={`${row?.id}${row?.nach_kultur_id}nach_kultur_id`}
            name="nach_kultur_id"
            value={row?.nach_kultur_id}
            field="nach_kultur_id"
            label={`Kultur${
              exists(row?.art_id)
                ? ` (Kulturen derselben Art und Herkunft${
                    row?.von_kultur_id ? ', ohne die von-Kultur' : ''
                  })`
                : ''
            }`}
            options={nachKulturWerte}
            saveToDb={saveToDb}
            error={errors?.lieferung?.nach_kultur_id as string | undefined}
          />
          <Add
            disabled={!(row?.art_id && herkunft) || !row?.von_sammlung_id}
            herkunft={herkunft}
            lieferung={row}
          />
        </div>
      )}
      {ifNeeded('nach_ausgepflanzt') && (
        <>
          {showFilter ? (
            <JesNo
              key={`${row?.id}nach_ausgepflanzt`}
              label="ausgepflanzt"
              name="nach_ausgepflanzt"
              value={row?.nach_ausgepflanzt}
              saveToDb={saveToDb}
              error={errors?.lieferung?.nach_ausgepflanzt as string | undefined}
            />
          ) : (
            <Checkbox2States
              key={`${row?.id}nach_ausgepflanzt`}
              label="ausgepflanzt"
              name="nach_ausgepflanzt"
              value={row?.nach_ausgepflanzt}
              saveToDb={saveToDb}
              error={errors?.lieferung?.nach_ausgepflanzt as string | undefined}
            />
          )}
        </>
      )}
    </>
  )
}
