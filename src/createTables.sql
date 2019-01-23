CREATE EXTENSION if not exists "uuid-ossp";

DROP TABLE IF EXISTS person CASCADE;
CREATE TABLE person (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  nr text default null unique,
  name text DEFAULT NULL,
  adresszusatz text default null,
  strasse text default null,
  plz integer default null,
  ort text default null,
  person text DEFAULT NULL,
  telefon_privat text DEFAULT NULL,
  telefon_geschaeft text DEFAULT NULL,
  telefon_mobile text DEFAULT NULL,
  fax_privat text DEFAULT NULL,
  fax_geschaeft text DEFAULT NULL,
  email text DEFAULT NULL,
  kein_email boolean default false,
  bemerkungen text default null,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null
);
CREATE INDEX ON person USING btree (id);
CREATE INDEX ON person USING btree (name);

DROP TABLE IF EXISTS public.user CASCADE;

DROP TABLE IF EXISTS art CASCADE;
CREATE TABLE art (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  ae_id UUID DEFAULT NULL,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null
);
CREATE INDEX ON art USING btree (id);
CREATE INDEX ON art USING btree (ae_id);

DROP TABLE IF EXISTS herkunft CASCADE;
CREATE TABLE herkunft (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  nr text default null unique,
  lokalname text default null,
  gemeinde text default null,
  kanton text default null,
  land text default null,
  x integer DEFAULT NULL CONSTRAINT zulaessige_x_koordinate CHECK (x IS NULL OR (x > 2485071 AND x < 2828516)),
  y integer DEFAULT NULL CONSTRAINT zulaessige_y_koordinate CHECK (y IS NULL OR (y > 1075346 AND y < 1299942)),
  bemerkungen text default null,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null
);
CREATE INDEX ON herkunft USING btree (id);
CREATE INDEX ON herkunft USING btree (lokalname);

DROP TABLE IF EXISTS zaehleinheit_werte CASCADE;
CREATE TABLE zaehleinheit_werte (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  wert varchar(50) DEFAULT NULL,
  sort smallint DEFAULT NULL,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT NULL
);
CREATE INDEX ON zaehleinheit_werte USING btree (id);
CREATE INDEX ON zaehleinheit_werte USING btree (sort);

DROP TABLE IF EXISTS masseinheit_werte CASCADE;
CREATE TABLE masseinheit_werte (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  wert varchar(50) DEFAULT NULL,
  sort smallint DEFAULT NULL,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT NULL
);
CREATE INDEX ON masseinheit_werte USING btree (id);
CREATE INDEX ON masseinheit_werte USING btree (sort);

DROP TABLE IF EXISTS sammlung CASCADE;
CREATE TABLE sammlung (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  art_id UUID DEFAULT NULL REFERENCES art (id) ON DELETE CASCADE ON UPDATE CASCADE,
  person_id UUID DEFAULT NULL REFERENCES person (id) ON DELETE CASCADE ON UPDATE CASCADE,
  herkunft_id UUID DEFAULT NULL REFERENCES herkunft (id) ON DELETE CASCADE ON UPDATE CASCADE,
  nr text default null unique,
  datum date default null,
  von_anzahl_individuen integer default null,
  zaehleinheit UUID DEFAULT NULL REFERENCES zaehleinheit_werte (id) ON DELETE SET NULL ON UPDATE CASCADE,
  menge integer default null,
  masseinheit UUID DEFAULT NULL REFERENCES masseinheit_werte (id) ON DELETE SET NULL ON UPDATE CASCADE,
  bemerkungen text default null,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null
);
CREATE INDEX ON sammlung USING btree (id);
CREATE INDEX ON sammlung USING btree (art_id);
CREATE INDEX ON sammlung USING btree (person_id);
CREATE INDEX ON sammlung USING btree (herkunft_id);
CREATE INDEX ON sammlung USING btree (datum);

