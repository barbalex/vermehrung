import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { FaPlus } from 'react-icons/fa'
import { v1 as uuidv1 } from 'uuid'
import md5 from 'blueimp-md5'

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

const Teilzaehlungen = ({ zaehlungResult }) => {
  const store = useContext(StoreContext)
  const { upsertTeilzaehlung, addQueuedQuery, user } = store
  const {
    activeNodeArray,
    setActiveNodeArray,
    addOpenNodes,
    refetch: refetchTree,
  } = store.tree

  const zaehlung = zaehlungResult?.data?.zaehlung?.[0] ?? {}

  const { data, error, loading } = useQuery((store) =>
    store.queryTeilzaehlung({
      where: { zaehlung_id: { _eq: zaehlung.id } },
      order_by: { teilkultur: { name: 'asc_nulls_first' } },
    }),
  )
  const rows = data?.teilzaehlung ?? []

  const { tk } = zaehlung?.kultur?.kultur_option ?? {}

  const onClickNew = useCallback(() => {
    const id = uuidv1()
    const _rev = `1-${md5(JSON.stringify({ id, _deleted: false }))}`
    const _depth = 1
    const _revisions = `{"${_rev}"}`
    const newObject = {
      id: uuidv1(),
      teilzaehlung_id: id,
      _rev,
      _depth,
      _revisions,
      changed: new window.Date().toISOString(),
      changed_by: user.email,
    }
    addQueuedQuery({
      name: 'mutateInsert_teilzaehlung_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'teilzaehlung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryTeilzaehlung',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: id } },
      }),
    })
    // optimistically update store
    upsertTeilzaehlung(newObject)
    setTimeout(() => {
      // will be unnecessary once tree is converted to mst
      refetchTree()
      // update tree status
      const newActiveNodeArray = [...activeNodeArray, id]
      setActiveNodeArray(newActiveNodeArray)
      addOpenNodes([newActiveNodeArray])
    })
  }, [
    activeNodeArray,
    addOpenNodes,
    addQueuedQuery,
    refetchTree,
    setActiveNodeArray,
    upsertTeilzaehlung,
    user.email,
  ])

  const showNew = rows.length === 0 || tk
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
            {zaehlung.kultur_id && (
              <Settings
                kulturId={zaehlung.kultur_id}
                zaehlungResult={zaehlungResult}
              />
            )}
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
        <TeilzaehlungenRows
          rows={rows}
          zaehlungResult={zaehlungResult}
          kulturId={zaehlung.kultur_id}
        />
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlungen)
