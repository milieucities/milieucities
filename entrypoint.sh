#!/usr/bin/env bash
set -x
set -e

set -- /milieu/start.sh "$@"

exec "$@"
