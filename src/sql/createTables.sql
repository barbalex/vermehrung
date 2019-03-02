create extension if not exists "uuid-ossp";

drop table if exists person cascade;
create table person (
  id serial primary key,
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
  user_id uuid default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on person using btree (id);
create index on person using btree (name);
--alter table person add column tsv tsvector;
create index on person using gin (tsv);

drop table if exists art cascade;
create table art (
  id serial primary key,
  ae_id uuid default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on art using btree (id);
create index on art using btree (ae_id);
--alter table art add column tsv tsvector;
create index on art using gin (tsv);

drop table if exists herkunft cascade;
create table herkunft (
  id serial primary key,
  nr text default null unique,
  lokalname text default null,
  gemeinde text default null,
  kanton text default null,
  land text default null,
  x integer default null constraint zulaessige_x_koordinate check (x is null or (x > 2485071 and x < 2828516)),
  y integer default null constraint zulaessige_y_koordinate check (y is null or (y > 1075346 and y < 1299942)),
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on herkunft using btree (id);
create index on herkunft using btree (lokalname);
--alter table herkunft add column tsv tsvector;
create index on herkunft using gin (tsv);

drop table if exists sammlung cascade;
create table sammlung (
  id serial primary key,
  art_id integer default null references art (id) on delete cascade on update cascade,
  person_id integer default null references person (id) on delete cascade on update cascade,
  herkunft_id integer default null references herkunft (id) on delete cascade on update cascade,
  nr text default null unique,
  datum date default null,
  von_anzahl_individuen integer default null,
  zaehleinheit integer default null references zaehleinheit_werte (id) on delete set null on update cascade,
  menge integer default null,
  masseinheit integer default null references masseinheit_werte (id) on delete set null on update cascade,
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
--alter table sammlung add column tsv tsvector;
create index on sammlung using gin (tsv);

drop table if exists garten cascade;
create table garten (
  id serial primary key,
  person_id integer default null references person (id) on delete cascade on update cascade,
  x integer default null constraint zulaessige_x_koordinate check (x is null or (x > 2485071 and x < 2828516)),
  y integer default null constraint zulaessige_y_koordinate check (y is null or (y > 1075346 and y < 1299942)),
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on garten using btree (id);
create index on garten using btree (person_id);
--alter table garten add column tsv tsvector;
create index on garten using gin (tsv);

drop table if exists kultur cascade;
create table kultur (
  id serial primary key,
  art_id integer default null references art (id) on delete cascade on update cascade,
  garten_id integer default null references garten (id) on delete cascade on update cascade,
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  unique(art_id,garten_id),
  tsv tsvector
);
create index on kultur using btree (id);
create index on kultur using btree (garten_id);
alter table kultur add constraint unique_art_garten unique(art_id,garten_id);
--alter table kultur add column tsv tsvector;
create index on kultur using gin (tsv);

drop table if exists kultur_event cascade;
create table kultur_event (
  id serial primary key,
  kultur_id integer default null references kultur (id) on delete cascade on update cascade,
  datum date default null,
  event text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on kultur_event using btree (id);
create index on kultur_event using btree (kultur_id);
create index on kultur_event using btree (datum);
--alter table kultur_event add column tsv tsvector;
create index on kultur_event using gin (tsv);

drop table if exists kultur_inventar cascade;
create table kultur_inventar (
  id serial primary key,
  kultur_id integer default null references kultur (id) on delete cascade on update cascade,
  datum date default null,
  kasten text default null,
  beet text default null,
  nr text default null,
  anzahl_pflanzen integer default null,
  anz_mutter_pflanzen integer default null,
  anz_nicht_auspflanzbereit integer default null,
  anz_auspflanzbereit integer default null,
  anz_bluehend integer default null,
  bluehdatum text default null,
  instruktion text default null,
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on kultur_inventar using btree (id);
create index on kultur_inventar using btree (kultur_id);
create index on kultur_inventar using btree (datum);
--alter table kultur_inventar add column tsv tsvector;
create index on kultur_inventar using gin (tsv);

drop table if exists zaehlung cascade;
create table zaehlung (
  id serial primary key,
  kultur_id integer default null references kultur (id) on delete cascade on update cascade,
  datum date default null,
  anzahl_pflanzen integer default null,
  anz_mutter_pflanzen integer default null,
  anz_nicht_auspflanzbereit integer default null,
  anz_auspflanzbereit integer default null,
  anz_bluehend integer default null,
  bluehdatum text default null,
  instruktion text default null,
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on zaehlung using btree (id);
create index on zaehlung using btree (kultur_id);
create index on zaehlung using btree (datum);
--alter table zaehlung add column tsv tsvector;
create index on zaehlung using gin (tsv);

drop table if exists lieferung cascade;
create table lieferung (
  id serial primary key,
  art_id integer default null references art (id) on delete cascade on update cascade,
  person_id integer default null references person (id) on delete cascade on update cascade,
  typ integer default null references lieferung_typ_werte (id) on delete set null on update cascade,
  zaehleinheit integer default null references zaehleinheit_werte (id) on delete set null on update cascade,
  menge integer default null,
  masseinheit integer default null references masseinheit_werte (id) on delete set null on update cascade,
  von_datum date default null,
  von_sammlung_id integer default null references sammlung (id) on delete cascade on update cascade,
  von_kultur_id integer default null references kultur (id) on delete cascade on update cascade,
  zwischenlager integer default null references lieferung_zwischenlager_werte (id) on delete set null on update cascade,
  nach_datum date default null,
  nach_kultur_id integer default null references kultur (id) on delete cascade on update cascade,
  nach_ausgepflanzt boolean default false,
  status integer default null references lieferung_status_werte (id) on delete set null on update cascade,
  bemerkungen text default null,
  changed date default now(),
  changed_by varchar(20) default null,
  tsv tsvector
);
create index on lieferung using btree (id);
create index on lieferung using btree (person_id);
create index on lieferung using btree (typ);
create index on lieferung using btree (zaehleinheit);
create index on lieferung using btree (masseinheit);
create index on lieferung using btree (von_sammlung_id);
create index on lieferung using btree (von_kultur_id);
create index on lieferung using btree (zwischenlager);
create index on lieferung using btree (nach_kultur_id);
create index on lieferung using btree (status);
--alter table lieferung add column tsv tsvector;
create index on lieferung using gin (tsv);

drop table if exists zaehleinheit_werte cascade;
create table zaehleinheit_werte (
  id serial primary key,
  wert varchar(50) default null,
  sort smallint default null,
  changed date default now(),
  changed_by varchar(20) default null
);
create index on zaehleinheit_werte using btree (id);
create index on zaehleinheit_werte using btree (sort);

drop table if exists masseinheit_werte cascade;
create table masseinheit_werte (
  id serial primary key,
  wert varchar(50) default null,
  sort smallint default null,
  changed date default now(),
  changed_by varchar(20) default null
);
create index on masseinheit_werte using btree (id);
create index on masseinheit_werte using btree (sort);

drop table if exists lieferung_typ_werte cascade;
create table lieferung_typ_werte (
  id serial primary key,
  wert varchar(50) default null,
  sort smallint default null,
  changed date default now(),
  changed_by varchar(20) default null
);
create index on lieferung_typ_werte using btree (id);
create index on lieferung_typ_werte using btree (sort);

drop table if exists lieferung_status_werte cascade;
create table lieferung_status_werte (
  id serial primary key,
  wert varchar(50) default null,
  sort smallint default null,
  changed date default now(),
  changed_by varchar(20) default null
);
create index on lieferung_status_werte using btree (id);
create index on lieferung_status_werte using btree (sort);

drop table if exists lieferung_zwischenlager_werte cascade;
create table lieferung_zwischenlager_werte (
  id serial primary key,
  wert varchar(50) default null,
  sort smallint default null,
  changed date default now(),
  changed_by varchar(20) default null
);
create index on lieferung_zwischenlager_werte using btree (id);
create index on lieferung_zwischenlager_werte using btree (sort);