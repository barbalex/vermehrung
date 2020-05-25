create or replace function art_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  delete from art where id = new.art_id;
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
    winning_revisions as (
      select
        max(leaves._rev) as _rev
      from
        leaves
        join max_depths on leaves._depth = max_depths.max_depth
    )
    select
      art_rev.art_id,
      art_rev.ae_id,
      art_rev.changed,
      art_rev.changed_by,
      art_rev._rev,
      art_rev._revisions,
      art_rev._parent_rev,
      art_rev._depth,
      (select array(
        select _rev from leaves
        where 
          _rev <> art_rev._rev
          and _rev <> ANY(art_rev._revisions)
      )) as _conflicts
    from
      art_rev
      join winning_revisions on art_rev._rev = winning_revisions._rev;
  return new;
end;
$body$
language plpgsql;

create trigger trigger_art_rev_set_winning_revision
  after insert on art_rev
  for each row
  execute procedure art_rev_set_winning_revision ()