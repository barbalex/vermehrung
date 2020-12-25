--CREATE DATABASE vermehrung encoding 'UTF8';
create extension if not exists "uuid-ossp";
CREATE EXTENSION if not exists postgis;

drop table if exists user_role cascade;
create table user_role (
  id uuid primary key default uuid_generate_v1mc(),
  name text unique,
  label text default null,
  sort integer,
  comment text,
  changed timestamp default now(),
  _rev_at decimal default extract(epoch from now() at time zone 'utc')
);
create index on user_role using btree (id);
create index on user_role using btree (name);
create index on user_role using btree (sort);
create index on user_role using btree (_rev_at);
INSERT INTO user_role (name, sort, comment) VALUES
  ('gaertner', 1, 'liest und editiert Daten des eigenen Garten'),
  ('artverantwortlich', 2, 'liest und editiert Daten für bestimmte Arten'),
  ('manager', 3, 'liest und editiert alle Daten');

drop table if exists person cascade;
create table person (
  id uuid primary key default uuid_generate_v1mc(),
  nr text default null, -- DO NOT set unique - does not work for offline
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
  changed timestamp default now(),
  changed_by text default null,
  account_id text default null,
  user_role_id uuid default null REFERENCES user_role (id) ON DELETE CASCADE ON UPDATE CASCADE,
  kommerziell boolean default false,
  info boolean default false,
  aktiv boolean default true,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
);
create index on person using btree (id);
create index on person using btree (name);
create index on person using btree (vorname);
create index on person using btree (account_id);
create index on person using btree (user_role_id);
create index on person using btree (aktiv);
create index on person using btree (kommerziell);
create index on person using btree (info);
create index on person using btree (_deleted);
create index on person using btree (_rev_at);

