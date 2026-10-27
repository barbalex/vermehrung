#!/usr/bin/env python3
"""
Generates src/sql/createApiAccess.sql and src/sql/createSyncFunction.sql from
src/hasuraMetadata/metadata.json (the Hasura permission definitions) plus a
column-type dump of the live database.

This is the provenance tool for the PostgREST migration (2026-10-27):
Hasura applied these permissions itself (it connected as postgres and
enforced them per request). PostgREST instead relies on real database
roles, column grants and row level security - this tool translates the
Hasura metadata 1:1 into that model.

Regeneration (rarely needed, the generated files are committed):
  # dump column types + foreign keys (no data) from the dev db
  docker exec -e PGPASSWORD=... v_db psql -U postgres -d vermehrung -q -t -A -F'|' \
    -c "select table_name, column_name, data_type, udt_name from information_schema.columns \
        where table_schema='public' order by table_name, ordinal_position;" \
    > tools/db_column_types.txt
  docker exec -e PGPASSWORD=... v_db psql -U postgres -d vermehrung -q -t -A -F'|' \
    -c "select tc.table_name, kcu.column_name, ccu.table_name, ccu.column_name \
        from information_schema.table_constraints tc \
        join information_schema.key_column_usage kcu on tc.constraint_name = kcu.constraint_name and kcu.table_schema = tc.table_schema \
        join information_schema.constraint_column_usage ccu on ccu.constraint_name = tc.constraint_name and ccu.table_schema = tc.table_schema \
        where tc.constraint_type = 'FOREIGN KEY' and tc.table_schema = 'public' \
        order by tc.table_name, kcu.column_name;" \
    > tools/db_foreign_keys.txt
  python3 tools/generate_api_access_sql.py

Semantics notes (kept faithful to Hasura on purpose, including quirks):
- filters may traverse relationships; translated to EXISTS subqueries
- Hasura does NOT apply the traversed tables' permissions inside a filter
  expression. Plain inlined RLS would (the inner EXISTS runs under the
  traversed table's RLS) - and the mutual traversals (garten -> kultur ->
  garten) would be detected as infinite recursion by postgres. Both
  problems are solved the same way: every non-trivial filter becomes a
  SECURITY DEFINER function in schema app (owned by postgres, hence no
  RLS inside, exactly like Hasura resolving the filter), and the policy
  itself only calls that function.
- _exists is translated as an UNCORRELATED exists when no _ceq is present
  (Hasura does the same - see art_file/gaertner)
- X-Hasura-User-Id becomes app.current_user_id() (from the JWT claims
  PostgREST sets in request.jwt.claims)
- separate _and terms over the same array relationship become separate
  EXISTS clauses, exactly like Hasura generates them
"""

import json
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
METADATA = REPO / 'src/hasuraMetadata/metadata.json'
COLUMN_TYPES = REPO / 'tools/db_column_types.txt'
FOREIGN_KEYS = REPO / 'tools/db_foreign_keys.txt'
OUT_ACCESS = REPO / 'src/sql/createApiAccess.sql'
OUT_SYNC = REPO / 'src/sql/createSyncFunction.sql'

APP_ROLES = ['artverantwortlich', 'gaertner', 'manager']

