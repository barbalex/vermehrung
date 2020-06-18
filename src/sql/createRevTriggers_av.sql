create or replace function av_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
    with leaves as (
    select
      av_id,
      _rev,
      _depth
    from
      av_rev
    where
      not exists (
        select
          av_id
        from
          av_rev as t
        where
          t.av_id = new.av_id
          and t._parent_rev = av_rev._rev)
        and _deleted = false
        and av_id = new.av_id
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
    select * from av_rev
    join winning_revisions on av_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
    insert into av (
      id,
      art_id,
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
      av_id,
      _rev,
      _depth,
      _parent_rev
    from
      av_rev
    where
      not exists (
        select
          av_id
        from
          av_rev as t
        where
          t.av_id = new.av_id
          and t._parent_rev = av_rev._rev)
        and _deleted = false
        and av_id = new.av_id
    ),
    deleted_conflicts_of_leaves as (
      select
        av_id,
        _rev,
        _depth
      from
        av_rev
      where
        not exists (
          select
            av_id
          from
            av_rev as t
          where
            t.av_id = new.av_id
            and t._parent_rev = av_rev._rev
        )
        and _deleted is true
        and av_id = new.av_id
        and exists (
          select av_id from leaves l
          where 
            l._parent_rev = av_rev._parent_rev
            and l._depth = av_rev._depth
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
      av_rev.av_id,
      av_rev.art_id,
      av_rev.person_id,
      av_rev.changed,
      av_rev.changed_by,
      av_rev._rev,
      av_rev._revisions,
      av_rev._parent_rev,
      av_rev._depth,
      av_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> av_rev._rev
          and _rev <> ANY(av_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      av_rev
      join winning_revisions on av_rev._rev = winning_revisions._rev
    on conflict on constraint av_pkey do update set
      -- do not update the id = pkey
      art_id = excluded.art_id,
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
    insert into av (
        id,
        art_id,
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
        av_id,
        _rev,
        _depth,
        _parent_rev
      from
        av_rev
      where
        not exists (
          select
            av_id
          from
            av_rev as t
          where
            t.av_id = new.av_id
            and t._parent_rev = av_rev._rev
        )
        and _deleted is false
        and av_id = new.av_id
      ),
      deleted_conflicts_of_leaves as (
        select
          av_id,
          _rev,
          _depth
        from
          av_rev
        where
          not exists (
            select
              av_id
            from
              av_rev as t
            where
              t.av_id = new.av_id
              and t._parent_rev = av_rev._rev
          )
          and _deleted is true
          and av_id = new.av_id
          and exists (
            select av_id from leaves l
            where 
              l._parent_rev = av_rev._parent_rev
              and l._depth = av_rev._depth
          )
      ),
      leaves_deleted as (
      select
        av_id,
        _rev,
        _depth
      from
        av_rev
      where
        not exists (
          select
            av_id
          from
            av_rev as t
          where
            t.av_id = new.av_id
            and t._parent_rev = av_rev._rev)
          --and _deleted = false
          and av_id = new.av_id
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
        av_rev.av_id,
        av_rev.art_id,
        av_rev.person_id,
        av_rev.changed,
        av_rev.changed_by,
        av_rev._rev,
        av_rev._revisions,
        av_rev._parent_rev,
        av_rev._depth,
        av_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> av_rev._rev
            and _rev <> ANY(av_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
        )) as _conflicts
      from
        av_rev
        join winning_revisions on av_rev._rev = winning_revisions._rev
      on conflict on constraint av_pkey do update set
        -- do not update the id = pkey
        art_id = excluded.art_id,
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

create trigger trigger_av_rev_set_winning_revision
  after insert on av_rev
  for each row
  execute procedure av_rev_set_winning_revision ()