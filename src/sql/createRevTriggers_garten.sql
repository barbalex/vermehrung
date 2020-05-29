create or replace function garten_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- if is deletion:
  -- do not search for winner
  -- insert deletion as winner but list conflicts
  if new._deleted = true then
  else
    insert into garten (
        id,
        name,
        person_id,
        strasse,
        plz,
        ort,
        geom_point,
        aktiv,
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
        garten_id,
        _rev,
        _depth
      from
        garten_rev
      where
        not exists (
          select
            garten_id
          from
            garten_rev as t
          where
            t.garten_id = new.garten_id
            and t._parent_rev = garten_rev._rev)
          and _deleted = false
          and garten_id = new.garten_id
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
        garten_rev.garten_id,
        garten_rev.name,
        garten_rev.person_id,
        garten_rev.strasse,
        garten_rev.plz,
        garten_rev.ort,
        garten_rev.geom_point,
        garten_rev.aktiv,
        garten_rev.bemerkungen,
        garten_rev.changed,
        garten_rev.changed_by,
        garten_rev._rev,
        garten_rev._revisions,
        garten_rev._parent_rev,
        garten_rev._depth,
        (select array(
          select _rev from leaves
          where 
            _rev <> garten_rev._rev
            and _rev <> ANY(garten_rev._revisions)
        )) as _conflicts
      from
        garten_rev
        join winning_revisions on garten_rev._rev = winning_revisions._rev;
  end if;
  return new;
end;
$body$
language plpgsql;

create trigger trigger_garten_rev_set_winning_revision
  after insert on garten_rev
  for each row
  execute procedure garten_rev_set_winning_revision ()