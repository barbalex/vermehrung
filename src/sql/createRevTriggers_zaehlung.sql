create or replace function zaehlung_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  insert into zaehlung (
      id,
      kultur_id,
      datum,
      prognose,
      bemerkungen,
      changed,
      changed_by,
      _rev,
      _revisions,
      _parent_rev,
      _depth,
      _conflicts
  )
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
    conflicts as (
      select _rev from leaves 
      where 
        _depth = new._depth
        and _rev <> new._rev
    ),
    winning_revisions as (
      select
        max(leaves._rev) as _rev
      from
        leaves
        join max_depths on leaves._depth = max_depths.max_depth
    ),
    branches as (
      select
        zaehlung_id,
        _rev,
        _depth
      from
        zaehlung_rev
      where
        _deleted = false
        and zaehlung_id = new.zaehlung_id
        and _rev <> new._rev
    ),
    leaves_conflicting_with_branch as (
      select _rev from leaves l
      where
        exists (
          select _rev from branches b
          where
            b._depth = l._depth
            and b._rev <> l._rev
            -- exclude all branches above the winning revision? 
            -- see herkunft for more
        )
    )
    select
      zaehlung_rev.zaehlung_id,
      zaehlung_rev.kultur_id,
      zaehlung_rev.datum,
      zaehlung_rev.prognose,
      zaehlung_rev.bemerkungen,
      zaehlung_rev.changed,
      zaehlung_rev.changed_by,
      zaehlung_rev._rev,
      zaehlung_rev._revisions,
      zaehlung_rev._parent_rev,
      zaehlung_rev._depth,
      (select array(
        select * from (
          select * from conflicts
          union select * from leaves_conflicting_with_branch
        ) as all_conflicts
        -- prevent ever choosing same rev as conflict
        where all_conflicts._rev <> zaehlung_rev._rev
      )) as _conflicts
    from
      zaehlung_rev
      join winning_revisions on zaehlung_rev._rev = winning_revisions._rev
  on conflict on constraint zaehlung_pkey
    do update set
      -- do not update id
      kultur_id = excluded.kultur_id,
      datum = excluded.datum,
      prognose = excluded.prognose,
      bemerkungen = excluded.bemerkungen,
      changed = excluded.changed,
      changed_by = excluded.changed_by,
      _rev = excluded._rev,
      _revisions = excluded._revisions,
      _parent_rev = excluded._parent_rev,
      _depth = excluded._depth,
      _conflicts = excluded._conflicts;
  return new;
end;
$body$
language plpgsql;

create trigger trigger_zaehlung_rev_set_winning_revision
  after insert on zaehlung_rev
  for each row
  execute procedure zaehlung_rev_set_winning_revision ()