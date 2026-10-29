import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import AsyncSelect from 'react-select/async'
import styled from '@emotion/styled'
import { of as $of } from 'rxjs'

import { dbAtom } from '../../../../store/index.ts'
import styles from './TaxonSelect.module.css'

// leave this styled use due to css modules not able to nest classes
// and different stylings existing for selects
const StyledSelect = styled(AsyncSelect)`
  .react-select__control {
    background-color: rgba(0, 0, 0, 0) !important;
    border-bottom-color: var(--input-underline);
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
  .react-select__control:hover {
    border-bottom-width: 2px;
  }
  .react-select__control:focus-within {
    border-bottom-color: #4a148c !important;
    box-shadow: none;
  }
  .react-select__value-container {
    padding-left: 0;
  }
  .react-select__indicators {
    @media print {
      display: none;
    }
  }
  .react-select__clear-indicator {
    /* ability to hide caret when not enough space */
    padding-right: 0;
  }
  .react-select__dropdown-indicator {
    /* ability to hide caret when not enough space */
    display: none;
  }
  .react-select__indicator-separator {
    /* ability to hide caret when not enough space */
    width: 0;
  }
  input {
    @media print {
      padding-top: 3px;
      padding-bottom: 0;
    }
  }
`

const taxonLabelFromAeArt = (
  ae_art: import('../../../../dbModel.ts').AeArt | null | undefined,
) => {
  if (!ae_art) return '(kein Name)'

  const name = ae_art.name ?? '(kein Name)'
  const taxonomy = ae_art.taxonomy ?? '(keine Taxonomie)'

  return `${taxonomy}: ${name}`
}

export const TaxonSelect = ({
  labelSize = 12,
  art,
  saveToDb,
  error: saveToDbError,
  modelFilter,
}: {
  labelSize?: string | number
  art: import('../../../../dbModel.ts').Art | null | undefined
  saveToDb: (event: { target: { name?: string; value: unknown } }) => void
  error?: string | boolean | null | undefined
  modelFilter: (val: string) => import('../../../../dbModel.ts').AeArt[]
}) => {
  const db = useAtomValue(dbAtom)

  const [stateValue, setStateValue] = useState({
    value: art?.ae_id || '',
    label: '',
  })
  useEffect(() => {
    const observable = art?.ae_id
      ? db?.get<import('../../../../dbModel.ts').AeArt>('ae_art').findAndObserve(art?.ae_id)
      : $of(undefined)
    const subscription = (
      observable as unknown as import('rxjs').Observable<
        import('../../../../dbModel.ts').AeArt | undefined
      >
    )?.subscribe((record) =>
      setStateValue({
        value: art?.ae_id || '',
        label: taxonLabelFromAeArt(record),
      }),
    )

    return () => subscription?.unsubscribe?.()
  }, [db, art])

  const loadOptions = (inputValue: string, cb: (options: unknown[]) => void) => {
    const data = modelFilter(inputValue).slice(0, 7)
    const options = data.map((o) => {
      return {
        value: o.id,
        label: taxonLabelFromAeArt(o),
      }
    })
    cb(options)
  }

  const onChange = (option: { value?: string } | null) => {
    const value = option && option.value ? option.value : null
    setStateValue({ value: value ?? '', label: '' })
    const fakeEvent = {
      target: {
        name: 'ae_id',
        value,
      },
    }
    saveToDb(fakeEvent)
  }

  return (
    <div className={styles.container} data-id="ae_id">
      <div className={styles.labelClass} style={{ fontSize: labelSize }}>
        Taxon
      </div>
      <StyledSelect
        id="ae_id"
        defaultOptions
        name="ae_id"
        onChange={
          onChange as unknown as (
            newValue: unknown,
            actionMeta: unknown,
          ) => void
        }
        value={stateValue}
        hideSelectedOptions
        placeholder=""
        isClearable
        isSearchable
        // remove as can't select without typing
        {...({ nocaret: true } as Record<string, unknown>)}
        // don't show a no options message if a value exists
        noOptionsMessage={() =>
          stateValue ? null : '(Bitte Tippen für Vorschläge)'
        }
        // enable deleting typed values
        backspaceRemovesValue
        classNamePrefix="react-select"
        loadOptions={loadOptions}
        openMenuOnFocus
        // using portal because sticky headers would otherwise cover the dropdown
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        menuPortalTarget={document.getElementById('root')}
        aria-label="Taxon"
      />
      {saveToDbError && (
        <div className={styles.errorClass}>{saveToDbError}</div>
      )}
    </div>
  )
}
