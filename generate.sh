#!/bin/bash
nuxt generate
mv /home/abrikos/PycharmProjects/abrikosio/nuxt_static/public/index.html /home/abrikos/PycharmProjects/abrikosio/templates/
cd /home/abrikos/PycharmProjects/abrikosio/nuxt_static/
git add /home/abrikos/PycharmProjects/abrikosio/nuxt_static/*

