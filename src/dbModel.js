import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export class Herkunft extends Model {
  static table = 'herkunft'

  @field('id') id
  @field('nr') nr
  @field('lokalname') lokalname
  @field('gemeinde') gemeinde
  @field('kanton') kanton
  @field('land') land
  //@field('geom_point') geom_point
  @field('wgs84_lat') wgs84_lat
  @field('wgs84_long') wgs84_long
  @field('lv95_x') lv95_x
  @field('lv95_y') lv95_y
  @field('bemerkungen') bemerkungen
  @field('changed') changed
  @field('changed_by') changed_by
  @field('_rev') _rev
  @field('_parent_rev') _parent_rev
  //@field('_revisions') _revisions
  @field('_depth') _depth
  @field('_deleted') _deleted
  //@field('_conflicts') _conflicts
}
