-- One-time migration: rewrite all ids from uuid v1 to deterministic uuid v7.
-- Generated 2026-10-28. Run in a single transaction during a quiet moment.
--
-- - new ids are deterministic uuidv7 (timestamp bits from the row's
--   oldest revision, random bits from md5(old_id)): collision-free,
--   creation-ordered, sequentially inserting into the pk indexes.
-- - ae_art, ae_art_live, apflora_ap (externally owned imports) and
--   user_role (seeded reference data) keep their ids.
-- - person_option and kultur_option have their id as fk to their parent
--   row: the cascade sets their new id, they are not rewritten here.
-- - base tables cascade their new ids to referencing tables via the
--   existing FK constraints. The rev tables have no FKs: every id
--   column they carry (their own fk plus the snapshot fks of the
--   revisioned row) is remapped manually. The *_qk_choosen array
--   columns on person_option(_rev) are remapped element-wise.
-- - the winner-revision triggers on the rev tables are disabled during
--   the rewrite (they would recompute winners per row). Nothing they
--   compute depends on ids, so no recomputation is needed afterwards.
-- - every rewritten table keeps its previous id in old_id (invisible
--   to the api: not granted, not synced). Drop after ~a year.
--
-- Afterwards: VACUUM (ANALYZE); NOTIFY pgrst, 'reload schema';
-- clients discard local data on the next app load.

BEGIN;

-- abort if there is nothing to migrate
DO $$
DECLARE
  t text;
  c bigint;
  non_v7 bigint := 0;
BEGIN
  FOREACH t IN ARRAY ARRAY['art', 'art_file', 'art_qk', 'art_qk_choosen', 'av', 'bedarf', 'event', 'garten', 'garten_file', 'gv', 'herkunft', 'herkunft_file', 'kultur', 'kultur_file', 'kultur_option', 'kultur_qk', 'kultur_qk_choosen', 'lieferung', 'lieferung_file', 'person', 'person_file', 'person_option', 'sammel_lieferung', 'sammlung', 'sammlung_file', 'teilkultur', 'teilzaehlung', 'zaehlung', 'art_qk_choosen_rev', 'art_qk_rev', 'art_rev', 'av_rev', 'bedarf_rev', 'event_rev', 'garten_rev', 'gv_rev', 'herkunft_rev', 'kultur_option_rev', 'kultur_qk_choosen_rev', 'kultur_qk_rev', 'kultur_rev', 'lieferung_rev', 'person_option_rev', 'person_rev', 'sammel_lieferung_rev', 'sammlung_rev', 'teilkultur_rev', 'teilzaehlung_rev', 'zaehlung_rev']::text[] LOOP
    EXECUTE format('SELECT count(*) FROM %I WHERE id IS NOT NULL AND substr(id::text, 15, 1) <> ''7''', t) INTO c;
    non_v7 := non_v7 + c;
  END LOOP;
  IF non_v7 = 0 THEN
    RAISE EXCEPTION 'no non-v7 ids found - already migrated?';
  END IF;
END
$$;

-- deterministic uuidv7: 48 bit unix-ms timestamp, version 7,
-- 12 bit rand_a and 62 bit rand_b from md5(old_id)
CREATE OR REPLACE FUNCTION public.uuidv7_from_ts(ts timestamptz, seed uuid)
  RETURNS uuid
  LANGUAGE sql
  IMMUTABLE
  STRICT
AS $$
  SELECT (
    lpad(to_hex(greatest((extract(epoch FROM ts) * 1000)::bigint, 0)), 12, '0')
    || '7' || substr(md5(seed::text), 1, 3)
    || '8' || substr(md5(seed::text), 4, 15)
  )::uuid
$$;

