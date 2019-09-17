create extension if not exists "uuid-ossp";

drop table if exists zaehleinheit_werte cascade;
create table zaehleinheit_werte (
  id bigserial primary key,
  wert varchar(50) default null,
  sort smallint default null,
  changed date default now(),
  changed_by varchar(20) default null
);
create index on zaehleinheit_werte using btree (id);
create index on zaehleinheit_werte using btree (sort);

drop table if exists masseinheit_werte cascade;
create table masseinheit_werte (
  id bigserial primary key,
  wert varchar(50) default null,
  sort smallint default null,
  changed date default now(),
  changed_by varchar(20) default null
);
create index on masseinheit_werte using btree (id);
create index on masseinheit_werte using btree (sort);

drop table if exists person cascade;
create table person (
  id bigserial primary key,
  nr text default null unique,
  name text default null,
  adresszusatz text default null,
  strasse text default null,
  plz integer default null,
  ort text default null,
  telefon_privat text default null,
  telefon_geschaeft text default null,
  telefon_mobile text default null,
  fax_privat text default null,
  fax_geschaeft text default null,
  email text default null,
  kein_email boolean default false,
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector,
  account_id text default null,
  kommerziell boolean default false,
  info boolean default false,
  aktiv boolean default true,
);
create index on person using btree (id);
create index on person using btree (name);
create index on person using btree (account_id);
create index on person using btree (aktiv);
create index on person using btree (kommerziell);
create index on person using btree (info);
create index on person using gin (tsv);

