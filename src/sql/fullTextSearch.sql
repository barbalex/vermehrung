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
from person;

SELECT
  to_tsvector('simple', coalesce(ae_art.name, '')) as vector
from
  art inner join ae_art on art.ae_id = ae_art.id
limit 5;

SELECT
  setweight(to_tsvector('simple', coalesce(nr, '')), 'A') || ' ' ||
  setweight(to_tsvector('simple', coalesce(lokalname, '')), 'A') || ' ' ||
  setweight(to_tsvector('german', coalesce(gemeinde, '')), 'B') || ' ' ||
  setweight(to_tsvector('german', coalesce(kanton, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(land, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(x::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(y::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(bemerkungen, '')), 'C') as vector
from herkunft
LIMIT 5;