DROP TABLE IF EXISTS kultur_ort CASCADE;
CREATE TABLE kultur_ort (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  person_id UUID DEFAULT NULL REFERENCES person (id) ON DELETE CASCADE ON UPDATE CASCADE,
  x integer DEFAULT NULL CONSTRAINT zulaessige_x_koordinate CHECK (x IS NULL OR (x > 2485071 AND x < 2828516)),
  y integer DEFAULT NULL CONSTRAINT zulaessige_y_koordinate CHECK (y IS NULL OR (y > 1075346 AND y < 1299942)),
  bemerkungen text default null,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null
);
CREATE INDEX ON kultur_ort USING btree (id);
CREATE INDEX ON kultur_ort USING btree (person_id);

DROP TABLE IF EXISTS kultur CASCADE;
CREATE TABLE kultur (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  sammlung_id UUID DEFAULT NULL REFERENCES sammlung (id) ON DELETE CASCADE ON UPDATE CASCADE,
  kultur_ort_id UUID DEFAULT NULL REFERENCES kultur_ort (id) ON DELETE CASCADE ON UPDATE CASCADE,
  bemerkungen text default null,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null,
  unique (sammlung_id, kultur_ort_id)
);
CREATE INDEX ON kultur USING btree (id);
CREATE INDEX ON kultur USING btree (sammlung_id);
CREATE INDEX ON kultur USING btree (kultur_ort_id);

drop table if exists kultur_sammlung cascade;
create table kultur_sammlung (
  sammlung_id UUID DEFAULT NULL REFERENCES sammlung (id) ON DELETE CASCADE ON UPDATE CASCADE,
  kultur_id UUID DEFAULT NULL REFERENCES kultur (id) ON DELETE CASCADE ON UPDATE CASCADE,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null,
  unique (sammlung_id, kultur_id)
);

DROP TABLE IF EXISTS beet CASCADE;

drop table if exists kultur_event cascade;
create table kultur_event (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  datum date DEFAULT NULL,
  event text default null,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null
);
CREATE INDEX ON zaehlung USING btree (id);
CREATE INDEX ON zaehlung USING btree (kultur_id);
CREATE INDEX ON zaehlung USING btree (datum);

drop table if exists kultur_inventar cascade;
create table kultur_inventar (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  kultur_id UUID DEFAULT NULL REFERENCES kultur (id) ON DELETE CASCADE ON UPDATE CASCADE,
  datum date DEFAULT NULL,
  kasten text default null,
  beet text default null,
  nr text default null,
  anzahl_pflanzen integer DEFAULT NULL,
  anz_mutter_pflanzen integer DEFAULT NULL,
  anz_nicht_auspflanzbereit integer DEFAULT NULL,
  anz_auspflanzbereit integer DEFAULT NULL,
  anz_bluehend integer DEFAULT NULL,
  bluehdatum text default null,
  instruktion text default null,
  bemerkungen text default null,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null
);
CREATE INDEX ON zaehlung USING btree (id);
CREATE INDEX ON zaehlung USING btree (kultur_id);
CREATE INDEX ON zaehlung USING btree (datum);

DROP TABLE IF EXISTS zaehlung CASCADE;
CREATE TABLE zaehlung (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  kultur_id UUID DEFAULT NULL REFERENCES kultur (id) ON DELETE CASCADE ON UPDATE CASCADE,
  datum date DEFAULT NULL,
  anzahl_pflanzen integer DEFAULT NULL,
  anz_mutter_pflanzen integer DEFAULT NULL,
  anz_nicht_auspflanzbereit integer DEFAULT NULL,
  anz_auspflanzbereit integer DEFAULT NULL,
  anz_bluehend integer DEFAULT NULL,
  bluehdatum text default null,
  instruktion text default null,
  bemerkungen text default null,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null
);
CREATE INDEX ON zaehlung USING btree (id);
CREATE INDEX ON zaehlung USING btree (kultur_id);
CREATE INDEX ON zaehlung USING btree (datum);

