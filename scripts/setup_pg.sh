#!/bin/bash

createdb -O postgres goober
psql -U postgres -d goober -f ./schema.sql
