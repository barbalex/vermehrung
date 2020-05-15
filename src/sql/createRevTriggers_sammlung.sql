create or replace function sammlung_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  insert into sammlung (
      id,
      art_id,
      person_id,
      herkunft_id,
      nr,
      datum,
      von_anzahl_individuen,
      anzahl_pflanzen,
      gramm_samen,
      andere_menge,
      geom_point,
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
      id,
      nr,
      _rev,
      _depth
    from
      sammlung_rev
    where
      not exists (
        select
          id
        from
          sammlung_rev as t
        where
          t.id = new.id
          and t._parent_rev = sammlung_rev._rev)
        and _deleted = false
        and id = new.id
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
        and (
          _rev <> new._rev
          -- ensure nr is unique
          or nr = new.nr
        )
    ),
    winning_revisions as (
      select
        max(leaves._rev) as _rev
      from
        leaves
        join max_depths on leaves._depth = max_depths.max_depth
    )
    select
      sammlung_rev.id,
      sammlung_rev.art_id,
      sammlung_rev.person_id,
      sammlung_rev.herkunft_id,
      sammlung_rev.nr,
      sammlung_rev.datum,
      sammlung_rev.von_anzahl_individuen,
      sammlung_rev.anzahl_pflanzen,
      sammlung_rev.gramm_samen,
      sammlung_rev.andere_menge,
      sammlung_rev.geom_point,
      sammlung_rev.geplant,
      sammlung_rev.bemerkungen,
      sammlung_rev.changed,
      sammlung_rev.changed_by,
      sammlung_rev._rev,
      sammlung_rev._revisions,
      sammlung_rev._parent_rev,
      sammlung_rev._depth,
      (select array(select * from conflicts)) as _conflicts
    from
      sammlung_rev
      join winning_revisions on sammlung_rev._rev = winning_revisions._rev
  on conflict on constraint sammlung_pkey
    do update set
      -- do not update id
      art_id = excluded.art_id,
      person_id = excluded.person_id,
      herkunft_id = excluded.herkunft_id,
      nr = excluded.nr,
      datum = excluded.datum,
      von_anzahl_individuen = excluded.von_anzahl_individuen,
      anzahl_pflanzen = excluded.anzahl_pflanzen,
      gramm_samen = excluded.gramm_samen,
      andere_menge = excluded.andere_menge,
      geom_point = excluded.geom_point,
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

create trigger trigger_sammlung_rev_set_winning_revision
  after insert on sammlung_rev
  for each row
  execute procedure sammlung_rev_set_winning_revision ()