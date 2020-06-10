
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

DROP TRIGGER IF EXISTS kultur_has_qk_choosen ON kultur_qk_choosen cascade;
DROP FUNCTION IF EXISTS kultur_has_qk_choosen() cascade;
CREATE FUNCTION kultur_has_qk_choosen() RETURNS trigger AS $kultur_has_qk_choosen$
BEGIN
  insert into kultur_qk_choosen(kultur_id, qk_name)
  select distinct kultur.id, kultur_qk.name from kultur, kultur_qk where kultur.id = NEW.id;
  RETURN NEW;
END;
$kultur_has_qk_choosen$ LANGUAGE plpgsql;

CREATE TRIGGER kultur_has_qk_choosen AFTER INSERT ON kultur
  FOR EACH ROW EXECUTE PROCEDURE kultur_has_qk_choosen();


--insert into kultur_qk_choosen (kultur_id)
--select kultur.id, kultur_qk.name from kultur, kultur_qk
--left join kultur_qk_choosen
--on kultur_qk_choosen.kultur_id = kultur.id
--where kultur_qk_choosen.kultur_id is null;

DROP TRIGGER IF EXISTS art_has_qk_choosen ON art_qk_choosen cascade;
DROP FUNCTION IF EXISTS art_has_qk_choosen() cascade;
CREATE FUNCTION art_has_qk_choosen() RETURNS trigger AS $art_has_qk_choosen$
BEGIN
  insert into art_qk_choosen(art_id, qk_name)
  select distinct art.id, art_qk.name from art, art_qk where art.id = NEW.id;
  RETURN NEW;
END;
$art_has_qk_choosen$ LANGUAGE plpgsql;

CREATE TRIGGER art_has_qk_choosen AFTER INSERT ON art
  FOR EACH ROW EXECUTE PROCEDURE art_has_qk_choosen();

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

