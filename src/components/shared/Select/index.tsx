import { useState, useEffect } from 'react'
import SelectComponent from 'react-select'
import FormHelperText from '@mui/material/FormHelperText'
import styled from '@emotion/styled'

import { Link } from './Link.tsx'

import type { SaveToDbFn } from '../types.ts'

import styles from './index.module.css'

// leave this styled use as css modules can't deal with nested classes
// and multiple selects are styled differently
export const StyledSelect = styled(SelectComponent, {
  shouldForwardProp: (prop) => !['nocaret', 'maxheight'].includes(prop),
})<{ nocaret?: boolean; maxheight?: number }>`
  .react-select__control {
    background-color: rgba(0, 0, 0, 0) !important;
    border-bottom-color: var(--input-underline);
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    min-height: 36px !important;
    height: 36px !important;
  }
  .react-select__control:hover {
    border-bottom-width: 2px;
  }
  .react-select__control:focus-within {
    border-bottom-color: var(--icon-primary) !important;
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
    padding-right: ${(props) => (props.nocaret ? '0' : '8px')};
  }
  .react-select__dropdown-indicator {
    /* ability to hide caret when not enough space */
    display: ${(props) => (props.nocaret ? 'none' : 'flex')};
  }
  .react-select__indicator-separator {
    /* ability to hide caret when not enough space */
    width: ${(props) => (props.nocaret ? '0' : '1px')};
  }
  input {
    @media print {
      padding-top: 3px;
      padding-bottom: 0;
    }
  }
  .react-select__menu,
  .react-select__menu-list {
    height: 130px;
    height: ${(props) => (props.maxheight ? `${props.maxheight}px` : 'unset')};
    /* make it open over title-row (which needs to have z-index 1 to hide text scrolling below it)*/
    z-index: 2;
  }
`

const emptyValue = {
  value: '',
  label: '',
}

export interface SelectOption {
  value: string | number | null
  label: string
  inaktiv?: boolean
  link?: string[]
}

export const Select = ({
  value: valuePassed,
  field = '',
  label,
  name,
  error,
  helperText,
  options,
  loading = false,
  maxHeight = null,
  isClearable = true,
  noCaret = false,
  saveToDb,
}: {
  value: string | number | null
  field?: string
  label?: string
  name: string
  error?: string | boolean | null
  helperText?: string
  options: SelectOption[]
  loading?: boolean
  maxHeight?: number | null
  isClearable?: boolean
  noCaret?: boolean
  saveToDb: SaveToDbFn
}) => {
  const [stateValue, setStateValue] = useState<string | number | null>(
    valuePassed ?? '',
  )
  useEffect(() => {
    setStateValue(valuePassed)
  }, [valuePassed])

  const onChange = (option: SelectOption | null | undefined) => {
    const newValue = option ? option.value : null
    setStateValue(newValue)
    const fakeEvent = {
      target: {
        name,
        value: newValue,
      },
    }
    saveToDb(fakeEvent)
  }

  // show ... while options are loading
  const loadingOptions: SelectOption[] = [{ value: stateValue, label: '...' }]
  const optionsToUse = loading && valuePassed ? loadingOptions : options
  const selectValue: SelectOption =
    optionsToUse.find((o) => o.value === (valuePassed ?? '')) || emptyValue
  const selectStyles = {
    option: (styles: Record<string, unknown>, { data }: { data: SelectOption }) => ({
      ...styles,
      ...(data.inaktiv ? { color: 'var(--text-secondary)' } : {}),
    }),
    menuPortal: (base: Record<string, unknown>) => ({ ...base, zIndex: 9999 }),
  }

  // console.log('SharedSelect', {
  //   field,
  //   selectValue,
  //   optionsToUse,
  //   valuePassed,
  //   stateValue,
  // })

  return (
    <div className={styles.container}>
      {label && <div className={styles.labelClass}>{label}</div>}
      <div className={styles.selectRow}>
        <StyledSelect
          id={field}
          name={field}
          value={selectValue}
          options={optionsToUse}
          onChange={(option) => onChange(option as SelectOption | null)}
          hideSelectedOptions
          placeholder=""
          isClearable={isClearable}
          isSearchable
          noOptionsMessage={() => '(keine)'}
          maxheight={maxHeight ?? undefined}
          classNamePrefix="react-select"
          nocaret={noCaret}
          styles={selectStyles as unknown as import('react-select').StylesConfig}
          // using portal because sticky headers would otherwise cover the dropdown
          menuPortalTarget={document.getElementById('root')}
          aria-label={label ?? ''}
        />
        {!!selectValue.link && <Link link={selectValue.link} />}
      </div>
      {error && <div className={styles.errorClass}>{error}</div>}
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </div>
  )
}
