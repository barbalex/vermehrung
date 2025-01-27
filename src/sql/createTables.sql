--CREATE DATABASE vermehrung encoding 'UTF8';
CREATE EXTENSION IF NOT EXISTS postgis;

DROP TABLE IF EXISTS user_role CASCADE;

CREATE TABLE user_role(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE,
  label text DEFAULT NULL,
  sort integer,
  comment text,
  changed timestamp DEFAULT now(),
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc')
);

CREATE INDEX ON user_role USING btree(id);

CREATE INDEX ON user_role USING btree(name);

CREATE INDEX ON user_role USING btree(sort);

CREATE INDEX ON user_role USING btree(_rev_at);

INSERT INTO user_role(name, sort, comment)
  VALUES ('gaertner', 1, 'liest und editiert Daten des eigenen Garten'),
('artverantwortlich', 2, 'liest und editiert Daten für bestimmte Arten'),
('manager', 3, 'liest und editiert alle Daten');

DROP TABLE IF EXISTS person CASCADE;

CREATE TABLE person(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nr text DEFAULT NULL, -- DO NOT set unique - does not work for offline
  vorname text DEFAULT NULL,
  name text DEFAULT NULL,
  adresszusatz text DEFAULT NULL,
  strasse text DEFAULT NULL,
  plz integer DEFAULT NULL,
  ort text DEFAULT NULL,
  telefon_privat text DEFAULT NULL,
  telefon_geschaeft text DEFAULT NULL,
  telefon_mobile text DEFAULT NULL,
  email text DEFAULT NULL,
  kein_email boolean DEFAULT FALSE,
  bemerkungen text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  account_id text DEFAULT NULL,
  user_role_id uuid DEFAULT NULL REFERENCES user_role(id) ON DELETE CASCADE ON UPDATE CASCADE,
  kommerziell boolean DEFAULT FALSE,
  info boolean DEFAULT FALSE,
  aktiv boolean DEFAULT TRUE,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
);

CREATE INDEX ON person USING btree(id);

CREATE INDEX ON person USING btree(name);

CREATE INDEX ON person USING btree(vorname);

CREATE INDEX ON person USING btree(account_id);

CREATE INDEX ON person USING btree(user_role_id);

CREATE INDEX ON person USING btree(aktiv);

CREATE INDEX ON person USING btree(kommerziell);

CREATE INDEX ON person USING btree(info);

CREATE INDEX ON person USING btree(_deleted);

CREATE INDEX ON person USING btree(_rev_at);

DROP TABLE IF EXISTS person_rev CASCADE;

CREATE TABLE person_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id uuid DEFAULT NULL,
  nr text DEFAULT NULL, -- DO NOT set unique - does not work for offline
  vorname text DEFAULT NULL,
  name text DEFAULT NULL,
  adresszusatz text DEFAULT NULL,
  strasse text DEFAULT NULL,
  plz integer DEFAULT NULL,
  ort text DEFAULT NULL,
  telefon_privat text DEFAULT NULL,
  telefon_geschaeft text DEFAULT NULL,
  telefon_mobile text DEFAULT NULL,
  email text DEFAULT NULL,
  kein_email boolean DEFAULT FALSE,
  bemerkungen text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  account_id text DEFAULT NULL,
  user_role_id uuid,
  kommerziell boolean DEFAULT FALSE,
  info boolean DEFAULT FALSE,
  aktiv boolean DEFAULT TRUE,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

ALTER TABLE ONLY person_rev
  ALTER COLUMN person_id SET DEFAULT NULL;

CREATE INDEX ON person_rev USING btree(id);

CREATE INDEX ON person_rev USING btree(person_id);

CREATE INDEX ON person_rev USING btree(_rev);

CREATE INDEX ON person_rev USING btree(_parent_rev);

CREATE INDEX ON person_rev USING btree(_depth);

CREATE INDEX ON person_rev USING btree(_deleted);

CREATE INDEX ON person_rev USING btree(_rev_at);

DROP TABLE IF EXISTS person_file CASCADE;

CREATE TABLE person_file(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id uuid DEFAULT NULL REFERENCES person(id) ON DELETE CASCADE ON UPDATE CASCADE,
  file_id uuid DEFAULT NULL,
  file_mime_type text DEFAULT NULL,
  name text DEFAULT NULL,
  beschreibung text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc')
);

CREATE INDEX ON person_file USING btree(id);

CREATE INDEX ON person_file USING btree(person_id);

CREATE INDEX ON person_file USING btree(file_id);

CREATE INDEX ON person_file USING btree(file_mime_type);

CREATE INDEX ON person_file USING btree(_rev_at);

DROP TABLE IF EXISTS art CASCADE;

CREATE TABLE art(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ae_id uuid DEFAULT NULL,
  set text DEFAULT NULL,
  apflora_av text DEFAULT NULL,
  apflora_ap boolean DEFAULT FALSE,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
);

CREATE INDEX ON art USING btree(id);

CREATE INDEX ON art USING btree(ae_id);

CREATE INDEX ON art USING btree(_deleted);

CREATE INDEX ON art USING btree(_rev_at);

-- alter table art add column av text default null;
-- alter table art add column ap boolean default false;
alter table art rename av to apflora_av;
alter table art rename ap to apflora_ap;

DROP TABLE IF EXISTS art_rev CASCADE;

CREATE TABLE art_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  art_id uuid DEFAULT NULL,
  ae_id uuid DEFAULT NULL,
  set text DEFAULT NULL,
  apflora_av text DEFAULT NULL,
  apflora_ap boolean DEFAULT FALSE,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

-- alter table art_rev add column av text default null;
-- alter table art_rev add column ap boolean default false;
alter table art_rev rename av to apflora_av;
alter table art_rev rename ap to apflora_ap;

ALTER TABLE ONLY art_rev
  ALTER COLUMN art_id SET DEFAULT NULL;

CREATE INDEX ON art_rev USING btree(id);

CREATE INDEX ON art_rev USING btree(art_id);

CREATE INDEX ON art_rev USING btree(_rev);

CREATE INDEX ON art_rev USING btree(_parent_rev);

CREATE INDEX ON art_rev USING btree(_depth);

CREATE INDEX ON art_rev USING btree(_deleted);

CREATE INDEX ON art_rev USING btree(_rev_at);

DROP TABLE IF EXISTS art_qk CASCADE;

CREATE TABLE art_qk(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE, -- beware of unique - does not work for offline
  titel text,
  beschreibung text,
  sort smallint DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
);

CREATE INDEX ON art_qk USING btree(name);

CREATE INDEX ON art_qk USING btree(titel);

CREATE INDEX ON art_qk USING btree(sort);

CREATE INDEX ON art_qk USING btree(_deleted);

CREATE INDEX ON art_qk USING btree(_rev_at);

COMMENT ON COLUMN art_qk.name IS 'Primärschlüssel. Wird auch in Abfragen und createMessageFunctions benutzt';

DROP TABLE IF EXISTS art_qk_rev CASCADE;

