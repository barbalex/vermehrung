create function art_rev_leaves(art_id uuid) returns setof art_rev as $$
  select
      *
    from
      art_rev
    where
      -- leaves
      not exists (
        select
          art_id
        from
          art_rev as node
        where
          node.art_id = $1
          and node._parent_rev = art_rev._rev
      )
      -- on undeleted
      and _deleted = false
      -- of this record
      and art_id = $1;
$$ LANGUAGE sql;

--select * from art_rev_leaves('f65dd840-f6aa-11ea-868c-25e28837c601')

create or replace function art_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1.a: check if non deleted winner exists
  --      (if not: choose a deleted one)
  if exists(
    -- find max depth, as only revisions with max depth can win
    with max_depths as (
      select
        max(_depth) as max_depth
      from
        --leaves
        art_rev_leaves(new.art_id)
    ),
    -- the revision with max depth and max rev wins
    winning_revisions as (
      select
        -- this is the couchdb way of ensuring, every db chooses the same winner
        -- thus does not need to communicate with other db instances 
        -- in a master-master replication system
        -- winners could be choosen differently of course,
        -- for instance: last writer wins
        max(leaves._rev) as _rev
      from
        art_rev_leaves(new.art_id) as leaves
        -- only consider revisions with max depth
        join max_depths on leaves._depth = max_depths.max_depth
    )
    select * from art_rev
    join winning_revisions on art_rev._rev = winning_revisions._rev
  ) then
    -- 1.b: we know that a non deleted winner exists
    --      insert or update the winner table
    insert into art (
      id,
      ae_id,
      set,
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
  -- recalculating the winner here 
  -- as I did not know how to re-use the exact same calculation from above :-(
  with 
    -- the deletion itself could be a conflict
    -- so to list conflicts, need to get a list of deleted siblings
    deleted_conflicts_of_leaves as (
      select
        art_id,
        _rev,
        _depth
      from
        art_rev
      where
        -- leaves
        not exists (
          select
            art_id
          from
            art_rev as art_rev_inner
          where
            art_rev_inner.art_id = new.art_id
            and art_rev_inner._parent_rev = art_rev._rev
        )
        -- deleted
        and _deleted is true
        -- of this record
        and art_id = new.art_id
        -- siblings
        and exists (
          select art_id from art_rev_leaves(new.art_id) l
          where 
            l._parent_rev = art_rev._parent_rev
            and l._depth = art_rev._depth
        )
    ),
    -- find max depth, as only revisions with max depth can win
    max_depths as (
      select
        max(_depth) as max_depth
      from
        art_rev_leaves(new.art_id)
    ),
    -- the revision with max depth and max rev wins
    winning_revisions as (
      select
        -- this is the couchdb way of ensuring, every db chooses the same winner
        -- thus does not need to communicate with other db instances 
        -- in a master-master replication system
        -- winners could be choosen differently of course,
        -- for instance: last writer wins
        max(leaves._rev) as _rev
      from
        art_rev_leaves(new.art_id) as leaves
        join max_depths on leaves._depth = max_depths.max_depth
    )
    select
      art_rev.art_id,
      art_rev.ae_id,
      art_rev.set,
      art_rev.changed,
      art_rev.changed_by,
      art_rev._rev,
      art_rev._rev_at,
      art_rev._revisions,
      art_rev._parent_rev,
      art_rev._depth,
      art_rev._deleted,
      (select array(
        select _rev from art_rev_leaves(new.art_id)
        where 
          -- whose data is different from this record
          _rev <> art_rev._rev
          -- and is not an ancester of this record?
          -- to be honest: I am not sure why this condition is here
          and _rev <> ANY(art_rev._revisions)
        -- add deletions, making the deletion itself the conflict
        union select _rev from deleted_conflicts_of_leaves
        -- should I not ensure here too that data is different?
      )) as _conflicts
    from
      art_rev
      join winning_revisions on art_rev._rev = winning_revisions._rev
    -- if the winner record already exists, update it
    on conflict on constraint art_pkey do update set
      -- do not update the id = pkey
      ae_id = excluded.ae_id,
      set = excluded.set,
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
    -- 2. so there is no non deleted winner
    --    choose winner of deleted datasets
    --    this is probably not very important
    --    as the only important part is that
    --    the winning revision gets _deleted = true
    --    so the client can delete the record
    insert into art (
        id,
        ae_id,
        set,
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
    -- again re-calculating the same as I do not know better :-(
    with 
      leaves_deleted as (
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
          --and _deleted = false
          and art_id = new.art_id
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
        art_rev.art_id,
        art_rev.ae_id,
        art_rev.set,
        art_rev.changed,
        art_rev.changed_by,
        art_rev._rev,
        art_rev._rev_at,
        art_rev._revisions,
        art_rev._parent_rev,
        art_rev._depth,
        art_rev._deleted,
        (select array(
          select _rev from art_rev_leaves(new.art_id)
          where 
            _rev <> art_rev._rev
            and _rev <> ANY(art_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
        )) as _conflicts
      from
        art_rev
        join winning_revisions on art_rev._rev = winning_revisions._rev
      on conflict on constraint art_pkey do update set
        -- do not update the id = pkey
        ae_id = excluded.ae_id,
        set = excluded.set,
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

create trigger trigger_art_rev_set_winning_revision
  after insert on art_rev
  for each row
  execute procedure art_rev_set_winning_revision ()