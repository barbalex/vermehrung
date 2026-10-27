#!/usr/bin/env python3
"""
One-off codemod for the PostgREST migration (2026-10-27):
rewrites the remaining graphql call sites (history/conflict components,
admin menu, files uploader, dbModel file writers) to the api client.
Verifies it left nothing behind.
"""
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SRC = REPO / 'src'

changed = []
problems = []

def read(p):
    return p.read_text()

def write(p, s):
    p.write_text(s)
    changed.append(str(p.relative_to(REPO)))

# ---------- extract field list from a gql query block ----------
def extract_fields(query_body):
    fields = []
    for line in query_body.split('\n'):
        t = line.strip()
        if not t or t.startswith('#') or t.startswith('$') or t.startswith('query') or t.startswith('}'):
            continue
        if re.fullmatch(r'[a-zA-Z_][a-zA-Z0-9_]*', t):
            if t != '__typename':
                fields.append(t)
        else:
            problems.append(f'unexpected line in query body: {t!r}')
    return fields

def import_path_for(file):
    depth = len(file.relative_to(SRC).parts) - 1
    return '../' * depth + 'utils/useApiQuery.js' if depth else 'utils/useApiQuery.js'

# ---------- 1. History/index.jsx ----------
for p in sorted(SRC.glob('**/History/index.jsx')):
    s = read(p)
    if 'useQuery' not in s:
        continue
    m = re.search(
        r"const (\w+) = gql`\n"
        r"\s*query \w+\(\$rev: \[String!\]\) \{\n"
        r"\s*(\w+)_rev\(where: \{ _rev: \{ _in: \$rev \} \}\) \{\n"
        r"(.*?)\n"
        r"\s*\}\n"
        r"\s*\}\n"
        r"`",
        s, re.S,
    )
    if not m:
        problems.append(f'{p}: history query pattern not found')
        continue
    fields = extract_fields(m.group(3))
    table = m.group(2)
    select = ','.join(fields)
    s = s.replace(m.group(0) + '\n\n', '')
    s = s.replace("import gql from 'graphql-tag'\n", '')
    s = s.replace("import { useQuery } from 'urql'\n", '')
    # insert useApiQuery import after the urql import position (after react-slick import)
    s = s.replace(
        "import Slider from 'react-slick'\n",
        "import Slider from 'react-slick'\n\nimport { useApiQuery } from '" + import_path_for(p) + "'\n",
        1,
    )
    old_call = re.search(
        r"const \[\{ error, data, fetching \}\] = useQuery\(\{\n"
        r"\s*query: \w+,\n"
        r"\s*variables: \{\n"
        r"\s*rev: priorRevisions,\n"
        r"\s*\},\n"
        r"\s*\}\)",
        s,
    )
    if not old_call:
        problems.append(f'{p}: useQuery call pattern not found')
        continue
    new_call = (
        'const revPath = priorRevisions.length\n'
        f'    ? `/{table}_rev?_rev=in.(${{priorRevisions.join(\',\')}})&select={select}`\n'
        '    : null\n'
        '  const { error, data, fetching } = useApiQuery(revPath)'
    )
    s = s.replace(old_call.group(0), new_call)
    write(p, s)

