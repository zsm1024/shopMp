'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
    NODE_ENV: '"production"',
    BASE_URL: "http://192.168.0.151:8080"
})