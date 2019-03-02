create function person_trigger() returns trigger as $$
  begin
    new.tsv :=
      setweight(to_tsvector('simple', coalesce(new.nr, '')), 'A') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.name, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.adresszusatz, '')), 'C') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.strasse, '')), 'C') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.plz::text, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.ort, '')), 'C') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.telefon_privat, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.telefon_geschaeft, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.telefon_mobile, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.fax_privat, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.fax_geschaeft, '')), 'D') || ' ' ||
      setweight(to_tsvector('simple', coalesce(new.email, '')), 'C') || ' ' ||
      setweight(to_tsvector('german', coalesce(new.bemerkungen, '')), 'C');
    return new;
  end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate_person BEFORE INSERT OR UPDATE
  ON person FOR EACH ROW EXECUTE PROCEDURE person_trigger();