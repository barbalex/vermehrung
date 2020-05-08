create or replace function teilkultur_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
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
      id,
      _rev,
      _depth
    from
      teilkultur_rev
    where
      not exists (
        select
          id
        from
          teilkultur_rev as t
        where
          t.id = new.id
          and t._parent_rev = teilkultur_rev._rev)
        and _deleted = false
        and id = new.id
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
    )
    select
      teilkultur_rev.id,
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
      (select array(select * from conflicts)) as _conflicts
    from
      teilkultur_rev
      join winning_revisions on teilkultur_rev._rev = winning_revisions._rev
  on conflict on constraint teilkultur_pkey
    do update set
      -- do not update id
      kultur_id = excluded.kultur_id,
      name = excluded.name,
      ort1 = excluded.ort1,
      ort2 = excluded.ort2,
      ort3 = excluded.ort3,
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

create trigger trigger_teilkultur_rev_set_winning_revision
  after insert on teilkultur_rev
  for each row
  execute procedure teilkultur_rev_set_winning_revision ()