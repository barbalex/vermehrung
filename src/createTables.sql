CREATE EXTENSION if not exists "uuid-ossp";

DROP TABLE IF EXISTS person CASCADE;
CREATE TABLE person (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  name text DEFAULT NULL,
  person text DEFAULT NULL,
  telefon text DEFAULT NULL,
  email text DEFAULT NULL,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null
);
CREATE INDEX ON person USING btree (id);
CREATE INDEX ON person USING btree (name);
COMMENT ON COLUMN person.id IS 'Primärschlüssel';
COMMENT ON COLUMN person.name IS 'Vor- und Nachname';
COMMENT ON COLUMN person.person IS 'Strasse, PLZ und Ort';
COMMENT ON COLUMN person.telefon IS 'Telefonnummer';
COMMENT ON COLUMN person.email IS 'Email';
COMMENT ON COLUMN person.changed IS 'Wann wurde der Datensatz zuletzt geändert?';
COMMENT ON COLUMN person.changed_by IS 'Von wem wurde der Datensatz zuletzt geändert?';

DROP TABLE IF EXISTS public.user CASCADE;
CREATE TABLE public.user (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  name text UNIQUE,
  -- allow other attributes to be null
  -- so names and roles can be set beforehand by topos
  email text UNIQUE default null,
  role name DEFAULT NULL,
  pass text DEFAULT NULL,
  person_id uuid DEFAULT NULL REFERENCES person (id) ON DELETE SET NULL ON UPDATE CASCADE,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null,
  CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
  constraint role_length_maximum_512 check (length(role) < 512),
  constraint pass_length_minimum_6 check (length(pass) > 5)
);
CREATE INDEX ON public.user USING btree (id);
CREATE INDEX ON public.user USING btree (name);
CREATE INDEX ON public.user USING btree (person_id);
COMMENT ON COLUMN public.user.person_id IS 'Datensatz bzw. Fremdschlüssel des Users in der Tabelle "person"';

DROP TABLE IF EXISTS art CASCADE;
CREATE TABLE art (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  ae_id UUID DEFAULT NULL,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null
);
CREATE INDEX ON art USING btree (id);
CREATE INDEX ON art USING btree (ae_id);

DROP TABLE IF EXISTS s_ort CASCADE;
CREATE TABLE s_ort (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  name text default null,
  x integer DEFAULT NULL CONSTRAINT zulaessige_x_koordinate CHECK (x IS NULL OR (x > 2485071 AND x < 2828516)),
  y integer DEFAULT NULL CONSTRAINT zulaessige_y_koordinate CHECK (y IS NULL OR (y > 1075346 AND y < 1299942)),
  bemerkungen text default null,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null
);
CREATE INDEX ON s_ort USING btree (id);
CREATE INDEX ON s_ort USING btree (name);

DROP TABLE IF EXISTS sammlung CASCADE;
CREATE TABLE sammlung (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  art_id UUID DEFAULT NULL REFERENCES art (id) ON DELETE CASCADE ON UPDATE CASCADE,
  person_id UUID DEFAULT NULL REFERENCES person (id) ON DELETE CASCADE ON UPDATE CASCADE,
  s_ort_id UUID DEFAULT NULL REFERENCES s_ort (id) ON DELETE CASCADE ON UPDATE CASCADE,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null
);
CREATE INDEX ON sammlung USING btree (id);
CREATE INDEX ON sammlung USING btree (art_id);
CREATE INDEX ON sammlung USING btree (person_id);
CREATE INDEX ON sammlung USING btree (s_ort_id);

DROP TABLE IF EXISTS v_ort CASCADE;
CREATE TABLE v_ort (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  person_id UUID DEFAULT NULL REFERENCES person (id) ON DELETE CASCADE ON UPDATE CASCADE,
  x integer DEFAULT NULL CONSTRAINT zulaessige_x_koordinate CHECK (x IS NULL OR (x > 2485071 AND x < 2828516)),
  y integer DEFAULT NULL CONSTRAINT zulaessige_y_koordinate CHECK (y IS NULL OR (y > 1075346 AND y < 1299942)),
  bemerkungen text default null,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null
);
CREATE INDEX ON v_ort USING btree (id);
CREATE INDEX ON v_ort USING btree (person_id);

