import React, { useCallback, useContext } from 'react'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import MenuItem from '@material-ui/core/MenuItem'

import { StoreContext } from '../../../../models/reactUtils'

export default ({ suggestion, val, setVal }) => {
  if (typeof window === 'undefined') return null
  const store = useContext(StoreContext)
  const { setActiveNodeArray } = store.tree

  const onClick = useCallback(() => {
    console.log('Search, onSuggestionSelected', { suggestion })
    let newActiveNodeArray
    // use suggestion.id to set url
    switch (suggestion.type) {
      case 'Arten':
      case 'Gaerten':
      case 'Herkuenfte':
      case 'Lieferungen':
      case 'Personen':
      case 'Sammlungen':
      case 'Kulturen':
        newActiveNodeArray = [suggestion.type, suggestion.id]
        break
      case 'Events': {
        if (suggestion.parent) {
          newActiveNodeArray = [
            'Kulturen',
            suggestion.parent,
            suggestion.type,
            suggestion.id,
          ]
        } else if (!suggestion.parent) {
          newActiveNodeArray = ['Events', suggestion.id]
        }
        break
      }
      case 'Zaehlungen': {
        if (suggestion.parent) {
          newActiveNodeArray = [
            'Kulturen',
            suggestion.parent,
            suggestion.type,
            suggestion.id,
          ]
        } else if (!suggestion.parent) {
          newActiveNodeArray = ['Zaehlungen', suggestion.id]
        }
        break
      }
      default: {
        // do nothing
      }
    }
    setVal('')
    store.filter.setShow(false)
    setActiveNodeArray(newActiveNodeArray)
  }, [setActiveNodeArray, setVal, store.filter, suggestion])

  const matches = match(suggestion.name, val)
  const parts = parse(suggestion.name, matches)

  return (
    <MenuItem onClick={onClick}>
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <strong
              key={String(index)}
              style={{ fontWeight: '500 !important' }}
            >
              {part.text}
            </strong>
          ) : (
            <span key={String(index)} style={{ fontWeight: '300 !important' }}>
              {part.text}
            </span>
          )
        })}
      </div>
    </MenuItem>
  )
}
