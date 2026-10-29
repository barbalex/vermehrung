-- Some legacy rows have _rev_at stored in MILLISECONDS since epoch
-- (e.g. sammlung_file 017abed2-b393-7158-8cde-ffbc737ca5c4 with
-- _rev_at = 1626699299397, which is 2021-07-19 in ms). The sync rpc
-- compares _rev_at against second-based watermarks, so a ms value is
-- larger than any watermark for the next ~50'000 years and the row is
-- returned by every single poll (echoing in processSubscriptionResult).
--
-- seconds-epoch values are ~1.8e9, ms values ~1.6e12: everything above
-- 1e11 (= year 5138 in seconds) is unambiguously a ms value.

-- 1. inspect affected rows first
select 'sammlung_file' as t, id, _rev_at from sammlung_file where _rev_at > 100000000000
union all select 'art_file', id, _rev_at from art_file where _rev_at > 100000000000
union all select 'garten_file', id, _rev_at from garten_file where _rev_at > 100000000000
union all select 'herkunft_file', id, _rev_at from herkunft_file where _rev_at > 100000000000
union all select 'kultur_file', id, _rev_at from kultur_file where _rev_at > 100000000000
union all select 'lieferung_file', id, _rev_at from lieferung_file where _rev_at > 100000000000
union all select 'person_file', id, _rev_at from person_file where _rev_at > 100000000000;

-- 2. repair: ms -> s, in every table that has a _rev_at column
--    (base tables only: foreign tables like ae_art_live also expose
--    _rev_at in information_schema.columns but are not updatable
--    here, and the whole do-block is one transaction - a failure
--    rolls back every previous update in it)
do $$
declare
  t text;
  n integer;
begin
  for t in
    select c.table_name
    from information_schema.columns c
    join information_schema.tables t
      on t.table_schema = c.table_schema and t.table_name = c.table_name
    where c.table_schema = 'public'
      and c.column_name = '_rev_at'
      and t.table_type = 'BASE TABLE'
  loop
    execute format(
      'update %I set _rev_at = _rev_at / 1000.0 where _rev_at > 100000000000',
      t
    );
    get diagnostics n = row_count;
    if n > 0 then
      raise notice '%: normalized % row(s)', t, n;
    end if;
  end loop;
end $$;
