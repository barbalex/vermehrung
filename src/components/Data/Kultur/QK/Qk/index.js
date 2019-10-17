import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { useQuery } from '@apollo/react-hooks'
import format from 'date-fns/format'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import query from './query'
import createMessageFunctions from './createMessageFunctions'
import getAppBaseUrl from '../../../../../utils/appBaseUrl'

const appBaseUrl = getAppBaseUrl()

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
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  button {
    width: 167px;
  }
`
const StyledButton = styled(Button)`
  margin-bottom: 15px !important;
  margin-top: -5px !important;
  color: ${props =>
    props.loading === 'true'
      ? '#D84315 !important'
      : 'rgb(46, 125, 50) !important'};
  height: 34px !important;
  > span {
    text-transform: none;
  }
`
const StyledFormControl = styled(FormControl)`
  padding-bottom: 19px !important;
  margin-left: 35px !important;
  > div:before {
    border-bottom-color: rgba(0, 0, 0, 0.1) !important;
  }
`

const ApQkQk = ({ kultur, qkNameQueries, qks }) => {
  const [filter, setFilter] = useState('')
  const onChangeFilter = useCallback(event => setFilter(event.target.value), [])

  const year = +format(new Date(), 'yyyy')
  const startYear = `${year}.01.01`
  const startNextYear = `${year + 1}.01.01`
  const { data, error, loading, refetch } = useQuery(query, {
    variables: {
      ...qkNameQueries,
      kulturId: kultur.id,
      startYear,
      startNextYear,
    },
  })
  const messageFunctions = createMessageFunctions({
    data,
    kulturId: kultur.id,
  })
  const messageGroups = qks
    .map(qk => ({
      title: qk.titel,
      messages: messageFunctions[qk.name](),
    }))
    .filter(q => q.messages.length)
  const messageGroupsFiltered = messageGroups.filter(messageGroup => {
    if (!!filter && messageGroup.title && messageGroup.title.toLowerCase) {
      return messageGroup.title.toLowerCase().includes(filter.toLowerCase())
    }
    return true
  })

  if (loading) return 'Lade Daten...'
  if (error) return `Fehler: ${error.message}`
  return (
    <Container>
      <Row>
        <ButtonContainer>
          <Badge
            badgeContent={
              loading
                ? '...'
                : filter
                ? `${messageGroupsFiltered.length}/${messageGroups.length}`
                : messageGroups.length
            }
            color="primary"
          >
            <StyledButton
              onClick={() => refetch()}
              variant="outlined"
              loading={loading.toString()}
            >
              {loading ? 'Die Daten werden analysiert...' : 'neu analysieren'}
            </StyledButton>
          </Badge>
        </ButtonContainer>
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
      </Row>
      {messageGroupsFiltered.map(messageGroup => (
        <StyledPaper key={messageGroup.title} elevation={2}>
          <Title>{messageGroup.title}</Title>
          {messageGroup.messages.map((m, i) => (
            <Row key={`${m.text}Index${i}`}>
              <StyledA
                onClick={() =>
                  typeof window !== 'undefined' &&
                  window.open(`${appBaseUrl}Vermehrung/${m.url.join('/')}`)
                }
                title="in neuem Fenster öffnen"
              >
                {m.text}
              </StyledA>
            </Row>
          ))}
        </StyledPaper>
      ))}
      {!loading && messageGroups.length === 0 && (
        <div>Juhui. Offenbar gibt es nichts zu meckern!</div>
      )}
    </Container>
  )
}

export default observer(ApQkQk)
