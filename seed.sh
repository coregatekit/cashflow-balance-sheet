#!/bin/bash

docker compose exec cashflow-db mongoimport --db cashflow --collection professions --authenticationDatabase admin --username antman --password sup3r_secret --file /init/professions.json --jsonArray