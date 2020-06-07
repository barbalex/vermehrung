import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'

import Lieferung from './Lieferung'
import SammelLieferung from '../SammelLieferung'
import { StoreContext, useQuery } from '../../../models/reactUtils'
import FormTitle from '../../shared/FormTitle'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
`
const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
  height: 100%;
`
const StyledSplitPane = styled(SplitPane)`
  height: calc(100vh - 64px) !important;
  .Resizer {
    background: rgba(74, 20, 140, 0.1);
    opacity: 1;
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 7px;
    cursor: col-resize;
  }
  .Resizer:hover {
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    background-color: #fff59d !important;
  }
  .Resizer.disabled {
    cursor: not-allowed;
  }
  .Resizer.disabled:hover {
    border-color: transparent;
  }
  .Pane {
    overflow: hidden;
  }
`

const LieferungContainer = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const { userPersonOption } = store

  const {
    error: lieferungError,
    loading: lieferungLoading,
  } = useQuery((store) => store.queryLieferung({ where: { id: { _eq: id } } }))
  const lieferung = store.lieferungs.get(id) || {}
  const sammelLieferungId =
    lieferung?.sammel_lieferung_id ?? '99999999-9999-9999-9999-999999999999'
  useQuery((store) =>
    store.querySammel_lieferung({ where: { id: { _eq: sammelLieferungId } } }),
  )
  const sammelLieferung = store.sammel_lieferungs.get(sammelLieferungId) || {}

  const { li_show_sl } = userPersonOption

  if (lieferungLoading) {
    return (
      <Container>
        <FormTitle title="Lieferung" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }
  if (lieferungError && !lieferungError.message.includes('Failed to fetch')) {
    return (
      <Container>
        <FormTitle title="Lieferung" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${lieferungError.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (sammelLieferungId && li_show_sl) {
    // this lieferung is part of a sammel_lieferung
    // show that too
    return (
      <StyledSplitPane split="vertical" size="50%" minSize={200}>
        <Lieferung showFilter={showFilter} sammelLieferung={sammelLieferung} />
        <SammelLieferung
          showFilter={showFilter}
          id={sammelLieferungId}
          lieferungId={id}
        />
      </StyledSplitPane>
    )
  }
  return <Lieferung showFilter={showFilter} sammelLieferung={sammelLieferung} />
}

export default observer(LieferungContainer)