DROP TABLE IF EXISTS bewegung_typ_werte CASCADE;
CREATE TABLE bewegung_typ_werte (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  wert varchar(50) DEFAULT NULL,
  sort smallint DEFAULT NULL,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT NULL
);
CREATE INDEX ON bewegung_typ_werte USING btree (id);
CREATE INDEX ON bewegung_typ_werte USING btree (sort);

DROP TABLE IF EXISTS bewegung_status_werte CASCADE;
CREATE TABLE bewegung_status_werte (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  wert varchar(50) DEFAULT NULL,
  sort smallint DEFAULT NULL,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT NULL
);
CREATE INDEX ON bewegung_status_werte USING btree (id);
CREATE INDEX ON bewegung_status_werte USING btree (sort);

DROP TABLE IF EXISTS bewegung_zwischenlager_werte CASCADE;
CREATE TABLE bewegung_zwischenlager_werte (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  wert varchar(50) DEFAULT NULL,
  sort smallint DEFAULT NULL,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT NULL
);
CREATE INDEX ON bewegung_zwischenlager_werte USING btree (id);
CREATE INDEX ON bewegung_zwischenlager_werte USING btree (sort);

drop table if exists bewegung cascade;
create table bewegung (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  typ UUID DEFAULT NULL REFERENCES bewegung_typ_werte (id) ON DELETE SET NULL ON UPDATE CASCADE,
  zaehleinheit UUID DEFAULT NULL REFERENCES zaehleinheit_werte (id) ON DELETE SET NULL ON UPDATE CASCADE,
  menge integer default null,
  masseinheit UUID DEFAULT NULL REFERENCES masseinheit_werte (id) ON DELETE SET NULL ON UPDATE CASCADE,
  von_datum date default null,
  von_herkunft_id UUID DEFAULT NULL REFERENCES herkunft (id) ON DELETE CASCADE ON UPDATE CASCADE,
  von_kultur_id UUID DEFAULT NULL REFERENCES kultur (id) ON DELETE CASCADE ON UPDATE CASCADE,
  zwischenlager UUID DEFAULT NULL REFERENCES bewegung_zwischenlager_werte (id) ON DELETE SET NULL ON UPDATE CASCADE,
  nach_datum date default null,
  nach_kultur_id UUID DEFAULT NULL REFERENCES kultur (id) ON DELETE CASCADE ON UPDATE CASCADE,
  nach_ausgepflanzt boolean default false,
  status UUID DEFAULT NULL REFERENCES bewegung_status_werte (id) ON DELETE SET NULL ON UPDATE CASCADE,
  bemerkungen text default null,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT NULL
);
CREATE INDEX ON  bewegung USING btree (id);
CREATE INDEX ON  bewegung USING btree (typ);
CREATE INDEX ON  bewegung USING btree (zaehleinheit);
CREATE INDEX ON  bewegung USING btree (masseinheit);
CREATE INDEX ON  bewegung USING btree (von_herkunft_id);
CREATE INDEX ON  bewegung USING btree (von_kultur_id);
CREATE INDEX ON  bewegung USING btree (zwischenlager);
CREATE INDEX ON  bewegung USING btree (nach_kultur_id);
CREATE INDEX ON  bewegung USING btree (status);

-- enable ae as foreign tables
-- see: https://www.percona.com/blog/2018/08/21/foreign-data-wrappers-postgresql-postgres_fdw/

-- on arteigenschaften.ch:
-- postgresql insists on a password. But data is open,
-- so no problem not to use a secure one
CREATE USER fdw_user WITH ENCRYPTED PASSWORD 'secret';
GRANT SELECT ON TABLE ae.v_vermehrung_arten TO fdw_user;

-- on vermehrung
-- need to use this view
-- because joining tables is way too slow
CREATE FOREIGN TABLE ae_art (
  id UUID,
  name text
)
SERVER ae_server OPTIONS (schema_name 'ae', table_name 'v_vermehrung_arten');