CREATE TABLE art_qk_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  art_qk_id uuid DEFAULT NULL,
  name text,
  titel text,
  beschreibung text,
  sort smallint DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

ALTER TABLE ONLY art_qk_rev
  ALTER COLUMN art_qk_id SET DEFAULT NULL;

CREATE INDEX ON art_qk_rev USING btree(id);

CREATE INDEX ON art_qk_rev USING btree(_rev);

CREATE INDEX ON art_qk_rev USING btree(_parent_rev);

CREATE INDEX ON art_qk_rev USING btree(_depth);

CREATE INDEX ON art_qk_rev USING btree(_deleted);

CREATE INDEX ON art_qk_rev USING btree(_rev_at);

-- TODO: drop after changing to new method
DROP TABLE IF EXISTS art_qk_choosen CASCADE;

DROP TABLE IF EXISTS art_qk_choosen_rev CASCADE;

DROP TABLE IF EXISTS art_file CASCADE;

CREATE TABLE art_file(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  art_id uuid DEFAULT NULL REFERENCES art(id) ON DELETE CASCADE ON UPDATE CASCADE,
  file_id uuid DEFAULT NULL,
  file_mime_type text DEFAULT NULL,
  name text DEFAULT NULL,
  beschreibung text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc')
);

CREATE INDEX ON art_file USING btree(id);

CREATE INDEX ON art_file USING btree(art_id);

CREATE INDEX ON art_file USING btree(file_id);

CREATE INDEX ON art_file USING btree(file_mime_type);

CREATE INDEX ON art_file USING btree(_rev_at);

DROP TABLE IF EXISTS herkunft CASCADE;

CREATE TABLE herkunft(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nr text DEFAULT NULL, -- DO NOT set unique - does not work for offline
  lokalname text DEFAULT NULL,
  gemeinde text DEFAULT NULL,
  kanton text DEFAULT NULL,
  land text DEFAULT NULL,
  geom_point geometry(point, 4326) DEFAULT NULL,
  wgs84_lat numeric GENERATED ALWAYS AS ( CASE WHEN (st_xmin(geom_point) >= - 180 AND st_xmax(geom_point) <= 180 AND st_ymin(geom_point) >= - 90 AND st_ymax(geom_point) <= 90) THEN
    st_y(geom_point)
  END) STORED,
  wgs84_long numeric GENERATED ALWAYS AS ( CASE WHEN (st_xmin(geom_point) >= - 180 AND st_xmax(geom_point) <= 180 AND st_ymin(geom_point) >= - 90 AND st_ymax(geom_point) <= 90) THEN
    st_x(geom_point)
  END) STORED,
  lv95_x numeric GENERATED ALWAYS AS ( CASE WHEN (st_xmin(geom_point) >= - 180 AND st_xmax(geom_point) <= 180 AND st_ymin(geom_point) >= - 90 AND st_ymax(geom_point) <= 90) THEN
    round(st_x(st_transform(geom_point, 2056)))
  END) STORED,
  lv95_y numeric GENERATED ALWAYS AS ( CASE WHEN (st_xmin(geom_point) >= - 180 AND st_xmax(geom_point) <= 180 AND st_ymin(geom_point) >= - 90 AND st_ymax(geom_point) <= 90) THEN
    round(st_y(st_transform(geom_point, 2056)))
  END) STORED,
  bemerkungen text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
);

CREATE INDEX ON herkunft USING btree(id);

CREATE INDEX ON herkunft USING btree(nr);

CREATE INDEX ON herkunft USING btree(gemeinde);

CREATE INDEX ON herkunft USING btree(lokalname);

CREATE INDEX ON herkunft USING btree(_deleted);

CREATE INDEX ON herkunft USING btree(_rev_at);

DROP TABLE IF EXISTS herkunft_rev CASCADE;

CREATE TABLE herkunft_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  herkunft_id uuid DEFAULT NULL,
  nr text DEFAULT NULL, -- DO NOT set unique - does not work for offline
  lokalname text DEFAULT NULL,
  gemeinde text DEFAULT NULL,
  kanton text DEFAULT NULL,
  land text DEFAULT NULL,
  geom_point geometry(point, 4326) DEFAULT NULL,
  bemerkungen text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

ALTER TABLE ONLY herkunft_rev
  ALTER COLUMN herkunft_id SET DEFAULT NULL;

CREATE INDEX ON herkunft_rev USING btree(id);

CREATE INDEX ON herkunft_rev USING btree(herkunft_id);

CREATE INDEX ON herkunft_rev USING btree(_rev);

CREATE INDEX ON herkunft_rev USING btree(_parent_rev);

CREATE INDEX ON herkunft_rev USING btree(_depth);

CREATE INDEX ON herkunft_rev USING btree(_deleted);

CREATE INDEX ON herkunft_rev USING btree(_rev_at);

DROP TABLE IF EXISTS herkunft_file CASCADE;

CREATE TABLE herkunft_file(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  herkunft_id uuid DEFAULT NULL REFERENCES herkunft(id) ON DELETE CASCADE ON UPDATE CASCADE,
  file_id uuid DEFAULT NULL,
  file_mime_type text DEFAULT NULL,
  name text DEFAULT NULL,
  beschreibung text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc')
);

CREATE INDEX ON herkunft_file USING btree(id);

CREATE INDEX ON herkunft_file USING btree(herkunft_id);

CREATE INDEX ON herkunft_file USING btree(file_id);

CREATE INDEX ON herkunft_file USING btree(file_mime_type);

CREATE INDEX ON herkunft_file USING btree(_rev_at);

DROP TABLE IF EXISTS sammlung CASCADE;

CREATE TABLE sammlung(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  art_id uuid DEFAULT NULL REFERENCES art(id) ON DELETE CASCADE ON UPDATE CASCADE,
  person_id uuid DEFAULT NULL REFERENCES person(id) ON DELETE CASCADE ON UPDATE CASCADE,
  herkunft_id uuid DEFAULT NULL REFERENCES herkunft(id) ON DELETE CASCADE ON UPDATE CASCADE,
  nr text DEFAULT NULL, -- DO NOT set unique - does not work for offline
  datum date DEFAULT NULL,
  von_anzahl_individuen integer DEFAULT NULL,
  anzahl_pflanzen integer DEFAULT NULL,
  gramm_samen integer DEFAULT NULL,
  andere_menge text DEFAULT NULL,
  geom_point geometry(point, 4326) DEFAULT NULL,
  wgs84_lat numeric GENERATED ALWAYS AS ( CASE WHEN (st_xmin(geom_point) >= - 180 AND st_xmax(geom_point) <= 180 AND st_ymin(geom_point) >= - 90 AND st_ymax(geom_point) <= 90) THEN
    st_y(geom_point)
  END) STORED,
  wgs84_long numeric GENERATED ALWAYS AS ( CASE WHEN (st_xmin(geom_point) >= - 180 AND st_xmax(geom_point) <= 180 AND st_ymin(geom_point) >= - 90 AND st_ymax(geom_point) <= 90) THEN
    st_x(geom_point)
  END) STORED,
  lv95_x numeric GENERATED ALWAYS AS ( CASE WHEN (st_xmin(geom_point) >= - 180 AND st_xmax(geom_point) <= 180 AND st_ymin(geom_point) >= - 90 AND st_ymax(geom_point) <= 90) THEN
    round(st_x(st_transform(geom_point, 2056)))
  END) STORED,
  lv95_y numeric GENERATED ALWAYS AS ( CASE WHEN (st_xmin(geom_point) >= - 180 AND st_xmax(geom_point) <= 180 AND st_ymin(geom_point) >= - 90 AND st_ymax(geom_point) <= 90) THEN
    round(st_y(st_transform(geom_point, 2056)))
  END) STORED,
  geplant boolean DEFAULT FALSE,
  bemerkungen text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
);

