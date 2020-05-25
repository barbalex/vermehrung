create or replace function event_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  delete from event where id = new.event_id;
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
    winning_revisions as (
      select
        max(leaves._rev) as _rev
      from
        leaves
        join max_depths on leaves._depth = max_depths.max_depth
    )
    select
      event_rev.event_id,
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
        select _rev from leaves
        where 
          _rev <> event_rev._rev
          and _rev <> ANY(event_rev._revisions)
      )) as _conflicts
    from
      event_rev
      join winning_revisions on event_rev._rev = winning_revisions._rev;
  return new;
end;
$body$
language plpgsql;

create trigger trigger_event_rev_set_winning_revision
  after insert on event_rev
  for each row
  execute procedure event_rev_set_winning_revision ()