# tables the client syncs, with exactly the field lists the graphql
# subscriptions selected (src/utils/initializeSubscriptions.js at migration
# time). sync() must return exactly these fields: WatermelonDB rows are
# created from them verbatim.
SYNC_TABLES = {
    'ae_art': ['id', 'name', 'taxonomy', 'changed'],
    'art': [
        'id', 'ae_id', 'set', 'apflora_av', 'apflora_ap', 'changed',
        'changed_by', '_rev', '_parent_rev', '_revisions', '_depth',
        '_conflicts', '_deleted',
    ],
    'art_file': [
        'id', 'art_id', 'file_id', 'file_mime_type', 'name', 'beschreibung',
        'changed', '_rev_at',
    ],
    'art_qk': [
        'id', 'name', 'titel', 'beschreibung', 'sort', 'changed', 'changed_by',
        '_rev', '_parent_rev', '_revisions', '_depth', '_conflicts',
        '_deleted',
    ],
    'av': [
        'id', 'art_id', 'person_id', 'changed', 'changed_by', '_rev',
        '_parent_rev', '_revisions', '_depth', '_conflicts', '_deleted',
    ],
    'bedarf': [
        'id', 'kultur_id', 'person_id', 'jahr', 'beschreibung', 'bemerkungen',
        'neues_material', 'changed', 'changed_by', '_rev', '_parent_rev',
        '_revisions', '_depth', '_conflicts', '_deleted',
    ],
    'event': [
        'id', 'kultur_id', 'teilkultur_id', 'person_id', 'beschreibung',
        'geplant', 'datum', 'changed', 'changed_by', '_rev', '_parent_rev',
        '_revisions', '_depth', '_conflicts', '_deleted',
    ],
    'garten': [
        'id', 'name', 'person_id', 'strasse', 'plz', 'ort', 'aktiv',
        'bemerkungen', 'geom_point', 'lv95_x', 'lv95_y', 'wgs84_lat',
        'wgs84_long', 'changed', 'changed_by', '_rev', '_parent_rev',
        '_revisions', '_depth', '_conflicts', '_deleted',
    ],
    'garten_file': [
        'id', 'garten_id', 'file_id', 'file_mime_type', 'name',
        'beschreibung', 'changed', '_rev_at',
    ],
    'gv': [
        'id', 'garten_id', 'person_id', 'changed', 'changed_by', '_rev',
        '_parent_rev', '_revisions', '_depth', '_conflicts', '_deleted',
    ],
    'herkunft': [
        'id', 'nr', 'lokalname', 'gemeinde', 'kanton', 'land', 'bemerkungen',
        'geom_point', 'lv95_x', 'lv95_y', 'wgs84_lat', 'wgs84_long',
        'changed', 'changed_by', '_rev', '_parent_rev', '_revisions',
        '_depth', '_conflicts', '_deleted',
    ],
    'herkunft_file': [
        'id', 'herkunft_id', 'file_id', 'file_mime_type', 'name',
        'beschreibung', 'changed', '_rev_at',
    ],
    'kultur': [
        'id', 'art_id', 'herkunft_id', 'garten_id', 'zwischenlager',
        'erhaltungskultur', 'von_anzahl_individuen', 'aktiv', 'bemerkungen',
        'changed', 'changed_by', '_rev', '_parent_rev', '_revisions',
        '_depth', '_conflicts', '_deleted',
    ],
    'kultur_file': [
        'id', 'kultur_id', 'file_id', 'file_mime_type', 'name',
        'beschreibung', 'changed', '_rev_at',
    ],
    'kultur_option': [
        'id', 'ev_datum', 'ev_geplant', 'ev_person_id', 'ev_teilkultur_id',
        'tk', 'tk_bemerkungen', 'tz_andere_menge',
        'tz_auspflanzbereit_beschreibung', 'tz_teilkultur_id', 'tz_bemerkungen',
        'z_bemerkungen', '_rev', '_parent_rev', '_revisions', '_depth',
        '_conflicts', '_deleted',
    ],
    'kultur_qk': [
        'id', 'name', 'titel', 'beschreibung', 'sort', 'changed', 'changed_by',
        '_rev', '_parent_rev', '_revisions', '_depth', '_conflicts',
        '_deleted',
    ],
    'lieferung': [
        'id', 'sammel_lieferung_id', 'art_id', 'person_id', 'von_sammlung_id',
        'von_kultur_id', 'datum', 'nach_kultur_id', 'nach_ausgepflanzt',
        'von_anzahl_individuen', 'anzahl_pflanzen', 'anzahl_auspflanzbereit',
        'gramm_samen', 'andere_menge', 'geplant', 'bemerkungen', 'changed',
        'changed_by', '_rev', '_parent_rev', '_revisions', '_depth',
        '_conflicts', '_deleted',
    ],
    'lieferung_file': [
        'id', 'lieferung_id', 'file_id', 'file_mime_type', 'name',
        'beschreibung', 'changed', '_rev_at',
    ],
    'person': [
        'id', 'nr', 'vorname', 'name', 'adresszusatz', 'strasse', 'plz',
        'ort', 'telefon_privat', 'telefon_geschaeft', 'telefon_mobile',
        'email', 'kein_email', 'bemerkungen', 'account_id', 'user_role_id',
        'kommerziell', 'info', 'aktiv', 'changed', 'changed_by', '_rev',
        '_parent_rev', '_revisions', '_depth', '_conflicts', '_deleted',
    ],
    'person_file': [
        'id', 'person_id', 'file_id', 'file_mime_type', 'name',
        'beschreibung', 'changed', '_rev_at',
    ],
    'person_option': [
        'id', 'ar_name_deutsch', 'ga_strasse', 'ga_plz', 'ga_ort',
        'ga_geom_point', 'ga_lat_lng', 'ga_aktiv', 'ga_bemerkungen',
        'hk_kanton', 'hk_land', 'hk_bemerkungen', 'hk_geom_point',
        'ku_zwischenlager', 'ku_erhaltungskultur', 'li_show_sl_felder',
        'li_show_sl', 'sl_show_empty_when_next_to_li', 'sl_auto_copy_edits',
        'tree_kultur', 'tree_teilkultur', 'tree_zaehlung', 'tree_lieferung',
        'tree_event', 'art_qk_choosen', 'kultur_qk_choosen', '_rev',
        '_parent_rev', '_revisions', '_depth', '_conflicts', '_deleted',
    ],
    'sammel_lieferung': [
        'id', 'art_id', 'person_id', 'von_sammlung_id', 'von_kultur_id',
        'datum', 'nach_kultur_id', 'nach_ausgepflanzt',
        'von_anzahl_individuen', 'anzahl_pflanzen', 'anzahl_auspflanzbereit',
        'gramm_samen', 'andere_menge', 'geplant', 'bemerkungen', '_rev',
        '_parent_rev', '_revisions', '_depth', '_conflicts', '_deleted',
    ],
    'sammlung': [
        'id', 'art_id', 'person_id', 'herkunft_id', 'nr', 'datum',
        'von_anzahl_individuen', 'anzahl_pflanzen', 'gramm_samen',
        'andere_menge', 'geplant', 'bemerkungen', 'geom_point', 'lv95_x',
        'lv95_y', 'wgs84_lat', 'wgs84_long', 'changed', 'changed_by', '_rev',
        '_parent_rev', '_revisions', '_depth', '_conflicts', '_deleted',
    ],
    'sammlung_file': [
        'id', 'sammlung_id', 'file_id', 'file_mime_type', 'name',
        'beschreibung', 'changed', '_rev_at',
    ],
    'teilkultur': [
        'id', 'kultur_id', 'name', 'ort1', 'ort2', 'ort3', 'bemerkungen',
        'changed', 'changed_by', '_rev', '_parent_rev', '_revisions',
        '_depth', '_conflicts', '_deleted',
    ],
    'teilzaehlung': [
        'id', 'zaehlung_id', 'teilkultur_id', 'anzahl_pflanzen',
        'anzahl_auspflanzbereit', 'anzahl_mutterpflanzen', 'andere_menge',
        'auspflanzbereit_beschreibung', 'bemerkungen', 'changed',
        'changed_by', '_rev', '_parent_rev', '_revisions', '_depth',
        '_conflicts', '_deleted',
    ],
    'user_role': ['id', 'name', 'label', 'sort', 'comment', 'changed'],
    'zaehlung': [
        'id', 'kultur_id', 'datum', 'prognose', 'bemerkungen', 'changed',
        'changed_by', '_rev', '_parent_rev', '_revisions', '_depth',
        '_conflicts', '_deleted',
    ],
}

