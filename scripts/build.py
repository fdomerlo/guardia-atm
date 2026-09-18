#!/usr/bin/env python3
"""
scripts/build.py
Empaqueta todos los módulos JavaScript de Guardia ATM en js/bundle.js
para permitir ejecución sin errores de CORS al abrir index.html directamente por file://
así como en servidores http:// y despliegue PWA.
"""

import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

files_order = [
    'js/data/red-flags.js',
    'js/data/farmacos.js',
    'js/data/procedimientos.js',
    'js/data/mapa-dolor.js',
    'js/data/patologias.js',
    'js/modules/favorites.js',
    'js/modules/search.js',
    'js/modules/pwa.js',
    'js/modules/triage.js',
    'js/modules/pathologies-view.js',
    'js/modules/drugs-view.js',
    'js/modules/procedures-view.js',
    'js/modules/referral-map-view.js',
    'js/app.js'
]

bundled_parts = [
    '/**\n * Guardia ATM - Universal Bundle\n * Compilado para compatibilidad completa con file:// y http://\n */\n',
    '(function () {\n  "use strict";\n'
]

for rel_path in files_order:
    full_path = os.path.join(BASE_DIR, rel_path)
    with open(full_path, 'r', encoding='utf-8') as f:
        code = f.read()

    # Remove import lines
    code = re.sub(r'^\s*import\s+[^;]+;?\s*$', '', code, flags=re.MULTILINE)
    # Replace 'export const ' with 'const '
    code = re.sub(r'\bexport\s+const\s+', 'const ', code)
    # Replace 'export class ' with 'class '
    code = re.sub(r'\bexport\s+class\s+', 'class ', code)
    # Replace 'export let ' with 'let '
    code = re.sub(r'\bexport\s+let\s+', 'let ', code)
    # Replace 'export default ' with ''
    code = re.sub(r'\bexport\s+default\s+', '', code)

    bundled_parts.append(f'\n  /* === File: {rel_path} === */\n' + code)

bundled_parts.append('\n})();\n')

bundle_code = '\n'.join(bundled_parts)
out_path = os.path.join(BASE_DIR, 'js', 'bundle.js')

with open(out_path, 'w', encoding='utf-8') as f:
    f.write(bundle_code)

print(f'js/bundle.js generado exitosamente: {len(bundle_code)} bytes.')
