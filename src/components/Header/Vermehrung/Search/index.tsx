import { useRef } from 'react'
import { useAtomValue } from 'jotai'
import { FaSearch } from 'react-icons/fa'
import Select from 'react-select/async'
import Highlighter from 'react-highlight-words'
import { useDebouncedCallback } from 'use-debounce'

import {
  singleColumnViewAtom,
  setActiveNodeArray,
  setFilterShow,
} from '../../../../store/index.ts'
import { buildOptions } from './buildOptions.ts'

import './index.css'
import styles from './index.module.css'

const formatOptionLabel = (
  { label }: { label: string },
  { inputValue }: { inputValue: string },
) => (
  <Highlighter searchWords={[inputValue]} textToHighlight={label} />
)
const formatGroupLabel = (data: { label: string }) => <div>{data.label}</div>
const noOptionsMessage = () => null
const loadingMessage = () => null

export const HeaderSearch = () => {
  const singleColumnView = useAtomValue(singleColumnViewAtom)

  const onChange = (option:
    | { val?: string; value?: string[]; type?: string; parent?: unknown }
    | null,
  ) => {
    if (!option) return
    if (option?.val === 'none') return
    let newActiveNodeArray
    // use option.value to set url
    switch (option?.type) {
      case 'Arten':
      case 'Gaerten':
      case 'Herkuenfte':
      case 'Lieferungen':
      case 'Personen':
      case 'Sammlungen':
      case 'Kulturen':
        newActiveNodeArray = [option?.type, option?.value]
        break
      case 'Events': {
        if (option?.parent) {
          newActiveNodeArray = [
            'Kulturen',
            option?.parent,
            option?.type,
            option?.value,
          ]
        } else if (!option.parent) {
          newActiveNodeArray = [option?.type, option?.value]
        }
        break
      }
      case 'Zaehlungen': {
        if (option?.parent) {
          newActiveNodeArray = [
            'Kulturen',
            option?.parent,
            option?.type,
            option?.value,
          ]
        } else if (!option.parent) {
          newActiveNodeArray = [option?.type, option?.value]
        }
        break
      }
      default: {
        // do nothing
      }
    }
    setFilterShow(false)
    setActiveNodeArray((newActiveNodeArray ?? []) as string[])
  }

  const buildOptionsDebounced = useDebouncedCallback(
    ({ cb, val }: { cb: (options: unknown[]) => void; val: string }) => {
      buildOptions({ cb, val })
    },
    600,
  )
  const loadOptions = (val: string, cb: (options: unknown[]) => void) =>
    buildOptionsDebounced({ cb, val })

  const ref = useRef<HTMLDivElement | null>(null)
  const ownWidth = ref?.current?.getBoundingClientRect()?.width
  const maxWidth = (ownWidth ?? 250) + 48 + 48 + 48

  const customStyles = {
    control: (provided: Record<string, unknown>) => ({
      ...provided,
      border: 'none',
      borderRadius: '3px',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      marginLeft: 0,
      paddingLeft: singleColumnView ? '2px' : '25px',
    }),
    valueContainer: (provided: Record<string, unknown>) => ({
      ...provided,
      borderRadius: '3px',
      paddingLeft: 0,
    }),
    singleValue: (provided: Record<string, unknown>) => ({
      ...provided,
      color: '#ac87d0',
    }),
    option: (provided: Record<string, unknown>) => ({
      ...provided,
      color: 'var(--text)',
      fontSize: '0.8em',
      paddingTop: '3px',
      paddingBottom: '3px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
    groupHeading: (provided: Record<string, unknown>) => ({
      ...provided,
      lineHeight: '1em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'var(--text)',
      fontWeight: '700',
      userSelect: 'none',
      textTransform: 'none',
    }),
    input: (provided: Record<string, unknown>) => ({
      ...provided,
      color: 'white',
    }),
    menuList: (provided: Record<string, unknown>) => ({
      ...provided,
      maxHeight: 'calc(100dvh - 60px)',
      scrollbarWidth: 'thin',
    }),
    menu: (provided: Record<string, unknown>) => ({
      ...provided,
      maxHeight: 'calc(100dvh - 60px)',
      width: 'auto',
      maxWidth,
      marginTop: 0,
    }),
    placeholder: (provided: Record<string, unknown>) => ({
      ...provided,
      color: '#ac87d0',
    }),
    indicatorSeparator: (provided: Record<string, unknown>) => ({
      ...provided,
      display: 'none',
    }),
    dropdownIndicator: (provided: Record<string, unknown>) => ({
      ...provided,
      display: 'none',
    }),
    clearIndicator: (provided: Record<string, unknown>) => ({
      ...provided,
      color: '#ac87d0',
    }),
  }

  return (
    <div className={styles.container} ref={ref}>
      {!singleColumnView && <FaSearch className={styles.searchIcon} />}
      <Select
        styles={
          customStyles as unknown as import('react-select').StylesConfig<{
            label: string
          }>
        }
        onChange={
          onChange as unknown as (
            newValue: unknown,
            actionMeta: unknown,
          ) => void
        }
        formatGroupLabel={
          formatGroupLabel as unknown as (group: unknown) => React.ReactNode
        }
        formatOptionLabel={
          formatOptionLabel as unknown as (
            option: { label: string },
            meta: { inputValue: string },
          ) => React.ReactNode
        }
        placeholder="suchen"
        noOptionsMessage={noOptionsMessage}
        loadingMessage={loadingMessage}
        classNamePrefix="react-select-search"
        loadOptions={
          loadOptions as unknown as (
            inputValue: string,
            callback: (options: never) => void,
          ) => void
        }
        isClearable
        {...({ spellCheck: false } as { spellCheck?: boolean })}
        aria-label="suchen"
        className={styles.select}
      />
    </div>
  )
}