-- 0. remember every old id BEFORE anything is rewritten (cascades
--    would otherwise overwrite the derived ids of person_option /
--    kultur_option first)
ALTER TABLE public.art ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.art SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.art_file ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.art_file SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.art_qk ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.art_qk SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.art_qk_choosen ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.art_qk_choosen SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.av ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.av SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.bedarf ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.bedarf SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.event ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.event SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.garten ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.garten SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.garten_file ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.garten_file SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.gv ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.gv SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.herkunft ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.herkunft SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.herkunft_file ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.herkunft_file SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.kultur ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.kultur SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.kultur_file ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.kultur_file SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.kultur_option ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.kultur_option SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.kultur_qk ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.kultur_qk SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.kultur_qk_choosen ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.kultur_qk_choosen SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.lieferung ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.lieferung SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.lieferung_file ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.lieferung_file SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.person ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.person SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.person_file ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.person_file SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.person_option ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.person_option SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.sammel_lieferung ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.sammel_lieferung SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.sammlung ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.sammlung SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.sammlung_file ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.sammlung_file SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.teilkultur ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.teilkultur SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.teilzaehlung ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.teilzaehlung SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.zaehlung ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.zaehlung SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.art_qk_choosen_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.art_qk_choosen_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.art_qk_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.art_qk_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.art_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.art_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.av_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.av_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.bedarf_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.bedarf_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.event_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.event_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.garten_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.garten_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.gv_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.gv_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.herkunft_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.herkunft_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.kultur_option_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.kultur_option_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.kultur_qk_choosen_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.kultur_qk_choosen_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.kultur_qk_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.kultur_qk_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.kultur_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.kultur_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.lieferung_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.lieferung_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.person_option_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.person_option_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.person_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.person_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.sammel_lieferung_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.sammel_lieferung_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.sammlung_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.sammlung_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.teilkultur_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.teilkultur_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.teilzaehlung_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.teilzaehlung_rev SET old_id = id WHERE id IS NOT NULL;
ALTER TABLE public.zaehlung_rev ADD COLUMN IF NOT EXISTS old_id uuid;
UPDATE public.zaehlung_rev SET old_id = id WHERE id IS NOT NULL;

-- disable the user triggers during the rewrite: the winner-revision
-- triggers on the rev tables and the legacy business-rule validators
-- on the base tables would fire per rewritten row. fk cascades are
-- internal triggers and keep working
ALTER TABLE public.art DISABLE TRIGGER USER;
ALTER TABLE public.art_file DISABLE TRIGGER USER;
ALTER TABLE public.art_qk DISABLE TRIGGER USER;
ALTER TABLE public.art_qk_choosen DISABLE TRIGGER USER;
ALTER TABLE public.av DISABLE TRIGGER USER;
ALTER TABLE public.bedarf DISABLE TRIGGER USER;
ALTER TABLE public.event DISABLE TRIGGER USER;
ALTER TABLE public.garten DISABLE TRIGGER USER;
ALTER TABLE public.garten_file DISABLE TRIGGER USER;
ALTER TABLE public.gv DISABLE TRIGGER USER;
ALTER TABLE public.herkunft DISABLE TRIGGER USER;
ALTER TABLE public.herkunft_file DISABLE TRIGGER USER;
ALTER TABLE public.kultur DISABLE TRIGGER USER;
ALTER TABLE public.kultur_file DISABLE TRIGGER USER;
ALTER TABLE public.kultur_option DISABLE TRIGGER USER;
ALTER TABLE public.kultur_qk DISABLE TRIGGER USER;
ALTER TABLE public.kultur_qk_choosen DISABLE TRIGGER USER;
ALTER TABLE public.lieferung DISABLE TRIGGER USER;
ALTER TABLE public.lieferung_file DISABLE TRIGGER USER;
ALTER TABLE public.person DISABLE TRIGGER USER;
ALTER TABLE public.person_file DISABLE TRIGGER USER;
ALTER TABLE public.person_option DISABLE TRIGGER USER;
ALTER TABLE public.sammel_lieferung DISABLE TRIGGER USER;
ALTER TABLE public.sammlung DISABLE TRIGGER USER;
ALTER TABLE public.sammlung_file DISABLE TRIGGER USER;
ALTER TABLE public.teilkultur DISABLE TRIGGER USER;
ALTER TABLE public.teilzaehlung DISABLE TRIGGER USER;
ALTER TABLE public.zaehlung DISABLE TRIGGER USER;
ALTER TABLE public.art_qk_choosen_rev DISABLE TRIGGER USER;
ALTER TABLE public.art_qk_rev DISABLE TRIGGER USER;
ALTER TABLE public.art_rev DISABLE TRIGGER USER;
ALTER TABLE public.av_rev DISABLE TRIGGER USER;
ALTER TABLE public.bedarf_rev DISABLE TRIGGER USER;
ALTER TABLE public.event_rev DISABLE TRIGGER USER;
ALTER TABLE public.garten_rev DISABLE TRIGGER USER;
ALTER TABLE public.gv_rev DISABLE TRIGGER USER;
ALTER TABLE public.herkunft_rev DISABLE TRIGGER USER;
ALTER TABLE public.kultur_option_rev DISABLE TRIGGER USER;
ALTER TABLE public.kultur_qk_choosen_rev DISABLE TRIGGER USER;
ALTER TABLE public.kultur_qk_rev DISABLE TRIGGER USER;
ALTER TABLE public.kultur_rev DISABLE TRIGGER USER;
ALTER TABLE public.lieferung_rev DISABLE TRIGGER USER;
ALTER TABLE public.person_option_rev DISABLE TRIGGER USER;
ALTER TABLE public.person_rev DISABLE TRIGGER USER;
ALTER TABLE public.sammel_lieferung_rev DISABLE TRIGGER USER;
ALTER TABLE public.sammlung_rev DISABLE TRIGGER USER;
ALTER TABLE public.teilkultur_rev DISABLE TRIGGER USER;
ALTER TABLE public.teilzaehlung_rev DISABLE TRIGGER USER;
ALTER TABLE public.zaehlung_rev DISABLE TRIGGER USER;

