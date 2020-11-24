create or replace function art_qk_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
    with leaves as (
    select
      art_qk_id,
      _rev,
      _depth
    from
      art_qk_rev
    where
      not exists (
        select
          art_qk_id
        from
          art_qk_rev as t
        where
          t.art_qk_id = new.art_qk_id
          and t._parent_rev = art_qk_rev._rev)
        and _deleted = false
        and art_qk_id = new.art_qk_id
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
    select * from art_qk_rev
    join winning_revisions on art_qk_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
    insert into art_qk (
      id,
      name,
      titel,
      beschreibung,
      sort,
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
      art_qk_id,
      _rev,
      _depth,
      _parent_rev
    from
      art_qk_rev
    where
      not exists (
        select
          art_qk_id
        from
          art_qk_rev as t
        where
          t.art_qk_id = new.art_qk_id
          and t._parent_rev = art_qk_rev._rev)
        and _deleted = false
        and art_qk_id = new.art_qk_id
    ),
    deleted_conflicts_of_leaves as (
      select
        art_qk_id,
        _rev,
        _depth
      from
        art_qk_rev
      where
        not exists (
          select
            art_qk_id
          from
            art_qk_rev as t
          where
            t.art_qk_id = new.art_qk_id
            and t._parent_rev = art_qk_rev._rev
        )
        and _deleted is true
        and art_qk_id = new.art_qk_id
        and exists (
          select art_qk_id from leaves l
          where 
            l._parent_rev = art_qk_rev._parent_rev
            and l._depth = art_qk_rev._depth
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
      art_qk_rev.art_qk_id,
      art_qk_rev.name,
      art_qk_rev.titel,
      art_qk_rev.beschreibung,
      art_qk_rev.sort,
      art_qk_rev.changed,
      art_qk_rev.changed_by,
      art_qk_rev._rev,
      art_qk_rev._rev_at,
      art_qk_rev._revisions,
      art_qk_rev._parent_rev,
      art_qk_rev._depth,
      art_qk_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> art_qk_rev._rev
          and _rev <> ANY(art_qk_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      art_qk_rev
      join winning_revisions on art_qk_rev._rev = winning_revisions._rev
    on conflict on constraint art_qk_pkey do update set
      -- do not update the id = pkey
      name = excluded.name,
      titel = excluded.titel,
      beschreibung = excluded.beschreibung,
      sort = excluded.sort,
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
    insert into art_qk (
        id,
        name,
        titel,
        beschreibung,
        sort,
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
        art_qk_id,
        _rev,
        _depth,
        _parent_rev
      from
        art_qk_rev
      where
        not exists (
          select
            art_qk_id
          from
            art_qk_rev as t
          where
            t.art_qk_id = new.art_qk_id
            and t._parent_rev = art_qk_rev._rev
        )
        and _deleted is false
        and art_qk_id = new.art_qk_id
      ),
      deleted_conflicts_of_leaves as (
        select
          art_qk_id,
          _rev,
          _depth
        from
          art_qk_rev
        where
          not exists (
            select
              art_qk_id
            from
              art_qk_rev as t
            where
              t.art_qk_id = new.art_qk_id
              and t._parent_rev = art_qk_rev._rev
          )
          and _deleted is true
          and art_qk_id = new.art_qk_id
          and exists (
            select art_qk_id from leaves l
            where 
              l._parent_rev = art_qk_rev._parent_rev
              and l._depth = art_qk_rev._depth
          )
      ),
      leaves_deleted as (
      select
        art_qk_id,
        _rev,
        _depth
      from
        art_qk_rev
      where
        not exists (
          select
            art_qk_id
          from
            art_qk_rev as t
          where
            t.art_qk_id = new.art_qk_id
            and t._parent_rev = art_qk_rev._rev)
          --and _deleted = false
          and art_qk_id = new.art_qk_id
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
        art_qk_rev.art_qk_id,
        art_qk_rev.name,
        art_qk_rev.titel,
        art_qk_rev.beschreibung,
        art_qk_rev.sort,
        art_qk_rev.changed,
        art_qk_rev.changed_by,
        art_qk_rev._rev,
        art_qk_rev._rev_at,
        art_qk_rev._revisions,
        art_qk_rev._parent_rev,
        art_qk_rev._depth,
        art_qk_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> art_qk_rev._rev
            and _rev <> ANY(art_qk_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
        )) as _conflicts
      from
        art_qk_rev
        join winning_revisions on art_qk_rev._rev = winning_revisions._rev
      on conflict on constraint art_qk_pkey do update set
        -- do not update the id = pkey
        name = excluded.name,
        titel = excluded.titel,
        beschreibung = excluded.beschreibung,
        sort = excluded.sort,
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

create trigger trigger_art_qk_rev_set_winning_revision
  after insert on art_qk_rev
  for each row
  execute procedure art_qk_rev_set_winning_revision ()