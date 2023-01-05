#!/bin/bash

gnome-terminal --working-directory $PWD/backend/ -- bash -c "npm run dev"
cd ./frontend && npm run dev
