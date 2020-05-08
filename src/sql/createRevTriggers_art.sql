create or replace function art_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
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
      id,
      _rev,
      _depth
    from
      art_rev
    where
      not exists (
        select
          id
        from
          art_rev as t
        where
          t.id = new.id
          and t._parent_rev = art_rev._rev)
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
      art_rev.id,
      art_rev.ae_id,
      art_rev.changed,
      art_rev.changed_by,
      art_rev._rev,
      art_rev._revisions,
      art_rev._parent_rev,
      art_rev._depth,
      (select array(select * from conflicts)) as _conflicts
    from
      art_rev
      join winning_revisions on art_rev._rev = winning_revisions._rev
  on conflict on constraint art_pkey
    do update set
      -- do not update id
      id = excluded.id,
      ae_id = excluded.ae_id,
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

create trigger trigger_art_rev_set_winning_revision
  after insert on art_rev
  for each row
  execute procedure art_rev_set_winning_revision ()