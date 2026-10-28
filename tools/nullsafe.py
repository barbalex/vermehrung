import re, subprocess

out = subprocess.run(['npx','tsc','--noEmit','--pretty','false'], capture_output=True, text=True, cwd='/home/alex/Documents/GitHub/vermehrung').stdout
pat = re.compile(r"^([^\s(]+)\((\d+),(\d+)\): error TS(?:18047|18048|18049|2531|2532): '(\w+(?:\.\w+)*)' is possibly '(?:null|undefined)'", re.M)
edits = {}
for m in pat.finditer(out):
    path, line, col, name = m.group(1), int(m.group(2)), int(m.group(3)), m.group(4)
    base = name.split('.')[0]
    edits.setdefault(path, {}).setdefault(line, []).append((col, base))

changed = 0
for path, lines_ in edits.items():
    src = open(path).read().split('\n')
    for line, fixes in lines_.items():
        for col, base in sorted(fixes, key=lambda x: -x[0]):
            try: text = src[line - 1]
            except IndexError: continue
            if text[col-1:col-1+len(base)] != base:
                continue
            rest = text[col-1+len(base):]
            if rest.startswith('.') and not rest.startswith('?.'):
                src[line - 1] = text[:col-1+len(base)] + '?' + rest
                changed += 1
    open(path, 'w').write('\n'.join(src))
print("made optional:", changed)
