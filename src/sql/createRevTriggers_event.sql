create or replace function event_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
    with leaves as (
    select
      event_id,
      _rev,
      _depth
    from
      event_rev
    where
      not exists (
        select
          event_id
        from
          event_rev as t
        where
          t.event_id = new.event_id
          and t._parent_rev = event_rev._rev
      )
      and _deleted is false
      and event_id = new.event_id
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
    select * from event_rev
    join winning_revisions on event_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
    insert into event (
      id,
      kultur_id,
      teilkultur_id,
      person_id,
      beschreibung,
      geplant,
      datum,
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
      event_id,
      _rev,
      _depth,
      _parent_rev
    from
      event_rev
    where
      not exists (
        select
          event_id
        from
          event_rev as t
        where
          t.event_id = new.event_id
          and t._parent_rev = event_rev._rev
      )
      and _deleted is false
      and event_id = new.event_id
    ),
    deleted_conflicts_of_leaves as (
      select
        event_id,
        _rev,
        _depth
      from
        event_rev
      where
        not exists (
          select
            event_id
          from
            event_rev as t
          where
            t.event_id = new.event_id
            and t._parent_rev = event_rev._rev
        )
        and _deleted is true
        and event_id = new.event_id
        and exists (
          select event_id from leaves l
          where 
            l._parent_rev = event_rev._parent_rev
            and l._depth = event_rev._depth
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
      event_rev.event_id,
      event_rev.kultur_id,
      event_rev.teilkultur_id,
      event_rev.person_id,
      event_rev.beschreibung,
      event_rev.geplant,
      event_rev.datum,
      event_rev.changed,
      event_rev.changed_by,
      event_rev._rev,
      event_rev._rev_at,
      event_rev._revisions,
      event_rev._parent_rev,
      event_rev._depth,
      event_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> event_rev._rev
          and _rev <> ANY(event_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      event_rev
      join winning_revisions on event_rev._rev = winning_revisions._rev
    on conflict on constraint event_pkey do update set
      -- do not update the id = pkey
      kultur_id = excluded.kultur_id,
      teilkultur_id = excluded.teilkultur_id,
      person_id = excluded.person_id,
      beschreibung = excluded.beschreibung,
      geplant = excluded.geplant,
      datum = excluded.datum,
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
    insert into event (
      id,
      kultur_id,
      teilkultur_id,
      person_id,
      beschreibung,
      geplant,
      datum,
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
        event_id,
        _rev,
        _depth,
        _parent_rev
      from
        event_rev
      where
        not exists (
          select
            event_id
          from
            event_rev as t
          where
            t.event_id = new.event_id
            and t._parent_rev = event_rev._rev
        )
        and _deleted is false
        and event_id = new.event_id
      ),
      deleted_conflicts_of_leaves as (
        select
          event_id,
          _rev,
          _depth
        from
          event_rev
        where
          not exists (
            select
              event_id
            from
              event_rev as t
            where
              t.event_id = new.event_id
              and t._parent_rev = event_rev._rev
          )
          and _deleted is true
          and event_id = new.event_id
          and exists (
            select event_id from leaves l
            where 
              l._parent_rev = event_rev._parent_rev
              and l._depth = event_rev._depth
          )
      ),
      leaves_deleted as (
      select
        event_id,
        _rev,
        _depth
      from
        event_rev
      where
        not exists (
          select
            event_id
          from
            event_rev as t
          where
            t.event_id = new.event_id
            and t._parent_rev = event_rev._rev
        )
        --and _deleted = false
        and event_id = new.event_id
    ),
    max_depths_deleted as (
      select
        max(_depth) as max_depth
      from
        leaves_deleted
    ),
    winning_revisions_deleted as (
      select
        max(leaves_deleted._rev) as _rev
      from
        leaves_deleted
        join max_depths_deleted on leaves_deleted._depth = max_depths_deleted.max_depth
    )
    select
      event_rev.event_id,
      event_rev.kultur_id,
      event_rev.teilkultur_id,
      event_rev.person_id,
      event_rev.beschreibung,
      event_rev.geplant,
      event_rev.datum,
      event_rev.changed,
      event_rev.changed_by,
      event_rev._rev,
      event_rev._rev_at,
      event_rev._revisions,
      event_rev._parent_rev,
      event_rev._depth,
      event_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> event_rev._rev
          and _rev <> ANY(event_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      event_rev
      join winning_revisions_deleted on event_rev._rev = winning_revisions_deleted._rev
    on conflict on constraint event_pkey do update set
      -- do not update the id = pkey
      kultur_id = excluded.kultur_id,
      teilkultur_id = excluded.teilkultur_id,
      person_id = excluded.person_id,
      beschreibung = excluded.beschreibung,
      geplant = excluded.geplant,
      datum = excluded.datum,
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

create trigger trigger_event_rev_set_winning_revision
  after insert on event_rev
  for each row
  execute procedure event_rev_set_winning_revision ()