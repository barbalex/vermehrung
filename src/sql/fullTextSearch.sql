-- examples
SELECT to_tsvector('german', 'Der Tag ist schön und die Sonne scheint');
SELECT to_tsvector('german', 'Der Tag ist schön und die Sonne scheint') @@ to_tsquery('Sonne');

SELECT
  setweight(to_tsvector('simple', coalesce(nr, '')), 'A') || ' ' ||
  setweight(to_tsvector('simple', coalesce(name, '')), 'A') || ' ' ||
  setweight(to_tsvector('german', coalesce(adresszusatz, '')), 'C') || ' ' ||
  setweight(to_tsvector('german', coalesce(strasse, '')), 'C') || ' ' ||
  setweight(to_tsvector('simple', coalesce(plz::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(ort, '')), 'C') || ' ' ||
  setweight(to_tsvector('simple', coalesce(telefon_privat, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(telefon_geschaeft, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(telefon_mobile, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(fax_privat, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(fax_geschaeft, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(email, '')), 'C') || ' ' ||
  setweight(to_tsvector('german', coalesce(bemerkungen, '')), 'C') as vector
from person
