create or replace function person_option_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- if is deletion:
  -- do not search for winner
  -- insert deletion as winner but list conflicts
  if new._deleted = true then
  else
    insert into person_option (
        id,
        ar_name_deutsch,
        ga_strasse,
        ga_plz,
        ga_ort,
        ga_geom_point,
        ga_lat_lng,
        ga_aktiv,
        ga_bemerkungen,
        hk_kanton,
        hk_land,
        hk_bemerkungen,
        hk_geom_point,
        li_show_sl_felder,
        li_show_sl,
        sl_show_empty_when_next_to_li,
        sl_auto_copy_edits,
        tree_kultur,
        tree_teilkultur,
        tree_zaehlung,
        tree_lieferung,
        tree_event,
        _rev,
        _revisions,
        _parent_rev,
        _depth,
        _conflicts
    )
    with leaves as (
      select
        person_id,
        _rev,
        _depth
      from
        person_option_rev
      where
        not exists (
          select
            person_id
          from
            person_option_rev as t
          where
            t.person_id = new.person_id
            and t._parent_rev = person_option_rev._rev)
          and _deleted = false
          and person_id = new.person_id
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
        person_option_rev.person_id,
        person_option_rev.ar_name_deutsch,
        person_option_rev.ga_strasse,
        person_option_rev.ga_plz,
        person_option_rev.ga_ort,
        person_option_rev.ga_geom_point,
        person_option_rev.ga_lat_lng,
        person_option_rev.ga_aktiv,
        person_option_rev.ga_bemerkungen,
        person_option_rev.hk_kanton,
        person_option_rev.hk_land,
        person_option_rev.hk_bemerkungen,
        person_option_rev.hk_geom_point,
        person_option_rev.li_show_sl_felder,
        person_option_rev.li_show_sl,
        person_option_rev.sl_show_empty_when_next_to_li,
        person_option_rev.sl_auto_copy_edits,
        person_option_rev.tree_kultur,
        person_option_rev.tree_teilkultur,
        person_option_rev.tree_zaehlung,
        person_option_rev.tree_lieferung,
        person_option_rev.tree_event,
        person_option_rev._rev,
        person_option_rev._revisions,
        person_option_rev._parent_rev,
        person_option_rev._depth,
        (select array(
          select _rev from leaves
          where 
            _rev <> person_option_rev._rev
            and _rev <> ANY(person_option_rev._revisions)
        )) as _conflicts
      from
        person_option_rev
        join winning_revisions on person_option_rev._rev = winning_revisions._rev;
  end if;
  return new;
end;
$body$
language plpgsql;

create trigger trigger_person_option_rev_set_winning_revision
  after insert on person_option_rev
  for each row
  execute procedure person_option_rev_set_winning_revision ()