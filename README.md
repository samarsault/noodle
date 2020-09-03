<div align="center">
	<br/>
	<br/>
    <img src="banner.png" width="480">
	<br/>
	<br />
</div>

![CI](https://github.com/samarsault/noodle/workflows/CI/badge.svg)

### Noodle is currently under development, not suitable for use/production. 

## Installation

Requires: MongoDB, NodeJS

```sh
$ git clone https://github.com/samarsault/noodle
# Build the vue app
$ cd client && npm i && npm run build
$ cd ../server
# run the server
$ npm i && npm start
```
To run the app, you will require a .env file listing your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET. You can obtain it via the [Google API console](https://console.developers.google.com/). The file will look something like(dont copy this):
```
GOOGLE_CLIENT_ID=sdjfoasjfoda
GOOGLE_CLIENT_SECRET=3232-u23.apps.googleusercontent.com
```

Note that the first user you create is granted admin status by default.
