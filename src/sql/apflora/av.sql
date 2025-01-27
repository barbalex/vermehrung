-- to get the data in apflora:
SELECT
  '' AS id,
  tax.id AS ae_id,
  -- tax.tax_art_name,
  adresse.name AS av,
(ap.bearbeitung IN (1, 2, 3))::text AS ap
FROM
  apflora.ap ap
  INNER JOIN apflora.adresse adresse ON ap.bearbeiter = adresse.id
  INNER JOIN apflora.ae_taxonomies tax ON ap.art_id = tax.id;

-- to save the data in vermehrung:
-- ISSUE: should be named apflora_ap but WatermelonDB does not allow renaming or dropping tables
-- https://watermelondb.dev/docs/Advanced/Migrations#migrations-api
DROP TABLE IF EXISTS apflora_ap;

CREATE TABLE apflora_ap(
  -- need the id for WatermelonDB
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ae_id uuid DEFAULT NULL,
  ap boolean DEFAULT NULL,
  av text DEFAULT NULL
);

CREATE INDEX ON apflora_ap USING btree(id);

CREATE INDEX ON apflora_ap USING btree(ae_id);

-- migration:
UPDATE
  art
SET
  apflora_ap = apflora_ap.ap
FROM
  apflora_ap
WHERE
  art.ae_id = apflora_ap.ae_id;

-- same for av:
UPDATE
  art
SET
  apflora_av = apflora_ap.av
FROM
  apflora_ap
WHERE
  art.ae_id = apflora_av.ae_id;

-- TODO: how create art_rev to force syncing?