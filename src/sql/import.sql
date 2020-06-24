create table person_import (
  id uuid primary key,
  nr text default null,
  vorname text default null,
  name text default null,
  adresszusatz text default null,
  strasse text default null,
  plz integer default null,
  ort text default null,
  telefon_privat text default null,
  telefon_geschaeft text default null,
  telefon_mobile text default null,
  email text default null,
  kein_email boolean default false,
  bemerkungen text default null,
  changed_by text default null,
  user_role text default null,
  kommerziell boolean default false,
  info boolean default false,
  aktiv boolean default true
);

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
  changed_by,
  user_role,
  kommerziell,
  info,
  aktiv
)
select 
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
  changed_by,
  user_role,
  kommerziell,
  info,
  aktiv
from person_import;

create table art_import (
  id uuid primary key,
  ae_id uuid default null,
  changed_by text default null
);

insert into art (id, ae_id, changed_by)
select id, ae_id, changed_by from art_import;