drop table if exists person_file;
create table person_file (
  id bigserial primary key,
  person_id integer default null references person (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null
);
create index on person using btree (id);
create index on person_file using btree (person_id);
create index on person_file using btree (file_id);
create index on person_file using btree (file_mime_type);

drop table if exists art cascade;
create table art (
  id bigserial primary key,
  ae_id uuid default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on art using btree (id);
create index on art using btree (ae_id);
create index on art using gin (tsv);

drop table if exists herkunft cascade;
create table herkunft (
  id bigserial primary key,
  nr text default null unique,
  lokalname text default null,
  gemeinde text default null,
  kanton text default null,
  land text default null,
  geom_point geometry(Point, 4326) default null,
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on herkunft using btree (id);
create index on herkunft using btree (lokalname);
create index on herkunft using gin (tsv);

drop table if exists herkunft_file;
create table herkunft_file (
  id bigserial primary key,
  herkunft_id integer default null references herkunft (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null
);
create index on herkunft using btree (id);
create index on herkunft_file using btree (herkunft_id);
create index on herkunft_file using btree (file_id);
create index on herkunft_file using btree (file_mime_type);

drop table if exists sammlung cascade;
create table sammlung (
  id bigserial primary key,
  art_id integer default null references art (id) on delete cascade on update cascade,
  person_id integer default null references person (id) on delete cascade on update cascade,
  herkunft_id integer default null references herkunft (id) on delete cascade on update cascade,
  nr text default null unique,
  datum date default null,
  von_anzahl_individuen integer default null,
  anzahl_pflanzen integer default null,
  gramm_samen integer default null,
  andere_menge text default null,
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on sammlung using btree (id);
create index on sammlung using btree (art_id);
create index on sammlung using btree (person_id);
create index on sammlung using btree (herkunft_id);
create index on sammlung using btree (datum);
create index on sammlung using btree (anzahl_pflanzen);
create index on sammlung using btree (gramm_samen);
create index on sammlung using gin (tsv);

drop table if exists sammlung_file;
create table sammlung_file (
  id bigserial primary key,
  sammlung_id integer default null references sammlung (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null
);
create index on sammlung using btree (id);
create index on sammlung_file using btree (sammlung_id);
create index on sammlung_file using btree (file_id);
create index on sammlung_file using btree (file_mime_type);

drop table if exists garten cascade;
create table garten (
  id bigserial primary key,
  name text default null,
  person_id integer default null references person (id) on delete cascade on update cascade,
  geom_point geometry(Point, 4326) default null,
  aktiv boolean default true,
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on garten using btree (id);
create index on garten using btree (name);
create index on garten using btree (person_id);
create index on garten using btree (aktiv);
create index on garten using gin (tsv);

drop table if exists garten_file;
create table garten_file (
  id bigserial primary key,
  garten_id integer default null references garten (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null
);
create index on garten using btree (id);
create index on garten_file using btree (garten_id);
create index on garten_file using btree (file_id);
create index on garten_file using btree (file_mime_type);

drop table if exists kultur cascade;
create table kultur (
  id bigserial primary key,
  art_id integer default null references art (id) on delete cascade on update cascade,
  herkunft_id integer default null references herkunft (id) on delete cascade on update cascade,
  garten_id integer default null references garten (id) on delete cascade on update cascade,
  zwischenlager boolean default false,
  erhaltungskultur boolean default false,
  von_anzahl_individuen integer default null,
  bemerkungen text default null,
  aktiv boolean default true,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on kultur using btree (id);
create index on kultur using btree (art_id);
create index on kultur using btree (garten_id);
create index on kultur using btree (herkunft_id);
create index on kultur using btree (zwischenlager);
create index on kultur using btree (erhaltungskultur);
create index on kultur using btree (von_anzahl_individuen);
create index on kultur using btree (aktiv);
create index on kultur using gin (tsv);

drop table if exists kultur_file;
create table kultur_file (
  id bigserial primary key,
  kultur_id integer default null references kultur (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null
);
create index on kultur using btree (id);
create index on kultur_file using btree (kultur_id);
create index on kultur_file using btree (file_id);
create index on kultur_file using btree (file_mime_type);

drop table if exists event cascade;
create table event (
  id bigserial primary key,
  kultur_id integer default null references kultur (id) on delete cascade on update cascade,
  datum date default null,
  event text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on event using btree (id);
create index on event using btree (kultur_id);
create index on event using btree (datum);
create index on event using gin (tsv);

drop table if exists teilkultur cascade;
create table teilkultur (
  id bigserial primary key,
  kultur_id integer default null references kultur (id) on delete cascade on update cascade,
  name text default null,
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on teilkultur using btree (id);
create index on teilkultur using btree (kultur_id);
create index on teilkultur using btree (name);
create index on teilkultur using gin (tsv);

drop table if exists aufgabe cascade;
create table aufgabe (
  id bigserial primary key,
  kultur_id integer default null references kultur (id) on delete cascade on update cascade,
  teilkultur_id integer default null references teilkultur (id) on delete set null on update cascade,
  person_id integer default null references person (id) on delete set null on update cascade,
  aufgabe text default null,
  erledigt boolean default false,
  frist date default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on aufgabe using btree (id);
create index on aufgabe using btree (kultur_id);
create index on aufgabe using btree (teilkultur_id);
create index on aufgabe using btree (person_id);
create index on aufgabe using btree (aufgabe);
create index on aufgabe using btree (erledigt);
create index on aufgabe using btree (frist);
create index on aufgabe using gin (tsv);

drop table if exists zaehlung cascade;
create table zaehlung (
  id bigserial primary key,
  kultur_id integer default null references kultur (id) on delete cascade on update cascade,
  datum date default null,
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on zaehlung using btree (id);
create index on zaehlung using btree (kultur_id);
create index on zaehlung using btree (datum);
create index on zaehlung using gin (tsv);

drop table if exists teilzaehlung cascade;
create table teilzaehlung (
  id bigserial primary key,
  zaehlung_id integer default null references zaehlung (id) on delete cascade on update cascade,
  teilkultur_id integer default null references teilkultur (id) on delete set null on update cascade,
  anzahl_pflanzen integer default null,
  anzahl_auspflanzbereit integer default null,
  anzahl_mutterpflanzen integer default null,
  andere_menge text default null,
  auspflanzbereit_beschreibung text default null,
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on teilzaehlung using btree (id);
create index on teilzaehlung using btree (zaehlung_id);
create index on teilzaehlung using btree (teilkultur_id);
create index on teilzaehlung using btree (anzahl_pflanzen);
create index on teilzaehlung using btree (anzahl_auspflanzbereit);
create index on teilzaehlung using btree (anzahl_mutterpflanzen);
create index on teilzaehlung using gin (tsv);

drop table if exists kultur_zaehlung_felder cascade;
create table kultur_zaehlung_felder (
  kultur_id integer unique not null references kultur (id) on delete cascade on update cascade,
  z_bemerkungen boolean default true,
  tz_ort boolean default true,
  tz_anzahl_mutterpflanzen boolean default true,
  tz_andere_menge boolean default true,
  tz_auspflanzbereit_beschreibung boolean default true,
  tz_bemerkungen boolean default true
);
create index on kultur_zaehlung_felder using btree (kultur_id);

drop table if exists lieferung cascade;
create table lieferung (
  id bigserial primary key,
  art_id integer default null references art (id) on delete cascade on update cascade,
  herkunft_id integer default null references herkunft (id) on delete cascade on update cascade,
  person_id integer default null references person (id) on delete cascade on update cascade,
  von_datum date default null,
  von_sammlung_id integer default null references sammlung (id) on delete cascade on update cascade,
  von_kultur_id integer default null references kultur (id) on delete cascade on update cascade,
  nach_datum date default null,
  nach_kultur_id integer default null references kultur (id) on delete cascade on update cascade,
  nach_ausgepflanzt boolean default false,
  von_anzahl_individuen integer default null,
  anzahl_pflanzen integer default null,
  anzahl_auspflanzbereit integer default null,
  gramm_samen integer default null,
  andere_menge text default null,
  ausgefuehrt boolean default false,
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on lieferung using btree (id);
create index on lieferung using btree (person_id);
create index on lieferung using btree (von_sammlung_id);
create index on lieferung using btree (von_kultur_id);
create index on lieferung using btree (nach_kultur_id);
create index on lieferung using btree (von_anzahl_individuen);
create index on lieferung using btree (anzahl_pflanzen);
create index on lieferung using btree (anzahl_auspflanzbereit);
create index on lieferung using btree (gramm_samen);
create index on lieferung using btree (ausgefuehrt);
create index on lieferung using gin (tsv);

drop table if exists lieferung_file;
create table lieferung_file (
  id bigserial primary key,
  lieferung_id integer default null references lieferung (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null
);
create index on lieferung using btree (id);
create index on lieferung_file using btree (lieferung_id);
create index on lieferung_file using btree (file_id);
create index on lieferung_file using btree (file_mime_type);

--alter table lieferung add constraint fk_lieferung_herkunft foreign key (herkunft_id) references herkunft (id) on delete cascade on update cascade;

drop table if exists lieferung_typ_werte cascade;
drop table if exists lieferung_status_werte cascade;
drop table if exists lieferung_zwischenlager_werte cascade;