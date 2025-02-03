
# Radon EWS BPBD Deployment Guide

A brief guide for this app's deployment on Domainesia's shared hosting


## Overview

There are 3 main components on how to make this works
1. [Nuxt Server](#nuxt-server)
2. [PM2](#pm2)
3. [.htaccess](#htaccess-file)

## Nuxt Server
This dashboard app is a Nuxt Server. This app **MUST** be deployed in [Server mode](https://nuxt.com/docs/getting-started/deployment) because it fully utilize Nuxt both as frontend and backend server thus static deployment won't work.
### Source Code
This app's main source code can be found [in this repo](https://github.com/farrelaby/bpbd-radon-dashboard.git). Even though it's a public repo, I highly recommends to fork for further development.
### Deployed App Directory Location
The deployed version of this app is available inside `~/ews_server/.output`

## PM2
PM2 was used mainly to run and maintain the running Nuxt server. The config to run the server resides in `~/ews_server/ecosystem.config.cjs`
### How To Run the Server
Run this command `pm2 start ~/ews_server/ecosystem.config.cjs --env production`. The server will listen to port `55631`

## htaccess file
Modify the `.htaccess` file so any request will be redirected to Nuxt server that ran on port `55631` by adding this line ` RewriteRule ^(.*)$ http://localhost:55631/$1 [P]` based on [this article](https://www.domainesia.com/panduan/cara-upload-file-nuxt-js-di-hosting/)