import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  useContext,
  useRef,
} from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'

import { StoreContext } from '../../../../../models/reactUtils'
import Art from './Art'
import Select from '../../../../shared/Select'
import ErrorBoundary from '../../../../shared/ErrorBoundary'

const TitleRow = styled.div`
  background-color: rgba(237, 230, 244, 1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
  ${(props) => props['data-open'] && 'position: sticky;'}
  ${(props) =>
    props['data-sticky'] &&
    'border-top: 1px solid rgba(0, 0, 0, 0.3);'}
  top: -10px;
  z-index: 1;
  ${(props) => !props['data-open'] && 'margin-bottom: 10px;'}
  &:first-of-type {
    margin-top: -10px;
  }
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const Content = styled.div`
  padding-bottom: 10px;
`
const Avs = styled.div`
  padding-bottom: 8px;
`

const PersonArten = ({ personId }) => {
  const store = useContext(StoreContext)
  const { avsSorted, artsSorted, insertAvRev } = store
  const [open, setOpen] = useState(false)

  const [errors, setErrors] = useState({})
  useEffect(() => setErrors({}), [personId])

  const onClickToggle = useCallback(
    (e) => {
      e.stopPropagation()
      setOpen(!open)
    },
    [open],
  )

  const avs = avsSorted.filter((a) => a.person_id === personId)
  const avArtIds = avs.map((v) => v.art_id)

  const artWerte = useMemo(
    () =>
      artsSorted
        .filter((a) => !avArtIds.includes(a.id))
        .map((el) => ({
          value: el.id,
          label: el?.art_ae_art?.name ?? '(kein Artname)',
        })),
    [artsSorted, avArtIds],
  )

  const saveToDb = useCallback(
    async (event) => {
      insertAvRev({
        values: { person_id: personId, art_id: event.target.value },
      })
      setErrors({})
    },
    [insertAvRev, personId],
  )

  const titleRowRef = useRef(null)
  const [isSticky, setIsSticky] = useState(false)
  const scrollHandler = useCallback(() => {
    const { top } = titleRowRef?.current?.getBoundingClientRect()
    if (top < 112 && !isSticky) return setIsSticky(true)
    if (top > 112 && isSticky) setIsSticky(false)
  }, [isSticky])
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, true)
    return () => {
      window.removeEventListener('scroll', scrollHandler, true)
    }
  }, [scrollHandler])

  return (
    <ErrorBoundary>
      <TitleRow
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        data-open={open}
        ref={titleRowRef}
        data-sticky={isSticky}
      >
        <Title>{`Mitarbeitend bei ${avs.length} Arten`}</Title>
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
        <Content>
          <Avs>
            {avs.map((av) => (
              <Art key={`${av.person_id}/${av.art_id}`} av={av} />
            ))}
          </Avs>
          {!!artWerte.length && (
            <Select
              name="art_id"
              value={''}
              field="art_id"
              label="Art hinzufügen"
              options={artWerte}
              saveToDb={saveToDb}
              isClearable={false}
              error={errors.art_id}
            />
          )}
        </Content>
      )}
    </ErrorBoundary>
  )
}

export default observer(PersonArten)
