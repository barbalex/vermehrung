DROP TRIGGER IF EXISTS tsvupdate_person ON person;
DROP FUNCTION IF EXISTS person_trigger();
create function person_trigger() returns trigger as $$
  begin
    if new.aktiv = True then
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
    else
      new.tsv := '';
    end if;
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_person before insert or update
  on person for each row execute procedure person_trigger();

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

create function herkunft_trigger() returns trigger as $$
  begin
    new.tsv :=
      setweight(to_tsvector('simple', coalesce(new.nr, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.lokalname, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.gemeinde, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.kanton, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.land, '')), 'B') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.x::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.y::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'C');
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_herkunft before insert or update
  on herkunft for each row execute procedure herkunft_trigger();

create function sammlung_trigger() returns trigger as $$
  declare
    artname text;
    personname text;
    herkunftnr text;
    herkunftlokalname text;
    zaehleinheit text;
    masseinheit text;
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
    select zaehleinheit_werte.wert into zaehleinheit
    from sammlung left join zaehleinheit_werte on sammlung.zaehleinheit = zaehleinheit_werte.id
    where zaehleinheit_werte.id = new.zaehleinheit;
    select masseinheit_werte.wert into masseinheit
    from sammlung left join masseinheit_werte on sammlung.masseinheit = masseinheit_werte.id
    where masseinheit_werte.id = new.masseinheit;
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
      setweight(to_tsvector('german', coalesce(zaehleinheit, '')), 'C') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.menge::text, '')), 'C') || ' ' ||
      setweight(to_tsvector('german', coalesce(masseinheit, '')), 'C') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'C');
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_sammlung before insert or update
  on sammlung for each row execute procedure sammlung_trigger();

create function garten_trigger() returns trigger as $$
  declare
    personname text;
  begin
    select person.name into personname
    from garten left join person on garten.person_id = person.id
    where person.id = new.person_id;
    new.tsv :=
      setweight(to_tsvector('german', coalesce(personname, '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.x::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.y::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'C');
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_garten before insert or update
  on garten for each row execute procedure garten_trigger();

create function kultur_trigger() returns trigger as $$
  declare
    artname text;
    personname text;
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
    new.tsv :=
      setweight(to_tsvector('german', coalesce(artname, '')), 'A') || ' ' ||
  setweight(to_tsvector('german', coalesce(personname, '')), 'A') || ' ' ||
  setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'D');
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_kultur before insert or update
  on kultur for each row execute procedure kultur_trigger();

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

create function kultur_inventar_trigger() returns trigger as $$
  declare
    artname text;
    personname text;
  begin
    select ae_art.name, person.name into artname, personname
    from kultur_inventar
      inner join kultur 
        inner join art 
          inner join ae_art on art.ae_id = ae_art.id
        on kultur.art_id = art.id
        left join garten
          inner join person on garten.person_id = person.id
        on kultur.garten_id = garten.id
      on kultur_inventar.kultur_id = kultur.id
    where kultur.id = new.kultur_id;
    new.tsv :=
      setweight(to_tsvector('german', coalesce(artname, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(personname, '')), 'B') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'YYYY.MM.DD'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'YYYY'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'MM'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'DD'), '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.kasten, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.beet, '')), 'B') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.nr, '')), 'B') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.anzahl_pflanzen::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.anz_mutter_pflanzen::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.anz_nicht_auspflanzbereit::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.anz_auspflanzbereit::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.anz_bluehend::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bluehdatum, '')), 'D') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.instruktion, '')), 'C') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'C');
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_kultur_inventar before insert or update
  on kultur_inventar for each row execute procedure kultur_inventar_trigger();

create function zaehlung_trigger() returns trigger as $$
  declare
    artname text;
    personname text;
  begin
    select ae_art.name, person.name into artname, personname
    from zaehlung
      inner join kultur 
        inner join art 
          inner join ae_art on art.ae_id = ae_art.id
        on kultur.art_id = art.id
        left join garten
          inner join person on garten.person_id = person.id
        on kultur.garten_id = garten.id
      on zaehlung.kultur_id = kultur.id
    where kultur.id = new.kultur_id;
    new.tsv :=
      setweight(to_tsvector('german', coalesce(artname, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(personname, '')), 'B') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'YYYY.MM.DD'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'YYYY'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'MM'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.datum, 'DD'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.anzahl_pflanzen::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.anz_mutter_pflanzen::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.anz_nicht_auspflanzbereit::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.anz_auspflanzbereit::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.anz_bluehend::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bluehdatum, '')), 'D') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.instruktion, '')), 'C') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'C');
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_zaehlung before insert or update
  on zaehlung for each row execute procedure zaehlung_trigger();

create function lieferung_trigger() returns trigger as $$
  declare
    artname text;
    personname text;
    typ text;
    status text;
    zaehleinheit text;
    masseinheit text;
    sammlungNr text;
    sammlungDatum text;
    sammlungPerson text;
    sammlungHerkunftNr text;
    sammlungHerkunftLokalname text;
    vonKulturPersonName text;
    zwischenlager text;
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
    select lieferung_typ_werte.wert into typ
    from lieferung
      left join lieferung_typ_werte
      on lieferung.typ = lieferung_typ_werte.id
    where lieferung_typ_werte.id = new.typ;
    select lieferung_status_werte.wert into status
    from lieferung
      left join lieferung_status_werte
      on lieferung.status = lieferung_status_werte.id
    where lieferung_status_werte.id = new.status;
    select zaehleinheit_werte.wert into zaehleinheit
    from lieferung
      left join zaehleinheit_werte
      on lieferung.zaehleinheit = zaehleinheit_werte.id
    where zaehleinheit_werte.id = new.zaehleinheit;
    select masseinheit_werte.wert into masseinheit
    from lieferung
      left join masseinheit_werte
      on lieferung.masseinheit = masseinheit_werte.id
    where masseinheit_werte.id = new.masseinheit;
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
    select lieferung_zwischenlager_werte.wert into zwischenlager
    from lieferung
      left join lieferung_zwischenlager_werte
      on lieferung.zwischenlager = lieferung_zwischenlager_werte.id
    where lieferung_zwischenlager_werte.id = new.zwischenlager;
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
      setweight(to_tsvector('german', coalesce(typ, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(status, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(zaehleinheit, '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.menge::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('german', coalesce(masseinheit, '')), 'A') || ' ' ||
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
      setweight(to_tsvector('german', coalesce(zwischenlager, '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.nach_datum, 'YYYY.MM.DD'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.nach_datum, 'YYYY'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.nach_datum, 'MM'), '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(to_char(new.nach_datum, 'DD'), '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(nachKulturPersonName, '')), 'B') || ' ' ||
      case
        when new.nach_ausgepflanzt='true' then setweight(to_tsvector('simple', 'ausgepflanzt'), 'A')
        else ''
      end || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'C');
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_lieferung before insert or update
  on lieferung for each row execute procedure lieferung_trigger();