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

SELECT
  setweight(to_tsvector('simple', coalesce(ae_art.name, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(person.name, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(kultur_inventar.datum::text, '')), 'A') || ' ' ||
  setweight(to_tsvector('german', coalesce(kultur_inventar.kasten, '')), 'B') || ' ' ||
  setweight(to_tsvector('german', coalesce(kultur_inventar.beet, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(kultur_inventar.nr, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(kultur_inventar.anzahl_pflanzen::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(kultur_inventar.anz_mutter_pflanzen::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(kultur_inventar.anz_nicht_auspflanzbereit::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(kultur_inventar.anz_auspflanzbereit::text, '')), 'D') || ' ' ||
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
  setweight(to_tsvector('simple', coalesce(zaehlung.anz_nicht_auspflanzbereit::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(zaehlung.anz_auspflanzbereit::text, '')), 'D') || ' ' ||
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
  setweight(to_tsvector('simple', coalesce(ae_art.name, '')), 'B') || ' ' ||
  setweight(to_tsvector('simple', coalesce(person.name, '')), 'B') || ' ' ||
  setweight(to_tsvector('german', coalesce(lieferung_typ_werte.wert, '')), 'B') || ' ' ||
  setweight(to_tsvector('german', coalesce(lieferung.menge::text, '')), 'B') || ' ' ||
  setweight(to_tsvector('german', coalesce(masseinheit_werte.wert, '')), 'A') || ' ' ||
  setweight(to_tsvector('simple', coalesce(lieferung.von_datum::text, '')), 'D') || ' ' ||

  setweight(to_tsvector('simple', coalesce(lieferung.datum::text, '')), 'A') || ' ' ||
  setweight(to_tsvector('simple', coalesce(zaehleinheit_werte.wert, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(lieferung.menge::text, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(masseinheit_werte.wert, '')), 'D') || ' ' ||
  setweight(to_tsvector('simple', coalesce(lieferung.bemerkungen, '')), 'D') as vector
from lieferung
  inner join art 
    inner join ae_art on art.ae_id = ae_art.id
  on lieferung.art_id = art.id
  left join person on lieferung.person_id = person.id
  left join sammlung
    left join person on sammlung.person_id = person.id
    left join herkunft on sammlung.herkunft_id = herkunft.id
  on lieferung.von_sammlung_id = sammlung.id
  left join kultur on lieferung.von_kultur_id = kultur.id as kultur_von
  left join herkunft on sammlung.herkunft_id = herkunft.id
  left join lieferung_typ_werte on lieferung.typ = lieferung_typ_werte.id
  left join masseinheit_werte on lieferung.masseinheit = masseinheit_werte.id;



  art_id integer default null references art (id) on delete cascade on update cascade,
  person_id integer default null references person (id) on delete cascade on update cascade,
  typ integer default null references lieferung_typ_werte (id) on delete set null on update cascade,
  zaehleinheit integer default null references zaehleinheit_werte (id) on delete set null on update cascade,
  menge integer default null,
  masseinheit integer default null references masseinheit_werte (id) on delete set null on update cascade,
  von_datum date default null,
  von_sammlung_id integer default null references sammlung (id) on delete cascade on update cascade,
  von_kultur_id integer default null references kultur (id) on delete cascade on update cascade,
  zwischenlager integer default null references lieferung_zwischenlager_werte (id) on delete set null on update cascade,
  nach_datum date default null,
  nach_kultur_id integer default null references kultur (id) on delete cascade on update cascade,
  nach_ausgepflanzt boolean default false,
  status integer default null references lieferung_status_werte (id) on delete set null on update cascade,
  bemerkungen text default null,