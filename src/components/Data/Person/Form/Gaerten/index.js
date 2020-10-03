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
import Garten from './Garten'
import Select from '../../../../shared/Select'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
import gartenLabelFromGarten from '../../../../../utils/gartenLabelFromGarten'

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
    props['data-sticky'] && 'border-top: 1px solid rgba(0, 0, 0, 0.3);'}
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
const Gvs = styled.div`
  padding-bottom: 8px;
`

const PersonArten = ({ personId }) => {
  const store = useContext(StoreContext)
  const { gvsSorted, gartensSorted, insertGvRev } = store
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

  const gvs = gvsSorted.filter((a) => a.person_id === personId)
  const gvArtIds = gvs.map((v) => v.garten_id)

  const gartenWerte = useMemo(
    () =>
      gartensSorted
        .filter((a) => !gvArtIds.includes(a.id))
        .map((el) => ({
          value: el.id,
          label: gartenLabelFromGarten({ garten: el, store }),
        })),
    [gartensSorted, gvArtIds, store],
  )

  const saveToDb = useCallback(
    async (event) => {
      insertGvRev({
        values: { garten_id: event.target.value, person_id: personId },
      })
      setErrors({})
    },
    [insertGvRev, personId],
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
        <Title>{`Mitarbeitend bei ${gvs.length} Gärten`}</Title>
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
          <Gvs>
            {gvs.map((gv) => (
              <Garten key={`${gv.person_id}/${gv.garten_id}`} gv={gv} />
            ))}
          </Gvs>
          {!!gartenWerte.length && (
            <Select
              name="garten_id"
              value={''}
              field="garten_id"
              label="Garten hinzufügen"
              options={gartenWerte}
              saveToDb={saveToDb}
              isClearable={false}
              error={errors.garten_id}
            />
          )}
        </Content>
      )}
    </ErrorBoundary>
  )
}

export default observer(PersonArten)
