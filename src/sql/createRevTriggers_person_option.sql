create or replace function person_option_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
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
    select * from person_option_rev
    join winning_revisions on person_option_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
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
      ku_zwischenlager,
      ku_erhaltungskultur,
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
      _rev_at,
      _revisions,
      _parent_rev,
      _depth,
      _deleted,
      _conflicts
  )
  with leaves as (
    select
      person_id,
      _rev,
      _depth,
      _parent_rev
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
    deleted_conflicts_of_leaves as (
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
            and t._parent_rev = person_option_rev._rev
        )
        and _deleted is true
        and person_id = new.person_id
        and exists (
          select person_id from leaves l
          where 
            l._parent_rev = person_option_rev._parent_rev
            and l._depth = person_option_rev._depth
        )
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
      person_option_rev.ku_zwischenlager,
      person_option_rev.ku_erhaltungskultur,
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
      person_option_rev._rev_at,
      person_option_rev._revisions,
      person_option_rev._parent_rev,
      person_option_rev._depth,
      person_option_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> person_option_rev._rev
          and _rev <> ANY(person_option_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      person_option_rev
      join winning_revisions on person_option_rev._rev = winning_revisions._rev
    on conflict on constraint person_option_person_id_key do update set
      -- do not update the id = pkey
      ar_name_deutsch = excluded.ar_name_deutsch,
      ga_strasse = excluded.ga_strasse,
      ga_plz = excluded.ga_plz,
      ga_ort = excluded.ga_ort,
      ga_geom_point = excluded.ga_geom_point,
      ga_lat_lng = excluded.ga_lat_lng,
      ga_aktiv = excluded.ga_aktiv,
      ga_bemerkungen = excluded.ga_bemerkungen,
      hk_kanton = excluded.hk_kanton,
      hk_land = excluded.hk_land,
      hk_bemerkungen = excluded.hk_bemerkungen,
      hk_geom_point = excluded.hk_geom_point,
      ku_zwischenlager = excluded.ku_zwischenlager,
      ku_erhaltungskultur = excluded.ku_erhaltungskultur,
      li_show_sl_felder = excluded.li_show_sl_felder,
      li_show_sl = excluded.li_show_sl,
      sl_show_empty_when_next_to_li = excluded.sl_show_empty_when_next_to_li,
      sl_auto_copy_edits = excluded.sl_auto_copy_edits,
      tree_kultur = excluded.tree_kultur,
      tree_teilkultur = excluded.tree_teilkultur,
      tree_zaehlung = excluded.tree_zaehlung,
      tree_lieferung = excluded.tree_lieferung,
      tree_event = excluded.tree_event,
      _rev = excluded._rev,
      _rev_at = excluded._rev_at,
      _revisions = excluded._revisions,
      _parent_rev = excluded._parent_rev,
      _depth = excluded._depth,
      _deleted = excluded._deleted,
      _conflicts = excluded._conflicts;
  else
    -- 3. insert winner of deleted datasets
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
        ku_zwischenlager,
        ku_erhaltungskultur,
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
        _rev_at,
        _revisions,
        _parent_rev,
        _depth,
        _deleted,
        _conflicts
    )
    with leaves as (
      select
        person_id,
        _rev,
        _depth,
        _parent_rev
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
            and t._parent_rev = person_option_rev._rev
        )
        and _deleted is false
        and person_id = new.person_id
      ),
      deleted_conflicts_of_leaves as (
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
              and t._parent_rev = person_option_rev._rev
          )
          and _deleted is true
          and person_id = new.person_id
          and exists (
            select person_id from leaves l
            where 
              l._parent_rev = person_option_rev._parent_rev
              and l._depth = person_option_rev._depth
          )
      ),
      leaves_deleted as (
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
          --and _deleted = false
          and person_id = new.person_id
      ),
      max_depths as (
        select
          max(_depth) as max_depth
        from
          leaves_deleted
      ),
      winning_revisions as (
        select
          max(leaves_deleted._rev) as _rev
        from
          leaves_deleted
          join max_depths on leaves_deleted._depth = max_depths.max_depth
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
        person_option_rev.ku_zwischenlager,
        person_option_rev.ku_erhaltungskultur,
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
        person_option_rev._rev_at,
        person_option_rev._revisions,
        person_option_rev._parent_rev,
        person_option_rev._depth,
        person_option_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> person_option_rev._rev
            and _rev <> ANY(person_option_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
        )) as _conflicts
      from
        person_option_rev
        join winning_revisions on person_option_rev._rev = winning_revisions._rev
      on conflict on constraint person_option_person_id_key do update set
        -- do not update the id = pkey
        ar_name_deutsch = excluded.ar_name_deutsch,
        ga_strasse = excluded.ga_strasse,
        ga_plz = excluded.ga_plz,
        ga_ort = excluded.ga_ort,
        ga_geom_point = excluded.ga_geom_point,
        ga_lat_lng = excluded.ga_lat_lng,
        ga_aktiv = excluded.ga_aktiv,
        ga_bemerkungen = excluded.ga_bemerkungen,
        hk_kanton = excluded.hk_kanton,
        hk_land = excluded.hk_land,
        hk_bemerkungen = excluded.hk_bemerkungen,
        hk_geom_point = excluded.hk_geom_point,
        ku_zwischenlager = excluded.ku_zwischenlager,
        ku_erhaltungskultur = excluded.ku_erhaltungskultur,
        li_show_sl_felder = excluded.li_show_sl_felder,
        li_show_sl = excluded.li_show_sl,
        sl_show_empty_when_next_to_li = excluded.sl_show_empty_when_next_to_li,
        sl_auto_copy_edits = excluded.sl_auto_copy_edits,
        tree_kultur = excluded.tree_kultur,
        tree_teilkultur = excluded.tree_teilkultur,
        tree_zaehlung = excluded.tree_zaehlung,
        tree_lieferung = excluded.tree_lieferung,
        tree_event = excluded.tree_event,
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
$body$
language plpgsql;

create trigger trigger_person_option_rev_set_winning_revision
  after insert on person_option_rev
  for each row
  execute procedure person_option_rev_set_winning_revision ()