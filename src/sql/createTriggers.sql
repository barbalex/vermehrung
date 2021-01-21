DROP TRIGGER IF EXISTS zaehlung_has_teilzaehlung ON teilzaehlung cascade;
DROP FUNCTION IF EXISTS zaehlung_has_teilzaehlung() cascade;
CREATE FUNCTION zaehlung_has_teilzaehlung() RETURNS trigger AS $zaehlung_has_teilzaehlung$
BEGIN
  INSERT INTO
    teilzaehlung (zaehlung_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$zaehlung_has_teilzaehlung$ LANGUAGE plpgsql;

CREATE TRIGGER zaehlung_has_teilzaehlung AFTER INSERT ON zaehlung
  FOR EACH ROW EXECUTE PROCEDURE zaehlung_has_teilzaehlung();

-- in case this trigger was not working
-- add teilzaehlung where they are missing
insert into teilzaehlung (zaehlung_id)
select zaehlung.id from zaehlung
left join teilzaehlung
on teilzaehlung.zaehlung_id = zaehlung.id
where teilzaehlung.zaehlung_id is null;


DROP TRIGGER IF EXISTS kultur_has_felder ON kultur cascade;
DROP FUNCTION IF EXISTS kultur_has_felder() cascade;
CREATE FUNCTION kultur_has_felder() RETURNS trigger AS $kultur_has_felder$
BEGIN
  INSERT INTO
    kultur_option (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$kultur_has_felder$ LANGUAGE plpgsql;

CREATE TRIGGER kultur_has_felder AFTER INSERT ON kultur
  FOR EACH ROW EXECUTE PROCEDURE kultur_has_felder();

-- in case this trigger was not working
-- add kultur where they are missing
--insert into kultur_option (kultur_id)
--select kultur.id from kultur
--left join kultur_option
--on kultur_option.kultur_id = kultur.id
--where kultur_option.kultur_id is null;

DROP TRIGGER IF EXISTS person_has_felder ON person cascade;
DROP FUNCTION IF EXISTS person_has_felder() cascade;
CREATE FUNCTION person_has_felder() RETURNS trigger AS $person_has_felder$
BEGIN
  INSERT INTO
    person_option (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$person_has_felder$ LANGUAGE plpgsql;

CREATE TRIGGER person_has_felder AFTER INSERT ON person
  FOR EACH ROW EXECUTE PROCEDURE person_has_felder();

-- in case this trigger was not working
-- add person where they are missing
insert into person_option (id)
select person.id from person
left join person_option
on person_option.id = person.id
where person_option.id is null;

-- in case this trigger was not working
-- add person where they are missing
insert into person_option (id)
select person.id from person
left join person_option
on person_option.id = person.id
where person_option.id is null;

drop trigger if exists garten_person_has_gv on garten cascade;
drop function if exists garten_person_has_gv() cascade;
create function garten_person_has_gv() returns trigger as $garten_person_has_gv$
begin
  if new.person_id <> old.person_id then
    delete from gv 
    where 
      person_id = old.person_id 
      and garten_id = old.garten_id;
    if new.person_id is not null then
      insert into gv (person_id, garten_id)
      values (new.person_id, new.garten_id);
    end if;
  end if;
  return new;
end;
$garten_person_has_gv$ language plpgsql;

create trigger garten_person_has_gv after update on garten
  for each row execute procedure garten_person_has_gv();

--insert into gv (person_id, garten_id)
--select person_id, id from garten
--where person_id is not null;


DROP TRIGGER IF EXISTS zwischenvermehrung_exists_for_herkunft_in_gaw ON teilzaehlung cascade;
DROP FUNCTION IF EXISTS zwischenvermehrung_exists_for_herkunft_in_gaw() cascade;
CREATE or replace FUNCTION zwischenvermehrung_exists_for_herkunft_in_gaw() RETURNS trigger AS $zwischenvermehrung_exists_for_herkunft_in_gaw$
BEGIN
  -- if art_id and herkunft_id exist
  -- insert: art_id, herkunft_id, garten_id of gaw, zwischenlager
  if 
    new.art_id is not null
    and new.herkunft_id is not null
  then
    INSERT INTO kultur (art_id, herkunft_id, garten_id, zwischenlager, aktiv)
    VALUES
      -- gaw
      (NEW.art_id, NEW.herkunft_id, 'cc033efa-b555-11ea-b3de-0242ac130004', true, true),
      -- topos kühlschrank
      (NEW.art_id, NEW.herkunft_id, '1c3ba9f0-ed20-11ea-be2b-93662cfc26b3', true, true)
    ON CONFLICT DO NOTHING;
  end if;
  RETURN NEW;
END;
$zwischenvermehrung_exists_for_herkunft_in_gaw$ LANGUAGE plpgsql;

CREATE TRIGGER zwischenvermehrung_exists_for_herkunft_in_gaw AFTER UPDATE ON sammlung
  FOR EACH ROW EXECUTE PROCEDURE zwischenvermehrung_exists_for_herkunft_in_gaw();

insert into kultur (art_id, herkunft_id, garten_id, zwischenlager)
select
  art_id,
  herkunft_id,
  'cc033efa-b555-11ea-b3de-0242ac130004',
  true
from sammlung
where art_id is not null and herkunft_id is not null
group by art_id, herkunft_id
ON CONFLICT DO NOTHING;

-- topos kühlschrank
insert into kultur (art_id, herkunft_id, garten_id, zwischenlager)
select
  art_id,
  herkunft_id,
  '1c3ba9f0-ed20-11ea-be2b-93662cfc26b3',
  true
from sammlung
where art_id is not null and herkunft_id is not null
group by art_id, herkunft_id
ON CONFLICT DO NOTHING;

------------------------------------------
-- TODO: 2020.12.24 refactor choosen qk

DROP TRIGGER IF EXISTS person_option_has_qks ON person_option cascade;
DROP FUNCTION IF EXISTS person_option_has_qks() cascade;
CREATE FUNCTION person_option_has_qks() RETURNS trigger AS $$
BEGIN
  update person_option
  set art_qk_choosen = ARRAY (select id from art_qk);
  update person_option
  set kultur_qk_choosen = ARRAY (select id from kultur_qk);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER person_option_has_qks AFTER INSERT ON person_option
  FOR EACH ROW EXECUTE PROCEDURE person_option_has_qks();

-- add when inserting art_qk

DROP TRIGGER IF EXISTS person_option_has_art_qks ON art_qk cascade;
DROP FUNCTION IF EXISTS person_option_has_art_qks() cascade;
CREATE FUNCTION person_option_has_art_qks() RETURNS trigger AS $$
BEGIN
  update person_option
  set art_qk_choosen = art_qk_choosen || new.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER person_option_has_art_qks AFTER INSERT ON art_qk
  FOR EACH ROW EXECUTE PROCEDURE person_option_has_art_qks();

-- add when inserting kultur_qk

DROP TRIGGER IF EXISTS person_option_has_kultur_qks ON kultur_qk cascade;
DROP FUNCTION IF EXISTS person_option_has_kultur_qks() cascade;
CREATE FUNCTION person_option_has_kultur_qks() RETURNS trigger AS $$
BEGIN
  update person_option
  set kultur_qk_choosen = kultur_qk_choosen || new.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER person_option_has_kultur_qks AFTER INSERT ON kultur_qk
  FOR EACH ROW EXECUTE PROCEDURE person_option_has_kultur_qks();