-- 1. base tables: rewrite id (cascades to referencing tables).
--    timestamp: oldest revision of the row, else changed, else now
UPDATE public.art SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.art_rev r WHERE r.art_id = public.art.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.art_file SET id = public.uuidv7_from_ts(coalesce(changed, now()), id) WHERE id IS NOT NULL;
UPDATE public.art_qk SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.art_qk_rev r WHERE r.art_qk_id = public.art_qk.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.art_qk_choosen SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.art_qk_choosen_rev r WHERE r.art_qk_choosen_id = public.art_qk_choosen.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.av SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.av_rev r WHERE r.av_id = public.av.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.bedarf SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.bedarf_rev r WHERE r.bedarf_id = public.bedarf.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.event SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.event_rev r WHERE r.event_id = public.event.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.garten SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.garten_rev r WHERE r.garten_id = public.garten.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.garten_file SET id = public.uuidv7_from_ts(coalesce(changed, now()), id) WHERE id IS NOT NULL;
UPDATE public.gv SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.gv_rev r WHERE r.gv_id = public.gv.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.herkunft SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.herkunft_rev r WHERE r.herkunft_id = public.herkunft.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.herkunft_file SET id = public.uuidv7_from_ts(coalesce(changed, now()), id) WHERE id IS NOT NULL;
UPDATE public.kultur SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.kultur_rev r WHERE r.kultur_id = public.kultur.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.kultur_file SET id = public.uuidv7_from_ts(coalesce(changed, now()), id) WHERE id IS NOT NULL;
-- kultur_option: id is the fk to kultur: the cascade sets it
UPDATE public.kultur_qk SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.kultur_qk_rev r WHERE r.kultur_qk_id = public.kultur_qk.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.kultur_qk_choosen SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.kultur_qk_choosen_rev r WHERE r.kultur_qk_choosen_id = public.kultur_qk_choosen.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.lieferung SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.lieferung_rev r WHERE r.lieferung_id = public.lieferung.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.lieferung_file SET id = public.uuidv7_from_ts(coalesce(changed, now()), id) WHERE id IS NOT NULL;
UPDATE public.person SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.person_rev r WHERE r.person_id = public.person.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.person_file SET id = public.uuidv7_from_ts(coalesce(changed, now()), id) WHERE id IS NOT NULL;
-- person_option: id is the fk to person: the cascade sets it
UPDATE public.sammel_lieferung SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.sammel_lieferung_rev r WHERE r.sammel_lieferung_id = public.sammel_lieferung.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.sammlung SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.sammlung_rev r WHERE r.sammlung_id = public.sammlung.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.sammlung_file SET id = public.uuidv7_from_ts(coalesce(changed, now()), id) WHERE id IS NOT NULL;
UPDATE public.teilkultur SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.teilkultur_rev r WHERE r.teilkultur_id = public.teilkultur.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.teilzaehlung SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.teilzaehlung_rev r WHERE r.teilzaehlung_id = public.teilzaehlung.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;
UPDATE public.zaehlung SET id = public.uuidv7_from_ts(to_timestamp(coalesce((SELECT min(_rev_at) FROM public.zaehlung_rev r WHERE r.zaehlung_id = public.zaehlung.id), extract(epoch FROM changed), extract(epoch FROM now()))), id) WHERE id IS NOT NULL;