CREATE INDEX ON sammlung USING btree(id);

CREATE INDEX ON sammlung USING btree(art_id);

CREATE INDEX ON sammlung USING btree(person_id);

CREATE INDEX ON sammlung USING btree(herkunft_id);

CREATE INDEX ON sammlung USING btree(nr);

CREATE INDEX ON sammlung USING btree(datum);

CREATE INDEX ON sammlung USING btree(anzahl_pflanzen);

CREATE INDEX ON sammlung USING btree(gramm_samen);

CREATE INDEX ON sammlung USING btree(geplant);

CREATE INDEX ON sammlung USING btree(_deleted);

CREATE INDEX ON sammlung USING btree(_rev_at);

DROP TABLE IF EXISTS sammlung_rev CASCADE;

CREATE TABLE sammlung_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sammlung_id uuid DEFAULT NULL,
  art_id uuid DEFAULT NULL,
  person_id uuid DEFAULT NULL,
  herkunft_id uuid DEFAULT NULL,
  nr text DEFAULT NULL, -- DO NOT set unique - does not work for offline edits
  datum date DEFAULT NULL,
  von_anzahl_individuen integer DEFAULT NULL,
  anzahl_pflanzen integer DEFAULT NULL,
  gramm_samen integer DEFAULT NULL,
  andere_menge text DEFAULT NULL,
  geom_point geometry(point, 4326) DEFAULT NULL,
  geplant boolean DEFAULT FALSE,
  bemerkungen text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

ALTER TABLE ONLY sammlung_rev
  ALTER COLUMN sammlung_id SET DEFAULT NULL;

CREATE INDEX ON sammlung_rev USING btree(rev_id);

CREATE INDEX ON sammlung_rev USING btree(id);

CREATE INDEX ON sammlung_rev USING btree(_rev);

CREATE INDEX ON sammlung_rev USING btree(_parent_rev);

CREATE INDEX ON sammlung_rev USING btree(_depth);

CREATE INDEX ON sammlung_rev USING btree(_deleted);

CREATE INDEX ON sammlung_rev USING btree(_rev_at);

DROP TABLE IF EXISTS sammlung_file CASCADE;

CREATE TABLE sammlung_file(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sammlung_id uuid DEFAULT NULL REFERENCES sammlung(id) ON DELETE CASCADE ON UPDATE CASCADE,
  file_id uuid DEFAULT NULL,
  file_mime_type text DEFAULT NULL,
  name text DEFAULT NULL,
  beschreibung text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc')
);

CREATE INDEX ON sammlung_file USING btree(id);

CREATE INDEX ON sammlung_file USING btree(sammlung_id);

CREATE INDEX ON sammlung_file USING btree(file_id);

CREATE INDEX ON sammlung_file USING btree(file_mime_type);

CREATE INDEX ON sammlung_file USING btree(_rev_at);

DROP TABLE IF EXISTS garten CASCADE;

CREATE TABLE garten(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text DEFAULT NULL,
  person_id uuid DEFAULT NULL REFERENCES person(id) ON DELETE CASCADE ON UPDATE CASCADE,
  strasse text DEFAULT NULL,
  plz integer DEFAULT NULL,
  ort text DEFAULT NULL,
  geom_point geometry(point, 4326) DEFAULT NULL,
  wgs84_lat numeric GENERATED ALWAYS AS ( CASE WHEN (st_xmin(geom_point) >= - 180 AND st_xmax(geom_point) <= 180 AND st_ymin(geom_point) >= - 90 AND st_ymax(geom_point) <= 90) THEN
    st_y(geom_point)
  END) STORED,
  wgs84_long numeric GENERATED ALWAYS AS ( CASE WHEN (st_xmin(geom_point) >= - 180 AND st_xmax(geom_point) <= 180 AND st_ymin(geom_point) >= - 90 AND st_ymax(geom_point) <= 90) THEN
    st_x(geom_point)
  END) STORED,
  lv95_x numeric GENERATED ALWAYS AS ( CASE WHEN (st_xmin(geom_point) >= - 180 AND st_xmax(geom_point) <= 180 AND st_ymin(geom_point) >= - 90 AND st_ymax(geom_point) <= 90) THEN
    round(st_x(st_transform(geom_point, 2056)))
  END) STORED,
  lv95_y numeric GENERATED ALWAYS AS ( CASE WHEN (st_xmin(geom_point) >= - 180 AND st_xmax(geom_point) <= 180 AND st_ymin(geom_point) >= - 90 AND st_ymax(geom_point) <= 90) THEN
    round(st_y(st_transform(geom_point, 2056)))
  END) STORED,
  aktiv boolean DEFAULT TRUE,
  bemerkungen text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
);

CREATE INDEX ON garten USING btree(id);

CREATE INDEX ON garten USING btree(name);

CREATE INDEX ON garten USING btree(person_id);

CREATE INDEX ON garten USING btree(strasse);

CREATE INDEX ON garten USING btree(plz);

CREATE INDEX ON garten USING btree(ort);

CREATE INDEX ON garten USING btree(aktiv);

CREATE INDEX ON garten USING btree(_deleted);

CREATE INDEX ON garten USING btree(_rev_at);

DROP TABLE IF EXISTS garten_rev CASCADE;

CREATE TABLE garten_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  garten_id uuid DEFAULT NULL,
  name text DEFAULT NULL,
  person_id uuid DEFAULT NULL,
  strasse text DEFAULT NULL,
  plz integer DEFAULT NULL,
  ort text DEFAULT NULL,
  geom_point geometry(point, 4326) DEFAULT NULL,
  aktiv boolean DEFAULT TRUE,
  bemerkungen text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

ALTER TABLE ONLY garten_rev
  ALTER COLUMN garten_id SET DEFAULT NULL;

CREATE INDEX ON garten_rev USING btree(rev_id);

CREATE INDEX ON garten_rev USING btree(id);

CREATE INDEX ON garten_rev USING btree(_rev);

CREATE INDEX ON garten_rev USING btree(_parent_rev);

CREATE INDEX ON garten_rev USING btree(_depth);

CREATE INDEX ON garten_rev USING btree(_deleted);

CREATE INDEX ON garten_rev USING btree(_rev_at);

DROP TABLE IF EXISTS garten_file CASCADE;

