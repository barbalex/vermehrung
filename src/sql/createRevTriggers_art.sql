CREATE OR REPLACE FUNCTION art_rev_leaves(art_id uuid)
  RETURNS SETOF art_rev
  AS $$
  SELECT
    *
  FROM
    art_rev
  WHERE
    -- leaves
    NOT EXISTS(
      SELECT
        art_id
      FROM
        art_rev AS node
      WHERE
        node.art_id = $1
        AND node._parent_rev = art_rev._rev)
    -- on undeleted
    AND _deleted = FALSE
    -- of this record
    AND art_id = $1;
$$
LANGUAGE sql;

--select * from art_rev_leaves('f65dd840-f6aa-11ea-868c-25e28837c601')
CREATE OR REPLACE FUNCTION art_rev_set_winning_revision()
  RETURNS TRIGGER
  AS $body$
BEGIN
  -- 1.a: check if non deleted winner exists
  --      (if not: choose a deleted one)
  IF EXISTS(
    -- find max depth, as only revisions with max depth can win
    WITH max_depths AS(
      SELECT
        max(_depth) AS max_depth
      FROM
        --leaves
        art_rev_leaves(NEW.art_id)),
      -- the revision with max depth and max rev wins
      winning_revisions AS(
        SELECT
          -- this is the couchdb way of ensuring, every db chooses the same winner
          -- thus does not need to communicate with other db instances
          -- in a master-master replication system
          -- winners could be choosen differently of course,
          -- for instance: last writer wins
          max(leaves._rev) AS _rev
        FROM
          art_rev_leaves(NEW.art_id) AS leaves
          -- only consider revisions with max depth
          JOIN max_depths ON leaves._depth = max_depths.max_depth
)
        SELECT
          *
        FROM
          art_rev
          JOIN winning_revisions ON art_rev._rev = winning_revisions._rev) THEN
        -- 1.b: we know that a non deleted winner exists
        --      insert or update the winner table
        INSERT INTO art(id, ae_id, set, apflora_av, apflora_ap, changed, changed_by, _rev, _rev_at, _revisions, _parent_rev, _depth, _deleted, _conflicts)
          -- recalculating the winner here
          -- as I did not know how to re-use the exact same calculation from above :-(
          WITH
          -- the deletion itself could be a conflict
          -- so to list conflicts, need to get a list of deleted siblings
          deleted_conflicts_of_leaves AS(
            SELECT
              art_id,
              _rev,
              _depth
            FROM
              art_rev
            WHERE
              -- leaves
              NOT EXISTS(
                SELECT
                  art_id
                FROM
                  art_rev AS art_rev_inner
                WHERE
                  art_rev_inner.art_id = NEW.art_id
                  AND art_rev_inner._parent_rev = art_rev._rev)
                -- deleted
                AND _deleted IS TRUE
                -- of this record
                AND art_id = NEW.art_id
                -- siblings
                AND EXISTS(
                  SELECT
                    art_id
                  FROM
                    art_rev_leaves(NEW.art_id) l
                  WHERE
                    l._parent_rev = art_rev._parent_rev
                    AND l._depth = art_rev._depth)
),
-- find max depth, as only revisions with max depth can win
max_depths AS(
  SELECT
    max(_depth) AS max_depth
  FROM
    art_rev_leaves(NEW.art_id)
),
-- the revision with max depth and max rev wins
winning_revisions AS(
  SELECT
    -- this is the couchdb way of ensuring, every db chooses the same winner
    -- thus does not need to communicate with other db instances
    -- in a master-master replication system
    -- winners could be choosen differently of course,
    -- for instance: last writer wins
    max(leaves._rev) AS _rev
FROM
  art_rev_leaves(NEW.art_id) AS leaves
  JOIN max_depths ON leaves._depth = max_depths.max_depth
)
SELECT
  art_rev.art_id,
  art_rev.ae_id,
  art_rev.set,
  art_rev.apflora_av,
  art_rev.apflora_ap,
  art_rev.changed,
  art_rev.changed_by,
  art_rev._rev,
  art_rev._rev_at,
  art_rev._revisions,
  art_rev._parent_rev,
  art_rev._depth,
  art_rev._deleted,
(
    SELECT
      ARRAY(
        SELECT
          _rev
        FROM
          art_rev_leaves(NEW.art_id)
        WHERE
          -- whose data is different from this record
          _rev <> art_rev._rev
          -- and is not an ancester of this record?
          -- to be honest: I am not sure why this condition is here
          AND _rev <> ANY(art_rev._revisions)
          -- add deletions, making the deletion itself the conflict
        UNION
        SELECT
          _rev
        FROM
          deleted_conflicts_of_leaves
          -- should I not ensure here too that data is different?
)) AS _conflicts
FROM
  art_rev
  JOIN winning_revisions ON art_rev._rev = winning_revisions._rev
  -- if the winner record already exists, update it
ON CONFLICT ON CONSTRAINT art_pkey
  DO UPDATE SET
    -- do not update the id = pkey
    ae_id = excluded.ae_id,
    set = excluded.set, apflora_av = excluded.apflora_av, apflora_ap = excluded.apflora_ap, changed = excluded.changed, changed_by = excluded.changed_by, _rev = excluded._rev, _rev_at = excluded._rev_at, _revisions = excluded._revisions, _parent_rev = excluded._parent_rev, _depth = excluded._depth, _deleted = excluded._deleted, _conflicts = excluded._conflicts;
ELSE
  -- 2. so there is no non deleted winner
  --    choose winner of deleted datasets
  --    this is probably not very important
  --    as the only important part is that
  --    the winning revision gets _deleted = true
  --    so the client can delete the record
  INSERT INTO art(id, ae_id, set, apflora_av, apflora_ap, changed, changed_by, _rev, _rev_at, _revisions, _parent_rev, _depth, _deleted, _conflicts)
    -- again re-calculating the same as I do not know better :-(
    WITH deleted_conflicts_of_leaves AS(
      SELECT
        art_id,
        _rev,
        _depth
      FROM
        art_rev
      WHERE
        -- leaves
        NOT EXISTS(
          SELECT
            art_id
          FROM
            art_rev AS art_rev_inner
          WHERE
            art_rev_inner.art_id = NEW.art_id
            AND art_rev_inner._parent_rev = art_rev._rev)
          -- deleted
          AND _deleted IS TRUE
          -- of this record
          AND art_id = NEW.art_id
          -- siblings
          AND EXISTS(
            SELECT
              art_id
            FROM
              art_rev_leaves(NEW.art_id) l
            WHERE
              l._parent_rev = art_rev._parent_rev
              AND l._depth = art_rev._depth)
),
leaves_deleted AS(
  SELECT
    art_id,
    _rev,
    _depth
  FROM
    art_rev
  WHERE
    NOT EXISTS(
      SELECT
        art_id
      FROM
        art_rev AS t
      WHERE
        t.art_id = NEW.art_id
        AND t._parent_rev = art_rev._rev)
      --and _deleted = false
      AND art_id = NEW.art_id
),
max_depths AS(
  SELECT
    max(_depth) AS max_depth
  FROM
    leaves_deleted
),
winning_revisions AS(
  SELECT
    max(leaves_deleted._rev) AS _rev
  FROM
    leaves_deleted
    JOIN max_depths ON leaves_deleted._depth = max_depths.max_depth
)
SELECT
  art_rev.art_id,
  art_rev.ae_id,
  art_rev.set,
  art_rev.apflora_av,
  art_rev.apflora_ap,
  art_rev.changed,
  art_rev.changed_by,
  art_rev._rev,
  art_rev._rev_at,
  art_rev._revisions,
  art_rev._parent_rev,
  art_rev._depth,
  art_rev._deleted,
(
    SELECT
      ARRAY(
        SELECT
          _rev
        FROM
          art_rev_leaves(NEW.art_id)
        WHERE
          _rev <> art_rev._rev
          AND _rev <> ANY(art_rev._revisions)
        UNION
        SELECT
          _rev
        FROM
          deleted_conflicts_of_leaves)) AS _conflicts
FROM
  art_rev
  JOIN winning_revisions ON art_rev._rev = winning_revisions._rev
ON CONFLICT ON CONSTRAINT art_pkey
  DO UPDATE SET
    -- do not update the id = pkey
    ae_id = excluded.ae_id,
    set = excluded.set, apflora_av = excluded.apflora_av, apflora_ap = excluded.apflora_ap, changed = excluded.changed, changed_by = excluded.changed_by, _rev = excluded._rev, _rev_at = excluded._rev_at, _revisions = excluded._revisions, _parent_rev = excluded._parent_rev, _depth = excluded._depth, _deleted = excluded._deleted, _conflicts = excluded._conflicts;
END IF;
  RETURN new;
END;
$body$
LANGUAGE plpgsql;

CREATE TRIGGER trigger_art_rev_set_winning_revision
  AFTER INSERT ON art_rev
  FOR EACH ROW
  EXECUTE PROCEDURE art_rev_set_winning_revision()
