-- 1. alter tables
alter table person add column user_role_id uuid default null REFERENCES user_role (id) ON DELETE CASCADE ON UPDATE CASCADE;
update person 
set user_role_id = subquery.id
from (select id, name from user_role) as subquery
where person.user_role = subquery.name;
create index on person using btree (user_role_id);

alter table person_rev add column user_role_id uuid;
update person_rev 
set user_role_id = subquery.id
from (select id, name from user_role) as subquery
where person_rev.user_role = subquery.name;

alter table art_qk_choosen add column qk_id uuid REFERENCES art_qk (id) ON DELETE CASCADE ON UPDATE CASCADE;
update art_qk_choosen 
set qk_id = subquery.id
from (select id, name from art_qk) as subquery
where art_qk_choosen.qk_name = subquery.name;
alter table art_qk_choosen alter column qk_id set not null;
create index on art_qk_choosen using btree (qk_id);
drop index public.art_qk_choosen_qk_name_idx;

alter table art_qk_choosen_rev add column qk_id uuid;
update art_qk_choosen_rev 
set qk_id = subquery.id
from (select id, name from art_qk) as subquery
where art_qk_choosen_rev.qk_name = subquery.name;

ALTER TABLE kultur_qk DROP CONSTRAINT kultur_qk_pkey cascade;
alter table kultur_qk add primary key (id);
alter table kultur_qk add unique (name);
alter table kultur_qk_choosen add column qk_id uuid REFERENCES kultur_qk (id) ON DELETE CASCADE ON UPDATE CASCADE;
update kultur_qk_choosen 
set qk_id = subquery.id
from (select id, name from kultur_qk) as subquery
where kultur_qk_choosen.qk_name = subquery.name;
alter table kultur_qk_choosen alter column qk_id set not null;
create index on kultur_qk_choosen using btree (qk_id);
drop index public.kultur_qk_choosen_qk_name_idx;

alter table kultur_qk_choosen_rev add column qk_id uuid;
update kultur_qk_choosen_rev 
set qk_id = subquery.id
from (select id, name from kultur_qk) as subquery
where kultur_qk_choosen_rev.qk_name = subquery.name;

-- 2. alter trigger functions
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

