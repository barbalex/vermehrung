create or replace function garten_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
    with leaves as (
    select
      garten_id,
      _rev,
      _depth
    from
      garten_rev
    where
      not exists (
        select
          garten_id
        from
          garten_rev as t
        where
          t.garten_id = new.garten_id
          and t._parent_rev = garten_rev._rev)
        and _deleted = false
        and garten_id = new.garten_id
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
    select * from garten_rev
    join winning_revisions on garten_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
    insert into garten (
      id,
      name,
      person_id,
      strasse,
      plz,
      ort,
      geom_point,
      aktiv,
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
      garten_id,
      _rev,
      _depth
    from
      garten_rev
    where
      not exists (
        select
          garten_id
        from
          garten_rev as t
        where
          t.garten_id = new.garten_id
          and t._parent_rev = garten_rev._rev)
        and _deleted = false
        and garten_id = new.garten_id
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
      garten_rev.garten_id,
      garten_rev.name,
      garten_rev.person_id,
      garten_rev.strasse,
      garten_rev.plz,
      garten_rev.ort,
      garten_rev.geom_point,
      garten_rev.aktiv,
      garten_rev.bemerkungen,
      garten_rev.changed,
      garten_rev.changed_by,
      garten_rev._rev,
      garten_rev._revisions,
      garten_rev._parent_rev,
      garten_rev._depth,
      garten_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> garten_rev._rev
          and _rev <> ANY(garten_rev._revisions)
      )) as _conflicts
    from
      garten_rev
      join winning_revisions on garten_rev._rev = winning_revisions._rev
    on conflict on constraint garten_pkey do update set
      -- do not update the id = pkey
      name = excluded.name,
      person_id = excluded.person_id,
      strasse = excluded.strasse,
      plz = excluded.plz,
      ort = excluded.ort,
      geom_point = excluded.geom_point,
      aktiv = excluded.aktiv,
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
    insert into garten (
        id,
        name,
        person_id,
        strasse,
        plz,
        ort,
        geom_point,
        aktiv,
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
        garten_id,
        _rev,
        _depth
      from
        garten_rev
      where
        not exists (
          select
            garten_id
          from
            garten_rev as t
          where
            t.garten_id = new.garten_id
            and t._parent_rev = garten_rev._rev)
          --and _deleted = false
          and garten_id = new.garten_id
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
        garten_rev.garten_id,
        garten_rev.name,
        garten_rev.person_id,
        garten_rev.strasse,
        garten_rev.plz,
        garten_rev.ort,
        garten_rev.geom_point,
        garten_rev.aktiv,
        garten_rev.bemerkungen,
        garten_rev.changed,
        garten_rev.changed_by,
        garten_rev._rev,
        garten_rev._revisions,
        garten_rev._parent_rev,
        garten_rev._depth,
        garten_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> garten_rev._rev
            and _rev <> ANY(garten_rev._revisions)
        )) as _conflicts
      from
        garten_rev
        join winning_revisions on garten_rev._rev = winning_revisions._rev
      on conflict on constraint garten_pkey do update set
        -- do not update the id = pkey
        name = excluded.name,
        person_id = excluded.person_id,
        strasse = excluded.strasse,
        plz = excluded.plz,
        ort = excluded.ort,
        geom_point = excluded.geom_point,
        aktiv = excluded.aktiv,
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

create trigger trigger_garten_rev_set_winning_revision
  after insert on garten_rev
  for each row
  execute procedure garten_rev_set_winning_revision ()