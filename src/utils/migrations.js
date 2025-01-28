import {
  schemaMigrations,
  addColumns,
  createTable,
} from '@nozbe/watermelondb/Schema/migrations'

export const migrations = schemaMigrations({
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
    {
      toVersion: 3,
      steps: [
        addColumns({
          table: 'art',
          columns: [
            { name: 'set', type: 'string', isOptional: true, isIndexed: true },
          ],
        }),
      ],
    },
    {
      toVersion: 4,
      steps: [
        addColumns({
          table: 'ae_art',
          columns: [
            {
              name: 'taxonomy',
              type: 'string',
              isOptional: true,
              isIndexed: true,
            },
          ],
        }),
      ],
    },
    {
      toVersion: 5,
      steps: [
        createTable({
          name: 'apflora_av',
          columns: [
            { name: 'ae_id', type: 'string', isIndexed: true },
            { name: 'av', type: 'string' },
          ],
        }),
      ],
    },
    {
      toVersion: 6,
      steps: [
        addColumns({
          table: 'apflora_av',
          columns: [{ name: 'ap', type: 'boolean' }],
        }),
      ],
    },
    {
      toVersion: 7,
      steps: [
        addColumns({
          table: 'art',
          columns: [
            { name: 'av', type: 'string', isOptional: true },
            { name: 'ap', type: 'boolean', isOptional: true },
          ],
        }),
      ],
    },
    {
      toVersion: 8,
      steps: [
        createTable({
          name: 'apflora_ap',
          columns: [
            { name: 'ae_id', type: 'string', isIndexed: true },
            { name: 'ap', type: 'boolean', isOptional: true },
            { name: 'av', type: 'string', isOptional: true },
          ],
        }),
      ],
    },
  ],
})
