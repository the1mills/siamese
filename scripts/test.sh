#!/usr/bin/env bash

echo "running siamese tests...";

which_suman="$(which suman)";

if [[ -z "${which_suman}" ]]; then
    npm install -g suman
fi

npm link
npm link suman
npm link siamese

suman test
