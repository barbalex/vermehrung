create or replace function herkunft_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
    with leaves as (
    select
      herkunft_id,
      _rev,
      _depth
    from
      herkunft_rev
    where
      not exists (
        select
          herkunft_id
        from
          herkunft_rev as t
        where
          t.herkunft_id = new.herkunft_id
          and t._parent_rev = herkunft_rev._rev
      )
      and _deleted = false
      and herkunft_id = new.herkunft_id
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
    select * from herkunft_rev
    join winning_revisions on herkunft_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
    insert into herkunft (
      id,
      nr,
      lokalname,
      gemeinde,
      kanton,
      land,
      geom_point,
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
      herkunft_id,
      _rev,
      _depth,
      _parent_rev
    from
      herkunft_rev
    where
      not exists (
        select
          herkunft_id
        from
          herkunft_rev as t
        where
          t.herkunft_id = new.herkunft_id
          and t._parent_rev = herkunft_rev._rev
      )
      and _deleted = false
      and herkunft_id = new.herkunft_id
    ),
    deleted_conflicts_of_leaves as (
      select
        herkunft_id,
        _rev,
        _depth
      from
        herkunft_rev
      where
        not exists (
          select
            herkunft_id
          from
            herkunft_rev as t
          where
            t.herkunft_id = new.herkunft_id
            and t._parent_rev = herkunft_rev._rev
        )
        and _deleted is true
        and herkunft_id = new.herkunft_id
        and exists (
          select herkunft_id from leaves l
          where 
            l._parent_rev = herkunft_rev._parent_rev
            and l._depth = herkunft_rev._depth
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
      herkunft_rev.herkunft_id,
      herkunft_rev.nr,
      herkunft_rev.lokalname,
      herkunft_rev.gemeinde,
      herkunft_rev.kanton,
      herkunft_rev.land,
      herkunft_rev.geom_point,
      herkunft_rev.bemerkungen,
      herkunft_rev.changed,
      herkunft_rev.changed_by,
      herkunft_rev._rev,
      herkunft_rev._revisions,
      herkunft_rev._parent_rev,
      herkunft_rev._depth,
      herkunft_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> herkunft_rev._rev
          and _rev <> ANY(herkunft_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      herkunft_rev
      join winning_revisions on herkunft_rev._rev = winning_revisions._rev
    on conflict on constraint herkunft_pkey do update set
      -- do not update the id = pkey
      nr = excluded.nr,
      lokalname = excluded.lokalname,
      gemeinde = excluded.gemeinde,
      kanton = excluded.kanton,
      land = excluded.land,
      geom_point = excluded.geom_point,
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
    insert into herkunft (
        id,
        nr,
        lokalname,
        gemeinde,
        kanton,
        land,
        geom_point,
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
        herkunft_id,
        _rev,
        _depth,
        _parent_rev
      from
        herkunft_rev
      where
        not exists (
          select
            herkunft_id
          from
            herkunft_rev as t
          where
            t.herkunft_id = new.herkunft_id
            and t._parent_rev = herkunft_rev._rev
        )
        and _deleted is false
        and herkunft_id = new.herkunft_id
      ),
      deleted_conflicts_of_leaves as (
        select
          herkunft_id,
          _rev,
          _depth
        from
          herkunft_rev
        where
          not exists (
            select
              herkunft_id
            from
              herkunft_rev as t
            where
              t.herkunft_id = new.herkunft_id
              and t._parent_rev = herkunft_rev._rev
          )
          and _deleted is true
          and herkunft_id = new.herkunft_id
          and exists (
            select herkunft_id from leaves l
            where 
              l._parent_rev = herkunft_rev._parent_rev
              and l._depth = herkunft_rev._depth
          )
      ),
      leaves_deleted as (
      select
        herkunft_id,
        _rev,
        _depth
      from
        herkunft_rev
      where
        not exists (
          select
            herkunft_id
          from
            herkunft_rev as t
          where
            t.herkunft_id = new.herkunft_id
            and t._parent_rev = herkunft_rev._rev
        )
        --and _deleted = false
        and herkunft_id = new.herkunft_id
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
        herkunft_rev.herkunft_id,
        herkunft_rev.nr,
        herkunft_rev.lokalname,
        herkunft_rev.gemeinde,
        herkunft_rev.kanton,
        herkunft_rev.land,
        herkunft_rev.geom_point,
        herkunft_rev.bemerkungen,
        herkunft_rev.changed,
        herkunft_rev.changed_by,
        herkunft_rev._rev,
        herkunft_rev._revisions,
        herkunft_rev._parent_rev,
        herkunft_rev._depth,
        herkunft_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> herkunft_rev._rev
            and _rev <> ANY(herkunft_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
        )) as _conflicts
      from
        herkunft_rev
        join winning_revisions on herkunft_rev._rev = winning_revisions._rev
      on conflict on constraint herkunft_pkey do update set
        -- do not update the id = pkey
        nr = excluded.nr,
        lokalname = excluded.lokalname,
        gemeinde = excluded.gemeinde,
        kanton = excluded.kanton,
        land = excluded.land,
        geom_point = excluded.geom_point,
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

create trigger trigger_herkunft_rev_set_winning_revision
  after insert on herkunft_rev
  for each row
  execute procedure herkunft_rev_set_winning_revision ()