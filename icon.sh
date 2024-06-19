#!/bin/sh
set -e
# Create png and ico files from an svg
# See https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
for size in 32 180 192 512; do
  inkscape --export-width $size --export-filename public/icon/$size.png public/icon/fav.svg
done
magick public/icon/32.png public/favicon.ico