# gaertner must not receive these herkunft columns (was done client-side by
# omitting fields from the subscription; now enforced server-side)
HERKUNFT_GAERTNER_EXCLUDED = [
    'lokalname', 'geom_point', 'lv95_x', 'lv95_y', 'wgs84_lat', 'wgs84_long',
]

# rev-trigger functions must become security definer: under Hasura they ran
# as postgres (Hasura's connection role), under PostgREST they run as the
# requesting app role which must not need insert privileges on the
# materialized tables
REV_TRIGGER_TABLES = [
    'art', 'art_qk', 'art_qk_choosen', 'av', 'bedarf', 'event', 'garten',
    'gv', 'herkunft', 'kultur', 'kultur_option', 'kultur_qk',
    'kultur_qk_choosen', 'lieferung', 'person', 'person_option',
    'sammel_lieferung', 'sammlung', 'teilkultur', 'teilzaehlung', 'zaehlung',
]


def load_column_types():
    types = {}
    for line in COLUMN_TYPES.read_text().splitlines():
        table, column, data_type, udt = line.split('|')
        types[(table, column)] = (data_type, udt)
    return types


def load_foreign_keys():
    fks = {}
    for line in FOREIGN_KEYS.read_text().splitlines():
        table, column, foreign_table, foreign_column = line.split('|')
        fks[(table, column)] = (foreign_table, foreign_column)
    return fks


