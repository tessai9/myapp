# myapp

> 個人的に推してるvtuber一覧
> Firebase + Vue.jsのテストサイト

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Using firebase
add src/firebase.env.js
```javascript:firebase.env.js
'use strict'

module.exports = {
	firebaseInit: {
		apiKey: "...",
		authDomain: "...",
		databaseURL: "...",
		projectId: "...",
		storageBucket: "...",
		messagingSenderId: "..."
	}
}
```

# deploy
## overview of the way to deploy my project
```bash
# login to firebase
firebase login

# initialize
# setting Databse & Hosting
firebase init

# deploy
firebase deploy
```

## Notice
When initializing Hosting, path to the index.html is `./dist/index.html`.
