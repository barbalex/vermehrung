create or replace function person_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- if is deletion:
  -- do not search for winner
  -- insert deletion as winner but list conflicts
  if new._deleted = true then
    insert into person (
        id,
        nr,
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
        user_role,
        kommerziell,
        info,
        aktiv,
        _rev,
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
      )
      select
        person_rev.person_id,
        person_rev.nr,
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
        person_rev.user_role,
        person_rev.kommerziell,
        person_rev.info,
        person_rev.aktiv,
        person_rev._rev,
        person_rev._revisions,
        person_rev._parent_rev,
        person_rev._depth,
        person_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> person_rev._rev
            and _rev <> ANY(person_rev._revisions)
        )) as _conflicts
      from
        person_rev
        where id = new.id
      on conflict on constraint person_pkey do update set
        -- do not update the id = pkey
        nr = excluded.nr,
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
        user_role = excluded.user_role,
        kommerziell = excluded.kommerziell,
        info = excluded.info,
        aktiv = excluded.aktiv,
        _rev = excluded._rev,
        _revisions = excluded._revisions,
        _parent_rev = excluded._parent_rev,
        _depth = excluded._depth,
        _deleted = excluded._deleted,
        _conflicts = excluded._conflicts;
  else
    insert into person (
        id,
        nr,
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
        user_role,
        kommerziell,
        info,
        aktiv,
        _rev,
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
      select
        person_rev.person_id,
        person_rev.nr,
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
        person_rev.user_role,
        person_rev.kommerziell,
        person_rev.info,
        person_rev.aktiv,
        person_rev._rev,
        person_rev._revisions,
        person_rev._parent_rev,
        person_rev._depth,
        person_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> person_rev._rev
            and _rev <> ANY(person_rev._revisions)
        )) as _conflicts
      from
        person_rev
        join winning_revisions on person_rev._rev = winning_revisions._rev
      on conflict on constraint person_pkey do update set
        -- do not update the id = pkey
        nr = excluded.nr,
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
        user_role = excluded.user_role,
        kommerziell = excluded.kommerziell,
        info = excluded.info,
        aktiv = excluded.aktiv,
        _rev = excluded._rev,
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