CREATE TABLE garten_file(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  garten_id uuid DEFAULT NULL REFERENCES garten(id) ON DELETE CASCADE ON UPDATE CASCADE,
  file_id uuid DEFAULT NULL,
  file_mime_type text DEFAULT NULL,
  name text DEFAULT NULL,
  beschreibung text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc')
);

CREATE INDEX ON garten_file USING btree(id);

CREATE INDEX ON garten_file USING btree(garten_id);

CREATE INDEX ON garten_file USING btree(file_id);

CREATE INDEX ON garten_file USING btree(file_mime_type);

CREATE INDEX ON garten_file USING btree(_rev_at);

DROP TABLE IF EXISTS kultur CASCADE;

CREATE TABLE kultur(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  art_id uuid DEFAULT NULL REFERENCES art(id) ON DELETE CASCADE ON UPDATE CASCADE,
  herkunft_id uuid DEFAULT NULL REFERENCES herkunft(id) ON DELETE CASCADE ON UPDATE CASCADE,
  garten_id uuid DEFAULT NULL REFERENCES garten(id) ON DELETE CASCADE ON UPDATE CASCADE,
  zwischenlager boolean DEFAULT FALSE,
  erhaltungskultur boolean DEFAULT FALSE,
  von_anzahl_individuen integer DEFAULT NULL,
  bemerkungen text DEFAULT NULL,
  aktiv boolean DEFAULT TRUE,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
);

CREATE UNIQUE INDEX single_art_herkunft_garden_active_idx ON kultur(art_id, herkunft_id, garten_id)
WHERE
  aktiv IS TRUE AND zwischenlager IS FALSE AND art_id IS NOT NULL AND herkunft_id IS NOT NULL AND _deleted IS FALSE;

CREATE UNIQUE INDEX single_art_herkunft_garden_zwischenlager_active_idx ON kultur(art_id, herkunft_id, garten_id, zwischenlager)
WHERE
  aktiv IS TRUE AND zwischenlager IS TRUE AND art_id IS NOT NULL AND herkunft_id IS NOT NULL AND _deleted IS FALSE;

CREATE INDEX ON kultur USING btree(id);

CREATE INDEX ON kultur USING btree(art_id);

CREATE INDEX ON kultur USING btree(herkunft_id);

CREATE INDEX ON kultur USING btree(garten_id);

CREATE INDEX ON kultur USING btree(zwischenlager);

CREATE INDEX ON kultur USING btree(erhaltungskultur);

CREATE INDEX ON kultur USING btree(von_anzahl_individuen);

CREATE INDEX ON kultur USING btree(aktiv);

CREATE INDEX ON kultur USING btree(_deleted);

CREATE INDEX ON kultur USING btree(_rev_at);

DROP TABLE IF EXISTS kultur_rev CASCADE;

CREATE TABLE kultur_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kultur_id uuid DEFAULT NULL,
  art_id uuid DEFAULT NULL,
  herkunft_id uuid DEFAULT NULL,
  garten_id uuid DEFAULT NULL,
  zwischenlager boolean DEFAULT FALSE,
  erhaltungskultur boolean DEFAULT FALSE,
  von_anzahl_individuen integer DEFAULT NULL,
  bemerkungen text DEFAULT NULL,
  aktiv boolean DEFAULT TRUE,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

ALTER TABLE ONLY kultur_rev
  ALTER COLUMN kultur_id SET DEFAULT NULL;

CREATE INDEX ON kultur_rev USING btree(rev_id);

CREATE INDEX ON kultur_rev USING btree(id);

CREATE INDEX ON kultur_rev USING btree(_rev);

CREATE INDEX ON kultur_rev USING btree(_parent_rev);

CREATE INDEX ON kultur_rev USING btree(_depth);

CREATE INDEX ON kultur_rev USING btree(_deleted);

CREATE INDEX ON kultur_rev USING btree(_rev_at);

DROP TABLE IF EXISTS kultur_qk CASCADE;

CREATE TABLE kultur_qk(
  id uuid DEFAULT gen_random_uuid(),
  name text PRIMARY KEY,
  titel text,
  beschreibung text,
  sort smallint DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
);

ALTER TABLE kultur_qk
  DROP CONSTRAINT kultur_qk_pkey;

ALTER TABLE kultur_qk
  ADD PRIMARY KEY (id);

ALTER TABLE kultur_qk
  ADD UNIQUE (name);

CREATE INDEX ON kultur_qk USING btree(id);

CREATE INDEX ON kultur_qk USING btree(name);

CREATE INDEX ON kultur_qk USING btree(titel);

CREATE INDEX ON kultur_qk USING btree(sort);

CREATE INDEX ON kultur_qk USING btree(_deleted);

CREATE INDEX ON kultur_qk USING btree(_rev_at);

COMMENT ON COLUMN kultur_qk.name IS 'Primärschlüssel. Wird auch in Abfragen und createMessageFunctions benutzt';

DROP TABLE IF EXISTS kultur_qk_rev CASCADE;

CREATE TABLE kultur_qk_rev(
  id uuid DEFAULT gen_random_uuid(),
  kultur_qk_id uuid DEFAULT NULL,
  name text PRIMARY KEY,
  titel text,
  beschreibung text,
  sort smallint DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
);

ALTER TABLE ONLY kultur_qk_rev
  ALTER COLUMN kultur_qk_id SET DEFAULT NULL;

CREATE INDEX ON kultur_qk_rev USING btree(id);

CREATE INDEX ON kultur_qk_rev USING btree(_rev);

CREATE INDEX ON kultur_qk_rev USING btree(_parent_rev);

CREATE INDEX ON kultur_qk_rev USING btree(_depth);

CREATE INDEX ON kultur_qk_rev USING btree(_deleted);

CREATE INDEX ON kultur_qk_rev USING btree(_rev_at);

-- TODO: drop after changing to new method
DROP TABLE IF EXISTS kultur_qk_choosen CASCADE;

DROP TABLE IF EXISTS kultur_qk_choosen_rev CASCADE;

DROP TABLE IF EXISTS kultur_file CASCADE;

CREATE TABLE kultur_file(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kultur_id uuid DEFAULT NULL REFERENCES kultur(id) ON DELETE CASCADE ON UPDATE CASCADE,
  file_id uuid DEFAULT NULL,
  file_mime_type text DEFAULT NULL,
  name text DEFAULT NULL,
  beschreibung text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc')
);

CREATE INDEX ON kultur_file USING btree(id);

CREATE INDEX ON kultur_file USING btree(kultur_id);

CREATE INDEX ON kultur_file USING btree(file_id);

CREATE INDEX ON kultur_file USING btree(file_mime_type);

CREATE INDEX ON kultur_file USING btree(_rev_at);

DROP TABLE IF EXISTS teilkultur CASCADE;

CREATE TABLE teilkultur(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kultur_id uuid DEFAULT NULL REFERENCES kultur(id) ON DELETE CASCADE ON UPDATE CASCADE,
  name text DEFAULT NULL,
  ort1 text DEFAULT NULL,
  ort2 text DEFAULT NULL,
  ort3 text DEFAULT NULL,
  bemerkungen text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
);

