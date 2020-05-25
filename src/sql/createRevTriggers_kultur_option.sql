create or replace function kultur_option_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  delete from kultur_option where id = new.kultur_option_id;
  insert into kultur_option (
      id,
      z_bemerkungen,
      tz_teilkultur_id,
      tz_anzahl_mutterpflanzen,
      tz_andere_menge,
      tz_auspflanzbereit_beschreibung,
      tz_bemerkungen,
      tk,
      tk_bemerkungen,
      ev_teilkultur_id,
      ev_geplant,
      ev_person_id,
      ev_datum,
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
      kultur_option_rev
    where
      not exists (
        select
          kultur_id
        from
          kultur_option_rev as t
        where
          t.kultur_id = new.kultur_id
          and t._parent_rev = kultur_option_rev._rev)
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
      kultur_option_rev.kultur_id,
      kultur_option_rev.z_bemerkungen,
      kultur_option_rev.tz_teilkultur_id,
      kultur_option_rev.tz_anzahl_mutterpflanzen,
      kultur_option_rev.tz_andere_menge,
      kultur_option_rev.tz_auspflanzbereit_beschreibung,
      kultur_option_rev.tz_bemerkungen,
      kultur_option_rev.tk,
      kultur_option_rev.tk_bemerkungen,
      kultur_option_rev.ev_teilkultur_id,
      kultur_option_rev.ev_geplant,
      kultur_option_rev.ev_person_id,
      kultur_option_rev.ev_datum,
      kultur_option_rev._rev,
      kultur_option_rev._revisions,
      kultur_option_rev._parent_rev,
      kultur_option_rev._depth,
      (select array(
        select _rev from leaves
        where 
          _rev <> kultur_option_rev._rev
          and _rev <> ANY(kultur_option_rev._revisions)
      )) as _conflicts
    from
      kultur_option_rev
      join winning_revisions on kultur_option_rev._rev = winning_revisions._rev;
  return new;
end;
$body$
language plpgsql;

create trigger trigger_kultur_option_rev_set_winning_revision
  after insert on kultur_option_rev
  for each row
  execute procedure kultur_option_rev_set_winning_revision ()