-- 2. rev tables: remap every id column (own fk + snapshot fks), then rewrite their own ids.
--    timestamp: the revision's own _rev_at
UPDATE public.art_qk_choosen_rev r SET art_id = b.id FROM public.art b WHERE r.art_id IS NOT NULL AND r.art_id = b.old_id;
UPDATE public.art_qk_choosen_rev r SET art_qk_choosen_id = b.id FROM public.art_qk_choosen b WHERE r.art_qk_choosen_id IS NOT NULL AND r.art_qk_choosen_id = b.old_id;
UPDATE public.art_qk_choosen_rev r SET qk_id = b.id FROM public.art_qk b WHERE r.qk_id IS NOT NULL AND r.qk_id = b.old_id;
UPDATE public.art_qk_choosen_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.art_qk_rev r SET art_qk_id = b.id FROM public.art_qk b WHERE r.art_qk_id IS NOT NULL AND r.art_qk_id = b.old_id;
UPDATE public.art_qk_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.art_rev r SET art_id = b.id FROM public.art b WHERE r.art_id IS NOT NULL AND r.art_id = b.old_id;
UPDATE public.art_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.av_rev r SET art_id = b.id FROM public.art b WHERE r.art_id IS NOT NULL AND r.art_id = b.old_id;
UPDATE public.av_rev r SET av_id = b.id FROM public.av b WHERE r.av_id IS NOT NULL AND r.av_id = b.old_id;
UPDATE public.av_rev r SET person_id = b.id FROM public.person b WHERE r.person_id IS NOT NULL AND r.person_id = b.old_id;
UPDATE public.av_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.bedarf_rev r SET bedarf_id = b.id FROM public.bedarf b WHERE r.bedarf_id IS NOT NULL AND r.bedarf_id = b.old_id;
UPDATE public.bedarf_rev r SET kultur_id = b.id FROM public.kultur b WHERE r.kultur_id IS NOT NULL AND r.kultur_id = b.old_id;
UPDATE public.bedarf_rev r SET person_id = b.id FROM public.person b WHERE r.person_id IS NOT NULL AND r.person_id = b.old_id;
UPDATE public.bedarf_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.event_rev r SET event_id = b.id FROM public.event b WHERE r.event_id IS NOT NULL AND r.event_id = b.old_id;
UPDATE public.event_rev r SET kultur_id = b.id FROM public.kultur b WHERE r.kultur_id IS NOT NULL AND r.kultur_id = b.old_id;
UPDATE public.event_rev r SET person_id = b.id FROM public.person b WHERE r.person_id IS NOT NULL AND r.person_id = b.old_id;
UPDATE public.event_rev r SET teilkultur_id = b.id FROM public.teilkultur b WHERE r.teilkultur_id IS NOT NULL AND r.teilkultur_id = b.old_id;
UPDATE public.event_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.garten_rev r SET garten_id = b.id FROM public.garten b WHERE r.garten_id IS NOT NULL AND r.garten_id = b.old_id;
UPDATE public.garten_rev r SET person_id = b.id FROM public.person b WHERE r.person_id IS NOT NULL AND r.person_id = b.old_id;
UPDATE public.garten_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.gv_rev r SET garten_id = b.id FROM public.garten b WHERE r.garten_id IS NOT NULL AND r.garten_id = b.old_id;
UPDATE public.gv_rev r SET gv_id = b.id FROM public.gv b WHERE r.gv_id IS NOT NULL AND r.gv_id = b.old_id;
UPDATE public.gv_rev r SET person_id = b.id FROM public.person b WHERE r.person_id IS NOT NULL AND r.person_id = b.old_id;
UPDATE public.gv_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.herkunft_rev r SET herkunft_id = b.id FROM public.herkunft b WHERE r.herkunft_id IS NOT NULL AND r.herkunft_id = b.old_id;
UPDATE public.herkunft_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.kultur_option_rev r SET kultur_id = b.id FROM public.kultur b WHERE r.kultur_id IS NOT NULL AND r.kultur_id = b.old_id;
UPDATE public.kultur_option_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.kultur_qk_choosen_rev r SET kultur_id = b.id FROM public.kultur b WHERE r.kultur_id IS NOT NULL AND r.kultur_id = b.old_id;
UPDATE public.kultur_qk_choosen_rev r SET kultur_qk_choosen_id = b.id FROM public.kultur_qk_choosen b WHERE r.kultur_qk_choosen_id IS NOT NULL AND r.kultur_qk_choosen_id = b.old_id;
UPDATE public.kultur_qk_choosen_rev r SET qk_id = b.id FROM public.kultur_qk b WHERE r.qk_id IS NOT NULL AND r.qk_id = b.old_id;
UPDATE public.kultur_qk_choosen_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.kultur_qk_rev r SET kultur_qk_id = b.id FROM public.kultur_qk b WHERE r.kultur_qk_id IS NOT NULL AND r.kultur_qk_id = b.old_id;
UPDATE public.kultur_qk_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.kultur_rev r SET art_id = b.id FROM public.art b WHERE r.art_id IS NOT NULL AND r.art_id = b.old_id;
UPDATE public.kultur_rev r SET garten_id = b.id FROM public.garten b WHERE r.garten_id IS NOT NULL AND r.garten_id = b.old_id;
UPDATE public.kultur_rev r SET herkunft_id = b.id FROM public.herkunft b WHERE r.herkunft_id IS NOT NULL AND r.herkunft_id = b.old_id;
UPDATE public.kultur_rev r SET kultur_id = b.id FROM public.kultur b WHERE r.kultur_id IS NOT NULL AND r.kultur_id = b.old_id;
UPDATE public.kultur_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.lieferung_rev r SET art_id = b.id FROM public.art b WHERE r.art_id IS NOT NULL AND r.art_id = b.old_id;
UPDATE public.lieferung_rev r SET lieferung_id = b.id FROM public.lieferung b WHERE r.lieferung_id IS NOT NULL AND r.lieferung_id = b.old_id;
UPDATE public.lieferung_rev r SET nach_kultur_id = b.id FROM public.kultur b WHERE r.nach_kultur_id IS NOT NULL AND r.nach_kultur_id = b.old_id;
UPDATE public.lieferung_rev r SET person_id = b.id FROM public.person b WHERE r.person_id IS NOT NULL AND r.person_id = b.old_id;
UPDATE public.lieferung_rev r SET sammel_lieferung_id = b.id FROM public.sammel_lieferung b WHERE r.sammel_lieferung_id IS NOT NULL AND r.sammel_lieferung_id = b.old_id;
UPDATE public.lieferung_rev r SET von_kultur_id = b.id FROM public.kultur b WHERE r.von_kultur_id IS NOT NULL AND r.von_kultur_id = b.old_id;
UPDATE public.lieferung_rev r SET von_sammlung_id = b.id FROM public.sammlung b WHERE r.von_sammlung_id IS NOT NULL AND r.von_sammlung_id = b.old_id;
UPDATE public.lieferung_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.person_option_rev r SET person_id = b.id FROM public.person b WHERE r.person_id IS NOT NULL AND r.person_id = b.old_id;
UPDATE public.person_option_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.person_rev r SET person_id = b.id FROM public.person b WHERE r.person_id IS NOT NULL AND r.person_id = b.old_id;
UPDATE public.person_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.sammel_lieferung_rev r SET art_id = b.id FROM public.art b WHERE r.art_id IS NOT NULL AND r.art_id = b.old_id;
UPDATE public.sammel_lieferung_rev r SET nach_kultur_id = b.id FROM public.kultur b WHERE r.nach_kultur_id IS NOT NULL AND r.nach_kultur_id = b.old_id;
UPDATE public.sammel_lieferung_rev r SET person_id = b.id FROM public.person b WHERE r.person_id IS NOT NULL AND r.person_id = b.old_id;
UPDATE public.sammel_lieferung_rev r SET sammel_lieferung_id = b.id FROM public.sammel_lieferung b WHERE r.sammel_lieferung_id IS NOT NULL AND r.sammel_lieferung_id = b.old_id;
UPDATE public.sammel_lieferung_rev r SET von_kultur_id = b.id FROM public.kultur b WHERE r.von_kultur_id IS NOT NULL AND r.von_kultur_id = b.old_id;
UPDATE public.sammel_lieferung_rev r SET von_sammlung_id = b.id FROM public.sammlung b WHERE r.von_sammlung_id IS NOT NULL AND r.von_sammlung_id = b.old_id;
UPDATE public.sammel_lieferung_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.sammlung_rev r SET art_id = b.id FROM public.art b WHERE r.art_id IS NOT NULL AND r.art_id = b.old_id;
UPDATE public.sammlung_rev r SET herkunft_id = b.id FROM public.herkunft b WHERE r.herkunft_id IS NOT NULL AND r.herkunft_id = b.old_id;
UPDATE public.sammlung_rev r SET person_id = b.id FROM public.person b WHERE r.person_id IS NOT NULL AND r.person_id = b.old_id;
UPDATE public.sammlung_rev r SET sammlung_id = b.id FROM public.sammlung b WHERE r.sammlung_id IS NOT NULL AND r.sammlung_id = b.old_id;
UPDATE public.sammlung_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.teilkultur_rev r SET kultur_id = b.id FROM public.kultur b WHERE r.kultur_id IS NOT NULL AND r.kultur_id = b.old_id;
UPDATE public.teilkultur_rev r SET teilkultur_id = b.id FROM public.teilkultur b WHERE r.teilkultur_id IS NOT NULL AND r.teilkultur_id = b.old_id;
UPDATE public.teilkultur_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.teilzaehlung_rev r SET teilkultur_id = b.id FROM public.teilkultur b WHERE r.teilkultur_id IS NOT NULL AND r.teilkultur_id = b.old_id;
UPDATE public.teilzaehlung_rev r SET teilzaehlung_id = b.id FROM public.teilzaehlung b WHERE r.teilzaehlung_id IS NOT NULL AND r.teilzaehlung_id = b.old_id;
UPDATE public.teilzaehlung_rev r SET zaehlung_id = b.id FROM public.zaehlung b WHERE r.zaehlung_id IS NOT NULL AND r.zaehlung_id = b.old_id;
UPDATE public.teilzaehlung_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);
UPDATE public.zaehlung_rev r SET kultur_id = b.id FROM public.kultur b WHERE r.kultur_id IS NOT NULL AND r.kultur_id = b.old_id;
UPDATE public.zaehlung_rev r SET zaehlung_id = b.id FROM public.zaehlung b WHERE r.zaehlung_id IS NOT NULL AND r.zaehlung_id = b.old_id;
UPDATE public.zaehlung_rev SET id = public.uuidv7_from_ts(to_timestamp(coalesce(_rev_at, extract(epoch FROM changed), extract(epoch FROM now()))), id);

