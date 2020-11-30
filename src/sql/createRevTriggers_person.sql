create or replace function person_rev_set_winning_revision ()
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
      person_rev
    where
      not exists (
        select
          person_id
        from
          person_rev as t
        where
          t.person_id = new.person_id
          and t._parent_rev = person_rev._rev)
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
    select * from person_rev
    join winning_revisions on person_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
    insert into person (
      id,
      nr,
      vorname,
      name,
      adresszusatz,
      strasse,
      plz,
      ort,
      telefon_privat,
      telefon_geschaeft,
      telefon_mobile,
      email,
      kein_email,
      bemerkungen,
      changed,
      changed_by,
      account_id,
      user_role_id,
      kommerziell,
      info,
      aktiv,
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
      person_rev
    where
      not exists (
        select
          person_id
        from
          person_rev as t
        where
          t.person_id = new.person_id
          and t._parent_rev = person_rev._rev)
        and _deleted = false
        and person_id = new.person_id
    ),
    deleted_conflicts_of_leaves as (
      select
        person_id,
        _rev,
        _depth
      from
        person_rev
      where
        not exists (
          select
            person_id
          from
            person_rev as t
          where
            t.person_id = new.person_id
            and t._parent_rev = person_rev._rev
        )
        and _deleted is true
        and person_id = new.person_id
        and exists (
          select person_id from leaves l
          where 
            l._parent_rev = person_rev._parent_rev
            and l._depth = person_rev._depth
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
      person_rev.person_id,
      person_rev.nr,
      person_rev.vorname,
      person_rev.name,
      person_rev.adresszusatz,
      person_rev.strasse,
      person_rev.plz,
      person_rev.ort,
      person_rev.telefon_privat,
      person_rev.telefon_geschaeft,
      person_rev.telefon_mobile,
      person_rev.email,
      person_rev.kein_email,
      person_rev.bemerkungen,
      person_rev.changed,
      person_rev.changed_by,
      person_rev.account_id,
      person_rev.user_role_id,
      person_rev.kommerziell,
      person_rev.info,
      person_rev.aktiv,
      person_rev._rev,
      person_rev._rev_at,
      person_rev._revisions,
      person_rev._parent_rev,
      person_rev._depth,
      person_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> person_rev._rev
          and _rev <> ANY(person_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      person_rev
      join winning_revisions on person_rev._rev = winning_revisions._rev
    on conflict on constraint person_pkey do update set
      -- do not update the id = pkey
      nr = excluded.nr,
      vorname = excluded.vorname,
      name = excluded.name,
      adresszusatz = excluded.adresszusatz,
      strasse = excluded.strasse,
      plz = excluded.plz,
      ort = excluded.ort,
      telefon_privat = excluded.telefon_privat,
      telefon_geschaeft = excluded.telefon_geschaeft,
      telefon_mobile = excluded.telefon_mobile,
      email = excluded.email,
      kein_email = excluded.kein_email,
      bemerkungen = excluded.bemerkungen,
      changed = excluded.changed,
      changed_by = excluded.changed_by,
      account_id = excluded.account_id,
      user_role_id = excluded.user_role_id,
      kommerziell = excluded.kommerziell,
      info = excluded.info,
      aktiv = excluded.aktiv,
      _rev = excluded._rev,
      _rev_at = excluded._rev_at,
      _revisions = excluded._revisions,
      _parent_rev = excluded._parent_rev,
      _depth = excluded._depth,
      _deleted = excluded._deleted,
      _conflicts = excluded._conflicts;
  else
    -- 3. insert winner of deleted datasets
    insert into person (
        id,
        nr,
        vorname,
        name,
        adresszusatz,
        strasse,
        plz,
        ort,
        telefon_privat,
        telefon_geschaeft,
        telefon_mobile,
        email,
        kein_email,
        bemerkungen,
        changed,
        changed_by,
        account_id,
        user_role_id,
        kommerziell,
        info,
        aktiv,
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
        person_rev
      where
        not exists (
          select
            person_id
          from
            person_rev as t
          where
            t.person_id = new.person_id
            and t._parent_rev = person_rev._rev
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
          person_rev
        where
          not exists (
            select
              person_id
            from
              person_rev as t
            where
              t.person_id = new.person_id
              and t._parent_rev = person_rev._rev
          )
          and _deleted is true
          and person_id = new.person_id
          and exists (
            select person_id from leaves l
            where 
              l._parent_rev = person_rev._parent_rev
              and l._depth = person_rev._depth
          )
      ),
      leaves_deleted as (
      select
        person_id,
        _rev,
        _depth
      from
        person_rev
      where
        not exists (
          select
            person_id
          from
            person_rev as t
          where
            t.person_id = new.person_id
            and t._parent_rev = person_rev._rev)
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
        person_rev.person_id,
        person_rev.nr,
        person_rev.vorname,
        person_rev.name,
        person_rev.adresszusatz,
        person_rev.strasse,
        person_rev.plz,
        person_rev.ort,
        person_rev.telefon_privat,
        person_rev.telefon_geschaeft,
        person_rev.telefon_mobile,
        person_rev.email,
        person_rev.kein_email,
        person_rev.bemerkungen,
        person_rev.changed,
        person_rev.changed_by,
        person_rev.account_id,
        person_rev.user_role_id,
        person_rev.kommerziell,
        person_rev.info,
        person_rev.aktiv,
        person_rev._rev,
        person_rev._rev_at,
        person_rev._revisions,
        person_rev._parent_rev,
        person_rev._depth,
        person_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> person_rev._rev
            and _rev <> ANY(person_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
        )) as _conflicts
      from
        person_rev
        join winning_revisions on person_rev._rev = winning_revisions._rev
      on conflict on constraint person_pkey do update set
        -- do not update the id = pkey
        nr = excluded.nr,
        vorname = excluded.vorname,
        name = excluded.name,
        adresszusatz = excluded.adresszusatz,
        strasse = excluded.strasse,
        plz = excluded.plz,
        ort = excluded.ort,
        telefon_privat = excluded.telefon_privat,
        telefon_geschaeft = excluded.telefon_geschaeft,
        telefon_mobile = excluded.telefon_mobile,
        email = excluded.email,
        kein_email = excluded.kein_email,
        bemerkungen = excluded.bemerkungen,
        changed = excluded.changed,
        changed_by = excluded.changed_by,
        account_id = excluded.account_id,
        user_role_id = excluded.user_role_id,
        kommerziell = excluded.kommerziell,
        info = excluded.info,
        aktiv = excluded.aktiv,
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

create trigger trigger_person_rev_set_winning_revision
  after insert on person_rev
  for each row
  execute procedure person_rev_set_winning_revision ()