def load_metadata():
    with open(METADATA) as f:
        m = json.load(f)
    src = m['metadata']['sources'][0]
    tables = {}
    rels = {}
    for t in src['tables']:
        name = t['table']['name']
        tables[name] = t
        for r in t.get('object_relationships', []):
            using = r['using']
            if 'foreign_key_constraint_on' in using:
                v = using['foreign_key_constraint_on']
                if isinstance(v, str):
                    # fk column on this table, references remote pk (id)
                    rels[(name, r['name'])] = (
                        'obj', {'local': v, 'remote': 'id'}, None
                    )
                else:
                    # fk on the remote table pointing back here
                    rels[(name, r['name'])] = (
                        'obj', None,
                        {'table': v['table']['name'], 'remote': v['column']},
                    )
            else:
                mc = using['manual_configuration']
                mapping = mc['column_mapping']
                rels[(name, r['name'])] = (
                    'obj',
                    {'pairs': [(l, rcol) for l, rcol in mapping.items()]},
                    None,
                )
        for r in t.get('array_relationships', []):
            using = r['using']
            if 'foreign_key_constraint_on' in using:
                v = using['foreign_key_constraint_on']
                rels[(name, r['name'])] = (
                    'arr',
                    {'table': v['table']['name'], 'column': v['column']},
                    None,
                )
            else:
                mc = using['manual_configuration']
                mapping = mc['column_mapping']
                rels[(name, r['name'])] = (
                    'arr',
                    {
                        'table': mc['remote_table']['name'],
                        'pairs': [(l, rcol) for l, rcol in mapping.items()],
                    },
                    None,
                )
    return tables, rels


