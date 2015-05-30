#!/usr/bin/env bash
mongod --dbpath data/db&
#node app.js&
#nodemon app.js&
babel-node app.js
wait

