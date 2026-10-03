"""No-knowledge baselines: score of always picking the longest / shortest / most-echo / least-echo option.
Usage: python3 baselines.py parts/a.json parts/b.json parts/c.json   (each should sit near chance, 25%)"""
import json, sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import validate as V
qs = [q for p in sys.argv[1:] for q in json.load(open(p))["questions"] if q["select"] == 1]
L = lambda q, i: len(V.plain(q["options"][i]["t"]))
for name, key in [("longest", L), ("shortest", lambda q, i: -L(q, i)), ("most-echo", V.echo), ("least-echo", lambda q, i: -V.echo(q, i))]:
    v = sum(max(range(len(q["options"])), key=lambda i: key(q, i)) in q["answer"] for q in qs)
    print(f"pick-{name}: {v}/{len(qs)} ({v/len(qs):.0%})")
