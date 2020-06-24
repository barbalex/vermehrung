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

create table herkunft_import (
  id uuid primary key,
  nr text default null, -- DO NOT set unique - does not work for offline
  lokalname text default null,
  gemeinde text default null,
  kanton text default null,
  land text default null,
  wgs84x numeric default null,
  wgs84y numeric default null,
  bemerkungen text default null,
  changed_by text default null
);

insert into herkunft (
  id,
  nr,
  lokalname,
  gemeinde,
  kanton,
  land,
  geom_point,
  bemerkungen,
  changed_by
)
select 
  id,
  nr,
  lokalname,
  gemeinde,
  kanton,
  land,
  ST_SetSRID(ST_MakePoint(wgs84x, wgs84y), 4326) as geom_point,
  bemerkungen,
  changed_by
from herkunft_import;

create table sammlung_import (
  id uuid primary key,
  art_id uuid default null,
  person_id uuid default null,
  herkunft_id uuid default null,
  nr text default null, -- DO NOT set unique - does not work for offline
  datum text default null,
  von_anzahl_individuen integer default null,
  anzahl_pflanzen integer default null,
  gramm_samen integer default null,
  andere_menge text default null,
  wgs84x numeric default null,
  wgs84y numeric default null,
  bemerkungen text default null,
  changed_by text default null
);

insert into sammlung (
  id,
  art_id,
  person_id,
  herkunft_id,
  nr,
  datum,
  von_anzahl_individuen,
  anzahl_pflanzen,
  gramm_samen,
  andere_menge,
  geom_point,
  bemerkungen,
  changed_by
)
select 
  id,
  art_id,
  person_id,
  herkunft_id,
  nr,
  to_date(datum, 'DD.MM.YYYY'),
  von_anzahl_individuen,
  anzahl_pflanzen,
  gramm_samen,
  andere_menge,
  ST_SetSRID(ST_MakePoint(wgs84x, wgs84y), 4326) as geom_point,
  bemerkungen,
  changed_by
from sammlung_import;


create table garten_import (
  id uuid primary key,
  name text default null,
  person_id uuid default null,
  strasse text default null,
  plz integer default null,
  ort text default null,
  aktiv boolean default true,
  bemerkungen text default null,
  changed_by text default null
);

insert into garten (
  id,
  name,
  person_id,
  strasse,
  plz,
  ort,
  aktiv,
  bemerkungen,
  changed_by
)
select 
  id,
  name,
  person_id,
  strasse,
  plz,
  ort,
  aktiv,
  bemerkungen,
  changed_by
from garten_import;

create table kultur_import_1 (
  id uuid primary key,
  art_id uuid default null,
  herkunft_id uuid default null,
  garten_id uuid default null,
  von_anzahl_individuen integer default null,
  bemerkungen text default null,
  aktiv boolean default true,
  changed_by text default null
);

insert into kultur (
  id,
  art_id,
  herkunft_id,
  garten_id,
  von_anzahl_individuen,
  bemerkungen,
  aktiv,
  changed_by
)
select 
  id,
  art_id,
  herkunft_id,
  garten_id,
  von_anzahl_individuen,
  bemerkungen,
  aktiv,
  changed_by
from kultur_import_1;

create table kultur_import_gaw (
  id uuid primary key,
  art_id uuid default null,
  herkunft_id uuid default null,
  garten_id uuid default null,
  von_anzahl_individuen integer default null,
  bemerkungen text default null,
  changed_by text default null
);

insert into kultur (
  id,
  art_id,
  herkunft_id,
  garten_id,
  von_anzahl_individuen,
  bemerkungen,
  changed_by
)
select 
  id,
  art_id,
  herkunft_id,
  garten_id,
  von_anzahl_individuen,
  bemerkungen,
  changed_by
from kultur_import_gaw;

create table lieferung_import_an_1 (
  id uuid primary key,
  art_id uuid default null,
  person_id uuid default null,
  von_sammlung_id uuid default null,
  datum text default null,
  nach_kultur_id uuid default null,
  von_anzahl_individuen integer default null,
  anzahl_pflanzen integer default null,
  anzahl_auspflanzbereit integer default null,
  gramm_samen integer default null,
  andere_menge text default null,
  changed_by text default null
);

insert into lieferung (
  id,
  art_id,
  person_id,
  von_sammlung_id,
  datum,
  nach_kultur_id,
  von_anzahl_individuen,
  anzahl_pflanzen,
  anzahl_auspflanzbereit,
  gramm_samen,
  andere_menge,
  changed_by
)
select 
  id,
  art_id,
  person_id,
  von_sammlung_id,
  to_date(datum, 'DD.MM.YYYY'),
  nach_kultur_id,
  von_anzahl_individuen,
  anzahl_pflanzen,
  anzahl_auspflanzbereit,
  gramm_samen,
  andere_menge,
  changed_by
from lieferung_import_an_1;

create table lieferung_import_aus_1_samen (
  id uuid primary key,
  art_id uuid default null,
  person_id uuid default null,
  von_kultur_id uuid default null,
  datum text default null,
  nach_ausgepflanzt boolean default false,
  von_anzahl_individuen integer default null,
  gramm_samen decimal default null,
  andere_menge text default null,
  bemerkungen text default null,
  changed_by text default null
);

