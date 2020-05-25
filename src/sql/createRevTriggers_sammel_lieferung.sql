create or replace function sammel_lieferung_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  delete from sammel_lieferung where id = new.sammel_lieferung_id;
  insert into sammel_lieferung (
      id,
      art_id,
      person_id,
      von_sammlung_id,
      von_kultur_id,
      datum,
      nach_kultur_id,
      nach_ausgepflanzt,
      von_anzahl_individuen,
      anzahl_pflanzen,
      anzahl_auspflanzbereit,
      gramm_samen,
      andere_menge,
      geplant,
      bemerkungen,
      changed,
      changed_by,
      _rev,
      _revisions,
      _parent_rev,
      _depth,
      _conflicts
  )
  with leaves as (
    select
      sammel_lieferung_id,
      _rev,
      _depth
    from
      sammel_lieferung_rev
    where
      not exists (
        select
          sammel_lieferung_id
        from
          sammel_lieferung_rev as t
        where
          t.sammel_lieferung_id = new.sammel_lieferung_id
          and t._parent_rev = sammel_lieferung_rev._rev)
        and _deleted = false
        and sammel_lieferung_id = new.sammel_lieferung_id
    ),
    max_depths as (
      select
        max(_depth) as max_depth
      from
        leaves
    ),
    winning_revisions as (
      select
        max(leaves._rev) as _rev
      from
        leaves
        join max_depths on leaves._depth = max_depths.max_depth
    )
    select
      sammel_lieferung_rev.sammel_lieferung_id,
      sammel_lieferung_rev.art_id,
      sammel_lieferung_rev.person_id,
      sammel_lieferung_rev.von_sammlung_id,
      sammel_lieferung_rev.von_kultur_id,
      sammel_lieferung_rev.datum,
      sammel_lieferung_rev.nach_kultur_id,
      sammel_lieferung_rev.nach_ausgepflanzt,
      sammel_lieferung_rev.von_anzahl_individuen,
      sammel_lieferung_rev.anzahl_pflanzen,
      sammel_lieferung_rev.anzahl_auspflanzbereit,
      sammel_lieferung_rev.gramm_samen,
      sammel_lieferung_rev.andere_menge,
      sammel_lieferung_rev.geplant,
      sammel_lieferung_rev.bemerkungen,
      sammel_lieferung_rev.changed,
      sammel_lieferung_rev.changed_by,
      sammel_lieferung_rev._rev,
      sammel_lieferung_rev._revisions,
      sammel_lieferung_rev._parent_rev,
      sammel_lieferung_rev._depth,
      (select array(
        select _rev from leaves
        where 
          _rev <> sammel_lieferung_rev._rev
          and _rev <> ANY(sammel_lieferung_rev._revisions)
      )) as _conflicts
    from
      sammel_lieferung_rev
      join winning_revisions on sammel_lieferung_rev._rev = winning_revisions._rev;
  return new;
end;
$body$
language plpgsql;

create trigger trigger_sammel_lieferung_rev_set_winning_revision
  after insert on sammel_lieferung_rev
  for each row
  execute procedure sammel_lieferung_rev_set_winning_revision ()