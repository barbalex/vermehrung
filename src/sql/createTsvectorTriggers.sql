create function person_trigger() returns trigger as $$
  begin
    new.tsv :=
      setweight(to_tsvector('simple', coalesce(new.nr, '')), 'a') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.name, '')), 'a') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.adresszusatz, '')), 'c') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.strasse, '')), 'c') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.plz::text, '')), 'd') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.ort, '')), 'c') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.telefon_privat, '')), 'd') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.telefon_geschaeft, '')), 'd') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.telefon_mobile, '')), 'd') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.fax_privat, '')), 'd') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.fax_geschaeft, '')), 'd') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.email, '')), 'c') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'c');
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
      to_tsvector('simple', coalesce(artname, ''));
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_art before insert or update
  on art for each row execute procedure art_trigger();

create function herkunft_trigger() returns trigger as $$
  begin
    new.tsv :=
      setweight(to_tsvector('simple', coalesce(new.nr, '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.lokalname, '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.gemeinde, '')), 'B') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.kanton, '')), 'B') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.land, '')), 'B') || ' ' ||
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
      setweight(to_tsvector('simple', coalesce(artname, '')), 'B') || ' ' ||
      setweight(to_tsvector('simple', coalesce(personname, '')), 'B') || ' ' ||
      setweight(to_tsvector('simple', coalesce(herkunftnr, '')), 'B') || ' ' ||
      setweight(to_tsvector('simple', coalesce(herkunftlokalname, '')), 'B') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.nr, '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.von_anzahl_individuen::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.datum::text, '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(zaehleinheit, '')), 'C') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.menge::text, '')), 'C') || ' ' ||
      setweight(to_tsvector('simple', coalesce(masseinheit, '')), 'C') || ' ' ||
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
      setweight(to_tsvector('simple', coalesce(personname, '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.x::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.y::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'C');
    return new;
  end
$$ language plpgsql;

create trigger tsvupdate_garten before insert or update
  on garten for each row execute procedure garten_trigger();