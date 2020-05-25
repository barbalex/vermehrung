create or replace function herkunft_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
if new._deleted = true then
  delete from herkunft where id = new.id
else
  insert into herkunft (
      id,
      nr,
      lokalname,
      gemeinde,
      kanton,
      land,
      geom_point,
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
      herkunft_id,
      _rev,
      _depth
    from
      herkunft_rev
    where
      not exists (
        select
          herkunft_id
        from
          herkunft_rev as t
        where
          t.herkunft_id = new.herkunft_id
          and t._parent_rev = herkunft_rev._rev
      )
      and _deleted = false
      and herkunft_id = new.herkunft_id
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
        herkunft_id,
        _rev,
        _depth
      from
        herkunft_rev
      where
        _deleted = false
        and herkunft_id = new.herkunft_id
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
            -- never got this to work
            --and b._rev <> ANY (
            --  select _revisions from herkunft_rev
            --  inner join winning_revisions on herkunft_rev._rev = winning_revisions._rev
            --)
        )
    )
    select
      herkunft_rev.herkunft_id as id,
      herkunft_rev.nr,
      herkunft_rev.lokalname,
      herkunft_rev.gemeinde,
      herkunft_rev.kanton,
      herkunft_rev.land,
      herkunft_rev.geom_point,
      herkunft_rev.bemerkungen,
      herkunft_rev.changed,
      herkunft_rev.changed_by,
      herkunft_rev._rev,
      herkunft_rev._revisions,
      herkunft_rev._parent_rev,
      herkunft_rev._depth,
      (select array(
        select * from (
          select * from conflicts
          union select * from leaves_conflicting_with_branch
        ) as all_conflicts
        -- prevent ever choosing same rev as conflict
        where all_conflicts._rev <> herkunft_rev._rev
      )) as _conflicts
    from
      herkunft_rev
      join winning_revisions on herkunft_rev._rev = winning_revisions._rev
  on conflict on constraint herkunft_pkey
    do update set
      -- do not update id
      nr = excluded.nr,
      lokalname = excluded.lokalname,
      gemeinde = excluded.gemeinde,
      kanton = excluded.kanton,
      land = excluded.land,
      geom_point = excluded.geom_point,
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

create trigger trigger_herkunft_rev_set_winning_revision
  after insert on herkunft_rev
  for each row
  execute procedure herkunft_rev_set_winning_revision ()