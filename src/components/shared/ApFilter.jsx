import { memo, useCallback, useContext } from 'react'
import styled from '@emotion/styled'
import Switch from '@mui/material/Switch'
import { observer } from 'mobx-react-lite'

import { Label } from './Label.jsx'
import { MobxStoreContext } from '../../mobxStoreContext.js'
import { ErrorBoundary } from './ErrorBoundary.jsx'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 5px;
  min-width: 40px;
  margin-bottom: -14px;
`
const StyledSwitch = styled(Switch)`
  margin-left: -13px;
  margin-top: -15px;
`

export const ApFilter = memo(
  observer(({ color }) => {
    const store = useContext(MobxStoreContext)
    const { apFilter, setApFilter } = store

    const onChange = useCallback(async () => {
      setApFilter(!apFilter)
    }, [apFilter, setApFilter])

    return (
      <ErrorBoundary>
        <Container>
          <Label
            label="nur AP"
            color={color}
          />
          <StyledSwitch
            data-id="ap-filter"
            checked={apFilter}
            onChange={onChange}
            color="primary"
          />
        </Container>
      </ErrorBoundary>
    )
  }),
)
