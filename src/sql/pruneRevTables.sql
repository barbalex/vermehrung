-- Prunes revision tables: they grow forever (one row per edit) and the
-- winning-revision triggers scan a row's whole rev tree per insert.
--
-- Safe to delete, per <table>_rev row:
--   * it is not the winning revision (materialized _rev differs)
--   * it is not a parent of any other revision (_parent_rev not
--     referenced) - so every chain node leading to the current winner
--     is kept and histories stay connected
--   * it is not listed in the materialized row's _conflicts
--   * it is older than the retention window (:retention_days)
--
-- DRY RUN by default: psql -v retention_days=90 -f pruneRevTables.sql
-- prints what would be deleted. Pass -v dry_run=off to delete.
-- (psql variables do not interpolate inside $$ bodies - they are
-- routed through session settings)

select set_config('prune.retention_days',
                  coalesce(:'retention_days', '90'), false);
select set_config('prune.dry_run',
                  coalesce(:'dry_run', 'on'), false);

\set ON_ERROR_STOP on

do $$
declare
  t text;
  v_days int := current_setting('prune.retention_days')::int;
  v_dry_run boolean := current_setting('prune.dry_run') <> 'off';
  v_id_col text;
  v_count bigint;
  v_total bigint := 0;
begin
  foreach t in array array[
    'art', 'art_qk', 'av', 'bedarf', 'event', 'garten', 'gv',
    'herkunft', 'kultur', 'kultur_option', 'kultur_qk', 'lieferung',
    'person', 'person_option', 'sammel_lieferung', 'sammlung',
    'teilkultur', 'teilzaehlung', 'zaehlung'
  ]
  loop
    v_id_col :=
      case t
        when 'kultur_option' then 'kultur_id'
        when 'person_option' then 'person_id'
        else t || '_id'
      end;
    execute format(
      'select count(*) from %I r
       where r._rev <> (select _rev from %I m where m.id = r.%I)
         and not exists (
           select 1 from %I c where c._parent_rev = r._rev
         )
         and r._rev <> all (
           select unnest(coalesce(m._conflicts, ''{}''::text[]))
           from %I m where m.id = r.%I
         )
         and r.changed < now() - make_interval(days => %s)',
      t || '_rev', t, v_id_col, t || '_rev', t, v_id_col, v_days
    ) into v_count;
    if v_count > 0 then
      raise notice '%: % rows %', t, v_count,
        case when v_dry_run then 'would be deleted' else 'deleted' end;
      if not v_dry_run then
        execute format(
          'delete from %I r
           where r._rev <> (select _rev from %I m where m.id = r.%I)
             and not exists (
               select 1 from %I c where c._parent_rev = r._rev
             )
             and r._rev <> all (
               select unnest(coalesce(m._conflicts, ''{}''::text[]))
               from %I m where m.id = r.%I
             )
             and r.changed < now() - make_interval(days => %s)',
          t || '_rev', t, v_id_col, t || '_rev', t, v_id_col, v_days
        );
      end if;
      v_total := v_total + v_count;
    end if;
  end loop;
  raise notice 'total: % rows %', v_total,
    case when v_dry_run then 'would be deleted (dry run)' else 'deleted' end;
end;
$$;
