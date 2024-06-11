#!/bin/sh
cd dist
TEMP_FILE=$(mktemp)
awk '/<\/head>/ {exit} {print}' index.html > "${TEMP_FILE}"
find assets -name 'roboto-latin-[45]00-normal-*.woff2' -exec printf \
 '    <link rel="preload" crossorigin href="/%s" type="font/woff2" as="font">\n' \
 \{\} \; >> "${TEMP_FILE}"
awk '/<\/head>/,EOF' index.html >> "${TEMP_FILE}"
mv "${TEMP_FILE}" index.html
