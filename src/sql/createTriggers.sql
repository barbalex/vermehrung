
DROP TRIGGER IF EXISTS zaehlung_has_teilzaehlung ON teilzaehlung;
DROP FUNCTION IF EXISTS zaehlung_has_teilzaehlung();
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