import { tableSchema } from '@nozbe/watermelondb'

export const person = tableSchema({
  name: 'person',
  columns: [
    // can not add id here
    { name: 'nr', type: 'string', isOptional: true },
    { name: 'vorname', type: 'string', isOptional: true, isIndexed: true },
    { name: 'name', type: 'string', isOptional: true, isIndexed: true },
    { name: 'adresszusatz', type: 'string', isOptional: true },
    { name: 'strasse', type: 'string', isOptional: true },
    { name: 'plz', type: 'number', isOptional: true },
    { name: 'ort', type: 'string', isOptional: true },
    { name: 'telefon_privat', type: 'string', isOptional: true },
    { name: 'telefon_geschaeft', type: 'string', isOptional: true },
    { name: 'telefon_mobile', type: 'string', isOptional: true },
    { name: 'email', type: 'string', isOptional: true },
    { name: 'kein_email', type: 'boolean', isOptional: true },
    { name: 'bemerkungen', type: 'string', isOptional: true },
    { name: 'changed', type: 'string', isOptional: true },
    { name: 'changed_by', type: 'string', isOptional: true },
    { name: 'account_id', type: 'string', isOptional: true },
    { name: 'user_role_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'kommerziell', type: 'boolean', isOptional: true },
    { name: 'info', type: 'boolean', isOptional: true },
    { name: 'aktiv', type: 'boolean', isOptional: true, isIndexed: true },
    { name: '_rev', type: 'string', isOptional: true },
    { name: '_parent_rev', type: 'string', isOptional: true },
    { name: '_revisions', type: 'string', isOptional: true },
    { name: '_depth', type: 'number', isOptional: true },
    { name: '_deleted', type: 'boolean', isOptional: true, isIndexed: true },
    { name: '_conflicts', type: 'string', isOptional: true },
  ],
})
