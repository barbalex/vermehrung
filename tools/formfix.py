"""Types the combineLatest subscribe tuples in entity Forms.
For each combined observable var, looks back for db?.get<Entity>('entity')
and writes the destructuring type tuple inline.
"""
import re, glob, sys

PASCAL = {'art':'Art','herkunft':'Herkunft','garten':'Garten','kultur':'Kultur',
 'sammlung':'Sammlung','lieferung':'Lieferung','teilkultur':'Teilkultur','zaehlung':'Zaehlung',
 'person':'Person','event':'Event','bedarf':'Bedarf','teilzaehlung':'Teilzaehlung',
 'av':'Av','gv':'Gv','ae_art':'AeArt','sammel_lieferung':'SammelLieferung',
 'kultur_option':'KulturOption','person_option':'PersonOption'}

changed = 0
for f in glob.glob('src/components/Data/**/Form/index.tsx', recursive=True) + glob.glob('src/components/Data/**/Form/*.tsx', recursive=True):
    s = open(f).read()
    o = s
    depth = len(f.split('/')) - 2
    rel = '../' * depth + 'dbModel.ts'
    m = re.search(r"combineLatest\(\[\n((?:\s+\w+Observable,?\n)+)\s+\]\)", s)
    if not m:
        continue
    vars = re.findall(r"(\w+Observable),?", m.group(1))
    types = []
    ok = True
    for v in vars:
        # look back for this var's definition
        vm = re.search(rf"const {v} =\n?([\s\S]*?)\n\s*const ", s[m.end():m.end()+3000]) or re.search(rf"const {v} = (.*\n(?:.*\n)?)", s)
        defn = ""
        vm2 = re.search(rf"const {v} = ((?:.*\n){{1,8}})", s)
        if vm2:
            defn = vm2.group(1)
        gm = re.search(r"\.get<[^>]*\.(\w+)>\('(\w+)'\)", defn) or re.search(r"\.get\('(\w+)'\)", defn)
        if gm:
            ent = gm.groups()[-1]
            cls = PASCAL.get(ent)
            if cls:
                if 'findAndObserve' in defn:
                    types.append(f"import('{rel}').{cls} | undefined")
                else:
                    types.append(f"import('{rel}').{cls}[]")
                continue
        if '$of({})' in defn or '$of(null)' in defn:
            types.append('Record<string, unknown> | undefined')
            continue
        if '$of(' in defn:
            types.append('never[]')
            continue
        ok = False
        break
    if not ok or not types:
        continue
    # find the subscribe destructuring right after
    sm = re.search(r"combinedObservables\.subscribe\(\n\s*async \((\[[^\]]+\])\) => \{", s)
    if not sm:
        continue
    names = [x.strip() for x in sm.group(1)[1:-1].split(',')]
    if len(names) != len(types):
        continue
    tuple_type = ',\n          '.join(types)
    repl = f"combinedObservables.subscribe(\n      async ({sm.group(1)}: [\n          {tuple_type},\n        ]) => {{"
    s = s[:sm.start()] + repl + s[sm.end():]
    if s != o:
        open(f, 'w').write(s)
        changed += 1
print("form tuples typed:", changed)
