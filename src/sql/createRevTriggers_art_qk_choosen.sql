create or replace function art_qk_choosen_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
    with leaves as (
    select
      art_qk_choosen_id,
      _rev,
      _depth
    from
      art_qk_choosen_rev
    where
      not exists (
        select
          art_qk_choosen_id
        from
          art_qk_choosen_rev as t
        where
          t.art_qk_choosen_id = new.art_qk_choosen_id
          and t._parent_rev = art_qk_choosen_rev._rev)
        and _deleted = false
        and art_qk_choosen_id = new.art_qk_choosen_id
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
    select * from art_qk_choosen_rev
    join winning_revisions on art_qk_choosen_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
    insert into art_qk_choosen (
      id,
      art_id,
      qk_id,
      choosen,
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
      art_qk_choosen_id,
      _rev,
      _depth,
      _parent_rev
    from
      art_qk_choosen_rev
    where
      not exists (
        select
          art_qk_choosen_id
        from
          art_qk_choosen_rev as t
        where
          t.art_qk_choosen_id = new.art_qk_choosen_id
          and t._parent_rev = art_qk_choosen_rev._rev)
        and _deleted = false
        and art_qk_choosen_id = new.art_qk_choosen_id
    ),
    deleted_conflicts_of_leaves as (
      select
        art_qk_choosen_id,
        _rev,
        _depth
      from
        art_qk_choosen_rev
      where
        not exists (
          select
            art_qk_choosen_id
          from
            art_qk_choosen_rev as t
          where
            t.art_qk_choosen_id = new.art_qk_choosen_id
            and t._parent_rev = art_qk_choosen_rev._rev
        )
        and _deleted is true
        and art_qk_choosen_id = new.art_qk_choosen_id
        and exists (
          select art_qk_choosen_id from leaves l
          where 
            l._parent_rev = art_qk_choosen_rev._parent_rev
            and l._depth = art_qk_choosen_rev._depth
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
      art_qk_choosen_rev.art_qk_choosen_id,
      art_qk_choosen_rev.art_id,
      art_qk_choosen_rev.qk_id,
      art_qk_choosen_rev.choosen,
      art_qk_choosen_rev.changed,
      art_qk_choosen_rev.changed_by,
      art_qk_choosen_rev._rev,
      art_qk_choosen_rev._rev_at,
      art_qk_choosen_rev._revisions,
      art_qk_choosen_rev._parent_rev,
      art_qk_choosen_rev._depth,
      art_qk_choosen_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> art_qk_choosen_rev._rev
          and _rev <> ANY(art_qk_choosen_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      art_qk_choosen_rev
      join winning_revisions on art_qk_choosen_rev._rev = winning_revisions._rev
    on conflict on constraint art_qk_choosen_pkey do update set
      -- do not update the id = pkey
      art_id = excluded.art_id,
      qk_id = excluded.qk_id,
      choosen = excluded.choosen,
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
    insert into art_qk_choosen (
        id,
        art_id,
        qk_id,
        choosen,
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
        art_qk_choosen_id,
        _rev,
        _depth,
        _parent_rev
      from
        art_qk_choosen_rev
      where
        not exists (
          select
            art_qk_choosen_id
          from
            art_qk_choosen_rev as t
          where
            t.art_qk_choosen_id = new.art_qk_choosen_id
            and t._parent_rev = art_qk_choosen_rev._rev
        )
        and _deleted is false
        and art_qk_choosen_id = new.art_qk_choosen_id
      ),
      deleted_conflicts_of_leaves as (
        select
          art_qk_choosen_id,
          _rev,
          _depth
        from
          art_qk_choosen_rev
        where
          not exists (
            select
              art_qk_choosen_id
            from
              art_qk_choosen_rev as t
            where
              t.art_qk_choosen_id = new.art_qk_choosen_id
              and t._parent_rev = art_qk_choosen_rev._rev
          )
          and _deleted is true
          and art_qk_choosen_id = new.art_qk_choosen_id
          and exists (
            select art_qk_choosen_id from leaves l
            where 
              l._parent_rev = art_qk_choosen_rev._parent_rev
              and l._depth = art_qk_choosen_rev._depth
          )
      ),
      leaves_deleted as (
      select
        art_qk_choosen_id,
        _rev,
        _depth
      from
        art_qk_choosen_rev
      where
        not exists (
          select
            art_qk_choosen_id
          from
            art_qk_choosen_rev as t
          where
            t.art_qk_choosen_id = new.art_qk_choosen_id
            and t._parent_rev = art_qk_choosen_rev._rev)
          --and _deleted = false
          and art_qk_choosen_id = new.art_qk_choosen_id
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
        art_qk_choosen_rev.art_qk_choosen_id,
        art_qk_choosen_rev.art_id,
        art_qk_choosen_rev.qk_id,
        art_qk_choosen_rev.choosen,
        art_qk_choosen_rev.changed,
        art_qk_choosen_rev.changed_by,
        art_qk_choosen_rev._rev,
        art_qk_choosen_rev._rev_at,
        art_qk_choosen_rev._revisions,
        art_qk_choosen_rev._parent_rev,
        art_qk_choosen_rev._depth,
        art_qk_choosen_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> art_qk_choosen_rev._rev
            and _rev <> ANY(art_qk_choosen_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
        )) as _conflicts
      from
        art_qk_choosen_rev
        join winning_revisions on art_qk_choosen_rev._rev = winning_revisions._rev
      on conflict on constraint art_qk_choosen_pkey do update set
        -- do not update the id = pkey
        art_id = excluded.art_id,
        qk_id = excluded.qk_id,
        choosen = excluded.choosen,
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

create trigger trigger_art_qk_choosen_rev_set_winning_revision
  after insert on art_qk_choosen_rev
  for each row
  execute procedure art_qk_choosen_rev_set_winning_revision ()

--TODO:
drop function art_qk_choosen_rev_set_winning_revision;
drop trigger trigger_art_qk_choosen_rev_set_winning_revision;