drop table if exists person_rev cascade;
create table person_rev (
  id uuid primary key default uuid_generate_v1mc(),
  person_id uuid default null,
  nr text default null, -- DO NOT set unique - does not work for offline
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
  changed timestamp default now(),
  changed_by text default null,
  account_id text default null,
  user_role_id uuid,
  kommerziell boolean default false,
  info boolean default false,
  aktiv boolean default true,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on person_rev using btree (id);
create index on person_rev using btree (person_id);
create index on person_rev using btree (_rev);
create index on person_rev using btree (_parent_rev);
create index on person_rev using btree (_depth);
create index on person_rev using btree (_deleted);
create index on person_rev using btree (_rev_at);

drop table if exists person_file cascade;
create table person_file (
  id uuid primary key default uuid_generate_v1mc(),
  person_id uuid default null references person (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null,
  changed timestamp default now(),
  _rev_at decimal default extract(epoch from now() at time zone 'utc')
);
create index on person_file using btree (id);
create index on person_file using btree (person_id);
create index on person_file using btree (file_id);
create index on person_file using btree (file_mime_type);
create index on person_file using btree (_rev_at);

drop table if exists art cascade;
create table art (
  id uuid primary key default uuid_generate_v1mc(),
  ae_id uuid default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
);
create index on art using btree (id);
create index on art using btree (ae_id);
create index on art using btree (_deleted);
create index on art using btree (_rev_at);

drop table if exists art_rev cascade;
create table art_rev (
  id uuid primary key default uuid_generate_v1mc(),
  art_id uuid default null,
  ae_id uuid default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on art_rev using btree (id);
create index on art_rev using btree (art_id);
create index on art_rev using btree (_rev);
create index on art_rev using btree (_parent_rev);
create index on art_rev using btree (_depth);
create index on art_rev using btree (_deleted);
create index on art_rev using btree (_rev_at);

drop table if exists art_qk cascade;
create table art_qk (
  id uuid primary key default uuid_generate_v1mc(),
  name text unique, -- beware of unique - does not work for offline
  titel text,
  beschreibung text,
  sort smallint default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
);
create index on art_qk using btree (name);
create index on art_qk using btree (titel);
create index on art_qk using btree (sort);
create index on art_qk using btree (_deleted);
create index on art_qk using btree (_rev_at);
comment on column art_qk.name is 'Primärschlüssel. Wird auch in Abfragen und createMessageFunctions benutzt';

drop table if exists art_qk_rev cascade;
create table art_qk_rev (
  id uuid primary key default uuid_generate_v1mc(),
  art_qk_id uuid default null,
  name text,
  titel text,
  beschreibung text,
  sort smallint default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on art_qk_rev using btree (id);
create index on art_qk_rev using btree (_rev);
create index on art_qk_rev using btree (_parent_rev);
create index on art_qk_rev using btree (_depth);
create index on art_qk_rev using btree (_deleted);
create index on art_qk_rev using btree (_rev_at);

-- TODO: drop after changing to new method
drop table if exists art_qk_choosen cascade;
drop table if exists art_qk_choosen_rev cascade;

drop table if exists art_file cascade;
create table art_file (
  id uuid primary key default uuid_generate_v1mc(),
  art_id uuid default null references art (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null,
  changed timestamp default now(),
  _rev_at decimal default extract(epoch from now() at time zone 'utc')
);
create index on art_file using btree (id);
create index on art_file using btree (art_id);
create index on art_file using btree (file_id);
create index on art_file using btree (file_mime_type);
create index on art_file using btree (_rev_at);

drop table if exists herkunft cascade;
create table herkunft (
  id uuid primary key default uuid_generate_v1mc(),
  nr text default null, -- DO NOT set unique - does not work for offline
  lokalname text default null,
  gemeinde text default null,
  kanton text default null,
  land text default null,
  geom_point geometry(Point, 4326) default null,
  wgs84_lat numeric generated always as (case when (st_xmin(geom_point) >= -180 and st_xmax(geom_point) <= 180 and st_ymin(geom_point) >= -90 and st_ymax(geom_point) <= 90) then  st_y(geom_point) end) stored,
  wgs84_long numeric generated always as (case when (st_xmin(geom_point) >= -180 and st_xmax(geom_point) <= 180 and st_ymin(geom_point) >= -90 and st_ymax(geom_point) <= 90) then st_x(geom_point) end) stored,
  lv95_x numeric generated always as (case when (st_xmin(geom_point) >= -180 and st_xmax(geom_point) <= 180 and st_ymin(geom_point) >= -90 and st_ymax(geom_point) <= 90) then round(st_x(st_transform(geom_point, 2056))) end) stored,
  lv95_y numeric generated always as (case when (st_xmin(geom_point) >= -180 and st_xmax(geom_point) <= 180 and st_ymin(geom_point) >= -90 and st_ymax(geom_point) <= 90) then round(st_y(st_transform(geom_point, 2056))) end) stored,
  bemerkungen text default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
);
create index on herkunft using btree (id);
create index on herkunft using btree (nr);
create index on herkunft using btree (gemeinde);
create index on herkunft using btree (lokalname);
create index on herkunft using btree (_deleted);
create index on herkunft using btree (_rev_at);

drop table if exists herkunft_rev cascade;
create table herkunft_rev (
  id uuid primary key default uuid_generate_v1mc(),
  herkunft_id uuid default null,
  nr text default null, -- DO NOT set unique - does not work for offline
  lokalname text default null,
  gemeinde text default null,
  kanton text default null,
  land text default null,
  geom_point geometry(Point, 4326) default null,
  bemerkungen text default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on herkunft_rev using btree (id);
create index on herkunft_rev using btree (herkunft_id);
create index on herkunft_rev using btree (_rev);
create index on herkunft_rev using btree (_parent_rev);
create index on herkunft_rev using btree (_depth);
create index on herkunft_rev using btree (_deleted);
create index on herkunft_rev using btree (_rev_at);

drop table if exists herkunft_file cascade;
create table herkunft_file (
  id uuid primary key default uuid_generate_v1mc(),
  herkunft_id uuid default null references herkunft (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null,
  changed timestamp default now(),
  _rev_at decimal default extract(epoch from now() at time zone 'utc')
);
create index on herkunft_file using btree (id);
create index on herkunft_file using btree (herkunft_id);
create index on herkunft_file using btree (file_id);
create index on herkunft_file using btree (file_mime_type);
create index on herkunft_file using btree (_rev_at);

drop table if exists sammlung cascade;
create table sammlung (
  id uuid primary key default uuid_generate_v1mc(),
  art_id uuid default null references art (id) on delete cascade on update cascade,
  person_id uuid default null references person (id) on delete cascade on update cascade,
  herkunft_id uuid default null references herkunft (id) on delete cascade on update cascade,
  nr text default null, -- DO NOT set unique - does not work for offline
  datum date default null,
  von_anzahl_individuen integer default null,
  anzahl_pflanzen integer default null,
  gramm_samen integer default null,
  andere_menge text default null,
  geom_point geometry(Point, 4326) default null,
  wgs84_lat numeric generated always as (case when (st_xmin(geom_point) >= -180 and st_xmax(geom_point) <= 180 and st_ymin(geom_point) >= -90 and st_ymax(geom_point) <= 90) then  st_y(geom_point) end) stored,
  wgs84_long numeric generated always as (case when (st_xmin(geom_point) >= -180 and st_xmax(geom_point) <= 180 and st_ymin(geom_point) >= -90 and st_ymax(geom_point) <= 90) then st_x(geom_point) end) stored,
  lv95_x numeric generated always as (case when (st_xmin(geom_point) >= -180 and st_xmax(geom_point) <= 180 and st_ymin(geom_point) >= -90 and st_ymax(geom_point) <= 90) then round(st_x(st_transform(geom_point, 2056))) end) stored,
  lv95_y numeric generated always as (case when (st_xmin(geom_point) >= -180 and st_xmax(geom_point) <= 180 and st_ymin(geom_point) >= -90 and st_ymax(geom_point) <= 90) then round(st_y(st_transform(geom_point, 2056))) end) stored,
  geplant boolean default false,
  bemerkungen text default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
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
create index on sammlung using btree (_deleted);
create index on sammlung using btree (_rev_at);

drop table if exists sammlung_rev cascade;
create table sammlung_rev (
  id uuid primary key default uuid_generate_v1mc(),
  sammlung_id uuid default null,
  art_id uuid default null,
  person_id uuid default null,
  herkunft_id uuid default null,
  nr text default null,  -- DO NOT set unique - does not work for offline edits
  datum date default null,
  von_anzahl_individuen integer default null,
  anzahl_pflanzen integer default null,
  gramm_samen integer default null,
  andere_menge text default null,
  geom_point geometry(Point, 4326) default null,
  geplant boolean default false,
  bemerkungen text default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on sammlung_rev using btree (rev_id);
create index on sammlung_rev using btree (id);
create index on sammlung_rev using btree (_rev);
create index on sammlung_rev using btree (_parent_rev);
create index on sammlung_rev using btree (_depth);
create index on sammlung_rev using btree (_deleted);
create index on sammlung_rev using btree (_rev_at);

drop table if exists sammlung_file cascade;
create table sammlung_file (
  id uuid primary key default uuid_generate_v1mc(),
  sammlung_id uuid default null references sammlung (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null,
  changed timestamp default now(),
  _rev_at decimal default extract(epoch from now() at time zone 'utc')
);
create index on sammlung_file using btree (id);
create index on sammlung_file using btree (sammlung_id);
create index on sammlung_file using btree (file_id);
create index on sammlung_file using btree (file_mime_type);
create index on sammlung_file using btree (_rev_at);


drop table if exists garten cascade;
create table garten (
  id uuid primary key default uuid_generate_v1mc(),
  name text default null,
  person_id uuid default null references person (id) on delete cascade on update cascade,
  strasse text default null,
  plz integer default null,
  ort text default null,
  geom_point geometry(Point, 4326) default null,
  wgs84_lat numeric generated always as (case when (st_xmin(geom_point) >= -180 and st_xmax(geom_point) <= 180 and st_ymin(geom_point) >= -90 and st_ymax(geom_point) <= 90) then  st_y(geom_point) end) stored,
  wgs84_long numeric generated always as (case when (st_xmin(geom_point) >= -180 and st_xmax(geom_point) <= 180 and st_ymin(geom_point) >= -90 and st_ymax(geom_point) <= 90) then st_x(geom_point) end) stored,
  lv95_x numeric generated always as (case when (st_xmin(geom_point) >= -180 and st_xmax(geom_point) <= 180 and st_ymin(geom_point) >= -90 and st_ymax(geom_point) <= 90) then round(st_x(st_transform(geom_point, 2056))) end) stored,
  lv95_y numeric generated always as (case when (st_xmin(geom_point) >= -180 and st_xmax(geom_point) <= 180 and st_ymin(geom_point) >= -90 and st_ymax(geom_point) <= 90) then round(st_y(st_transform(geom_point, 2056))) end) stored,
  aktiv boolean default true,
  bemerkungen text default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
);
create index on garten using btree (id);
create index on garten using btree (name);
create index on garten using btree (person_id);
create index on garten using btree (strasse);
create index on garten using btree (plz);
create index on garten using btree (ort);
create index on garten using btree (aktiv);
create index on garten using btree (_deleted);
create index on garten using btree (_rev_at);

drop table if exists garten_rev cascade;
create table garten_rev (
  id uuid primary key default uuid_generate_v1mc(),
  garten_id uuid default null,
  name text default null,
  person_id uuid default null,
  strasse text default null,
  plz integer default null,
  ort text default null,
  geom_point geometry(Point, 4326) default null,
  aktiv boolean default true,
  bemerkungen text default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on garten_rev using btree (rev_id);
create index on garten_rev using btree (id);
create index on garten_rev using btree (_rev);
create index on garten_rev using btree (_parent_rev);
create index on garten_rev using btree (_depth);
create index on garten_rev using btree (_deleted);
create index on garten_rev using btree (_rev_at);

drop table if exists garten_file cascade;
create table garten_file (
  id uuid primary key default uuid_generate_v1mc(),
  garten_id uuid default null references garten (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null,
  changed timestamp default now(),
  _rev_at decimal default extract(epoch from now() at time zone 'utc')
);
create index on garten_file using btree (id);
create index on garten_file using btree (garten_id);
create index on garten_file using btree (file_id);
create index on garten_file using btree (file_mime_type);
create index on garten_file using btree (_rev_at);

drop table if exists kultur cascade;
create table kultur (
  id uuid primary key default uuid_generate_v1mc(),
  art_id uuid default null references art (id) on delete cascade on update cascade,
  herkunft_id uuid default null references herkunft (id) on delete cascade on update cascade,
  garten_id uuid default null references garten (id) on delete cascade on update cascade,
  zwischenlager boolean default false,
  erhaltungskultur boolean default false,
  von_anzahl_individuen integer default null,
  bemerkungen text default null,
  aktiv boolean default true,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
);
create unique index single_art_herkunft_garden_active_idx on kultur (art_id, herkunft_id, garten_id) 
where aktiv is true and zwischenlager is false and art_id is not null and herkunft_id is not null and _deleted is false;
create unique index single_art_herkunft_garden_zwischenlager_active_idx on kultur (art_id, herkunft_id, garten_id, zwischenlager) 
where aktiv is true and zwischenlager is true and art_id is not null and herkunft_id is not null and _deleted is false;
create index on kultur using btree (id);
create index on kultur using btree (art_id);
create index on kultur using btree (herkunft_id);
create index on kultur using btree (garten_id);
create index on kultur using btree (zwischenlager);
create index on kultur using btree (erhaltungskultur);
create index on kultur using btree (von_anzahl_individuen);
create index on kultur using btree (aktiv);
create index on kultur using btree (_deleted);
create index on kultur using btree (_rev_at);

drop table if exists kultur_rev cascade;
create table kultur_rev (
  id uuid primary key default uuid_generate_v1mc(),
  kultur_id uuid default null,
  art_id uuid default null,
  herkunft_id uuid default null,
  garten_id uuid default null,
  zwischenlager boolean default false,
  erhaltungskultur boolean default false,
  von_anzahl_individuen integer default null,
  bemerkungen text default null,
  aktiv boolean default true,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on kultur_rev using btree (rev_id);
create index on kultur_rev using btree (id);
create index on kultur_rev using btree (_rev);
create index on kultur_rev using btree (_parent_rev);
create index on kultur_rev using btree (_depth);
create index on kultur_rev using btree (_deleted);
create index on kultur_rev using btree (_rev_at);

drop table if exists kultur_qk cascade;
create table kultur_qk (
  id uuid default uuid_generate_v1mc(),
  name text primary key,
  titel text,
  beschreibung text,
  sort smallint default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
);
ALTER TABLE kultur_qk DROP CONSTRAINT kultur_qk_pkey;
alter table kultur_qk add primary key (id);
alter table kultur_qk add unique (name);

create index on kultur_qk using btree (id);
create index on kultur_qk using btree (name);
create index on kultur_qk using btree (titel);
create index on kultur_qk using btree (sort);
create index on kultur_qk using btree (_deleted);
create index on kultur_qk using btree (_rev_at);
comment on column kultur_qk.name is 'Primärschlüssel. Wird auch in Abfragen und createMessageFunctions benutzt';

drop table if exists kultur_qk_rev cascade;
create table kultur_qk_rev (
  id uuid default uuid_generate_v1mc(),
  kultur_qk_id uuid default null,
  name text primary key,
  titel text,
  beschreibung text,
  sort smallint default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
);
create index on kultur_qk_rev using btree (id);
create index on kultur_qk_rev using btree (_rev);
create index on kultur_qk_rev using btree (_parent_rev);
create index on kultur_qk_rev using btree (_depth);
create index on kultur_qk_rev using btree (_deleted);
create index on kultur_qk_rev using btree (_rev_at);

-- TODO: drop after changing to new method
drop table if exists kultur_qk_choosen cascade;
create table kultur_qk_choosen (
  id uuid primary key default uuid_generate_v1mc(),
  kultur_id uuid NOT NULL REFERENCES kultur (id) ON DELETE CASCADE ON UPDATE CASCADE,
  qk_id uuid NOT NULL REFERENCES kultur_qk (id) ON DELETE CASCADE ON UPDATE CASCADE,
  choosen boolean default true,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
  -- this created problems in the on conflict clause of the revision trigger
  --unique(id, qk_name)
);
create index on kultur_qk_choosen using btree (id);
create index on kultur_qk_choosen using btree (kultur_id);
create index on kultur_qk_choosen using btree (qk_id);
create index on kultur_qk_choosen using btree (_deleted);
create index on kultur_qk_choosen using btree (_rev_at);

insert into kultur_qk_choosen (kultur_id, qk_name)
select kultur.id, kultur_qk.name
from kultur_qk, kultur
on conflict do nothing;

drop table if exists kultur_qk_choosen_rev cascade;
create table kultur_qk_choosen_rev (
  id uuid primary key default uuid_generate_v1mc(),
  kultur_qk_choosen_id uuid default null,
  -- TODO: remove reference
  kultur_id uuid NOT NULL REFERENCES kultur (id) ON DELETE CASCADE ON UPDATE CASCADE,
  qk_id uuid,
  choosen boolean default true,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on kultur_qk_choosen_rev using btree (id);
create index on kultur_qk_choosen_rev using btree (_rev);
create index on kultur_qk_choosen_rev using btree (_parent_rev);
create index on kultur_qk_choosen_rev using btree (_depth);
create index on kultur_qk_choosen_rev using btree (_deleted);
create index on kultur_qk_choosen_rev using btree (_rev_at);

drop table if exists kultur_file cascade;
create table kultur_file (
  id uuid primary key default uuid_generate_v1mc(),
  kultur_id uuid default null references kultur (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null,
  changed timestamp default now(),
  _rev_at decimal default extract(epoch from now() at time zone 'utc')
);
create index on kultur_file using btree (id);
create index on kultur_file using btree (kultur_id);
create index on kultur_file using btree (file_id);
create index on kultur_file using btree (file_mime_type);
create index on kultur_file using btree (_rev_at);

drop table if exists teilkultur cascade;
create table teilkultur (
  id uuid primary key default uuid_generate_v1mc(),
  kultur_id uuid default null references kultur (id) on delete cascade on update cascade,
  name text default null,
  ort1 text default null,
  ort2 text default null,
  ort3 text default null,
  bemerkungen text default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
);
create index on teilkultur using btree (id);
create index on teilkultur using btree (kultur_id);
create index on teilkultur using btree (name);
create index on teilkultur using btree (_deleted);
create index on teilkultur using btree (_rev_at);

drop table if exists teilkultur_rev cascade;
create table teilkultur_rev (
  id uuid primary key default uuid_generate_v1mc(),
  teilkultur_id uuid default null,
  kultur_id uuid default null,
  name text default null,
  ort1 text default null,
  ort2 text default null,
  ort3 text default null,
  bemerkungen text default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on teilkultur_rev using btree (rev_id);
create index on teilkultur_rev using btree (id);
create index on teilkultur_rev using btree (_rev);
create index on teilkultur_rev using btree (_parent_rev);
create index on teilkultur_rev using btree (_depth);
create index on teilkultur_rev using btree (_deleted);
create index on teilkultur_rev using btree (_rev_at);

drop table if exists event cascade;
create table event (
  id uuid primary key default uuid_generate_v1mc(),
  kultur_id uuid default null references kultur (id) on delete cascade on update cascade,
  teilkultur_id uuid default null references teilkultur (id) on delete set null on update cascade,
  person_id uuid default null references person (id) on delete set null on update cascade,
  beschreibung text default null,
  geplant boolean default false,
  datum date default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
);
create index on event using btree (id);
create index on event using btree (kultur_id);
create index on event using btree (teilkultur_id);
create index on event using btree (person_id);
create index on event using btree (beschreibung);
create index on event using btree (geplant);
create index on event using btree (datum);
create index on event using btree (_deleted);
create index on event using btree (_rev_at);

drop table if exists event_rev cascade;
create table event_rev (
  id uuid primary key default uuid_generate_v1mc(),
  event_id uuid default null,
  kultur_id uuid default null,
  teilkultur_id uuid default null,
  person_id uuid default null,
  beschreibung text default null,
  geplant boolean default false,
  datum date default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on event_rev using btree (rev_id);
create index on event_rev using btree (id);
create index on event_rev using btree (_rev);
create index on event_rev using btree (_parent_rev);
create index on event_rev using btree (_depth);
create index on event_rev using btree (_deleted);
create index on event_rev using btree (_rev_at);

drop table if exists zaehlung cascade;
create table zaehlung (
  id uuid primary key default uuid_generate_v1mc(),
  kultur_id uuid default null references kultur (id) on delete cascade on update cascade,
  datum date default null,
  prognose boolean default false,
  bemerkungen text default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
);
create index on zaehlung using btree (id);
create index on zaehlung using btree (kultur_id);
create index on zaehlung using btree (datum);
create index on zaehlung using btree (prognose);
create index on zaehlung using btree (_deleted);
create index on zaehlung using btree (_rev_at);

drop table if exists zaehlung_rev cascade;
create table zaehlung_rev (
  id uuid primary key default uuid_generate_v1mc(),
  zaehlung_id uuid default null,
  kultur_id uuid default null,
  datum date default null,
  prognose boolean default false,
  bemerkungen text default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on zaehlung_rev using btree (rev_id);
create index on zaehlung_rev using btree (id);
create index on zaehlung_rev using btree (_rev);
create index on zaehlung_rev using btree (_parent_rev);
create index on zaehlung_rev using btree (_depth);
create index on zaehlung_rev using btree (_deleted);
create index on zaehlung_rev using btree (_rev_at);

drop table if exists teilzaehlung cascade;
create table teilzaehlung (
  id uuid primary key default uuid_generate_v1mc(),
  zaehlung_id uuid default null references zaehlung (id) on delete cascade on update cascade,
  teilkultur_id uuid default null references teilkultur (id) on delete set null on update cascade,
  anzahl_pflanzen integer default null,
  anzahl_auspflanzbereit integer default null,
  anzahl_mutterpflanzen integer default null,
  andere_menge text default null,
  auspflanzbereit_beschreibung text default null,
  bemerkungen text default null,
  prognose_von_tz uuid default null references teilzaehlung (id) on delete set null on update cascade,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
);
create index on teilzaehlung using btree (id);
create index on teilzaehlung using btree (prognose_von_tz);
create index on teilzaehlung using btree (zaehlung_id);
create index on teilzaehlung using btree (teilkultur_id);
create index on teilzaehlung using btree (anzahl_pflanzen);
create index on teilzaehlung using btree (anzahl_auspflanzbereit);
create index on teilzaehlung using btree (anzahl_mutterpflanzen);
create index on teilzaehlung using btree (andere_menge);
create index on teilzaehlung using btree (_deleted);
create index on teilzaehlung using btree (_rev_at);

drop table if exists teilzaehlung_rev cascade;
create table teilzaehlung_rev (
  id uuid primary key default uuid_generate_v1mc(),
  teilzaehlung_id uuid default null,
  zaehlung_id uuid default null,
  teilkultur_id uuid default null,
  anzahl_pflanzen integer default null,
  anzahl_auspflanzbereit integer default null,
  anzahl_mutterpflanzen integer default null,
  andere_menge text default null,
  auspflanzbereit_beschreibung text default null,
  bemerkungen text default null,
  prognose_von_tz uuid default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on teilzaehlung_rev using btree (rev_id);
create index on teilzaehlung_rev using btree (id);
create index on teilzaehlung_rev using btree (_rev);
create index on teilzaehlung_rev using btree (_parent_rev);
create index on teilzaehlung_rev using btree (_depth);
create index on teilzaehlung_rev using btree (_deleted);
create index on teilzaehlung_rev using btree (_rev_at);

drop table if exists kultur_option cascade;
create table kultur_option (
  id uuid unique not null references kultur (id) on delete cascade on update cascade,
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
  ev_datum boolean default true,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
);
create index on kultur_option using btree (id);
create index on kultur_option using btree (_deleted);
create index on kultur_option using btree (_rev_at);
COMMENT ON COLUMN kultur_option.tk IS 'opt-in Option für Teilkulturen';

drop table if exists kultur_option_rev cascade;
create table kultur_option_rev (
  id uuid primary key default uuid_generate_v1mc(),
  kultur_id uuid not null,
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
  ev_datum boolean default true,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on kultur_option_rev using btree (id);
create index on kultur_option_rev using btree (kultur_id);
create index on kultur_option_rev using btree (_rev);
create index on kultur_option_rev using btree (_parent_rev);
create index on kultur_option_rev using btree (_depth);
create index on kultur_option_rev using btree (_deleted);
create index on kultur_option_rev using btree (_rev_at);

drop table if exists person_option cascade;
create table person_option (
  id uuid unique not null references person (id) on delete cascade on update cascade,
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
  ku_zwischenlager boolean default false,
  ku_erhaltungskultur boolean default false,
  li_show_sl_felder boolean default false,
  li_show_sl boolean default true,
  sl_show_empty_when_next_to_li boolean default false,
  sl_auto_copy_edits boolean default true,
  tree_kultur boolean default false,
  tree_teilkultur boolean default false,
  tree_zaehlung boolean default false,
  tree_lieferung boolean default false,
  tree_event boolean default false,
  art_qk_choosen text[] default null,
  kultur_qk_choosen text[] default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
);
-- 2020.12.24 refactor choosen qk
alter table person_option add column art_qk_choosen text[] default null;
alter table person_option add column kultur_qk_choosen text[] default null;

create index on person_option using btree (id);
create index on person_option using btree (_deleted);
create index on person_option using btree (_rev_at);
comment on column person_option.sl_show_empty_when_next_to_li is 'Ob in der Sammel-Lieferung leere Felder angezeigt werden (nur wirksam, wenn die Sammel-Lieferung neben einer Lieferung angezeigt wird)';
comment on column person_option.li_show_sl is 'Ob die Sammel-Lieferung neben der Lieferung angezeigt wird';
comment on column person_option.li_show_sl_felder is 'Ob Felder, deren Werte aus der Sammel-Lieferung stammen, sichtbar sind';
comment on column person_option.ar_name_deutsch is 'Dieses Feld wird (momentan) nicht benutzt';

drop table if exists person_option_rev cascade;
create table person_option_rev (
  id uuid primary key default uuid_generate_v1mc(),
  person_id uuid not null,
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
  ku_zwischenlager boolean default false,
  ku_erhaltungskultur boolean default false,
  li_show_sl_felder boolean default false,
  li_show_sl boolean default true,
  sl_show_empty_when_next_to_li boolean default false,
  sl_auto_copy_edits boolean default true,
  tree_kultur boolean default false,
  tree_teilkultur boolean default false,
  tree_zaehlung boolean default false,
  tree_lieferung boolean default false,
  tree_event boolean default false,
  art_qk_choosen text[] default null,
  kultur_qk_choosen text[] default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
-- 2020.12.24 refactor choosen qk
alter table person_option_rev add column art_qk_choosen text[] default null;
alter table person_option_rev add column kultur_qk_choosen text[] default null;

alter table person_option_rev add column ku_zwischenlager boolean default false;
alter table person_option_rev add column ku_erhaltungskultur boolean default false;
create index on person_option_rev using btree (rev_id);
create index on person_option_rev using btree (id);
create index on person_option_rev using btree (_rev);
create index on person_option_rev using btree (_parent_rev);
create index on person_option_rev using btree (_depth);
create index on person_option_rev using btree (_deleted);
create index on person_option_rev using btree (_rev_at);

drop table if exists lieferung cascade;
create table lieferung (
  id uuid primary key default uuid_generate_v1mc(),
  sammel_lieferung_id uuid default null,-- references sammel_lieferung (id) on delete set null on update cascade ,
  art_id uuid default null references art (id) on delete cascade on update cascade,
  person_id uuid default null references person (id) on delete cascade on update cascade,
  von_sammlung_id uuid default null references sammlung (id) on delete cascade on update cascade,
  von_kultur_id uuid default null references kultur (id) on delete cascade on update cascade,
  datum date default null,
  nach_kultur_id uuid default null references kultur (id) on delete cascade on update cascade,
  nach_ausgepflanzt boolean default false,
  von_anzahl_individuen integer default null,
  anzahl_pflanzen integer default null,
  anzahl_auspflanzbereit integer default null,
  gramm_samen integer default null,
  andere_menge text default null,
  geplant boolean default false,
  bemerkungen text default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
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
create index on lieferung using btree (_deleted);
create index on lieferung using btree (_rev_at);

drop table if exists lieferung_rev cascade;
create table lieferung_rev (
  id uuid primary key default uuid_generate_v1mc(),
  lieferung_id uuid default null,
  sammel_lieferung_id uuid default null,
  art_id uuid default null,
  person_id uuid default null,
  von_sammlung_id uuid default null,
  von_kultur_id uuid default null,
  datum date default null,
  nach_kultur_id uuid default null,
  nach_ausgepflanzt boolean default false,
  von_anzahl_individuen integer default null,
  anzahl_pflanzen integer default null,
  anzahl_auspflanzbereit integer default null,
  gramm_samen integer default null,
  andere_menge text default null,
  geplant boolean default false,
  bemerkungen text default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on lieferung_rev using btree (rev_id);
create index on lieferung_rev using btree (id);
create index on lieferung_rev using btree (_rev);
create index on lieferung_rev using btree (_parent_rev);
create index on lieferung_rev using btree (_depth);
create index on lieferung_rev using btree (_deleted);
create index on lieferung_rev using btree (_rev_at);

drop table if exists sammel_lieferung cascade;
create table sammel_lieferung (
  id uuid primary key default uuid_generate_v1mc(),
  art_id uuid default null references art (id) on delete cascade on update cascade,
  person_id uuid default null references person (id) on delete cascade on update cascade,
  von_sammlung_id uuid default null references sammlung (id) on delete cascade on update cascade,
  von_kultur_id uuid default null references kultur (id) on delete cascade on update cascade,
  datum date default null,
  nach_kultur_id uuid default null references kultur (id) on delete cascade on update cascade,
  nach_ausgepflanzt boolean default false,
  von_anzahl_individuen integer default null,
  anzahl_pflanzen integer default null,
  anzahl_auspflanzbereit integer default null,
  gramm_samen integer default null,
  andere_menge text default null,
  geplant boolean default false,
  bemerkungen text default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
);
create index on sammel_lieferung using btree (id);
create index on sammel_lieferung using btree (_deleted);
create index on sammel_lieferung using btree (_rev_at);
-- need to wait with adding this reference until sammel_lieferung was created
alter table lieferung add constraint sammel_lieferung_fk foreign key (sammel_lieferung_id) references sammel_lieferung (id) on delete set null on update cascade;

drop table if exists sammel_lieferung_rev cascade;
create table sammel_lieferung_rev (
  id uuid primary key default uuid_generate_v1mc(),
  sammel_lieferung_id uuid default null,
  art_id uuid default null,
  person_id uuid default null,
  von_sammlung_id uuid default null,
  von_kultur_id uuid default null,
  datum date default null,
  nach_kultur_id uuid default null,
  nach_ausgepflanzt boolean default false,
  von_anzahl_individuen integer default null,
  anzahl_pflanzen integer default null,
  anzahl_auspflanzbereit integer default null,
  gramm_samen integer default null,
  andere_menge text default null,
  geplant boolean default false,
  bemerkungen text default null,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on sammel_lieferung_rev using btree (rev_id);
create index on sammel_lieferung_rev using btree (id);
create index on sammel_lieferung_rev using btree (_rev);
create index on sammel_lieferung_rev using btree (_parent_rev);
create index on sammel_lieferung_rev using btree (_depth);
create index on sammel_lieferung_rev using btree (_deleted);
create index on sammel_lieferung_rev using btree (_rev_at);

drop table if exists lieferung_file cascade;
create table lieferung_file (
  id uuid primary key default uuid_generate_v1mc(),
  lieferung_id uuid default null references lieferung (id) on delete cascade on update cascade,
  file_id uuid default null,
  file_mime_type text default null,
  name text default null,
  beschreibung text default null,
  changed timestamp default now(),
  _rev_at decimal default extract(epoch from now() at time zone 'utc')
);
create index on lieferung_file using btree (id);
create index on lieferung_file using btree (lieferung_id);
create index on lieferung_file using btree (file_id);
create index on lieferung_file using btree (file_mime_type);
create index on lieferung_file using btree (_rev_at);

drop table if exists av cascade;
create table av (
  id uuid primary key default uuid_generate_v1mc(),
  art_id uuid default null REFERENCES art (id) ON DELETE CASCADE ON UPDATE CASCADE,
  person_id uuid references person (id) on delete cascade on update cascade,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
  -- this created problems in the on conflict clause of the revision trigger
  --unique (person_id, art_id)
);
create index on av using btree (id);
create index on av using btree (art_id);
create index on av using btree (person_id);
create index on av using btree (_deleted);
create index on av using btree (_rev_at);
ALTER TABLE public.av DROP CONSTRAINT av_person_id_art_id_key;

drop table if exists av_rev cascade;
create table av_rev (
  id uuid primary key default uuid_generate_v1mc(),
  av_id uuid default null,
  art_id uuid default null,
  person_id uuid,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on av_rev using btree (id);
create index on av_rev using btree (_rev);
create index on av_rev using btree (_parent_rev);
create index on av_rev using btree (_depth);
create index on av_rev using btree (_deleted);
create index on av_rev using btree (_rev_at);

drop table if exists gv cascade;
create table gv (
  id uuid primary key default uuid_generate_v1mc(),
  garten_id uuid default null REFERENCES garten (id) ON DELETE CASCADE ON UPDATE CASCADE,
  person_id uuid references person (id) on delete cascade on update cascade,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false,
  _conflicts text[] default null
  -- this created problems in the on conflict clause of the revision trigger
  -- unique (person_id, garten_id) 
);
create index on gv using btree (id);
create index on gv using btree (garten_id);
create index on gv using btree (person_id);
create index on gv using btree (_deleted);
create index on gv using btree (_rev_at);

ALTER TABLE public.gv DROP CONSTRAINT gv_person_id_garten_id_key;

drop table if exists gv_rev cascade;
create table gv_rev (
  id uuid primary key default uuid_generate_v1mc(),
  gv_id uuid default null,
  garten_id uuid default null,
  person_id uuid,
  changed timestamp default now(),
  changed_by text default null,
  _rev text default null,
  _rev_at decimal default extract(epoch from now() at time zone 'utc'),
  _parent_rev text default null,
  _revisions text[] default null,
  _depth integer default 1,
  _deleted boolean default false
);
create index on gv_rev using btree (id);
create index on gv_rev using btree (_rev);
create index on gv_rev using btree (_parent_rev);
create index on gv_rev using btree (_depth);
create index on gv_rev using btree (_deleted);
create index on gv_rev using btree (_rev_at);