import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import ErrorBoundary from 'react-error-boundary'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'

import Art from './Art'
import query from './query'

const TitleRow = styled.div`
  background-color: rgba(237, 230, 244, 1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  cursor: pointer;
  ${props => props['data-open'] && 'position: sticky;'}
  top: -10px;
  z-index: 1;
  &:first-of-type {
    margin-top: -10px;
  }
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`

const PersonArten = ({ personId }) => {
  const [open, setOpen] = useState(false)

  const onClickToggle = useCallback(
    e => {
      e.stopPropagation()
      setOpen(!open)
    },
    [open],
  )

  const { data, error, loading } = useQuery(query, {
    variables: { personId },
  })
  const anzAvArten = get(data, 'av_art', []).length
  const artenChoosen = get(data, 'art_choosen',[])
  console.log('Arten:', {data,anzAvArten,artenChoosen})

  return (
    <ErrorBoundary>
      <TitleRow
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        data-open={open}
      >
        <Title>{`Arten (${artenChoosen.length})`}</Title>
        <div>
          <IconButton
            aria-label={open ? 'schliessen' : 'öffnen'}
            title={open ? 'schliessen' : 'öffnen'}
            onClick={onClickToggle}
          >
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        </div>
      </TitleRow>
      {open && (
        <>
          {loading ? (
            'Lade Daten...'
          ) : error ? (
            `Fehler: ${error.message}`
          ) : (<>
            {artenChoosen.map((art)=><Art key={art.id} art={art} />)}</>
          )}
        </>
      )}
    </ErrorBoundary>
  )
}

export default observer(PersonArten)
