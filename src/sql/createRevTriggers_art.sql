create or replace function art_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
    with leaves as (
    select
      art_id,
      _rev,
      _depth
    from
      art_rev
    where
      not exists (
        select
          art_id
        from
          art_rev as t
        where
          t.art_id = new.art_id
          and t._parent_rev = art_rev._rev)
        and _deleted = false
        and art_id = new.art_id
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
    select * from art_rev
    join winning_revisions on art_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
    insert into art (
      id,
      ae_id,
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
      art_id,
      _rev,
      _depth,
      _parent_rev
    from
      art_rev
    where
      not exists (
        select
          art_id
        from
          art_rev as t
        where
          t.art_id = new.art_id
          and t._parent_rev = art_rev._rev)
        and _deleted = false
        and art_id = new.art_id
    ),
    deleted_conflicts_of_leaves as (
      select
        art_id,
        _rev,
        _depth
      from
        art_rev
      where
        not exists (
          select
            art_id
          from
            art_rev as t
          where
            t.art_id = new.art_id
            and t._parent_rev = art_rev._rev
        )
        and _deleted is true
        and art_id = new.art_id
        and exists (
          select art_id from leaves l
          where 
            l._parent_rev = art_rev._parent_rev
            and l._depth = art_rev._depth
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
      art_rev.art_id,
      art_rev.ae_id,
      art_rev.changed,
      art_rev.changed_by,
      art_rev._rev,
      art_rev._revisions,
      art_rev._parent_rev,
      art_rev._depth,
      art_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> art_rev._rev
          and _rev <> ANY(art_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      art_rev
      join winning_revisions on art_rev._rev = winning_revisions._rev
    on conflict on constraint art_pkey do update set
      -- do not update the id = pkey
      ae_id = excluded.ae_id,
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
    insert into art (
        id,
        ae_id,
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
        art_id,
        _rev,
        _depth,
        _parent_rev
      from
        art_rev
      where
        not exists (
          select
            art_id
          from
            art_rev as t
          where
            t.art_id = new.art_id
            and t._parent_rev = art_rev._rev
        )
        and _deleted is false
        and art_id = new.art_id
      ),
      deleted_conflicts_of_leaves as (
        select
          art_id,
          _rev,
          _depth
        from
          art_rev
        where
          not exists (
            select
              art_id
            from
              art_rev as t
            where
              t.art_id = new.art_id
              and t._parent_rev = art_rev._rev
          )
          and _deleted is true
          and art_id = new.art_id
          and exists (
            select art_id from leaves l
            where 
              l._parent_rev = art_rev._parent_rev
              and l._depth = art_rev._depth
          )
      ),
      leaves_deleted as (
      select
        art_id,
        _rev,
        _depth
      from
        art_rev
      where
        not exists (
          select
            art_id
          from
            art_rev as t
          where
            t.art_id = new.art_id
            and t._parent_rev = art_rev._rev)
          --and _deleted = false
          and art_id = new.art_id
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
        art_rev.art_id,
        art_rev.ae_id,
        art_rev.changed,
        art_rev.changed_by,
        art_rev._rev,
        art_rev._revisions,
        art_rev._parent_rev,
        art_rev._depth,
        art_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> art_rev._rev
            and _rev <> ANY(art_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
        )) as _conflicts
      from
        art_rev
        join winning_revisions on art_rev._rev = winning_revisions._rev
      on conflict on constraint art_pkey do update set
        -- do not update the id = pkey
        ae_id = excluded.ae_id,
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

create trigger trigger_art_rev_set_winning_revision
  after insert on art_rev
  for each row
  execute procedure art_rev_set_winning_revision ()