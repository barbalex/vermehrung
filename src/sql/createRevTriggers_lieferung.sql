create or replace function lieferung_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  insert into lieferung (
      id,
      sammel_lieferung_id,
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
      lieferung_id,
      _rev,
      _depth
    from
      lieferung_rev
    where
      not exists (
        select
          lieferung_id
        from
          lieferung_rev as t
        where
          t.lieferung_id = new.lieferung_id
          and t._parent_rev = lieferung_rev._rev)
        and _deleted = false
        and lieferung_id = new.lieferung_id
    ),
    max_depths as (
      select
        max(_depth) as max_depth
      from
        leaves
    ),
    conflicts as (
      select _rev from leaves 
      where 
        _depth = new._depth
        and _rev <> new._rev
    ),
    winning_revisions as (
      select
        max(leaves._rev) as _rev
      from
        leaves
        join max_depths on leaves._depth = max_depths.max_depth
    )
    select
      lieferung_rev.lieferung_id,
      lieferung_rev.sammel_lieferung_id,
      lieferung_rev.art_id,
      lieferung_rev.person_id,
      lieferung_rev.von_sammlung_id,
      lieferung_rev.von_kultur_id,
      lieferung_rev.datum,
      lieferung_rev.nach_kultur_id,
      lieferung_rev.nach_ausgepflanzt,
      lieferung_rev.von_anzahl_individuen,
      lieferung_rev.anzahl_pflanzen,
      lieferung_rev.anzahl_auspflanzbereit,
      lieferung_rev.gramm_samen,
      lieferung_rev.andere_menge,
      lieferung_rev.geplant,
      lieferung_rev.bemerkungen,
      lieferung_rev.changed,
      lieferung_rev.changed_by,
      lieferung_rev._rev,
      lieferung_rev._revisions,
      lieferung_rev._parent_rev,
      lieferung_rev._depth,
      (select array(select * from conflicts)) as _conflicts
    from
      lieferung_rev
      join winning_revisions on lieferung_rev._rev = winning_revisions._rev
  on conflict on constraint lieferung_pkey
    do update set
      -- do not update id
      sammel_lieferung_id = excluded.sammel_lieferung_id,
      art_id = excluded.art_id,
      person_id = excluded.person_id,
      von_sammlung_id = excluded.von_sammlung_id,
      von_kultur_id = excluded.von_kultur_id,
      datum = excluded.datum,
      nach_kultur_id = excluded.nach_kultur_id,
      nach_ausgepflanzt = excluded.nach_ausgepflanzt,
      von_anzahl_individuen = excluded.von_anzahl_individuen,
      anzahl_pflanzen = excluded.anzahl_pflanzen,
      anzahl_auspflanzbereit = excluded.anzahl_auspflanzbereit,
      gramm_samen = excluded.gramm_samen,
      andere_menge = excluded.andere_menge,
      geplant = excluded.geplant,
      bemerkungen = excluded.bemerkungen,
      changed = excluded.changed,
      changed_by = excluded.changed_by,
      _rev = excluded._rev,
      _revisions = excluded._revisions,
      _parent_rev = excluded._parent_rev,
      _depth = excluded._depth,
      _conflicts = excluded._conflicts;
  return new;
end;
$body$
language plpgsql;

create trigger trigger_lieferung_rev_set_winning_revision
  after insert on lieferung_rev
  for each row
  execute procedure lieferung_rev_set_winning_revision ()