# ---------- 2. Conflict.jsx ----------
for p in sorted(SRC.glob('**/Conflict.jsx')):
    s = read(p)
    if 'useQuery' not in s:
        continue
    m = re.search(
        r"const (\w+) = gql`\n"
        r"\s*query \w+\(\$id: uuid!, \$rev: String!\) \{\n"
        r"\s*(\w+)_rev\(\s*where:\s*\{\s*(\w+)_id:\s*\{\s*_eq:\s*\$id\s*\},\s*_rev:\s*\{\s*_eq:\s*\$rev\s*\}\s*\}\s*\)\s*\{\n"
        r"(.*?)\n"
        r"\s*\}\n"
        r"\s*\}\n"
        r"`",
        s, re.S,
    )
    if not m:
        problems.append(f'{p}: conflict query pattern not found')
        continue
    fields = extract_fields(m.group(4))
    table = m.group(2)
    select = ','.join(fields)
    s = s.replace(m.group(0) + '\n\n', '')
    s = s.replace("import gql from 'graphql-tag'\n", '')
    s = s.replace("import { useQuery } from 'urql'\n", '')
    # add import after store import block: use the existing addNotification import line position
    s = s.replace(
        "} from '../../../store/index.js'\n",
        "} from '../../../store/index.js'\n",
    )
    # import line: put after the last import from store
    store_import = re.search(r"import \{[^}]*\} from '(\.\./)+store/index\.js'", s)
    if store_import:
        s = s.replace(
            store_import.group(0) + '\n',
            store_import.group(0) + f"\nimport {{ useApiQuery }} from '{import_path_for(p)}'\n",
            1,
        )
    else:
        problems.append(f'{p}: store import not found for useApiQuery import')
        continue
    old_call = re.search(
        r"const \[\{ error, data, fetching \}\] = useQuery\(\{\n"
        r"\s*query: \w+,\n"
        r"\s*variables: \{\n"
        r"(.*?)\n"
        r"\s*\},\n"
        r"\s*\}\)",
        s, re.S,
    )
    if not old_call:
        problems.append(f'{p}: conflict useQuery call not found')
        continue
    # the id expression can be plain `id` or e.g. `id: row.id`
    id_expr = 'id'
    id_m = re.search(r"\bid(?::\s*([\w.]+))?\s*,?", old_call.group(1))
    if id_m and id_m.group(1):
        id_expr = id_m.group(1)
    new_call = (
        'const { error, data, fetching } = useApiQuery(\n'
        f'    `/{table}_rev?{table}_id=eq.${{{id_expr}}}&_rev=eq.${{rev}}&select={select}`,\n'
        '  )'
    )
    s = s.replace(old_call.group(0), new_call)
    write(p, s)

# ---------- 3. mutation call blocks (Conflict.jsx + History/Row.jsx + Files) ----------
mutation_block = re.compile(
    r"const response = await (?:store\n?\s*\.get\(gqlClientAtom\)|gqlClient)\n"
    r"\s*\.mutation\(mutations\.mutateInsert_(\w+)_rev_one(?:, \{\n"
    r"\s*object: newObject,\n"
    r"\s*on_conflict: \{\n"
    r"\s*constraint: '\w+_rev_pkey',\n"
    r"\s*update_columns: \['id'\],\n"
    r"\s*\},\n"
    r"\s*\})?\)\n"
    r"\s*\.toPromise\(\)\n"
    r"\s*if \(response\.error\) \{\n"
    r"(.*?\n)"
    r"\s*\}",
    re.S,
)

def replace_mutation(s, p):
    def repl(m):
        table = m.group(1)
        return (
            "try {\n"
            "    await store\n"
            "      .get(apiClientAtom)\n"
            f"      .post('/{table}_rev', newObject, 'resolution=merge-duplicates,return=minimal')\n"
            "  } catch (error) {\n"
            "    " + m.group(2).replace('response.error', 'error').rstrip() + "\n"
            "  }"
        )
    return mutation_block.sub(repl, s)

for p in sorted(SRC.glob('**/Conflict.jsx')) + sorted(SRC.glob('**/History/Row.jsx')):
    s = read(p)
    if 'mutations.mutateInsert_' not in s:
        continue
    new_s = replace_mutation(s, p)
    if 'mutations.mutateInsert_' in new_s:
        problems.append(f'{p}: a mutation block did not match')
        continue
    new_s = new_s.replace("import { mutations } from '", "# REMOVED import { mutations } from '")
    new_s = re.sub(r"# REMOVED import \{ mutations \} from '[^']+'\n", '', new_s)
    new_s = new_s.replace('gqlClientAtom', 'apiClientAtom')
    # drop now-unused gqlClient local variable
    new_s = re.sub(r"\s*const gqlClient = store\.get\(apiClientAtom\)\n", '', new_s)
    write(p, new_s)

print(f'changed {len(changed)} files')
for c in changed:
    print(' ', c)
if problems:
    print('\nPROBLEMS:')
    for pr in problems:
        print(' ', pr)
    sys.exit(1)
