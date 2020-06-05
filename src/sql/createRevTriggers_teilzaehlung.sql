create or replace function teilzaehlung_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- if is deletion:
  -- do not search for winner
  -- insert deletion as winner but list conflicts
  if new._deleted is true then
    insert into teilzaehlung (
        id,
        zaehlung_id,
        teilkultur_id,
        anzahl_pflanzen,
        anzahl_auspflanzbereit,
        anzahl_mutterpflanzen,
        andere_menge,
        auspflanzbereit_beschreibung,
        bemerkungen,
        prognose_von_tz,
        changed,
        changed_by,
        _rev,
        _revisions,
        _parent_rev,
        _depth,
        _deleted,
        _conflicts
    )
    with leaves as (
      select
        teilzaehlung_id,
        _rev,
        _depth
      from
        teilzaehlung_rev
      where
        not exists (
          select
            teilzaehlung_id
          from
            teilzaehlung_rev as t
          where
            t.teilzaehlung_id = new.teilzaehlung_id
            and t._parent_rev = teilzaehlung_rev._rev)
          and _deleted = false
          and teilzaehlung_id = new.teilzaehlung_id
      )
      select
        teilzaehlung_rev.teilzaehlung_id,
        teilzaehlung_rev.zaehlung_id,
        teilzaehlung_rev.teilkultur_id,
        teilzaehlung_rev.anzahl_pflanzen,
        teilzaehlung_rev.anzahl_auspflanzbereit,
        teilzaehlung_rev.anzahl_mutterpflanzen,
        teilzaehlung_rev.andere_menge,
        teilzaehlung_rev.auspflanzbereit_beschreibung,
        teilzaehlung_rev.bemerkungen,
        teilzaehlung_rev.prognose_von_tz,
        teilzaehlung_rev.changed,
        teilzaehlung_rev.changed_by,
        teilzaehlung_rev._rev,
        teilzaehlung_rev._revisions,
        teilzaehlung_rev._parent_rev,
        teilzaehlung_rev._depth,
        teilzaehlung_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> teilzaehlung_rev._rev
            and _rev <> ANY(teilzaehlung_rev._revisions)
        )) as _conflicts
      from
        teilzaehlung_rev
        where id = new.id
      on conflict on constraint teilzaehlung_pkey do update set
        -- do not update the id = pkey
        zaehlung_id = excluded.zaehlung_id,
        teilkultur_id = excluded.teilkultur_id,
        anzahl_pflanzen = excluded.anzahl_pflanzen,
        anzahl_auspflanzbereit = excluded.anzahl_auspflanzbereit,
        anzahl_mutterpflanzen = excluded.anzahl_mutterpflanzen,
        andere_menge = excluded.andere_menge,
        auspflanzbereit_beschreibung = excluded.auspflanzbereit_beschreibung,
        bemerkungen = excluded.bemerkungen,
        prognose_von_tz = excluded.prognose_von_tz,
        changed = excluded.changed,
        changed_by = excluded.changed_by,
        _rev = excluded._rev,
        _revisions = excluded._revisions,
        _parent_rev = excluded._parent_rev,
        _depth = excluded._depth,
        _deleted = excluded._deleted,
        _conflicts = excluded._conflicts;
  else
    insert into teilzaehlung (
        id,
        zaehlung_id,
        teilkultur_id,
        anzahl_pflanzen,
        anzahl_auspflanzbereit,
        anzahl_mutterpflanzen,
        andere_menge,
        auspflanzbereit_beschreibung,
        bemerkungen,
        prognose_von_tz,
        changed,
        changed_by,
        _rev,
        _revisions,
        _parent_rev,
        _depth,
        _deleted,
        _conflicts
    )
    with leaves as (
      select
        teilzaehlung_id,
        _rev,
        _depth
      from
        teilzaehlung_rev
      where
        not exists (
          select
            teilzaehlung_id
          from
            teilzaehlung_rev as t
          where
            t.teilzaehlung_id = new.teilzaehlung_id
            and t._parent_rev = teilzaehlung_rev._rev)
          and _deleted = false
          and teilzaehlung_id = new.teilzaehlung_id
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
        teilzaehlung_rev.teilzaehlung_id,
        teilzaehlung_rev.zaehlung_id,
        teilzaehlung_rev.teilkultur_id,
        teilzaehlung_rev.anzahl_pflanzen,
        teilzaehlung_rev.anzahl_auspflanzbereit,
        teilzaehlung_rev.anzahl_mutterpflanzen,
        teilzaehlung_rev.andere_menge,
        teilzaehlung_rev.auspflanzbereit_beschreibung,
        teilzaehlung_rev.bemerkungen,
        teilzaehlung_rev.prognose_von_tz,
        teilzaehlung_rev.changed,
        teilzaehlung_rev.changed_by,
        teilzaehlung_rev._rev,
        teilzaehlung_rev._revisions,
        teilzaehlung_rev._parent_rev,
        teilzaehlung_rev._depth,
        teilzaehlung_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> teilzaehlung_rev._rev
            and _rev <> ANY(teilzaehlung_rev._revisions)
        )) as _conflicts
      from
        teilzaehlung_rev
        join winning_revisions on teilzaehlung_rev._rev = winning_revisions._rev
      on conflict on constraint teilzaehlung_pkey do update set
        -- do not update the id = pkey
        zaehlung_id = excluded.zaehlung_id,
        teilkultur_id = excluded.teilkultur_id,
        anzahl_pflanzen = excluded.anzahl_pflanzen,
        anzahl_auspflanzbereit = excluded.anzahl_auspflanzbereit,
        anzahl_mutterpflanzen = excluded.anzahl_mutterpflanzen,
        andere_menge = excluded.andere_menge,
        auspflanzbereit_beschreibung = excluded.auspflanzbereit_beschreibung,
        bemerkungen = excluded.bemerkungen,
        prognose_von_tz = excluded.prognose_von_tz,
        changed = excluded.changed,
        changed_by = excluded.changed_by,
        _rev = excluded._rev,
        _revisions = excluded._revisions,
        _parent_rev = excluded._parent_rev,
        _depth = excluded._depth,
        _deleted = excluded._deleted,
        _conflicts = excluded._conflicts;
  end if;
  return new;
end;
$body$
language plpgsql;

create trigger trigger_teilzaehlung_rev_set_winning_revision
  after insert on teilzaehlung_rev
  for each row
  execute procedure teilzaehlung_rev_set_winning_revision ()