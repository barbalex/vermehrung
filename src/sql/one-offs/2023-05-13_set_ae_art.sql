SELECT
  *
FROM
  ae_art
  LEFT JOIN ae_art_live USING (id)
  INNER JOIN art ON art.ae_id = ae_art.id
WHERE
  ae_art_live.id IS NULL;

-- 1. upsert rows
INSERT INTO ae_art(id, taxonomy, name, name_latein, name_deutsch, synonym, changed, _rev_at)
SELECT
  id,
  taxonomy,
  name,
  name_latein,
  name_deutsch,
  synonym,
  changed,
  _rev_at
FROM
  ae_art_live
ON CONFLICT ON CONSTRAINT ae_art_pkey
  DO UPDATE SET
    taxonomy = EXCLUDED.taxonomy,
    name = EXCLUDED.name,
    name_latein = EXCLUDED.name_latein,
    name_deutsch = EXCLUDED.name_deutsch,
    synonym = EXCLUDED.synonym,
    changed = EXCLUDED.changed,
    _rev_at = EXCLUDED._rev_at;
-- 11'554
-- no more imported that are not used as art
-- these seem to be synonyms of other sisf 2005 species
SELECT
  id
FROM
  ae_art
WHERE
  id NOT IN (
    SELECT
      id
    FROM
      ae_art_live)
  AND id NOT IN (
    SELECT
      ae_id
    FROM
      art
    WHERE
      ae_id IS NOT NULL);

-- 980 rows
--
-- 2. remove no more imported that are not used as art
DELETE FROM ae_art
WHERE id IN (
    SELECT
      id
    FROM
      ae_art
    WHERE
      id NOT IN (
        SELECT
          id
        FROM
          ae_art_live)
        AND id NOT IN (
          SELECT
            ae_id
          FROM
            art
          WHERE
            ae_id IS NOT NULL));

-- find synonyms of sisf 2005 species
SELECT
  art.id,
  art.ae_id,
  ae_art.synonym
FROM
  art
  INNER JOIN ae_art ON ae_art.id = art.ae_id
WHERE
  ae_art.synonym IS NOT NULL
  AND ae_art.synonym <> art.ae_id;

-- 149
-- all results are from sisf 2005
UPDATE
  art
SET
  ae_id = subquery.synonym
FROM (
  SELECT
    art.id,
    ae_art.synonym
  FROM
    art
    INNER JOIN ae_art ON ae_art.id = art.ae_id
  WHERE
    ae_art.synonym IS NOT NULL
    AND ae_art.synonym <> art.ae_id) AS subquery
WHERE
  art.id = subquery.id;

-- update 149
-- check
SELECT
  ae_art.name,
  ae_art.taxonomy
FROM
  art
  INNER JOIN ae_art ON ae_art.id = art.ae_id
ORDER BY
  ae_art.taxonomy,
  ae_art.name;