-- 3. the chosen-qk array columns store art_qk / kultur_qk ids
UPDATE public.person_option p SET art_qk_choosen = mapped.arr FROM (
  SELECT p2.id, array_agg(ref.id ORDER BY u.ord) AS arr
  FROM public.person_option p2
  CROSS JOIN LATERAL unnest(p2.art_qk_choosen) WITH ORDINALITY AS u(val, ord)
  JOIN public.art_qk ref ON ref.old_id = u.val::uuid
  GROUP BY p2.id
) mapped WHERE p.id = mapped.id AND p.art_qk_choosen IS NOT NULL;
UPDATE public.person_option p SET kultur_qk_choosen = mapped.arr FROM (
  SELECT p2.id, array_agg(ref.id ORDER BY u.ord) AS arr
  FROM public.person_option p2
  CROSS JOIN LATERAL unnest(p2.kultur_qk_choosen) WITH ORDINALITY AS u(val, ord)
  JOIN public.kultur_qk ref ON ref.old_id = u.val::uuid
  GROUP BY p2.id
) mapped WHERE p.id = mapped.id AND p.kultur_qk_choosen IS NOT NULL;
UPDATE public.person_option_rev p SET art_qk_choosen = mapped.arr FROM (
  SELECT p2.id, array_agg(ref.id ORDER BY u.ord) AS arr
  FROM public.person_option_rev p2
  CROSS JOIN LATERAL unnest(p2.art_qk_choosen) WITH ORDINALITY AS u(val, ord)
  JOIN public.art_qk ref ON ref.old_id = u.val::uuid
  GROUP BY p2.id
) mapped WHERE p.id = mapped.id AND p.art_qk_choosen IS NOT NULL;
UPDATE public.person_option_rev p SET kultur_qk_choosen = mapped.arr FROM (
  SELECT p2.id, array_agg(ref.id ORDER BY u.ord) AS arr
  FROM public.person_option_rev p2
  CROSS JOIN LATERAL unnest(p2.kultur_qk_choosen) WITH ORDINALITY AS u(val, ord)
  JOIN public.kultur_qk ref ON ref.old_id = u.val::uuid
  GROUP BY p2.id
) mapped WHERE p.id = mapped.id AND p.kultur_qk_choosen IS NOT NULL;