insert into lieferung (
  id,
  art_id,
  person_id,
  von_kultur_id,
  datum,
  nach_ausgepflanzt,
  von_anzahl_individuen,
  gramm_samen,
  andere_menge,
  bemerkungen,
  changed_by
)
select 
  id,
  art_id,
  person_id,
  von_kultur_id,
  to_date(datum, 'DD.MM.YYYY'),
  nach_ausgepflanzt,
  von_anzahl_individuen,
  gramm_samen,
  andere_menge,
  bemerkungen,
  changed_by
from lieferung_import_aus_1_samen;

create table lieferung_import_aus_1_pflanzen (
  id uuid primary key,
  art_id uuid default null,
  person_id uuid default null,
  von_kultur_id uuid default null,
  datum text default null,
  nach_ausgepflanzt boolean default false,
  anzahl_pflanzen integer default null,
  changed_by text default null
);

insert into lieferung (
  id,
  art_id,
  person_id,
  von_kultur_id,
  datum,
  nach_ausgepflanzt,
  anzahl_pflanzen,
  changed_by
)
select 
  id,
  art_id,
  person_id,
  von_kultur_id,
  to_date(datum, 'DD.MM.YYYY'),
  nach_ausgepflanzt,
  anzahl_pflanzen,
  changed_by
from lieferung_import_aus_1_pflanzen;

create table event_import_1 (
  id uuid primary key,
  kultur_id uuid default null,
  person_id uuid default null,
  beschreibung text default null,
  datum text default null,
  changed_by text default null
);

insert into event (
  id,
  kultur_id,
  person_id,
  beschreibung,
  datum,
  changed_by
)
select 
  id,
  kultur_id,
  person_id,
  beschreibung,
  to_date(datum, 'DD.MM.YYYY'),
  changed_by
from event_import_1;

create table teilkultur_import_gaw (
  id uuid primary key,
  kultur_id uuid default null,
  name text default null,
  ort1 text default null,
  ort2 text default null,
  ort3 text default null,
  bemerkungen text default null,
  changed_by text default null
);

insert into teilkultur (
  id,
  kultur_id,
  name,
  ort1,
  ort2,
  ort3,
  bemerkungen,
  changed_by
)
select 
  id,
  kultur_id,
  name,
  ort1,
  ort2,
  ort3,
  bemerkungen,
  changed_by
from teilkultur_import_gaw;


create table zaehlung_import_gaw (
  id uuid primary key,
  kultur_id uuid default null,
  datum text default null,
  bemerkungen text default null,
  changed_by text default null
);

insert into zaehlung (
  id,
  kultur_id,
  datum,
  bemerkungen,
  changed_by
)
select 
  id,
  kultur_id,
  to_date(datum, 'DD.MM.YYYY'),
  bemerkungen,
  changed_by
from zaehlung_import_gaw;

create table event_import_gaw (
  id uuid primary key,
  kultur_id uuid default null,
  teilkultur_id uuid default null,
  beschreibung text default null,
  datum text default null,
  geplant boolean default false,
  changed_by text default null
);

insert into event (
  id,
  kultur_id,
  teilkultur_id,
  beschreibung,
  datum,
  geplant,
  changed_by
)
select 
  id,
  kultur_id,
  teilkultur_id,
  beschreibung,
  to_date(datum, 'DD.MM.YYYY'),
  geplant,
  changed_by
from event_import_gaw;

create table zaehlung_import_1 (
  id uuid primary key,
  kultur_id uuid default null,
  datum text default null,
  bemerkungen text default null,
  changed_by text default null
);

insert into zaehlung (
  id,
  kultur_id,
  datum,
  bemerkungen,
  changed_by
)
select 
  id,
  kultur_id,
  to_date(datum, 'DD.MM.YYYY'),
  bemerkungen,
  changed_by
from zaehlung_import_1;

create table teilzaehlung_import_1 (
  id uuid primary key,
  zaehlung_id uuid default null references zaehlung (id) on delete cascade on update cascade,
  anzahl_pflanzen integer default null,
  anzahl_auspflanzbereit integer default null,
  anzahl_mutterpflanzen integer default null,
  andere_menge text default null,
  changed_by text default null
);

insert into teilzaehlung (
  id,
  zaehlung_id,
  anzahl_pflanzen,
  anzahl_auspflanzbereit,
  anzahl_mutterpflanzen,
  andere_menge,
  changed_by
)
select 
  id,
  zaehlung_id,
  anzahl_pflanzen,
  anzahl_auspflanzbereit,
  anzahl_mutterpflanzen,
  andere_menge,
  changed_by
from teilzaehlung_import_1;

create table teilzaehlung_import_gaw (
  id uuid primary key,
  zaehlung_id uuid default null,
  teilkultur_id uuid default null,
  anzahl_pflanzen integer default null,
  anzahl_auspflanzbereit integer default null,
  anzahl_mutterpflanzen integer default null,
  auspflanzbereit_beschreibung text default null,
  changed_by text default null
);

insert into teilzaehlung (
  id,
  zaehlung_id,
  teilkultur_id,
  anzahl_pflanzen,
  anzahl_auspflanzbereit,
  anzahl_mutterpflanzen,
  auspflanzbereit_beschreibung,
  changed_by
)
select 
  id,
  zaehlung_id,
  teilkultur_id,
  anzahl_pflanzen,
  anzahl_auspflanzbereit,
  anzahl_mutterpflanzen,
  auspflanzbereit_beschreibung,
  changed_by
from teilzaehlung_import_gaw;