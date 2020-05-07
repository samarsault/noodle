# cte
The dashboard is built using Vue, rest of the pages are rendered by the server.

## Installation

Requires: MongoDB, NodeJS

```sh
$ git clone https://github.com/thelehhman/cte
# Build the vue app
$ cd dashboard && npm i && npm run build
$ cd ..
# run the server
$ npm i && npm start
```
To run the app, you will require a .env file listing your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET. You can obtain it via the [Google API console](https://console.developers.google.com/). The file will look something like(dont copy this):
```
GOOGLE_CLIENT_ID=sdjfoasjfoda
GOOGLE_CLIENT_SECRET=3232-u23.apps.googleusercontent.com
```
Also, add the following URL in the Authorized Redirect URLs box in the [Googele API Console page].
```
http://localhost:3000/auth/callback
```

## Access Levels

There are 3 types of access levels:

- Admin: Can do anything
- Instructor: Can upload resources, see students particular to his/her course
- Student

Note that the first user you create is granted admin status by default.

## Directory structure

- bin: contains the webserver
- controllers: the various models, routes and middleware required by our app
- public: static assets, i.e. images, stylesheets and scripts
- styles: source style files (SASS), which form the base of the entire app's UI
- test: server tests. Run using `npm test`
- views: contain pug templates for server rendered pages.
- dashboard: contains the vue app i.e. the dashboard
