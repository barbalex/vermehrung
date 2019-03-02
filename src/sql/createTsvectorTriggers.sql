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