CREATE INDEX ON teilkultur USING btree(id);

CREATE INDEX ON teilkultur USING btree(kultur_id);

CREATE INDEX ON teilkultur USING btree(name);

CREATE INDEX ON teilkultur USING btree(_deleted);

CREATE INDEX ON teilkultur USING btree(_rev_at);

DROP TABLE IF EXISTS teilkultur_rev CASCADE;

CREATE TABLE teilkultur_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teilkultur_id uuid DEFAULT NULL,
  kultur_id uuid DEFAULT NULL,
  name text DEFAULT NULL,
  ort1 text DEFAULT NULL,
  ort2 text DEFAULT NULL,
  ort3 text DEFAULT NULL,
  bemerkungen text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

ALTER TABLE ONLY teilkultur_rev
  ALTER COLUMN teilkultur_id SET DEFAULT NULL;

CREATE INDEX ON teilkultur_rev USING btree(rev_id);

CREATE INDEX ON teilkultur_rev USING btree(id);

CREATE INDEX ON teilkultur_rev USING btree(_rev);

CREATE INDEX ON teilkultur_rev USING btree(_parent_rev);

CREATE INDEX ON teilkultur_rev USING btree(_depth);

CREATE INDEX ON teilkultur_rev USING btree(_deleted);

CREATE INDEX ON teilkultur_rev USING btree(_rev_at);

DROP TABLE IF EXISTS event CASCADE;

CREATE TABLE event(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kultur_id uuid DEFAULT NULL REFERENCES kultur(id) ON DELETE CASCADE ON UPDATE CASCADE,
  teilkultur_id uuid DEFAULT NULL REFERENCES teilkultur(id) ON DELETE SET NULL ON UPDATE CASCADE,
  person_id uuid DEFAULT NULL REFERENCES person(id) ON DELETE SET NULL ON UPDATE CASCADE,
  beschreibung text DEFAULT NULL,
  geplant boolean DEFAULT FALSE,
  datum date DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
);

CREATE INDEX ON event USING btree(id);

CREATE INDEX ON event USING btree(kultur_id);

CREATE INDEX ON event USING btree(teilkultur_id);

CREATE INDEX ON event USING btree(person_id);

CREATE INDEX ON event USING btree(beschreibung);

CREATE INDEX ON event USING btree(geplant);

CREATE INDEX ON event USING btree(datum);

CREATE INDEX ON event USING btree(_deleted);

CREATE INDEX ON event USING btree(_rev_at);

DROP TABLE IF EXISTS event_rev CASCADE;

CREATE TABLE event_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid DEFAULT NULL,
  kultur_id uuid DEFAULT NULL,
  teilkultur_id uuid DEFAULT NULL,
  person_id uuid DEFAULT NULL,
  beschreibung text DEFAULT NULL,
  geplant boolean DEFAULT FALSE,
  datum date DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

ALTER TABLE ONLY event_rev
  ALTER COLUMN event_id SET DEFAULT NULL;

CREATE INDEX ON event_rev USING btree(rev_id);

CREATE INDEX ON event_rev USING btree(id);

CREATE INDEX ON event_rev USING btree(_rev);

CREATE INDEX ON event_rev USING btree(_parent_rev);

CREATE INDEX ON event_rev USING btree(_depth);

CREATE INDEX ON event_rev USING btree(_deleted);

CREATE INDEX ON event_rev USING btree(_rev_at);

DROP TABLE IF EXISTS zaehlung CASCADE;

CREATE TABLE zaehlung(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kultur_id uuid DEFAULT NULL REFERENCES kultur(id) ON DELETE CASCADE ON UPDATE CASCADE,
  datum date DEFAULT NULL,
  prognose boolean DEFAULT FALSE,
  bemerkungen text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
);

CREATE INDEX ON zaehlung USING btree(id);

CREATE INDEX ON zaehlung USING btree(kultur_id);

CREATE INDEX ON zaehlung USING btree(datum);

CREATE INDEX ON zaehlung USING btree(prognose);

CREATE INDEX ON zaehlung USING btree(_deleted);

CREATE INDEX ON zaehlung USING btree(_rev_at);

DROP TABLE IF EXISTS zaehlung_rev CASCADE;

CREATE TABLE zaehlung_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zaehlung_id uuid DEFAULT NULL,
  kultur_id uuid DEFAULT NULL,
  datum date DEFAULT NULL,
  prognose boolean DEFAULT FALSE,
  bemerkungen text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

ALTER TABLE ONLY zaehlung_rev
  ALTER COLUMN zaehlung_id SET DEFAULT NULL;

CREATE INDEX ON zaehlung_rev USING btree(rev_id);

CREATE INDEX ON zaehlung_rev USING btree(id);

CREATE INDEX ON zaehlung_rev USING btree(_rev);

CREATE INDEX ON zaehlung_rev USING btree(_parent_rev);

CREATE INDEX ON zaehlung_rev USING btree(_depth);

CREATE INDEX ON zaehlung_rev USING btree(_deleted);

CREATE INDEX ON zaehlung_rev USING btree(_rev_at);

DROP TABLE IF EXISTS teilzaehlung CASCADE;

CREATE TABLE teilzaehlung(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zaehlung_id uuid DEFAULT NULL REFERENCES zaehlung(id) ON DELETE CASCADE ON UPDATE CASCADE,
  teilkultur_id uuid DEFAULT NULL REFERENCES teilkultur(id) ON DELETE SET NULL ON UPDATE CASCADE,
  anzahl_pflanzen integer DEFAULT NULL,
  anzahl_auspflanzbereit integer DEFAULT NULL,
  anzahl_mutterpflanzen integer DEFAULT NULL,
  andere_menge text DEFAULT NULL,
  auspflanzbereit_beschreibung text DEFAULT NULL,
  bemerkungen text DEFAULT NULL,
  prognose_von_tz uuid DEFAULT NULL REFERENCES teilzaehlung(id) ON DELETE SET NULL ON UPDATE CASCADE,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
);

CREATE INDEX ON teilzaehlung USING btree(id);

CREATE INDEX ON teilzaehlung USING btree(prognose_von_tz);

CREATE INDEX ON teilzaehlung USING btree(zaehlung_id);

CREATE INDEX ON teilzaehlung USING btree(teilkultur_id);

CREATE INDEX ON teilzaehlung USING btree(anzahl_pflanzen);

CREATE INDEX ON teilzaehlung USING btree(anzahl_auspflanzbereit);

CREATE INDEX ON teilzaehlung USING btree(anzahl_mutterpflanzen);

CREATE INDEX ON teilzaehlung USING btree(andere_menge);

CREATE INDEX ON teilzaehlung USING btree(_deleted);

CREATE INDEX ON teilzaehlung USING btree(_rev_at);

DROP TABLE IF EXISTS teilzaehlung_rev CASCADE;

