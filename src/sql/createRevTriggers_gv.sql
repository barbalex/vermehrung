create or replace function gv_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
    with leaves as (
    select
      gv_id,
      _rev,
      _depth
    from
      gv_rev
    where
      not exists (
        select
          gv_id
        from
          gv_rev as t
        where
          t.gv_id = new.gv_id
          and t._parent_rev = gv_rev._rev)
        and _deleted = false
        and gv_id = new.gv_id
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
    select * from gv_rev
    join winning_revisions on gv_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
    insert into gv (
      id,
      garten_id,
      person_id,
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
      gv_id,
      _rev,
      _depth,
      _parent_rev
    from
      gv_rev
    where
      not exists (
        select
          gv_id
        from
          gv_rev as t
        where
          t.gv_id = new.gv_id
          and t._parent_rev = gv_rev._rev)
        and _deleted = false
        and gv_id = new.gv_id
    ),
    deleted_conflicts_of_leaves as (
      select
        gv_id,
        _rev,
        _depth
      from
        gv_rev
      where
        not exists (
          select
            gv_id
          from
            gv_rev as t
          where
            t.gv_id = new.gv_id
            and t._parent_rev = gv_rev._rev
        )
        and _deleted is true
        and gv_id = new.gv_id
        and exists (
          select gv_id from leaves l
          where 
            l._parent_rev = gv_rev._parent_rev
            and l._depth = gv_rev._depth
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
      gv_rev.gv_id,
      gv_rev.garten_id,
      gv_rev.person_id,
      gv_rev.changed,
      gv_rev.changed_by,
      gv_rev._rev,
      gv_rev._revisions,
      gv_rev._parent_rev,
      gv_rev._depth,
      gv_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> gv_rev._rev
          and _rev <> ANY(gv_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      gv_rev
      join winning_revisions on gv_rev._rev = winning_revisions._rev
    on conflict on constraint gv_pkey do update set
      -- do not update the id = pkey
      garten_id = excluded.garten_id,
      person_id = excluded.person_id,
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
    insert into gv (
        id,
        garten_id,
        person_id,
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
        gv_id,
        _rev,
        _depth,
        _parent_rev
      from
        gv_rev
      where
        not exists (
          select
            gv_id
          from
            gv_rev as t
          where
            t.gv_id = new.gv_id
            and t._parent_rev = gv_rev._rev
        )
        and _deleted is false
        and gv_id = new.gv_id
      ),
      deleted_conflicts_of_leaves as (
        select
          gv_id,
          _rev,
          _depth
        from
          gv_rev
        where
          not exists (
            select
              gv_id
            from
              gv_rev as t
            where
              t.gv_id = new.gv_id
              and t._parent_rev = gv_rev._rev
          )
          and _deleted is true
          and gv_id = new.gv_id
          and exists (
            select gv_id from leaves l
            where 
              l._parent_rev = gv_rev._parent_rev
              and l._depth = gv_rev._depth
          )
      ),
      leaves_deleted as (
      select
        gv_id,
        _rev,
        _depth
      from
        gv_rev
      where
        not exists (
          select
            gv_id
          from
            gv_rev as t
          where
            t.gv_id = new.gv_id
            and t._parent_rev = gv_rev._rev)
          --and _deleted = false
          and gv_id = new.gv_id
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
        gv_rev.gv_id,
        gv_rev.garten_id,
        gv_rev.person_id,
        gv_rev.changed,
        gv_rev.changed_by,
        gv_rev._rev,
        gv_rev._revisions,
        gv_rev._parent_rev,
        gv_rev._depth,
        gv_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> gv_rev._rev
            and _rev <> ANY(gv_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
        )) as _conflicts
      from
        gv_rev
        join winning_revisions on gv_rev._rev = winning_revisions._rev
      on conflict on constraint gv_pkey do update set
        -- do not update the id = pkey
        garten_id = excluded.garten_id,
        person_id = excluded.person_id,
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

create trigger trigger_gv_rev_set_winning_revision
  after insert on gv_rev
  for each row
  execute procedure gv_rev_set_winning_revision ()