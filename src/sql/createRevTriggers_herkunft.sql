create or replace function herkunft_rev_children(herkunft_id uuid, parent_rev text) returns setof herkunft_rev as $$
  select
    *
  from
    herkunft_rev
  where
    herkunft_rev.herkunft_id = $1
    -- it's parent is the herkunft_rev, thus this is it's child
    and herkunft_rev._parent_rev = $2
$$ LANGUAGE sql;

create or replace function herkunft_rev_leaves(herkunft_id uuid) returns setof herkunft_rev as $$
  select
    *
  from
    herkunft_rev
  where
    -- of this record
    herkunft_id = $1
    -- undeleted
    and _deleted = false
    -- leaves
    and not exists (
      select 1 from herkunft_rev_children($1, herkunft_rev._rev)
    );
$$ LANGUAGE sql;

create or replace function herkunft_rev_leaves_including_deleted(herkunft_id uuid) returns setof herkunft_rev as $$
  select
    *
  from
    herkunft_rev
  where
    -- of this record
    herkunft_id = $1
    -- leaves
    and not exists (
      select 1 from herkunft_rev_children($1, herkunft_rev._rev)
    );
$$ LANGUAGE sql;

create or replace function herkunft_rev_max_depth(herkunft_id uuid) returns int as $$
  select
    max(_depth)
  from
    herkunft_rev_leaves($1);
$$ LANGUAGE sql;

create or replace function herkunft_rev_max_depth_including_deleted(herkunft_id uuid) returns int as $$
  select
    max(_depth)
  from
    herkunft_rev_leaves_including_deleted($1);
$$ LANGUAGE sql;

create or replace function herkunft_rev_winner_rev_value (herkunft_id uuid) returns text as $$
  select
   -- here we choose the winning revision
    max(leaves._rev) as _rev
  from
    herkunft_rev_leaves($1) as leaves
  where 
    herkunft_rev_max_depth($1) = leaves._depth
$$ LANGUAGE sql;

create or replace function herkunft_rev_winner_rev_value_including_deleted (herkunft_id uuid) returns text as $$
  select
   -- here we choose the winning revision
    max(leaves._rev) as _rev
  from
    herkunft_rev_leaves_including_deleted($1) as leaves
  where 
    herkunft_rev_max_depth_including_deleted($1) = leaves._depth
$$ LANGUAGE sql;

create or replace function herkunft_rev_winner (herkunft_id uuid) returns setof herkunft_rev as $$
  select
    *
  from
    herkunft_rev_leaves($1) as leaves
  where 
    leaves._rev = herkunft_rev_winner_rev_value($1)
$$ LANGUAGE sql;

create or replace function herkunft_rev_winner_including_deleted (herkunft_id uuid) returns setof herkunft_rev as $$
  select
    *
  from
    herkunft_rev_leaves_including_deleted($1) as leaves
  where 
    leaves._rev = herkunft_rev_winner_rev_value_including_deleted($1)
$$ LANGUAGE sql;

create or replace function herkunft_conflicts_of_winner(herkunft_id uuid) returns text[] as $$
  select 
    array(
      select _rev from herkunft_rev_leaves($1)
      where 
        _rev <> herkunft_rev._rev
    )
  from herkunft_rev_winner($1) as herkunft_rev
$$ LANGUAGE sql;

create or replace function herkunft_conflicts_of_winner_including_deleted(herkunft_id uuid) returns text[] as $$
  select 
    array(
      select _rev from herkunft_rev_leaves_including_deleted($1)
      where 
        _rev <> herkunft_rev._rev
    )
  from herkunft_rev_winner($1) as herkunft_rev
$$ LANGUAGE sql;

create or replace function herkunft_rev_set_winning_revision() returns trigger as $$
begin
if exists (
  select 1 from herkunft_rev_winner(new.herkunft_id)
)
then
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
    _rev_at,
    _revisions,
    _parent_rev,
    _depth,
    _deleted,
    _conflicts
  )
  select
    winner.herkunft_id,
    winner.nr,
    winner.lokalname,
    winner.gemeinde,
    winner.kanton,
    winner.land,
    winner.geom_point,
    winner.bemerkungen,
    winner.changed,
    winner.changed_by,
    winner._rev,
    winner._rev_at,
    winner._revisions,
    winner._parent_rev,
    winner._depth,
    winner._deleted,
    herkunft_conflicts_of_winner(new.herkunft_id) as _conflicts
  from
    herkunft_rev_winner(new.herkunft_id) as winner
  on conflict on constraint herkunft_pkey do update set
    -- do not update the id = pkey
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
    _rev_at = excluded._rev_at,
    _revisions = excluded._revisions,
    _parent_rev = excluded._parent_rev,
    _depth = excluded._depth,
    _deleted = excluded._deleted,
    _conflicts = excluded._conflicts;
else
    -- 2. so there is no non deleted winner
    --    choose winner of deleted datasets
    --    this is probably not very important
    --    as the only important part is that
    --    the winning revision gets _deleted = true
    --    so the client can delete the record
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
    _rev_at,
    _revisions,
    _parent_rev,
    _depth,
    _deleted,
    _conflicts
  )
  select
    winner.herkunft_id,
    winner.nr,
    winner.lokalname,
    winner.gemeinde,
    winner.kanton,
    winner.land,
    winner.geom_point,
    winner.bemerkungen,
    winner.changed,
    winner.changed_by,
    winner._rev,
    winner._rev_at,
    winner._revisions,
    winner._parent_rev,
    winner._depth,
    winner._deleted,
    herkunft_conflicts_of_winner_including_deleted(new.herkunft_id) as _conflicts
  from
    herkunft_rev_winner_including_deleted(new.herkunft_id) as winner
  on conflict on constraint herkunft_pkey do update set
    -- do not update the id = pkey
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
    _rev_at = excluded._rev_at,
    _revisions = excluded._revisions,
    _parent_rev = excluded._parent_rev,
    _depth = excluded._depth,
    _deleted = excluded._deleted,
    _conflicts = excluded._conflicts;
end if;
  return new;
end;
$$ language plpgsql;

create trigger trigger_herkunft_rev_set_winning_revision
  after insert on herkunft_rev
  for each row
  execute procedure herkunft_rev_set_winning_revision ()