CREATE TABLE teilzaehlung_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teilzaehlung_id uuid DEFAULT NULL,
  zaehlung_id uuid DEFAULT NULL,
  teilkultur_id uuid DEFAULT NULL,
  anzahl_pflanzen integer DEFAULT NULL,
  anzahl_auspflanzbereit integer DEFAULT NULL,
  anzahl_mutterpflanzen integer DEFAULT NULL,
  andere_menge text DEFAULT NULL,
  auspflanzbereit_beschreibung text DEFAULT NULL,
  bemerkungen text DEFAULT NULL,
  prognose_von_tz uuid DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

ALTER TABLE ONLY teilzaehlung_rev
  ALTER COLUMN teilzaehlung_id SET DEFAULT NULL;

CREATE INDEX ON teilzaehlung_rev USING btree(rev_id);

CREATE INDEX ON teilzaehlung_rev USING btree(id);

CREATE INDEX ON teilzaehlung_rev USING btree(_rev);

CREATE INDEX ON teilzaehlung_rev USING btree(_parent_rev);

CREATE INDEX ON teilzaehlung_rev USING btree(_depth);

CREATE INDEX ON teilzaehlung_rev USING btree(_deleted);

CREATE INDEX ON teilzaehlung_rev USING btree(_rev_at);

DROP TABLE IF EXISTS kultur_option CASCADE;

CREATE TABLE kultur_option(
  id uuid UNIQUE NOT NULL REFERENCES kultur(id) ON DELETE CASCADE ON UPDATE CASCADE,
  z_bemerkungen boolean DEFAULT TRUE,
  tz_teilkultur_id boolean DEFAULT TRUE,
  -- tz_anzahl_mutterpflanzen is not used any more
  tz_anzahl_mutterpflanzen boolean DEFAULT TRUE,
  tz_andere_menge boolean DEFAULT TRUE,
  tz_auspflanzbereit_beschreibung boolean DEFAULT TRUE,
  tz_bemerkungen boolean DEFAULT TRUE,
  tk boolean DEFAULT FALSE,
  tk_bemerkungen boolean DEFAULT TRUE,
  ev_teilkultur_id boolean DEFAULT TRUE,
  ev_geplant boolean DEFAULT TRUE,
  ev_person_id boolean DEFAULT TRUE,
  ev_datum boolean DEFAULT TRUE,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
);

CREATE INDEX ON kultur_option USING btree(id);

CREATE INDEX ON kultur_option USING btree(_deleted);

CREATE INDEX ON kultur_option USING btree(_rev_at);

COMMENT ON COLUMN kultur_option.tk IS 'opt-in Option für Teilkulturen';

DROP TABLE IF EXISTS kultur_option_rev CASCADE;

CREATE TABLE kultur_option_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kultur_id uuid NOT NULL,
  z_bemerkungen boolean DEFAULT TRUE,
  tz_teilkultur_id boolean DEFAULT TRUE,
  -- tz_anzahl_mutterpflanzen is not used any more
  tz_anzahl_mutterpflanzen boolean DEFAULT TRUE,
  tz_andere_menge boolean DEFAULT TRUE,
  tz_auspflanzbereit_beschreibung boolean DEFAULT TRUE,
  tz_bemerkungen boolean DEFAULT TRUE,
  tk boolean DEFAULT FALSE,
  tk_bemerkungen boolean DEFAULT TRUE,
  ev_teilkultur_id boolean DEFAULT TRUE,
  ev_geplant boolean DEFAULT TRUE,
  ev_person_id boolean DEFAULT TRUE,
  ev_datum boolean DEFAULT TRUE,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

ALTER TABLE ONLY kultur_option_rev
  ALTER COLUMN kultur_id SET DEFAULT NULL;

CREATE INDEX ON kultur_option_rev USING btree(id);

CREATE INDEX ON kultur_option_rev USING btree(kultur_id);

CREATE INDEX ON kultur_option_rev USING btree(_rev);

CREATE INDEX ON kultur_option_rev USING btree(_parent_rev);

CREATE INDEX ON kultur_option_rev USING btree(_depth);

CREATE INDEX ON kultur_option_rev USING btree(_deleted);

CREATE INDEX ON kultur_option_rev USING btree(_rev_at);

DROP TABLE IF EXISTS person_option CASCADE;

CREATE TABLE person_option(
  id uuid UNIQUE NOT NULL REFERENCES person(id) ON DELETE CASCADE ON UPDATE CASCADE,
  ar_name_deutsch boolean DEFAULT TRUE, -- not in use
  ga_strasse boolean DEFAULT TRUE,
  ga_plz boolean DEFAULT TRUE,
  ga_ort boolean DEFAULT TRUE,
  ga_geom_point boolean DEFAULT TRUE,
  ga_lat_lng boolean DEFAULT TRUE,
  ga_aktiv boolean DEFAULT TRUE,
  ga_bemerkungen boolean DEFAULT TRUE,
  hk_kanton boolean DEFAULT TRUE,
  hk_land boolean DEFAULT TRUE,
  hk_bemerkungen boolean DEFAULT TRUE,
  hk_geom_point boolean DEFAULT TRUE,
  ku_zwischenlager boolean DEFAULT FALSE,
  ku_erhaltungskultur boolean DEFAULT FALSE,
  li_show_sl_felder boolean DEFAULT FALSE,
  li_show_sl boolean DEFAULT TRUE,
  sl_show_empty_when_next_to_li boolean DEFAULT FALSE,
  sl_auto_copy_edits boolean DEFAULT TRUE,
  tree_kultur boolean DEFAULT FALSE,
  tree_teilkultur boolean DEFAULT FALSE,
  tree_zaehlung boolean DEFAULT FALSE,
  tree_lieferung boolean DEFAULT FALSE,
  tree_event boolean DEFAULT FALSE,
  art_qk_choosen text[] DEFAULT NULL,
  kultur_qk_choosen text[] DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
);

-- 2020.12.24 refactor choosen qk
ALTER TABLE person_option
  ADD COLUMN art_qk_choosen text[] DEFAULT NULL;

ALTER TABLE person_option
  ADD COLUMN kultur_qk_choosen text[] DEFAULT NULL;

CREATE INDEX ON person_option USING btree(id);

CREATE INDEX ON person_option USING btree(_deleted);

CREATE INDEX ON person_option USING btree(_rev_at);

COMMENT ON COLUMN person_option.sl_show_empty_when_next_to_li IS 'Ob in der Sammel-Lieferung leere Felder angezeigt werden (nur wirksam, wenn die Sammel-Lieferung neben einer Lieferung angezeigt wird)';

COMMENT ON COLUMN person_option.li_show_sl IS 'Ob die Sammel-Lieferung neben der Lieferung angezeigt wird';

COMMENT ON COLUMN person_option.li_show_sl_felder IS 'Ob Felder, deren Werte aus der Sammel-Lieferung stammen, sichtbar sind';

COMMENT ON COLUMN person_option.ar_name_deutsch IS 'Dieses Feld wird (momentan) nicht benutzt';

DROP TABLE IF EXISTS person_option_rev CASCADE;

