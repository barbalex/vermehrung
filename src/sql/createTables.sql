create extension if not exists "uuid-ossp";
CREATE EXTENSION if not exists postgis;

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
  email text default null,
  kein_email boolean default false,
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector,
  account_id text default null,
  user_role text default null references user_role (value) on delete set null on update cascade,
  kommerziell boolean default false,
  info boolean default false,
  aktiv boolean default true
);
--alter table person add column user_role text default null references user_role (value) on delete set null on update cascade;
create index on person using btree (id);
create index on person using btree (name);
create index on person using btree (account_id);
create index on person using btree (aktiv);
create index on person using btree (kommerziell);
create index on person using btree (info);
create index on person using gin (tsv);

drop table if exist user_role cascade;
create table user_role (
  id text primary key,
  name text,
  sort integer,
  comment text
);
create index on user_role using btree (id);
create index on user_role using btree (name);
create index on user_role using btree (sort);
INSERT INTO user_role (id, name, sort, comment) VALUES
  ('rol_0eMVfAl4o3f5q8ab', 'gaertner', 1, 'liest und editiert Daten des eigenen Garten'),
  ('rol_Jsk4O8Lun0V5OEs6', 'artverantwortlich', 2, 'liest und editiert Daten für bestimmte Arten'),
  ('rol_mImJOLKj390Murkh', 'manager', 3, 'liest und editiert alle Daten');

