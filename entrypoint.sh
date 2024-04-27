#!/bin/sh

# If $INPUT_KEY_BASE64 is set, decode it and export it as $INPUT_KEY
if [ -n "$INPUT_KEY_BASE64" ]; then
    export INPUT_KEY=$(echo "$INPUT_KEY_BASE64" | base64 -d)
fi

# If $INPUT_PUBLIC_KEY_BASE64 is set, decode it and export it as $INPUT_PUBLIC_KEY
if [ -n "$INPUT_PUBLIC_KEY_BASE64" ]; then
    export INPUT_PUBLIC_KEY=$(echo "$INPUT_PUBLIC_KEY_BASE64" | base64 -d)
fi

# If argument is 'bash', run bash
if [ "$1" = "bash" ]; then
    exec /bin/bash
    return
fi

cd /src ; npm run start -- $@
