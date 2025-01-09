import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'

import { MobxStoreContext } from '../../../../../../mobxStoreContext.js'
import Select from '../../../../../shared/Select/index.jsx'
import Checkbox2States from '../../../../../shared/Checkbox2States.jsx'
import JesNo from '../../../../../shared/JesNo.jsx'
import exists from '../../../../../../utils/exists.js'
import useData from './useData.jsx'
import Add from './Add/index.jsx'

const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const TitleRow = styled.div`
  background-color: ${(props) =>
    props['data-filter'] ? '#ffe0b2' : 'rgba(248, 243, 254, 1)'};
  flex-shrink: 0;
  display: flex;
  height: 40px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  position: sticky;
  top: 0;
  user-select: none;
  z-index: 1;
`
const SelectRow = styled.div`
  display: flex;
  > div {
    flex-grow: 1;
  }
`

const LieferungNach = ({ showFilter, row, saveToDb, ifNeeded, herkunft }) => {
  const store = useContext(MobxStoreContext)
  const { errors, db, filter } = store

  const { nachKulturWerte } = useData({ showFilter, row, herkunft, db, filter })

  return (
    <>
      <TitleRow data-filter={showFilter}>
        <Title>nach</Title>
      </TitleRow>
      {ifNeeded('nach_kultur_id') && (
        <SelectRow>
          <Select
            key={`${row.id}${row.nach_kultur_id}nach_kultur_id`}
            name="nach_kultur_id"
            value={row.nach_kultur_id}
            field="nach_kultur_id"
            label={`Kultur${
              exists(row.art_id)
                ? ` (Kulturen derselben Art und Herkunft${
                    row.von_kultur_id ? ', ohne die von-Kultur' : ''
                  })`
                : ''
            }`}
            options={nachKulturWerte}
            saveToDb={saveToDb}
            error={errors?.lieferung?.nach_kultur_id}
          />
          <Add
            disabled={!(row.art_id && herkunft) || !row.von_sammlung_id}
            herkunft={herkunft}
            lieferung={row}
          />
        </SelectRow>
      )}
      {ifNeeded('nach_ausgepflanzt') && (
        <>
          {showFilter ? (
            <JesNo
              key={`${row.id}nach_ausgepflanzt`}
              label="ausgepflanzt"
              name="nach_ausgepflanzt"
              value={row.nach_ausgepflanzt}
              saveToDb={saveToDb}
              error={errors?.lieferung?.nach_ausgepflanzt}
            />
          ) : (
            <Checkbox2States
              key={`${row.id}nach_ausgepflanzt`}
              label="ausgepflanzt"
              name="nach_ausgepflanzt"
              value={row.nach_ausgepflanzt}
              saveToDb={saveToDb}
              error={errors?.lieferung?.nach_ausgepflanzt}
            />
          )}
        </>
      )}
    </>
  )
}

export default observer(LieferungNach)
