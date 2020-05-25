create or replace function art_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
if new._deleted = true then
  delete from art where id = new.art_id and _rev = new._parent_rev;
  return new;
else
  insert into art (
      id,
      ae_id,
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
        art_id,
        _rev,
        _depth
      from
        art_rev
      where
        _deleted = false
        and art_id = new.art_id
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
      art_rev.art_id as id,
      art_rev.ae_id,
      art_rev.changed,
      art_rev.changed_by,
      art_rev._rev,
      art_rev._revisions,
      art_rev._parent_rev,
      art_rev._depth,
      (select array(
        select * from (
          select * from conflicts
          union select * from leaves_conflicting_with_branch
        ) as all_conflicts
        -- prevent ever choosing same rev as conflict
        where all_conflicts._rev <> art_rev._rev
      )) as _conflicts
    from
      art_rev
      join winning_revisions on art_rev._rev = winning_revisions._rev
  on conflict on constraint art_pkey
    do update set
      -- do not update id
      ae_id = excluded.ae_id,
      changed = excluded.changed,
      changed_by = excluded.changed_by,
      _rev = excluded._rev,
      _revisions = excluded._revisions,
      _parent_rev = excluded._parent_rev,
      _depth = excluded._depth,
      _conflicts = excluded._conflicts;
  return new;
END IF;
end
$body$
language plpgsql;

create trigger trigger_art_rev_set_winning_revision
  after insert on art_rev
  for each row
  execute procedure art_rev_set_winning_revision ()