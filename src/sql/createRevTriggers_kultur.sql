create or replace function kultur_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
    with leaves as (
    select
      kultur_id,
      _rev,
      _depth
    from
      kultur_rev
    where
      not exists (
        select
          kultur_id
        from
          kultur_rev as t
        where
          t.kultur_id = new.kultur_id
          and t._parent_rev = kultur_rev._rev)
        and _deleted = false
        and kultur_id = new.kultur_id
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
    select * from kultur_rev
    join winning_revisions on kultur_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
    insert into kultur (
      id,
      art_id,
      herkunft_id,
      garten_id,
      zwischenlager,
      erhaltungskultur,
      von_anzahl_individuen,
      bemerkungen,
      aktiv,
      changed,
      changed_by,
      _rev,
      _rev_at,
      _revisions,
      _parent_rev,
      _depth,
      _deleted,
      _conflicts
  )
  with leaves as (
    select
      kultur_id,
      _rev,
      _depth,
      _parent_rev
    from
      kultur_rev
    where
      not exists (
        select
          kultur_id
        from
          kultur_rev as t
        where
          t.kultur_id = new.kultur_id
          and t._parent_rev = kultur_rev._rev)
        and _deleted = false
        and kultur_id = new.kultur_id
    ),
    deleted_conflicts_of_leaves as (
      select
        kultur_id,
        _rev,
        _depth
      from
        kultur_rev
      where
        not exists (
          select
            kultur_id
          from
            kultur_rev as t
          where
            t.kultur_id = new.kultur_id
            and t._parent_rev = kultur_rev._rev
        )
        and _deleted is true
        and kultur_id = new.kultur_id
        and exists (
          select kultur_id from leaves l
          where 
            l._parent_rev = kultur_rev._parent_rev
            and l._depth = kultur_rev._depth
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
      kultur_rev.kultur_id,
      kultur_rev.art_id,
      kultur_rev.herkunft_id,
      kultur_rev.garten_id,
      kultur_rev.zwischenlager,
      kultur_rev.erhaltungskultur,
      kultur_rev.von_anzahl_individuen,
      kultur_rev.bemerkungen,
      kultur_rev.aktiv,
      kultur_rev.changed,
      kultur_rev.changed_by,
      kultur_rev._rev,
      kultur_rev._rev_at,
      kultur_rev._revisions,
      kultur_rev._parent_rev,
      kultur_rev._depth,
      kultur_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> kultur_rev._rev
          and _rev <> ANY(kultur_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      kultur_rev
      join winning_revisions on kultur_rev._rev = winning_revisions._rev
    on conflict on constraint kultur_pkey do update set
      -- do not update the id = pkey
      art_id = excluded.art_id,
      herkunft_id = excluded.herkunft_id,
      garten_id = excluded.garten_id,
      zwischenlager = excluded.zwischenlager,
      erhaltungskultur = excluded.erhaltungskultur,
      von_anzahl_individuen = excluded.von_anzahl_individuen,
      bemerkungen = excluded.bemerkungen,
      aktiv = excluded.aktiv,
      changed = excluded.changed,
      changed_by = excluded.changed_by,
      _rev = excluded._rev,
      _rev_at = excluded._rev_at,
      _revisions = excluded._revisions,
      _parent_rev = excluded._parent_rev,
      _depth = excluded._depth,
      _deleted = excluded._deleted,
      _conflicts = excluded._conflicts;
  else
    -- 3. insert winner of deleted datasets
    insert into kultur (
        id,
        art_id,
        herkunft_id,
        garten_id,
        zwischenlager,
        erhaltungskultur,
        von_anzahl_individuen,
        bemerkungen,
        aktiv,
        changed,
        changed_by,
        _rev,
        _rev_at,
        _revisions,
        _parent_rev,
        _depth,
        _deleted,
        _conflicts
    )
    with leaves as (
      select
        kultur_id,
        _rev,
        _depth,
        _parent_rev
      from
        kultur_rev
      where
        not exists (
          select
            kultur_id
          from
            kultur_rev as t
          where
            t.kultur_id = new.kultur_id
            and t._parent_rev = kultur_rev._rev
        )
        and _deleted is false
        and kultur_id = new.kultur_id
      ),
      deleted_conflicts_of_leaves as (
        select
          kultur_id,
          _rev,
          _depth
        from
          kultur_rev
        where
          not exists (
            select
              kultur_id
            from
              kultur_rev as t
            where
              t.kultur_id = new.kultur_id
              and t._parent_rev = kultur_rev._rev
          )
          and _deleted is true
          and kultur_id = new.kultur_id
          and exists (
            select kultur_id from leaves l
            where 
              l._parent_rev = kultur_rev._parent_rev
              and l._depth = kultur_rev._depth
          )
      ),
      leaves_deleted as (
      select
        kultur_id,
        _rev,
        _depth
      from
        kultur_rev
      where
        not exists (
          select
            kultur_id
          from
            kultur_rev as t
          where
            t.kultur_id = new.kultur_id
            and t._parent_rev = kultur_rev._rev)
          --and _deleted = false
          and kultur_id = new.kultur_id
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
        kultur_rev.kultur_id,
        kultur_rev.art_id,
        kultur_rev.herkunft_id,
        kultur_rev.garten_id,
        kultur_rev.zwischenlager,
        kultur_rev.erhaltungskultur,
        kultur_rev.von_anzahl_individuen,
        kultur_rev.bemerkungen,
        kultur_rev.aktiv,
        kultur_rev.changed,
        kultur_rev.changed_by,
        kultur_rev._rev,
        kultur_rev._rev_at,
        kultur_rev._revisions,
        kultur_rev._parent_rev,
        kultur_rev._depth,
        kultur_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> kultur_rev._rev
            and _rev <> ANY(kultur_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
        )) as _conflicts
      from
        kultur_rev
        join winning_revisions on kultur_rev._rev = winning_revisions._rev
      on conflict on constraint kultur_pkey do update set
        -- do not update the id = pkey
        art_id = excluded.art_id,
        herkunft_id = excluded.herkunft_id,
        garten_id = excluded.garten_id,
        zwischenlager = excluded.zwischenlager,
        erhaltungskultur = excluded.erhaltungskultur,
        von_anzahl_individuen = excluded.von_anzahl_individuen,
        bemerkungen = excluded.bemerkungen,
        aktiv = excluded.aktiv,
        changed = excluded.changed,
        changed_by = excluded.changed_by,
        _rev = excluded._rev,
        _rev_at = excluded._rev_at,
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

create trigger trigger_kultur_rev_set_winning_revision
  after insert on kultur_rev
  for each row
  execute procedure kultur_rev_set_winning_revision ()