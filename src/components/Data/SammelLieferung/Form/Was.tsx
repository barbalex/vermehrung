import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import IconButton from '@mui/material/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { first as first$ } from 'rxjs/operators'

import { errorsAtom } from '../../../../store/index.ts'
import { Select } from '../../../shared/Select/index.tsx'
import { TextField } from '../../../shared/TextField.tsx'
import { constants } from '../../../../utils/constants.ts'
import { artsSortedFromArts } from '../../../../utils/artsSortedFromArts.ts'
import { useRelationOptions } from '../../../../utils/useRelationOptions.ts'

import wannStyles from '../../Lieferung/Lieferung/Form/Wann.module.css'

export const SammelLieferungWas = ({
  showFilter,
  row,
  ifNeeded,
  saveToDb,
}: {
  showFilter: boolean
  row: import('../../../../dbModel.ts').SammelLieferung | null | undefined
  ifNeeded: (field: string) => boolean
  saveToDb: (event: { target: { name?: string; value: unknown } }) => void
}) => {
  const errors = useAtomValue(errorsAtom)

  // the chosen art is resolved once - the hook merges it into the
  // options so the select shows it even when filtered away
  const [chosenArt, setChosenArt] = useState<
    import('../../../../dbModel.ts').Art | null | undefined
  >(undefined)
  useEffect(() => {
    let isSubscribed = true
    row?.art
      .fetch()
      .then((art) => {
        if (isSubscribed) setChosenArt(art)
      })
      .catch(() => {
        if (isSubscribed) setChosenArt(null)
      })
    return () => {
      isSubscribed = false
    }
  }, [row?.art])

  const artWerte = useRelationOptions<
    import('../../../../dbModel.ts').Art,
    { value: string; label: string | undefined; link: string[] }
  >({
    table: 'art',
    chosenRow: chosenArt,
    showFilter,
    sort: artsSortedFromArts,
    buildOption: async (el) => {
      let label
      try {
        label = await el.label.pipe(first$()).toPromise()
      } catch {}

      return {
        value: el.id,
        label,
        link: ['Arten', el.id],
      }
    },
  })

  const openGenVielfaldDocs = () => {
    const url = `${constants?.getAppUri()}/Dokumentation/genetische-vielfalt`
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
          backgroundColor:
            showFilter ? 'var(--filter-bg-alt)' : 'var(--form-bg)',
        }}
      >
        <div className={wannStyles.title}>was</div>
      </div>
      {ifNeeded('art_id') && (
        <Select
          key={`${row?.id}art_id`}
          name="art_id"
          value={row?.art_id ?? null}
          field="art_id"
          label="Art"
          options={artWerte}
          saveToDb={saveToDb}
          error={errors?.sammel_lieferung?.art_id as string | undefined}
        />
      )}
      <div className={wannStyles.fieldRow}>
        {ifNeeded('anzahl_pflanzen') && (
          <TextField
            key={`${row?.id}anzahl_pflanzen`}
            name="anzahl_pflanzen"
            label="Anzahl Pflanzen"
            value={row?.anzahl_pflanzen ?? null}
            saveToDb={saveToDb}
            error={
              errors?.sammel_lieferung?.anzahl_pflanzen as string | undefined
            }
            type="number"
          />
        )}
        {ifNeeded('anzahl_auspflanzbereit') && (
          <TextField
            key={`${row?.id}anzahl_auspflanzbereit`}
            name="anzahl_auspflanzbereit"
            label="Anzahl auspflanzbereit"
            value={row?.anzahl_auspflanzbereit ?? null}
            saveToDb={saveToDb}
            error={
              errors?.sammel_lieferung?.anzahl_auspflanzbereit as
                string | undefined
            }
            type="number"
          />
        )}
      </div>
      <div className={wannStyles.fieldRow}>
        {ifNeeded('gramm_samen') && (
          <TextField
            key={`${row?.id}gramm_samen`}
            name="gramm_samen"
            label="Gramm Samen"
            value={row?.gramm_samen ?? null}
            saveToDb={saveToDb}
            error={errors?.sammel_lieferung?.gramm_samen as string | undefined}
            type="number"
          />
        )}
        {ifNeeded('andere_menge') && (
          <TextField
            key={`${row?.id}andere_menge`}
            name="andere_menge"
            label={`Andere Menge (z.B. "3 Zwiebeln")`}
            value={row?.andere_menge ?? null}
            saveToDb={saveToDb}
            error={errors?.sammel_lieferung?.andere_menge as string | undefined}
            type="text"
          />
        )}
      </div>
      {ifNeeded('von_anzahl_individuen') && (
        <div className={wannStyles.fieldRow}>
          <TextField
            key={`${row?.id}von_anzahl_individuen`}
            name="von_anzahl_individuen"
            label="von Anzahl Individuen"
            value={row?.von_anzahl_individuen ?? null}
            saveToDb={saveToDb}
            error={
              errors?.sammel_lieferung?.von_anzahl_individuen as
                string | undefined
            }
            type="number"
          />
          <div>
            <IconButton
              aria-label="Anleitung öffnen"
              title="Anleitung öffnen"
              onClick={openGenVielfaldDocs}
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
