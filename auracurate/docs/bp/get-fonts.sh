#!/bin/sh
# Download the Google Fonts used by aurora-business-plan.html into ./fonts (not committed; ~11 MB)
set -e; cd "$(dirname "$0")"; mkdir -p fonts; cd fonts
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
curl -sS -A "$UA" "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@400;500;700;900&family=Noto+Serif+KR:wght@500;700&display=swap" -o fonts.css
python3 - <<'PY'
import re, subprocess, hashlib
css = open('fonts.css').read()
for u in sorted(set(re.findall(r'url\((https://fonts\.gstatic\.com/[^)]+)\)', css))):
    n = hashlib.md5(u.encode()).hexdigest()[:12] + '.woff2'
    subprocess.run(['curl', '-sS', '-o', n, u], check=True); css = css.replace(u, n)
open('fonts.css', 'w').write(css)
PY
