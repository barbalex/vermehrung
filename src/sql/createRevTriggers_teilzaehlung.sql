create or replace function teilzaehlung_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  delete from teilzaehlung where id = new.teilzaehlung_id;
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
      (select array(
        select _rev from leaves
        where 
          _rev <> teilzaehlung_rev._rev
          and _rev <> ANY(teilzaehlung_rev._revisions)
      )) as _conflicts
    from
      teilzaehlung_rev
      join winning_revisions on teilzaehlung_rev._rev = winning_revisions._rev;
  return new;
end;
$body$
language plpgsql;

create trigger trigger_teilzaehlung_rev_set_winning_revision
  after insert on teilzaehlung_rev
  for each row
  execute procedure teilzaehlung_rev_set_winning_revision ()