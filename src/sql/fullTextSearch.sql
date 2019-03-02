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

SELECT
  setweight(to_tsvector('simple', coalesce(ae_art.name, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(person.name, '')), 'B') || ' ' ||
  setweight(to_tsvector('german', coalesce(herkunft.nr, '')), 'B') || ' ' ||
  setweight(to_tsvector('german', coalesce(herkunft.lokalname, '')), 'B') || ' ' ||
  setweight(to_tsvector('german', coalesce(sammlung.nr, '')), 'A') || ' ' ||
  setweight(to_tsvector('simple', coalesce(sammlung.von_anzahl_individuen::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(sammlung.datum::text, '')), 'A') || ' ' ||
  setweight(to_tsvector('simple', coalesce(zaehleinheit_werte.wert, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(sammlung.menge::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(masseinheit_werte.wert, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(sammlung.bemerkungen, '')), 'D') as vector
from sammlung
  inner join art 
    inner join ae_art on art.ae_id = ae_art.id
  on sammlung.art_id = art.id
  left join person on sammlung.person_id = person.id
  left join herkunft on sammlung.herkunft_id = herkunft.id
  left join zaehleinheit_werte on sammlung.zaehleinheit = zaehleinheit_werte.id
  left join masseinheit_werte on sammlung.masseinheit = masseinheit_werte.id;

SELECT
  setweight(to_tsvector('simple', coalesce(person.name, '')), 'A') || ' ' ||
  setweight(to_tsvector('german', coalesce(x::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('german', coalesce(y::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(garten.bemerkungen, '')), 'C') as vector
from garten
  left join person on garten.person_id = person.id;

SELECT
  setweight(to_tsvector('simple', coalesce(ae_art.name, '')), 'A') || ' ' ||
  setweight(to_tsvector('simple', coalesce(person.name, '')), 'A') || ' ' ||
  setweight(to_tsvector('simple', coalesce(kultur.bemerkungen, '')), 'D') as vector
from kultur
  inner join art 
    inner join ae_art on art.ae_id = ae_art.id
  on kultur.art_id = art.id
  left join garten
    inner join person on garten.person_id = person.id
  on kultur.garten_id = garten.id;

SELECT
  setweight(to_tsvector('simple', coalesce(ae_art.name, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(person.name, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(datum::text, '')), 'A') || ' ' ||
  setweight(to_tsvector('german', coalesce(event, '')), 'A') as vector
from kultur_event
  inner join kultur 
    inner join art 
      inner join ae_art on art.ae_id = ae_art.id
    on kultur.art_id = art.id
    left join garten
      inner join person on garten.person_id = person.id
    on kultur.garten_id = garten.id
  on kultur_event.kultur_id = kultur.id;