class Translator:
    """Translates a Hasura bool_exp into a SQL boolean expression.

    References to columns of the row the filter applies to are emitted via
    ref(): either qualified by the table name (policies on existing rows)
    or as p_<column> parameters (insert checks on the new row).
    """

    PARAMS = '__params__'

    def __init__(self, tables, rels, coltypes, fks):
        self.tables = tables
        self.rels = rels
        self.coltypes = coltypes
        self.fks = fks
        self.alias_count = 0
        self.outer_cols = set()

    def fresh_alias(self):
        self.alias_count += 1
        return f'r{self.alias_count}'

    def ref(self, ref, column):
        if ref == self.PARAMS:
            self.outer_cols.add(column)
            return f'p_{column}'
        return f'{ref}.{q(column)}'

    def translate(self, expr, table, ref):
        if not expr:
            return 'true'
        parts = []
        for key, val in expr.items():
            if key == '_or':
                inner = ' or '.join(self.translate(v, table, ref) for v in val)
                parts.append(f'({inner})')
            elif key == '_and':
                inner = ' and '.join(
                    self.translate(v, table, ref) for v in val
                )
                parts.append(f'({inner})')
            elif key == '_not':
                parts.append(f'not ({self.translate(val, table, ref)})')
            elif key == '_exists':
                sub_table = val['_table']['name']
                sub_where = val.get('_where', {})
                ra = self.fresh_alias()
                cond = self.translate(sub_where, sub_table, ra)
                parts.append(
                    f'exists (select 1 from {q(sub_table)} {ra} where {cond})'
                )
            elif (table, key) in self.rels:
                parts.append(
                    self.translate_relationship(val, table, key, ref)
                )
            else:
                for op, v in val.items():
                    parts.append(
                        self.translate_operator(op, v, table, key, ref)
                    )
        return ' and '.join(parts) if parts else 'true'

    def translate_relationship(self, nested, table, rel_name, ref):
        kind, spec, back = self.rels[(table, rel_name)]
        ra = self.fresh_alias()
        if kind == 'obj':
            if back is not None:
                remote_table = back['table']
                join = (
                    f'{q(remote_table)}.{q(back["remote"])} = '
                    f'{self.ref(ref, "id")}'
                )
            elif 'pairs' in spec:
                remote_table = self.remote_of_manual_obj(table, rel_name)
                join = ' and '.join(
                    f'{ra}.{q(rcol)} = {self.ref(ref, lcol)}'
                    for lcol, rcol in spec['pairs']
                )
            else:
                if (table, spec['local']) in self.fks:
                    remote_table, remote_col = self.fks[(table, spec['local'])]
                else:
                    # no real fk in the db (e.g. bedarf, created without
                    # constraints) - fall back to the <x>_id -> x.id
                    # naming convention, like Hasura did
                    remote_table = (
                        spec['local'][:-3]
                        if spec['local'].endswith('_id')
                        else spec['local']
                    )
                    remote_col = 'id'
                    print(
                        f'WARN: no fk in db for {table}.{spec["local"]}, '
                        f'assuming -> {remote_table}.{remote_col}'
                    )
                join = f'{ra}.{q(remote_col)} = {self.ref(ref, spec["local"])}'
            cond = self.translate(nested, remote_table, ra)
            return (
                f'exists (select 1 from {q(remote_table)} {ra} '
                f'where {join} and {cond})'
            )
        # array relationship
        remote_table = spec['table']
        if 'pairs' in spec:
            join = ' and '.join(
                f'{ra}.{q(rcol)} = {self.ref(ref, lcol)}'
                for lcol, rcol in spec['pairs']
            )
        else:
            join = f'{ra}.{q(spec["column"])} = {self.ref(ref, "id")}'
        cond = self.translate(nested, remote_table, ra)
        return (
            f'exists (select 1 from {q(remote_table)} {ra} '
            f'where {join} and {cond})'
        )

    def remote_of_manual_obj(self, table, rel_name):
        t = self.tables[table]
        for r in t.get('object_relationships', []):
            if r['name'] == rel_name:
                return (
                    r['using']['manual_configuration']['remote_table']['name']
                )
        raise KeyError(rel_name)

    def translate_operator(self, op, val, table, column, ref):
        col = self.ref(ref, column)
        if op == '_eq':
            if val == 'X-Hasura-User-Id':
                dtype, udt = self.coltypes.get(
                    (table, column), ('text', 'text')
                )
                return f'{col} = app.current_user_id()::{pg_cast(dtype, udt)}'
            return f'{col} = {sql_literal(val)}'
        if op == '_neq':
            return f'{col} <> {sql_literal(val)}'
        if op == '_is_null':
            return f'{col} is {"" if val else "not "}null'
        if op in ('_gt', '_gte', '_lt', '_lte'):
            sym = {'_gt': '>', '_gte': '>=', '_lt': '<', '_lte': '<='}[op]
            return f'{col} {sym} {sql_literal(val)}'
        if op == '_in':
            vals = ', '.join(sql_literal(v) for v in val)
            return f'{col} in ({vals})'
        raise NotImplementedError(f'operator {op}')


def sql_literal(val):
    if val is True:
        return 'true'
    if val is False:
        return 'false'
    if val is None:
        return 'null'
    if isinstance(val, (int, float)):
        return str(val)
    return "'" + str(val).replace("'", "''") + "'"


def q(identifier):
    return '"' + identifier + '"'


def pg_cast(data_type, udt):
    if udt == 'geometry':
        return 'geometry'
    return udt


def helper_name(op, table, role):
    return f'{op}_{table}_{role}'


