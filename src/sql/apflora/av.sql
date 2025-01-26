-- to get the data in apflora:
SELECT
  '' AS id,
  tax.id AS ae_id,
  -- tax.tax_art_name,
  adresse.name AS av
FROM
  apflora.ap ap
  INNER JOIN apflora.adresse adresse ON ap.bearbeiter = adresse.id
  INNER JOIN apflora.ae_taxonomies tax ON ap.art_id = tax.id;

-- to save the data in vermehrung:
DROP TABLE IF EXISTS apflora_av;

CREATE TABLE apflora_av(
  -- need the id for WatermelonDB
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ae_id uuid DEFAULT NULL,
  av text DEFAULT NULL
);

CREATE INDEX ON apflora_av USING btree(id);

CREATE INDEX ON apflora_av USING btree(ae_id);

