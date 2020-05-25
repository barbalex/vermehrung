create or replace function zaehlung_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  delete from zaehlung where id = new.zaehlung_id;
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
    winning_revisions as (
      select
        max(leaves._rev) as _rev
      from
        leaves
        join max_depths on leaves._depth = max_depths.max_depth
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
        select _rev from leaves
        where 
          _rev <> zaehlung_rev._rev
          and _rev <> ANY(zaehlung_rev._revisions)
      )) as _conflicts
    from
      zaehlung_rev
      join winning_revisions on zaehlung_rev._rev = winning_revisions._rev;
  return new;
end;
$body$
language plpgsql;

create trigger trigger_zaehlung_rev_set_winning_revision
  after insert on zaehlung_rev
  for each row
  execute procedure zaehlung_rev_set_winning_revision ()