create or replace function teilkultur_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  delete from teilkultur where id = new.teilkultur_id;
  insert into teilkultur (
      id,
      kultur_id,
      name,
      ort1,
      ort2,
      ort3,
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
      teilkultur_id,
      _rev,
      _depth
    from
      teilkultur_rev
    where
      not exists (
        select
          teilkultur_id
        from
          teilkultur_rev as t
        where
          t.teilkultur_id = new.teilkultur_id
          and t._parent_rev = teilkultur_rev._rev)
        and _deleted = false
        and teilkultur_id = new.teilkultur_id
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
      teilkultur_rev.teilkultur_id,
      teilkultur_rev.kultur_id,
      teilkultur_rev.name,
      teilkultur_rev.ort1,
      teilkultur_rev.ort2,
      teilkultur_rev.ort3,
      teilkultur_rev.bemerkungen,
      teilkultur_rev.changed,
      teilkultur_rev.changed_by,
      teilkultur_rev._rev,
      teilkultur_rev._revisions,
      teilkultur_rev._parent_rev,
      teilkultur_rev._depth,
      (select array(
        select _rev from leaves
        where 
          _rev <> teilkultur_rev._rev
          and _rev <> ANY(teilkultur_rev._revisions)
      )) as _conflicts
    from
      teilkultur_rev
      join winning_revisions on teilkultur_rev._rev = winning_revisions._rev;
  return new;
end;
$body$
language plpgsql;

create trigger trigger_teilkultur_rev_set_winning_revision
  after insert on teilkultur_rev
  for each row
  execute procedure teilkultur_rev_set_winning_revision ()