create or replace function sammlung_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
    with leaves as (
    select
      sammlung_id,
      _rev,
      _depth
    from
      sammlung_rev
    where
      not exists (
        select
          sammlung_id
        from
          sammlung_rev as t
        where
          t.sammlung_id = new.sammlung_id
          and t._parent_rev = sammlung_rev._rev)
        and _deleted = false
        and sammlung_id = new.sammlung_id
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
    select * from sammlung_rev
    join winning_revisions on sammlung_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
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
      _deleted,
      _conflicts
  )
  with leaves as (
    select
      sammlung_id,
      _rev,
      _depth,
      _parent_rev
    from
      sammlung_rev
    where
      not exists (
        select
          sammlung_id
        from
          sammlung_rev as t
        where
          t.sammlung_id = new.sammlung_id
          and t._parent_rev = sammlung_rev._rev)
        and _deleted = false
        and sammlung_id = new.sammlung_id
    ),
    deleted_conflicts_of_leaves as (
      select
        sammlung_id,
        _rev,
        _depth
      from
        sammlung_rev
      where
        not exists (
          select
            sammlung_id
          from
            sammlung_rev as t
          where
            t.sammlung_id = new.sammlung_id
            and t._parent_rev = sammlung_rev._rev
        )
        and _deleted is true
        and sammlung_id = new.sammlung_id
        and exists (
          select sammlung_id from leaves l
          where 
            l._parent_rev = sammlung_rev._parent_rev
            and l._depth = sammlung_rev._depth
        )
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
      sammlung_rev.sammlung_id,
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
      sammlung_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> sammlung_rev._rev
          and _rev <> ANY(sammlung_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      sammlung_rev
      join winning_revisions on sammlung_rev._rev = winning_revisions._rev
      on conflict on constraint sammlung_pkey do update set
        -- do not update the id = pkey
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
        _deleted = excluded._deleted,
        _conflicts = excluded._conflicts;
  else
    -- 3. insert winner of deleted datasets
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
        _deleted,
        _conflicts
    )
    with leaves as (
      select
        sammlung_id,
        _rev,
        _depth,
        _parent_rev
      from
        sammlung_rev
      where
        not exists (
          select
            sammlung_id
          from
            sammlung_rev as t
          where
            t.sammlung_id = new.sammlung_id
            and t._parent_rev = sammlung_rev._rev
        )
        and _deleted is false
        and sammlung_id = new.sammlung_id
      ),
      deleted_conflicts_of_leaves as (
        select
          sammlung_id,
          _rev,
          _depth
        from
          sammlung_rev
        where
          not exists (
            select
              sammlung_id
            from
              sammlung_rev as t
            where
              t.sammlung_id = new.sammlung_id
              and t._parent_rev = sammlung_rev._rev
          )
          and _deleted is true
          and sammlung_id = new.sammlung_id
          and exists (
            select sammlung_id from leaves l
            where 
              l._parent_rev = sammlung_rev._parent_rev
              and l._depth = sammlung_rev._depth
          )
      ),
      leaves_deleted as (
      select
        sammlung_id,
        _rev,
        _depth
      from
        sammlung_rev
      where
        not exists (
          select
            sammlung_id
          from
            sammlung_rev as t
          where
            t.sammlung_id = new.sammlung_id
            and t._parent_rev = sammlung_rev._rev)
          --and _deleted = false
          and sammlung_id = new.sammlung_id
      ),
      max_depths as (
        select
          max(_depth) as max_depth
        from
          leaves_deleted
      ),
      winning_revisions as (
        select
          max(leaves_deleted._rev) as _rev
        from
          leaves_deleted
          join max_depths on leaves_deleted._depth = max_depths.max_depth
      )
      select
        sammlung_rev.sammlung_id,
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
        sammlung_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> sammlung_rev._rev
            and _rev <> ANY(sammlung_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
        )) as _conflicts
      from
        sammlung_rev
        join winning_revisions on sammlung_rev._rev = winning_revisions._rev
        on conflict on constraint sammlung_pkey do update set
          -- do not update the id = pkey
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
          _deleted = excluded._deleted,
          _conflicts = excluded._conflicts;
  end if;
  return new;
end;
$body$
language plpgsql;

create trigger trigger_sammlung_rev_set_winning_revision
  after insert on sammlung_rev
  for each row
  execute procedure sammlung_rev_set_winning_revision ()