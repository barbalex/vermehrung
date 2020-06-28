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

insert into art (id, ae_id, changed_by)
select id, ae_id, changed_by from art_import;

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

-- imported 0!!!!
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

delete from teilzaehlung tz
where 
  teilkultur_id is null
  and anzahl_pflanzen is null
  and anzahl_auspflanzbereit is null
  and anzahl_mutterpflanzen is null
  and andere_menge is null
  and auspflanzbereit_beschreibung is null
  and bemerkungen is null
  and changed_by is null
  and exists (
    select id from teilzaehlung tz2
    where tz.zaehlung_id = tz2.zaehlung_id
    and (
      tz2.teilkultur_id is not null
      or tz2.anzahl_pflanzen is not null
      or tz2.anzahl_auspflanzbereit is not null
      or tz2.anzahl_mutterpflanzen is not null
      or tz2.andere_menge is not null
      or tz2.auspflanzbereit_beschreibung is not null
      or tz2.bemerkungen is not null
      or tz2.changed_by is not null
    )
  );

insert into person (
  vorname,
  name,
  account_id,
  email,
  user_role
)
values 
  ('Alexander','Gabriel','secret','alex@gabriel-software.ch','manager');