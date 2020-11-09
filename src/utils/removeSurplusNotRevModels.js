// when data is loaded in it's entirety from DB to store
// it is possible that someone else has deleted a model in a table not revisioned
// need to remove these surplus models from store after loading all data
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

const tablesNotRevisioned = [
  'user_role',
  'person_file',
  'art_file',
  'herkunft_file',
  'sammlung_file',
  'garten_file',
  'kultur_file',
  'lieferung_file',
]

const removeSurplusNotRevModels = ({ store, data }) => {
  tablesNotRevisioned.forEach((table) => {
    const models = store[`${table}s`]
    const tableData = data[table]
    if (!models) {
      return store.addNotification({
        message: `Für die Tabelle "${table}" wurde kein passendes Modell "${models}" gefunden`,
        type: 'warning',
      })
    }
    if (!tableData) {
      return store.addNotification({
        message: `Für die Tabelle "${table}" wurde keine passenden Daten gefunden`,
        type: 'warning',
      })
    }
    const deleteAction = store[`delete${upperFirst(camelCase(table))}Model`]
    if (!deleteAction) {
      return store.addNotification({
        message: `Für die Tabelle "${table}" wurde keine passende Lösch-Aktion gefunden`,
        type: 'warning',
      })
    }
    if (models.size > tableData.length) {
      models.forEach((value, key) => {
        if (!tableData.find((r) => r.id === key)) {
          deleteAction(value)
        }
      })
    }
  })
}

export default removeSurplusNotRevModels