def emit_id_helper(out, tr, op, table, role, expr):
    """SECURITY DEFINER predicate on an existing row, looked up by id.
    Inside the helper no RLS applies - exactly how Hasura resolved the
    filter expression (it also never applied the traversed tables'
    permissions inside a filter)."""
    name = helper_name(op, table, role)
    out.append(
        f'create or replace function app.{name}(p_id uuid) returns boolean\n'
        f'  language sql stable security definer set search_path = public as $$\n'
        f'  select exists (\n'
        f'    select 1 from {q(table)} where {q(table)}.id = p_id and ({expr})\n'
        f'  )\n'
        f'$$;'
    )


def emit_params_helper(out, tr, op, table, role, expr, coltypes):
    """SECURITY DEFINER predicate on a NEW row (insert check): the
    referenced columns are passed as parameters."""
    name = helper_name(op, table, role)
    cols = sorted(tr.outer_cols)
    params = ', '.join(
        f'p_{c} {pg_cast(*coltypes[(table, c)])}' for c in cols
    )
    out.append(
        f'create or replace function app.{name}({params}) returns boolean\n'
        f'  language sql stable security definer set search_path = public as $$\n'
        f'  select {expr}\n'
        f'$$;'
    )
    return cols


def generate():
    coltypes = load_column_types()
    fks = load_foreign_keys()
    tables, rels = load_metadata()
    tr = Translator(tables, rels, coltypes, fks)

    helpers = []
    grants_and_policies = []

    out = []
    w = out.append
    w('-- GENERATED by tools/generate_api_access_sql.py - DO NOT EDIT BY HAND')
    w('-- (regenerate with: python3 tools/generate_api_access_sql.py)')
    w('--')
    w('-- Database roles, column grants and row level security for the')
    w('-- PostgREST api, translated 1:1 from the former Hasura permissions')
    w('-- (src/hasuraMetadata/metadata.json).')
    w('--')
    w('-- Non-trivial permission expressions live in SECURITY DEFINER')
    w('-- functions in schema app (not exposed by PostgREST): postgres would')
    w('-- otherwise detect infinite recursion between the mutually referring')
    w('-- policies (garten -> kultur -> garten), and plain RLS would apply')
    w('-- the traversed tables\' permissions inside a filter, which Hasura')
    w('-- never did.')
    w('--')
    w('-- Apply with the authenticator password as custom GUC:')
    w(
        "--   PGOPTIONS=\"-c app.password='<from .env PGRST_DB_URI>'\" "
        'psql -f createApiAccess.sql'
    )
    w('')
    w('begin;')
    w('')
    w('--- roles -----------------------------------------------------------')
    w('')
    w('create schema if not exists app;')
    w('')
    w(
        "create or replace function app.current_user_id() returns uuid\n"
        'language sql stable as $$\n'
        "  select (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'user_id')::uuid\n"
        '$$;'
    )
    w('')
    w(
        'do $$\n'
        'declare\n'
        "  v_password text := current_setting('app.password');\n"
        'begin\n'
        "  if not exists (select 1 from pg_roles where rolname = 'authenticator') then\n"
        "    execute format('create role authenticator login password %L', v_password);\n"
        '  else\n'
        "    execute format('alter role authenticator login password %L', v_password);\n"
        '  end if;\n'
        'end $$;'
    )
    w('')
    for role in ['anon'] + APP_ROLES:
        w(
            f'do $$ begin\n'
            f"  if not exists (select 1 from pg_roles where rolname = '{role}') then\n"
            f"    create role {role} nologin;\n"
            f'  end if;\n'
            f'end $$;'
        )
    w('')
    w('grant usage on schema public, app to anon;')
    w(f"grant usage on schema public, app to {', '.join(APP_ROLES)};")
    w(f"grant {', '.join(['anon'] + APP_ROLES)} to authenticator;")
    w('')

    # ---- grants + policies per table ----
    # (assembled after the loop; helper functions must be created first
    # because the policies reference them)
    g = grants_and_policies.append
    g('--- grants and row level security ----------------------------------')
    g('')
    for name in sorted(tables):
        t = tables[name]
        g(f'-- {name}')
        g(f'alter table {q(name)} enable row level security;')
        for role in APP_ROLES:
            perms = {}
            for op, key in (
                ('select', 'select_permissions'),
                ('insert', 'insert_permissions'),
                ('update', 'update_permissions'),
                ('delete', 'delete_permissions'),
            ):
                for p in t.get(key, []):
                    if p['role'] == role:
                        perms[op] = p['permission']
            if not perms:
                continue
            # column grants
            if 'select' in perms:
                cols = ', '.join(q(c) for c in perms['select']['columns'])
                g(f'grant select ({cols}) on {q(name)} to {q(role)};')
            if 'insert' in perms:
                cols = ', '.join(q(c) for c in perms['insert']['columns'])
                g(f'grant insert ({cols}) on {q(name)} to {q(role)};')
            if 'update' in perms:
                cols = ', '.join(q(c) for c in perms['update']['columns'])
                g(f'grant update ({cols}) on {q(name)} to {q(role)};')
            if 'delete' in perms:
                g(f'grant delete on {q(name)} to {q(role)};')
            # policies
            if 'select' in perms:
                filt = perms['select'].get('filter') or {}
                if filt:
                    expr = tr.translate(filt, name, q(name))
                    emit_id_helper(helpers, tr, 'sel', name, role, expr)
                    policy_expr = f'app.{helper_name("sel", name, role)}(id)'
                else:
                    policy_expr = 'true'
                g(f'drop policy if exists {policy_name(name, "sel", role)} on {q(name)};')
                g(
                    f'create policy {policy_name(name, "sel", role)} on {q(name)}\n'
                    f'  for select to {q(role)} using ({policy_expr});'
                )
            if 'insert' in perms:
                check = perms['insert'].get('check') or {}
                if check:
                    tr.outer_cols = set()
                    expr = tr.translate(check, name, tr.PARAMS)
                    cols = emit_params_helper(
                        helpers, tr, 'ins', name, role, expr, coltypes
                    )
                    tr.outer_cols = set()
                    args = ', '.join(cols)
                    policy_expr = f'app.{helper_name("ins", name, role)}({args})'
                else:
                    policy_expr = 'true'
                g(f'drop policy if exists {policy_name(name, "ins", role)} on {q(name)};')
                g(
                    f'create policy {policy_name(name, "ins", role)} on {q(name)}\n'
                    f'  for insert to {q(role)} with check ({policy_expr});'
                )
            if 'update' in perms:
                filt = perms['update'].get('filter') or {}
                if filt:
                    expr = tr.translate(filt, name, q(name))
                    emit_id_helper(helpers, tr, 'upd', name, role, expr)
                    policy_expr = f'app.{helper_name("upd", name, role)}(id)'
                else:
                    policy_expr = 'true'
                # all update checks in the metadata are null
                g(f'drop policy if exists {policy_name(name, "upd", role)} on {q(name)};')
                g(
                    f'create policy {policy_name(name, "upd", role)} on {q(name)}\n'
                    f'  for update to {q(role)}\n'
                    f'  using ({policy_expr})\n'
                    f'  with check (true);'
                )
            if 'delete' in perms:
                filt = perms['delete'].get('filter') or {}
                if filt:
                    expr = tr.translate(filt, name, q(name))
                    emit_id_helper(helpers, tr, 'del', name, role, expr)
                    policy_expr = f'app.{helper_name("del", name, role)}(id)'
                else:
                    policy_expr = 'true'
                g(f'drop policy if exists {policy_name(name, "del", role)} on {q(name)};')
                g(
                    f'create policy {policy_name(name, "del", role)} on {q(name)}\n'
                    f'  for delete to {q(role)} using ({policy_expr});'
                )
        g('')

    # ---- security definer helpers (must precede the policies) ----------
    w('--- permission helper functions (security definer) ------------------')
    w('')
    out.extend(helpers)
    w('')
    w('revoke execute on all functions in schema app from public;')
    w(
        f'grant execute on all functions in schema app to '
        f"{', '.join(APP_ROLES)};"
    )
    w('')
    out.extend(grants_and_policies)

    # ---- security definer for rev triggers ----
    w('--- rev triggers must run as owner ---------------------------------')
    w('-- Hasura connected as postgres, so these triggers always had full')
    w('-- privileges. Under PostgREST the app roles invoke them; the')
    w('-- materialized tables are not directly writable by app roles, so')
    w('-- the trigger functions must be security definer.')
    w('')
    for table in REV_TRIGGER_TABLES:
        fn = f'{table}_rev_set_winning_revision'
        w(
            f'alter function public.{fn}() security definer '
            f'set search_path = public;'
        )
    w('')

    w('commit;')

    OUT_ACCESS.write_text('\n'.join(out) + '\n')

    # ---- sync function ----
    s = []
    w = s.append
    w('-- GENERATED by tools/generate_api_access_sql.py - DO NOT EDIT BY HAND')
    w('--')
    w('-- Single delta-sync endpoint replacing the 28 graphql live')
    w('-- subscriptions: returns rows changed since the per-table cursors')
    w('-- passed in p_since (epoch seconds), plus the server time the sync')
    w('-- ran (synced_at), which becomes the next cursor.')
    w('--')
    w('-- security invoker: row level security of the calling role applies.')
    w('')
    w('create or replace function public.sync(p_since jsonb default \'{}\'::jsonb)')
    w('  returns jsonb')
    w('  language plpgsql')
    w('  stable')
    w('  security invoker')
    w('  set search_path = public')
    w('as $$')
    w('declare')
    w("  v_role text := nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role';")
    w("  v_result jsonb := jsonb_build_object('synced_at', extract(epoch from clock_timestamp()));")
    w('  v_since numeric;')
    w('  v_rows jsonb;')
    w('begin')
    for table, cols in SYNC_TABLES.items():
        def col_expr(c):
            # replicate the exact GeoJSON Hasura emitted: to_jsonb(geometry)
            # keeps full coordinate precision but drops the crs member
            if coltypes.get((table, c), ('', ''))[1] == 'geometry':
                return (
                    f'(case when s.{q(c)} is null then null '
                    f'else to_jsonb(s.{q(c)}) '
                    f"|| '{{\"crs\":{{\"type\":\"name\",\"properties\":{{\"name\":\"urn:ogc:def:crs:EPSG::4326\"}}}}}}'::jsonb end) as {q(c)}"
                )
            return q(c)
        col_list = ', '.join(col_expr(c) for c in cols)
        gaertner_col_list = ', '.join(
            col_expr(c) for c in cols if c not in HERKUNFT_GAERTNER_EXCLUDED
        )
        w(f'  -- {table}')
        w(f"  v_since := coalesce((p_since ->> '{table}')::numeric, 0);")
        if table == 'herkunft':
            w(f"  if v_role = 'gaertner' then")
            w(
                f"    select coalesce(jsonb_agg(to_jsonb(s)), '[]'::jsonb) into v_rows"
            )
            w(
                f'      from (select {gaertner_col_list} from herkunft s where s._rev_at > v_since) s;'
            )
            w('  else')
            w(
                f"    select coalesce(jsonb_agg(to_jsonb(s)), '[]'::jsonb) into v_rows"
            )
            w(
                f'      from (select {col_list} from herkunft s where s._rev_at > v_since) s;'
            )
            w('  end if;')
        else:
            w(
                f"  select coalesce(jsonb_agg(to_jsonb(s)), '[]'::jsonb) into v_rows"
            )
            w(
                f'    from (select {col_list} from {q(table)} s where s._rev_at > v_since) s;'
            )
        w(f"  v_result := v_result || jsonb_build_object('{table}', v_rows);")
    w('  return v_result;')
    w('end;')
    w('$$;')
    w('')
    w('revoke execute on function public.sync(jsonb) from public;')
    w(f"grant execute on function public.sync(jsonb) to {', '.join(APP_ROLES)};")

    OUT_SYNC.write_text('\n'.join(s) + '\n')

    print(f'wrote {OUT_ACCESS} ({len(out)} lines)')
    print(f'wrote {OUT_SYNC} ({len(s)} lines)')


def policy_name(table, op, role):
    return q(f'{table}_{op}_{role}')


if __name__ == '__main__':
    generate()
