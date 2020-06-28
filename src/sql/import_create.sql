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

create table art_import (
  id uuid primary key,
  ae_id uuid default null,
  changed_by text default null
);

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

create table kultur_import_gaw (
  id uuid primary key,
  art_id uuid default null,
  herkunft_id uuid default null,
  garten_id uuid default null,
  von_anzahl_individuen integer default null,
  bemerkungen text default null,
  changed_by text default null
);

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

create table event_import_1 (
  id uuid primary key,
  kultur_id uuid default null,
  person_id uuid default null,
  beschreibung text default null,
  datum text default null,
  changed_by text default null
);

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

create table zaehlung_import_gaw (
  id uuid primary key,
  kultur_id uuid default null,
  datum text default null,
  bemerkungen text default null,
  changed_by text default null
);

create table event_import_gaw (
  id uuid primary key,
  kultur_id uuid default null,
  teilkultur_id uuid default null,
  beschreibung text default null,
  datum text default null,
  geplant boolean default false,
  changed_by text default null
);

create table zaehlung_import_1 (
  id uuid primary key,
  kultur_id uuid default null,
  datum text default null,
  bemerkungen text default null,
  changed_by text default null
);

create table teilzaehlung_import_1 (
  id uuid primary key,
  zaehlung_id uuid default null references zaehlung (id) on delete cascade on update cascade,
  anzahl_pflanzen integer default null,
  anzahl_auspflanzbereit integer default null,
  anzahl_mutterpflanzen integer default null,
  andere_menge text default null,
  changed_by text default null
);

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