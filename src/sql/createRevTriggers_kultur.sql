create or replace function kultur_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- if is deletion:
  -- do not search for winner
  -- insert deletion as winner but list conflicts
  if new._deleted = true then
  else
    insert into kultur (
        id,
        art_id,
        herkunft_id,
        garten_id,
        zwischenlager,
        erhaltungskultur,
        von_anzahl_individuen,
        bemerkungen,
        aktiv,
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
        kultur_id,
        _rev,
        _depth
      from
        kultur_rev
      where
        not exists (
          select
            kultur_id
          from
            kultur_rev as t
          where
            t.kultur_id = new.kultur_id
            and t._parent_rev = kultur_rev._rev)
          and _deleted = false
          and kultur_id = new.kultur_id
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
        kultur_rev.kultur_id,
        kultur_rev.art_id,
        kultur_rev.herkunft_id,
        kultur_rev.garten_id,
        kultur_rev.zwischenlager,
        kultur_rev.erhaltungskultur,
        kultur_rev.von_anzahl_individuen,
        kultur_rev.bemerkungen,
        kultur_rev.aktiv,
        kultur_rev.changed,
        kultur_rev.changed_by,
        kultur_rev._rev,
        kultur_rev._revisions,
        kultur_rev._parent_rev,
        kultur_rev._depth,
        (select array(
          select _rev from leaves
          where 
            _rev <> kultur_rev._rev
            and _rev <> ANY(kultur_rev._revisions)
        )) as _conflicts
      from
        kultur_rev
        join winning_revisions on kultur_rev._rev = winning_revisions._rev;
  end if;
  return new;
end;
$body$
language plpgsql;

create trigger trigger_kultur_rev_set_winning_revision
  after insert on kultur_rev
  for each row
  execute procedure kultur_rev_set_winning_revision ()