drop table if exists person_file;
create table person_file (
  id bigserial primary key,
  person_id bigint default null references person (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null
);
create index on person_file using btree (id);
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

drop table if exists art_qk;
create table art_qk (
  name text primary key,
  titel text,
  beschreibung text,
  sort smallint default null
);
create index on art_qk using btree (name);
create index on art_qk using btree (titel);
create index on art_qk using btree (sort);
comment on column art_qk.name is 'Primärschlüssel. Wird auch in Abfragen und createMessageFunctions benutzt';

drop table if exists art_qk_choosen;
create table art_qk_choosen (
  art_id bigserial NOT NULL REFERENCES art (id) ON DELETE CASCADE ON UPDATE CASCADE,
  qk_name text NOT NULL REFERENCES art_qk (name) ON DELETE CASCADE ON UPDATE CASCADE,
  unique(art_id, qk_name)
);
create index on art_qk_choosen using btree (art_id);
create index on art_qk_choosen using btree (qk_name);

drop table if exists art_file;
create table art_file (
  id bigserial primary key,
  art_id bigint default null references art (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null
);
create index on art_file using btree (id);
create index on art_file using btree (art_id);
create index on art_file using btree (file_id);
create index on art_file using btree (file_mime_type);

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
create index on herkunft using btree (nr);
create index on herkunft using btree (gemeinde);
create index on herkunft using btree (lokalname);
create index on herkunft using gin (tsv);

drop table if exists herkunft_file;
create table herkunft_file (
  id bigserial primary key,
  herkunft_id bigint default null references herkunft (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null
);
create index on herkunft_file using btree (id);
create index on herkunft_file using btree (herkunft_id);
create index on herkunft_file using btree (file_id);
create index on herkunft_file using btree (file_mime_type);

drop table if exists sammlung cascade;
create table sammlung (
  id bigserial primary key,
  art_id bigint default null references art (id) on delete cascade on update cascade,
  person_id bigint default null references person (id) on delete cascade on update cascade,
  herkunft_id bigint default null references herkunft (id) on delete cascade on update cascade,
  nr text default null unique,
  datum date default null,
  von_anzahl_individuen integer default null,
  anzahl_pflanzen integer default null,
  gramm_samen integer default null,
  andere_menge text default null,
  geplant boolean default false,
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on sammlung using btree (id);
create index on sammlung using btree (art_id);
create index on sammlung using btree (person_id);
create index on sammlung using btree (herkunft_id);
create index on sammlung using btree (nr);
create index on sammlung using btree (datum);
create index on sammlung using btree (anzahl_pflanzen);
create index on sammlung using btree (gramm_samen);
create index on sammlung using btree (geplant);
create index on sammlung using gin (tsv);

drop table if exists sammlung_file;
create table sammlung_file (
  id bigserial primary key,
  sammlung_id bigint default null references sammlung (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null
);
create index on sammlung_file using btree (id);
create index on sammlung_file using btree (sammlung_id);
create index on sammlung_file using btree (file_id);
create index on sammlung_file using btree (file_mime_type);

drop table if exists garten cascade;
create table garten (
  id bigserial primary key,
  name text default null,
  person_id bigint default null references person (id) on delete cascade on update cascade,
  strasse text default null,
  plz integer default null,
  ort text default null,
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
create index on garten using btree (strasse);
create index on garten using btree (plz);
create index on garten using btree (ort);
create index on garten using btree (aktiv);
create index on garten using gin (tsv);

drop table if exists garten_file;
create table garten_file (
  id bigserial primary key,
  garten_id bigint default null references garten (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null
);
create index on garten_file using btree (id);
create index on garten_file using btree (garten_id);
create index on garten_file using btree (file_id);
create index on garten_file using btree (file_mime_type);

drop table if exists kultur cascade;
create table kultur (
  id bigserial primary key,
  art_id bigint default null references art (id) on delete cascade on update cascade,
  herkunft_id bigint default null references herkunft (id) on delete cascade on update cascade,
  garten_id bigint default null references garten (id) on delete cascade on update cascade,
  zwischenlager boolean default false,
  erhaltungskultur boolean default false,
  von_anzahl_individuen integer default null,
  bemerkungen text default null,
  aktiv boolean default true,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index single_active_herkunft_per_art_and_garden_idx on kultur (art_id, herkunft_id, garten_id) where aktiv is true;
create index on kultur using btree (id);
create index on kultur using btree (art_id);
create index on kultur using btree (herkunft_id);
create index on kultur using btree (garten_id);
create index on kultur using btree (zwischenlager);
create index on kultur using btree (erhaltungskultur);
create index on kultur using btree (von_anzahl_individuen);
create index on kultur using btree (aktiv);
create index on kultur using gin (tsv);

drop table if exists kultur_qk;
create table kultur_qk (
  name text primary key,
  titel text,
  beschreibung text,
  sort smallint default null
);
create index on kultur_qk using btree (name);
create index on kultur_qk using btree (titel);
create index on kultur_qk using btree (sort);
comment on column kultur_qk.name is 'Primärschlüssel. Wird auch in Abfragen und createMessageFunctions benutzt';

drop table if exists kultur_qk_choosen;
create table kultur_qk_choosen (
  kultur_id bigserial NOT NULL REFERENCES kultur (id) ON DELETE CASCADE ON UPDATE CASCADE,
  qk_name text NOT NULL REFERENCES kultur_qk (name) ON DELETE CASCADE ON UPDATE CASCADE,
  unique(kultur_id, qk_name)
);
create index on kultur_qk_choosen using btree (kultur_id);
create index on kultur_qk_choosen using btree (qk_name);

drop table if exists kultur_file;
create table kultur_file (
  id bigserial primary key,
  kultur_id bigint default null references kultur (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null
);
create index on kultur_file using btree (id);
create index on kultur_file using btree (kultur_id);
create index on kultur_file using btree (file_id);
create index on kultur_file using btree (file_mime_type);

drop table if exists teilkultur cascade;
create table teilkultur (
  id bigserial primary key,
  kultur_id bigint default null references kultur (id) on delete cascade on update cascade,
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

drop table if exists event cascade;
create table event (
  id bigserial primary key,
  kultur_id bigint default null references kultur (id) on delete cascade on update cascade,
  teilkultur_id bigint default null references teilkultur (id) on delete set null on update cascade,
  person_id bigint default null references person (id) on delete set null on update cascade,
  beschreibung text default null,
  geplant boolean default false,
  datum date default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on event using btree (id);
create index on event using btree (kultur_id);
create index on event using btree (teilkultur_id);
create index on event using btree (person_id);
create index on event using btree (beschreibung);
create index on event using btree (geplant);
create index on event using btree (datum);
create index on event using gin (tsv);

drop table if exists zaehlung cascade;
-- TODO: remove geplant
create table zaehlung (
  id bigserial primary key,
  kultur_id bigint default null references kultur (id) on delete cascade on update cascade,
  datum date default null,
  ziel boolean default false,
  prognose boolean default false,
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on zaehlung using btree (id);
create index on zaehlung using btree (kultur_id);
create index on zaehlung using btree (datum);
create index on zaehlung using btree (ziel);
create index on zaehlung using btree (prognose);
create index on zaehlung using gin (tsv);

drop table if exists teilzaehlung cascade;
create table teilzaehlung (
  id bigserial primary key,
  zaehlung_id bigint default null references zaehlung (id) on delete cascade on update cascade,
  teilkultur_id bigint default null references teilkultur (id) on delete set null on update cascade,
  anzahl_pflanzen integer default null,
  anzahl_auspflanzbereit integer default null,
  anzahl_mutterpflanzen integer default null,
  andere_menge text default null,
  auspflanzbereit_beschreibung text default null,
  bemerkungen text default null,
  prognose_von_tz bigint default null references teilzaehlung (id) on delete set null on update cascade,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on teilzaehlung using btree (id);
create index on teilzaehlung using btree (prognose_von_tz);
create index on teilzaehlung using btree (zaehlung_id);
create index on teilzaehlung using btree (teilkultur_id);
create index on teilzaehlung using btree (anzahl_pflanzen);
create index on teilzaehlung using btree (anzahl_auspflanzbereit);
create index on teilzaehlung using btree (anzahl_mutterpflanzen);
create index on teilzaehlung using btree (andere_menge);
create index on teilzaehlung using gin (tsv);

drop table if exists kultur_option cascade;
create table kultur_option (
  kultur_id bigint unique not null references kultur (id) on delete cascade on update cascade,
  z_bemerkungen boolean default true,
  tz_teilkultur_id boolean default true,
  tz_anzahl_mutterpflanzen boolean default true,
  tz_andere_menge boolean default true,
  tz_auspflanzbereit_beschreibung boolean default true,
  tz_bemerkungen boolean default true,
  tk boolean default false,
  tk_bemerkungen boolean default true,
  ev_teilkultur_id boolean default true,
  ev_geplant boolean default true,
  ev_person_id boolean default true,
  ev_datum boolean default true
);
create index on kultur_option using btree (kultur_id);
COMMENT ON COLUMN kultur_option.tk IS 'opt-in Option für Teilkulturen';

drop table if exists person_option cascade;
create table person_option (
  person_id bigint unique not null references person (id) on delete cascade on update cascade,
  ar_name_deutsch boolean default true,  -- not in use
  ga_strasse boolean default true,
  ga_plz boolean default true,
  ga_ort boolean default true,
  ga_geom_point boolean default true,
  ga_lat_lng boolean default true,
  ga_aktiv boolean default true,
  ga_bemerkungen boolean default true,
  hk_kanton boolean default true,
  hk_land boolean default true,
  hk_bemerkungen boolean default true,
  hk_geom_point boolean default true,
  li_show_sl_felder boolean default false,
  li_show_sl boolean default true,
  sl_show_empty_when_next_to_li boolean default false,
  sl_auto_copy_edits boolean default true,
  tree_kultur boolean default false,
  tree_teilkultur boolean default false,
  tree_zaehlung boolean default false,
  tree_lieferung boolean default false,
  tree_event boolean default false
);
create index on person_option using btree (person_id);
comment on column person_option.sl_show_empty_when_next_to_li is 'Ob in der Sammel-Lieferung leere Felder angezeigt werden (nur wirksam, wenn die Sammel-Lieferung neben einer Lieferung angezeigt wird)';
comment on column person_option.li_show_sl is 'Ob die Sammel-Lieferung neben der Lieferung angezeigt wird';
comment on column person_option.li_show_sl_felder is 'Ob Felder, deren Werte aus der Sammel-Lieferung stammen, sichtbar sind';
comment on column person_option.ar_name_deutsch is 'Dieses Feld wird (momentan) nicht benutzt';

drop table if exists lieferung cascade;
create table lieferung (
  id bigserial primary key,
  sammel_lieferung_id bigint default null,-- references sammel_lieferung (id) on delete set null on update cascade ,
  art_id bigint default null references art (id) on delete cascade on update cascade,
  person_id bigint default null references person (id) on delete cascade on update cascade,
  von_sammlung_id bigint default null references sammlung (id) on delete cascade on update cascade,
  von_kultur_id bigint default null references kultur (id) on delete cascade on update cascade,
  datum date default null,
  nach_kultur_id bigint default null references kultur (id) on delete cascade on update cascade,
  nach_ausgepflanzt boolean default false,
  von_anzahl_individuen integer default null,
  anzahl_pflanzen integer default null,
  anzahl_auspflanzbereit integer default null,
  gramm_samen integer default null,
  andere_menge text default null,
  geplant boolean default false,
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on lieferung using btree (id);
create index on lieferung using btree (sammel_lieferung_id);
create index on lieferung using btree (art_id);
create index on lieferung using btree (person_id);
create index on lieferung using btree (von_sammlung_id);
create index on lieferung using btree (von_kultur_id);
create index on lieferung using btree (nach_kultur_id);
create index on lieferung using btree (datum);
create index on lieferung using btree (nach_ausgepflanzt);
create index on lieferung using btree (von_anzahl_individuen);
create index on lieferung using btree (anzahl_pflanzen);
create index on lieferung using btree (anzahl_auspflanzbereit);
create index on lieferung using btree (gramm_samen);
create index on lieferung using btree (andere_menge);
create index on lieferung using btree (geplant);
create index on lieferung using gin (tsv);

drop table if exists sammel_lieferung cascade;
create table sammel_lieferung (
  id bigserial primary key,
  art_id bigint default null references art (id) on delete cascade on update cascade,
  person_id bigint default null references person (id) on delete cascade on update cascade,
  von_sammlung_id bigint default null references sammlung (id) on delete cascade on update cascade,
  von_kultur_id bigint default null references kultur (id) on delete cascade on update cascade,
  datum date default null,
  nach_kultur_id bigint default null references kultur (id) on delete cascade on update cascade,
  nach_ausgepflanzt boolean default false,
  von_anzahl_individuen integer default null,
  anzahl_pflanzen integer default null,
  anzahl_auspflanzbereit integer default null,
  gramm_samen integer default null,
  andere_menge text default null,
  geplant boolean default false,
  bemerkungen text default null
);
create index on lieferung using btree (id);
-- need to wait with adding this reference until sammel_lieferung was created
alter table lieferung add constraint sammel_lieferung_fk foreign key (sammel_lieferung_id) references sammel_lieferung (id) on delete set null on update cascade;

drop table if exists lieferung_file;
create table lieferung_file (
  id bigserial primary key,
  lieferung_id bigint default null references lieferung (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null
);
create index on lieferung_file using btree (id);
create index on lieferung_file using btree (lieferung_id);
create index on lieferung_file using btree (file_id);
create index on lieferung_file using btree (file_mime_type);

drop table if exists av_art;
create table av_art (
  art_id bigserial REFERENCES art (id) ON DELETE CASCADE ON UPDATE CASCADE,
  person_id bigint references person (id) on delete cascade on update cascade,
  primary key (person_id, art_id)
);
create index on av_art using btree (art_id);
create index on av_art using btree (person_id);

ALTER TABLE ONLY av_art ALTER COLUMN art_id SET DEFAULT null;
