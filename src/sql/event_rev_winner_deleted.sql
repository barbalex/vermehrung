with leaves as (
  select
    event_id,
    _rev,
    _depth
  from
    event_rev
  where
    not exists (
      select
        event_id
      from
        event_rev as t
      where
        t.event_id = event_rev.event_id
        and t._parent_rev = event_rev._rev
    )
    --and _deleted is false
  ),
  max_depths as (
    select
      event_id,
      max(_depth) as max_depth
    from
      leaves
    group by event_id
  ),
  winning_revisions as (
    select
      max(leaves._rev) as _rev
    from
      leaves
      join max_depths on leaves._depth = max_depths.max_depth
        and leaves.event_id = max_depths.event_id
    group by leaves.event_id
  )
  select
    event_rev.*,
    (select array(
      select _rev from leaves
      where 
        _rev <> event_rev._rev
        and _rev <> ANY(event_rev._revisions)
    )) as _conflicts
  from
    event_rev
    join winning_revisions on event_rev._rev = winning_revisions._rev;