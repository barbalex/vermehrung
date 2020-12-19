import React, { useState, useCallback, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import { StoreContext } from '../../../../../../models/reactUtils'
import createMessageFunctions from './createMessageFunctions'
import getConstants from '../../../../../../utils/constants'

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

const ApQkQk = ({ artId, qkChoosens }) => {
  const store = useContext(StoreContext)
  const { db } = store

  const [filter, setFilter] = useState('')
  const onChangeFilter = useCallback(
    (event) => setFilter(event.target.value),
    [],
  )

  const [messageGroups, setMessageGroups] = useState(null)
  useEffect(() => {
    createMessageFunctions({
      artId,
      db,
    }).then(async (messageFunctions) => {
      const msgGroups = await Promise.all(
        qkChoosens.map(async (qkChoosen) => {
          const qk = await db.get('art_qk').find(qkChoosen.qk_id)

          return {
            title: qk?.titel,
            messages: messageFunctions
              ? await messageFunctions[qk?.name]()
              : [],
          }
        }),
      )
      setMessageGroups(msgGroups.filter((qk) => qk.messages.length))
    })
  }, [artId, db, qkChoosens, store])

  const messageGroupsFiltered = messageGroups
    ? messageGroups.filter((messageGroup) => {
        if (!!filter && messageGroup.title && messageGroup.title.toLowerCase) {
          return messageGroup.title.toLowerCase().includes(filter.toLowerCase())
        }
        return true
      })
    : []

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
      <ResultTitle>
        {messageGroups
          ? `${messageGroupsFiltered.length} ${
              messageGroupsFiltered.length === 1 ? 'Kontrolle' : 'Kontrollen'
            }:`
          : 'rechne...'}
      </ResultTitle>
      {messageGroupsFiltered.map((messageGroup) => (
        <StyledPaper key={messageGroup.title} elevation={2}>
          <Title>{`${messageGroup.title} (${messageGroup.messages.length})`}</Title>
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
      {messageGroups?.length === 0 && (
        <div>Juhui. Offenbar gibt es nichts zu meckern!</div>
      )}
    </Container>
  )
}

export default observer(ApQkQk)