CREATE TABLE person_option_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id uuid NOT NULL,
  ar_name_deutsch boolean DEFAULT TRUE, -- not in use
  ga_strasse boolean DEFAULT TRUE,
  ga_plz boolean DEFAULT TRUE,
  ga_ort boolean DEFAULT TRUE,
  ga_geom_point boolean DEFAULT TRUE,
  ga_lat_lng boolean DEFAULT TRUE,
  ga_aktiv boolean DEFAULT TRUE,
  ga_bemerkungen boolean DEFAULT TRUE,
  hk_kanton boolean DEFAULT TRUE,
  hk_land boolean DEFAULT TRUE,
  hk_bemerkungen boolean DEFAULT TRUE,
  hk_geom_point boolean DEFAULT TRUE,
  ku_zwischenlager boolean DEFAULT FALSE,
  ku_erhaltungskultur boolean DEFAULT FALSE,
  li_show_sl_felder boolean DEFAULT FALSE,
  li_show_sl boolean DEFAULT TRUE,
  sl_show_empty_when_next_to_li boolean DEFAULT FALSE,
  sl_auto_copy_edits boolean DEFAULT TRUE,
  tree_kultur boolean DEFAULT FALSE,
  tree_teilkultur boolean DEFAULT FALSE,
  tree_zaehlung boolean DEFAULT FALSE,
  tree_lieferung boolean DEFAULT FALSE,
  tree_event boolean DEFAULT FALSE,
  art_qk_choosen text[] DEFAULT NULL,
  kultur_qk_choosen text[] DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

-- 2020.12.24 refactor choosen qk
ALTER TABLE person_option_rev
  ADD COLUMN art_qk_choosen text[] DEFAULT NULL;

ALTER TABLE person_option_rev
  ADD COLUMN kultur_qk_choosen text[] DEFAULT NULL;

ALTER TABLE ONLY person_option_rev
  ALTER COLUMN person_id SET DEFAULT NULL;

ALTER TABLE person_option_rev
  ADD COLUMN ku_zwischenlager boolean DEFAULT FALSE;

ALTER TABLE person_option_rev
  ADD COLUMN ku_erhaltungskultur boolean DEFAULT FALSE;

CREATE INDEX ON person_option_rev USING btree(rev_id);

CREATE INDEX ON person_option_rev USING btree(id);

CREATE INDEX ON person_option_rev USING btree(_rev);

CREATE INDEX ON person_option_rev USING btree(_parent_rev);

CREATE INDEX ON person_option_rev USING btree(_depth);

CREATE INDEX ON person_option_rev USING btree(_deleted);

CREATE INDEX ON person_option_rev USING btree(_rev_at);

DROP TABLE IF EXISTS lieferung CASCADE;

CREATE TABLE lieferung(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sammel_lieferung_id uuid DEFAULT NULL, -- references sammel_lieferung (id) on delete set null on update cascade , art_id uuid DEFAULT NULL REFERENCES art (id) ON DELETE CASCADE ON UPDATE CASCADE,
  person_id uuid DEFAULT NULL REFERENCES person(id) ON DELETE CASCADE ON UPDATE CASCADE,
  von_sammlung_id uuid DEFAULT NULL REFERENCES sammlung(id) ON DELETE CASCADE ON UPDATE CASCADE,
  von_kultur_id uuid DEFAULT NULL REFERENCES kultur(id) ON DELETE CASCADE ON UPDATE CASCADE,
  datum date DEFAULT NULL,
  nach_kultur_id uuid DEFAULT NULL REFERENCES kultur(id) ON DELETE CASCADE ON UPDATE CASCADE,
  nach_ausgepflanzt boolean DEFAULT FALSE,
  von_anzahl_individuen integer DEFAULT NULL,
  anzahl_pflanzen integer DEFAULT NULL,
  anzahl_auspflanzbereit integer DEFAULT NULL,
  gramm_samen integer DEFAULT NULL,
  andere_menge text DEFAULT NULL,
  geplant boolean DEFAULT FALSE,
  bemerkungen text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
);

CREATE INDEX ON lieferung USING btree(id);

CREATE INDEX ON lieferung USING btree(sammel_lieferung_id);

CREATE INDEX ON lieferung USING btree(art_id);

CREATE INDEX ON lieferung USING btree(person_id);

CREATE INDEX ON lieferung USING btree(von_sammlung_id);

CREATE INDEX ON lieferung USING btree(von_kultur_id);

CREATE INDEX ON lieferung USING btree(nach_kultur_id);

CREATE INDEX ON lieferung USING btree(datum);

CREATE INDEX ON lieferung USING btree(nach_ausgepflanzt);

CREATE INDEX ON lieferung USING btree(von_anzahl_individuen);

CREATE INDEX ON lieferung USING btree(anzahl_pflanzen);

CREATE INDEX ON lieferung USING btree(anzahl_auspflanzbereit);

CREATE INDEX ON lieferung USING btree(gramm_samen);

CREATE INDEX ON lieferung USING btree(andere_menge);

CREATE INDEX ON lieferung USING btree(geplant);

CREATE INDEX ON lieferung USING btree(_deleted);

CREATE INDEX ON lieferung USING btree(_rev_at);

DROP TABLE IF EXISTS lieferung_rev CASCADE;

CREATE TABLE lieferung_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lieferung_id uuid DEFAULT NULL,
  sammel_lieferung_id uuid DEFAULT NULL,
  art_id uuid DEFAULT NULL,
  person_id uuid DEFAULT NULL,
  von_sammlung_id uuid DEFAULT NULL,
  von_kultur_id uuid DEFAULT NULL,
  datum date DEFAULT NULL,
  nach_kultur_id uuid DEFAULT NULL,
  nach_ausgepflanzt boolean DEFAULT FALSE,
  von_anzahl_individuen integer DEFAULT NULL,
  anzahl_pflanzen integer DEFAULT NULL,
  anzahl_auspflanzbereit integer DEFAULT NULL,
  gramm_samen integer DEFAULT NULL,
  andere_menge text DEFAULT NULL,
  geplant boolean DEFAULT FALSE,
  bemerkungen text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

ALTER TABLE ONLY lieferung_rev
  ALTER COLUMN lieferung_id SET DEFAULT NULL;

CREATE INDEX ON lieferung_rev USING btree(rev_id);

CREATE INDEX ON lieferung_rev USING btree(id);

CREATE INDEX ON lieferung_rev USING btree(_rev);

CREATE INDEX ON lieferung_rev USING btree(_parent_rev);

CREATE INDEX ON lieferung_rev USING btree(_depth);

CREATE INDEX ON lieferung_rev USING btree(_deleted);

CREATE INDEX ON lieferung_rev USING btree(_rev_at);

DROP TABLE IF EXISTS sammel_lieferung CASCADE;

