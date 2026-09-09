import { useAtomValue } from 'jotai'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import { FaTimes, FaFilter } from 'react-icons/fa'

import {
  docFilterAtom,
  setDocFilter,
  docsCountAtom,
  docsFilteredCountAtom,
} from '../../../../store/index.js'
import { FilterNumbers as Numbers } from './Numbers.jsx'

import styles from './index.module.css'

export const DokuFilter = () => {
  const docFilter = useAtomValue(docFilterAtom)
  const docsCount = useAtomValue(docsCountAtom)
  const docsFilteredCount = useAtomValue(docsFilteredCountAtom)
  const onChange = (e) => setDocFilter(e.target.value)
  const onClickEmptyFilter = () => setDocFilter('')

  return (
    <div className={styles.container}>
      <Input
        id="filterInput"
        value={docFilter}
        onChange={onChange}
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Artikel filtern"
        variant="outlined"
        startAdornment={
          <InputAdornment position="start">
            <FaFilter className={styles.filterIcon} />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment
            position="end"
            onClick={onClickEmptyFilter}
            title={
              docFilter
                ? 'Filter entfernen'
                : 'Filter entfernen (keiner gesetzt)'
            }
          >
            <FaTimes
              style={{
                color: docFilter ? 'white' : '#4a148c',
                cursor: docFilter ? 'pointer' : 'default',
              }}
            />
          </InputAdornment>
        }
        className={styles.input}
      />
      <Numbers totalCount={docsCount} filteredCount={docsFilteredCount} />
    </div>
  )
}
