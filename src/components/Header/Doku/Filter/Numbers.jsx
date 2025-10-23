import styled from '@emotion/styled'

const OuterContainer = styled.div`
  padding: 0 2px 0 8px;
  display: flex;
  justify-content: center;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.7em;
  font-weight: 400;
  justify-content: center;
  cursor: default;
  user-select: none;
  color: white;
`
const Filtered = styled.div`
  text-align: center;
`
const Total = styled.div`
  border-top: 1px solid white;
  text-align: center;
`
export const FilterNumbers = ({ filteredCount, totalCount }) => (
  <OuterContainer>
    <Container>
      <Filtered title="gefilterte Anzahl">{filteredCount}</Filtered>
      <Total title="totale Anzahl">{totalCount}</Total>
    </Container>
  </OuterContainer>
)