create or replace function art_qk_choosen_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
    with leaves as (
    select
      art_qk_choosen_id,
      _rev,
      _depth
    from
      art_qk_choosen_rev
    where
      not exists (
        select
          art_qk_choosen_id
        from
          art_qk_choosen_rev as t
        where
          t.art_qk_choosen_id = new.art_qk_choosen_id
          and t._parent_rev = art_qk_choosen_rev._rev)
        and _deleted = false
        and art_qk_choosen_id = new.art_qk_choosen_id
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
    select * from art_qk_choosen_rev
    join winning_revisions on art_qk_choosen_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
    insert into art_qk_choosen (
      id,
      art_id,
      qk_id,
      choosen,
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
  with leaves as (
    select
      art_qk_choosen_id,
      _rev,
      _depth,
      _parent_rev
    from
      art_qk_choosen_rev
    where
      not exists (
        select
          art_qk_choosen_id
        from
          art_qk_choosen_rev as t
        where
          t.art_qk_choosen_id = new.art_qk_choosen_id
          and t._parent_rev = art_qk_choosen_rev._rev)
        and _deleted = false
        and art_qk_choosen_id = new.art_qk_choosen_id
    ),
    deleted_conflicts_of_leaves as (
      select
        art_qk_choosen_id,
        _rev,
        _depth
      from
        art_qk_choosen_rev
      where
        not exists (
          select
            art_qk_choosen_id
          from
            art_qk_choosen_rev as t
          where
            t.art_qk_choosen_id = new.art_qk_choosen_id
            and t._parent_rev = art_qk_choosen_rev._rev
        )
        and _deleted is true
        and art_qk_choosen_id = new.art_qk_choosen_id
        and exists (
          select art_qk_choosen_id from leaves l
          where 
            l._parent_rev = art_qk_choosen_rev._parent_rev
            and l._depth = art_qk_choosen_rev._depth
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
      art_qk_choosen_rev.art_qk_choosen_id,
      art_qk_choosen_rev.art_id,
      art_qk_choosen_rev.qk_id,
      art_qk_choosen_rev.choosen,
      art_qk_choosen_rev.changed,
      art_qk_choosen_rev.changed_by,
      art_qk_choosen_rev._rev,
      art_qk_choosen_rev._rev_at,
      art_qk_choosen_rev._revisions,
      art_qk_choosen_rev._parent_rev,
      art_qk_choosen_rev._depth,
      art_qk_choosen_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> art_qk_choosen_rev._rev
          and _rev <> ANY(art_qk_choosen_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      art_qk_choosen_rev
      join winning_revisions on art_qk_choosen_rev._rev = winning_revisions._rev
    on conflict on constraint art_qk_choosen_pkey do update set
      -- do not update the id = pkey
      art_id = excluded.art_id,
      qk_id = excluded.qk_id,
      choosen = excluded.choosen,
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
    -- 3. insert winner of deleted datasets
    insert into art_qk_choosen (
        id,
        art_id,
        qk_id,
        choosen,
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
    with leaves as (
      select
        art_qk_choosen_id,
        _rev,
        _depth,
        _parent_rev
      from
        art_qk_choosen_rev
      where
        not exists (
          select
            art_qk_choosen_id
          from
            art_qk_choosen_rev as t
          where
            t.art_qk_choosen_id = new.art_qk_choosen_id
            and t._parent_rev = art_qk_choosen_rev._rev
        )
        and _deleted is false
        and art_qk_choosen_id = new.art_qk_choosen_id
      ),
      deleted_conflicts_of_leaves as (
        select
          art_qk_choosen_id,
          _rev,
          _depth
        from
          art_qk_choosen_rev
        where
          not exists (
            select
              art_qk_choosen_id
            from
              art_qk_choosen_rev as t
            where
              t.art_qk_choosen_id = new.art_qk_choosen_id
              and t._parent_rev = art_qk_choosen_rev._rev
          )
          and _deleted is true
          and art_qk_choosen_id = new.art_qk_choosen_id
          and exists (
            select art_qk_choosen_id from leaves l
            where 
              l._parent_rev = art_qk_choosen_rev._parent_rev
              and l._depth = art_qk_choosen_rev._depth
          )
      ),
      leaves_deleted as (
      select
        art_qk_choosen_id,
        _rev,
        _depth
      from
        art_qk_choosen_rev
      where
        not exists (
          select
            art_qk_choosen_id
          from
            art_qk_choosen_rev as t
          where
            t.art_qk_choosen_id = new.art_qk_choosen_id
            and t._parent_rev = art_qk_choosen_rev._rev)
          --and _deleted = false
          and art_qk_choosen_id = new.art_qk_choosen_id
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
        art_qk_choosen_rev.art_qk_choosen_id,
        art_qk_choosen_rev.art_id,
        art_qk_choosen_rev.qk_id,
        art_qk_choosen_rev.choosen,
        art_qk_choosen_rev.changed,
        art_qk_choosen_rev.changed_by,
        art_qk_choosen_rev._rev,
        art_qk_choosen_rev._rev_at,
        art_qk_choosen_rev._revisions,
        art_qk_choosen_rev._parent_rev,
        art_qk_choosen_rev._depth,
        art_qk_choosen_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> art_qk_choosen_rev._rev
            and _rev <> ANY(art_qk_choosen_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
        )) as _conflicts
      from
        art_qk_choosen_rev
        join winning_revisions on art_qk_choosen_rev._rev = winning_revisions._rev
      on conflict on constraint art_qk_choosen_pkey do update set
        -- do not update the id = pkey
        art_id = excluded.art_id,
        qk_id = excluded.qk_id,
        choosen = excluded.choosen,
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
$body$
language plpgsql;

create or replace function kultur_qk_choosen_rev_set_winning_revision ()
  returns trigger
  as $body$
begin
  -- 1. check if non deleted winner exists
  if exists(
    with leaves as (
    select
      kultur_qk_choosen_id,
      _rev,
      _depth
    from
      kultur_qk_choosen_rev
    where
      not exists (
        select
          kultur_qk_choosen_id
        from
          kultur_qk_choosen_rev as t
        where
          t.kultur_qk_choosen_id = new.kultur_qk_choosen_id
          and t._parent_rev = kultur_qk_choosen_rev._rev)
        and _deleted = false
        and kultur_qk_choosen_id = new.kultur_qk_choosen_id
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
    select * from kultur_qk_choosen_rev
    join winning_revisions on kultur_qk_choosen_rev._rev = winning_revisions._rev
  ) then
    -- 2. insert winner of non deleted datasets
    insert into kultur_qk_choosen (
      id,
      kultur_id,
      qk_id,
      choosen,
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
  with leaves as (
    select
      kultur_qk_choosen_id,
      _rev,
      _depth,
      _parent_rev
    from
      kultur_qk_choosen_rev
    where
      not exists (
        select
          kultur_qk_choosen_id
        from
          kultur_qk_choosen_rev as t
        where
          t.kultur_qk_choosen_id = new.kultur_qk_choosen_id
          and t._parent_rev = kultur_qk_choosen_rev._rev)
        and _deleted = false
        and kultur_qk_choosen_id = new.kultur_qk_choosen_id
    ),
    deleted_conflicts_of_leaves as (
      select
        kultur_qk_choosen_id,
        _rev,
        _depth
      from
        kultur_qk_choosen_rev
      where
        not exists (
          select
            kultur_qk_choosen_id
          from
            kultur_qk_choosen_rev as t
          where
            t.kultur_qk_choosen_id = new.kultur_qk_choosen_id
            and t._parent_rev = kultur_qk_choosen_rev._rev
        )
        and _deleted is true
        and kultur_qk_choosen_id = new.kultur_qk_choosen_id
        and exists (
          select kultur_qk_choosen_id from leaves l
          where 
            l._parent_rev = kultur_qk_choosen_rev._parent_rev
            and l._depth = kultur_qk_choosen_rev._depth
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
      kultur_qk_choosen_rev.kultur_qk_choosen_id,
      kultur_qk_choosen_rev.kultur_id,
      kultur_qk_choosen_rev.qk_id,
      kultur_qk_choosen_rev.choosen,
      kultur_qk_choosen_rev.changed,
      kultur_qk_choosen_rev.changed_by,
      kultur_qk_choosen_rev._rev,
      kultur_qk_choosen_rev._rev_at,
      kultur_qk_choosen_rev._revisions,
      kultur_qk_choosen_rev._parent_rev,
      kultur_qk_choosen_rev._depth,
      kultur_qk_choosen_rev._deleted,
      (select array(
        select _rev from leaves
        where 
          _rev <> kultur_qk_choosen_rev._rev
          and _rev <> ANY(kultur_qk_choosen_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
      )) as _conflicts
    from
      kultur_qk_choosen_rev
      join winning_revisions on kultur_qk_choosen_rev._rev = winning_revisions._rev
    on conflict on constraint kultur_qk_choosen_pkey do update set
      -- do not update the id = pkey
      kultur_id = excluded.kultur_id,
      qk_id = excluded.qk_id,
      choosen = excluded.choosen,
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
    -- 3. insert winner of deleted datasets
    insert into kultur_qk_choosen (
        id,
        kultur_id,
        qk_id,
        choosen,
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
    with leaves as (
      select
        kultur_qk_choosen_id,
        _rev,
        _depth,
        _parent_rev
      from
        kultur_qk_choosen_rev
      where
        not exists (
          select
            kultur_qk_choosen_id
          from
            kultur_qk_choosen_rev as t
          where
            t.kultur_qk_choosen_id = new.kultur_qk_choosen_id
            and t._parent_rev = kultur_qk_choosen_rev._rev
        )
        and _deleted is false
        and kultur_qk_choosen_id = new.kultur_qk_choosen_id
      ),
      deleted_conflicts_of_leaves as (
        select
          kultur_qk_choosen_id,
          _rev,
          _depth
        from
          kultur_qk_choosen_rev
        where
          not exists (
            select
              kultur_qk_choosen_id
            from
              kultur_qk_choosen_rev as t
            where
              t.kultur_qk_choosen_id = new.kultur_qk_choosen_id
              and t._parent_rev = kultur_qk_choosen_rev._rev
          )
          and _deleted is true
          and kultur_qk_choosen_id = new.kultur_qk_choosen_id
          and exists (
            select kultur_qk_choosen_id from leaves l
            where 
              l._parent_rev = kultur_qk_choosen_rev._parent_rev
              and l._depth = kultur_qk_choosen_rev._depth
          )
      ),
      leaves_deleted as (
      select
        kultur_qk_choosen_id,
        _rev,
        _depth
      from
        kultur_qk_choosen_rev
      where
        not exists (
          select
            kultur_qk_choosen_id
          from
            kultur_qk_choosen_rev as t
          where
            t.kultur_qk_choosen_id = new.kultur_qk_choosen_id
            and t._parent_rev = kultur_qk_choosen_rev._rev)
          --and _deleted = false
          and kultur_qk_choosen_id = new.kultur_qk_choosen_id
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
        kultur_qk_choosen_rev.kultur_qk_choosen_id,
        kultur_qk_choosen_rev.kultur_id,
        kultur_qk_choosen_rev.qk_id,
        kultur_qk_choosen_rev.choosen,
        kultur_qk_choosen_rev.changed,
        kultur_qk_choosen_rev.changed_by,
        kultur_qk_choosen_rev._rev,
        kultur_qk_choosen_rev._rev_at,
        kultur_qk_choosen_rev._revisions,
        kultur_qk_choosen_rev._parent_rev,
        kultur_qk_choosen_rev._depth,
        kultur_qk_choosen_rev._deleted,
        (select array(
          select _rev from leaves
          where 
            _rev <> kultur_qk_choosen_rev._rev
            and _rev <> ANY(kultur_qk_choosen_rev._revisions)
        union select _rev from deleted_conflicts_of_leaves
        )) as _conflicts
      from
        kultur_qk_choosen_rev
        join winning_revisions on kultur_qk_choosen_rev._rev = winning_revisions._rev
      on conflict on constraint kultur_qk_choosen_pkey do update set
        -- do not update the id = pkey
        kultur_id = excluded.kultur_id,
        qk_id = excluded.qk_id,
        choosen = excluded.choosen,
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
$body$
language plpgsql;

CREATE or replace FUNCTION kultur_has_qk_choosen() RETURNS trigger AS $kultur_has_qk_choosen$
BEGIN
  insert into kultur_qk_choosen(kultur_id, qk_id)
  select distinct kultur.id, kultur_qk.id from kultur, kultur_qk where kultur.id = NEW.id;
  RETURN NEW;
END;
$kultur_has_qk_choosen$ LANGUAGE plpgsql;

CREATE or replace FUNCTION art_has_qk_choosen() RETURNS trigger AS $art_has_qk_choosen$
BEGIN
  insert into art_qk_choosen(art_id, qk_id)
  select distinct art.id, art_qk.id from art, art_qk where art.id = NEW.id;
  RETURN NEW;
END;
$art_has_qk_choosen$ LANGUAGE plpgsql;

-- 6. remove no more used fields
alter table person drop column user_role;
alter table person_rev drop column user_role;
alter table art_qk_choosen drop column qk_name;
alter table art_qk_choosen_rev drop column qk_name;
alter table kultur_qk_choosen drop column qk_name;
alter table kultur_qk_choosen_rev drop column qk_name;