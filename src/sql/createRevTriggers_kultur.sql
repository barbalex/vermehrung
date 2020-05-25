create or replace function kultur_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
if new._deleted = true then
  delete from kultur where id = new.kultur_id;
  return new;
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
        kultur_id,
        _rev,
        _depth
      from
        kultur_rev
      where
        _deleted = false
        and kultur_id = new.kultur_id
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
      kultur_rev.kultur_id as id,
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
        select * from (
          select * from conflicts
          union select * from leaves_conflicting_with_branch
        ) as all_conflicts
        -- prevent ever choosing same rev as conflict
        where all_conflicts._rev <> kultur_rev._rev
      )) as _conflicts
    from
      kultur_rev
      join winning_revisions on kultur_rev._rev = winning_revisions._rev
  on conflict on constraint kultur_pkey
    do update set
      -- do not update id
      art_id = excluded.art_id,
      herkunft_id = excluded.herkunft_id,
      garten_id = excluded.garten_id,
      zwischenlager = excluded.zwischenlager,
      erhaltungskultur = excluded.erhaltungskultur,
      von_anzahl_individuen = excluded.von_anzahl_individuen,
      bemerkungen = excluded.bemerkungen,
      aktiv = excluded.aktiv,
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

create trigger trigger_kultur_rev_set_winning_revision
  after insert on kultur_rev
  for each row
  execute procedure kultur_rev_set_winning_revision ()