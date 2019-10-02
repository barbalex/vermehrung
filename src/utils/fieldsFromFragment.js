import get from 'lodash/get'

export default fragment =>
  get(fragment, 'definitions[0].selectionSet.selections').map(d =>
    get(d, 'name.value'),
  )
