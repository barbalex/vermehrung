-- 2026-10-20: migrate events to bedarf (issue #151)
--
-- Events were used exclusively to capture demand ("Bedarf").
-- They are migrated into the new bedarf table (one bedarf row per event,
-- same id) and then soft-deleted so every client removes them via sync.
--
-- Prerequisites:
--   1. bedarf / bedarf_rev tables exist (createTables.sql)
--   2. trigger bedarf_rev_set_winning_revision exists (createRevTriggers_bedarf.sql)
--   3. Hasura tracks bedarf / bedarf_rev (hasuraMetadata/metadata.json)
--
-- Run Phase A, verify, then run Phase B.
-- Both phases are idempotent: re-running them inserts nothing new.

-- =====================================================================
-- Phase A: create bedarf rows from events
-- =====================================================================
begin;

insert into bedarf_rev (
  id,
  bedarf_id,
  kultur_id,
  person_id,
  jahr,
  beschreibung,
  bemerkungen,
  neues_material,
  changed,
  changed_by,
  _rev,
  _parent_rev,
  _revisions,
  _depth,
  _deleted
)
select
  gen_random_uuid(),
  e.id,
  coalesce(e.kultur_id, tk.kultur_id),
  e.person_id,
  extract(year from e.datum)::int,
  e.beschreibung,
  null,
  null,
  now(),
  'migration-events-to-bedarf',
  '1-' || md5(
    e.id::text ||
    coalesce(e.kultur_id::text, '') ||
    coalesce(e.person_id::text, '') ||
    coalesce(extract(year from e.datum)::text, '') ||
    coalesce(e.beschreibung, '')
  ),
  null,
  array['1-' || md5(
    e.id::text ||
    coalesce(e.kultur_id::text, '') ||
    coalesce(e.person_id::text, '') ||
    coalesce(extract(year from e.datum)::text, '') ||
    coalesce(e.beschreibung, '')
  )],
  1,
  false
from event e
left join teilkultur tk
  on tk.id = e.teilkultur_id
where e._deleted is false
  -- idempotency: never migrate an event twice
  and not exists (
    select 1 from bedarf b where b.id = e.id
  );

-- verify: counts should match (events without a bedarf row = 0)
select
  (select count(*) from event where _deleted is false) as events_active,
  (select count(*) from bedarf) as bedarfe,
  (
    select count(*)
    from event e
    where e._deleted is false
      and not exists (select 1 from bedarf b where b.id = e.id)
  ) as events_not_migrated;

commit;

-- =====================================================================
-- Phase B: soft-delete the events
-- (run only after Phase A has been verified!)
--
-- Revision trees are NOT preserved: last write wins.
-- The event revision history is wiped and every active event receives
-- a single deletion revision. The trigger materializes it, so every
-- client receives the deletion via sync.
-- =====================================================================
begin;

-- remove the revision history of all events
delete from event_rev;

-- one single deletion revision per active event
insert into event_rev (
  id,
  event_id,
  kultur_id,
  teilkultur_id,
  person_id,
  beschreibung,
  geplant,
  datum,
  changed,
  changed_by,
  _rev,
  _parent_rev,
  _revisions,
  _depth,
  _deleted
)
select
  gen_random_uuid(),
  e.id,
  e.kultur_id,
  e.teilkultur_id,
  e.person_id,
  e.beschreibung,
  e.geplant,
  e.datum,
  now(),
  'migration-events-to-bedarf',
  -- legacy events can have no rev at all: coalesce to keep the md5 non-null
  '1-' || md5(e.id::text || '_deleted' || coalesce(e._rev, '')),
  null,
  array['1-' || md5(e.id::text || '_deleted' || coalesce(e._rev, ''))],
  1,
  true
from event e
where e._deleted is false;

-- verify: no active events should remain
select
  (select count(*) from event where _deleted is false) as events_active_should_be_0,
  (select count(*) from event_rev) as event_revs;

commit;
