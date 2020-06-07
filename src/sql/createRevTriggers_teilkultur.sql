create or replace function teilkultur_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
    with leaves as (
      select
        teilkultur_id,
        _rev,
        _depth
      from
        teilkultur_rev
      where
        not exists (
          select
            teilkultur_id
          from
            teilkultur_rev as t
          where
            t.teilkultur_id = new.teilkultur_id
            and t._parent_rev = teilkultur_rev._rev)
          and _deleted = false
          and teilkultur_id = new.teilkultur_id
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
      select * from teilkultur_rev
      join winning_revisions on teilkultur_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
    insert into teilkultur (
      id,
      kultur_id,
      name,
      ort1,
      ort2,
      ort3,
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
      teilkultur_id,
      _rev,
      _depth,
      _parent_rev
    from
      teilkultur_rev
    where
      not exists (
        select
          teilkultur_id
        from
          teilkultur_rev as t
        where
          t.teilkultur_id = new.teilkultur_id
          and t._parent_rev = teilkultur_rev._rev)
        and _deleted = false
        and teilkultur_id = new.teilkultur_id
    ),
    deleted_conflicts_of_leaves as (
      select
        teilkultur_id,
        _rev,
        _depth
      from
        teilkultur_rev
      where
        not exists (
          select
            teilkultur_id
          from
            teilkultur_rev as t
          where
            t.teilkultur_id = new.teilkultur_id
            and t._parent_rev = teilkultur_rev._rev
        )
        and _deleted is true
        and teilkultur_id = new.teilkultur_id
        and exists (
          select teilkultur_id from leaves l
          where 
            l._parent_rev = teilkultur_rev._parent_rev
            and l._depth = teilkultur_rev._depth
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
      teilkultur_rev.teilkultur_id,
      teilkultur_rev.kultur_id,
      teilkultur_rev.name,
      teilkultur_rev.ort1,
      teilkultur_rev.ort2,
      teilkultur_rev.ort3,
      teilkultur_rev.bemerkungen,
      teilkultur_rev.changed,
      teilkultur_rev.changed_by,
      teilkultur_rev._rev,
      teilkultur_rev._revisions,
      teilkultur_rev._parent_rev,
      teilkultur_rev._depth,
      teilkultur_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> teilkultur_rev._rev
          and _rev <> ANY(teilkultur_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      teilkultur_rev
      join winning_revisions on teilkultur_rev._rev = winning_revisions._rev
      on conflict on constraint teilkultur_pkey do update set
        -- do not update the id = pkey
        kultur_id = excluded.kultur_id,
        name = excluded.name,
        ort1 = excluded.ort1,
        ort2 = excluded.ort2,
        ort3 = excluded.ort3,
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
    insert into teilkultur (
        id,
        kultur_id,
        name,
        ort1,
        ort2,
        ort3,
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
        teilkultur_id,
        _rev,
        _depth,
        _parent_rev
      from
        teilkultur_rev
      where
        not exists (
          select
            teilkultur_id
          from
            teilkultur_rev as t
          where
            t.teilkultur_id = new.teilkultur_id
            and t._parent_rev = teilkultur_rev._rev
        )
        and _deleted is false
        and teilkultur_id = new.teilkultur_id
      ),
      deleted_conflicts_of_leaves as (
        select
          teilkultur_id,
          _rev,
          _depth
        from
          teilkultur_rev
        where
          not exists (
            select
              teilkultur_id
            from
              teilkultur_rev as t
            where
              t.teilkultur_id = new.teilkultur_id
              and t._parent_rev = teilkultur_rev._rev
          )
          and _deleted is true
          and teilkultur_id = new.teilkultur_id
          and exists (
            select teilkultur_id from leaves l
            where 
              l._parent_rev = teilkultur_rev._parent_rev
              and l._depth = teilkultur_rev._depth
          )
      ),
      leaves_deleted as (
      select
        teilkultur_id,
        _rev,
        _depth
      from
        teilkultur_rev
      where
        not exists (
          select
            teilkultur_id
          from
            teilkultur_rev as t
          where
            t.teilkultur_id = new.teilkultur_id
            and t._parent_rev = teilkultur_rev._rev)
          --and _deleted = false
          and teilkultur_id = new.teilkultur_id
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
        teilkultur_rev.teilkultur_id,
        teilkultur_rev.kultur_id,
        teilkultur_rev.name,
        teilkultur_rev.ort1,
        teilkultur_rev.ort2,
        teilkultur_rev.ort3,
        teilkultur_rev.bemerkungen,
        teilkultur_rev.changed,
        teilkultur_rev.changed_by,
        teilkultur_rev._rev,
        teilkultur_rev._revisions,
        teilkultur_rev._parent_rev,
        teilkultur_rev._depth,
        teilkultur_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> teilkultur_rev._rev
            and _rev <> ANY(teilkultur_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
        )) as _conflicts
      from
        teilkultur_rev
        join winning_revisions on teilkultur_rev._rev = winning_revisions._rev
        on conflict on constraint teilkultur_pkey do update set
          -- do not update the id = pkey
          kultur_id = excluded.kultur_id,
          name = excluded.name,
          ort1 = excluded.ort1,
          ort2 = excluded.ort2,
          ort3 = excluded.ort3,
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

create trigger trigger_teilkultur_rev_set_winning_revision
  after insert on teilkultur_rev
  for each row
  execute procedure teilkultur_rev_set_winning_revision ()