#!/bin/sh

# If $INPUT_KEY_BASE64 is set, decode it and export it as $INPUT_KEY
if [ -n "$INPUT_KEY_BASE64" ]; then
    export INPUT_KEY=$(echo "$INPUT_KEY_BASE64" | base64 -d)
fi

cd /src ; npm run start -- $@
