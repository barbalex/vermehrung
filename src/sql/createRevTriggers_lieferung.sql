create or replace function lieferung_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
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
    winning_revisions as (
      select
        max(leaves._rev) as _rev
      from
        leaves
        join max_depths on leaves._depth = max_depths.max_depth
    )
    select * from lieferung_rev
    join winning_revisions on lieferung_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
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
      _deleted,
      _conflicts
  )
  with leaves as (
    select
      lieferung_id,
      _rev,
      _depth,
      _parent_rev
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
    deleted_conflicts_of_leaves as (
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
            and t._parent_rev = lieferung_rev._rev
        )
        and _deleted is true
        and lieferung_id = new.lieferung_id
        and exists (
          select lieferung_id from leaves l
          where 
            l._parent_rev = lieferung_rev._parent_rev
            and l._depth = lieferung_rev._depth
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
      lieferung_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> lieferung_rev._rev
          and _rev <> ANY(lieferung_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      lieferung_rev
      join winning_revisions on lieferung_rev._rev = winning_revisions._rev
    on conflict on constraint lieferung_pkey do update set
      -- do not update the id = pkey
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
      _deleted = excluded._deleted,
      _conflicts = excluded._conflicts;
  else
    -- 3. insert winner of deleted datasets
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
      _deleted,
      _conflicts
  )
    with leaves as (
      select
        lieferung_id,
        _rev,
        _depth,
        _parent_rev
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
            and t._parent_rev = lieferung_rev._rev
        )
        and _deleted is false
        and lieferung_id = new.lieferung_id
      ),
      deleted_conflicts_of_leaves as (
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
              and t._parent_rev = lieferung_rev._rev
          )
          and _deleted is true
          and lieferung_id = new.lieferung_id
          and exists (
            select lieferung_id from leaves l
            where 
              l._parent_rev = lieferung_rev._parent_rev
              and l._depth = lieferung_rev._depth
          )
      ),
      leaves_deleted as (
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
        --and _deleted = false
        and lieferung_id = new.lieferung_id
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
      lieferung_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> lieferung_rev._rev
          and _rev <> ANY(lieferung_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      lieferung_rev
      join winning_revisions on lieferung_rev._rev = winning_revisions._rev
    on conflict on constraint lieferung_pkey do update set
      -- do not update the id = pkey
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
      _deleted = excluded._deleted,
      _conflicts = excluded._conflicts;
  end if;
  return new;
end;
$body$
language plpgsql;

create trigger trigger_lieferung_rev_set_winning_revision
  after insert on lieferung_rev
  for each row
  execute procedure lieferung_rev_set_winning_revision ()