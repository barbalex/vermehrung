
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
    kultur_felder (kultur_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$kultur_has_felder$ LANGUAGE plpgsql;

CREATE TRIGGER kultur_has_felder AFTER INSERT ON kultur
  FOR EACH ROW EXECUTE PROCEDURE kultur_has_felder();

-- in case this trigger was not working
-- add kultur where they are missing
insert into kultur_felder (kultur_id)
select kultur.id from kultur
left join kultur_felder
on kultur_felder.kultur_id = kultur.id
where kultur_felder.kultur_id is null;


DROP TRIGGER IF EXISTS person_has_felder ON person cascade;
DROP FUNCTION IF EXISTS person_has_felder() cascade;
CREATE FUNCTION person_has_felder() RETURNS trigger AS $person_has_felder$
BEGIN
  INSERT INTO
    person_felder (person_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$person_has_felder$ LANGUAGE plpgsql;

CREATE TRIGGER person_has_felder AFTER INSERT ON person
  FOR EACH ROW EXECUTE PROCEDURE person_has_felder();

-- in case this trigger was not working
-- add person where they are missing
insert into person_felder (person_id)
select person.id from person
left join person_felder
on person_felder.person_id = person.id
where person_felder.person_id is null;




