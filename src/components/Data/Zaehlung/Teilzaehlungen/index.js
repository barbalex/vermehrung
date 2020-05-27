import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { FaPlus } from 'react-icons/fa'

import { useQuery, StoreContext } from '../../../../models/reactUtils'
import TeilzaehlungenRows from './TeilzaehlungenRows'
import Settings from './Settings'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
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
  position: sticky;
  top: -10px;
  z-index: 1;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`

const Teilzaehlungen = ({ zaehlungId }) => {
  const store = useContext(StoreContext)
  const { insertTeilzaehlungRev } = store

  const zaehlung = store.zaehlungs.get(zaehlungId)
  const kulturId = zaehlung.kultur_id

  // load data for teilzaehlungen
  const { error, loading } = useQuery((store) =>
    store.queryTeilzaehlung({
      where: { zaehlung_id: { _eq: zaehlungId } },
      order_by: { teilkultur: { name: 'asc_nulls_first' } },
    }),
  )
  const storeRows = [...store.teilzaehlungs.values()]

  // load data for options
  useQuery((store) =>
    store.queryKultur_option({ where: { id: { _eq: kulturId } } }),
  )
  const kulturOption = store.kultur_options.get(kulturId) ?? {}
  const { tk } = kulturOption

  const onClickNew = useCallback(() => {
    insertTeilzaehlungRev()
  }, [insertTeilzaehlungRev])

  const showNew = storeRows.length === 0 || tk
  const title = tk ? 'Teil-Zählungen' : 'Mengen'

  if (loading) {
    return <Container>Lade...</Container>
  }
  if (error) {
    return (
      <Container>{`Fehler beim Laden der Daten: ${error.message}`}</Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container>
        <TitleRow>
          <Title>{title}</Title>
          <div>
            {kulturId && <Settings kulturId={kulturId} />}
            {showNew && (
              <IconButton
                aria-label="Neu"
                title="Neue Teil-Zählung"
                onClick={onClickNew}
              >
                <FaPlus />
              </IconButton>
            )}
          </div>
        </TitleRow>
        <TeilzaehlungenRows zaehlungId={zaehlungId} kulturId={kulturId} />
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlungen)
