import {
  schemaMigrations,
  addColumns,
} from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        addColumns({
          table: 'person_option',
          columns: [
            { name: 'art_qk_choosen', type: 'string', isOptional: true },
            { name: 'kultur_qk_choosen', type: 'string', isOptional: true },
          ],
        }),
      ],
    },
  ],
})
