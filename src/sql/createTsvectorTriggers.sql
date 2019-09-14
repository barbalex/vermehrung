DROP TRIGGER IF EXISTS tsvupdate_person ON person;
DROP FUNCTION IF EXISTS person_trigger();
create function person_trigger() returns trigger as $$
  begin
    new.tsv :=
      setweight(to_tsvector('simple', coalesce(new.nr, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.name, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.adresszusatz, '')), 'C') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.strasse, '')), 'C') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.plz::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.ort, '')), 'C') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.telefon_privat, '')), 'D') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.telefon_geschaeft, '')), 'D') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.telefon_mobile, '')), 'D') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.fax_privat, '')), 'D') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.fax_geschaeft, '')), 'D') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.email, '')), 'C') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'C');
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_person before insert or update
  on person for each row execute procedure person_trigger();

DROP TRIGGER IF EXISTS tsvupdate_art ON art;
DROP FUNCTION IF EXISTS art_trigger();
create function art_trigger() returns trigger as $$
  declare
    artname text;
  begin
    select ae_art.name into artname
    from ae_art inner join art on art.ae_id = ae_art.id
    where ae_art.id = new.ae_id;
    new.tsv :=
      to_tsvector('german', coalesce(artname, ''));
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_art before insert or update
  on art for each row execute procedure art_trigger();

