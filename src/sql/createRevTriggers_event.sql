create or replace function event_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
if new._deleted = true then
  delete from event where id = new.event_id;
  return new;
else
  insert into event (
      id,
      kultur_id,
      teilkultur_id,
      person_id,
      beschreibung,
      geplant,
      datum,
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
          t.event_id = new.event_id
          and t._parent_rev = event_rev._rev)
        and _deleted = false
        and event_id = new.event_id
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
        event_id,
        _rev,
        _depth
      from
        event_rev
      where
        _deleted = false
        and event_id = new.event_id
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
      event_rev.event_id as id,
      event_rev.kultur_id,
      event_rev.teilkultur_id,
      event_rev.person_id,
      event_rev.beschreibung,
      event_rev.geplant,
      event_rev.datum,
      event_rev.changed,
      event_rev.changed_by,
      event_rev._rev,
      event_rev._revisions,
      event_rev._parent_rev,
      event_rev._depth,
      (select array(
        select * from (
          select * from conflicts
          union select * from leaves_conflicting_with_branch
        ) as all_conflicts
        -- prevent ever choosing same rev as conflict
        where all_conflicts._rev <> event_rev._rev
      )) as _conflicts
    from
      event_rev
      join winning_revisions on event_rev._rev = winning_revisions._rev
  on conflict on constraint event_pkey
    do update set
      -- do not update id
      kultur_id = excluded.kultur_id,
      teilkultur_id = excluded.teilkultur_id,
      person_id = excluded.person_id,
      beschreibung = excluded.beschreibung,
      geplant = excluded.geplant,
      datum = excluded.datum,
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

create trigger trigger_event_rev_set_winning_revision
  after insert on event_rev
  for each row
  execute procedure event_rev_set_winning_revision ()