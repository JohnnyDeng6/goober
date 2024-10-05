#!/bin/bash

createdb goober
psql -d goober -f ./schema.sql
