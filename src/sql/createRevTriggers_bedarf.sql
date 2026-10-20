create or replace function bedarf_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
    with leaves as (
    select
      bedarf_id,
      _rev,
      _depth
    from
      bedarf_rev
    where
      not exists (
        select
          bedarf_id
        from
          bedarf_rev as t
        where
          t.bedarf_id = new.bedarf_id
          and t._parent_rev = bedarf_rev._rev
      )
      and _deleted is false
      and bedarf_id = new.bedarf_id
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
    select * from bedarf_rev
    join winning_revisions on bedarf_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
    insert into bedarf (
      id,
      kultur_id,
      person_id,
      jahr,
      beschreibung,
      bemerkungen,
      neues_material,
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
      bedarf_id,
      _rev,
      _depth,
      _parent_rev
    from
      bedarf_rev
    where
      not exists (
        select
          bedarf_id
        from
          bedarf_rev as t
        where
          t.bedarf_id = new.bedarf_id
          and t._parent_rev = bedarf_rev._rev
      )
      and _deleted is false
      and bedarf_id = new.bedarf_id
    ),
    deleted_conflicts_of_leaves as (
      select
        bedarf_id,
        _rev,
        _depth
      from
        bedarf_rev
      where
        not exists (
          select
            bedarf_id
          from
            bedarf_rev as t
          where
            t.bedarf_id = new.bedarf_id
            and t._parent_rev = bedarf_rev._rev
        )
        and _deleted is true
        and bedarf_id = new.bedarf_id
        and exists (
          select bedarf_id from leaves l
          where 
            l._parent_rev = bedarf_rev._parent_rev
            and l._depth = bedarf_rev._depth
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
      bedarf_rev.bedarf_id,
      bedarf_rev.kultur_id,
      bedarf_rev.person_id,
      bedarf_rev.jahr,
      bedarf_rev.beschreibung,
      bedarf_rev.bemerkungen,
      bedarf_rev.neues_material,
      bedarf_rev.changed,
      bedarf_rev.changed_by,
      bedarf_rev._rev,
      bedarf_rev._rev_at,
      bedarf_rev._revisions,
      bedarf_rev._parent_rev,
      bedarf_rev._depth,
      bedarf_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> bedarf_rev._rev
          and _rev <> ANY(bedarf_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      bedarf_rev
      join winning_revisions on bedarf_rev._rev = winning_revisions._rev
    on conflict on constraint bedarf_pkey do update set
      -- do not update the id = pkey
      kultur_id = excluded.kultur_id,
      jahr = excluded.jahr,
      person_id = excluded.person_id,
      beschreibung = excluded.beschreibung,
      bemerkungen = excluded.bemerkungen,
      neues_material = excluded.neues_material,
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
    insert into bedarf (
      id,
      kultur_id,
      person_id,
      jahr,
      beschreibung,
      bemerkungen,
      neues_material,
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
        bedarf_id,
        _rev,
        _depth,
        _parent_rev
      from
        bedarf_rev
      where
        not exists (
          select
            bedarf_id
          from
            bedarf_rev as t
          where
            t.bedarf_id = new.bedarf_id
            and t._parent_rev = bedarf_rev._rev
        )
        and _deleted is false
        and bedarf_id = new.bedarf_id
      ),
      deleted_conflicts_of_leaves as (
        select
          bedarf_id,
          _rev,
          _depth
        from
          bedarf_rev
        where
          not exists (
            select
              bedarf_id
            from
              bedarf_rev as t
            where
              t.bedarf_id = new.bedarf_id
              and t._parent_rev = bedarf_rev._rev
          )
          and _deleted is true
          and bedarf_id = new.bedarf_id
          and exists (
            select bedarf_id from leaves l
            where 
              l._parent_rev = bedarf_rev._parent_rev
              and l._depth = bedarf_rev._depth
          )
      ),
      leaves_deleted as (
      select
        bedarf_id,
        _rev,
        _depth
      from
        bedarf_rev
      where
        not exists (
          select
            bedarf_id
          from
            bedarf_rev as t
          where
            t.bedarf_id = new.bedarf_id
            and t._parent_rev = bedarf_rev._rev
        )
        --and _deleted = false
        and bedarf_id = new.bedarf_id
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
      bedarf_rev.bedarf_id,
      bedarf_rev.kultur_id,
      bedarf_rev.person_id,
      bedarf_rev.jahr,
      bedarf_rev.beschreibung,
      bedarf_rev.bemerkungen,
      bedarf_rev.neues_material,
      bedarf_rev.changed,
      bedarf_rev.changed_by,
      bedarf_rev._rev,
      bedarf_rev._rev_at,
      bedarf_rev._revisions,
      bedarf_rev._parent_rev,
      bedarf_rev._depth,
      bedarf_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> bedarf_rev._rev
          and _rev <> ANY(bedarf_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      bedarf_rev
      join winning_revisions_deleted on bedarf_rev._rev = winning_revisions_deleted._rev
    on conflict on constraint bedarf_pkey do update set
      -- do not update the id = pkey
      kultur_id = excluded.kultur_id,
      jahr = excluded.jahr,
      person_id = excluded.person_id,
      beschreibung = excluded.beschreibung,
      bemerkungen = excluded.bemerkungen,
      neues_material = excluded.neues_material,
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

create trigger trigger_bedarf_rev_set_winning_revision
  after insert on bedarf_rev
  for each row
  execute procedure bedarf_rev_set_winning_revision ()