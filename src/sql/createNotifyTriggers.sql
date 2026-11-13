-- notifies the channel 'vermehrung_changed' (payload: table name) on
-- every write to a synced table, so the auth service can push an SSE
-- 'dirty' signal and clients fetch deltas instead of polling every 5s.
-- Row-level on purpose: it catches every write path (rev triggers,
-- direct upserts, maintenance scripts). The SSE service debounces the
-- per-row chatter; the payload only names tables - row visibility stays
-- with the sync rpc's row level security.
-- NOTE: ae_art is a foreign table - local triggers do not fire for
-- changes made on the remote apflora server, so it is excluded and
-- relies on the clients' fallback poll.

create or replace function public.notify_row_changed() returns trigger
language plpgsql as $$
begin
  perform pg_notify('vermehrung_changed', tg_table_name);
  return null;
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array[
    'art',
    'art_file',
    'art_qk',
    'av',
    'bedarf',
    'garten',
    'garten_file',
    'gv',
    'herkunft',
    'herkunft_file',
    'kultur',
    'kultur_file',
    'kultur_option',
    'kultur_qk',
    'lieferung',
    'lieferung_file',
    'person',
    'person_file',
    'person_option',
    'sammel_lieferung',
    'sammlung',
    'sammlung_file',
    'teilkultur',
    'teilzaehlung',
    'user_role',
    'zaehlung'
  ]
  loop
    execute format(
      'drop trigger if exists notify_changed on public.%I',
      t
    );
    execute format(
      'create trigger notify_changed after insert or update or delete
       on public.%I for each row execute function public.notify_row_changed()',
      t
    );
  end loop;
end;
$$;
