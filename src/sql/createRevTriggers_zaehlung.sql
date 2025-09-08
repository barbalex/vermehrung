create or replace function zaehlung_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
    with leaves as (
      select
        zaehlung_id,
        _rev,
        _depth
      from
        zaehlung_rev
      where
        not exists (
          select
            zaehlung_id
          from
            zaehlung_rev as t
          where
            t.zaehlung_id = new.zaehlung_id
            and t._parent_rev = zaehlung_rev._rev)
          and _deleted = false
          and zaehlung_id = new.zaehlung_id
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
      select * from zaehlung_rev
      join winning_revisions on zaehlung_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
    insert into zaehlung (
      id,
      kultur_id,
      datum,
      bedarf,
      bemerkungen,
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
      zaehlung_id,
      _rev,
      _depth,
      _parent_rev
    from
      zaehlung_rev
    where
      not exists (
        select
          zaehlung_id
        from
          zaehlung_rev as t
        where
          t.zaehlung_id = new.zaehlung_id
          and t._parent_rev = zaehlung_rev._rev)
        and _deleted = false
        and zaehlung_id = new.zaehlung_id
    ),
    deleted_conflicts_of_leaves as (
      select
        zaehlung_id,
        _rev,
        _depth
      from
        zaehlung_rev
      where
        not exists (
          select
            zaehlung_id
          from
            zaehlung_rev as t
          where
            t.zaehlung_id = new.zaehlung_id
            and t._parent_rev = zaehlung_rev._rev
        )
        and _deleted is true
        and zaehlung_id = new.zaehlung_id
        and exists (
          select zaehlung_id from leaves l
          where 
            l._parent_rev = zaehlung_rev._parent_rev
            and l._depth = zaehlung_rev._depth
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
      zaehlung_rev.zaehlung_id,
      zaehlung_rev.kultur_id,
      zaehlung_rev.datum,
      zaehlung_rev.bedarf,
      zaehlung_rev.bemerkungen,
      zaehlung_rev.changed,
      zaehlung_rev.changed_by,
      zaehlung_rev._rev,
      zaehlung_rev._rev_at,
      zaehlung_rev._revisions,
      zaehlung_rev._parent_rev,
      zaehlung_rev._depth,
      zaehlung_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> zaehlung_rev._rev
          and _rev <> ANY(zaehlung_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      zaehlung_rev
      join winning_revisions on zaehlung_rev._rev = winning_revisions._rev
    on conflict on constraint zaehlung_pkey do update set
      -- do not update the id = pkey
      kultur_id = excluded.kultur_id,
      datum = excluded.datum,
      bedarf = excluded.bedarf,
      bemerkungen = excluded.bemerkungen,
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
    insert into zaehlung (
        id,
        kultur_id,
        datum,
        bedarf,
        bemerkungen,
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
        zaehlung_id,
        _rev,
        _depth,
        _parent_rev
      from
        zaehlung_rev
      where
        not exists (
          select
            zaehlung_id
          from
            zaehlung_rev as t
          where
            t.zaehlung_id = new.zaehlung_id
            and t._parent_rev = zaehlung_rev._rev
        )
        and _deleted is false
        and zaehlung_id = new.zaehlung_id
      ),
      deleted_conflicts_of_leaves as (
        select
          zaehlung_id,
          _rev,
          _depth
        from
          zaehlung_rev
        where
          not exists (
            select
              zaehlung_id
            from
              zaehlung_rev as t
            where
              t.zaehlung_id = new.zaehlung_id
              and t._parent_rev = zaehlung_rev._rev
          )
          and _deleted is true
          and zaehlung_id = new.zaehlung_id
          and exists (
            select zaehlung_id from leaves l
            where 
              l._parent_rev = zaehlung_rev._parent_rev
              and l._depth = zaehlung_rev._depth
          )
      ),
      leaves_deleted as (
      select
        zaehlung_id,
        _rev,
        _depth
      from
        zaehlung_rev
      where
        not exists (
          select
            zaehlung_id
          from
            zaehlung_rev as t
          where
            t.zaehlung_id = new.zaehlung_id
            and t._parent_rev = zaehlung_rev._rev)
          --and _deleted = false
          and zaehlung_id = new.zaehlung_id
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
        zaehlung_rev.zaehlung_id,
        zaehlung_rev.kultur_id,
        zaehlung_rev.datum,
        zaehlung_rev.bedarf,
        zaehlung_rev.bemerkungen,
        zaehlung_rev.changed,
        zaehlung_rev.changed_by,
        zaehlung_rev._rev,
        zaehlung_rev._rev_at,
        zaehlung_rev._revisions,
        zaehlung_rev._parent_rev,
        zaehlung_rev._depth,
        zaehlung_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> zaehlung_rev._rev
            and _rev <> ANY(zaehlung_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
        )) as _conflicts
      from
        zaehlung_rev
        join winning_revisions on zaehlung_rev._rev = winning_revisions._rev
      on conflict on constraint zaehlung_pkey do update set
        -- do not update the id = pkey
        kultur_id = excluded.kultur_id,
        datum = excluded.datum,
        bedarf = excluded.bedarf,
        bemerkungen = excluded.bemerkungen,
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

create trigger trigger_zaehlung_rev_set_winning_revision
  after insert on zaehlung_rev
  for each row
  execute procedure zaehlung_rev_set_winning_revision ()