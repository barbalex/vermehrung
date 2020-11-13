import { Model } from '@nozbe/watermelondb'
import { children, field, json, relation } from '@nozbe/watermelondb/decorators'

const sanitizeArray = (rawReactions) =>
  Array.isArray(rawReactions) ? rawReactions.map(String) : []
const sanitizeGeomPoint = (json) => json

export class Herkunft extends Model {
  static table = 'herkunft'
  static associations = {
    sammlung: { type: 'has_many', foreignKey: 'herkunft_id' },
  }

  @field('id') id
  @field('nr') nr
  @field('lokalname') lokalname
  @field('gemeinde') gemeinde
  @field('kanton') kanton
  @field('land') land
  @json('geom_point', sanitizeGeomPoint) geom_point
  @field('wgs84_lat') wgs84_lat
  @field('wgs84_long') wgs84_long
  @field('lv95_x') lv95_x
  @field('lv95_y') lv95_y
  @field('bemerkungen') bemerkungen
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', sanitizeArray) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', sanitizeArray) _conflicts

  @children('sammlung') sammlungs
}

export class Sammlung extends Model {
  static table = 'herkunft'
  static associations = {
    herkunft: { type: 'belongs_to', key: 'herkunft_id' },
  }

  @field('id') id
  @field('art_id') art_id
  @field('person_id') person_id
  @field('herkunft_id') herkunft_id
  @field('nr') nr
  @field('datum') datum
  @field('von_anzahl_individuen') von_anzahl_individuen
  @field('anzahl_pflanzen') anzahl_pflanzen
  @field('gramm_samen') gramm_samen
  @field('andere_menge') andere_menge
  @json('geom_point', sanitizeGeomPoint) geom_point
  @field('wgs84_lat') wgs84_lat
  @field('wgs84_long') wgs84_long
  @field('lv95_x') lv95_x
  @field('lv95_y') lv95_y
  @field('geplant') geplant
  @field('bemerkungen') bemerkungen
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  @json('_revisions', sanitizeArray) _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  @json('_conflicts', sanitizeArray) _conflicts

  @relation('herkunft', 'herkunft_id') herkunft
}