DROP TABLE IF EXISTS kultur CASCADE;
CREATE TABLE kultur (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  sammlung_id UUID DEFAULT NULL REFERENCES sammlung (id) ON DELETE CASCADE ON UPDATE CASCADE,
  v_ort_id UUID DEFAULT NULL REFERENCES v_ort (id) ON DELETE CASCADE ON UPDATE CASCADE,
  bemerkungen text default null,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null,
  unique (sammlung_id, v_ort_id)
);
CREATE INDEX ON kultur USING btree (id);
CREATE INDEX ON kultur USING btree (sammlung_id);
CREATE INDEX ON kultur USING btree (v_ort_id);

DROP TABLE IF EXISTS beet CASCADE;
CREATE TABLE beet (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  kultur_id UUID DEFAULT NULL REFERENCES kultur (id) ON DELETE CASCADE ON UPDATE CASCADE,
  bemerkungen text default null,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null
);
CREATE INDEX ON beet USING btree (id);
CREATE INDEX ON beet USING btree (kultur_id);

DROP TABLE IF EXISTS zaehlung_einheit_werte;
CREATE TABLE zaehlung_einheit_werte (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  code integer UNIQUE DEFAULT NULL,
  text varchar(50) DEFAULT NULL,
  sort smallint DEFAULT NULL,
  changed date DEFAULT NOW(),
  changed_by varchar(20) NOT NULL
);
CREATE INDEX ON zaehlung_einheit_werte USING btree (id);
CREATE INDEX ON zaehlung_einheit_werte USING btree (code);
CREATE INDEX ON zaehlung_einheit_werte USING btree (sort);
COMMENT ON COLUMN zaehlung_einheit_werte.id IS 'Primärschlüssel';
COMMENT ON COLUMN zaehlung_einheit_werte.changed IS 'Wann wurde der Datensatz zuletzt geändert?';
COMMENT ON COLUMN zaehlung_einheit_werte.changed_by IS 'Von wem wurde der Datensatz zuletzt geändert?';

DROP TABLE IF EXISTS zaehlung CASCADE;
CREATE TABLE zaehlung (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  kultur_id UUID DEFAULT NULL REFERENCES kultur (id) ON DELETE CASCADE ON UPDATE CASCADE,
  datum date DEFAULT NULL,
  anzahl integer DEFAULT NULL,
  einheit integer DEFAULT NULL REFERENCES zaehlung_einheit_werte (code) ON DELETE SET NULL ON UPDATE CASCADE,
  bemerkungen text default null,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null
);
CREATE INDEX ON zaehlung USING btree (id);
CREATE INDEX ON zaehlung USING btree (kultur_id);
CREATE INDEX ON zaehlung USING btree (datum);
CREATE INDEX ON zaehlung USING btree (anzahl);
CREATE INDEX ON zaehlung USING btree (einheit);
COMMENT ON COLUMN zaehlung.einheit IS 'Verwendete Zaehleinheit. Auswahl aus Tabelle "zaehlung_einheit_werte"';

-- enable ae as foreign tables
-- see: https://www.percona.com/blog/2018/08/21/foreign-data-wrappers-postgresql-postgres_fdw/
-- on arteigenschaften.ch:
CREATE USER fdw_user WITH ENCRYPTED PASSWORD 'secret'
GRANT SELECT ON TABLE ae.taxonomy, ae.object TO fdw_user;

-- on vermehrung
CREATE SERVER ae_server FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'arteigenschaften.ch', dbname 'ae', port '5432');
CREATE USER MAPPING for postgres SERVER ae_server OPTIONS (user 'fdw_user', password 'secret');
CREATE TYPE taxonomy_type AS ENUM ('Art', 'Lebensraum');
CREATE FOREIGN TABLE ae_taxonomy (
  id UUID,
  type taxonomy_type DEFAULT NULL,
  name text DEFAULT NULL,
  description text DEFAULT NULL,
  links text[] DEFAULT NULL,
  last_updated date DEFAULT NULL,
  organization_id UUID DEFAULT NULL,
  imported_by UUID NOT NULL,
  terms_of_use text DEFAULT NULL,
  habitat_label varchar(50) DEFAULT NULL,
  habitat_comments text DEFAULT NULL,
  habitat_nr_fns_min integer DEFAULT NULL,
  habitat_nr_fns_max integer DEFAULT NULL
)
SERVER ae_server OPTIONS (schema_name 'ae', table_name 'taxonomy');

CREATE FOREIGN TABLE ae_object (
  id UUID,
  taxonomy_id UUID NOT NULL,
  parent_id UUID DEFAULT NULL,
  name text,
  properties jsonb DEFAULT NULL,
  id_old text DEFAULT NULL
)
SERVER ae_server OPTIONS (schema_name 'ae', table_name 'object');
