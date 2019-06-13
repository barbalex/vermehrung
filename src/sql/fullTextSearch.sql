-- this file is not needed for app execution
-- examples of searching
SELECT to_tsvector('german', 'Der Tag ist schön und die Sonne scheint');
SELECT to_tsvector('german', 'Der Tag ist schön und die Sonne scheint') @@ to_tsquery('Sonne');
select * from art where tsv @@ to_tsquery('carex');

art_search(args: {filter: "abies"}) {
  id
}

-- queries
-- these are not directly built
-- rather they were used to build the triggers
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
  setweight(to_tsvector('simple', coalesce(to_char(sammlung.datum, 'YYYY.MM.DD'), '')), 'A') || ' ' ||
  setweight(to_tsvector('simple', coalesce(sammlung.bemerkungen, '')), 'D') as vector
from sammlung
  inner join art 
    inner join ae_art on art.ae_id = ae_art.id
  on sammlung.art_id = art.id
  left join person on sammlung.person_id = person.id
  left join herkunft on sammlung.herkunft_id = herkunft.id;

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

SELECT
  setweight(to_tsvector('simple', coalesce(ae_art.name, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(person.name, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(kultur_inventar.datum::text, '')), 'A') || ' ' ||
  setweight(to_tsvector('german', coalesce(kultur_inventar.kasten, '')), 'B') || ' ' ||
  setweight(to_tsvector('german', coalesce(kultur_inventar.beet, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(kultur_inventar.nr, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(kultur_inventar.anzahl_pflanzen::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(kultur_inventar.anz_mutter_pflanzen::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(kultur_inventar.anzahl_auspflanzbereit::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(kultur_inventar.anz_bluehend::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(kultur_inventar.bluehdatum, '')), 'D') || ' ' ||
  setweight(to_tsvector('german', coalesce(kultur_inventar.instruktion, '')), 'C') || ' ' ||
  setweight(to_tsvector('german', coalesce(kultur_inventar.bemerkungen, '')), 'C')
  as vector
from kultur_inventar
  inner join kultur 
    inner join art 
      inner join ae_art on art.ae_id = ae_art.id
    on kultur.art_id = art.id
    left join garten
      inner join person on garten.person_id = person.id
    on kultur.garten_id = garten.id
  on kultur_inventar.kultur_id = kultur.id;

SELECT
  setweight(to_tsvector('simple', coalesce(ae_art.name, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(person.name, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(zaehlung.datum::text, '')), 'A') || ' ' ||
  setweight(to_tsvector('simple', coalesce(zaehlung.anzahl_pflanzen::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(zaehlung.anz_mutter_pflanzen::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(zaehlung.anzahl_auspflanzbereit::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(zaehlung.anz_bluehend::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(zaehlung.bluehdatum, '')), 'D') || ' ' ||
  setweight(to_tsvector('german', coalesce(zaehlung.instruktion, '')), 'C') || ' ' ||
  setweight(to_tsvector('german', coalesce(zaehlung.bemerkungen, '')), 'C')
  as vector
from zaehlung
  inner join kultur 
    inner join art 
      inner join ae_art on art.ae_id = ae_art.id
    on kultur.art_id = art.id
    left join garten
      inner join person on garten.person_id = person.id
    on kultur.garten_id = garten.id
  on zaehlung.kultur_id = kultur.id;

SELECT
  setweight(to_tsvector('simple', coalesce(ae_art.name, '')), 'A') || ' ' ||
  setweight(to_tsvector('simple', coalesce(person.name, '')), 'A') || ' ' ||
  setweight(to_tsvector('simple', coalesce(lieferung.von_datum::text, '')), 'A') || ' ' ||
  setweight(to_tsvector('simple', coalesce(sammlung.nr, '')), 'A') || ' ' ||
  setweight(to_tsvector('simple', coalesce(sammlung.datum::text, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(sammlungPerson.name, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(herkunft.nr, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(herkunft.lokalname, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(vonKulturPerson.name, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(lieferung.nach_datum::text, '')), 'A') || ' ' ||
  setweight(to_tsvector('simple', coalesce(nachKulturPerson.name, '')), 'B') || ' ' ||
  case
    when lieferung.nach_ausgepflanzt='true' then setweight(to_tsvector('simple', 'ausgepflanzt'), 'A')
    else ''
  end || ' ' ||
  setweight(to_tsvector('german', coalesce(lieferung.bemerkungen, '')), 'C') as vector
from lieferung
  inner join art 
    inner join ae_art on art.ae_id = ae_art.id
  on lieferung.art_id = art.id
  left join person on lieferung.person_id = person.id
  left join sammlung
    left join person as sammlungPerson on sammlung.person_id = person_id
    left join herkunft on sammlung.herkunft_id = herkunft.id
  on lieferung.von_sammlung_id = sammlung.id
  left join kultur as vonKultur
    inner join garten as vonGarten
      inner join person as vonKulturPerson on vonGarten.person_id = person_id
    on vonKultur.garten_id = vonGarten.id
  on lieferung.von_kultur_id = vonKultur.id
  left join kultur as nachKultur
    inner join garten as nachGarten
      inner join person as nachKulturPerson on nachGarten.person_id = person_id
    on nachKultur.garten_id = nachGarten.id
  on lieferung.nach_kultur_id = nachKultur.id;