CREATE TABLE sammel_lieferung(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  art_id uuid DEFAULT NULL REFERENCES art(id) ON DELETE CASCADE ON UPDATE CASCADE,
  person_id uuid DEFAULT NULL REFERENCES person(id) ON DELETE CASCADE ON UPDATE CASCADE,
  von_sammlung_id uuid DEFAULT NULL REFERENCES sammlung(id) ON DELETE CASCADE ON UPDATE CASCADE,
  von_kultur_id uuid DEFAULT NULL REFERENCES kultur(id) ON DELETE CASCADE ON UPDATE CASCADE,
  datum date DEFAULT NULL,
  nach_kultur_id uuid DEFAULT NULL REFERENCES kultur(id) ON DELETE CASCADE ON UPDATE CASCADE,
  nach_ausgepflanzt boolean DEFAULT FALSE,
  von_anzahl_individuen integer DEFAULT NULL,
  anzahl_pflanzen integer DEFAULT NULL,
  anzahl_auspflanzbereit integer DEFAULT NULL,
  gramm_samen integer DEFAULT NULL,
  andere_menge text DEFAULT NULL,
  geplant boolean DEFAULT FALSE,
  bemerkungen text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
);

CREATE INDEX ON sammel_lieferung USING btree(id);

CREATE INDEX ON sammel_lieferung USING btree(_deleted);

CREATE INDEX ON sammel_lieferung USING btree(_rev_at);

-- need to wait with adding this reference until sammel_lieferung was created
ALTER TABLE lieferung
  ADD CONSTRAINT sammel_lieferung_fk FOREIGN KEY (sammel_lieferung_id) REFERENCES sammel_lieferung(id) ON DELETE SET NULL ON UPDATE CASCADE;

DROP TABLE IF EXISTS sammel_lieferung_rev CASCADE;

CREATE TABLE sammel_lieferung_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sammel_lieferung_id uuid DEFAULT NULL,
  art_id uuid DEFAULT NULL,
  person_id uuid DEFAULT NULL,
  von_sammlung_id uuid DEFAULT NULL,
  von_kultur_id uuid DEFAULT NULL,
  datum date DEFAULT NULL,
  nach_kultur_id uuid DEFAULT NULL,
  nach_ausgepflanzt boolean DEFAULT FALSE,
  von_anzahl_individuen integer DEFAULT NULL,
  anzahl_pflanzen integer DEFAULT NULL,
  anzahl_auspflanzbereit integer DEFAULT NULL,
  gramm_samen integer DEFAULT NULL,
  andere_menge text DEFAULT NULL,
  geplant boolean DEFAULT FALSE,
  bemerkungen text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

ALTER TABLE ONLY sammel_lieferung_rev
  ALTER COLUMN sammel_lieferung_id SET DEFAULT NULL;

CREATE INDEX ON sammel_lieferung_rev USING btree(rev_id);

CREATE INDEX ON sammel_lieferung_rev USING btree(id);

CREATE INDEX ON sammel_lieferung_rev USING btree(_rev);

CREATE INDEX ON sammel_lieferung_rev USING btree(_parent_rev);

CREATE INDEX ON sammel_lieferung_rev USING btree(_depth);

CREATE INDEX ON sammel_lieferung_rev USING btree(_deleted);

CREATE INDEX ON sammel_lieferung_rev USING btree(_rev_at);

DROP TABLE IF EXISTS lieferung_file CASCADE;

CREATE TABLE lieferung_file(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lieferung_id uuid DEFAULT NULL REFERENCES lieferung(id) ON DELETE CASCADE ON UPDATE CASCADE,
  file_id uuid DEFAULT NULL,
  file_mime_type text DEFAULT NULL,
  name text DEFAULT NULL,
  beschreibung text DEFAULT NULL,
  changed timestamp DEFAULT now(),
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc')
);

CREATE INDEX ON lieferung_file USING btree(id);

CREATE INDEX ON lieferung_file USING btree(lieferung_id);

CREATE INDEX ON lieferung_file USING btree(file_id);

CREATE INDEX ON lieferung_file USING btree(file_mime_type);

CREATE INDEX ON lieferung_file USING btree(_rev_at);

DROP TABLE IF EXISTS av CASCADE;

CREATE TABLE av(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  art_id uuid DEFAULT NULL REFERENCES art(id) ON DELETE CASCADE ON UPDATE CASCADE,
  person_id uuid REFERENCES person(id) ON DELETE CASCADE ON UPDATE CASCADE,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
  -- this created problems in the on conflict clause of the revision trigger
  --unique (person_id, art_id)
);

CREATE INDEX ON av USING btree(id);

CREATE INDEX ON av USING btree(art_id);

CREATE INDEX ON av USING btree(person_id);

CREATE INDEX ON av USING btree(_deleted);

CREATE INDEX ON av USING btree(_rev_at);

ALTER TABLE public.av
  DROP CONSTRAINT av_person_id_art_id_key;

DROP TABLE IF EXISTS av_rev CASCADE;

CREATE TABLE av_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  av_id uuid DEFAULT NULL,
  art_id uuid DEFAULT NULL,
  person_id uuid,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

ALTER TABLE ONLY av_rev
  ALTER COLUMN av_id SET DEFAULT NULL;

CREATE INDEX ON av_rev USING btree(id);

CREATE INDEX ON av_rev USING btree(_rev);

CREATE INDEX ON av_rev USING btree(_parent_rev);

CREATE INDEX ON av_rev USING btree(_depth);

CREATE INDEX ON av_rev USING btree(_deleted);

CREATE INDEX ON av_rev USING btree(_rev_at);

DROP TABLE IF EXISTS gv CASCADE;

CREATE TABLE gv(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  garten_id uuid DEFAULT NULL REFERENCES garten(id) ON DELETE CASCADE ON UPDATE CASCADE,
  person_id uuid REFERENCES person(id) ON DELETE CASCADE ON UPDATE CASCADE,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE,
  _conflicts text[] DEFAULT NULL
  -- this created problems in the on conflict clause of the revision trigger
  -- unique (person_id, garten_id)
);

CREATE INDEX ON gv USING btree(id);

CREATE INDEX ON gv USING btree(garten_id);

CREATE INDEX ON gv USING btree(person_id);

CREATE INDEX ON gv USING btree(_deleted);

CREATE INDEX ON gv USING btree(_rev_at);

ALTER TABLE public.gv
  DROP CONSTRAINT gv_person_id_garten_id_key;

DROP TABLE IF EXISTS gv_rev CASCADE;

CREATE TABLE gv_rev(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gv_id uuid DEFAULT NULL,
  garten_id uuid DEFAULT NULL,
  person_id uuid,
  changed timestamp DEFAULT now(),
  changed_by text DEFAULT NULL,
  _rev text DEFAULT NULL,
  _rev_at decimal DEFAULT extract(epoch FROM now() at time zone 'utc'),
  _parent_rev text DEFAULT NULL,
  _revisions text[] DEFAULT NULL,
  _depth integer DEFAULT 1,
  _deleted boolean DEFAULT FALSE
);

ALTER TABLE ONLY gv_rev
  ALTER COLUMN gv_id SET DEFAULT NULL;

CREATE INDEX ON gv_rev USING btree(id);

CREATE INDEX ON gv_rev USING btree(_rev);

CREATE INDEX ON gv_rev USING btree(_parent_rev);

CREATE INDEX ON gv_rev USING btree(_depth);

CREATE INDEX ON gv_rev USING btree(_deleted);

CREATE INDEX ON gv_rev USING btree(_rev_at);

