import React, { useState, useCallback, useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import createMessageFunctions from './createMessageFunctions'
import getConstants from '../../../../../../utils/constants'
import { StoreContext } from '../../../../../../models/reactUtils'

const constants = getConstants()

const Container = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
`
const StyledPaper = styled(Paper)`
  padding: 10px;
  margin-bottom: 12px !important;
  background-color: transparent !important;
`
const Title = styled.div`
  font-weight: bold;
`
const StyledA = styled.p`
  color: inherit;
  font-weight: normal;
  font-size: 12px;
  text-decoration-line: underline;
  cursor: pointer;
  margin-bottom: 0;
  padding: 2px 0;
`
const Row = styled.div`
  display: flex;
`
const ResultTitle = styled.div`
  padding-left: 10px;
  margin-bottom: 7px;
`
const StyledFormControl = styled(FormControl)`
  padding-bottom: 10px !important;
  > div:before {
    border-bottom-color: rgba(0, 0, 0, 0.1) !important;
  }
`

const KulturQkQk = ({ kultur, qks }) => {
  const store = useContext(StoreContext)
  const [filter, setFilter] = useState('')
  const onChangeFilter = useCallback(
    (event) => setFilter(event.target.value),
    [],
  )

  const messageFunctions = createMessageFunctions({
    kulturId: kultur.id,
    store,
  })
  const messageGroups = qks
    .map((qk) => ({
      title: qk?.kultur_qk?.titel,
      messages: messageFunctions[qk?.kultur_qk?.name](),
    }))
    .filter((q) => q.messages.length)
  const messageGroupsFiltered = messageGroups.filter((messageGroup) => {
    if (!!filter && messageGroup.title && messageGroup.title.toLowerCase) {
      return messageGroup.title.toLowerCase().includes(filter.toLowerCase())
    }
    return true
  })

  return (
    <Container>
      <StyledFormControl fullWidth>
        <InputLabel htmlFor="filter" shrink>
          nach Abschnitts-Titel filtern
        </InputLabel>
        <Input
          id="filter"
          value={filter}
          onChange={onChangeFilter}
          spellCheck={false}
        />
      </StyledFormControl>
      <ResultTitle>{`${messageGroupsFiltered.length} ${
        messageGroupsFiltered.length === 1 ? 'Kontrolle' : 'Kontrollen'
      }:`}</ResultTitle>
      {messageGroupsFiltered.map((messageGroup) => (
        <StyledPaper key={messageGroup.title} elevation={2}>
          <Title>{`${messageGroup.messages.length} ${messageGroup.title}`}</Title>
          {messageGroup.messages.map((m, i) => (
            <Row key={`${m.text}Index${i}`}>
              <StyledA
                onClick={() =>
                  typeof window !== 'undefined' &&
                  window.open(
                    `${constants?.appUri}/Vermehrung/${m.url.join('/')}`,
                  )
                }
                title="in neuem Fenster öffnen"
              >
                {m.text}
              </StyledA>
            </Row>
          ))}
        </StyledPaper>
      ))}
      {messageGroups.length === 0 && (
        <div>Juhui. Offenbar gibt es nichts zu meckern!</div>
      )}
    </Container>
  )
}

export default observer(KulturQkQk)