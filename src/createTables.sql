CREATE EXTENSION if not exists "uuid-ossp";

DROP TABLE IF EXISTS person;
CREATE TABLE public.person (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  name text DEFAULT NULL,
  person text DEFAULT NULL,
  telefon text DEFAULT NULL,
  email text DEFAULT NULL,
  changed date DEFAULT NOW(),
  changed_by varchar(20) DEFAULT null
);
CREATE INDEX ON public.person USING btree (id);
CREATE INDEX ON public.person USING btree (name);
COMMENT ON COLUMN public.person.id IS 'Primärschlüssel';
COMMENT ON COLUMN public.person.name IS 'Vor- und Nachname';
COMMENT ON COLUMN public.person.person IS 'Strasse, PLZ und Ort';
COMMENT ON COLUMN public.person.telefon IS 'Telefonnummer';
COMMENT ON COLUMN public.person.email IS 'Email';
COMMENT ON COLUMN public.person.changed IS 'Wann wurde der Datensatz zuletzt geändert?';
COMMENT ON COLUMN public.person.changed_by IS 'Von wem wurde der Datensatz zuletzt geändert?';

DROP TABLE IF EXISTS public.user CASCADE;
CREATE TABLE public.user (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  name text UNIQUE,
  -- allow other attributes to be null
  -- so names and roles can be set beforehand by topos
  email text UNIQUE default null,
  role name DEFAULT NULL,
  pass text DEFAULT NULL,
  person_id uuid DEFAULT NULL REFERENCES public.person (id) ON DELETE SET NULL ON UPDATE CASCADE,
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
  ae_id
);