DROP TRIGGER IF EXISTS tsvupdate_herkunft ON herkunft;
DROP FUNCTION IF EXISTS herkunft_trigger();
create function herkunft_trigger() returns trigger as $$
  begin
    new.tsv :=
      setweight(to_tsvector('simple', coalesce(new.nr, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.lokalname, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.gemeinde, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.kanton, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.land, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'C');
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_herkunft before insert or update
  on herkunft for each row execute procedure herkunft_trigger();

DROP TRIGGER IF EXISTS tsvupdate_sammlung ON sammlung;
DROP FUNCTION IF EXISTS sammlung_trigger();
create function sammlung_trigger() returns trigger as $$
  declare
    artname text;
    personname text;
    herkunftnr text;
    herkunftlokalname text;
  begin
    select ae_art.name into artname
    from sammlung
      inner join art 
        inner join ae_art on art.ae_id = ae_art.id
      on sammlung.art_id = art.id
    where art.id = new.art_id;
    select person.name into personname
    from sammlung left join person on sammlung.person_id = person.id
    where person.id = new.person_id;
    select herkunft.nr, herkunft.lokalname into herkunftnr, herkunftlokalname
    from sammlung left join herkunft on sammlung.herkunft_id = herkunft.id
    where herkunft.id = new.herkunft_id;
    new.tsv :=
      setweight(to_tsvector('german', coalesce(artname, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(personname, '')), 'B') || ' ' ||
      setweight(to_tsvector('simple', coalesce(herkunftnr, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(herkunftlokalname, '')), 'B') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.nr, '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.von_anzahl_individuen::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'YYYY.MM.DD'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'YYYY'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'MM'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'DD'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.menge_beschrieben, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'C');
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_sammlung before insert or update
  on sammlung for each row execute procedure sammlung_trigger();

DROP TRIGGER IF EXISTS tsvupdate_garten ON garten;
DROP FUNCTION IF EXISTS garten_trigger();
create function garten_trigger() returns trigger as $$
  declare
    personname text;
  begin
    select person.name into personname
    from garten left join person on garten.person_id = person.id
    where person.id = new.person_id;
    new.tsv :=
      setweight(to_tsvector('german', coalesce(new.name, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(personname, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'C');
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_garten before insert or update
  on garten for each row execute procedure garten_trigger();

DROP TRIGGER IF EXISTS tsvupdate_kultur ON kultur;
DROP FUNCTION IF EXISTS kultur_trigger();
create function kultur_trigger() returns trigger as $$
  declare
    artname text;
    personname text;
    herkunftnr text;
    herkunftlokalname text;
  begin
    select ae_art.name into artname
    from kultur
      inner join art 
        inner join ae_art on art.ae_id = ae_art.id
      on kultur.art_id = art.id
    where art.id = new.art_id;
    select person.name into personname
    from kultur left join garten
      inner join person on garten.person_id = person.id
    on new.garten_id = garten.id;
    select herkunft.nr, herkunft.lokalname into herkunftnr, herkunftlokalname
    from kultur left join herkunft on kultur.herkunft_id = herkunft.id
    where herkunft.id = new.herkunft_id;
      new.tsv :=
      setweight(to_tsvector('german', coalesce(artname, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(personname, '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(herkunftnr, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(herkunftlokalname, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'D') || ' ' ||
      case
        when new.zwischenlager='true' then setweight(to_tsvector('german', 'zwischenlager'), 'A')
        else ''
      end || ' ' ||
      case
        when new.erhaltungskultur='true' then setweight(to_tsvector('german', 'erhaltungskultur'), 'A')
        else ''
      end;
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_kultur before insert or update
  on kultur for each row execute procedure kultur_trigger();

DROP TRIGGER IF EXISTS tsvupdate_kultur_event ON kultur_event;
DROP FUNCTION IF EXISTS kultur_event_trigger();
create function kultur_event_trigger() returns trigger as $$
  declare
    artname text;
    personname text;
  begin
    select ae_art.name, person.name into artname, personname
    from kultur_event
      inner join kultur 
        inner join art 
          inner join ae_art on art.ae_id = ae_art.id
        on kultur.art_id = art.id
        left join garten
          inner join person on garten.person_id = person.id
        on kultur.garten_id = garten.id
      on kultur_event.kultur_id = kultur.id
    where kultur.id = new.kultur_id;
    new.tsv :=
      setweight(to_tsvector('german', coalesce(artname, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(personname, '')), 'B') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'YYYY.MM.DD'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'YYYY'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'MM'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'DD'), '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.event, '')), 'A');
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_kultur_event before insert or update
  on kultur_event for each row execute procedure kultur_event_trigger();

DROP TRIGGER IF EXISTS tsvupdate_zaehlung ON zaehlung;
DROP FUNCTION IF EXISTS zaehlung_trigger();
create function zaehlung_trigger() returns trigger as $$
  declare
    artname text;
    personname text;
    orte text;
    mengen_beschrieben text;
    erscheinungen text;
  begin
    select
      ae_art.name,
      person.name,
      string_agg(tz.ort, ' '),
      string_agg(tz.menge_beschrieben, ' '),
      string_agg(tz.erscheinung, ' ')
    into
      artname,
      personname,
      orte,
      mengen_beschrieben,
      erscheinungen
    from zaehlung
      inner join kultur 
        inner join art 
          inner join ae_art on art.ae_id = ae_art.id
        on kultur.art_id = art.id
        left join garten
          inner join person on garten.person_id = person.id
        on kultur.garten_id = garten.id
      on zaehlung.kultur_id = kultur.id
      inner join teilzaehlung tz
      on tz.zaehlung_id = zaehlung.id
    where kultur.id = new.kultur_id
    group by ae_art.name, person.name, zaehlung.id;
    new.tsv :=
      setweight(to_tsvector('simple', coalesce(artname, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(personname, '')), 'B') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'YYYY.MM.DD'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'YYYY'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'MM'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'DD'), '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(orte, '')), 'C') || ' ' ||
      setweight(to_tsvector('german', coalesce(mengen_beschrieben, '')), 'C') || ' ' ||
      setweight(to_tsvector('german', coalesce(erscheinungen, '')), 'C') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'C');
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_zaehlung before insert or update
  on zaehlung for each row execute procedure zaehlung_trigger();

DROP TRIGGER IF EXISTS tsvupdate_lieferung ON lieferung;
DROP FUNCTION IF EXISTS lieferung_trigger();
create function lieferung_trigger() returns trigger as $$
  declare
    artname text;
    personname text;
    sammlungNr text;
    sammlungDatum text;
    sammlungPerson text;
    sammlungHerkunftNr text;
    sammlungHerkunftLokalname text;
    vonKulturPersonName text;
    nachKulturPersonName text;
  begin
    select ae_art.name into artname
    from lieferung
      inner join art 
        inner join ae_art on art.ae_id = ae_art.id
      on lieferung.art_id = art.id
    where art.id = new.art_id;
    select person.name into personname
    from lieferung
      left join person
      on lieferung.person_id = person.id
    where person.id = new.person_id;
    select sammlung.nr, to_char(sammlung.datum, 'YYYY.MM.DD'), sammlungPerson.name, herkunft.nr, herkunft.lokalname
    into sammlungNr, sammlungDatum, sammlungPerson, sammlungHerkunftNr, sammlungHerkunftLokalname
    from lieferung
      left join sammlung
        left join person as sammlungPerson on sammlung.person_id = person_id
        left join herkunft on sammlung.herkunft_id = herkunft.id
      on lieferung.von_sammlung_id = sammlung.id
    where sammlung.id = new.von_sammlung_id;
    select vonKulturPerson.name into vonKulturPersonName
    from lieferung
      left join kultur as vonKultur
        inner join garten as vonGarten
          inner join person as vonKulturPerson on vonGarten.person_id = person_id
        on vonKultur.garten_id = vonGarten.id
      on lieferung.von_kultur_id = vonKultur.id
    where vonKultur.id = new.von_kultur_id;
    select nachKulturPerson.name into nachKulturPersonName
    from lieferung
      left join kultur as nachKultur
        inner join garten as nachGarten
          inner join person as nachKulturPerson on nachGarten.person_id = person_id
        on nachKultur.garten_id = nachGarten.id
      on lieferung.nach_kultur_id = nachKultur.id
    where nachKultur.id = new.nach_kultur_id;
    new.tsv :=
      setweight(to_tsvector('german', coalesce(artname, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(personname, '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.von_datum, 'YYYY.MM.DD'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.von_datum, 'YYYY'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.von_datum, 'MM'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.von_datum, 'DD'), '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(sammlungNr, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(sammlungDatum, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(sammlungPerson, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(sammlungHerkunftNr, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(sammlungHerkunftLokalname, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(vonKulturPersonName, '')), 'B') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.nach_datum, 'YYYY.MM.DD'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.nach_datum, 'YYYY'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.nach_datum, 'MM'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.nach_datum, 'DD'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.menge_beschrieben, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(nachKulturPersonName, '')), 'B') || ' ' ||
      case
        when new.nach_ausgepflanzt='true' then setweight(to_tsvector('simple', 'ausgepflanzt'), 'A')
        else ''
      end || ' ' ||
      case
        when new.ausgefuehrt='true' then setweight(to_tsvector('simple', 'ausgeführt'), 'A')
        else setweight(to_tsvector('simple', 'geplant'), 'A')
      end || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'C');
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_lieferung before insert or update
  on lieferung for each row execute procedure lieferung_trigger();