-- 4. future server-side inserts also get uuidv7 (the client generates them anyway)
ALTER TABLE public.art ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.art_file ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.art_qk ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.art_qk_choosen ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.av ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.bedarf ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.event ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.garten ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.garten_file ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.gv ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.herkunft ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.herkunft_file ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.kultur ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.kultur_file ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.kultur_option ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.kultur_qk ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.kultur_qk_choosen ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.lieferung ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.lieferung_file ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.person ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.person_file ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.person_option ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.sammel_lieferung ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.sammlung ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.sammlung_file ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.teilkultur ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.teilzaehlung ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.zaehlung ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.art_qk_choosen_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.art_qk_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.art_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.av_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.bedarf_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.event_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.garten_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.gv_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.herkunft_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.kultur_option_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.kultur_qk_choosen_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.kultur_qk_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.kultur_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.lieferung_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.person_option_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.person_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.sammel_lieferung_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.sammlung_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.teilkultur_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.teilzaehlung_rev ALTER COLUMN id SET DEFAULT uuidv7();
ALTER TABLE public.zaehlung_rev ALTER COLUMN id SET DEFAULT uuidv7();

-- re-enable the triggers
ALTER TABLE public.art ENABLE TRIGGER USER;
ALTER TABLE public.art_file ENABLE TRIGGER USER;
ALTER TABLE public.art_qk ENABLE TRIGGER USER;
ALTER TABLE public.art_qk_choosen ENABLE TRIGGER USER;
ALTER TABLE public.av ENABLE TRIGGER USER;
ALTER TABLE public.bedarf ENABLE TRIGGER USER;
ALTER TABLE public.event ENABLE TRIGGER USER;
ALTER TABLE public.garten ENABLE TRIGGER USER;
ALTER TABLE public.garten_file ENABLE TRIGGER USER;
ALTER TABLE public.gv ENABLE TRIGGER USER;
ALTER TABLE public.herkunft ENABLE TRIGGER USER;
ALTER TABLE public.herkunft_file ENABLE TRIGGER USER;
ALTER TABLE public.kultur ENABLE TRIGGER USER;
ALTER TABLE public.kultur_file ENABLE TRIGGER USER;
ALTER TABLE public.kultur_option ENABLE TRIGGER USER;
ALTER TABLE public.kultur_qk ENABLE TRIGGER USER;
ALTER TABLE public.kultur_qk_choosen ENABLE TRIGGER USER;
ALTER TABLE public.lieferung ENABLE TRIGGER USER;
ALTER TABLE public.lieferung_file ENABLE TRIGGER USER;
ALTER TABLE public.person ENABLE TRIGGER USER;
ALTER TABLE public.person_file ENABLE TRIGGER USER;
ALTER TABLE public.person_option ENABLE TRIGGER USER;
ALTER TABLE public.sammel_lieferung ENABLE TRIGGER USER;
ALTER TABLE public.sammlung ENABLE TRIGGER USER;
ALTER TABLE public.sammlung_file ENABLE TRIGGER USER;
ALTER TABLE public.teilkultur ENABLE TRIGGER USER;
ALTER TABLE public.teilzaehlung ENABLE TRIGGER USER;
ALTER TABLE public.zaehlung ENABLE TRIGGER USER;
ALTER TABLE public.art_qk_choosen_rev ENABLE TRIGGER USER;
ALTER TABLE public.art_qk_rev ENABLE TRIGGER USER;
ALTER TABLE public.art_rev ENABLE TRIGGER USER;
ALTER TABLE public.av_rev ENABLE TRIGGER USER;
ALTER TABLE public.bedarf_rev ENABLE TRIGGER USER;
ALTER TABLE public.event_rev ENABLE TRIGGER USER;
ALTER TABLE public.garten_rev ENABLE TRIGGER USER;
ALTER TABLE public.gv_rev ENABLE TRIGGER USER;
ALTER TABLE public.herkunft_rev ENABLE TRIGGER USER;
ALTER TABLE public.kultur_option_rev ENABLE TRIGGER USER;
ALTER TABLE public.kultur_qk_choosen_rev ENABLE TRIGGER USER;
ALTER TABLE public.kultur_qk_rev ENABLE TRIGGER USER;
ALTER TABLE public.kultur_rev ENABLE TRIGGER USER;
ALTER TABLE public.lieferung_rev ENABLE TRIGGER USER;
ALTER TABLE public.person_option_rev ENABLE TRIGGER USER;
ALTER TABLE public.person_rev ENABLE TRIGGER USER;
ALTER TABLE public.sammel_lieferung_rev ENABLE TRIGGER USER;
ALTER TABLE public.sammlung_rev ENABLE TRIGGER USER;
ALTER TABLE public.teilkultur_rev ENABLE TRIGGER USER;
ALTER TABLE public.teilzaehlung_rev ENABLE TRIGGER USER;
ALTER TABLE public.zaehlung_rev ENABLE TRIGGER USER;

DROP FUNCTION public.uuidv7_from_ts(timestamptz, uuid);

COMMIT;

VACUUM (ANALYZE);
NOTIFY pgrst, 'reload schema';

